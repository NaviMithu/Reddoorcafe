import styles from './GallerySection.module.css'

// 4 real images + 2 placeholder cells (keep the grid layout intact)
const CELLS = [
  {
    cls: 'large',
    tag: 'Garlic Delight',
    caption: 'Crispy Garlic Bread with Herb Butter',
    img: '/images/garlick.png',
  },
  {
    cls: 'tall',
    tag: 'Artisan Bao',
    caption: 'Steamed Bao Buns with Signature Fillings',
    img: '/images/Boa.png',
  },
  {
    cls: 'small',
    tag: 'Sweet Endings',
    caption: 'House-Baked Celebration Cakes',
    img: '/images/cake1.png',
  },
  {
    cls: 'small',
    tag: 'French Dip',
    caption: 'Classic French Dip with Au Jus',
    img: '/images/french_dip.png',
  },
  {
    cls: 'wide',
    tag: 'Kitchen',
    caption: 'Woodfired Oven Crusts & Flame',
    img: null,
  },
  {
    cls: 'medium',
    tag: 'Comfort',
    caption: 'Quiet Corners for Reflection',
    img: null,
  },
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
            {cell.img && (
              <img
                src={cell.img}
                alt={cell.caption}
                className={styles.cellImg}
                loading="lazy"
                draggable="false"
              />
            )}
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
