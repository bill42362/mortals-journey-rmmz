#!/usr/bin/env python3
"""RMMZ map editing library. Compose new maps from donors by block operations.

Copying whole rectangles preserves autotile edges exactly (relative geometry is
kept), so donor buildings/gardens transfer 1:1. For hand-painted ground, place
solid-shape tiles then blend with autoshape.reshape_region().

Map data layout: 6 z-layers, index = (z*height + y)*width + x.
  z0..z3 = tile layers (0 bottom), z4 = shadow bits, z5 = region id.
"""
import json, copy

def load(path):
    return json.load(open(path))

def save(m, path):
    json.dump(m, open(path, "w"), ensure_ascii=False)

def grid_get(m, x, y, z):
    w, h = m["width"], m["height"]
    return m["data"][(z * h + y) * w + x]

def mset(m, x, y, z, v):
    W, H = m["width"], m["height"]
    if 0 <= x < W and 0 <= y < H:
        m["data"][(z * H + y) * W + x] = v

def new_map(template, W, H, name):
    """Blank map dict based on template metadata (bgm/tilesetId/...), size WxH,
    all tiles 0, no events."""
    m = copy.deepcopy(template)
    m["width"], m["height"] = W, H
    m["displayName"] = name
    m["data"] = [0] * (W * H * 6)
    m["events"] = [None]
    return m

def fill(m, x0, y0, w, h, z, v):
    for y in range(y0, y0 + h):
        for x in range(x0, x0 + w):
            mset(m, x, y, z, v)

def copy_block(src, sx, sy, w, h, dst, dx, dy, layers=(0, 1, 2, 3, 4, 5)):
    """Copy a w*h rectangle from src@(sx,sy) to dst@(dx,dy) across `layers`.
    Preserves autotile shapes (relative positions unchanged)."""
    for z in layers:
        for j in range(h):
            for i in range(w):
                mset(dst, dx + i, dy + j, z, grid_get(src, sx + i, sy + j, z))

def crop(src, sx, sy, w, h, name):
    """Return a new map that is a rectangular crop of src (autotiles intact)."""
    m = new_map(src, w, h, name)
    copy_block(src, sx, sy, w, h, m, 0, 0)
    return m

# --- Outside tileset ground tiles (solid shape 0), handy for painting ---
OUTSIDE_GRASS = 2816   # A2 kind 16, solid
OUTSIDE_DIRT  = 2864   # A2 kind 17, solid

def is_water_a1(v):
    return 2048 <= v < 2816

def a2_kind(v):
    return (v - 2048) // 48 if v >= 2048 else -1
