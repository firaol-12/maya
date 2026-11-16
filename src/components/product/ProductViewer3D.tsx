"use client";
import React, { Suspense, useImperativeHandle, useRef } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ProductModel } from "@/components/product/ProductModel";
import type { Product } from "@/types/product";

export interface ViewerHandle {
  reset: () => void;
  zoom: (factor: number) => void;
}

interface ViewerControlsProps {
  variant: "preview" | "full";
  autoRotate: boolean;
  handleRef?: React.Ref<ViewerHandle>;
}

const HOME_POSITION = new THREE.Vector3(0, 0.35, 4.6);
const MIN_DISTANCE = 1.8;
const MAX_DISTANCE = 9;

function ViewerControls({ variant, autoRotate, handleRef }: ViewerControlsProps): React.JSX.Element {
  const controls = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const camera = useThree((s) => s.camera);
  const invalidate = useThree((s) => s.invalidate);
  const full = variant === "full";

  useImperativeHandle(
    handleRef,
    () => ({
      reset: (): void => {
        const c = controls.current;
        if (!c) return;
        gsap.killTweensOf(camera.position);
        gsap.to(c.target, { x: 0, y: 0, z: 0, duration: 0.8, ease: "power3.inOut" });
        gsap.to(camera.position, {
          x: HOME_POSITION.x,
          y: HOME_POSITION.y,
          z: HOME_POSITION.z,
          duration: 0.8,
          ease: "power3.inOut",
          onUpdate: () => {
            c.update();
            invalidate();
          },
        });
      },
      zoom: (factor: number): void => {
        const c = controls.current;
        if (!c) return;
        const offset = camera.position.clone().sub(c.target);
        const distance = THREE.MathUtils.clamp(offset.length() * factor, MIN_DISTANCE, MAX_DISTANCE);
        const next = c.target.clone().add(offset.setLength(distance));
        gsap.killTweensOf(camera.position);
        gsap.to(camera.position, {
          x: next.x,
          y: next.y,
          z: next.z,
          duration: 0.35,
          ease: "power2.out",
          onUpdate: () => {
            c.update();
            invalidate();
          },
        });
      },
    }),
    [camera, invalidate],
  );

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enableZoom={full}
      enablePan={full}
      enableDamping
      dampingFactor={0.08}
      minDistance={MIN_DISTANCE}
      maxDistance={MAX_DISTANCE}
      autoRotate={autoRotate}
      autoRotateSpeed={full ? 2 : 4}
      rotateSpeed={0.9}
    />
  );
}

interface ProductViewer3DProps {
  product: Product;
  /** `preview` is rotate-only (catalog hover). `full` adds zoom and pan. */
  variant: "preview" | "full";
  autoRotate?: boolean;
  handleRef?: React.Ref<ViewerHandle>;
  onReady?: () => void;
}

export default function ProductViewer3D({
  product,
  variant,
  autoRotate = true,
  handleRef,
  onReady,
}: ProductViewer3DProps): React.JSX.Element {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: HOME_POSITION.toArray(), fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={() => onReady?.()}
      className="touch-none"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.8} />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} position={[0, 4, 4]} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={2} position={[-5, 1, -2]} scale={[3, 6, 1]} />
        <Lightformer form="rect" intensity={2} position={[5, 1, -2]} scale={[3, 6, 1]} />
      </Environment>
      <Suspense fallback={null}>
        <ProductModel product={product} />
      </Suspense>
      {variant === "full" && (
        <ContactShadows position={[0, -0.75, 0]} opacity={0.3} scale={8} blur={2.6} far={2} />
      )}
      <ViewerControls variant={variant} autoRotate={autoRotate} handleRef={handleRef} />
    </Canvas>
  );
}
