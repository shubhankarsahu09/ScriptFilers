import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const FOOTER_LINKS = {
  Scripts: ['After Effects', 'Premiere Pro', 'DaVinci Resolve', 'Blender', 'All Scripts'],
  Company: ['About', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Refund Policy'],
}

const SOCIALS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/script_filers.officials/',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    ),
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/ScriptFilers',
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/8448130657',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    ),
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

export default function Footer() {
  const location = useLocation()

  const handleBrowseScripts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/marketplace') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

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
            <Link
              to="/marketplace"
              onClick={handleBrowseScripts}
              className="group inline-flex items-center gap-3 bg-accent text-black text-base font-medium rounded-full pl-6 pr-2 py-2.5 hover:brightness-108 active:scale-[0.97] transition-all duration-200 cursor-pointer"
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
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-bg border-t border-hairline">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          {/* Link grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-16">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-sm font-semibold text-text-primary mb-4">{category}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      {link === 'All Scripts' ? (
                        <Link
                          to="/marketplace"
                          onClick={handleBrowseScripts}
                          className="text-sm text-text-tertiary hover:text-text-secondary transition-colors duration-200"
                        >
                          {link}
                        </Link>
                      ) : (
                        <a
                          href="#"
                          className="text-sm text-text-tertiary hover:text-text-secondary transition-colors duration-200"
                        >
                          {link}
                        </a>
                      )}
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
            <div className="flex items-center gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-white/10 hover:border-white/20 border border-hairline transition-all duration-200"
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
