import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "C++", icon: "/assets/icon-cpp.png" },
  { name: "Python", icon: "/assets/icon-python.png" },
  { name: "ROS2", icon: "/assets/icon-ros2.jpg" },
  { name: "CAD", icon: "🔧", emoji: true },
  { name: "SLAM", icon: "📡", emoji: true },
  { name: "Gazebo", icon: "🎮", emoji: true },
  { name: "AI/ML", icon: "🤖", emoji: true },
  { name: "Computer Vision", icon: "👁️", emoji: true },
  { name: "FEA", icon: "📊", emoji: true },
  { name: "SolidWorks", icon: "⚙️", emoji: true },
  { name: "Navigation", icon: "🧭", emoji: true },
  { name: "Sensors", icon: "📟", emoji: true },
];

export default function AboutSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x: x * 20, y: y * 20 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-20 overflow-hidden"
    >
      {/* Blueprint background */}
      <div className="absolute inset-0 blueprint-grid opacity-10" />
      
      {/* Layered depth effects */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10 10 L90 10 M50 10 L50 90 M10 90 L90 90" stroke="currentColor" strokeWidth="1" fill="none" />
              <circle cx="10" cy="10" r="3" fill="currentColor" />
              <circle cx="90" cy="10" r="3" fill="currentColor" />
              <circle cx="50" cy="50" r="3" fill="currentColor" />
              <circle cx="10" cy="90" r="3" fill="currentColor" />
              <circle cx="90" cy="90" r="3" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 text-glow">About Me</h2>
          <div className="w-24 h-1 bg-primary mx-auto glow-effect" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Portrait and Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Portrait with parallax */}
            <motion.div
              className="relative w-full max-w-md mx-auto"
              style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <div className="mechanical-border p-2 bg-card/50 backdrop-blur-sm">
                <img
                  src="/assets/portrait.png"
                  alt="Zaw Hein Aung"
                  className="w-full h-auto"
                />
              </div>
              
              {/* Corner decorations */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-primary" />
              <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-primary" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-primary" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-primary" />
            </motion.div>

            {/* Biography */}
            <div className="mechanical-border p-6 bg-card/30 backdrop-blur-sm space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                I am a <span className="text-foreground font-semibold">Robotics Engineer</span> with 
                expertise spanning mechanical design, autonomous systems, and AI integration. My work 
                bridges the gap between theoretical robotics and real-world applications.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With experience at leading companies like <span className="text-foreground font-semibold">Dyson</span>, 
                I've developed cutting-edge solutions in <span className="text-foreground font-semibold">3D SLAM</span>, 
                sensor fusion, and autonomous navigation systems that operate in challenging environments.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I combine <span className="text-foreground font-semibold">CAD engineering precision</span> with 
                advanced software development to create robust, scalable robotic systems that push the boundaries 
                of what's possible in automation and AI.
              </p>
            </div>
          </motion.div>

          {/* Right side - Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-primary rotate-45" />
              <h3 className="text-2xl font-bold">Skills & Technologies</h3>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="relative group"
                >
                  <div className="mechanical-border p-4 bg-card/50 backdrop-blur-sm aspect-square flex flex-col items-center justify-center gap-2 cursor-pointer overflow-hidden">
                    {/* Icon */}
                    {skill.emoji ? (
                      <span className="text-4xl group-hover:scale-110 transition-transform">
                        {skill.icon}
                      </span>
                    ) : (
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-12 h-12 object-contain group-hover:scale-110 transition-transform"
                      />
                    )}
                    
                    {/* Name */}
                    <span className="text-xs font-medium text-center">{skill.name}</span>

                    {/* Hover overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center"
                    >
                      <div className="w-full h-full border-2 border-primary/50 glow-effect" />
                    </motion.div>

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
