import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { FAQ_ITEMS } from '../data'

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const itemVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

function FAQItem({ item, isOpen, onToggle }: {
  item: typeof FAQ_ITEMS[0]
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-hairline last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between gap-4 text-left group"
      >
        <span className="text-base font-medium text-text-primary group-hover:text-accent transition-colors duration-200">
          {item.question}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-text-tertiary transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-text-secondary leading-relaxed pr-8">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section id="docs" className="bg-bg py-24">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15% 0px' }}
          className="mb-12"
        >
          <motion.h2
            variants={itemVariant}
            className="font-medium tracking-[-0.02em] leading-[1.1] text-center"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.5rem)' }}
          >
            Frequently <span className="accent-serif">asked</span> questions.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15% 0px' }}
        >
          {FAQ_ITEMS.map((item, i) => (
            <motion.div key={i} variants={itemVariant}>
              <FAQItem
                item={item}
                isOpen={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
