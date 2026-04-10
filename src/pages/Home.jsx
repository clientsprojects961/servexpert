import Hero from '../components/Hero'
import ClientsMarquee from '../components/ClientsMarquee'
import AgencyShowreel from '../components/FoundersVideo'
import TrustStrip from '../components/TrustStrip'
import Features from '../components/Features'
import Philosophy from '../components/Philosophy'
import Protocol from '../components/Protocol'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import CTABanner from '../components/CTABanner'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <h1 className="sr-only">ServeXpert — Global digital growth & performance agency</h1>
      <Hero />
      <ClientsMarquee />
      <AgencyShowreel />
      <TrustStrip />
      <Features />
      <Philosophy />
      <Protocol />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Footer />
    </main>
  )
}
