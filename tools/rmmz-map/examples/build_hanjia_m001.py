#!/usr/bin/env python3
"""Reproducible recipe for M001 青牛鎮·韓家 (see docs/story/00-序章-青牛鎮.md §11.1).

Donor = RMMZ built-in sample map Map016 (a thatched-roof mountain village on the
standard Outside tileset -> zero new assets). We crop its top farmhouse scene,
widen to 27x15, remove the stream, and carve a clean south-gate path, then
autoshape the painted ground so edges blend like the editor.

Usage (editor MUST be closed before writing game/data):
  python build_hanjia_m001.py \
    --donor "/path/to/RPG Maker MZ/.../Resources/samplemaps/Map016.json" \
    --game  ../../../game \
    [--out-json ../../../game/data/Map001.json] [--preview /tmp/m001.png]

Preview needs the tileset images; --game supplies data/Tilesets.json + img/tilesets.
Without --out-json it only writes a preview (safe dry run).
"""
import os, sys, argparse
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))          # tools/rmmz-map on path
import mzmap as MZ
import autoshape as A

def build(donor_path):
    donor = MZ.load(donor_path)
    src = MZ.crop(donor, 0, 0, 25, 15, "tmp")       # top 15 rows, autotiles intact
    out = MZ.new_map(donor, 27, 15, "青牛鎮·韓家")
    MZ.copy_block(src, 0, 0, 25, 15, out, 1, 0)      # centre the 25-wide crop in 27
    # pad the two new border columns by duplicating the crop's edge columns
    for y in range(15):
        for z in range(6):
            MZ.mset(out, 0, y, z, MZ.grid_get(src, 0, y, z))
            MZ.mset(out, 26, y, z, MZ.grid_get(src, 24, y, z))
    # remove the stream: water (A1) on L0 -> grass; clear its upper decorations + bridge
    for y in range(15):
        for x in range(27):
            if MZ.is_water_a1(MZ.grid_get(out, x, y, 0)):
                MZ.mset(out, x, y, 0, MZ.OUTSIDE_GRASS)
                MZ.mset(out, x, y, 2, 0); MZ.mset(out, x, y, 3, 0)
            if MZ.grid_get(out, x, y, 3) == 80:       # bridge plank
                MZ.mset(out, x, y, 3, 0)
    for y in range(7, 15):                            # leftover water-bank foam
        for x in range(9, 27):
            if MZ.grid_get(out, x, y, 2) in (184, 185):
                MZ.mset(out, x, y, 2, 0)
    # clear the leftover right-side dirt strip (old bridge path) -> grass
    for y in range(7, 15):
        for x in range(12, 16):
            if MZ.a2_kind(MZ.grid_get(out, x, y, 0)) == 17:
                MZ.mset(out, x, y, 0, MZ.OUTSIDE_GRASS)
    # south gate: clean dirt path down the middle to the bottom edge
    for y in range(8, 15):
        for x in (10, 11):
            MZ.mset(out, x, y, 0, MZ.OUTSIDE_DIRT)
            for z in (1, 2, 3):
                MZ.mset(out, x, y, z, 0)
    # blend painted path + courtyard grounds like the editor
    table = A.load_table()
    A.reshape_region(out, table, 6, 5, 17, 15, layer=0)
    fix_forest(out, table)
    return out

CANOPY = 2048 + 116 * 48   # Outside A4 forest canopy (kind 116), solid shape

def _is_a4(v):   return 5888 <= v < 8192
def _is_canopy(v): return v >= 2048 and (v - 2048) // 48 == 116

def fix_forest(out, table):
    """Cropping a forest-bordered donor leaves cut A4 tiles (flat-green blocks,
    black holes) and grass pockets orphaned inside the trees. Flatten the forest
    to one canopy kind, close the pockets, and re-blob with oob=True so it reads
    as a clean continuous tree line that closes at the map edges."""
    w, h = out["width"], out["height"]
    N8 = [(-1,-1),(0,-1),(1,-1),(-1,0),(1,0),(-1,1),(0,1),(1,1)]
    # 1. flatten every A4 forest tile (canopy/cliff-side/stray) -> canopy solid
    for y in range(h):
        for x in range(w):
            for z in range(4):
                if _is_a4(MZ.grid_get(out, x, y, z)):
                    MZ.mset(out, x, y, z, CANOPY)
    # 2. close grass(kind16)/void pockets that are mostly surrounded by canopy
    for _ in range(3):
        todo = []
        for y in range(h):
            for x in range(w):
                v = MZ.grid_get(out, x, y, 0)
                if _is_canopy(v): continue
                k = (v - 2048) // 48 if v >= 2048 else -2
                if v != 0 and k != 16: continue          # only grass/void, never path/buildings
                nb = sum(1 for dx, dy in N8 if 0 <= x+dx < w and 0 <= y+dy < h
                         and _is_canopy(MZ.grid_get(out, x+dx, y+dy, 0)))
                if nb >= 5: todo.append((x, y))
        for x, y in todo:
            for z in range(4): MZ.mset(out, x, y, z, 0)
            MZ.mset(out, x, y, 0, CANOPY)
        if not todo: break
    # 3. re-blob the canopy (closes at edges) + fix A2 tiles in the L/R borders
    A.reshape_region(out, table, 0, 0, w, h, layer=0, kinds={116})
    A.reshape_region(out, table, 17, 0, w, h, layer=0)   # right border grass
    A.reshape_region(out, table, 0, 0, 2, h, layer=0)    # far-left padded column
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
        # preserve the target's existing metadata + events; swap size + tile data only
        import json
        tgt = MZ.load(a.out_json)
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
