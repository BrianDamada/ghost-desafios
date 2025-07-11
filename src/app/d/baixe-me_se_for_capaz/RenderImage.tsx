"use client";
import { useEffect, useRef } from "react";

export default function RenderImage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    fetch("/desafio-1/aoskndfhsan.txt")
      .then((res) => res.text())
      .then((hex) => {
        const byteArray = new Uint8Array(
          hex.match(/.{1,2}/g)!.map((h) => parseInt(h, 16))
        );
        const blob = new Blob([byteArray], { type: "image/jpeg" });

        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0);
        };
        img.src = URL.createObjectURL(blob);
      });
  }, []);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <canvas ref={canvasRef} style={{ display: "block" }} />
      <img
        src="/desafio-1/image.png"
        alt="image"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0,
          pointerEvents: "auto", // garante que o clique vá pra esse img
        }}
        width="100%"
        height="auto"
      />
    </div>
  );
}
