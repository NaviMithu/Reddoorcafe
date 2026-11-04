import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './FinalCTA.module.css'

export default function FinalCTA() {
  const bgRef = useRef(null)

  useEffect(() => {
    gsap.to(bgRef.current, {
      scrollTrigger: { trigger: bgRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      y: -70,
      ease: 'none',
    })
  }, [])

  return (
    <section className={styles.section} id="cta">
      <div className={styles.bg} ref={bgRef}></div>
      <div className={styles.content}>
        <h2 className={styles.heading}>Come In.<br />Stay a While.</h2>
        <p className={styles.subtitle}>Your next favourite café experience awaits.</p>
        <div className={styles.buttons}>
          <Link to="/menu" className="btn btn--red btn--large">EXPLORE MENU</Link>
          <a href="#contact" className="btn btn--outline btn--large">FIND US</a>
        </div>
      </div>
    </section>
  )
}

