import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useRoute } from "wouter";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  FileText,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type ProjectLink = {
  label: string;
  href: string;
  icon?: "demo" | "github" | "paper" | "external";
};

type Project = {
  title: string;
  description: string | string[]; // supports paragraph OR bullets
  tech: string[];
  techIcons?: string[]; // svg paths in /public/assets/...
  image?: string; // fallback
  images?: string[]; // gallery
  slug: string;

  // content
  myWork: string[];
  skills?: string;

  // optional
  links?: ProjectLink[];
  video?: string; // local mp4 in /public/assets/...
  embedUrl?: string; // youtube/vimeo embed
};

const projects: Project[] = [
  {
    title: "Underground GPS (UGPS)",
    description:
      "Developed a real-time 3D SLAM system with pose graph optimization and loop closure, integrated with a Gazebo digital twin to enable navigation in GNSS-denied mining environments using live-generated maps.",
    tech: ["ROS2", "3D SLAM", "Sensor Fusion", "LiDAR"],
    techIcons: ["/assets/ros2_icon.svg", "/assets/gazebo_icon2.svg", "/assets/python_icon2.svg"],
    images: ["/assets/project-ugps.png", "/assets/UGPS_proj.svg",],
    slug: "underground-gps-ugps",
    myWork: [
      "Developed 3D SLAM Mapping with 3D Ouster LiDAR using ROS2.",
      "Implemented pose graph optimization for improved localization accuracy.",
      "Achieved sensor fusion of 9-axis IMU with 3D LiDAR.",
      "Reduced safety risk probability for mining operators by 3x using UGPS navigation support.",
      "Simulated a digital twin of the environment using Gazebo.",
      "Optimized 3D SLAM with pose-graph optimization, scan matching, and loop closure to achieve 95% mapping/localization accuracy in GNSS-denied tunnels.",
    ],
    skills: "ROS 2 • SLAM • Sensor Fusion • Gazebo Simulation • Python • C++",
    links: [
      {
        label: "Website",
        href: "https://www.aposystech.com/solutions/underground-positioning-system",
        icon: "external",
      },
    ],
  },
  {
    title: "Autonomous Track Measurement Unit (ATMU)",
    description: "Autonomous track measurement unit for railway infrastructure using sensor fusion and data analytics to enable continuous infrastructure monitoring and predictive maintenance.",
    tech: ["Autonomous Systems", "Sensor Fusion", "Predictive Maintenance", "Computer-aided Design (CAD)"],
    techIcons: ["/assets/solidworks_icon.svg", "/assets/dassault_icon.svg"],
    image: "/assets/ATMU_proj.svg",
    slug: "atmu-track-measurement-unit",
    myWork: [
      "Designed the overall assembly of the ATMU.",
      "Innovated the attachment to the locomotive using a spring suspension system to reduce vibrations and oscillations.",
      "Modular design allows for ease of swapping and troubleshooting.",
    ],
    skills: "Autonomous Systems • Sensor Fusion • CAD • Design for Manufacturing",
    links: [
      {
        label: "Website",
        href: "https://www.aposystech.com/industries/railways/autonomous-track-monitoring",
        icon: "external",
      },
    ],
  },
  {
    title: "KABAM Robotics AMRs",
    description: [
      "AI-driven AMRs for Security Surveillance and Patrol",
      "Autonomous Navigation and Obstacle Avoidance",
      "AI Detection of Anomalies",
      "24/7 Real-time Security Surveillance",
    ],
    tech: ["CAD", "Design for Manufacturing", "Rapid Prototyping", "Robotics"],
    techIcons: ["/assets/icons/cad.svg", "/assets/icons/prototype.svg", "/assets/icons/robot.svg"],
    image: "/assets/kabam_proj.svg",
    // images: ["/assets/project-kabam-1.png", "/assets/project-kabam-2.png"],
    slug: "kabam-robotics-amrs",
    myWork: [
      "Built and deployed MVP AMRs with custom sensor mounts and payload integration.",
      "Led 6+ CAD projects covering design, prototyping, and deployment-ready hardware.",
      "Innovated solutions across design, assembly, deployment, and testing stages.",
    ],
    skills: "CAD • DFM • Rapid Prototyping • Sheet Metal Design",
    links: [
      { label: "Website", href: "https://kabam.ai/", icon: "external" },
      { label: "Pilot Project", href: "https://www.certisgroup.com/certis-robotic-solutions/", icon: "external" },
    ],
  },
  {
    title: "Soft Robotic Fish",
    description: "TPU soft actuator + YOLOv8 tracking for biomimetic underwater robotics",
    tech: ["Soft Robotics", "YOLOv8", "Computer Vision"],
    techIcons: ["/assets/icons/softrobotics.svg", "/assets/icons/yolo.svg", "/assets/icons/vision.svg"],
    image: "/assets/project-fish.png",
    slug: "soft-robotic-fish",
    myWork: [
      "TPU soft actuator design for biomimetic swimming motion.",
      "YOLOv8-based tracking for experimental evaluation and control feedback.",
    ],
    skills: "Soft Robotics • Vision • Tracking",
  },
  {
    title: "Agentic AI Newsletter Generator",
    description: "CrewAI agents, asynchronous pipelines for automated content generation",
    tech: ["CrewAI", "AI Agents", "Python", "Async"],
    techIcons: ["/assets/icons/python.svg", "/assets/icons/agents.svg", "/assets/icons/async.svg"],
    image: "/assets/project-ai-newsletter.png",
    slug: "agentic-ai-newsletter-generator",
    myWork: [
      "Multi-agent pipeline design using CrewAI for topic→draft→review flows.",
      "Asynchronous execution to improve throughput and automation.",
    ],
    skills: "Agents • Python • Async Pipelines",
  },
  {
    title: "Reinforcement Learning (Frozen Lake)",
    description: "Q-learning, SARSA, Monte Carlo algorithm implementations",
    tech: ["RL", "Q-Learning", "SARSA", "Python"],
    techIcons: ["/assets/icons/rl.svg", "/assets/icons/python.svg"],
    image: "/assets/project-rl.png",
    slug: "reinforcement-learning-frozen-lake",
    myWork: [
      "Implemented Q-learning, SARSA, and Monte Carlo methods from scratch.",
      "Compared learning dynamics and stability across algorithms.",
    ],
    skills: "RL • Python • Experimentation",
  },
  {
    title: "Autonomous Navigation ROS2",
    description: "Regulated pure pursuit controller, Multi-cost Theta* pathfinding",
    tech: ["ROS2", "Navigation", "Path Planning"],
    techIcons: ["/assets/icons/ros2.svg", "/assets/icons/navigation.svg", "/assets/icons/planning.svg"],
    image: "/assets/project-nav.png",
    slug: "autonomous-navigation-ros2",
    myWork: [
      "Regulated Pure Pursuit for robust trajectory tracking.",
      "Multi-cost Theta* path planning for efficient navigation.",
    ],
    skills: "ROS 2 • Planning • Controls",
  },
  {
    title: "Soft Robot Control with DRL",
    description: "A2C, PPO with LSTM actor-critic networks for soft robotics",
    tech: ["Deep RL", "A2C", "PPO", "LSTM"],
    techIcons: ["/assets/icons/drl.svg", "/assets/icons/python.svg"],
    image: "/assets/project-drl.png",
    slug: "soft-robot-control-drl",
    myWork: [
      "Actor-critic DRL control using A2C and PPO.",
      "LSTM policy networks for temporal dynamics in soft robotics.",
    ],
    skills: "Deep RL • Neural Nets • Control",
  },
  {
    title: "Drone Kalman Filter",
    description: "Fused IMU, sonar, GPS, barometer for robust state estimation",
    tech: ["Kalman Filter", "Sensor Fusion", "Drones"],
    techIcons: ["/assets/icons/kalman.svg", "/assets/icons/fusion.svg", "/assets/icons/drone.svg"],
    image: "/assets/project-kalman.png",
    slug: "drone-kalman-filter",
    myWork: [
      "Multi-sensor fusion (IMU, sonar, GPS, barometer) for robust estimation.",
      "Filter tuning for stability and performance under noisy measurements.",
    ],
    skills: "State Estimation • Fusion • Robotics",
  },
  {
    title: "Onyx Home Robot Assistant",
    description: "SolidWorks competition runner-up, advanced home robotics design",
    tech: ["SolidWorks", "CAD", "Product Design"],
    techIcons: ["/assets/icons/solidworks.svg", "/assets/icons/cad.svg", "/assets/icons/design.svg"],
    image: "/assets/project-onyx.png",
    slug: "onyx-home-robot-assistant",
    myWork: [
      "Competition runner-up design with focus on real home use-cases.",
      "End-to-end CAD and product design workflow in SolidWorks.",
    ],
    skills: "CAD • Product Design • Prototyping",
  },
  {
    title: "StableHR",
    description:
      "StableHR is a cross-border automated payment system that allows efficient, low-cost, multi-currency transfers",
    tech: ["Web3", "Ethereum", "Blockchain", "React"],
    techIcons: ["/assets/icons/react.svg", "/assets/icons/ethereum.svg", "/assets/icons/web3.svg"],
    image: "/assets/project-stablehr.png",
    slug: "stablehr-web3-app",
    myWork: [
      "ETHGlobal project with wallet integration and decentralized storage.",
      "Front-end built in React with Web3Storage integration.",
    ],
    skills: "React • Web3 • Integrations",
  },
];

function linkIcon(kind?: ProjectLink["icon"]) {
  const cls = "w-4 h-4";
  switch (kind) {
    case "github":
      return <Github className={cls} />;
    case "paper":
      return <FileText className={cls} />;
    case "demo":
      return <Play className={cls} />;
    default:
      return <ExternalLink className={cls} />;
  }
}

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:slug");
  const slug = params?.slug;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <section className="min-h-screen py-20">
        <div className="container">
          <h1 className="text-3xl font-bold">Project not found</h1>
          <p className="mt-3 text-muted-foreground">The project URL may be incorrect.</p>
          <Link href="/#projects" className="inline-flex mt-6 items-center gap-2 text-primary">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  // ----- Gallery setup (only for image gallery; disabled when video/embed is present) -----
  const images = useMemo(() => {
    if (project.images?.length) return project.images;
    if (project.image) return [project.image];
    return [];
  }, [project.images, project.image]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [slug]);

  const canGallery = !project.embedUrl && !project.video && images.length > 0;
  const hasMultiple = canGallery && images.length > 1;

  const goPrev = () => {
    if (!hasMultiple) return;
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  };

  const goNext = () => {
    if (!hasMultiple) return;
    setActiveIndex((i) => (i + 1) % images.length);
  };

  useEffect(() => {
    if (!hasMultiple) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const tag = t?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || (t as any)?.isContentEditable) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hasMultiple, images.length]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="relative min-h-screen py-20 overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-10" />

      <div className="container relative z-10">
        <div className="flex items-start justify-between gap-4 mb-10">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          {/* Links */}
          {project.links?.length ? (
            <div className="flex flex-wrap gap-2 justify-end">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-mono
                             mechanical-border bg-white/10 backdrop-blur-md
                             hover:bg-white/15 transition"
                >
                  {linkIcon(l.icon)}
                  <span>{l.label}</span>
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 gap-10 items-start"
        >
          {/* Media (Video OR Image Gallery) */}
          <div className="mechanical-border bg-card/40 backdrop-blur-sm p-3">
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
              {project.embedUrl ? (
                <iframe
                  className="w-full h-full"
                  src={project.embedUrl}
                  title={`${project.title} video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : project.video ? (
                <video
                  className="w-full h-full object-cover"
                  src={project.video}
                  controls
                  playsInline
                  preload="metadata"
                />
              ) : (
                <div className="relative w-full h-full">
                  {images.length ? (
                    <>
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeIndex}
                          src={images[activeIndex]}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          initial={{ opacity: 0, x: 18 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -18 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          draggable={false}
                        />
                      </AnimatePresence>

                      {/* Arrows */}
                      {hasMultiple && (
                        <>
                          <button
                            type="button"
                            onClick={goPrev}
                            aria-label="Previous image"
                            className="absolute left-3 top-1/2 -translate-y-1/2
                                       w-10 h-10 rounded-lg mechanical-border
                                       bg-white/10 backdrop-blur-md hover:bg-white/15 transition
                                       flex items-center justify-center"
                          >
                            <ChevronLeft className="w-5 h-5 text-foreground" />
                          </button>

                          <button
                            type="button"
                            onClick={goNext}
                            aria-label="Next image"
                            className="absolute right-3 top-1/2 -translate-y-1/2
                                       w-10 h-10 rounded-lg mechanical-border
                                       bg-white/10 backdrop-blur-md hover:bg-white/15 transition
                                       flex items-center justify-center"
                          >
                            <ChevronRight className="w-5 h-5 text-foreground" />
                          </button>

                          {/* Counter */}
                          <div
                            className="absolute bottom-3 right-3 px-2 py-1 text-[11px] font-mono
                                       rounded-md bg-black/30 backdrop-blur-sm text-foreground/90"
                          >
                            {activeIndex + 1}/{images.length}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                      No media available
                    </div>
                  )}
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Thumbnails */}
            {hasMultiple && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border transition
                      ${
                        i === activeIndex
                          ? "border-primary ring-1 ring-primary/50"
                          : "border-white/20 opacity-70 hover:opacity-100"
                      }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
                  </button>
                ))}
              </div>
            )}

            {/* Keyboard hint
            {hasMultiple && (
              <div className="mt-2 text-[11px] font-mono text-muted-foreground">
                Use <span className="text-foreground/80">←</span> /{" "}
                <span className="text-foreground/80">→</span> to navigate
              </div>
            )} */}
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-glow">{project.title}</h1>

              {Array.isArray(project.description) ? (
                <ul className="mt-3 space-y-2 text-muted-foreground list-disc pl-5">
                  {project.description.map((item) => (
                    <li key={item} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              )}
            </div>

            {/* Tech tags */}
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

            {/* Tech icons (rectangular badges) */}
            {project.techIcons?.length ? (
              <div className="flex flex-wrap gap-3 items-center">
                {project.techIcons.map((src) => (
                  <div
                    key={src}
                    className="relative w-30 h-15 sm:w-25 sm:h-10 flex items-center justify-center
                               mechanical-border bg-white/10 backdrop-blur-md overflow-hidden rounded-lg"
                  >
                    <div className="absolute inset-0 bg-white/75" />
                    <img
                      src={src}
                      alt=""
                      className="relative w-30 h-15 sm:w-25 sm:h-10 object-contain opacity-100"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            ) : null}

            {/* My Work */}
            <div className="mechanical-border p-6 bg-card/30 backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-4">My Work</h2>
              <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                {project.myWork.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            {project.skills ? (
              <div className="mechanical-border p-4 bg-card/20 backdrop-blur-sm">
                <div className="text-xs font-mono text-muted-foreground">Skills</div>
                <div className="mt-1 text-sm">{project.skills}</div>
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
