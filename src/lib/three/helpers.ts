import * as THREE from "three";
import type { ProductCategory } from "@/types/product";

export type LensKind = "round" | "square" | "aviator" | "cat-eye" | "wide";

export interface GlassesStyle {
  lens: LensKind;
  frameColor: string;
  lensColor: string;
  lensOpacity: number;
}

/** Procedural glasses look used when a product has no .glb model yet. */
export const GLASSES_STYLES: Record<ProductCategory, GlassesStyle> = {
  sunglasses: { lens: "aviator", frameColor: "#c8a24a", lensColor: "#1d2b44", lensOpacity: 0.8 },
  aviator: { lens: "aviator", frameColor: "#b9bcc4", lensColor: "#1560f5", lensOpacity: 0.55 },
  round: { lens: "round", frameColor: "#1f2937", lensColor: "#9fc1ff", lensOpacity: 0.3 },
  square: { lens: "square", frameColor: "#0d40b3", lensColor: "#cfe0ff", lensOpacity: 0.3 },
  "cat-eye": { lens: "cat-eye", frameColor: "#7a3b2e", lensColor: "#e8c9b8", lensOpacity: 0.4 },
  sport: { lens: "wide", frameColor: "#111827", lensColor: "#ff9a3c", lensOpacity: 0.55 },
  reading: { lens: "square", frameColor: "#6b4f3a", lensColor: "#e6f0ff", lensOpacity: 0.2 },
  bluelight: { lens: "round", frameColor: "#1150d4", lensColor: "#93c5fd", lensOpacity: 0.35 },
};

/** Closed 2D outline of one lens, centered on the origin. `scale` shrinks it for the inner opening. */
export function createLensShape(kind: LensKind, scale = 1): THREE.Shape {
  const s = new THREE.Shape();
  switch (kind) {
    case "round":
      s.absarc(0, 0, 0.36 * scale, 0, Math.PI * 2, false);
      break;
    case "square":
    case "wide": {
      const w = (kind === "wide" ? 0.72 : 0.62) * scale;
      const h = (kind === "wide" ? 0.4 : 0.46) * scale;
      const r = 0.09 * scale;
      const x = -w / 2;
      const y = -h / 2;
      s.moveTo(x + r, y);
      s.lineTo(x + w - r, y);
      s.quadraticCurveTo(x + w, y, x + w, y + r);
      s.lineTo(x + w, y + h - r);
      s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      s.lineTo(x + r, y + h);
      s.quadraticCurveTo(x, y + h, x, y + h - r);
      s.lineTo(x, y + r);
      s.quadraticCurveTo(x, y, x + r, y);
      break;
    }
    case "aviator":
      s.moveTo(-0.34 * scale, 0.3 * scale);
      s.bezierCurveTo(-0.1 * scale, 0.36 * scale, 0.22 * scale, 0.36 * scale, 0.36 * scale, 0.28 * scale);
      s.bezierCurveTo(0.4 * scale, 0.0, 0.2 * scale, -0.4 * scale, -0.06 * scale, -0.4 * scale);
      s.bezierCurveTo(-0.3 * scale, -0.4 * scale, -0.4 * scale, -0.1 * scale, -0.34 * scale, 0.3 * scale);
      break;
    case "cat-eye":
      s.moveTo(-0.32 * scale, 0.16 * scale);
      s.quadraticCurveTo(-0.1 * scale, 0.26 * scale, 0.42 * scale, 0.36 * scale);
      s.quadraticCurveTo(0.42 * scale, -0.1 * scale, 0.2 * scale, -0.26 * scale);
      s.quadraticCurveTo(-0.1 * scale, -0.36 * scale, -0.32 * scale, -0.14 * scale);
      s.quadraticCurveTo(-0.4 * scale, 0.0 * scale, -0.32 * scale, 0.16 * scale);
      break;
  }
  return s;
}

export interface GlassesGeometry {
  frame: THREE.ExtrudeGeometry;
  lens: THREE.ShapeGeometry;
  bridge: THREE.TorusGeometry;
  temple: THREE.BoxGeometry;
}

export const LENS_OFFSET_X = 0.4;

export function createGlassesGeometry(kind: LensKind): GlassesGeometry {
  const outline = createLensShape(kind, 1);
  outline.holes.push(createLensShape(kind, 0.86));

  const frame = new THREE.ExtrudeGeometry(outline, {
    depth: 0.06,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 3,
    curveSegments: 32,
  });
  frame.translate(0, 0, -0.03);

  const lens = new THREE.ShapeGeometry(createLensShape(kind, 0.88), 32);
  const bridge = new THREE.TorusGeometry(0.1, 0.018, 12, 24, Math.PI);
  const temple = new THREE.BoxGeometry(0.035, 0.04, 1.4);

  return { frame, lens, bridge, temple };
}

/** Returns a uniform scale that makes the object about `target` units wide, plus a centering offset. */
export function fitObject(object: THREE.Object3D, target = 2): { scale: number; offset: THREE.Vector3 } {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const longest = Math.max(size.x, size.y, size.z) || 1;
  const scale = target / longest;
  return { scale, offset: center.multiplyScalar(-scale) };
}
