import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Send, X } from "lucide-react";

export default function ChatbotDock({ icon }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-30">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="mb-3 w-[min(360px,calc(100vw-2.5rem))] rounded-3xl border border-white/15 bg-white/85 p-4 shadow-panel backdrop-blur-2xl dark:bg-ink/90"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-black">Agri Copilot</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Voice assistant placeholder</p>
            </div>
            <button className="icon-button" onClick={() => setOpen(false)} aria-label="Close assistant">
              <X size={16} />
            </button>
          </div>
          <div className="space-y-3 text-sm">
            <div className="rounded-2xl bg-emerald-400/15 p-3 text-slate-700 dark:text-slate-200">
              Ask about symptoms, treatment plans, irrigation windows, or field risk.
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/60 p-2 dark:bg-white/5">
              <button className="icon-button" aria-label="Voice input"><Mic size={16} /></button>
              <input className="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="Type a farming question" />
              <button className="icon-button" aria-label="Send message"><Send size={16} /></button>
            </div>
          </div>
        </motion.div>
      )}
      <button
        onClick={() => setOpen((value) => !value)}
        className="grid h-14 w-14 place-items-center rounded-2xl bg-chlorophyll text-ink shadow-glow transition hover:scale-105"
        aria-label="Open AI assistant"
      >
        {icon}
      </button>
    </div>
  );
}
