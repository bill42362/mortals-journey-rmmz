#!/usr/bin/env python3
"""Data-driven RMMZ autotile shaper for A2 floor tiles.

Learns neighbor-pattern -> shape from a corpus of real maps (e.g. the 99+ RMMZ
built-in sample maps), so hand-painted ground blends exactly like the editor.
The learned table (a2_shape_table.json) is shipped alongside this file, so you
do NOT need the RMMZ install to *use* reshape_region() — only to rebuild it.
"""
import json, os, glob, argparse

A1, A2, A3, A4, A5, TMAX = 2048, 2816, 4352, 5888, 1536, 8192
# 8 neighbours, clockwise from N; bit i set when that neighbour is SAME kind
DIRS = [(0,-1),(1,-1),(1,0),(1,1),(0,1),(-1,1),(-1,0),(-1,-1)]  # N NE E SE S SW W NW

DEFAULT_TABLE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "a2_shape_table.json")

def kind(t): return (t - A1) // 48
def shape(t): return (t - A1) % 48
def is_a2(t): return A2 <= t < A3

def same_kind(center_kind, v, oob):
    if v is None:             # out of bounds
        return oob
    if not (A1 <= v < TMAX):  # non-autotile
        return False
    return (v - A1) // 48 == center_kind

def neighbor_mask(get, x, y, ck, oob=True):
    m = 0
    for i, (dx, dy) in enumerate(DIRS):
        if same_kind(ck, get(x+dx, y+dy), oob):
            m |= (1 << i)
    return m

def build_table(map_paths, layer=0):
    """mask -> Counter(shape). Scans A2 tiles on `layer` across maps."""
    from collections import defaultdict, Counter
    tbl = defaultdict(Counter)
    for p in map_paths:
        try: m = json.load(open(p))
        except Exception: continue
        if not m or "data" not in m or not m.get("width"): continue
        w, h, data = m["width"], m["height"], m["data"]
        def get(x, y, z=layer):
            if 0 <= x < w and 0 <= y < h: return data[(z*h+y)*w+x]
            return None
        for y in range(h):
            for x in range(w):
                t = get(x, y)
                if t is None or not is_a2(t): continue
                tbl[neighbor_mask(get, x, y, kind(t))][shape(t)] += 1
    return tbl

def resolve(tbl):
    """mask -> best shape (majority vote). Returns (dict, conflicts)."""
    out, conflicts = {}, []
    for mask, cnt in tbl.items():
        best, n = cnt.most_common(1)[0]
        out[mask] = best
        if len(cnt) > 1 and n < sum(cnt.values()):
            conflicts.append((mask, dict(cnt)))
    return out, conflicts

def load_table(path=None):
    return {int(k): v for k, v in json.load(open(path or DEFAULT_TABLE)).items()}

def reshape_region(m, table, x0, y0, x1, y1, layer=0, oob=True):
    """Recompute A2 autotile shapes in [x0,x1) x [y0,y1) on `layer`, in-place.
    Returns number of tiles changed. `table` from load_table()."""
    w, h, data = m["width"], m["height"], m["data"]
    def get(x, y, z=layer):
        return data[(z*h+y)*w+x] if 0 <= x < w and 0 <= y < h else None
    updates = []
    for y in range(max(0, y0), min(h, y1)):
        for x in range(max(0, x0), min(w, x1)):
            t = get(x, y)
            if t is None or not is_a2(t): continue
            ck = kind(t)
            sh = table.get(neighbor_mask(get, x, y, ck, oob))
            if sh is None: continue
            new = A1 + ck*48 + sh
            if new != t:
                updates.append((x, y, new))
    for x, y, new in updates:
        data[(layer*h+y)*w+x] = new
    return len(updates)

def main():
    ap = argparse.ArgumentParser(description="Rebuild the A2 autotile shape table from a corpus of maps.")
    ap.add_argument("--sample-dir", required=True,
                    help="dir of Map*.json to learn from (e.g. RMMZ .../Resources/samplemaps)")
    ap.add_argument("--layer", type=int, default=0)
    ap.add_argument("--out", default=DEFAULT_TABLE)
    a = ap.parse_args()
    paths = sorted(glob.glob(os.path.join(a.sample_dir, "Map*.json")))
    table, conflicts = resolve(build_table(paths, layer=a.layer))
    print(f"maps scanned: {len(paths)}   masks learned: {len(table)} / 256   conflicts: {len(conflicts)}")
    json.dump({str(k): v for k, v in table.items()}, open(a.out, "w"))
    print("wrote", a.out)

if __name__ == "__main__":
    main()
