import { motion } from "framer-motion";

const experiences = [
  {
    company: "Dyson",
    role: "Robotics Intern",
    location: "Singapore",
    period: "Jan 2025 - May 2025",
    highlights: [
      "Delivered a new robotic vacuum docking system in 5 months using NX CAD, embedded systems, and rapid prototyping",
      "Built a ROS 2 LiDAR ground-truth benchmarking system and Gazebo digital twin, cutting testing and development time by 2×.",
      "Developed SLAM, object detection, and semantic segmentation pipelines, achieving 81.7% mIoU and improved localization accuracy via ground-truth validation.",
    ],

    icons: ["/assets/dyson_icon.svg"],
  },
  {
    company: "ApoSys Technologies",
    role: "Robotics & Mechanical Engineering Intern",
    location: "Toronto, Canada",
    period: "Aug 2023 - Jul 2024",
    highlights: [
      "Designed an autonomous railway inspection robot for AI predictive maintenance, reducing manual labor by 68%.",
      "Engineered an energy-efficient heating system using FEA and CAD, achieving an 80% cost reduction for winter operation.",
      "Underground GPS: ROS2 + 3D SLAM + pose graph optimization",
      "Built an underground positioning system with ROS 2, 3D SLAM, and IMU–LiDAR fusion, achieving 95% accuracy and reducing safety risk by 3×.",
    ],
    icons: ["/assets/aposys_icon.svg"],
  },
  {
    company: "KABAM Robotics",
    role: "Robotics & Design Engineering Intern",
    location: "Singapore",
    period: "Jan 2021 - Jun 2021",
    highlights: [
      "Developed and deployed industrial autonomous robots, improving fabrication efficiency by 55%.",
      "Led 6 CAD projects (SolidWorks, Onshape), designing mechanical components and assembling a full outdoor robot.",
      "Supported end-to-end deployment of 5 robots, reducing system errors by 17%.",
    ],
    icons: ["/assets/kabam_icon.svg"],
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
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.15, rotate: 10 }}
                          transition={{ duration: 0.3 }}
                          className="relative w-20 h-20"
                        >
                          {/* subtle backing for contrast */}
                          <div className="absolute inset-0 rounded-3xl bg-white/30 blur-sm" />

                          <img
                            src={icon}
                            alt=""
                            className="relative w-20 h-20 object-contain"
                          />
                        </motion.div>
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
