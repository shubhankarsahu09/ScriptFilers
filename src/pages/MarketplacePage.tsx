import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScriptLibrary from '../components/ScriptLibrary'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export default function MarketplacePage() {
  const [searchParams] = useSearchParams()
  const isSingleScriptPlan = searchParams.get('plan') === 'single'

  return (
    <div className="min-h-screen bg-bg text-text-primary selection:bg-accent selection:text-black">
      <Navbar />
      
      <main className="pt-32 pb-12">
        <div className="max-w-[1200px] mx-auto px-6 mb-2 text-center">
          {isSingleScriptPlan ? (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-semibold tracking-wide uppercase mb-4"
              >
                <Sparkles size={13} className="text-accent" />
                <span>Single Script License</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-5xl font-semibold tracking-tight mb-4"
              >
                Choose One Script
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg text-text-secondary max-w-2xl mx-auto"
              >
                Select any script below to preview its features and claim your lifetime license.
              </motion.p>
            </>
          ) : (
            <>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-5xl font-semibold tracking-tight mb-4"
              >
                The Marketplace
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg text-text-secondary max-w-2xl mx-auto"
              >
                Browse our entire collection of premium scripts, built to accelerate your workflow.
              </motion.p>
            </>
          )}
        </div>
        
        {/* Reuse the beautifully animated ScriptLibrary without the view more button */}
        <div className="-mt-12">
          <ScriptLibrary hideViewMore />
        </div>
      </main>

      <Footer />
    </div>
  )
}
