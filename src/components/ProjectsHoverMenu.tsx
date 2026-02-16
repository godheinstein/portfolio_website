import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ExternalLink } from "lucide-react";

type ProjectsHoverMenuProps = {
  mobile?: boolean;
};

const projects = [
  { title: "Underground GPS (UGPS)", slug: "underground-gps-ugps" },
  { title: "Autonomous Track Measurement Unit (ATMU)", slug: "atmu-track-measurement-unit" },
  { title: "KABAM Robotics AMRs", slug: "kabam-robotics-amrs" },
  { title: "Soft Robotic Fish", slug: "soft-robotic-fish" },
  { title: "Agentic AI Newsletter Generator", slug: "agentic-ai-newsletter-generator" },
  { title: "Reinforcement Learning (Frozen Lake)", slug: "reinforcement-learning-frozen-lake" },
  { title: "Autonomous Navigation ROS2", slug: "autonomous-navigation-ros2" },
  { title: "Soft Robot Control with DRL", slug: "soft-robot-control-drl" },
  { title: "Drone Kalman Filter", slug: "drone-kalman-filter" },
  { title: "Onyx Home Robot Assistant", slug: "onyx-home-robot-assistant" },
  { title: "StableHR", slug: "stablehr-web3-app" },
];

export default function ProjectsHoverMenu({ mobile = false }: ProjectsHoverMenuProps) {
  if (mobile) {
    return (
      <div className="space-y-2">
        {projects.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`}>
            <a className="flex items-center justify-between px-4 py-3 rounded-lg mechanical-border bg-white/5 hover:bg-white/10 transition">
              <span className="text-sm text-muted-foreground hover:text-foreground">
                {p.title}
              </span>
              <ExternalLink className="w-4 h-4 text-primary/70" />
            </a>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.16, ease: "easeOut" }}
        className="w-80 mechanical-border bg-background/90 backdrop-blur-lg p-3 rounded-xl shadow-lg"
      >
        <div className="text-xs font-mono text-muted-foreground px-2 pb-2">
          Projects
        </div>

        <div className="flex flex-col">
          {projects.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`}>
              <a className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 transition">
                <span className="text-sm text-muted-foreground hover:text-foreground">
                  {p.title}
                </span>
                <ExternalLink className="w-4 h-4 text-primary/70" />
              </a>
            </Link>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
