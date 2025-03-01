/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

import { Vec3 } from '../math';
import { AABB } from './aabb';
import { OBB } from './obb';
import { Plane } from './plane';

const X = new Vec3();
const Y = new Vec3();
const Z = new Vec3();
const d = new Vec3();
const min = new Vec3();
const max = new Vec3();
const u = new Array(3);
const e = new Array(3);

/**
 * @en
 * the distance between a point and a plane
 * @zh
 * 计算点和平面之间的距离。
 * @param {Vec3} point @en Target point @zh 目标点。
 * @param {Plane} plane @en Target plane @zh 目标平面。
 * @return @en The distance in between @zh 距离。
 */
export function point_plane (point: Vec3, plane_: Plane) {
    return Vec3.dot(plane_.n, point) - plane_.d;
}

/**
 * @en
 * the closest point on plane to a given point
 * @zh
 * 计算平面上最接近给定点的点。
 * @param out @en The closest point, as a result @zh 最近点。
 * @param point @en The given point @zh 给定点。
 * @param plane @en Target plane @zh 平面。
 * @return @en The closest point, same as out @zh 最近点。
 */
export function pt_point_plane (out: Vec3, point: Vec3, plane_: Plane) {
    const t = point_plane(point, plane_);
    return Vec3.subtract(out, point, Vec3.multiplyScalar(out, plane_.n, t));
}

/**
 * @en
 * the closest point on aabb to a given point
 * @zh
 * 计算 aabb 上最接近给定点的点。
 * @param {Vec3} out @en The closest point, as a result @zh 最近点。
 * @param {Vec3} point @en The given point @zh 给定点。
 * @param {AABB} aabb @en Target aabb to calculate @zh 轴对齐包围盒。
 * @return {Vec3} @en The closest point, same as out @zh 最近点。
 */
export function pt_point_aabb (out: Vec3, point: Vec3, aabb_: AABB): Vec3 {
    Vec3.copy(out, point);
    Vec3.subtract(min, aabb_.center, aabb_.halfExtents);
    Vec3.add(max, aabb_.center, aabb_.halfExtents);

    out.x = (out.x < min.x) ? min.x : out.x;
    out.y = (out.y < min.y) ? min.y : out.y;
    out.z = (out.z < min.z) ? min.z : out.z;

    out.x = (out.x > max.x) ? max.x : out.x;
    out.y = (out.y > max.y) ? max.y : out.y;
    out.z = (out.z > max.z) ? max.z : out.z;
    return out;
}

/**
 * @en
 * the closest point on obb to a given point
 * @zh
 * 计算 obb 上最接近给定点的点。
 * @param {Vec3} out @en The closest point, as a result @zh 最近点。
 * @param {Vec3} point @en The given point @zh 给定点。
 * @param {OBB} obb @en Target obb to calculate @zh 方向包围盒。
 * @return {Vec3} @en The closest point, same as out @zh 最近点。
 */
export function pt_point_obb (out: Vec3, point: Vec3, obb_: OBB): Vec3 {
    Vec3.set(X, obb_.orientation.m00, obb_.orientation.m01, obb_.orientation.m02);
    Vec3.set(Y, obb_.orientation.m03, obb_.orientation.m04, obb_.orientation.m05);
    Vec3.set(Z, obb_.orientation.m06, obb_.orientation.m07, obb_.orientation.m08);

    u[0] = X;
    u[1] = Y;
    u[2] = Z;
    e[0] = obb_.halfExtents.x;
    e[1] = obb_.halfExtents.y;
    e[2] = obb_.halfExtents.z;

    Vec3.subtract(d, point, obb_.center);

    // Start result at center of obb; make steps from there
    Vec3.set(out, obb_.center.x, obb_.center.y, obb_.center.z);

    // For each OBB axis...
    for (let i = 0; i < 3; i++) {
        // ...project d onto that axis to get the distance
        // along the axis of d from the obb center
        let dist = Vec3.dot(d, u[i]);

        // if distance farther than the obb extents, clamp to the obb
        if (dist > e[i]) {
            dist = e[i];
        }
        if (dist < -e[i]) {
            dist = -e[i];
        }

        // Step that distance along the axis to get world coordinate
        out.x += dist * u[i].x;
        out.y += dist * u[i].y;
        out.z += dist * u[i].z;
    }
    return out;
}

/**
 * @en
 * Calculate the nearest point on the line, which is from A to B, to the given point
 * @zh
 * 计算给定点距离线段上最近的一点。线段从A到B。
 * @param out @en The closest point, as a result @zh 最近点
 * @param point @en The given point @zh 给定点
 * @param linePointA @en Point A on the line @zh 线上的某点 A
 * @param linePointB @en Point B on the line @zh 线上的某点 B
 */
export function pt_point_line (out: Vec3, point: Vec3, linePointA: Vec3, linePointB: Vec3) {
    Vec3.subtract(X, linePointA, linePointB);
    const dir = X;
    const dirSquaredLength = Vec3.lengthSqr(dir);

    if (dirSquaredLength == 0) {
        // The point is at the segment start.
        Vec3.copy(out, linePointA);
    } else {
        // Calculate the projection of the point onto the line extending through the segment.
        Vec3.subtract(X, point, linePointA);
        const t = Vec3.dot(X, dir) / dirSquaredLength;

        if (t < 0) {
            // The point projects beyond the segment start.
            Vec3.copy(out, linePointA);
        } else if (t > 1) {
            // The point projects beyond the segment end.
            Vec3.copy(out, linePointB);
        } else {
            // The point projects between the start and end of the segment.
            Vec3.scaleAndAdd(out, linePointA, dir, t);
        }
    }
}
