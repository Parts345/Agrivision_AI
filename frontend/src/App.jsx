import { useEffect, useMemo, useState } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Leaf, Menu, Moon, Sun, X } from "lucide-react";
import Landing from "./pages/Landing.jsx";
import Detect from "./pages/Detect.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ChatbotDock from "./components/ChatbotDock.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Detect", to: "/detect" },
  { label: "Dashboard", to: "/dashboard" }
];

function Navbar({ theme, setTheme }) {
  const [open, setOpen] = useState(false);
  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? "text-chlorophyll shadow-glow" : "text-slate-700 dark:text-slate-200"}`;

  return (
    <header className="fixed left-0 right-0 top-0 z-40 px-4 pt-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/20 bg-white/70 px-4 py-3 shadow-panel backdrop-blur-2xl dark:border-white/10 dark:bg-ink/70">
        <NavLink to="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-400 text-ink shadow-glow">
            <Leaf size={23} />
          </span>
          <span>
            <span className="block text-base font-black tracking-wide text-slate-950 dark:text-white">AgriVision AI</span>
            <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">Neural farming cockpit</span>
          </span>
        </NavLink>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button className="icon-button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <NavLink to="/detect" className="hidden rounded-xl bg-slate-950 px-4 py-2 text-sm font-black text-white shadow-glow dark:bg-chlorophyll dark:text-ink md:flex">
            Scan leaf
          </NavLink>
          <button className="icon-button md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Open menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-2 grid max-w-7xl gap-2 rounded-2xl border border-white/20 bg-white/90 p-3 backdrop-blur-2xl dark:border-white/10 dark:bg-ink/90 md:hidden"
        >
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </motion.div>
      )}
    </header>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Landing />} />
          <Route path="/detect" element={<Detect />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [booting, setBooting] = useState(true);
  const particles = useMemo(() => Array.from({ length: 24 }, (_, index) => index), []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-[#f5fff8] text-slate-950 transition-colors duration-500 dark:bg-ink dark:text-white">
      <LoadingScreen show={booting} />
      <div className="pointer-events-none fixed inset-0 bg-field-grid bg-[length:42px_42px] opacity-50" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(101,246,167,.24),transparent_32%),radial-gradient(circle_at_78%_12%,rgba(70,217,255,.18),transparent_28%),radial-gradient(circle_at_50%_90%,rgba(184,255,92,.16),transparent_34%)]" />
      {particles.map((particle) => (
        <span
          key={particle}
          className="particle"
          style={{
            left: `${(particle * 37) % 100}%`,
            animationDelay: `${particle * 0.45}s`,
            animationDuration: `${9 + (particle % 7)}s`
          }}
        />
      ))}
      <Navbar theme={theme} setTheme={setTheme} />
      <AnimatedRoutes />
      <ChatbotDock icon={<Bot size={18} />} />
    </div>
  );
}
