import { useState, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Eye, EyeOff, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

/* ─── Password strength logic ─── */
function getPasswordStrength(pw: string): number {
  if (!pw) return 0
  let score = 0
  if (pw.length >= 6) score++
  if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) score++
  if (pw.length >= 10 && /[^A-Za-z0-9]/.test(pw)) score++
  return score // 0-3
}

const STRENGTH_COLORS = ['bg-white/10', 'bg-accent/50', 'bg-accent/75', 'bg-accent']
const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Strong']

/* ─── Static IDE card for backdrop ─── */
const CODE_LINES = [
  { indent: 0, tokens: [{ text: 'function', color: '#7CF29C' }, { text: ' autoCaption', color: '#F5F5F4' }, { text: '(comp) {', color: '#8F8F94' }] },
  { indent: 1, tokens: [{ text: 'const', color: '#7CF29C' }, { text: ' layers = comp.', color: '#F5F5F4' }, { text: 'selectedLayers', color: '#8F8F94' }] },
  { indent: 1, tokens: [{ text: 'layers', color: '#F5F5F4' }, { text: '.forEach', color: '#7CF29C' }, { text: '(layer => {', color: '#8F8F94' }] },
  { indent: 2, tokens: [{ text: 'applyPreset', color: '#F5F5F4' }, { text: '(layer, ', color: '#8F8F94' }, { text: '"kinetic"', color: '#A78BFA' }, { text: ')', color: '#8F8F94' }] },
  { indent: 1, tokens: [{ text: '})', color: '#8F8F94' }] },
]

function StaticPreviewCard() {
  return (
    <div
      className="w-full max-w-[560px] mx-auto"
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
          <span className="text-xs text-text-tertiary font-mono">
            kinetic-captions.jsx — After Effects
          </span>
        </div>

        {/* Code body */}
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

        {/* Bottom bar */}
        <div className="px-4 py-3 border-t border-hairline">
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Form field animations ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}
const fieldVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

/* ─── Google/GitHub SVG icons ─── */
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
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#1DB954" className="shrink-0">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.5-.114-.418.122-.84-.122-.96-.54-.12-.421.12-.84.54-.96 4.56-1.02 8.52-.6 11.64 1.32.42.18.479.659.301 1.054zm1.44-3.18c-.301.48-.84.66-1.32.36-3.24-2.04-8.16-2.64-11.76-1.44-.54.18-1.08-.12-1.26-.66-.18-.54.12-1.08.66-1.26 4.2-1.38 9.6-.72 13.32 1.56.48.3.66.96.36 1.44zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.66.18-1.32-.18-1.5-.84-.18-.66.18-1.32.84-1.5 4.26-1.32 11.28-1.02 16.2 1.86.54.36.72 1.14.36 1.74-.36.6-1.14.78-1.92.24z"/>
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

/* ─── Signup Page ─── */
export default function SignupPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreedTerms, setAgreedTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [error, setError] = useState('')
  const { session } = useAuth()

  useEffect(() => {
    if (session) {
      navigate('/dashboard')
    }
  }, [session, navigate])

  const strength = getPasswordStrength(password)
  const canSubmit = name.trim() && email.trim() && password.trim() && agreedTerms && !isSubmitting

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setError('')
    setIsSubmitting(true)
    
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        }
      }
    })

    setIsSubmitting(false)

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    navigate('/dashboard')
  }, [canSubmit, email, password, name, navigate])

  const handleOAuth = (provider: 'google' | 'github' | 'apple' | 'azure' | 'discord' | 'spotify' | 'twitter') => {
    supabase.auth.signInWithOAuth({ provider })
  }

  return (
    <div className="min-h-screen bg-bg text-text-primary grid grid-cols-1 lg:grid-cols-2">
      {/* ─── LEFT PANEL: Form ─── */}
      <div className="flex flex-col justify-center px-6 sm:px-16 py-16 lg:py-12">
        {/* Wordmark */}
        <Link to="/" className="flex items-center gap-0 mb-12 self-start">
          <span className="text-lg font-semibold tracking-tight text-text-primary">
            ScriptFilers
          </span>
          <span className="blink inline-block w-1.5 h-1.5 rounded-full bg-accent ml-0.5 mt-1" />
        </Link>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[400px] mx-auto w-full"
        >
          {/* Header */}
          <motion.div variants={fieldVariant} className="mb-8">
            <p className="text-xs uppercase tracking-[0.12em] text-accent font-medium mb-3">
              Get started
            </p>
            <h1
              className="font-medium tracking-[-0.02em] leading-tight mb-2"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}
            >
              Create your <span className="accent-serif">account</span>.
            </h1>
            <p className="text-sm text-text-secondary">
              Join editors and artists automating the boring parts.
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
          <motion.div variants={fieldVariant} className="flex flex-col gap-3 mb-6">
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
          <motion.div variants={fieldVariant} className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-hairline" />
            <span className="text-xs text-text-tertiary">or</span>
            <div className="flex-1 h-px bg-hairline" />
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <motion.div variants={fieldVariant} className="mb-4">
              <label className="block text-xs text-text-secondary mb-2 font-medium">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full bg-surface border border-hairline rounded-[8px] px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary outline-none transition-all duration-200 focus:border-accent focus:shadow-[0_0_0_3px_rgba(124,242,156,0.15)]"
                style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
              />
            </motion.div>

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
            <motion.div variants={fieldVariant} className="mb-4">
              <label className="block text-xs text-text-secondary mb-2 font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
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

              {/* Password strength indicator */}
              {password && (
                <div className="mt-2.5 flex items-center gap-2">
                  <div className="flex-1 flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i < strength ? STRENGTH_COLORS[strength] : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                  {strength > 0 && (
                    <span className="text-[11px] text-text-tertiary font-medium">
                      {STRENGTH_LABELS[strength]}
                    </span>
                  )}
                </div>
              )}
            </motion.div>

            {/* Terms checkbox */}
            <motion.div variants={fieldVariant} className="mb-8">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-4 h-4 rounded-[4px] border border-hairline bg-surface peer-checked:bg-accent peer-checked:border-accent transition-all duration-200 flex items-center justify-center">
                    {agreedTerms && (
                      <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="2 6 5 9 10 3" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-text-secondary leading-snug">
                  I agree to the{' '}
                  <a href="#" className="text-accent hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-accent hover:underline">Privacy Policy</a>
                </span>
              </label>
            </motion.div>

            {/* Submit button */}
            <motion.div variants={fieldVariant}>
              <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full rounded-full py-3.5 font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                  canSubmit
                    ? 'bg-accent text-black hover:brightness-108 active:scale-[0.97] cursor-pointer'
                    : 'bg-accent/40 text-black/50 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  'Create account'
                )}
              </button>
            </motion.div>
          </form>

          {/* Sign in link */}
          <motion.p variants={fieldVariant} className="mt-8 text-center text-sm text-text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="text-accent hover:underline">
              Sign in
            </Link>
          </motion.p>
        </motion.div>
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
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-[0.08]"
            style={{
              background: 'radial-gradient(ellipse at center, #7CF29C 0%, transparent 70%)',
              filter: 'blur(90px)',
            }}
          />
        </div>

        {/* Static preview card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 w-full px-12"
        >
          <StaticPreviewCard />

          {/* Accent chip */}
          <div className="flex items-center justify-center mt-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-dim border border-accent/20 text-accent text-sm font-medium">
              <Sparkles size={14} />
              Start with 3 free scripts — no card required
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
