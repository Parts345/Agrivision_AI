import { motion } from "framer-motion";

export default function Section({ eyebrow, title, children, className = "" }) {
  return (
    <section className={`relative mx-auto max-w-7xl px-4 py-20 ${className}`}>
      {(eyebrow || title) && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-10 max-w-3xl"
        >
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {title && <h2 className="section-heading">{title}</h2>}
        </motion.div>
      )}
      {children}
    </section>
  );
}
