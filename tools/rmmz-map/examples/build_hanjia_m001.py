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
    A.reshape_region(out, A.load_table(), 6, 5, 17, 15, layer=0)
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
