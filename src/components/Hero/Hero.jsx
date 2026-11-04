import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Hero.module.css'
import cafeDoorVideo from '../../assets/Cafe_doors_opening_at_night.mp4'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef      = useRef(null)
  const videoRef     = useRef(null)
  const introRef     = useRef(null)   // overlay A — door closed
  const revealRef    = useRef(null)   // overlay B — doors open interior

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Pre-load the video and pause immediately
    video.pause()
    video.currentTime = 0

    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768

    if (prefersReducedMotion) {
      // Just show the final open state for reduced-motion users
      if (video.duration) video.currentTime = video.duration * 0.85
      gsap.set(introRef.current,  { opacity: 0 })
      gsap.set(revealRef.current, { opacity: 1 })
      return
    }

    // Shorter pin on mobile to keep it snappy
    const pinEnd = isMobile ? '+=100%' : '+=180%'

    // --- Scroll-scrubbed video + overlay timeline ---
    const st = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: pinEnd,
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate(self) {
        const p = self.progress  // 0 → 1

        // ── Scrub video currentTime (threshold prevents micro-updates) ──
        if (video.duration) {
          const newTime = p * video.duration
          if (Math.abs(newTime - video.currentTime) > 0.034) {
            video.currentTime = newTime
          }
        }

        // ── Overlay A: visible at start, fade OUT by 15% ─────
        const opA =
          p <= 0.10 ? 1
          : p <= 0.18 ? 1 - (p - 0.10) / 0.08
          : 0
        introRef.current.style.opacity = opA

        // ── Overlay B: fade IN between 65 % and 80 % ─────────
        const opB =
          p < 0.65 ? 0
          : p <= 0.80 ? (p - 0.65) / 0.15
          : 1
        revealRef.current.style.opacity = opB
      },
    })

    return () => { st.kill() }
  }, [])

  return (
    <section className={styles.hero} id="hero" ref={heroRef}>

      {/* ── Scroll-scrubbed video background ── */}
      <video
        ref={videoRef}
        className={styles.video}
        src={cafeDoorVideo}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* ── Overlay A — door-closed opening state ── */}
      <div className={styles.overlayA} ref={introRef}>

        {/* Arched-window / fanlight icon (pure SVG) */}
        <svg className={styles.archIcon} viewBox="0 0 120 80" fill="none"
          xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M10 80 L10 40 Q10 5 60 5 Q110 5 110 40 L110 80"
            stroke="#C6A36A" strokeWidth="2.5" fill="none"/>
          <line x1="60" y1="5"  x2="60"  y2="80" stroke="#C6A36A" strokeWidth="1.5"/>
          <line x1="10" y1="40" x2="110" y2="40" stroke="#C6A36A" strokeWidth="1.5"/>
          <path d="M35 40 Q35 20 60 20 Q85 20 85 40"
            stroke="#C6A36A" strokeWidth="1.2" fill="none"/>
          <circle cx="60" cy="5" r="3" fill="#C6A36A"/>
        </svg>

        {/* Scroll mouse hint */}
        <div className={styles.scrollHint}>
          <svg className={styles.mouseIcon} viewBox="0 0 24 38"
            fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="1" y="1" width="22" height="36" rx="11"
              stroke="rgba(245,235,221,0.6)" strokeWidth="1.8"/>
            <line x1="12" y1="8" x2="12" y2="14"
              stroke="rgba(245,235,221,0.8)" strokeWidth="2" strokeLinecap="round"
              className={styles.scrollLine}/>
          </svg>
          <span className={styles.scrollLabel}>SCROLL TO ENTER</span>
        </div>
      </div>

      {/* ── Overlay B — interior / welcome state ── */}
      <div className={styles.overlayB} ref={revealRef}>
        <span className={styles.welcomeTo}>WELCOME TO</span>

        <h1 className={styles.brandTitle}>
          <span className={styles.brandRed}>RED&nbsp;</span>
          <span className={styles.brandCream}>DOOR</span>
        </h1>

        <div className={styles.divider}>
          <span className={styles.divLine} />
          <span className={styles.divText}>CAFÉ</span>
          <span className={styles.divLine} />
        </div>

        <p className={styles.brandTagline}>Step in. Relax. Enjoy.</p>
      </div>

      {/* Bottom edge fade */}
      <div className={styles.bottomFade} aria-hidden="true" />
    </section>
  )
}
