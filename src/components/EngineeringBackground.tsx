import { useEffect, useRef } from "react";

export default function EngineeringBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animation variables
    let mouseX = 0;
    let mouseY = 0;
    let frame = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Draw functions
    const drawGrid = () => {
      ctx.strokeStyle = "rgba(13, 32, 59, 0.3)";
      ctx.lineWidth = 1;

      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const drawCircuitPaths = () => {
      ctx.strokeStyle = "rgba(13, 32, 59, 0.2)";
      ctx.lineWidth = 2;

      // Horizontal lines
      for (let i = 0; i < 5; i++) {
        const y = (canvas.height / 6) * (i + 1);
        const offset = Math.sin(frame * 0.01 + i) * 20;
        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        ctx.lineTo(canvas.width, y + offset);
        ctx.stroke();
      }

      // Vertical lines
      for (let i = 0; i < 8; i++) {
        const x = (canvas.width / 9) * (i + 1);
        const offset = Math.cos(frame * 0.01 + i) * 20;
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x + offset, canvas.height);
        ctx.stroke();
      }
    };

    const drawNodes = () => {
      ctx.fillStyle = "rgba(13, 32, 59, 0.5)";
      ctx.strokeStyle = "rgba(13, 32, 59, 0.8)";
      ctx.lineWidth = 2;

      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(i * 0.5 + frame * 0.005) * canvas.width) / 4 + canvas.width / 2;
        const y = (Math.cos(i * 0.7 + frame * 0.005) * canvas.height) / 4 + canvas.height / 2;
        const size = 3 + Math.sin(frame * 0.01 + i) * 2;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    };

    const drawRadialScan = () => {
      const centerX = mouseX || canvas.width / 2;
      const centerY = mouseY || canvas.height / 2;

      ctx.strokeStyle = "rgba(13, 32, 59, 0.15)";
      ctx.lineWidth = 1;

      for (let i = 0; i < 8; i++) {
        const angle = (frame * 0.02 + i * (Math.PI / 4)) % (Math.PI * 2);
        const length = 300;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * length,
          centerY + Math.sin(angle) * length
        );
        ctx.stroke();
      }

      // Concentric circles
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, i * 60, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawGrid();
      drawCircuitPaths();
      drawNodes();
      drawRadialScan();

      frame++;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-30"
      style={{ zIndex: 0 }}
    />
  );
}
