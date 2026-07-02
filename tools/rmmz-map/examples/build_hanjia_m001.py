#!/usr/bin/env python3
"""Reproducible recipe for M001 青牛鎮·韓家 (see docs/story/00-序章-青牛鎮.md §11.1).

Donor = RMMZ built-in sample map Map016 (thatched-roof mountain village on the
standard Outside tileset -> zero new assets). We crop its top farmhouse scene.

Key lesson: DON'T reshape the donor forest — the pros drew it right, and any
flatten/re-blob makes tree canopies look half-cut. So:
  * widen 25 -> 27 by INSERTING two duplicated interior columns (whole columns,
    so no autotile / tree is ever cut) rather than padding+duplicating edges;
  * remove the stream by filling forest-enclosed water with a forest neighbour
    (not grass, which would leave a bright hole in the trees), else grass;
  * carve the south-gate path and reshape ONLY the interior field/path A2 tiles
    (x6..x18) — never the forest borders.

Usage (editor MUST be closed before writing game/data):
  python build_hanjia_m001.py \
    --donor "/path/to/RPG Maker MZ/.../Resources/samplemaps/Map016.json" \
    --game  ../../../game \
    [--out-json ../../../game/data/Map001.json] [--preview /tmp/m001.png]
Without --out-json it only writes a preview (safe dry run).
"""
import os, sys, argparse
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))          # tools/rmmz-map on path
import mzmap as MZ
import autoshape as A

N8 = [(-1,-1),(0,-1),(1,-1),(-1,0),(1,0),(-1,1),(0,1),(1,1)]

def _kof(v): return (v - 2048) // 48 if v >= 2048 else -1
def _is_forest(v): return _kof(v) in (116, 124)     # Outside A4 forest pair
def _is_water(v): return 2048 <= v < 2816

def insert_two_cols(src, ins):
    """Widen a map by duplicating whole column `ins` twice. Whole columns keep
    every autotile shape valid, so no tree gets cut. `ins` should be a typical
    interior column (open field / uniform forest), not a horizontal-edge column."""
    w, h = src["width"], src["height"]
    out = MZ.new_map(src, w + 2, h, src.get("displayName", ""))
    for x in range(w + 2):
        c = x if x < ins else (ins if x < ins + 2 else x - 2)
        for y in range(h):
            for z in range(6):
                MZ.mset(out, x, y, z, MZ.grid_get(src, c, y, z))
    return out

def remove_stream(out):
    w, h = out["width"], out["height"]
    for y in range(h):
        for x in range(w):
            if _is_water(MZ.grid_get(out, x, y, 0)):
                fn = [MZ.grid_get(out, x+dx, y+dy, 0) for dx, dy in N8
                      if 0 <= x+dx < w and 0 <= y+dy < h
                      and _is_forest(MZ.grid_get(out, x+dx, y+dy, 0))]
                MZ.mset(out, x, y, 0, fn[0] if len(fn) >= 5 else MZ.OUTSIDE_GRASS)
                MZ.mset(out, x, y, 2, 0); MZ.mset(out, x, y, 3, 0)
            if MZ.grid_get(out, x, y, 3) == 80:          # bridge plank
                MZ.mset(out, x, y, 3, 0)
    for y in range(h):                                   # leftover bank foam
        for x in range(w):
            if MZ.grid_get(out, x, y, 2) in (184, 185):
                MZ.mset(out, x, y, 2, 0)

def build(donor_path):
    donor = MZ.load(donor_path)
    src = MZ.crop(donor, 0, 0, 25, 15, "青牛鎮·韓家")     # pristine 25x15 farmhouse scene
    out = insert_two_cols(src, 20)                        # widen in the open right field
    remove_stream(out)
    # clear the leftover eastward dirt fork (old bridge path) -> grass
    for y in range(7, 15):
        for x in (12, 13, 14):
            if _kof(MZ.grid_get(out, x, y, 0)) == 17:
                MZ.mset(out, x, y, 0, MZ.OUTSIDE_GRASS)
    # carve the south-gate path down the middle (house door ~x10-11)
    for y in range(8, 15):
        for x in (10, 11):
            MZ.mset(out, x, y, 0, MZ.OUTSIDE_DIRT)
            for z in (1, 2, 3): MZ.mset(out, x, y, z, 0)
    # blend ONLY the interior field/path A2 (x6..x18); never touch the forest
    A.reshape_region(out, A.load_table(), 6, 5, 19, 15, layer=0)
    return out

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--donor", required=True, help="path to Map016.json (RMMZ samplemaps)")
    ap.add_argument("--game", required=True, help="path to game/ (for Tilesets.json + img)")
    ap.add_argument("--out-json", default=None, help="write result here (e.g. game/data/Map001.json)")
    ap.add_argument("--preview", default=None, help="write a PNG preview here")
    a = ap.parse_args()
    out = build(a.donor)
    if a.out_json:
        import json
        tgt = MZ.load(a.out_json)                          # keep target's metadata + events
        tgt["width"], tgt["height"], tgt["data"] = out["width"], out["height"], out["data"]
        MZ.save(tgt, a.out_json)
        print("wrote", a.out_json)
    if a.preview:
        import json, render_map as RM
        ts = json.load(open(os.path.join(a.game, "data", "Tilesets.json")))
        img, _ = RM.render(out, ts, os.path.join(a.game, "img", "tilesets"))
        img.convert("RGB").save(a.preview)
        print("wrote", a.preview)
    if not a.out_json and not a.preview:
        print("dry run: nothing written (pass --preview and/or --out-json)")

if __name__ == "__main__":
    main()
