import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MecanumWheel from "./MecanumWheel";

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 blueprint-grid opacity-20" />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background" />

      {/* Centered Content */}
      <div className="container relative z-10 flex flex-col items-center justify-center text-center py-20 space-y-12">
        
        {/* Text Content - Above the wheel */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-2"
          >
            <p className="text-lg text-muted-foreground tracking-wider">Hello, I am</p>
            <h1 className="text-6xl lg:text-7xl font-bold text-glow">
              Zaw Hein Aung
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mechanical-border p-6 bg-card/30 backdrop-blur-sm max-w-3xl mx-auto"
          >
            <p className="text-lg leading-relaxed text-muted-foreground">
              Robotics Engineer specializing in <span className="text-foreground font-semibold">mechanical design</span>, 
              <span className="text-foreground font-semibold"> 3D SLAM</span>, and 
              <span className="text-foreground font-semibold"> autonomous navigation</span>. 
              Experienced in <span className="text-foreground font-semibold">ROS2</span>, 
              <span className="text-foreground font-semibold"> CAD engineering</span>, and 
              <span className="text-foreground font-semibold"> AI-driven systems</span> for 
              real-world robotics applications.
            </p>
          </motion.div>

          {/* Decorative tech specs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground font-mono"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
              <span>ROS2 | SLAM</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
              <span>CAD | FEA</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
              <span>AI | Computer Vision</span>
            </div>
          </motion.div>
        </motion.div>

        {/* 3D Mecanum Wheel - Centered below text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative w-full max-w-2xl h-[500px]"
          style={{
            transform: `scale(${1 - scrollProgress * 0.3})`,
            opacity: 1 - scrollProgress * 0.7,
          }}
        >
          {/* Glow effect behind wheel */}
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75" />
          
          {/* 3D Wheel with isometric view */}
          <MecanumWheel scrollProgress={scrollProgress} />

          {/* Technical annotations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute top-10 right-10 text-xs font-mono text-muted-foreground space-y-1"
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
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="pt-8"
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

      {/* Bottom fade transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
