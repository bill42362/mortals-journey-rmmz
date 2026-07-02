#!/usr/bin/env python3
"""Contact sheet of many maps. Filters maps by tilesetId and size, renders each
as a labeled thumbnail into a grid so you can eyeball donor candidates."""
import json, os, sys, glob, argparse
from PIL import Image, ImageDraw
import render_map as RM

def main():
    ap = argparse.ArgumentParser(description="Render a thumbnail grid of many RMMZ maps.")
    ap.add_argument("--mapdir", required=True, help="dir of Map*.json (e.g. RMMZ samplemaps)")
    ap.add_argument("--tilesets", required=True, help="path to a Tilesets.json (ids must match the maps)")
    ap.add_argument("--imgdir", required=True, help="path to img/tilesets/")
    ap.add_argument("--out", required=True)
    ap.add_argument("--tsid", type=int, default=None, help="only maps with this tilesetId")
    ap.add_argument("--maxw", type=int, default=45)
    ap.add_argument("--maxh", type=int, default=45)
    ap.add_argument("--thumb", type=int, default=300, help="thumb max dimension px")
    ap.add_argument("--cols", type=int, default=5)
    ap.add_argument("--only", default=None, help="comma list of basenames e.g. Map006,Map009")
    a = ap.parse_args()
    tsjson = json.load(open(a.tilesets))
    only = set(a.only.split(",")) if a.only else None
    files = sorted(glob.glob(os.path.join(a.mapdir, "Map*.json")))
    thumbs = []
    for f in files:
        b = os.path.splitext(os.path.basename(f))[0]
        if only and b not in only:
            continue
        try:
            m = json.load(open(f))
        except Exception:
            continue
        if "data" not in m or not m.get("width"):
            continue
        if a.tsid is not None and m["tilesetId"] != a.tsid:
            continue
        if m["width"] > a.maxw or m["height"] > a.maxh:
            continue
        try:
            img, _ = RM.render(m, tsjson, a.imgdir)
        except Exception as e:
            print("skip", b, e); continue
        img.thumbnail((a.thumb, a.thumb))
        thumbs.append((f"{b} {m['width']}x{m['height']}", img))
        print("rendered", b, m["width"], "x", m["height"])
    if not thumbs:
        print("no maps matched"); return
    cols = a.cols
    rows = (len(thumbs) + cols - 1) // cols
    cw = max(t[1].width for t in thumbs) + 10
    ch = max(t[1].height for t in thumbs) + 26
    sheet = Image.new("RGB", (cols * cw, rows * ch), (30, 30, 30))
    d = ImageDraw.Draw(sheet)
    for i, (label, img) in enumerate(thumbs):
        cx = (i % cols) * cw + 5
        cy = (i // cols) * ch + 22
        d.text((cx, (i // cols) * ch + 6), label, fill=(255, 255, 120))
        sheet.paste(img.convert("RGB"), (cx, cy))
    sheet.save(a.out)
    print(f"\nwrote {a.out}  ({len(thumbs)} maps, {cols}x{rows} grid)")

if __name__ == "__main__":
    main()
