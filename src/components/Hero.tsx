import { useState, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Check, Sparkles, Layers, Cpu } from 'lucide-react'

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
  const isInternal = href.startsWith('/')

  if (isInternal) {
    return (
      <Link
        to={href}
        className="group inline-flex items-center gap-3 bg-accent text-black text-base font-medium rounded-full pl-6 pr-2 py-2 hover:brightness-108 active:scale-[0.97] transition-all duration-200 shadow-[0_0_30px_rgba(124,242,156,0.3)] hover:shadow-[0_0_40px_rgba(124,242,156,0.5)]"
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
      </Link>
    )
  }

  return (
    <a
      href={href}
      className="group inline-flex items-center gap-3 bg-accent text-black text-base font-medium rounded-full pl-6 pr-2 py-2 hover:brightness-108 active:scale-[0.97] transition-all duration-200 shadow-[0_0_30px_rgba(124,242,156,0.3)] hover:shadow-[0_0_40px_rgba(124,242,156,0.5)]"
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

/* ─── Premium Preview Card Data ─── */
interface CodeToken {
  text: string
  color: string
}

interface CodeLine {
  num: string
  indent: number
  tokens: CodeToken[]
}

interface TrackData {
  title: string
  type: 'waveform' | 'keyframes' | 'curve'
  color: string
  detail: string
}

interface PreviewState {
  app: string
  file: string
  tag: string
  badgeColor: string
  accentColor: string
  actionLabel: string
  timeSaved: string
  latency: string
  code: CodeLine[]
  tracks: TrackData[]
}

const PREVIEW_STATES: PreviewState[] = [
  {
    app: 'After Effects',
    file: 'kinetic-captions.jsx',
    tag: 'AE • JSX',
    badgeColor: '#A78BFA',
    accentColor: '#7CF29C',
    actionLabel: 'Rendering 47 typography layers → 1 click',
    timeSaved: 'Saved 18 mins',
    latency: '0.34s execution',
    code: [
      { num: '01', indent: 0, tokens: [{ text: 'function', color: '#7CF29C' }, { text: ' autoCaption', color: '#F4F4F5' }, { text: '(comp) {', color: '#A1A1AA' }] },
      { num: '02', indent: 1, tokens: [{ text: 'const', color: '#7CF29C' }, { text: ' layers = comp.', color: '#F4F4F5' }, { text: 'selectedLayers', color: '#A78BFA' }] },
      { num: '03', indent: 1, tokens: [{ text: 'layers', color: '#F4F4F5' }, { text: '.forEach', color: '#38BDF8' }, { text: '(layer => {', color: '#A1A1AA' }] },
      { num: '04', indent: 2, tokens: [{ text: 'applyPreset', color: '#38BDF8' }, { text: '(layer, ', color: '#A1A1AA' }, { text: '"kinetic-bounce"', color: '#FDE047' }, { text: ')', color: '#A1A1AA' }] },
      { num: '05', indent: 2, tokens: [{ text: 'syncToAudioBeats', color: '#38BDF8' }, { text: '(layer, { ease: ', color: '#A1A1AA' }, { text: '0.16', color: '#7CF29C' }, { text: ' })', color: '#A1A1AA' }] },
      { num: '06', indent: 1, tokens: [{ text: '})', color: '#A1A1AA' }] },
    ],
    tracks: [
      { title: 'Audio Beat Waveform', type: 'waveform', color: '#7CF29C', detail: 'Transients detected' },
      { title: 'Kinetic Keyframe Diamonds', type: 'keyframes', color: '#A78BFA', detail: '47 layers matched' },
      { title: 'Cubic Bezier Easing', type: 'curve', color: '#38BDF8', detail: 'Smooth velocity curve' },
    ],
  },
  {
    app: 'Premiere Pro',
    file: 'batch-color-match.prproj',
    tag: 'PR • PROJ',
    badgeColor: '#38BDF8',
    accentColor: '#38BDF8',
    actionLabel: 'Color-matching 12 multi-cam clips → 1 click',
    timeSaved: 'Saved 24 mins',
    latency: '0.41s execution',
    code: [
      { num: '01', indent: 0, tokens: [{ text: 'const', color: '#7CF29C' }, { text: ' seq = app.project.', color: '#F4F4F5' }, { text: 'activeSequence', color: '#38BDF8' }] },
      { num: '02', indent: 0, tokens: [{ text: 'const', color: '#7CF29C' }, { text: ' clips = seq.videoTracks[0].', color: '#F4F4F5' }, { text: 'clips', color: '#A78BFA' }] },
      { num: '03', indent: 0, tokens: [{ text: 'clips.', color: '#F4F4F5' }, { text: 'forEach', color: '#38BDF8' }, { text: '(clip => {', color: '#A1A1AA' }] },
      { num: '04', indent: 1, tokens: [{ text: 'applyFilmStockLUT', color: '#38BDF8' }, { text: '(clip, ', color: '#A1A1AA' }, { text: '"Kodak_Vision_2383"', color: '#FDE047' }, { text: ')', color: '#A1A1AA' }] },
      { num: '05', indent: 1, tokens: [{ text: 'normalizeExposure', color: '#38BDF8' }, { text: '(clip, refHeroFrame)', color: '#7CF29C' }] },
      { num: '06', indent: 0, tokens: [{ text: '})', color: '#A1A1AA' }] },
    ],
    tracks: [
      { title: 'Exposure Histogram Match', type: 'curve', color: '#38BDF8', detail: 'Zero skin-tone clipping' },
      { title: 'Film Print LUT Calibration', type: 'waveform', color: '#FDE047', detail: '3D LUT 33x33x33' },
      { title: 'White Balance Neutralizer', type: 'keyframes', color: '#7CF29C', detail: 'Automated gray balance' },
    ],
  },
  {
    app: 'Blender',
    file: 'quick-auto-rig.py',
    tag: 'BL • PY',
    badgeColor: '#FB923C',
    accentColor: '#FB923C',
    actionLabel: 'Rigging 200 bones & IK solvers → 1 click',
    timeSaved: 'Saved 45 mins',
    latency: '0.88s execution',
    code: [
      { num: '01', indent: 0, tokens: [{ text: 'import', color: '#7CF29C' }, { text: ' bpy, mathutils', color: '#F4F4F5' }] },
      { num: '02', indent: 0, tokens: [{ text: 'armature = bpy.data.armatures.', color: '#F4F4F5' }, { text: 'new', color: '#38BDF8' }, { text: '("HumanRig")', color: '#FDE047' }] },
      { num: '03', indent: 0, tokens: [{ text: 'for', color: '#7CF29C' }, { text: ' bone in mesh.', color: '#F4F4F5' }, { text: 'detectJointHierarchy', color: '#38BDF8' }, { text: '():', color: '#A1A1AA' }] },
      { num: '04', indent: 1, tokens: [{ text: 'bone.autoWeight', color: '#38BDF8' }, { text: '(smooth=True, iterations=16)', color: '#A1A1AA' }] },
      { num: '05', indent: 1, tokens: [{ text: 'bindInverseKinematics', color: '#38BDF8' }, { text: '(bone, poleAngle=90)', color: '#7CF29C' }] },
      { num: '06', indent: 0, tokens: [{ text: 'bpy.ops.pose.armature_apply()', color: '#A1A1AA' }] },
    ],
    tracks: [
      { title: 'Skeleton Joint Extraction', type: 'keyframes', color: '#FB923C', detail: '200 bones locked' },
      { title: 'Smooth Heatmap Vertex Weight', type: 'curve', color: '#7CF29C', detail: 'Biharmonic falloff' },
      { title: 'Two-Bone IK Pole Constraints', type: 'waveform', color: '#A78BFA', detail: 'Real-time solver active' },
    ],
  },
]

/* ─── Ultra-Clean Premium Studio Widget ─── */
function PreviewCard() {
  const [stateIdx, setStateIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStateIdx((prev) => (prev + 1) % PREVIEW_STATES.length)
    }, 5500)
    return () => clearInterval(interval)
  }, [])

  const current = PREVIEW_STATES[stateIdx]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.64 }}
      className="w-full max-w-[840px] mx-auto mt-12 text-left"
    >
      {/* Outer Glow & Shimmer Border */}
      <div
        className="relative rounded-2xl p-[1px] overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(124,242,156,0.25) 35%, rgba(255,255,255,0.06) 65%, rgba(167,139,250,0.2) 100%)',
          boxShadow:
            '0 30px 100px -20px rgba(0,0,0,0.95), 0 0 60px -15px rgba(124,242,156,0.18)',
        }}
      >
        <div className="bg-[#0b0b0e]/90 backdrop-blur-2xl rounded-2xl overflow-hidden">
          {/* Top Window Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-white/[0.08] bg-white/[0.02]">
            {/* Left: Window Dots & App Tabs */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56]/90 shadow-[0_0_6px_rgba(255,95,86,0.6)]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]/90 shadow-[0_0_6px_rgba(255,189,46,0.6)]" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F]/90 shadow-[0_0_6px_rgba(39,201,63,0.6)]" />
              </div>

              {/* Preset Selector Tabs */}
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/5">
                {PREVIEW_STATES.map((state, idx) => {
                  const isActive = idx === stateIdx
                  return (
                    <button
                      key={state.app}
                      onClick={() => setStateIdx(idx)}
                      className={`relative px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                        isActive
                          ? 'text-white bg-white/10 shadow-sm'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeTabPill"
                          className="absolute inset-0 rounded-full border border-accent/40 bg-accent/[0.08]"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: state.badgeColor }}
                        />
                        {state.app}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Right: Real-time Telemetry Status */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-[11px] font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
                {current.latency}
              </div>
              <span className="text-xs text-zinc-400 font-mono">
                {current.file}
              </span>
            </div>
          </div>

          {/* Main Grid: Code Editor (Left) & Live Automation Studio (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-[46%_54%] border-b border-white/[0.08]">
            {/* Code Panel */}
            <div className="p-5 border-b lg:border-b-0 lg:border-r border-white/[0.08] bg-[#09090b]/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <span className="text-accent">●</span> Source Engine
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px]">
                    {current.tag}
                  </span>
                </div>

                <div className="font-mono text-[12.5px] leading-[1.8] space-y-0.5 select-none">
                  {current.code.map((line, i) => (
                    <div
                      key={i}
                      className="flex items-center hover:bg-white/[0.03] rounded px-1 -mx-1 transition-colors"
                    >
                      <span className="w-6 shrink-0 text-zinc-600 text-[11px] select-none text-right pr-3 font-mono">
                        {line.num}
                      </span>
                      <div
                        style={{ paddingLeft: line.indent * 14 }}
                        className="truncate"
                      >
                        {line.tokens.map((token, j) => (
                          <span key={j} style={{ color: token.color }}>
                            {token.text}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  {/* Blinking Terminal Cursor */}
                  <div className="flex items-center pl-6 pt-1">
                    <span className="inline-block w-2 h-4 bg-accent/80 blink" />
                  </div>
                </div>
              </div>

              {/* Code Panel Sub-stat */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span className="flex items-center gap-1.5 text-accent">
                  <Check size={12} /> AST Verified
                </span>
                <span>Zero Manual Keyframing</span>
              </div>
            </div>

            {/* Live Visualizer Panel */}
            <div className="p-5 bg-gradient-to-br from-black/80 to-[#101014]/90 relative flex flex-col justify-between overflow-hidden min-h-[260px]">
              {/* Subtle Canvas Grid Background */}
              <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Visualizer Header */}
              <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-75" />
                  <span className="text-xs font-mono font-medium text-zinc-200 uppercase tracking-wider">
                    Timeline Visualizer
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                  <span>00:00:04:18</span>
                  <span className="text-white/20">|</span>
                  <span className="text-accent font-semibold">60 FPS</span>
                </div>
              </div>

              {/* Visual Tracks */}
              <div className="relative z-10 my-4 space-y-3">
                {current.tracks.map((track, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all"
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="flex items-center gap-2 text-zinc-300 font-medium">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: track.color }}
                        />
                        {track.title}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {track.detail}
                      </span>
                    </div>

                    {/* Track Visualization */}
                    {track.type === 'waveform' && (
                      <div className="h-6 flex items-center gap-1 px-1 bg-black/40 rounded-lg overflow-hidden relative">
                        {Array.from({ length: 36 }).map((_, bIdx) => {
                          const height = 4 + Math.sin(bIdx * 0.8) * 8 + Math.cos(bIdx * 1.5) * 6
                          return (
                            <motion.div
                              key={bIdx}
                              className="flex-1 rounded-full"
                              style={{
                                backgroundColor: track.color,
                                height: `${Math.max(4, Math.abs(height))}px`,
                                opacity: 0.35 + (bIdx % 3) * 0.25,
                              }}
                              animate={{ scaleY: [1, 1.4, 0.8, 1] }}
                              transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                delay: bIdx * 0.04,
                              }}
                            />
                          )
                        })}
                      </div>
                    )}

                    {track.type === 'keyframes' && (
                      <div className="h-6 flex items-center justify-between px-3 bg-black/40 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-x-0 h-px bg-white/10 top-1/2 -translate-y-1/2" />
                        {[15, 38, 62, 85].map((pos, kIdx) => (
                          <motion.div
                            key={kIdx}
                            className="relative z-10 w-2.5 h-2.5 rotate-45 rounded-[2px]"
                            style={{ backgroundColor: track.color }}
                            animate={{ scale: [1, 1.25, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: kIdx * 0.3,
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {track.type === 'curve' && (
                      <div className="h-6 px-2 bg-black/40 rounded-lg flex items-center relative overflow-hidden">
                        <svg className="w-full h-4 opacity-80" preserveAspectRatio="none" viewBox="0 0 100 20">
                          <motion.path
                            d="M 0 16 C 25 16, 35 2, 60 2 C 75 2, 85 10, 100 10"
                            fill="none"
                            stroke={track.color}
                            strokeWidth="2"
                            strokeLinecap="round"
                            initial={{ pathLength: 0.2 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}

                {/* Sweeping Laser Playhead Line */}
                <motion.div
                  className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-white via-accent to-transparent pointer-events-none z-20 shadow-[0_0_12px_#7CF29C]"
                  initial={{ left: '0%' }}
                  animate={{ left: '100%' }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              {/* Visualizer Bottom Badge */}
              <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/[0.06]">
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-accent/20 text-accent">
                    <Check size={12} />
                  </span>
                  <span className="font-medium">{current.actionLabel}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-medium">
                  {current.timeSaved}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="px-5 py-3 bg-[#0a0a0d] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs text-zinc-400 font-mono">
              <Cpu size={14} className="text-accent" />
              <span>Metal & CUDA Acceleration Enabled</span>
            </div>

            {/* Glowing Render Bar */}
            <div className="flex-1 max-w-[340px] flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent via-[#38BDF8] to-accent shadow-[0_0_10px_#7CF29C]"
                  initial={{ width: '0%' }}
                  animate={{ width: ['0%', '100%'] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <span className="text-[11px] font-mono text-accent font-semibold whitespace-nowrap">
                100% DONE
              </span>
            </div>
          </div>
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
      <p className="text-xs text-text-tertiary tracking-widest uppercase text-center mb-6 font-mono">
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
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16">
      {/* Background Video */}
      <div className="bg">
        <video
          ref={videoRef}
          className="bg-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260411_104032_69319010-2458-492b-b04d-b40a5dfa4482.mp4"
            type="video/mp4"
          />
        </video>
        {/* Clean bottom transition into page background without washing out video clarity */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 35%, transparent 65%, rgba(10,10,11,0.8) 88%, #0A0A0B 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 text-center">
        {/* Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-accent/30 shadow-[0_0_25px_rgba(124,242,156,0.18)] mb-6"
        >
          <span className="pulse-dot inline-block w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#7CF29C]" />
          <span className="text-xs uppercase tracking-[0.14em] text-accent font-mono font-medium">
            Automation for editors & artists
          </span>
        </motion.div>

        {/* Headline with Expressive Cursive Accents & Crisp Text Shadow */}
        <motion.h1
          variants={headlineVariants}
          initial="hidden"
          animate="visible"
          className="font-medium tracking-[-0.02em] leading-[1.08] mb-6 text-readable-shadow"
          style={{ fontSize: 'clamp(2.4rem, 6.2vw, 5.4rem)' }}
        >
          <span className="hl-mask">
            <motion.span variants={lineVariants} className="hl-line inline-block">
              Stop repeating the{' '}
              <span className="font-cursive text-accent text-[1.28em] -rotate-2 inline-block px-1.5 text-glow-accent align-baseline">
                tedious
              </span>{' '}
              part.
            </motion.span>
          </span>
          <span className="hl-mask">
            <motion.span variants={lineVariants} className="hl-line inline-block">
              Ship the{' '}
              <span className="font-cursive text-[#C084FC] text-[1.28em] rotate-1 inline-block px-1.5 text-glow-purple align-baseline">
                creative
              </span>{' '}
              part faster.
            </motion.span>
          </span>
        </motion.h1>

        {/* Subhead with Glass Pill Backdrop for Guaranteed High Readability */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <p
            className="text-[#E4E4E7] text-readable-shadow leading-relaxed px-6 py-3.5 rounded-2xl bg-black/55 backdrop-blur-md border border-white/[0.1] shadow-[0_12px_40px_rgba(0,0,0,0.7)]"
            style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)' }}
          >
            One-click scripts and plugins for{' '}
            <span className="text-white font-semibold underline decoration-accent/40 decoration-2 underline-offset-4">
              After Effects
            </span>
            ,{' '}
            <span className="text-white font-semibold underline decoration-[#38BDF8]/40 decoration-2 underline-offset-4">
              Premiere Pro
            </span>
            ,{' '}
            <span className="text-white font-semibold underline decoration-[#A78BFA]/40 decoration-2 underline-offset-4">
              DaVinci Resolve
            </span>
            , and{' '}
            <span className="text-white font-semibold underline decoration-[#FB923C]/40 decoration-2 underline-offset-4">
              Blender
            </span>{' '}
            — built by editors, used in production, updated forever.
          </p>
        </motion.div>

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
            className="group flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/20 hover:border-white/40 hover:bg-black/60 rounded-full px-5 py-2.5 transition-all duration-250 text-text-primary shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full border border-white/20 group-hover:border-accent/60 transition-colors duration-250">
              <Play size={12} className="ml-0.5 text-white group-hover:text-accent transition-colors" />
            </span>
            <span className="text-sm font-medium">Watch it work</span>
          </a>
        </motion.div>

        {/* Redesigned Premium Preview Card */}
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

      </div>
    </section>
  )
}

