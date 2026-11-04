import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import styles from './MenuSection.module.css'

const MENU_ITEMS = [
  {
    name: 'Alfredo Pasta',
    price: '₹235',
    img: '/images/Alfredo_Pasta.png',
    bg: 'radial-gradient(circle at 50% 40%, rgba(240,100,40,0.35) 0%, transparent 70%), #150602',
  },
  {
    name: 'Long Island Iced Tea',
    price: '₹250',
    img: '/images/Long_Island_Iced_Tea.jpeg',
    bg: 'radial-gradient(circle at 50% 50%, rgba(240,190,80,0.3) 0%, transparent 70%), #120900',
  },
  {
    name: 'Ring Road BBQ',
    price: '₹249',
    img: '/images/Ring_ Road_BBQ.jpeg',
    bg: 'radial-gradient(circle at 50% 50%, rgba(255,120,40,0.35) 0%, transparent 70%), #1c0a01',
  },
  {
    name: 'Fish Fingers',
    price: '₹199',
    img: '/images/Fish_Fingers.jpeg',
    bg: 'radial-gradient(circle at 50% 40%, rgba(240,190,40,0.3) 0%, transparent 70%), #130a01',
  },
  {
    name: 'Lychee Boba',
    price: '₹179',
    img: '/images/Lychee_Boba.png',
    bg: 'radial-gradient(circle at 50% 40%, rgba(60,190,100,0.28) 0%, transparent 70%), #040e06',
  },
  {
    name: 'Chicken Club Sandwich',
    price: '₹229',
    img: '/images/Chicken_Club_Sandwich.png',
    bg: 'radial-gradient(circle at 50% 40%, rgba(220,160,60,0.3) 0%, transparent 70%), #130a01',
  },
]

const N          = MENU_ITEMS.length
const SPREAD_DEG = 15        // degrees between adjacent cards
const PIVOT_Y    = 115       // transform-origin Y% — pivot below card bottom

export default function MenuSection() {
  const stageRef  = useRef(null)
  const cardRefs  = useRef([])
  const tweenRef  = useRef(null)
  const state     = useRef({
    offset:    0,          // continuous float: which item is centred
    dragging:  false,
    startX:    0,
    lastX:     0,
    lastT:     0,
    velocity:  0,          // cards/ms
  })

  // ── Position every card based on a continuous offset ─────────────────
  const positionCards = (offset) => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return

      // Shortest-path wrap so each card always takes the nearest slot
      let pos = i - offset
      pos = pos - Math.round(pos / N) * N      // range [-N/2 … N/2]

      const angle      = pos * SPREAD_DEG
      const absPos     = Math.abs(pos)
      const scale      = Math.max(0.60, 1 - absPos * 0.055)
      const brightness = Math.max(0.35, 1 - absPos * 0.18)
      const zIndex     = Math.max(1, 60 - Math.round(absPos * 10))

      gsap.set(card, {
        rotation:        angle,
        scale,
        zIndex,
        filter:          `brightness(${brightness})`,
        transformOrigin: `50% ${PIVOT_Y}%`,
        // lift the centre card slightly
        y:               absPos < 0.5 ? -18 : 0,
      })
    })
  }

  // ── Snap to nearest integer offset ───────────────────────────────────
  const snapToNearest = () => {
    const target = Math.round(state.current.offset)
    if (tweenRef.current) tweenRef.current.kill()
    tweenRef.current = gsap.to(state.current, {
      offset:   target,
      duration: 0.65,
      ease:     'power3.out',
      onUpdate: () => positionCards(state.current.offset),
    })
  }

  useEffect(() => {
    // Initial layout
    positionCards(state.current.offset)

    const stage = stageRef.current
    if (!stage) return

    // ── Pointer (mouse + touch) drag ────────────────────────────────
    const onPointerDown = (e) => {
      if (tweenRef.current) tweenRef.current.kill()
      state.current.dragging = true
      state.current.startX   = e.clientX
      state.current.lastX    = e.clientX
      state.current.lastT    = performance.now()
      state.current.velocity = 0
      stage.setPointerCapture(e.pointerId)
      stage.style.cursor = 'grabbing'
    }

    const onPointerMove = (e) => {
      if (!state.current.dragging) return
      const now = performance.now()
      const dx  = e.clientX - state.current.lastX
      const dt  = Math.max(1, now - state.current.lastT)

      // 65 px of drag = 1 card position
      state.current.offset  -= dx / 65
      state.current.velocity = -(dx / dt)        // px/ms
      state.current.lastX    = e.clientX
      state.current.lastT    = now

      positionCards(state.current.offset)
    }

    const onPointerUp = () => {
      if (!state.current.dragging) return
      state.current.dragging = false
      stage.style.cursor = 'grab'

      // Convert px/ms velocity → card positions, clamped to ±3
      const flick = state.current.velocity * 10 / 65
      const clamped = Math.sign(flick) * Math.min(Math.abs(flick), 3)
      state.current.offset += clamped

      snapToNearest()
    }

    stage.addEventListener('pointerdown',  onPointerDown)
    stage.addEventListener('pointermove',  onPointerMove)
    stage.addEventListener('pointerup',    onPointerUp)
    stage.addEventListener('pointercancel',onPointerUp)

    // Prevent native scroll while dragging horizontally
    const onTouchStart = (e) => { if (e.touches.length === 1) e.preventDefault() }
    stage.addEventListener('touchstart', onTouchStart, { passive: false })

    return () => {
      stage.removeEventListener('pointerdown',   onPointerDown)
      stage.removeEventListener('pointermove',   onPointerMove)
      stage.removeEventListener('pointerup',     onPointerUp)
      stage.removeEventListener('pointercancel', onPointerUp)
      stage.removeEventListener('touchstart',    onTouchStart)
      if (tweenRef.current) tweenRef.current.kill()
    }
  }, [])

  return (
    <section className={styles.section} id="menu">

      {/* ── Header ── */}
      <div className={styles.header}>
        <span className={styles.label}>OUR MENU</span>
        <h2 className={styles.title}>A curated selection of our finest creations.</h2>
        <div className="section-divider" />
        <p className={styles.subtitle}>Experience the art of flavor.</p>
      </div>

      {/* ── Fan stage ── */}
      <div className={styles.fanWrap}>
        <div className={styles.stage} ref={stageRef}>
          {MENU_ITEMS.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className={styles.card}
            >
              {/* Photo */}
              <div className={styles.cardImage} style={{ background: item.bg }}>
                {item.img && (
                  <img
                    src={item.img}
                    alt={item.name}
                    className={styles.cardImg}
                    draggable="false"
                    loading="lazy"
                  />
                )}
                <div className={styles.cardImageOverlay} />
              </div>

              {/* Info */}
              <div className={styles.cardContent}>
                <h3 className={styles.cardName}>{item.name}</h3>
                <span className={styles.cardPrice}>{item.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Drag hint */}
        <p className={styles.dragHint}>
          <span>←</span>&nbsp; drag to explore &nbsp;<span>→</span>
        </p>
      </div>

      {/* ── CTA ── */}
      <div className={styles.cta}>
        <Link to="/menu" className="btn btn--red btn--large">
          EXPLORE OUR FULL MENU <span className="btn__arrow">→</span>
        </Link>
      </div>

    </section>
  )
}
