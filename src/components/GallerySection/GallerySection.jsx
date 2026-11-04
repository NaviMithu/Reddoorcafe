import styles from './GallerySection.module.css'

const CELLS = [
  { cls: 'large', tag: 'Atmosphere', caption: 'The Mahogany Bar & Warm Evenings' },
  { cls: 'tall',  tag: 'Artisan',    caption: 'Pour Over Rituals & Roast' },
  { cls: 'small', tag: 'Bakes',      caption: 'Daily Morning Pastries' },
  { cls: 'small', tag: 'Greens',     caption: 'Pesto Infusions & Fresh Herbs' },
  { cls: 'wide',  tag: 'Kitchen',    caption: 'Woodfired Oven Crusts & Flame' },
  { cls: 'medium',tag: 'Comfort',    caption: 'Quiet Corners for Reflection' },
]

export default function GallerySection() {
  return (
    <section className={styles.section} id="gallery">
      <div className={styles.header}>
        <span className="section-label">THE EXPERIENCE</span>
        <h2 className={styles.title}>Life Inside Red Door</h2>
        <div className="section-divider"></div>
      </div>

      <div className={styles.grid}>
        {CELLS.map((cell, i) => (
          <div key={i} className={`${styles.cell} ${styles[cell.cls]}`}>
            <div className={styles.caption}>
              <span className={styles.tag}>{cell.tag}</span>
              {cell.caption}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

