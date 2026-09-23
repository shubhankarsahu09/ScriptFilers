// Script data used across multiple sections
export interface Script {
  id: string
  title: string
  description: string
  price: number
  rating: number
  reviews: number
  software: 'ae' | 'pr' | 'dr' | 'blender'
  videoPlaceholder: string
}

export const SOFTWARE_LABELS: Record<string, string> = {
  ae: 'Ae',
  pr: 'Pr',
  dr: 'DR',
  blender: 'Bl',
}

export const SOFTWARE_FULL: Record<string, string> = {
  ae: 'After Effects',
  pr: 'Premiere Pro',
  dr: 'DaVinci Resolve',
  blender: 'Blender',
}

export const SOFTWARE_COLORS: Record<string, string> = {
  ae: '#9999FF',
  pr: '#EA77FF',
  dr: '#FF6B4A',
  blender: '#EA7600',
}

export const SCRIPTS: Script[] = [
  {
    id: 'kinetic-captions',
    title: 'Kinetic Captions',
    description: 'Auto-generate animated captions from audio with style presets.',
    price: 34,
    rating: 4.9,
    reviews: 127,
    software: 'ae',
    videoPlaceholder: '#1a1a2e',
  },
  {
    id: 'batch-color-match',
    title: 'Batch Color Match',
    description: 'Match color grades across clips in one click.',
    price: 28,
    rating: 4.8,
    reviews: 89,
    software: 'pr',
    videoPlaceholder: '#1a1e2e',
  },
  {
    id: 'node-automator',
    title: 'Node Automator',
    description: 'Build complex node trees from presets and macros.',
    price: 42,
    rating: 4.7,
    reviews: 64,
    software: 'dr',
    videoPlaceholder: '#1e1a1a',
  },
  {
    id: 'quick-rig',
    title: 'Quick Rig Pro',
    description: 'Auto-rig characters with IK/FK in under 10 seconds.',
    price: 38,
    rating: 4.9,
    reviews: 203,
    software: 'blender',
    videoPlaceholder: '#1a1e1a',
  },
  {
    id: 'motion-trails',
    title: 'Motion Trails FX',
    description: 'Generate stylized motion trails on any layer or object.',
    price: 24,
    rating: 4.6,
    reviews: 56,
    software: 'ae',
    videoPlaceholder: '#1a1a28',
  },
  {
    id: 'auto-reframe',
    title: 'Auto Reframe Pro',
    description: 'Intelligently reframe any project for vertical or square.',
    price: 32,
    rating: 4.8,
    reviews: 142,
    software: 'pr',
    videoPlaceholder: '#201a1e',
  },
]

export const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Senior Editor',
    studio: 'Framehaus',
    software: 'ae',
    quote: 'Kinetic Captions alone saved our team 6 hours on a 30-episode series. The scripts just work.',
  },
  {
    name: 'Marcus Obi',
    role: 'Motion Designer',
    studio: 'Optik Studio',
    software: 'ae',
    quote: "I've tried every AE script marketplace. ScriptFilers is the only one where every single tool feels production-ready.",
  },
  {
    name: 'Lina Park',
    role: 'Colorist',
    studio: 'PostWorks',
    software: 'dr',
    quote: 'Node Automator changed how I approach complex grades. What took 20 minutes now takes one click.',
  },
  {
    name: 'James Whitfield',
    role: 'Lead Editor',
    studio: 'Cutline Media',
    software: 'pr',
    quote: 'Auto Reframe Pro handles 90% of our social deliverables. Genuinely indispensable.',
  },
  {
    name: 'Anya Kowalski',
    role: '3D Artist',
    studio: 'Polygon Collective',
    software: 'blender',
    quote: 'Quick Rig Pro does in seconds what used to eat an entire afternoon. Magic.',
  },
  {
    name: 'David Morales',
    role: 'VFX Supervisor',
    studio: 'Ember Post',
    software: 'ae',
    quote: "Motion Trails FX is the kind of tool that makes clients think you're a wizard. Worth every cent.",
  },
  {
    name: 'Priya Nair',
    role: 'Freelance Editor',
    studio: 'Independent',
    software: 'pr',
    quote: 'The batch color matching is absurdly good. Handles mixed footage from three cameras without a hitch.',
  },
  {
    name: 'Tom Eriksson',
    role: 'Creative Director',
    studio: 'Nordic Frame',
    software: 'ae',
    quote: "We've standardized on ScriptFilers across the studio. Consistent quality, amazing support.",
  },
]

export const FAQ_ITEMS = [
  {
    question: 'What license do I get with a single script purchase?',
    answer: 'Every single-script purchase includes a lifetime license for one user. You can use it on up to two machines (e.g. desktop and laptop). Updates are free forever — no annual renewal, no expiration.',
  },
  {
    question: 'Which software versions are supported?',
    answer: 'We support the two most recent major versions of each application. For After Effects and Premiere Pro, that currently means 2024 and 2025. DaVinci Resolve 18+ and Blender 3.6+ are supported. When a new version drops, we update within two weeks.',
  },
  {
    question: 'Do I need any coding knowledge to use these scripts?',
    answer: "Not at all. Every script is a single file — drop it into your application's scripts folder, restart, and it appears in your menu or as a panel. No command line, no dependencies, no configuration.",
  },
  {
    question: 'What is your refund policy?',
    answer: "We offer a 14-day money-back guarantee, no questions asked. If a script doesn't work as described, or it's simply not what you expected, email us and we'll process a full refund within 24 hours.",
  },
  {
    question: 'What does the Studio License include?',
    answer: 'The Studio License gives your team access to every script across all four supported applications — After Effects, Premiere Pro, DaVinci Resolve, and Blender. It includes 5 seats (expandable), priority support, and early access to new scripts before public release.',
  },
  {
    question: 'Can I use scripts in commercial/client projects?',
    answer: 'Yes. All licenses — single, bundle, and studio — include full commercial usage rights. Use them in client work, broadcast, film, YouTube, advertising — whatever you need.',
  },
]
