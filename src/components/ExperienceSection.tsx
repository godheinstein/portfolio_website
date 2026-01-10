import { motion } from "framer-motion";

const experiences = [
  {
    company: "Dyson",
    role: "Robotics Intern",
    period: "2023 - 2024",
    highlights: [
      "Developed new docking prototype with NX CAD, Arduino, embedded systems",
      "LiDAR ground truth benchmarking with ROS2 + SLAM",
      "Digital twin simulation in Gazebo",
      "Integrated 2-in-1 SLAM + object detection",
      "Built 2D semantic segmentation (81.7% mIoU)",
    ],
    icons: ["/assets/icon-robot.svg",
  "/assets/icon-lidar.svg",
  "/assets/icon-target.svg"],
  },
  {
    company: "ApoSys Technologies",
    role: "Robotics & Mechanical Engineering Intern",
    period: "2022 - 2023",
    highlights: [
      "Autonomous Railway Testing Unit (ARTU)",
      "Heating Control System with 80% cost reduction (FEA thermal simulations)",
      "Underground GPS: ROS2 + 3D SLAM + pose graph optimization",
      "Achieved 95% accuracy in GNSS-denied mining tunnels",
    ],
    icons: ["🚂", "🔥", "📍"],
  },
  {
    company: "KABAM Robotics",
    role: "Robotics & Design Engineering Intern",
    period: "2021 - 2022",
    highlights: [
      "Created autonomous robotic systems",
      "Managed 6 CAD projects, designed robot brackets",
      "Built outdoor AMR robots from design → assembly → deployment",
    ],
    icons: ["🔧", "📐", "🚀"],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative min-h-screen py-20 overflow-hidden">
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
          <h2 className="text-5xl font-bold mb-4 text-glow">Experience</h2>
          <div className="w-24 h-1 bg-primary mx-auto glow-effect" />
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent hidden lg:block" />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background glow-effect hidden lg:block z-10" />

                {/* Card */}
                <motion.div
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-full lg:w-[calc(50%-3rem)] mechanical-border p-6 bg-card/50 backdrop-blur-sm tilt-card ${
                    index % 2 === 0 ? "lg:mr-auto" : "lg:ml-auto"
                  }`}
                >
                  {/* Company header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{exp.company}</h3>
                      <p className="text-lg text-primary font-medium">{exp.role}</p>
                      <p className="text-sm text-muted-foreground font-mono">{exp.period}</p>
                    </div>
                    <div className="flex gap-2">
                      {exp.icons.map((icon, i) => (
                        <motion.span
                          key={i}
                          className="text-2xl"
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          {icon}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="flex items-start gap-3 group"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 group-hover:scale-150 transition-transform" />
                        <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {highlight}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Decorative screws */}
                  <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-border" />
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-border" />
                  <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-border" />
                  <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-border" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
