import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import styles from './MenuSection.module.css'

const MENU_ITEMS = [
  {
    name: 'ALFREDO PASTA',
    price: '₹235',
    img: '/images/Alfredo_Pasta.png',
    bg: 'radial-gradient(circle at 50% 40%, rgba(240,100,40,0.28) 0%, transparent 70%), #150602',
    rotate: -3,
  },
  {
    name: 'Long Island Iced Tea',
    price: '₹250',
    img: '/images/Long_Island_Iced_Tea.jpeg',
    bg: 'radial-gradient(circle at 50% 50%, rgba(180,80,40,0.25) 0%, transparent 70%), #0d0404',
    rotate: 2,
  },
  {
    name: 'Ring Road BBQ',
    price: '₹249',
    img: '/images/Ring_ Road_BBQ.jpeg',
    bg: 'radial-gradient(circle at 50% 50%, rgba(255,170,60,0.3) 0%, transparent 70%), #1c0a01',
    rotate: 0,
    featured: true,
  },
  {
    name: 'Fish Fingers',
    price: '₹199',
    img: '/images/Fish_Fingers.jpeg',
    bg: 'radial-gradient(circle at 50% 40%, rgba(240,190,40,0.26) 0%, transparent 70%), #130a01',
    rotate: -2,
  },
  {
    name: 'Lychee Boba',
    price: '₹179',
    img: '/images/Lychee_Boba.png',
    bg: 'radial-gradient(circle at 50% 40%, rgba(60,190,100,0.25) 0%, transparent 70%), #040e06',
    rotate: 3,
  },
  {
    name: 'Chicken Club Sandwich',
    price: '₹229',
    img: '/images/Chicken_Club_Sandwich.png',
    bg: 'radial-gradient(circle at 50% 40%, rgba(240,190,40,0.26) 0%, transparent 70%), #130a01',
    rotate: 2,
  },
]

export default function MenuSection() {
  const stageRef = useRef(null)
  const [current, setCurrent] = useState(0)

  const scrollCarousel = (dir) => {
    const next = Math.max(0, Math.min(current + dir, MENU_ITEMS.length - 3))
    setCurrent(next)
    const cardWidth = 274 // 250px + 24px gap
    gsap.to(stageRef.current, { x: -next * cardWidth, duration: 0.6, ease: 'power3.inOut' })
  }

  const handleCardMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    gsap.to(card, { rotateY: x * 10, rotateX: -y * 10, duration: 0.4, ease: 'power2.out', transformPerspective: 800 })
  }

  const handleCardMouseLeave = (card) => {
    gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' })
  }

  return (
    <section className={styles.section} id="menu">
      <div className={styles.header}>
        <span className={styles.label}>OUR MENU</span>
        <h2 className={styles.title}>A curated selection of our finest creations.</h2>
        <div className="section-divider"></div>
        <p className={styles.subtitle}>Experience the art of flavor.</p>
      </div>

      <div className={styles.carousel}>
        <div className={styles.stage} ref={stageRef}>
          {MENU_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`${styles.card} ${item.featured ? styles.cardFeatured : ''}`}
              style={{ '--rotate': `${item.rotate}deg` }}
              onMouseMove={(e) => handleCardMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleCardMouseLeave(e.currentTarget)}
            >
              <div className={styles.cardImage} style={{ background: item.bg }}>
                {item.img && (
                  <img
                    src={item.img}
                    alt={item.name}
                    className={styles.cardImg}
                    loading="lazy"
                    draggable="false"
                  />
                )}
                <div className={styles.cardImageOverlay}></div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardName}>{item.name}</h3>
                <span className={styles.cardPrice}>{item.price}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.controls}>
          <button className={styles.btn} onClick={() => scrollCarousel(-1)} aria-label="Previous">←</button>
          <button className={styles.btn} onClick={() => scrollCarousel(1)} aria-label="Next">→</button>
        </div>
      </div>

      <div className={styles.cta}>
        <Link to="/menu" className="btn btn--red btn--large">
          EXPLORE OUR FULL MENU <span className="btn__arrow">→</span>
        </Link>
      </div>
    </section>
  )
}
