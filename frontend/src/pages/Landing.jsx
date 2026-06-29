import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, CloudSun, Cpu, Leaf, Radar, ShieldCheck, Sprout } from "lucide-react";
import Section from "../components/Section.jsx";
import StatCard from "../components/StatCard.jsx";

const features = [
  { icon: <BrainCircuit />, title: "CBAM + Transformer AI", text: "Real TensorFlow inference through FastAPI for rice leaf disease detection." },
  { icon: <Radar />, title: "Field Risk Radar", text: "Dashboard cards translate scans into disease pressure and farm priorities." },
  { icon: <CloudSun />, title: "Weather Intelligence", text: "Weather-ready widget for live API integration and climate-aware decisions." },
  { icon: <ShieldCheck />, title: "Treatment Playbooks", text: "Each prediction returns prevention, treatment, causes, and symptoms." }
];

export default function Landing() {
  return (
    <>
      <section className="relative flex min-h-screen items-center px-4 pb-16 pt-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="eyebrow">AI smart farming platform</p>
            <h1 className="max-w-5xl text-5xl font-black leading-[1.02] text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
              AgriVision AI
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              A futuristic farming cockpit that detects rice diseases, visualizes crop health, and turns model predictions into field-ready recommendations.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/detect" className="primary-button">
                Start leaf scan <ArrowRight size={18} />
              </Link>
              <Link to="/dashboard" className="secondary-button">
                View dashboard
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatCard icon={<Cpu size={20} />} label="Inference" value="Real" detail="Keras model API" />
              <StatCard icon={<Leaf size={20} />} label="Crop focus" value="Rice" detail="Disease diagnosis" />
              <StatCard icon={<Sprout size={20} />} label="Care plan" value="4x" detail="Guidance layers" />
              <StatCard icon={<Radar size={20} />} label="UX mode" value="Live" detail="Hackathon ready" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            <div className="scan-orbit">
              <div className="scan-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-chlorophyll">Neural scan</p>
                    <h2 className="mt-2 text-2xl font-black">Rice leaf analysis</h2>
                  </div>
                  <span className="rounded-full bg-chlorophyll/20 px-3 py-1 text-sm text-chlorophyll">Online</span>
                </div>
                <div className="leaf-visual mt-8">
                  <div className="leaf-shape" />
                  <div className="scan-line" />
                </div>
                <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                  {["Health 94%", "Risk Low", "Moisture 72%"].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-3 text-sm">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Section eyebrow="Platform" title="Everything a smart rice farm needs in one interface">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <motion.div key={feature.title} whileHover={{ y: -8 }} className="glass-panel p-6">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/15 text-cyber">{feature.icon}</div>
              <h3 className="text-xl font-black">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Team" title="Built for demos, field work, and final-year confidence">
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="glass-panel p-7">
            <h3 className="text-2xl font-black">Mission control for responsible farm AI</h3>
            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
              The platform combines visual diagnosis, explainable agronomic guidance, dashboard analytics, and assistant-style workflows so judges can see both technical depth and real farmer utility.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Frontend", "Backend", "Model"].map((role) => (
              <div key={role} className="glass-panel p-5">
                <p className="text-sm text-slate-500 dark:text-slate-400">{role}</p>
                <p className="mt-2 text-lg font-black">Production ready</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Contact" title="Ready for a smarter harvest">
        <div className="glass-panel flex flex-col items-start justify-between gap-6 p-7 md:flex-row md:items-center">
          <div>
            <h3 className="text-2xl font-black">Run scans, review insights, and pitch the future of rice farming.</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Connect the backend, upload a leaf image, and let the model speak.</p>
          </div>
          <Link to="/detect" className="primary-button">Launch detector <ArrowRight size={18} /></Link>
        </div>
      </Section>

      <footer className="relative border-t border-white/10 px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
        AgriVision AI | Smart farming, rice health intelligence, and responsible AI guidance.
      </footer>
    </>
  );
}
