import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

/* ─── Waveform SVG (procedural) ─── */
function WaveformSVG() {
  const bars = useMemo(() => {
    const result = []
    const count = 120
    for (let i = 0; i < count; i++) {
      // Seeded pseudo-random heights for consistency
      const h = 4 + Math.sin(i * 0.7) * 8 + Math.cos(i * 1.3) * 6 + Math.abs(Math.sin(i * 2.1)) * 10
      result.push(h)
    }
    return result
  }, [])

  return (
    <svg
      className="w-full max-w-[1400px] mx-auto h-8 opacity-20"
      viewBox={`0 0 ${bars.length * 6} 32`}
      preserveAspectRatio="none"
    >
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 6}
          y={32 - h}
          width="2"
          height={h}
          fill="#7CF29C"
          rx="1"
        />
      ))}
    </svg>
  )
}

/* ─── Text Roll CTA ─── */
function TextRollButton({ text, href }: { text: string; href: string }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-3 bg-accent text-black text-base font-medium rounded-full pl-6 pr-2 py-2 hover:brightness-108 active:scale-[0.97] transition-all duration-200"
    >
      <span className="relative overflow-hidden h-[20px]">
        <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
          <span className="h-[20px] flex items-center">{text}</span>
          <span className="h-[20px] flex items-center">{text}</span>
        </span>
      </span>
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/20">
        <ArrowRight size={14} className="text-black" />
      </span>
    </a>
  )
}

/* ─── Preview Card ─── */
const PREVIEW_STATES = [
  { file: 'kinetic-captions.jsx', app: 'After Effects', label: 'Rendering 47 layers → 1 click' },
  { file: 'batch-color.prproj', app: 'Premiere Pro', label: 'Color-matching 12 clips → 1 click' },
  { file: 'quick-rig.py', app: 'Blender', label: 'Rigging 200 bones → 1 click' },
]

const CODE_LINES = [
  { indent: 0, tokens: [{ text: 'function', color: '#7CF29C' }, { text: ' autoCaption', color: '#F5F5F4' }, { text: '(comp) {', color: '#8F8F94' }] },
  { indent: 1, tokens: [{ text: 'const', color: '#7CF29C' }, { text: ' layers = comp.', color: '#F5F5F4' }, { text: 'selectedLayers', color: '#8F8F94' }] },
  { indent: 1, tokens: [{ text: 'layers', color: '#F5F5F4' }, { text: '.forEach', color: '#7CF29C' }, { text: '(layer => {', color: '#8F8F94' }] },
  { indent: 2, tokens: [{ text: 'applyPreset', color: '#F5F5F4' }, { text: '(layer, ', color: '#8F8F94' }, { text: '"kinetic"', color: '#A78BFA' }, { text: ')', color: '#8F8F94' }] },
  { indent: 1, tokens: [{ text: '})', color: '#8F8F94' }] },
]

function PreviewCard() {
  const [stateIdx, setStateIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStateIdx((prev) => (prev + 1) % PREVIEW_STATES.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const current = PREVIEW_STATES[stateIdx]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.64 }}
      className="w-full max-w-[720px] mx-auto mt-12"
    >
      <div
        className="bg-surface border border-hairline rounded-[20px] overflow-hidden"
        style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 60px rgba(0,0,0,0.4)' }}
      >
        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-hairline">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>
          <span className="text-xs text-text-tertiary font-mono transition-opacity duration-300">
            {current.file} — {current.app}
          </span>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%]">
          {/* Code panel */}
          <div className="p-4 border-b md:border-b-0 md:border-r border-hairline">
            <div className="font-mono text-[13px] leading-relaxed space-y-1">
              {CODE_LINES.map((line, i) => (
                <div key={i} style={{ paddingLeft: line.indent * 16 }}>
                  {line.tokens.map((token, j) => (
                    <span key={j} style={{ color: token.color }}>{token.text}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Video preview placeholder */}
          <div className="relative aspect-video bg-black flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
            {/* Animated preview placeholder — shows a stylized timeline UI */}
            <div className="relative w-[80%] space-y-2 opacity-60">
              {[0.7, 1, 0.5, 0.85, 0.6].map((w, i) => (
                <div
                  key={i}
                  className="h-2 rounded-full bg-white/10"
                  style={{ width: `${w * 100}%` }}
                >
                  <motion.div
                    className="h-full rounded-full bg-accent/30"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, repeatDelay: 2 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom render bar */}
        <div className="px-4 py-3 border-t border-hairline flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full render-bar-fill"
              style={{
                background: 'linear-gradient(90deg, rgba(124,242,156,0) 0%, #7CF29C 50%, rgba(124,242,156,0) 100%)',
              }}
            />
          </div>
          <span className="text-xs text-text-tertiary whitespace-nowrap font-mono transition-all duration-300">
            {current.label}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Trust strip ─── */
const TRUST_ITEMS = [
  'Adobe After Effects',
  'Premiere Pro',
  'DaVinci Resolve',
  'Blender',
  'Cinema 4D',
]

function TrustStrip() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.0 }}
      className="pt-14"
    >
      <p className="text-xs text-text-tertiary tracking-widest uppercase text-center mb-6">
        Trusted inside teams working with
      </p>
      <div className="overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg to-transparent z-10" />
        <div className="marquee-left flex gap-12 whitespace-nowrap w-max">
          {[...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
            <span
              key={i}
              className="text-sm text-text-tertiary opacity-40 hover:opacity-70 transition-opacity duration-300 font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Hero Section ─── */
const headlineVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.2 },
  },
}

const lineVariants = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-16">
      {/* Background treatments */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid lines */}
        <div className="absolute inset-0 max-w-[1400px] mx-auto left-0 right-0">
          {[20, 40, 60, 80].map((pct) => (
            <div
              key={pct}
              className="absolute top-0 bottom-0 w-px bg-white/[0.03]"
              style={{ left: `${pct}%` }}
            />
          ))}
        </div>
        {/* Radial glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-[0.08]"
          style={{
            background: 'radial-gradient(ellipse at center, #7CF29C 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <span className="pulse-dot inline-block w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="text-xs uppercase tracking-[0.12em] text-accent font-medium">
            Automation for editors & artists
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={headlineVariants}
          initial="hidden"
          animate="visible"
          className="font-medium tracking-[-0.02em] leading-[1.05] mb-6"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 5.2rem)' }}
        >
          <span className="hl-mask">
            <motion.span variants={lineVariants} className="hl-line inline-block">
              Stop repeating the <span className="accent-serif">tedious</span> part.
            </motion.span>
          </span>
          <span className="hl-mask">
            <motion.span variants={lineVariants} className="hl-line inline-block">
              Ship the creative part faster.
            </motion.span>
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="text-text-secondary max-w-xl mx-auto mb-10"
          style={{ fontSize: 'clamp(1rem, 1.4vw, 1.25rem)' }}
        >
          One-click scripts and plugins for After Effects, Premiere Pro, DaVinci Resolve, and Blender — built by editors, used in production, updated forever.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <TextRollButton text="Browse Scripts" href="/marketplace" />
          <a
            href="#showcase"
            className="group flex items-center gap-3 border border-white/15 hover:border-white/30 rounded-full px-5 py-2.5 transition-all duration-250 text-text-primary"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full border border-white/20 group-hover:border-accent/50 transition-colors duration-250">
              <Play size={12} className="ml-0.5" />
            </span>
            <span className="text-sm font-medium">Watch it work</span>
          </a>
        </motion.div>

        {/* Preview Card */}
        <PreviewCard />

        {/* Waveform */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8"
        >
          <WaveformSVG />
        </motion.div>

        {/* Trust strip */}
        <TrustStrip />
      </div>
    </section>
  )
}
