import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Download, Sparkles, Play } from 'lucide-react'

const STEPS = [
  {
    num: '01',
    icon: Download,
    title: 'Buy once',
    description: 'Instant checkout, lifetime license per script. No subscription, no recurring fees.',
  },
  {
    num: '02',
    icon: Sparkles,
    title: 'Drop it in',
    description: 'One file, no setup. Works with your existing project. Copy, paste, done.',
  },
  {
    num: '03',
    icon: Play,
    title: 'Run it',
    description: 'Keyboard shortcut or panel button. Done in seconds, every time.',
  },
]

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}
const itemVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function HowItWorks() {
  const lineRef = useRef<HTMLDivElement>(null)
  const lineInView = useInView(lineRef, { once: true, margin: '-15% 0px' })

  return (
    <section id="showcase" className="bg-surface py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15% 0px' }}
        >
          <motion.h2
            variants={itemVariant}
            className="font-medium tracking-[-0.02em] leading-[1.1] text-center mb-16"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.5rem)' }}
          >
            Three steps. <span className="accent-serif">Zero</span> friction.
          </motion.h2>

          <div className="relative" ref={lineRef}>
            {/* Connecting dashed line — desktop only */}
            <div className="hidden lg:block absolute top-[60px] left-[16.67%] right-[16.67%] h-px overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={lineInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="w-full h-full border-t border-dashed border-white/10 origin-left"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
              {STEPS.map((step, _i) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.num}
                    variants={itemVariant}
                    className="relative text-center"
                  >
                    {/* Ghost number */}
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[80px] font-bold text-white/[0.04] leading-none select-none pointer-events-none">
                      {step.num}
                    </span>

                    {/* Icon chip */}
                    <div className="relative inline-flex items-center justify-center w-[44px] h-[44px] rounded-[10px] bg-accent-dim mb-5">
                      <Icon size={20} className="text-accent" />
                    </div>

                    <h3 className="text-lg font-semibold text-text-primary mb-2">{step.title}</h3>
                    <p className="text-sm text-text-secondary max-w-[280px] mx-auto leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
