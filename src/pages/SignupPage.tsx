import { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Eye, EyeOff, Loader2 } from 'lucide-react'

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

/* ─── Signup Page ─── */
export default function SignupPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreedTerms, setAgreedTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const strength = getPasswordStrength(password)
  const canSubmit = name.trim() && email.trim() && password.trim() && agreedTerms && !isSubmitting

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1800))
    navigate('/')
  }, [canSubmit, navigate])

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

          {/* Social auth */}
          <motion.div variants={fieldVariant} className="flex flex-col gap-3 mb-6">
            <button className="flex items-center justify-center gap-3 w-full bg-surface border border-hairline rounded-full py-3 text-sm font-medium text-text-primary hover:border-white/20 hover:bg-surface-2 transition-all duration-200">
              <GoogleIcon />
              Continue with Google
            </button>
            <button className="flex items-center justify-center gap-3 w-full bg-surface border border-hairline rounded-full py-3 text-sm font-medium text-text-primary hover:border-white/20 hover:bg-surface-2 transition-all duration-200">
              <GitHubIcon />
              Continue with GitHub
            </button>
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
