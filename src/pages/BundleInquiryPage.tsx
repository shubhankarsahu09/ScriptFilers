import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, MessageCircle, ArrowLeft, Layers, ShieldCheck, Sparkles, Send } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../contexts/AuthContext'
import { SOFTWARE_COLORS } from '../data'

const WHATSAPP_NUMBER = '8448130657'

interface AppOption {
  id: string
  name: string
  short: string
  color: string
  scriptCount: number
}

const APPS: AppOption[] = [
  { id: 'ae', name: 'After Effects', short: 'Ae', color: SOFTWARE_COLORS['ae'], scriptCount: 3 },
  { id: 'pr', name: 'Premiere Pro', short: 'Pr', color: SOFTWARE_COLORS['pr'], scriptCount: 3 },
  { id: 'dr', name: 'DaVinci Resolve', short: 'DR', color: SOFTWARE_COLORS['dr'], scriptCount: 3 },
  { id: 'blender', name: 'Blender', short: 'Bl', color: SOFTWARE_COLORS['blender'], scriptCount: 3 },
]

export default function BundleInquiryPage() {
  const [searchParams] = useSearchParams()
  const initialPlan = searchParams.get('plan') === 'studio' ? 'studio' : 'bundle'
  const [selectedPlan, setSelectedPlan] = useState<'bundle' | 'studio'>(initialPlan)
  const [selectedApp, setSelectedApp] = useState<string>('ae')

  const { session } = useAuth()
  const userMetadata = session?.user?.user_metadata
  const [fullName, setFullName] = useState<string>(userMetadata?.full_name || '')
  const [email, setEmail] = useState<string>(session?.user?.email || '')
  const [phone, setPhone] = useState<string>('')
  const [notes, setNotes] = useState<string>('')

  const activeAppObj = APPS.find((a) => a.id === selectedApp) || APPS[0]
  const isStudio = selectedPlan === 'studio'

  // Construct formatted WhatsApp message
  const generateMessage = () => {
    const lines = [
      `👋 *Hello ScriptFilers Team!*`,
      ``,
      isStudio
        ? `I want to purchase the *Studio License* ($399) with 5 seats across all applications.`
        : `I want to purchase the *Software Bundle* ($129) for *${activeAppObj.name}*.`,
      ``,
      `📋 *Order Details:*`,
      `• *Plan:* ${isStudio ? 'Studio All-Access License ($399)' : `Single Software Bundle ($129)`}`,
      !isStudio ? `• *Target App:* ${activeAppObj.name} (All ${activeAppObj.name} scripts)` : `• *Applications:* All 4 apps (AE, PR, DR, Blender) — 5 Seats`,
      `• *Name:* ${fullName.trim() || '[Not provided]'}`,
      `• *Email:* ${email.trim() || '[Not provided]'}`,
      phone.trim() ? `• *WhatsApp/Phone:* ${phone.trim()}` : null,
      notes.trim() ? `• *Note/Requirement:* ${notes.trim()}` : null,
      ``,
      `Please provide the payment instructions and license activation steps. Thanks!`,
    ].filter(Boolean)

    return lines.join('\n')
  }

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = generateMessage()
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen bg-bg text-text-primary selection:bg-accent selection:text-black">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="max-w-[1100px] mx-auto px-6">
          {/* Back link */}
          <Link
            to="/#pricing"
            className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to pricing
          </Link>

          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-semibold tracking-wide uppercase mb-4"
            >
              <Sparkles size={13} className="text-accent" />
              <span>Direct WhatsApp Order</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-4xl md:text-5xl font-semibold tracking-tight mb-4"
            >
              {isStudio ? 'Studio Team License' : 'Software Bundle Order'}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-text-secondary text-base md:text-lg"
            >
              {isStudio
                ? 'Get access to every script across all applications with 5 team seats.'
                : 'Select the 1 application you want all scripts for, fill your details, and send your request straight to WhatsApp.'}
            </motion.p>
          </div>

          {/* Plan switch toggle */}
          <div className="flex justify-center mb-10">
            <div className="p-1 bg-surface border border-hairline rounded-full flex items-center">
              <button
                type="button"
                onClick={() => setSelectedPlan('bundle')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedPlan === 'bundle'
                    ? 'bg-accent text-black shadow-md'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Software Bundle ($129)
              </button>
              <button
                type="button"
                onClick={() => setSelectedPlan('studio')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedPlan === 'studio'
                    ? 'bg-accent text-black shadow-md'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Studio License ($399)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form */}
            <div className="lg:col-span-7 bg-surface border border-hairline rounded-[24px] p-6 sm:p-8">
              <form onSubmit={handleSendToWhatsApp} className="space-y-6">
                {/* Application selector (Only for Single Software Bundle) */}
                {!isStudio ? (
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Choose 1 Application <span className="text-accent">*</span>
                    </label>
                    <p className="text-xs text-text-tertiary mb-3">
                      You will receive all existing & future scripts released for this software:
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      {APPS.map((app) => {
                        const isSelected = selectedApp === app.id
                        return (
                          <button
                            key={app.id}
                            type="button"
                            onClick={() => setSelectedApp(app.id)}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 ${
                              isSelected
                                ? 'border-accent bg-accent/5 ring-1 ring-accent'
                                : 'border-hairline bg-surface-2 hover:border-white/20'
                            }`}
                          >
                            <span
                              className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0"
                              style={{
                                backgroundColor: app.color + '22',
                                color: app.color,
                                border: `1px solid ${app.color}44`,
                              }}
                            >
                              {app.short}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-text-primary truncate">
                                {app.name}
                              </p>
                              <p className="text-[11px] text-text-tertiary">All scripts included</p>
                            </div>
                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-accent flex items-center justify-center shrink-0">
                                <Check size={12} className="text-black" />
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-accent/5 border border-accent/20 flex items-start gap-3">
                    <Layers className="text-accent shrink-0 mt-0.5" size={20} />
                    <div className="text-sm">
                      <p className="font-semibold text-text-primary">All 4 Applications Included</p>
                      <p className="text-text-secondary text-xs mt-0.5">
                        After Effects, Premiere Pro, DaVinci Resolve, and Blender with 5 shared team seats.
                      </p>
                    </div>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    Your Name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full bg-surface-2 border border-hairline rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. john@example.com"
                    className="w-full bg-surface-2 border border-hairline rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    WhatsApp Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +1 555 123 4567"
                    className="w-full bg-surface-2 border border-hairline rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    Note or Questions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any specific plugins or questions you have..."
                    className="w-full bg-surface-2 border border-hairline rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-full font-medium text-base bg-accent text-black hover:brightness-108 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(124,242,156,0.2)] cursor-pointer"
                >
                  <MessageCircle size={18} className="fill-black" />
                  <span>Send Order to WhatsApp</span>
                  <Send size={15} className="ml-1" />
                </button>
              </form>
            </div>

            {/* Right Column: Order Summary & Message Preview */}
            <div className="lg:col-span-5 space-y-6">
              {/* Order summary card */}
              <div className="bg-surface border border-hairline rounded-[24px] p-6">
                <h3 className="text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-accent" />
                  Order Summary
                </h3>

                <div className="space-y-3 text-sm pb-4 border-b border-hairline">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Selected Plan</span>
                    <span className="font-semibold text-text-primary">
                      {isStudio ? 'Studio License' : 'Software Bundle'}
                    </span>
                  </div>

                  {!isStudio && (
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Application</span>
                      <span className="font-semibold" style={{ color: activeAppObj.color }}>
                        {activeAppObj.name}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Updates</span>
                    <span className="text-accent font-medium">Free Lifetime Updates</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Licenses</span>
                    <span className="text-text-primary">
                      {isStudio ? '5 Team Seats' : '1 User (2 machines)'}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <span className="text-base font-medium text-text-primary">Total Price</span>
                  <div className="text-right">
                    {!isStudio && (
                      <span className="text-xs text-text-tertiary line-through mr-2">$248</span>
                    )}
                    <span className="text-2xl font-bold text-accent">
                      {isStudio ? '$399' : '$129'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Live WhatsApp message preview */}
              <div className="bg-surface border border-hairline rounded-[24px] p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider flex items-center gap-1.5">
                    <MessageCircle size={14} className="text-accent" />
                    Live WhatsApp Message Preview
                  </span>
                  <span className="text-[11px] text-accent bg-accent/10 px-2 py-0.5 rounded-full font-mono">
                    Ready-made
                  </span>
                </div>

                <div className="bg-[#0f1412] border border-white/5 rounded-xl p-4 text-xs font-mono text-text-secondary whitespace-pre-wrap leading-relaxed select-all">
                  {generateMessage()}
                </div>

                <p className="text-[11px] text-text-tertiary mt-3 text-center">
                  Clicking "Send Order to WhatsApp" opens WhatsApp with this exact message pre-filled.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
