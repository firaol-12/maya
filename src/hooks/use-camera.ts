"use client";
import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

export type CameraStatus = "requesting" | "ready" | "denied" | "unavailable";

interface UseCamera {
  videoRef: RefObject<HTMLVideoElement | null>;
  status: CameraStatus;
}

/**
 * Opens the front camera on mount and stops every track on unmount.
 * Frames stay in the browser; nothing is uploaded.
 */
export function useCamera(): UseCamera {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<CameraStatus>("requesting");

  useEffect(() => {
    let stream: MediaStream | null = null;
    let cancelled = false;

    async function start(): Promise<void> {
      if (!navigator.mediaDevices?.getUserMedia) {
        setStatus("unavailable");
        return;
      }
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop());
          return;
        }
        stream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          await videoRef.current.play().catch(() => undefined);
        }
        setStatus("ready");
      } catch (err: unknown) {
        if (cancelled) return;
        const name = err instanceof DOMException ? err.name : "";
        setStatus(name === "NotAllowedError" || name === "SecurityError" ? "denied" : "unavailable");
      }
    }

    void start();
    return () => {
      cancelled = true;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return { videoRef, status };
}
