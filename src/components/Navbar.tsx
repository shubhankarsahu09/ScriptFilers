import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X, Menu, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

const NAV_LINKS = [
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'Bundles', path: '/#bundles' },
  { label: 'Docs', path: '/#docs' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { session } = useAuth()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setMobileOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'top-3 left-1/2 -translate-x-1/2 max-w-[1200px] w-[calc(100%-2rem)]'
            : 'w-full'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <nav
          className={`flex items-center justify-between px-5 py-3 transition-all duration-400 ${
            scrolled
              ? 'bg-[#121214]/80 backdrop-blur-xl border border-white/[0.08] rounded-full'
              : 'bg-transparent'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
        >
          {/* Wordmark */}
          <Link to="/" className="flex items-center gap-0 shrink-0">
            <span className="text-lg font-semibold tracking-tight text-text-primary">
              ScriptFilers
            </span>
            <span className="blink inline-block w-1.5 h-1.5 rounded-full bg-accent ml-0.5 mt-1" />
          </Link>

          {/* Center nav — desktop */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.path}
                className="relative text-sm text-text-secondary hover:text-text-primary transition-colors duration-250 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent rounded-full transition-all duration-250 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right side — desktop */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-text-primary hover:text-accent transition-colors duration-200 px-4 py-2"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-surface text-text-secondary text-sm font-medium rounded-full px-5 py-2.5 hover:text-text-primary hover:bg-surface-2 active:scale-[0.97] transition-all duration-200"
                >
                  <LogOut size={14} />
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 px-4 py-2"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 bg-accent text-black text-sm font-medium rounded-full px-5 py-2.5 hover:brightness-108 active:scale-[0.97] transition-all duration-200"
                >
                  Sign up
                  <ArrowRight size={14} />
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-bg/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-5 right-5 p-2 text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            <nav className="flex flex-col items-center gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.path}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-[32px] font-medium text-text-primary hover:text-accent transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: NAV_LINKS.length * 0.08,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-4 flex flex-col items-center gap-4"
              >
                {session ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="text-lg text-text-primary hover:text-accent transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 bg-surface text-text-secondary text-base font-medium rounded-full px-8 py-3 mt-2"
                    >
                      <LogOut size={16} />
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="text-lg text-text-secondary hover:text-text-primary transition-colors"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 bg-accent text-black text-base font-medium rounded-full px-8 py-3"
                    >
                      Sign up
                      <ArrowRight size={16} />
                    </Link>
                  </>
                )}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
