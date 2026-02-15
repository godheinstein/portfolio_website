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
  Video,
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

type MediaItem =
  | { kind: "video"; src: string }
  | { kind: "embed"; src: string }
  | { kind: "image"; src: string };

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
    images: ["/assets/ATMU_proj.svg", "/assets/ATMU_proj2.png"],
    slug: "atmu-track-measurement-unit",
    myWork: [
      "Designed the overall assembly of the ATMU for testing, calibration, and data collection.",
      "Innovated the attachment to the locomotive using a spring suspension system to reduce vibrations and oscillations.",
      "Modular design allows for ease of swapping and troubleshooting.",
      "Reduced manual labour hours by 68% as testing is done more efficiently with the ATMU.",
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
    techIcons: ["/assets/icons/solidworks_icon.svg", "/assets/icons/dassault_icon.svg", "/assets/icons/ros2_icon.svg"],
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
    description: "Soft robotic fish with TPU soft actuator + YOLOv8 tracking for biomimetic underwater robotics",
    tech: ["Soft Robotics", "YOLOv8", "Computer Vision"],
    techIcons: ["/assets/dassault_icon.svg", "/assets/cpp_icon.svg", "/assets/solidworks_icon.svg"],
    images: ["/assets/fish_proj.png", "/assets/fish_proj2.png", "/assets/fish_proj3.png", "/assets/fish_proj4.png"],
    slug: "soft-robotic-fish",
    myWork: [
      "Created a soft robotic fish that can swim in water and turn left and right effectively.",
      "TPU soft actuator design for biomimetic swimming motion.",
      "YOLOv8-based CV pose tracking for autonomous target navigation and control feedback.",
    ],
    skills: "Soft Robotics • Computer Vision • Pose Tracking",
    video: "/assets/soft_robotic_fish.mp4",
  },
  {
    title: "Agentic AI Newsletter Generator",
    description: ["CrewAI agents, asynchronous pipelines for automated newsletter generation", 
                  "Hierarchical Task Management: Structured task execution to utilise AI agents", 
                  "Asynchronous Tasks: Improve performance by allowing tasks to run concurrently",
                  "Callbacks: Enabling a reactive task flow",
                  "Expected Outputs: Define the anticipated results for each task",],
    tech: ["CrewAI", "AI Agents", "Python", "Async"],
    techIcons: ["/assets/python_icon2.svg", "/assets/openai_icon.svg", "/assets/ollama_icon.svg"],
    image: "/assets/news_proj.png",
    slug: "agentic-ai-newsletter-generator",
    myWork: [
      "Created Multi-agent pipeline design using CrewAI Agents and Ollama Local LLMs, showcasing advanced AI-powered automation through hierarchical, asynchronous tasks with callbacks and predefined expected outputs. ",
      "It is designed to illustrate an enhanced workflow for building AI-driven newsletter automation tools.",
    ],
    skills: "AI Agents • LLMs • Multi-agent Systems • Prompt Engineering • Python",
    links: [
      { label: "Github", href: "https://github.com/godheinstein/AI_newsletter", icon: "github" },
    ],
  },
  {
    title: "Reinforcement Learning (Frozen Lake)",
    description: ["Consider a frozen lake with holes covered by patches of very thin ice. Suppose that a robot is to glide on the frozen surface from one location(i.e., the top left corner) to another (bottom right corner) in order to pick up a frisbee.", 
      "Implemented Q-learning, SARSA, Monte Carlo algorithm to solve the Frozen Lake problem."],
    tech: ["RL", "Q-Learning", "SARSA", "Python"],
    techIcons: ["/assets/python_icon2.svg", "/assets/matplotlib_icon.svg", "/assets/numpy_icon.svg"],
    image: "/assets/frozen_proj.png",
    slug: "reinforcement-learning-frozen-lake",
    myWork: [
      "Implemented Q-learning, SARSA, and Monte Carlo methods from scratch, to solve the Frozen Lake problem.",
      "Compared learning dynamics and stability across algorithms.",
      "Expanded the problem to a 10x10 grid and tested the 3 RL algorithms",
      "Tuned hyperparameters (ϵ epsilon, no. of episodes, etc.) "
    ],
    skills: "Reinforcement Learning • Python • Matplotlib • NumPy • Data Structures & Algorithms • Object-Oriented Programming",
    links: [
      { label: "Github", href: "https://github.com/godheinstein/Frozen_lake_problem-Reinforcement_learning/tree/master", icon: "github" },
    ],
  },
  {
    title: "Autonomous Navigation ROS2",
    description: "Built an autonomous navigation stack in ROS2 Nav2, A* path planning, Savitzky Golay smoothing, regulated pure pursuit control, to reliably traverse an obstacle maze.",
    tech: ["ROS2", "Navigation", "Path Planning Algorithms", "Controls"],
    techIcons: ["/assets/ros2_icon.svg", "/assets/gazebo_icon2.svg", "/assets/python_icon2.svg"],
    image: "/assets/Nav_proj.svg",
    slug: "autonomous-navigation-ros2",
    myWork: [
      "Programmed the regulated pure pursuit controller with curvature heuristics, proximity heuristics and varying lookahead distances, for robust trajectory tracking.",
      "Programmed the Multi-cost Theta* as the path planner algorithm to achieve the most efficient and optimal path.",
      "Tuned and optimised parameters to achieve the best performance.",
    ],
    skills: "ROS 2 • Path Planning Algorithms • Controls • Python • C++ • Gazebo Simulation",
    links: [
      { label: "Github", href: "https://github.com/godheinstein/Autonomous_Navigation_ROS2", icon: "github" },
    ],
    video: "/assets/nav_demo.mp4",
  },
  {
    title: "Soft Robot Control with DRL",
    description: ["Soft robots' compliant nature and non-linear dynamics make it difficult to model, control, and plan the trajectory of soft robots.", "Developed a deep reinforcement learning control framework for a tendon-driven soft robot, using A2C and PPO with LSTM actor–critic networks and imitation learning with decaying priors to learn tendon actuation policies for precise target-reaching despite nonlinear dynamics."],
    tech: ["Deep Reinforcement Learning", "A2C", "PPO", "LSTM", "Imitation Learning"],
    techIcons: ["/assets/tensorflow_icon.svg", "/assets/keras_icon.svg", "/assets/python_icon2.svg"],
    images: ["/assets/drl_proj.png","/assets/drl_proj2.png","/assets/drl_proj3.png","/assets/drl_proj4.png","/assets/drl_proj5.png"],
    slug: "soft-robot-control-drl",
    myWork: [
      "Programmed 2 DRL algorithms to train the learning agent, Advantage Actor Critic (A2C) and Proximal Policy Optimisation (PPO)",
      "Optimised the hyperparameters with the Bayesian Optimisation algorithm script",
      "Designed an Actor-Critic neural network with LSTM and RNN using Tensorflow and Keras",
    ],
    skills: "Deep Reinforcement Learning • Neural Networks • Imitation Learning • Imitation Learning • Python • Tensorflow • Keras",
    video: "/assets/drl_video.mp4",
    links: [
      { label: "Github", href: "https://github.com/godheinstein/Soft_Robot_Control_Deep_Reinforcement_Learning/tree/master", icon: "github" },
    ],
  },
  {
    title: "Drone Kalman Filter",
    description: ["This project simulates a drone's flight behavior and implements a simplified Kalman Filter for robust state estimation.",
                  "The core objective is to accurately estimate the drone's position and velocity using various sensor data, enabling precise navigation and control in a simulated environment."      
                ],
    tech: ["Kalman Filter", "Sensor Fusion", "Drones", "Gazebo Simulations"],
    techIcons: ["/assets/ros2_icon.svg", "/assets/gazebo_icon2.svg", "/assets/python_icon2.svg"],
    image: "/assets/ekf_proj.svg",
    slug: "drone-kalman-filter",
    myWork: [
      "Develop a behaviour node that includes automated takeoff, dynamic waypoint following, & controlled landing procedures.",
      "Developed a simplified Kalman Filter to fuse sensor data from IMU, Sonar, GPS, Magnetic Sensor, & Barometer for accurate real-time estimation of drone’s pose and twist.",
      "Implemented a custom controller to control the drone smoothly along planned trajectories.",
    ],
    skills: "State Estimation • Sensor Fusion • ROS2 Programming • Python • C++ • Gazebo Simulation",
    video: "/assets/ekf_demo.mp4",
    links: [
      { label: "Github", href: "https://github.com/godheinstein/Drone_Kalman_Filter", icon: "github" },
    ],
  },
  {
    title: "Onyx Home Robot Assistant",
    description: "Onyx is an attachment on top of an existing roomba, and it serves as a robot assistant to move things around the house and help with daily household chores. ",
    tech: ["SolidWorks", "CAD", "Product Design"],
    techIcons: ["/assets/solidworks_icon.svg", "/assets/dassault_icon.svg",],
    images: ["/assets/onyx_proj.png","/assets/onyx_proj2.png",],
    slug: "onyx-home-robot-assistant",
    myWork: [
      "Achieved 1st Runner-up for Solidworks Design Competition organised by Dassault Systemes.",
      "Innovated the idea of a home robot assistant to help with household chores.",
      "Modular Design with attachment to existing robotic vacuums.",
    ],
    skills: "CAD • Product Design • Prototyping • Solidworks • Rapid Prototyping • Rendering",
  },
  {
    title: "StableHR",
    description:
      "StableHR is a cross-border automated payment system that allows efficient, low-cost, multi-currency transfers",
    tech: ["Web3", "Ethereum", "Blockchain", "React"],
    techIcons: ["/assets/eth_icon.svg", "/assets/walletconnect_icon.svg", "/assets/1inch_icon.svg", "/assets/polygon_icon.svg", "/assets/XMTP_icon.svg","/assets/filecoin_icon.svg"],
    image: "/assets/stable_proj.svg",
    slug: "stablehr-web3-app",
    myWork: [
      "I participated ETHGlobal New York Hackathon where developers build innovative projects on Ethereum blockchain, fostering collaboration, learning, and pushing the boundaries of decentralized technology, web3 and crypto",
      "WalletConnect and Web3Auth for wallet integration and account management.",
      "1Inch for a comprehensive crypto quote and swap APIs",
      "Unlimit’s Onramp SDK for users to convert fiat to crypto",
      "Filecoin’s Web3Storage to store website assets",
      "XMTP for integrated messaging protocol",
      "Nouns artworks to beautify and add personality to the project",
      "Polygon Mumbai testnet for application transactions",
    ],
    skills: "Web3 • Integrations",
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

  // Build ONE media list: video first (autoplay/loop), then images.
  // Note: embedUrl is supported, but autoplay/loop is not reliable for embeds.
  const media: MediaItem[] = useMemo(() => {
    const items: MediaItem[] = [];
    if (project.video) items.push({ kind: "video", src: project.video });
    if (project.embedUrl) items.push({ kind: "embed", src: project.embedUrl });

    const imgs: string[] = project.images?.length
      ? project.images
      : project.image
      ? [project.image]
      : [];

    for (const src of imgs) items.push({ kind: "image", src });
    return items;
  }, [project.video, project.embedUrl, project.images, project.image]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [slug]);

  const hasMultiple = media.length > 1;

  const goPrev = () => {
    if (!hasMultiple) return;
    setActiveIndex((i) => (i - 1 + media.length) % media.length);
  };

  const goNext = () => {
    if (!hasMultiple) return;
    setActiveIndex((i) => (i + 1) % media.length);
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
  }, [hasMultiple, media.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const active = media[activeIndex];

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
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          {/* Media (Video first, then images) */}
          <div className="mechanical-border bg-card/40 backdrop-blur-sm p-3">
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
              {media.length ? (
                <div className="relative w-full h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${active.kind}:${active.src}`}
                      className="absolute inset-0 w-full h-full"
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -18 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      {active.kind === "video" ? (
                        <video
                          className="w-full h-full object-cover"
                          src={active.src}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          controls={false}
                        />
                      ) : active.kind === "embed" ? (
                        <iframe
                          className="w-full h-full"
                          src={active.src}
                          title={`${project.title} video`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <img
                          src={active.src}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          draggable={false}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Arrows */}
                  {hasMultiple && (
                    <>
                      <button
                        type="button"
                        onClick={goPrev}
                        aria-label="Previous media"
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
                        aria-label="Next media"
                        className="absolute right-3 top-1/2 -translate-y-1/2
                                   w-10 h-10 rounded-lg mechanical-border
                                   bg-white/10 backdrop-blur-md hover:bg-white/15 transition
                                   flex items-center justify-center"
                      >
                        <ChevronRight className="w-5 h-5 text-foreground" />
                      </button>

                      <div
                        className="absolute bottom-3 right-3 px-2 py-1 text-[11px] font-mono
                                   rounded-md bg-black/30 backdrop-blur-sm text-foreground/90"
                      >
                        {activeIndex + 1}/{media.length}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                  No media available
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Thumbnails */}
            {hasMultiple && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {media.map((m, i) => (
                  <button
                    key={`${m.kind}:${m.src}`}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-label={`View media ${i + 1}`}
                    className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border transition
                      ${
                        i === activeIndex
                          ? "border-primary ring-1 ring-primary/50"
                          : "border-white/20 opacity-70 hover:opacity-100"
                      }`}
                  >
                    {m.kind === "image" ? (
                      <img src={m.src} alt="" className="h-full w-full object-cover" draggable={false} />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-black/30">
                        {m.kind === "video" ? (
                          <Video className="w-6 h-6 text-foreground/80" />
                        ) : (
                          <Play className="w-6 h-6 text-foreground/80" />
                        )}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {hasMultiple && (
              <div className="mt-2 text-[11px] font-mono text-muted-foreground">
                Tip: Use <span className="text-foreground/80">←</span> /{" "}
                <span className="text-foreground/80">→</span> to navigate
              </div>
            )}
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
                <p className="mt-3 text-muted-foreground leading-relaxed">{project.description}</p>
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
                    className="relative w-20 h-10 flex items-center justify-center
                              rounded-lg bg-white/85
                              border border-white/10
                              hover:border-primary/40
                              transition-all"
                  >
                    <img
                      src={src}
                      alt=""
                      className="relative w-20 h-10 sm:w-18 sm:h-8 object-contain opacity-100"
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
