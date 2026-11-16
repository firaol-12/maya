"use client";
import React, { useEffect, useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import {
  GLASSES_STYLES,
  LENS_OFFSET_X,
  createGlassesGeometry,
  fitObject,
} from "@/lib/three/helpers";
import type { Product } from "@/types/product";

interface ProductModelProps {
  product: Product;
}

function ProceduralGlasses({ product }: ProductModelProps): React.JSX.Element {
  const style = GLASSES_STYLES[product.category];
  const geo = useMemo(() => createGlassesGeometry(style.lens), [style.lens]);

  useEffect(() => {
    return () => {
      geo.frame.dispose();
      geo.lens.dispose();
      geo.bridge.dispose();
      geo.temple.dispose();
    };
  }, [geo]);

  const templeX = LENS_OFFSET_X + 0.38;

  return (
    <group scale={1.15}>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * LENS_OFFSET_X, 0, 0]}>
          <mesh geometry={geo.frame}>
            <meshStandardMaterial color={style.frameColor} metalness={0.6} roughness={0.3} />
          </mesh>
          <mesh geometry={geo.lens} position={[0, 0, 0]}>
            <meshPhysicalMaterial
              color={style.lensColor}
              transparent
              opacity={style.lensOpacity}
              roughness={0.05}
              metalness={0.1}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
      <mesh geometry={geo.bridge} position={[0, 0.12, 0]}>
        <meshStandardMaterial color={style.frameColor} metalness={0.6} roughness={0.3} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={side} geometry={geo.temple} position={[side * templeX, 0.12, -0.7]}>
          <meshStandardMaterial color={style.frameColor} metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function GlbModel({ url }: { url: string }): React.JSX.Element {
  const { scene } = useGLTF(url);
  const { object, scale, offset } = useMemo(() => {
    const clone = scene.clone(true);
    const fit = fitObject(clone, 2.2);
    return { object: clone, ...fit };
  }, [scene]);

  return (
    <group position={offset} scale={scale}>
      <primitive object={object} />
    </group>
  );
}

export function ProductModel({ product }: ProductModelProps): React.JSX.Element {
  if (product.model_url) return <GlbModel url={product.model_url} />;
  return <ProceduralGlasses product={product} />;
}
