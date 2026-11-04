import styles from './ContactSection.module.css'

const MAPS_URL =
  'https://www.google.com/maps/place/30C,+Race+Course+Rd,+Opp+Collector%27s+Bungalow,+Mamarath+Thottom+Ganapathy,+Race+Course,+Coimbatore,+Tamil+Nadu+641018'

export default function ContactSection() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        {/* ── Left: headline + buttons ── */}
        <div className={styles.left}>
          <span className="section-label">VISIT US</span>
          <h2 className={styles.heading}>Your Table<br />is Waiting.</h2>
          <p className={styles.text}>
            Drop in for a morning brew, an afternoon meeting over pour-overs, or an intimate
            candle-lit dinner. Walk-ins are always welcomed with a warm smile.
          </p>
          <div className={styles.buttons}>
            <a
              href="https://wa.me/919677932306"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--red"
            >
              WhatsApp Us
            </a>
            <a
              href="https://www.instagram.com/reddoorcafe_cbe"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
            >
              Instagram ↗
            </a>
          </div>
        </div>

        {/* ── Right: Map + info ── */}
        <div className={styles.right}>
          {/* Quick info strip */}
          <div className={styles.infoStrip}>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📍</span>
              <span>30C, Race Course Rd, Opp Collector's Bungalow, Race Course, Coimbatore – 641018</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📞</span>
              <a href="tel:+919677932306" className={styles.infoLink}>96779 32306</a>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>✉️</span>
              <a href="mailto:reddoorcbe@gmail.com" className={styles.infoLink}>reddoorcbe@gmail.com</a>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>🕙</span>
              <span>Every day: 10:00 AM – 10:00 PM</span>
            </div>
          </div>

          {/* Embedded map */}
          <div className={styles.mapWrapper}>
            <iframe
              title="Red Door Café Location"
              className={styles.mapFrame}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15665.546875922757!2d76.94897129453442!3d11.00958423935567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859bb9c2fd651%3A0xc656a4ef346a3d73!2sRed%20Door%20Cafe!5e0!3m2!1sen!2sin!4v1793791250876!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin'
              allowFullScreen
            />
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapOverlayBtn}
            >
              OPEN IN GOOGLE MAPS ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
