import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const PLANS = [
  {
    name: 'Single Script',
    price: '$18–$45',
    period: 'one script, lifetime updates',
    featured: false,
    features: [
      'One script of your choice',
      'Lifetime license for 1 user',
      'Free updates forever',
      'Use on 2 machines',
      '14-day money-back guarantee',
    ],
    cta: 'Choose a script',
  },
  {
    name: 'Software Bundle',
    price: '$129',
    originalPrice: '$248',
    period: 'all scripts for one app',
    featured: true,
    features: [
      'Every script for one application',
      'Lifetime license for 1 user',
      'Free updates forever',
      'Use on 2 machines',
      'Priority email support',
      'Early access to new scripts',
    ],
    cta: 'Get the bundle',
  },
  {
    name: 'Studio License',
    price: '$399',
    period: 'all scripts, all apps, 5 seats',
    featured: false,
    features: [
      'Every script across all 4 apps',
      '5 team seats included',
      'Centralized license management',
      'Priority support',
      'Early access to new scripts',
      'Custom script requests',
    ],
    cta: 'Contact sales',
  },
]

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const itemVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function Pricing() {
  const navigate = useNavigate()
  const { session } = useAuth()

  const handlePlanClick = () => {
    if (!session) {
      navigate('/signup')
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <section id="pricing" className="bg-bg py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15% 0px' }}
          className="mb-14"
        >
          <motion.div variants={itemVariant} className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full border border-hairline flex items-center justify-center text-xs text-text-tertiary font-medium">
              03
            </span>
            <span className="px-3 py-1 rounded-full border border-hairline text-xs text-text-secondary font-medium">
              Pricing
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariant}
            className="font-medium tracking-[-0.02em] leading-[1.1]"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.5rem)' }}
          >
            Buy what you need. <span className="accent-serif">Nothing</span> you don't.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15% 0px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
        >
          {PLANS.map((plan, _i) => (
            <motion.div
              key={plan.name}
              variants={itemVariant}
              className={`relative rounded-[20px] p-6 lg:p-8 ${
                plan.featured
                  ? 'bg-surface border-2 border-accent/40 md:scale-105 md:-my-4 shadow-[0_0_60px_rgba(124,242,156,0.06)]'
                  : 'bg-surface border border-hairline'
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 right-6 px-3 py-1 bg-accent text-black text-xs font-semibold rounded-full">
                  Most popular
                </span>
              )}

              <h3 className="text-lg font-semibold text-text-primary mb-1">{plan.name}</h3>
              <p className="text-sm text-text-tertiary mb-6">{plan.period}</p>

              <div className="mb-6">
                {plan.originalPrice && (
                  <span className="text-sm text-text-tertiary line-through mr-2">{plan.originalPrice}</span>
                )}
                <span className="text-3xl font-semibold text-text-primary">{plan.price}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <span className="mt-0.5 w-4 h-4 rounded-full bg-accent-dim flex items-center justify-center shrink-0">
                      <Check size={10} className="text-accent" />
                    </span>
                    <span className="text-sm text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={handlePlanClick}
                className={`w-full py-3 rounded-full font-medium text-sm transition-all duration-200 ${
                  plan.featured
                    ? 'bg-accent text-black hover:brightness-108 active:scale-[0.97]'
                    : 'bg-white text-black hover:bg-white/90 active:scale-[0.97]'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
