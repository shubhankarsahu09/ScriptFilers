import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Package, Download, Settings, History } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function DashboardPage() {
  const { user } = useAuth()
  
  return (
    <div className="min-h-screen bg-bg text-text-primary selection:bg-accent selection:text-black flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24 px-6 md:px-12 max-w-[1200px] mx-auto w-full">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariant} className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-hairline pb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
                Dashboard
              </h1>
              <p className="text-text-secondary text-lg">
                Welcome back, {user?.user_metadata?.full_name || user?.email || 'Creator'}.
              </p>
            </div>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <motion.div variants={itemVariant} className="md:col-span-2 space-y-6">
              <div className="bg-surface border border-hairline rounded-[24px] p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-text-tertiary" />
                </div>
                <h3 className="text-xl font-medium mb-2">No scripts yet</h3>
                <p className="text-text-secondary max-w-sm mb-6">
                  You haven't purchased or downloaded any scripts from the marketplace yet.
                </p>
                <a 
                  href="/"
                  className="bg-accent text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#6AE08A] transition-colors"
                >
                  Browse Marketplace
                </a>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div variants={itemVariant} className="space-y-6">
              <div className="bg-surface border border-hairline rounded-[24px] p-6">
                <h4 className="text-sm font-medium text-text-secondary uppercase tracking-widest mb-4">
                  Quick Links
                </h4>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-2 text-sm font-medium transition-colors text-left">
                    <Download className="w-4 h-4 text-text-secondary" />
                    Downloads
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-2 text-sm font-medium transition-colors text-left">
                    <History className="w-4 h-4 text-text-secondary" />
                    Purchase History
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-2 text-sm font-medium transition-colors text-left">
                    <Settings className="w-4 h-4 text-text-secondary" />
                    Account Settings
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
