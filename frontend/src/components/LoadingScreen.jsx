import { AnimatePresence, motion } from "framer-motion";
import { Leaf } from "lucide-react";

export default function LoadingScreen({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-50 grid place-items-center bg-ink"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.08, 1] }}
              transition={{ rotate: { repeat: Infinity, duration: 2.2, ease: "linear" }, scale: { repeat: Infinity, duration: 1.4 } }}
              className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-chlorophyll text-ink shadow-glow"
            >
              <Leaf size={34} />
            </motion.div>
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.35em] text-chlorophyll">Booting neural farm</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
