import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const FOOTER_LINKS = {
  Scripts: ['After Effects', 'Premiere Pro', 'DaVinci Resolve', 'Blender', 'All Scripts'],
  Company: ['About', 'Blog', 'Careers', 'Contact'],
  Resources: ['Documentation', 'Tutorials', 'Changelog', 'API Reference'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Refund Policy', 'License Agreement'],
}

const SOCIALS = [
  { name: 'Twitter', icon: '𝕏' },
  { name: 'YouTube', icon: '▶' },
  { name: 'Discord', icon: '◇' },
  { name: 'GitHub', icon: '⬡' },
]

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const itemVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function Footer() {
  return (
    <>
      {/* Final CTA */}
      <section className="relative bg-bg py-24 overflow-hidden">
        {/* Radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-[0.06] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, #7CF29C 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15% 0px' }}
          className="relative z-10 text-center max-w-[800px] mx-auto px-6"
        >
          <motion.h2
            variants={itemVariant}
            className="font-medium tracking-[-0.02em] leading-[1.1] mb-8"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.5rem)' }}
          >
            Your <span className="accent-serif">timeline</span> is waiting.
          </motion.h2>

          <motion.div variants={itemVariant}>
            <a
              href="#scripts"
              className="group inline-flex items-center gap-3 bg-accent text-black text-base font-medium rounded-full pl-6 pr-2 py-2.5 hover:brightness-108 active:scale-[0.97] transition-all duration-200"
            >
              <span className="relative overflow-hidden h-[20px]">
                <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                  <span className="h-[20px] flex items-center">Browse Scripts</span>
                  <span className="h-[20px] flex items-center">Browse Scripts</span>
                </span>
              </span>
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/20">
                <ArrowRight size={14} className="text-black" />
              </span>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-bg border-t border-hairline">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          {/* Link grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-sm font-semibold text-text-primary mb-4">{category}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-text-tertiary hover:text-text-secondary transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Software badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {['Ae', 'Pr', 'DR', 'Bl'].map((badge) => (
              <span
                key={badge}
                className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-semibold text-text-tertiary"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-hairline">
            <p className="text-xs text-text-tertiary">
              © {new Date().getFullYear()} ScriptFilers. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  title={social.name}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-text-tertiary hover:text-text-secondary hover:bg-white/10 transition-all duration-200 text-xs"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
