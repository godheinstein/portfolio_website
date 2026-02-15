import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";
import ProjectsHoverMenu from "./ProjectsHoverMenu";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navigation() {
  const [location, setLocation] = useLocation();

  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scrollspy (active section underline)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i]!.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // On load or when user hits back/forward, scroll to hash section
  useEffect(() => {
    const scrollFromHash = () => {
      const id = window.location.hash?.replace("#", "");
      if (!id) return;

      // allow layout to paint before scrolling
      window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    };

    scrollFromHash();
    window.addEventListener("hashchange", scrollFromHash);
    return () => window.removeEventListener("hashchange", scrollFromHash);
  }, []);

  const goToSection = (sectionId: string) => {
    setMobileOpen(false);

    // If we are NOT on home route, route back to home with hash
    // This avoids trying to scroll on the ProjectDetail page.
    if (location !== "/" && !location.startsWith("/#")) {
      setLocation(`/#${sectionId}`);
      return;
    }

    // Update URL hash AND create a history entry for browser back button
    // Use pushState to avoid triggering full reload.
    history.pushState(null, "", `/#${sectionId}`);

    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/30"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            type="button"
            className="text-xl sm:text-2xl font-bold text-glow cursor-pointer select-none"
            whileHover={{ scale: 1.05 }}
            onClick={() => goToSection("home")}
          >
            ZHA
          </motion.button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => {
              if (item.id === "projects") {
                return (
                  <div key={item.id} className="relative">
                    <motion.div
                      initial="closed"
                      animate="closed"
                      whileHover="open"
                      className="relative"
                    >
                      <motion.button
                        type="button"
                        onClick={() => goToSection("projects")}
                        className={`relative px-4 py-2 text-sm font-medium tracking-wider transition-colors ${
                          activeSection === item.id
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.label}

                        {/* Active underline */}
                        {activeSection === item.id && (
                          <motion.div
                            layoutId="activeSection"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary glow-effect"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </motion.button>

                      {/* Hover bridge to prevent flicker */}
                      <div className="absolute left-0 top-full h-3 w-full" />

                      {/* Dropdown */}
                      <motion.div
                        variants={{
                          closed: { opacity: 0, y: 10, pointerEvents: "none" },
                          open: { opacity: 1, y: 0, pointerEvents: "auto" },
                        }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute left-0 top-[calc(100%+8px)] z-50"
                      >
                        <ProjectsHoverMenu />
                      </motion.div>
                    </motion.div>
                  </div>
                );
              }

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => goToSection(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wider transition-colors ${
                    activeSection === item.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}

                  {/* Active underline */}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary glow-effect"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg mechanical-border bg-white/5 hover:bg-white/10 transition"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Decorative scan line */}
      {scrolled && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Mobile panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden border-t border-border/30 bg-background/85 backdrop-blur-lg"
          >
            <div className="container mx-auto px-4 sm:px-6 py-4">
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goToSection(item.id)}
                    className={`text-left px-4 py-3 rounded-lg mechanical-border bg-white/5 hover:bg-white/10 transition ${
                      activeSection === item.id ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium tracking-wider">{item.label}</span>
                      {activeSection === item.id ? (
                        <span className="text-xs font-mono text-primary">ACTIVE</span>
                      ) : null}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
