import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Comparison from '../components/Comparison'
import ScriptLibrary from '../components/ScriptLibrary'
import HowItWorks from '../components/HowItWorks'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg text-text-primary">
      <Navbar />
      <main>
        <Hero />
        <Comparison />
        <ScriptLibrary />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Footer />
      </main>
    </div>
  )
}
