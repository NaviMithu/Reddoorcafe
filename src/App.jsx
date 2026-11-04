import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import MenuSection from './components/MenuSection/MenuSection'
import AboutSection from './components/AboutSection/AboutSection'
import GallerySection from './components/GallerySection/GallerySection'
import ReviewsSection from './components/ReviewsSection/ReviewsSection'
import ContactSection from './components/ContactSection/ContactSection'
import FinalCTA from './components/FinalCTA/FinalCTA'
import Footer from './components/Footer/Footer'
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768

    let lenis = null
    if (!prefersReducedMotion && !isMobile) {
      lenis = new Lenis({
        lerp: 0.1,
        wheelMultiplier: 1.3,
        touchMultiplier: 1.5,
        smoothWheel: true,
        orientation: 'vertical',
      })

      // Drive via gsap.ticker — no separate rAF loop
      gsap.ticker.add((time) => lenis.raf(time * 1000))
      gsap.ticker.lagSmoothing(0)
      lenis.on('scroll', ScrollTrigger.update)
    }

    const handleAnchor = (e) => {
      const href = e.currentTarget.getAttribute('href')
      if (!href || !href.startsWith('#')) return
      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        if (lenis) {
          lenis.scrollTo(target, { offset: -80 })
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }

    document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener('click', handleAnchor))

    return () => {
      lenis?.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
      document.querySelectorAll('a[href^="#"]').forEach((a) => a.removeEventListener('click', handleAnchor))
    }
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MenuSection />
        <AboutSection />
        <GallerySection />
        <ReviewsSection />
        <ContactSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
