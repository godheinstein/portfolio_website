import { motion } from "framer-motion";
import { Link } from "wouter";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Underground GPS (UGPS)",
    description:
      "3D SLAM, pose graph optimization, Gazebo digital twin for GNSS-denied mining environments",
    tech: ["ROS2", "3D SLAM", "Sensor Fusion", "LiDAR"],
    image: "/assets/project-ugps.png",
    slug: "underground-gps-ugps",
    link: "#",
  },
  {
    title: "Heating Control System",
    description: "FEA thermal simulation, modular engineering with 80% cost reduction",
    tech: ["FEA", "Thermal Analysis", "CAD", "Optimization"],
    image: "/assets/project-heating.png",
    slug: "heating-control-system",
    link: "#",
  },
  {
    title: "ARTU",
    description: "Autonomous testing & calibration system for railway infrastructure",
    tech: ["Autonomous Systems", "Sensors", "Testing"],
    image: "/assets/project-artu.png",
    slug: "artu-autonomous-testing-unit",
    link: "#",
  },
  {
    title: "Onyx Home Robot Assistant",
    description: "SolidWorks competition runner-up, advanced home robotics design",
    tech: ["SolidWorks", "CAD", "Product Design"],
    image: "/assets/project-onyx.png",
    slug: "onyx-home-robot-assistant",
    link: "#",
  },
  {
    title: "Soft Robotic Fish",
    description: "TPU soft actuator + YOLOv8 tracking for biomimetic underwater robotics",
    tech: ["Soft Robotics", "YOLOv8", "Computer Vision"],
    image: "/assets/project-fish.png",
    slug: "soft-robotic-fish",
    link: "#",
  },
  {
    title: "Agentic AI Newsletter Generator",
    description: "CrewAI agents, asynchronous pipelines for automated content generation",
    tech: ["CrewAI", "AI Agents", "Python", "Async"],
    image: "/assets/project-ai-newsletter.png",
    slug: "agentic-ai-newsletter-generator",
    link: "#",
  },
  {
    title: "StableHR",
    description: "ETHGlobal Web3 app with wallet integration and Web3Storage",
    tech: ["Web3", "Ethereum", "Blockchain", "React"],
    image: "/assets/project-stablehr.png",
    slug: "stablehr-web3-app",
    link: "#",
  },
  {
    title: "Reinforcement Learning (Frozen Lake)",
    description: "Q-learning, SARSA, Monte Carlo algorithm implementations",
    tech: ["RL", "Q-Learning", "SARSA", "Python"],
    image: "/assets/project-rl.png",
    slug: "reinforcement-learning-frozen-lake",
    link: "#",
  },
  {
    title: "Autonomous Navigation ROS2",
    description: "Regulated pure pursuit controller, Multi-cost Theta* pathfinding",
    tech: ["ROS2", "Navigation", "Path Planning"],
    image: "/assets/project-nav.png",
    slug: "autonomous-navigation-ros2",
    link: "#",
  },
  {
    title: "Soft Robot Control with DRL",
    description: "A2C, PPO with LSTM actor-critic networks for soft robotics",
    tech: ["Deep RL", "A2C", "PPO", "LSTM"],
    image: "/assets/project-drl.png",
    slug: "soft-robot-control-drl",
    link: "#",
  },
  {
    title: "Drone Kalman Filter",
    description: "Fused IMU, sonar, GPS, barometer for robust state estimation",
    tech: ["Kalman Filter", "Sensor Fusion", "Drones"],
    image: "/assets/project-kalman.png",
    slug: "drone-kalman-filter",
    link: "#",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-10" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4 text-glow">Projects</h2>
          <div className="w-24 h-1 bg-primary mx-auto glow-effect" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="block h-full group focus:outline-none"
            >
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.03 }}
                whileHover={{ scale: 1.03, rotateX: 2, rotateY: 2 }}
                className="mechanical-border overflow-hidden bg-card/50 backdrop-blur-sm tilt-card h-full cursor-pointer
                           focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />

                  {/* Corner affordance (visual only; click passes through to the card) */}
                  <div
                    className="absolute top-3 right-3 w-10 h-10 bg-primary/90 backdrop-blur-sm rounded
                              flex items-center justify-center opacity-0 group-hover:opacity-75 transition
                              glow-effect pointer-events-none
                              transform group-hover:scale-110"
                  >
                    <ExternalLink className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 text-xs font-mono bg-primary/20 text-primary border border-primary/30 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
