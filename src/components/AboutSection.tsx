import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "Python", icon: "/assets/python_icon.svg" },
  { name: "C++", icon: "/assets/cpp_icon.svg" },
  { name: "ROS2", icon: "/assets/ros_icon.svg" },
  { name: "SLAM", icon: "/assets/slam_icon.svg" },
  { name: "Gazebo", icon: "/assets/gazebo_icon.svg" },
  { name: "AI/ML", icon: "/assets/AI_icon.svg" },
  { name: "Computer Vision", icon: "/assets/cv_icon.svg" },
  { name: "Mobile Manipulation", icon: "/assets/mm_icon.svg" },
  { name: "Path Planning", icon: "/assets/path_icon.svg" },
  { name: "Sensor Fusion", icon: "/assets/sensor_icon.svg" },
  { name: "CAD/Solidworks", icon: "/assets/cad_icon.svg" },
  { name: "FEA", icon: "/assets/fea_icon.svg" },

];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

      <div className="container relative z-10 min-h-[calc(100svh-10rem)] flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-5xl font-bold mb-4 text-glow">About Me</h2>
          <div className="w-24 h-1 bg-primary mx-auto glow-effect" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Portrait and Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center"
          >
            {/* Biography */}
            <div className="mechanical-border p-6 bg-card/30 backdrop-blur-sm space-y-4 w-full max-w-xl mx-auto">
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                I am a <span className="text-foreground font-semibold">Robotics Engineer</span> with 
                expertise spanning mechanical design, autonomous systems, and AI integration. My work 
                bridges the gap between theoretical robotics and real-world applications.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                With experience at leading companies like <span className="text-foreground font-semibold">Dyson</span>, 
                I've developed cutting-edge solutions in <span className="text-foreground font-semibold">3D SLAM</span>, 
                sensor fusion, and autonomous navigation systems that operate in challenging environments.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
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
                <div className="mechanical-border p-3 bg-white/10 backdrop-blur-md aspect-square
                                flex flex-col items-center justify-center gap-2
                                cursor-pointer overflow-hidden">
                {/* Icon */}
                {skill ? (
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 rounded-lg bg-white/45 blur-md opacity-70" />
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="relative w-14 h-14 object-contain transition-transform
                                group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-125"
                    />
                  </div>
                ) : (
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 rounded-lg bg-white/45 blur-md opacity-80" />
                    <img

                      className="relative w-12 h-12 object-contain transition-transform
                                group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-125"
                    />
                  </div>
                )}

                    
                    {/* Name */}
                    <span className="text-sm sm:text-base font-semibold text-center text-foreground/100">{skill.name}</span>

                    {/* Hover overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-primary/20 backdrop-blur-md flex items-center justify-center"
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
