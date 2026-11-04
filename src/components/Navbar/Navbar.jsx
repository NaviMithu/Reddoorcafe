import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

const navLinks = [
  { label: 'Home',      href: '#hero' },
  { label: 'Our Story', href: '#about-brand' },
  { label: 'Menu',      href: '#menu' },
  { label: 'Gallery',   href: '#gallery' },
  { label: 'Reviews',   href: '#reviews' },
  { label: 'Contact',   href: '#contact' },
]

// Section IDs in order — used for IntersectionObserver tracking
const SECTION_IDS = ['hero', 'about-brand', 'menu', 'gallery', 'reviews', 'contact']

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#hero')

  // ── Solid background after the pinned hero section ──────────────────
  useEffect(() => {
    const onScroll = () => {
      const solidAt = window.innerHeight * 1.8
      setScrolled(window.scrollY > solidAt)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Active link tracking via IntersectionObserver ───────────────────
  useEffect(() => {
    // Map to track which sections are currently visible and by how much
    const visibilityMap = {}

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibilityMap[entry.target.id] = entry.intersectionRatio
        })

        // Pick the section with the highest intersection ratio
        let bestId = null
        let bestRatio = 0
        SECTION_IDS.forEach((id) => {
          const ratio = visibilityMap[id] || 0
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        })

        if (bestId) setActiveLink(`#${bestId}`)
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '-80px 0px 0px 0px', // account for fixed navbar height
      }
    )

    // Observe all sections (they may render later, so retry briefly)
    const attach = () => {
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      })
    }

    attach()
    // Retry once after a short delay in case sections mount late
    const timer = setTimeout(attach, 500)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])

  // ── Lock body scroll when mobile menu is open ────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
  }, [mobileOpen])

  const handleNavClick = (href) => {
    setActiveLink(href)
    setMobileOpen(false)
    document.body.style.overflow = ''
    const id = href.replace('#', '')
    const target = document.getElementById(id)
    if (target) {
      const topPos = target.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top: topPos, behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} id="mainNav">
        {/* Logo */}
        <a href="#hero" className={styles.logo} onClick={() => handleNavClick('#hero')}>
          <span className={styles.logoText}>RED DOOR</span>
          <span className={styles.logoLine}></span>
          <span className={styles.logoSub}>CAFÉ</span>
        </a>

        {/* Desktop nav links */}
        <ul className={styles.links}>
          {navLinks.map(({ label, href }) => (
            <li key={href} className={activeLink === href ? styles.active : ''}>
              <a href={href} onClick={(e) => { e.preventDefault(); handleNavClick(href) }}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* "Explore Menu" — outlined red button */}
        <Link to="/menu" className={styles.cta}>EXPLORE MENU</Link>

        {/* Hamburger (mobile) */}
        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerActive : ''}`}
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle navigation menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile full-screen overlay */}
      <div className={`${styles.overlay} ${mobileOpen ? styles.overlayActive : ''}`}>
        <div className={styles.overlayLinks}>
          {navLinks.map(({ label, href }) => (
            <a key={href} href={href}
              onClick={(e) => { e.preventDefault(); handleNavClick(href) }}>
              {label}
            </a>
          ))}
        </div>
        <div className={styles.overlayCta}>
          <Link to="/menu" className="btn btn--red btn--large"
            onClick={() => setMobileOpen(false)}>
            Explore Full Menu
          </Link>
        </div>
      </div>
    </>
  )
}
