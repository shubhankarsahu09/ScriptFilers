import { useState, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

/* ─── Static IDE card for backdrop (reused brand element) ─── */
const CODE_LINES = [
  { indent: 0, tokens: [{ text: 'function', color: '#7CF29C' }, { text: ' batchMatch', color: '#F5F5F4' }, { text: '(timeline) {', color: '#8F8F94' }] },
  { indent: 1, tokens: [{ text: 'const', color: '#7CF29C' }, { text: ' clips = timeline.', color: '#F5F5F4' }, { text: 'getClips()', color: '#8F8F94' }] },
  { indent: 1, tokens: [{ text: 'clips', color: '#F5F5F4' }, { text: '.map', color: '#7CF29C' }, { text: '(clip => {', color: '#8F8F94' }] },
  { indent: 2, tokens: [{ text: 'matchGrade', color: '#F5F5F4' }, { text: '(clip, ', color: '#8F8F94' }, { text: '"reference"', color: '#A78BFA' }, { text: ')', color: '#8F8F94' }] },
  { indent: 1, tokens: [{ text: '})', color: '#8F8F94' }] },
]

function StaticPreviewCard() {
  return (
    <div className="w-full max-w-[520px] mx-auto">
      <div
        className="bg-bg border border-hairline rounded-[20px] overflow-hidden"
        style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 60px rgba(0,0,0,0.4)' }}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-hairline">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>
          <span className="text-xs text-text-tertiary font-mono">
            batch-color.prproj — Premiere Pro
          </span>
        </div>
        <div className="p-5">
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
        <div className="px-4 py-3 border-t border-hairline">
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Rotating testimonials ─── */
const QUOTES = [
  { text: 'Kinetic Captions alone saved our team 6 hours on a 30-episode series.', author: 'Sarah Chen', role: 'Senior Editor, Framehaus' },
  { text: "ScriptFilers is the only marketplace where every tool feels production-ready.", author: 'Marcus Obi', role: 'Motion Designer, Optik Studio' },
  { text: 'Node Automator changed how I approach complex grades. One click.', author: 'Lina Park', role: 'Colorist, PostWorks' },
]

function RotatingQuote() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setIdx((i) => (i + 1) % QUOTES.length), 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-[60px] relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
          className="absolute inset-0"
        >
          <p className="text-sm text-text-secondary italic leading-relaxed">"{QUOTES[idx].text}"</p>
          <p className="text-xs text-text-tertiary mt-1">{QUOTES[idx].author} · {QUOTES[idx].role}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ─── Social icons ─── */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" className="shrink-0">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="shrink-0 text-text-primary">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="shrink-0 text-text-primary">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.62-1.496 3.6-2.998 1.14-1.665 1.611-3.278 1.637-3.364-.039-.013-3.15-1.21-3.189-4.83-.026-3.04 2.478-4.526 2.582-4.59-1.427-2.09-3.627-2.378-4.408-2.443-1.844-.143-3.614 1.168-4.507 1.168zm1.09-2.738c.846-1.025 1.41-2.454 1.253-3.882-1.226.052-2.723.824-3.595 1.837-.783.896-1.464 2.368-1.279 3.754 1.37.104 2.776-.682 3.621-1.709z"/>
    </svg>
  )
}

function AzureIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="#00a4ef" className="shrink-0">
      <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#5865F2" className="shrink-0">
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  )
}

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#1DB954" className="shrink-0">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.394-.756.52-1.15.28-3.153-1.928-7.124-2.362-11.802-1.295-.453.104-.912-.18-.1015-.632.103-.453.388-.912.18-3.411 1.205-7.737 1.688-11.233-.448a.855.855 0 0 1 1.154.286zm1.611-3.6c-.302.493-.938.653-1.432.351-3.585-2.203-9.06-2.825-13.111-1.547-.552.174-1.14-.132-1.314-.684-.174-.552.132-1.14.684-1.314 4.653-1.468 10.741-.77 14.823 1.743.493.303.653.938.351 1.432zm.12-3.76C15.023 7.42 8.742 7.228 5.093 8.337c-.66.202-1.353-.171-1.554-.832-.202-.661.17-1.353.831-1.554 4.256-1.294 11.213-1.071 16.14 1.854.595.352.793 1.12.44 1.716-.352.595-1.12.793-1.716.44z"/>
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="shrink-0 text-text-primary">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

/* ─── Form animation variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}
const fieldVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

/* ─── Login Page ─── */
export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const canSubmit = email.trim() && password.trim() && !isSubmitting

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setError('')
    setIsSubmitting(true)

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setIsSubmitting(false)

    if (signInError) {
      setError(signInError.message)
      return
    }

    navigate('/')
  }, [canSubmit, navigate, email, password])

  const handleOAuth = (provider: 'google' | 'github') => {
    supabase.auth.signInWithOAuth({ provider })
  }

  return (
    <div className="min-h-screen bg-bg text-text-primary grid grid-cols-1 lg:grid-cols-2">
      {/* ─── LEFT PANEL: Form ─── */}
      <div className="flex flex-col px-6 sm:px-16 py-16 lg:py-12">
        {/* Wordmark */}
        <Link to="/" className="flex items-center gap-0 mb-12 self-start">
          <span className="text-lg font-semibold tracking-tight text-text-primary">
            ScriptFilers
          </span>
          <span className="blink inline-block w-1.5 h-1.5 rounded-full bg-accent ml-0.5 mt-1" />
        </Link>

        <div className="flex-1 flex items-center justify-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-[380px] w-full"
          >
            {/* Header */}
            <motion.div variants={fieldVariant} className="mb-8">
              <p className="text-xs uppercase tracking-[0.12em] text-accent font-medium mb-3">
                Welcome back
              </p>
              <h1
                className="font-medium tracking-[-0.02em] leading-tight mb-2"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}
              >
                Sign in to your <span className="accent-serif">library</span>.
              </h1>
              <p className="text-sm text-text-secondary mt-2">
                Access every script you've purchased.
              </p>
            </motion.div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4 px-4 py-3 rounded-[8px] bg-[#E5484D]/10 border border-[#E5484D]/20 text-sm text-[#E5484D]/80"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Social auth */}
            <motion.div variants={fieldVariant} className="flex flex-col gap-3">
              <button 
                onClick={() => handleOAuth('google')}
                type="button"
                className="flex items-center justify-center gap-3 w-full bg-surface border border-hairline rounded-full py-3 text-sm font-medium text-text-primary hover:border-white/20 hover:bg-surface-2 transition-all duration-200"
              >
                <GoogleIcon />
                Continue with Google
              </button>
              <button 
                onClick={() => handleOAuth('github')}
                type="button"
                className="flex items-center justify-center gap-3 w-full bg-surface border border-hairline rounded-full py-3 text-sm font-medium text-text-primary hover:border-white/20 hover:bg-surface-2 transition-all duration-200"
              >
                <GitHubIcon />
                Continue with GitHub
              </button>
              <div className="flex items-center justify-center gap-3 mt-1">
                <button onClick={() => handleOAuth('apple')} type="button" className="w-10 h-10 rounded-full bg-surface border border-hairline flex items-center justify-center text-text-primary hover:border-white/20 hover:bg-surface-2 transition-all duration-200">
                  <AppleIcon />
                </button>
                <button onClick={() => handleOAuth('azure')} type="button" className="w-10 h-10 rounded-full bg-surface border border-hairline flex items-center justify-center text-text-primary hover:border-white/20 hover:bg-surface-2 transition-all duration-200">
                  <AzureIcon />
                </button>
                <button onClick={() => handleOAuth('discord')} type="button" className="w-10 h-10 rounded-full bg-surface border border-hairline flex items-center justify-center text-text-primary hover:border-white/20 hover:bg-surface-2 transition-all duration-200">
                  <DiscordIcon />
                </button>
                <button onClick={() => handleOAuth('spotify')} type="button" className="w-10 h-10 rounded-full bg-surface border border-hairline flex items-center justify-center text-text-primary hover:border-white/20 hover:bg-surface-2 transition-all duration-200">
                  <SpotifyIcon />
                </button>
                <button onClick={() => handleOAuth('twitter')} type="button" className="w-10 h-10 rounded-full bg-surface border border-hairline flex items-center justify-center text-text-primary hover:border-white/20 hover:bg-surface-2 transition-all duration-200">
                  <TwitterIcon />
                </button>
              </div>
            </motion.div>

            {/* Divider */}
            <motion.div variants={fieldVariant} className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-hairline" />
              <span className="text-xs text-text-tertiary">or</span>
              <div className="flex-1 h-px bg-hairline" />
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              // Shake on error
              animate={error ? { x: [0, -6, 6, -4, 4, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              {/* Email */}
              <motion.div variants={fieldVariant} className="mb-4">
                <label className="block text-xs text-text-secondary mb-2 font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@studio.com"
                  className="w-full bg-surface border border-hairline rounded-[8px] px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary outline-none transition-all duration-200 focus:border-accent focus:shadow-[0_0_0_3px_rgba(124,242,156,0.15)]"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
                />
              </motion.div>

              {/* Password */}
              <motion.div variants={fieldVariant} className="mb-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs text-text-secondary font-medium">Password</label>
                  <a href="#" className="text-xs text-accent hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-surface border border-hairline rounded-[8px] px-4 py-3 pr-11 text-sm text-text-primary placeholder:text-text-tertiary outline-none transition-all duration-200 focus:border-accent focus:shadow-[0_0_0_3px_rgba(124,242,156,0.15)]"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </motion.div>

              {/* Submit button */}
              <motion.div variants={fieldVariant} className="mt-8">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="group w-full rounded-full py-3.5 font-medium text-sm transition-all duration-200 flex items-center justify-center bg-accent text-black hover:brightness-108 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <span className="relative overflow-hidden h-[20px]">
                      <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                        <span className="h-[20px] flex items-center justify-center">Sign in</span>
                        <span className="h-[20px] flex items-center justify-center">Sign in</span>
                      </span>
                    </span>
                  )}
                </button>
              </motion.div>
            </motion.form>

            {/* Sign up link */}
            <motion.p variants={fieldVariant} className="mt-8 text-center text-sm text-text-secondary">
              Don't have an account?{' '}
              <Link to="/signup" className="text-accent hover:underline">
                Create one
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* ─── RIGHT PANEL: Visual Backdrop ─── */}
      <div className="hidden lg:flex flex-col items-center justify-center relative bg-surface overflow-hidden">
        {/* Background treatments */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Grid lines */}
          <div className="absolute inset-0">
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
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-[0.08]"
            style={{
              background: 'radial-gradient(ellipse at center, #7CF29C 0%, transparent 70%)',
              filter: 'blur(90px)',
            }}
          />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 w-full px-12 flex flex-col items-center"
        >
          <StaticPreviewCard />

          {/* Caption */}
          <p className="mt-6 text-sm text-text-tertiary text-center">
            Welcome back — <span className="text-text-secondary font-medium">1,204</span> scripts and counting
          </p>

          {/* Rotating testimonial */}
          <div className="mt-10 max-w-[380px] w-full mx-auto text-center">
            <RotatingQuote />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
