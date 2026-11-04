import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const quickLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Our Story', href: '#about-brand' },
  { label: 'Menu', to: '/menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        {/* Col 1: Brand */}
        <div className={styles.colBrand}>
          <div className={styles.logoTitle}>RED DOOR CAFÉ</div>
          <p className={styles.desc}>
            A space crafted for those who appreciate the finer pleasures of life. Good food. Great coffee. Unforgettable moments.
          </p>
          <div className={styles.socials}>
            <a href="https://www.instagram.com/" className={styles.social} aria-label="Instagram">IG</a>
            <a href="https://www.facebook.com/" className={styles.social} aria-label="Facebook">FB</a>
            <a href="https://twitter.com/" className={styles.social} aria-label="X">X</a>
            <a href="https://youtube.com/" className={styles.social} aria-label="YouTube">YT</a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>QUICK LINKS</h4>
          <ul className={styles.links}>
            {quickLinks.map((l) => (
              <li key={l.label}>
                {l.to
                  ? <Link to={l.to}>{l.label}</Link>
                  : <a href={l.href}>{l.label}</a>
                }
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Hours + Visit */}
        <div className={`${styles.col} ${styles.colSub}`}>
          <div className={styles.subCols}>
            {/* Opening hours */}
            <div>
              <h4 className={styles.colTitle}>OPENING HOURS</h4>
              <div className={styles.hoursList}>
                <div>Every day: 10:00 AM – 10:00 PM</div>
              </div>
              <div className={styles.hoursNote}>"We're open everyday!"</div>
            </div>

            {/* Visit us */}
            <div>
              <h4 className={styles.colTitle}>VISIT US</h4>
              <div className={styles.address}>
                30C, Race Course Rd, Opp Collector's Bungalow, Mamarath Thottom Ganapathy, Race Course, Coimbatore, Tamil Nadu 641018, India
              </div>
              <div className={styles.contactLine}><strong>Phone:</strong> 96779 32306</div>
              <div className={styles.contactLine}><strong>Email:</strong> reddoorcbe@gmail.com</div>
              <div className={styles.mapCard}>
                <span className={styles.mapLabel}>📍 Race Course, Coimbatore</span>
                <a
                  href="https://www.google.com/maps/place/30C,+Race+Course+Rd,+Opp+Collector%27s+Bungalow,+Mamarath+Thottom+Ganapathy,+Race+Course,+Coimbatore,+Tamil+Nadu+641018"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn--red ${styles.mapBtn}`}
                >
                  OPEN IN MAPS
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2024 Red Door Café. All Rights Reserved.</span>
        <div className={styles.legal}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms &amp; Conditions</a>
        </div>
      </div>
    </footer>
  )
}

