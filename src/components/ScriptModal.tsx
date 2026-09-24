import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, MessageCircle, Play } from 'lucide-react'
import { SOFTWARE_LABELS, SOFTWARE_COLORS } from '../data'
import type { Script } from '../data'
import { useAuth } from '../contexts/AuthContext'

interface ScriptModalProps {
  script: Script | null
  isOpen: boolean
  onClose: () => void
}

export default function ScriptModal({ script, isOpen, onClose }: ScriptModalProps) {
  const { session } = useAuth()

  // Replace with actual WhatsApp number
  const WHATSAPP_NUMBER = '8448130657' 

  if (!script) return null

  const handleGetScript = () => {
    const userName = session?.user?.user_metadata?.full_name
    const nameNote = userName ? ` (Name: ${userName})` : ''
    const message = encodeURIComponent(`Hi! I am interested in getting the script: ${script.title}${nameNote}`)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-3xl bg-surface border border-hairline rounded-[24px] overflow-hidden pointer-events-auto shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Header / Video Area */}
              <div className="relative aspect-video w-full bg-black shrink-0 group">
                {/* Fallback stylized background if no real video */}
                <div 
                  className="absolute inset-0 flex flex-col justify-center px-8 gap-2 opacity-40"
                  style={{
                    background: `linear-gradient(135deg, ${script.videoPlaceholder} 0%, #0a0a0b 100%)`,
                  }}
                >
                  {[0.8, 0.6, 1, 0.45, 0.7, 0.55].map((w, i) => (
                    <div
                      key={i}
                      className="h-2 rounded-full"
                      style={{
                        width: `${w * 100}%`,
                        background: `linear-gradient(90deg, ${SOFTWARE_COLORS[script.software]}33, ${SOFTWARE_COLORS[script.software]}11)`,
                      }}
                    />
                  ))}
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                  <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:scale-105 hover:bg-white/20 transition-all">
                    <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-colors z-10 border border-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content Area */}
              <div className="p-6 md:p-8 overflow-y-auto">
                <div className="flex flex-col md:flex-row gap-6 justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase"
                        style={{
                          backgroundColor: SOFTWARE_COLORS[script.software] + '22',
                          color: SOFTWARE_COLORS[script.software],
                          border: `1px solid ${SOFTWARE_COLORS[script.software]}33`,
                        }}
                      >
                        {SOFTWARE_LABELS[script.software]}
                      </span>
                      <div className="flex items-center gap-1.5 text-sm text-text-tertiary">
                        <Star size={14} className="text-[#F5A623] fill-[#F5A623]" />
                        <span className="font-medium text-text-secondary">{script.rating}</span>
                        <span>({script.reviews} reviews)</span>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-2">
                      {script.title}
                    </h2>
                    <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl">
                      {script.description}
                    </p>
                  </div>

                  {/* Price Tag */}
                  <div className="text-left md:text-right shrink-0">
                    <div className="text-3xl md:text-4xl font-semibold text-text-primary">
                      ${script.price}
                    </div>
                    <div className="text-sm text-text-tertiary mt-1">Lifetime License</div>
                  </div>
                </div>

                <div className="w-full h-px bg-hairline my-6" />

                {/* Details & Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-sm font-medium text-text-primary mb-3">Highlights</h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                        One-click installation
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                        Works on Mac & Windows
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                        Free updates forever
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-text-primary mb-3">Compatibility</h3>
                    <p className="text-sm text-text-secondary">
                      Requires {SOFTWARE_LABELS[script.software]} 2024 or newer.
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleGetScript}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-accent text-black font-semibold text-lg hover:brightness-108 active:scale-[0.98] transition-all"
                >
                  <MessageCircle size={20} />
                  Get this script via WhatsApp
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
