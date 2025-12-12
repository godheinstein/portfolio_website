import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MecanumWheel from "./MecanumWheel";

function PixelHandIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      shapeRendering="crispEdges"
    >
      <path d="M8 11V6a2 2 0 0 1 4 0v5" />
      <path d="M12 11V7a2 2 0 0 1 4 0v6" />
      <path d="M16 13V9a2 2 0 0 1 4 0v7" />
      <path d="M8 11l-2-1a2 2 0 0 0-3 2l2 6a4 4 0 0 0 4 3h6a4 4 0 0 0 4-4v-1" />
    </svg>
  );
}

function ScrollPillIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 3c6.2 0 11.2 5 11.2 11.2v7.6C29.2 28 24.2 33 18 33S6.8 28 6.8 21.8v-7.6C6.8 8 11.8 3 18 3Z" />
      <path d="M18 10v6" />
    </svg>
  );
}

export default function HeroSection() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("home");
      if (!heroSection) return;

      const rect = heroSection.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, 1 - rect.bottom / window.innerHeight));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="home" className="relative h-[100svh] overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background" />

      <div className="container relative z-10 h-full px-4 sm:px-6 pt-20 sm:pt-24 pb-10">
        <div className="h-full flex flex-col items-center text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="w-full max-w-5xl"
          >
            <p className="text-sm sm:text-base text-muted-foreground tracking-wider">
              Hello, I am
            </p>

            <h1 className="mt-2 text-4xl sm:text-6xl lg:text-7xl font-bold text-glow">
              Zaw Hein Aung
            </h1>

            <div className="mt-5 sm:mt-6 mx-auto max-w-3xl">
              <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
                Robotics Engineer building{" "}
                <span className="text-foreground font-semibold">autonomous systems</span>{" "}
                for{" "}
                <span className="text-foreground font-semibold">
                  real-world robotics applications
                </span>
                .
              </p>
            </div>

            {/* Subtext: blue bullet points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-5 flex flex-wrap justify-center gap-4 text-xs sm:text-sm text-muted-foreground font-mono"
            >
              {[
                "ROS2",
                "SLAM",
                "AI",
                "Mobile Manipulation",
                "Motion Planning",
                "Simulation",
                "CAD",
              ].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
                  <span>{t}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Wheel wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="relative w-full flex-1 mt-6 sm:mt-8"
            style={{
              transform: `scale(${1 - scrollProgress * 0.18})`,
              opacity: 1 - scrollProgress * 0.5,
            }}
          >
            {/* Wheel: centered container */}
            <div className="relative mx-auto w-full max-w-3xl h-[clamp(360px,48vh,640px)] overflow-hidden rounded-2xl">
              {/* hover outline */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/0 hover:ring-primary/20 transition pointer-events-none" />
              {/* glow */}
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75 pointer-events-none" />

              <div className="h-full w-full cursor-grab active:cursor-grabbing">
                <MecanumWheel scrollProgress={scrollProgress} />
              </div>

              {/* Interact hint: centered below wheel */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground font-mono pointer-events-none"
              >
                <span>Interact</span>
                <motion.span
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="inline-flex"
                >
                  <PixelHandIcon className="h-5 w-5 text-primary/80" />
                </motion.span>
              </motion.div>

              {/* Technical annotations */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="absolute top-4 right-4 sm:top-8 sm:right-8 text-[10px] sm:text-xs font-mono text-muted-foreground space-y-1 pointer-events-none"
              >
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-primary" />
                  <span>MECANUM WHEEL</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-primary" />
                  <span>OMNI-DIRECTIONAL</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-primary" />
                  <span>4-DOF MOBILITY</span>
                </div>
              </motion.div>
            </div>

            {/* NEW: Scroll to explore hint (bottom-right, outside wheel container) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="hidden lg:flex absolute bottom-6 right-8 items-center gap-2 text-xs sm:text-sm text-muted-foreground font-mono pointer-events-none"
            >
              <span>Scroll to explore</span>

              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="inline-flex text-primary/80"
              >
                <ScrollPillIcon className="h-5 w-5" />
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Existing scroll indicator: mobile/tablet only to avoid duplication */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-4 sm:mt-6 lg:hidden"
          >
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-5 h-8 border-2 border-primary/50 rounded-full flex items-start justify-center p-1"
              >
                <motion.div className="w-1 h-2 bg-primary rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
