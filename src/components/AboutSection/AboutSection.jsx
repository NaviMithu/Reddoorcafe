import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './AboutSection.module.css'

const STATS = [
  { icon: '☕', value: 10, suffix: '', label: 'Years of Exp.' },
  { icon: '🌿', value: 100, suffix: '%', label: 'Quality Ingred.' },
  { icon: '✨', value: null, text: 'Warm', label: 'Cozy Ambience' },
  { icon: '❤️', value: 50000, suffix: '+', label: 'Happy Guests' },
]

export default function AboutSection() {
  const countRefs = useRef([])

  useEffect(() => {
    countRefs.current.forEach((el, i) => {
      if (!el || STATS[i].value === null) return
      gsap.fromTo(
        el,
        { textContent: 0 },
        {
          scrollTrigger: { trigger: el, start: 'top 80%' },
          textContent: STATS[i].value,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: STATS[i].value > 100 ? 100 : 1 },
          onUpdate() {
            el.textContent = Math.round(parseFloat(el.textContent)).toLocaleString() + (STATS[i].suffix || '')
          },
        }
      )
    })
  }, [])

  return (
    <section className={styles.section} id="about-brand">
      <div className={styles.container}>
        {/* Left: Story & Stats */}
        <div className={styles.content}>
          <span className="section-label">OUR STORY</span>
          <h2 className={styles.heading}>
            <span className="highlight-red">10+ YEARS</span> OF CREATING MEMORIES
          </h2>
          <p className={styles.text}>
            More than just a café, Red Door Café is a welcoming sanctuary to connect, pause, and celebrate life's finest nuances. From the gentle chime of our brass door handles to the aroma of slow-roasted single-origin beans, every corner is designed for warmth.
          </p>
          <p className={styles.text}>
            For over a decade, we have championed culinary artistry with honesty and passion. Whether you are savoring our signature stone-baked delicacies or sharing an intimate espresso, your story becomes part of ours.
          </p>

          <div className={styles.stats}>
            {STATS.map((stat, i) => (
              <div className={styles.statItem} key={i}>
                <span className={styles.statIcon}>{stat.icon}</span>
                <span
                  className={styles.statValue}
                  ref={(el) => (countRefs.current[i] = el)}
                >
                  {stat.text || `${(stat.value || 0).toLocaleString()}${stat.suffix || ''}`}
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>

          <Link to="/menu" className="btn btn--red">
            DISCOVER OUR STORY <span className="btn__arrow">→</span>
          </Link>
        </div>

        {/* Right: Visuals + Badge */}
        <div className={styles.visuals}>
          <div className={styles.visualLeft}>
            <img src="/images/play.png" alt="Red Door Café interior" className={styles.visualImg} />
          </div>
          <div className={styles.visualRight}>
            <div className={styles.badge}> 
              <span>10+</span>
              <span>YEARS OF EXCELLENCE</span>
            </div>
            <img src="/images/bu.png" alt="Red Door Café food" className={styles.visualImg} />  
          </div>
        </div>
      </div>
    </section>
  )
}

