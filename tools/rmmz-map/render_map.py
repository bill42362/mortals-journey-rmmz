#!/usr/bin/env python3
"""Render an RMMZ Map*.json to a PNG. Faithful port of Tilemap._addAutotile /
_addNormalTile / _addShadow from rmmz_core.js (static frame, animationFrame=0)."""
import json, os, sys, argparse
from PIL import Image

TW = TH = 48
W1 = H1 = 24
A1, A2, A3, A4, A5 = 2048, 2816, 4352, 5888, 1536
TILE_MAX = 8192

FLOOR = [
 [[2,4],[1,4],[2,3],[1,3]],[[2,0],[1,4],[2,3],[1,3]],[[2,4],[3,0],[2,3],[1,3]],[[2,0],[3,0],[2,3],[1,3]],
 [[2,4],[1,4],[2,3],[3,1]],[[2,0],[1,4],[2,3],[3,1]],[[2,4],[3,0],[2,3],[3,1]],[[2,0],[3,0],[2,3],[3,1]],
 [[2,4],[1,4],[2,1],[1,3]],[[2,0],[1,4],[2,1],[1,3]],[[2,4],[3,0],[2,1],[1,3]],[[2,0],[3,0],[2,1],[1,3]],
 [[2,4],[1,4],[2,1],[3,1]],[[2,0],[1,4],[2,1],[3,1]],[[2,4],[3,0],[2,1],[3,1]],[[2,0],[3,0],[2,1],[3,1]],
 [[0,4],[1,4],[0,3],[1,3]],[[0,4],[3,0],[0,3],[1,3]],[[0,4],[1,4],[0,3],[3,1]],[[0,4],[3,0],[0,3],[3,1]],
 [[2,2],[1,2],[2,3],[1,3]],[[2,2],[1,2],[2,3],[3,1]],[[2,2],[1,2],[2,1],[1,3]],[[2,2],[1,2],[2,1],[3,1]],
 [[2,4],[3,4],[2,3],[3,3]],[[2,4],[3,4],[2,1],[3,3]],[[2,0],[3,4],[2,3],[3,3]],[[2,0],[3,4],[2,1],[3,3]],
 [[2,4],[1,4],[2,5],[1,5]],[[2,0],[1,4],[2,5],[1,5]],[[2,4],[3,0],[2,5],[1,5]],[[2,0],[3,0],[2,5],[1,5]],
 [[0,4],[3,4],[0,3],[3,3]],[[2,2],[1,2],[2,5],[1,5]],[[0,2],[1,2],[0,3],[1,3]],[[0,2],[1,2],[0,3],[3,1]],
 [[2,2],[3,2],[2,3],[3,3]],[[2,2],[3,2],[2,1],[3,3]],[[2,4],[3,4],[2,5],[3,5]],[[2,0],[3,4],[2,5],[3,5]],
 [[0,4],[1,4],[0,5],[1,5]],[[0,4],[3,0],[0,5],[1,5]],[[0,2],[3,2],[0,3],[3,3]],[[0,2],[1,2],[0,5],[1,5]],
 [[0,4],[3,4],[0,5],[3,5]],[[2,2],[3,2],[2,5],[3,5]],[[0,2],[3,2],[0,5],[3,5]],[[0,0],[1,0],[0,1],[1,1]],
]
WALL = [
 [[2,2],[1,2],[2,1],[1,1]],[[0,2],[1,2],[0,1],[1,1]],[[2,0],[1,0],[2,1],[1,1]],[[0,0],[1,0],[0,1],[1,1]],
 [[2,2],[3,2],[2,1],[3,1]],[[0,2],[3,2],[0,1],[3,1]],[[2,0],[3,0],[2,1],[3,1]],[[0,0],[3,0],[0,1],[3,1]],
 [[2,2],[1,2],[2,3],[1,3]],[[0,2],[1,2],[0,3],[1,3]],[[2,0],[1,0],[2,3],[1,3]],[[0,0],[1,0],[0,3],[1,3]],
 [[2,2],[3,2],[2,3],[3,3]],[[0,2],[3,2],[0,3],[3,3]],[[2,0],[3,0],[2,3],[3,3]],[[0,0],[3,0],[0,3],[3,3]],
]
WFALL = [
 [[2,0],[1,0],[2,1],[1,1]],[[0,0],[1,0],[0,1],[1,1]],[[2,0],[3,0],[2,1],[3,1]],[[0,0],[3,0],[0,1],[3,1]],
]

def kind(t): return (t - A1) // 48
def shape(t): return (t - A1) % 48
def is_a1(t): return A1 <= t < A2
def is_a2(t): return A2 <= t < A3
def is_a3(t): return A3 <= t < A4
def is_a4(t): return A4 <= t < TILE_MAX
def is_a5(t): return A5 <= t < A1
def is_auto(t): return t >= A1
def is_vis(t): return 0 < t < TILE_MAX

class R:
    def __init__(self, tsnames, imgdir, flags):
        self.flags = flags
        self.img = {}
        for i, n in enumerate(tsnames):
            if n:
                p = os.path.join(imgdir, n + ".png")
                if os.path.exists(p):
                    self.img[i] = Image.open(p).convert("RGBA")

    def blit(self, out, setn, sx, sy, dx, dy, w, h):
        im = self.img.get(setn)
        if im is None:
            return
        if sx < 0 or sy < 0 or sx + w > im.width or sy + h > im.height:
            return
        crop = im.crop((sx, sy, sx + w, sy + h))
        out.alpha_composite(crop, (dx, dy))

    def is_table(self, t):
        return is_a2(t) and t < len(self.flags) and (self.flags[t] & 0x80)

    def normal(self, out, t, dx, dy):
        setn = 4 if is_a5(t) else 5 + t // 256
        sx = (((t // 128) % 2) * 8 + (t % 8)) * TW
        sy = ((t % 256) // 8 % 16) * TH
        self.blit(out, setn, sx, sy, dx, dy, TW, TH)

    def auto(self, out, t, dx, dy):
        k, sh = kind(t), shape(t)
        tx, ty = k % 8, k // 8
        setn, bx, by, table, istab = 0, 0, 0, FLOOR, False
        if is_a1(t):
            wsi = 0
            setn = 0
            if k == 0: bx, by = 0, 0
            elif k == 1: bx, by = 0, 3
            elif k == 2: bx, by = 6, 0
            elif k == 3: bx, by = 6, 3
            else:
                bx = (tx // 4) * 8
                by = ty * 6 + (tx // 2 % 2) * 3
                if k % 2 == 0:
                    bx += wsi * 2
                else:
                    bx += 6; table = WFALL
        elif is_a2(t):
            setn = 1; bx = tx * 2; by = (ty - 2) * 3; istab = self.is_table(t)
        elif is_a3(t):
            setn = 2; bx = tx * 2; by = (ty - 6) * 2; table = WALL
        elif is_a4(t):
            setn = 3; bx = tx * 2; by = int((ty - 10) * 2.5 + (0.5 if ty % 2 == 1 else 0))
            if ty % 2 == 1: table = WALL
        tb = table[sh]
        for i in range(4):
            qsx, qsy = tb[i]
            sx1 = (bx * 2 + qsx) * W1
            sy1 = (by * 2 + qsy) * H1
            dx1 = dx + (i % 2) * W1
            dy1 = dy + (i // 2) * H1
            if istab and (qsy == 1 or qsy == 5):
                qsx2 = (4 - qsx) % 4 if qsy == 1 else qsx
                sx2 = (bx * 2 + qsx2) * W1
                sy2 = (by * 2 + 3) * H1
                self.blit(out, setn, sx2, sy2, dx1, dy1, W1, H1)
                self.blit(out, setn, sx1, sy1, dx1, dy1 + H1 // 2, W1, H1 // 2)
            else:
                self.blit(out, setn, sx1, sy1, dx1, dy1, W1, H1)

    def tile(self, out, t, dx, dy):
        if is_vis(t):
            (self.auto if is_auto(t) else self.normal)(out, t, dx, dy)

def render(mapjson, tsjson, imgdir):
    """Render a map dict -> (RGBA Image, tileset name). tsjson = full Tilesets.json list."""
    m = mapjson
    ts = tsjson[m["tilesetId"]]
    r = R(ts["tilesetNames"], imgdir, ts.get("flags", []))
    w, h, data = m["width"], m["height"], m["data"]
    out = Image.new("RGBA", (w * TW, h * TH), (0, 0, 0, 255))
    def rd(x, y, z): return data[(z * h + y) * w + x]
    for z in range(4):
        for y in range(h):
            for x in range(w):
                r.tile(out, rd(x, y, z), x * TW, y * TH)
    for y in range(h):
        for x in range(w):
            sb = rd(x, y, 4)
            if sb & 0x0f:
                for i in range(4):
                    if sb & (1 << i):
                        dx1 = x * TW + (i % 2) * W1
                        dy1 = y * TH + (i // 2) * H1
                        out.alpha_composite(Image.new("RGBA", (W1, H1), (0, 0, 0, 102)), (dx1, dy1))
    return out, ts["name"]

def main():
    ap = argparse.ArgumentParser(description="Render an RMMZ Map JSON to PNG.")
    ap.add_argument("map"); ap.add_argument("out")
    ap.add_argument("--tilesets", required=True, help="path to data/Tilesets.json")
    ap.add_argument("--imgdir", required=True, help="path to img/tilesets/")
    ap.add_argument("--grid", action="store_true", help="draw tile grid + coords")
    a = ap.parse_args()
    m = json.load(open(a.map))
    w, h = m["width"], m["height"]
    out, tsname = render(m, json.load(open(a.tilesets)), a.imgdir)
    from PIL import ImageDraw
    if a.grid:
        d = ImageDraw.Draw(out)
        for x in range(w):
            d.line([(x*TW,0),(x*TW,h*TH)], fill=(255,255,255,40))
            d.text((x*TW+2,2), str(x), fill=(255,255,0,255))
        for y in range(h):
            d.line([(0,y*TH),(w*TW,y*TH)], fill=(255,255,255,40))
            d.text((2,y*TH+2), str(y), fill=(0,255,255,255))
    out.convert("RGB").save(a.out)
    print(f"wrote {a.out}  ({w}x{h} tiles -> {w*TW}x{h*TH}px)  tileset={tsname!r}")

if __name__ == "__main__":
    main()
