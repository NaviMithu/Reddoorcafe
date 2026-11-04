import styles from './ReviewsSection.module.css'

const REVIEWS = [
  {
    initials: 'TL',
    name: 'The local millionaire',
    time: '4 months ago',
    text: '"The ambience was good with low lighting. The food was fine. We had ramen, fully loaded chicken platter, veg momos, and veg platter. While the ramen was okay, the lotus Bischoff milkshake was top-notch. They have many games like Uno, tumbling tower, and hand soccer for the entertainment."',
  },
  {
    initials: 'VK',
    name: 'Vignesh Kaliappan',
    time: '8 months ago',
    text: '"Tried this Cafe based on a recommendation from my friend and he didn\'t disappoint! Service was very good and the availability of card games was a nice touch in the overall experience. The menu is pocket friendly to average priced I feel. Ideal spot for date nights and friends hangouts 🩷"',
  },
  {
    initials: 'JR',
    name: 'Jebastine Rubasingh',
    time: 'A year ago',
    text: '"This is a dark themed café in race course. Good place to celebrate special occasions. They have a separate room for celebrations. The food is good. Staff are polite. They have variety of milkshakes and good light settings and ambience."',
  },
  {
    initials: 'SA',
    name: 'Stefan A L',
    time: '1 month ago',
    text: '"Red Door Cafe in Coimbatore is known for its cozy ambiance and diverse menu. It\'s a great spot for both casual dining and special occasions. Customers often praise the quality of the food and the friendly service."',
  },
]

export default function ReviewsSection() {
  return (
    <section className={styles.section} id="reviews">
      <div className={styles.header}>
        <span className="section-label">CUSTOMER LOVE</span>
        <h2 className={styles.title}>Loved by Hundreds. Rated on Google.</h2>
        <div className={styles.ratingBar}>
          <span className={styles.stars}>★★★★★</span>
          <span className={styles.score}>4.7 / 5</span>
          <span className={styles.total}>(1,248+ Reviews)</span>
        </div>
      </div>

      <div className={styles.grid}>
        {REVIEWS.map((r, i) => (
          <div className={styles.card} key={i}>
            <div className={styles.cardHeader}>
              <div className={styles.avatar}>{r.initials}</div>
              <div className={styles.user}>
                <div className={styles.name}>{r.name}</div>
                <div className={styles.time}>{r.time}</div>
              </div>
              <div className={styles.googleLogo}>G</div>
            </div>
            <div className={styles.cardStars}>★★★★★</div>
            <p className={styles.cardText}>{r.text}</p>
          </div>
        ))}
      </div>

      <div className={styles.cta}>
        <a
          href="https://www.google.com/maps/place/Red+Door+Cafe/@11.0168,76.9558,17z"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--red"
        >
          READ MORE GOOGLE REVIEWS <span className="btn__arrow">→</span>
        </a>
      </div>
    </section>
  )
}
