import Navigation from "@/components/Navigation";
import EngineeringBackground from "@/components/EngineeringBackground";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import SectionReveal from "@/components/SectionReveal";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Engineering-inspired animated background */}
      <EngineeringBackground />

      {/* Fixed navigation */}
      <Navigation />

      {/* Sections with smooth reveal */}
      <SectionReveal id="home" className="overflow-hidden">
        <HeroSection />
      </SectionReveal>

      <SectionReveal id="about" className="overflow-hidden">
        <AboutSection />
      </SectionReveal>

      <SectionReveal id="experience" className="overflow-hidden">
        <ExperienceSection />
      </SectionReveal>

      <SectionReveal id="projects" className="overflow-hidden">
        <ProjectsSection />
      </SectionReveal>

      <SectionReveal id="contact" className="overflow-hidden">
        <ContactSection />
      </SectionReveal>
    </div>
  );
}
