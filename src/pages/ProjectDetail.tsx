import { motion } from "framer-motion";
import { Link, useRoute } from "wouter";
import { ArrowLeft } from "lucide-react";

const projects = [
  {
    title: "Underground GPS (UGPS)",
    description:
      "3D SLAM, pose graph optimization, Gazebo digital twin for GNSS-denied mining environments",
    tech: ["ROS2", "3D SLAM", "Sensor Fusion", "LiDAR"],
    image: "/assets/project-ugps.png",
    slug: "underground-gps-ugps",
    link: "#",
    highlights: [
      "GNSS-denied localization workflow using LiDAR + sensor fusion.",
      "Validation-oriented development with repeatable testing methodology.",
    ],
  },
  {
    title: "Heating Control System",
    description: "FEA thermal simulation, modular engineering with 80% cost reduction",
    tech: ["FEA", "Thermal Analysis", "CAD", "Optimization"],
    image: "/assets/project-heating.png",
    slug: "heating-control-system",
    link: "#",
    highlights: [
      "Thermal/FEA-driven design iteration to meet harsh environment constraints.",
      "Modular architecture leading to 80% cost reduction.",
    ],
  },
  {
    title: "ARTU",
    description: "Autonomous testing & calibration system for railway infrastructure",
    tech: ["Autonomous Systems", "Sensors", "Testing"],
    image: "/assets/project-artu.png",
    slug: "artu-autonomous-testing-unit",
    link: "#",
    highlights: [
      "Autonomous calibration/testing workflows for repeatable field operations.",
      "Sensor-based diagnostics to support reliable infrastructure validation.",
    ],
  },
  {
    title: "Onyx Home Robot Assistant",
    description: "SolidWorks competition runner-up, advanced home robotics design",
    tech: ["SolidWorks", "CAD", "Product Design"],
    image: "/assets/project-onyx.png",
    slug: "onyx-home-robot-assistant",
    link: "#",
    highlights: [
      "Competition runner-up design with focus on real home use-cases.",
      "End-to-end CAD and product design workflow in SolidWorks.",
    ],
  },
  {
    title: "Soft Robotic Fish",
    description: "TPU soft actuator + YOLOv8 tracking for biomimetic underwater robotics",
    tech: ["Soft Robotics", "YOLOv8", "Computer Vision"],
    image: "/assets/project-fish.png",
    slug: "soft-robotic-fish",
    link: "#",
    highlights: [
      "TPU soft actuator design for biomimetic swimming motion.",
      "YOLOv8-based tracking for experimental evaluation and control feedback.",
    ],
  },
  {
    title: "Agentic AI Newsletter Generator",
    description: "CrewAI agents, asynchronous pipelines for automated content generation",
    tech: ["CrewAI", "AI Agents", "Python", "Async"],
    image: "/assets/project-ai-newsletter.png",
    slug: "agentic-ai-newsletter-generator",
    link: "#",
    highlights: [
      "Multi-agent pipeline design using CrewAI for topic→draft→review flows.",
      "Asynchronous execution to improve throughput and automation.",
    ],
  },
  {
    title: "StableHR",
    description: "ETHGlobal Web3 app with wallet integration and Web3Storage",
    tech: ["Web3", "Ethereum", "Blockchain", "React"],
    image: "/assets/project-stablehr.png",
    slug: "stablehr-web3-app",
    link: "#",
    highlights: [
      "ETHGlobal project with wallet integration and decentralized storage.",
      "Front-end built in React with Web3Storage integration.",
    ],
  },
  {
    title: "Reinforcement Learning (Frozen Lake)",
    description: "Q-learning, SARSA, Monte Carlo algorithm implementations",
    tech: ["RL", "Q-Learning", "SARSA", "Python"],
    image: "/assets/project-rl.png",
    slug: "reinforcement-learning-frozen-lake",
    link: "#",
    highlights: [
      "Implemented Q-learning, SARSA, and Monte Carlo methods from scratch.",
      "Compared learning dynamics and stability across algorithms.",
    ],
  },
  {
    title: "Autonomous Navigation ROS2",
    description: "Regulated pure pursuit controller, Multi-cost Theta* pathfinding",
    tech: ["ROS2", "Navigation", "Path Planning"],
    image: "/assets/project-nav.png",
    slug: "autonomous-navigation-ros2",
    link: "#",
    highlights: [
      "Regulated Pure Pursuit for robust trajectory tracking.",
      "Multi-cost Theta* path planning for efficient navigation.",
    ],
  },
  {
    title: "Soft Robot Control with DRL",
    description: "A2C, PPO with LSTM actor-critic networks for soft robotics",
    tech: ["Deep RL", "A2C", "PPO", "LSTM"],
    image: "/assets/project-drl.png",
    slug: "soft-robot-control-drl",
    link: "#",
    highlights: [
      "Actor-critic DRL control using A2C and PPO.",
      "LSTM policy networks for temporal dynamics in soft robotics.",
    ],
  },
  {
    title: "Drone Kalman Filter",
    description: "Fused IMU, sonar, GPS, barometer for robust state estimation",
    tech: ["Kalman Filter", "Sensor Fusion", "Drones"],
    image: "/assets/project-kalman.png",
    slug: "drone-kalman-filter",
    link: "#",
    highlights: [
      "Multi-sensor fusion (IMU, sonar, GPS, barometer) for robust estimation.",
      "Filter tuning for stability and performance under noisy measurements.",
    ],
  },
];

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:slug");
  const slug = params?.slug;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <section className="min-h-screen py-20">
        <div className="container">
          <h1 className="text-3xl font-bold">Project not found</h1>
          <p className="mt-3 text-muted-foreground">
            The project URL may be incorrect.
          </p>
          <Link
            href="/#projects"
            className="inline-flex mt-6 items-center gap-2 text-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen py-20 overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-10" />

      <div className="container relative z-10">
        <div className="flex items-center justify-between gap-4 mb-10">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 gap-10 items-start"
        >
          {/* Image */}
          <div className="mechanical-border overflow-hidden bg-card/40 backdrop-blur-sm">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-glow">{project.title}</h1>
              <p className="mt-3 text-muted-foreground leading-relaxed">
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

            {/* Highlights */}
            <div className="mechanical-border p-6 bg-card/30 backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-4">Highlights</h2>
              <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>

            {/* Optional: placeholder sections you can fill later */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="mechanical-border p-4 bg-card/20 backdrop-blur-sm">
                <div className="text-xs font-mono text-muted-foreground">Role</div>
                <div className="mt-1 text-sm">Implementation • Testing • Iteration</div>
              </div>
              <div className="mechanical-border p-4 bg-card/20 backdrop-blur-sm">
                <div className="text-xs font-mono text-muted-foreground">Focus</div>
                <div className="mt-1 text-sm">Robotics Systems • Algorithms • Integration</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
