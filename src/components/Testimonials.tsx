import { motion } from 'framer-motion'
import { TESTIMONIALS, SOFTWARE_LABELS, SOFTWARE_COLORS } from '../data'

const ROW_1 = TESTIMONIALS.slice(0, 4)
const ROW_2 = TESTIMONIALS.slice(4, 8)

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="w-[320px] shrink-0 bg-bg border border-hairline rounded-xl p-5 select-none">
      <div className="flex items-center gap-3 mb-3">
        {/* Avatar initial */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold"
          style={{
            backgroundColor: SOFTWARE_COLORS[t.software] + '18',
            color: SOFTWARE_COLORS[t.software],
          }}
        >
          {t.name.split(' ').map((n) => n[0]).join('')}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text-primary truncate">{t.name}</p>
          <p className="text-xs text-text-tertiary truncate">{t.role}, {t.studio}</p>
        </div>
        <span
          className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-bold"
          style={{
            backgroundColor: SOFTWARE_COLORS[t.software] + '18',
            color: SOFTWARE_COLORS[t.software],
          }}
        >
          {SOFTWARE_LABELS[t.software]}
        </span>
      </div>
      <p className="text-sm text-text-secondary leading-relaxed">"{t.quote}"</p>
    </div>
  )
}

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const itemVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function Testimonials() {
  return (
    <section className="bg-surface py-20 overflow-hidden">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-15% 0px' }}
        className="max-w-[1200px] mx-auto px-6 mb-12"
      >
        <motion.h2
          variants={itemVariant}
          className="font-medium tracking-[-0.02em] leading-[1.1] text-center"
          style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.5rem)' }}
        >
          Loved by <span className="accent-serif">real</span> editors.
        </motion.h2>
      </motion.div>

      {/* Row 1 — scrolls left */}
      <div className="relative mb-6">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
        <div className="marquee-left flex gap-6 w-max">
          {[...ROW_1, ...ROW_1, ...ROW_1, ...ROW_1].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
        <div className="marquee-right flex gap-6 w-max">
          {[...ROW_2, ...ROW_2, ...ROW_2, ...ROW_2].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
