import { motion } from "framer-motion";

export default function StatCard({ icon, label, value, detail }) {
  return (
    <motion.div whileHover={{ y: -6, scale: 1.01 }} className="glass-panel p-5">
      <div className="mb-5 flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-400/15 text-emerald-300">{icon}</span>
        <span className="h-2 w-2 rounded-full bg-chlorophyll shadow-glow" />
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <h3 className="mt-2 text-3xl font-black">{value}</h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{detail}</p>
    </motion.div>
  );
}
