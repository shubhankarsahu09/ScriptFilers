import { useRef, useState, useEffect } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { Clock } from 'lucide-react'

const MANUAL_STEPS = [
  { action: 'Select all layers manually', time: '40s' },
  { action: 'Apply expression to each layer', time: '2m' },
  { action: 'Adjust timing per keyframe', time: '3m' },
  { action: 'Repeat per composition', time: '6m' },
  { action: 'Preview & fix errors', time: '8m' },
  { action: 'Export & re-render', time: '2m 20s' },
]

function AnimatedCounter({ target, inView }: { target: number; inView: boolean }) {
  const [display, setDisplay] = useState(22 * 60)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true
      const controls = animate(22 * 60, target, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setDisplay(Math.round(v)),
      })
      return () => controls.stop()
    }
  }, [inView, target])

  return <span>{display} seconds</span>
}

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const itemVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function Comparison() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <section id="bundles" className="bg-surface py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6" ref={ref}>
        {/* Badge */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15% 0px' }}
          className="mb-12"
        >
          <motion.div variants={itemVariant} className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full border border-hairline flex items-center justify-center text-xs text-text-tertiary font-medium">
              01
            </span>
            <span className="px-3 py-1 rounded-full border border-hairline text-xs text-text-secondary font-medium">
              Why scripts
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariant}
            className="font-medium tracking-[-0.02em] leading-[1.1]"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.5rem)' }}
          >
            The same result. A <span className="accent-serif">fraction</span> of the clicks.
          </motion.h2>
        </motion.div>

        {/* Comparison cards */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15% 0px' }}
          className="grid grid-cols-1 md:grid-cols-2 rounded-[20px] border border-hairline overflow-hidden"
        >
          {/* Left — Without */}
          <motion.div
            variants={itemVariant}
            className="p-8 lg:p-10 border-b md:border-b-0 md:border-r border-hairline opacity-70"
          >
            <p className="text-sm text-text-tertiary uppercase tracking-wider mb-8 font-medium">
              Without ScriptFilers
            </p>
            <div className="space-y-4">
              {MANUAL_STEPS.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Clock size={14} className="text-text-tertiary mt-1 shrink-0" />
                  <div className="flex-1 flex items-baseline justify-between gap-4">
                    <span className="text-sm text-text-secondary">{step.action}</span>
                    <span className="text-xs text-text-tertiary font-mono whitespace-nowrap">{step.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-4 border-t border-hairline">
              <span className="text-text-tertiary text-lg font-mono">≈ 22 minutes</span>
            </div>
          </motion.div>

          {/* Right — With */}
          <motion.div
            variants={itemVariant}
            className="relative p-8 lg:p-10"
          >
            {/* Accent glow */}
            <div
              className="absolute top-0 left-0 w-[300px] h-[200px] opacity-[0.06] pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at top left, #7CF29C 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />

            <p className="relative text-sm text-accent uppercase tracking-wider mb-8 font-medium">
              With ScriptFilers
            </p>

            <div className="relative flex items-start gap-3 mb-12">
              <div className="w-8 h-8 rounded-lg bg-accent-dim flex items-center justify-center shrink-0">
                <span className="text-accent text-sm">▶</span>
              </div>
              <div>
                <span className="text-base text-text-primary font-medium">Run script → Done</span>
                <p className="text-sm text-text-secondary mt-1">One keyboard shortcut. Same result.</p>
              </div>
            </div>

            <div className="relative mt-8 pt-4 border-t border-hairline flex items-baseline justify-between">
              <span className="text-text-primary text-2xl font-mono font-medium">
                <AnimatedCounter target={8} inView={inView} />
              </span>
              <span className="px-3 py-1 rounded-full bg-accent-dim text-accent text-xs font-medium">
                Time saved: 21m 52s
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
