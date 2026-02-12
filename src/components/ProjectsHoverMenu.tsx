import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { projectIndex } from "../data/projects";
import { ChevronDown } from "lucide-react";

export default function ProjectsHoverMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // close if click outside
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        Projects
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 top-[calc(100%+10px)] -translate-x-1/2 z-50"
          >
            <div className="mechanical-border bg-background/80 backdrop-blur-xl p-3 rounded-xl w-[min(520px,92vw)]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/30 via-primary/10 to-transparent" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {projectIndex.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="group flex items-center justify-between gap-3 px-3 py-2 rounded-lg
                               text-sm text-muted-foreground hover:text-foreground
                               hover:bg-white/5 transition"
                    onClick={() => setOpen(false)}
                  >
                    <span className="truncate">{p.title}</span>
                    <span className="text-[11px] font-mono text-primary/80 opacity-10 group-hover:opacity-100 transition-opacity">
                      View
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-2 text-[11px] font-mono text-muted-foreground px-1">
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
