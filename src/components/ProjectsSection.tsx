import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Underground GPS (UGPS)",
    description: "3D SLAM, pose graph optimization, Gazebo digital twin for GNSS-denied mining environments",
    tech: ["ROS2", "3D SLAM", "Gazebo", "C++"],
    image: "/assets/project-ugps.png",
    link: "#", // Add actual project links here
  },
  {
    title: "Heating Control System",
    description: "FEA thermal simulation, modular engineering with 80% cost reduction",
    tech: ["FEA", "Thermal Analysis", "CAD", "Optimization"],
    image: "/assets/project-heating.png",
    link: "#",
  },
  {
    title: "ARTU",
    description: "Autonomous testing & calibration system for railway infrastructure",
    tech: ["Autonomous Systems", "Sensors", "Testing"],
    image: "/assets/project-artu.png",
    link: "#",
  },
  {
    title: "Onyx Home Robot Assistant",
    description: "SolidWorks competition runner-up, advanced home robotics design",
    tech: ["SolidWorks", "CAD", "Product Design"],
    image: "/assets/project-onyx.png",
    link: "#",
  },
  {
    title: "Soft Robotic Fish",
    description: "TPU soft actuator + YOLOv8 tracking for biomimetic underwater robotics",
    tech: ["Soft Robotics", "YOLOv8", "Computer Vision"],
    image: "/assets/project-fish.png",
    link: "#",
  },
  {
    title: "Agentic AI Newsletter Generator",
    description: "CrewAI agents, asynchronous pipelines for automated content generation",
    tech: ["CrewAI", "AI Agents", "Python", "Async"],
    image: "/assets/project-ai-newsletter.png",
    link: "#",
  },
  {
    title: "StableHR",
    description: "ETHGlobal Web3 app with wallet integration and Web3Storage",
    tech: ["Web3", "Ethereum", "Blockchain", "React"],
    image: "/assets/project-stablehr.png",
    link: "#",
  },
  {
    title: "Reinforcement Learning (Frozen Lake)",
    description: "Q-learning, SARSA, Monte Carlo algorithm implementations",
    tech: ["RL", "Q-Learning", "SARSA", "Python"],
    image: "/assets/project-rl.png",
    link: "#",
  },
  {
    title: "Autonomous Navigation ROS2",
    description: "Regulated pure pursuit controller, Multi-cost Theta* pathfinding",
    tech: ["ROS2", "Navigation", "Path Planning"],
    image: "/assets/project-nav.png",
    link: "#",
  },
  {
    title: "Soft Robot Control with DRL",
    description: "A2C, PPO with LSTM actor-critic networks for soft robotics",
    tech: ["Deep RL", "A2C", "PPO", "LSTM"],
    image: "/assets/project-drl.png",
    link: "#",
  },
  {
    title: "Drone Kalman Filter",
    description: "Fused IMU, sonar, GPS, barometer for robust state estimation",
    tech: ["Kalman Filter", "Sensor Fusion", "Drones"],
    image: "/assets/project-kalman.png",
    link: "#",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative min-h-screen py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 blueprint-grid opacity-10" />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 text-glow">Projects</h2>
          <div className="w-24 h-1 bg-primary mx-auto glow-effect" />
        </motion.div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <motion.div
                whileHover={{ scale: 1.03, rotateX: 2, rotateY: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mechanical-border overflow-hidden bg-card/50 backdrop-blur-sm tilt-card h-full"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  
                  {/* Corner Navigation Button */}
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 w-10 h-10 bg-primary/90 backdrop-blur-sm rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity glow-effect"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-5 h-5 text-primary-foreground" />
                  </motion.a>
                </div>

                {/* Project Info */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-mono bg-primary/20 text-primary border border-primary/30 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Decorative corners */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary/50" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary/50" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary/50" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary/50" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
