import Navigation from "@/components/Navigation";
import EngineeringBackground from "@/components/EngineeringBackground";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Engineering-inspired animated background */}
      <EngineeringBackground />

      {/* Fixed navigation */}
      <Navigation />

      {/* All Sections */}
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
