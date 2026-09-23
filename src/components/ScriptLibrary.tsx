import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { SCRIPTS, SOFTWARE_LABELS, SOFTWARE_COLORS } from '../data'
import { useAuth } from '../contexts/AuthContext'

const FILTERS = ['All', 'After Effects', 'Premiere Pro', 'DaVinci Resolve', 'Blender'] as const
const FILTER_MAP: Record<string, string | null> = {
  All: null,
  'After Effects': 'ae',
  'Premiere Pro': 'pr',
  'DaVinci Resolve': 'dr',
  Blender: 'blender',
}

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const itemVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

interface ScriptLibraryProps {
  limit?: number
  hideViewMore?: boolean
}

export default function ScriptLibrary({ limit, hideViewMore }: ScriptLibraryProps = {}) {
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const navigate = useNavigate()
  const { session } = useAuth()

  const handleScriptClick = () => {
    if (!session) {
      navigate('/signup')
    } else {
      navigate('/dashboard')
    }
  }
  const filterKey = FILTER_MAP[activeFilter]
  let filtered = filterKey ? SCRIPTS.filter((s) => s.software === filterKey) : SCRIPTS
  if (limit) {
    filtered = filtered.slice(0, limit)
  }

  return (
    <section id="scripts" className="bg-bg py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15% 0px' }}
          className="mb-12"
        >
          <motion.div variants={itemVariant} className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full border border-hairline flex items-center justify-center text-xs text-text-tertiary font-medium">
              02
            </span>
            <span className="px-3 py-1 rounded-full border border-hairline text-xs text-text-secondary font-medium">
              Browse the library
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariant}
            className="font-medium tracking-[-0.02em] leading-[1.1]"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.5rem)' }}
          >
            Every tool, tested in <span className="accent-serif">real</span> projects.
          </motion.h2>
        </motion.div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-2 mb-10 relative">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeFilter === filter
                  ? 'text-black'
                  : 'text-text-secondary border border-hairline hover:text-text-primary hover:border-white/15'
              }`}
            >
              {activeFilter === filter && (
                <motion.div
                  layoutId="filter-indicator"
                  className="absolute inset-0 bg-white rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">{filter}</span>
            </button>
          ))}
        </div>

        {/* Card grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((script) => (
              <motion.div
                key={script.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={handleScriptClick}
                className="group cursor-pointer bg-surface border border-hairline rounded-[14px] overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-200"
                style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
              >
                {/* Video preview area */}
                <div className="relative aspect-video overflow-hidden">
                  <div
                    className="absolute inset-0 group-hover:scale-[1.03] transition-transform duration-600"
                    style={{
                      background: `linear-gradient(135deg, ${script.videoPlaceholder} 0%, #0a0a0b 100%)`,
                      transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)',
                    }}
                  >
                    {/* Stylized timeline bars as preview placeholder */}
                    <div className="absolute inset-0 flex flex-col justify-center px-6 gap-1.5 opacity-30">
                      {[0.8, 0.6, 1, 0.45, 0.7, 0.55].map((w, i) => (
                        <div
                          key={i}
                          className="h-1.5 rounded-full"
                          style={{
                            width: `${w * 100}%`,
                            background: `linear-gradient(90deg, ${SOFTWARE_COLORS[script.software]}33, ${SOFTWARE_COLORS[script.software]}11)`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Software badge */}
                  <span
                    className="absolute top-3 right-3 w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold backdrop-blur-sm"
                    style={{
                      backgroundColor: SOFTWARE_COLORS[script.software] + '22',
                      color: SOFTWARE_COLORS[script.software],
                      border: `1px solid ${SOFTWARE_COLORS[script.software]}33`,
                    }}
                  >
                    {SOFTWARE_LABELS[script.software]}
                  </span>

                  {/* Preview button on hover */}
                  <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 text-xs text-white font-medium">
                      <span className="w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                        <span className="text-[8px] text-black ml-px">▶</span>
                      </span>
                      Preview
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3 className="text-[15px] font-semibold text-text-primary mb-1">{script.title}</h3>
                  <p className="text-[13px] text-text-secondary mb-4 leading-relaxed">{script.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-text-primary">${script.price}</span>
                    <span className="flex items-center gap-1 text-[13px] text-text-tertiary">
                      <Star size={12} className="text-accent fill-accent" />
                      {script.rating}
                      <span className="text-text-tertiary/60">({script.reviews})</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View more */}
        {!hideViewMore && (
          <div className="flex justify-center mt-12">
            <Link
              to="/marketplace"
              className="group flex items-center gap-2 border border-hairline rounded-full px-6 py-3 text-sm text-text-secondary hover:text-text-primary hover:border-white/20 transition-all duration-250"
            >
              View full marketplace ({SCRIPTS.length} scripts)
              <ArrowRight
                size={14}
                className="transition-transform duration-300 -rotate-45 group-hover:rotate-0"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
