import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './MenuPage.module.css'

const MENU_DATA = {
  Starters: [
    { name: 'Spiced Bruschetta', desc: 'Charred sourdough, heirloom tomatoes, roasted garlic, smoked chilli oil', price: '₹210', veg: true },
    { name: 'Truffle Parmesan Fries', desc: 'Hand-cut fries, shaved parmesan, black truffle oil, rosemary salt', price: '₹240', veg: true },
    { name: 'Cheesy Jalapeño Bites', desc: 'Crispy coated jalapeños stuffed with cream cheese and mozzarella', price: '₹200', veg: true },
    { name: 'Mezze Hummus Platter', desc: 'Smooth chickpea hummus, warm pita, olives, cherry tomatoes, roasted bell peppers', price: '₹280', veg: true },
  ],
  'Main Course': [
    { name: 'Basil Pesto Penne', desc: 'Fresh basil pesto, parmesan snow, toasted pine nuts, cherry tomatoes', price: '₹290', veg: true },
    { name: 'Wild Mushroom Risotto', desc: 'Arborio rice, forest mushrooms, truffle oil, aged parmesan, fresh herbs', price: '₹340', veg: true },
    { name: 'Grilled Chicken Steak', desc: 'Herb-marinated chicken breast, garlic mash, seasonal greens, peppercorn jus', price: '₹390', veg: false },
    { name: 'Paneer Steak', desc: 'Marinated paneer, bell pepper medley, chimichurri, toasted focaccia', price: '₹310', veg: true },
  ],
  Burgers: [
    { name: 'Herang Burger', desc: 'Artisanal brioche bun, double grilled patty, melted cheddar, signature crimson relish', price: '₹340', veg: false, special: true },
    { name: 'Red Door Loaded Smash', desc: 'Double smashed beef patty, American cheese, pickled onion, special sauce', price: '₹360', veg: false },
    { name: 'Truffle Melt Brioche', desc: 'Single beef patty, truffle aioli, brie cheese, caramelised onion jam', price: '₹380', veg: false },
    { name: 'Crispy Panko Chicken', desc: 'Panko-breaded chicken, sriracha mayo, coleslaw, dill pickle', price: '₹310', veg: false },
  ],
  Sandwiches: [
    { name: 'Avocado Sourdough', desc: 'Smashed avocado, everything bagel seasoning, poached egg, pickled radish', price: '₹260', veg: true },
    { name: 'Smoked Chicken Toastie', desc: 'Slow-smoked chicken, melted gouda, sun-dried tomato, pesto on sourdough', price: '₹290', veg: false },
    { name: 'Triple Melt Truffle Grilled Cheese', desc: 'Cheddar, gruyère, mozzarella, truffle butter, sourdough', price: '₹240', veg: true },
  ],
  Pizza: [
    { name: 'Margherita con Bufala', desc: 'San Marzano tomato base, fresh buffalo mozzarella, basil oil, sea salt', price: '₹380', veg: true },
    { name: 'Rustic Tartufo & Funghi', desc: 'Truffle cream base, wild mushrooms, fontina, fresh thyme', price: '₹440', veg: true },
    { name: 'Spicy Pepperoni & Hot Honey', desc: 'Tomato base, premium pepperoni, chilli flakes, drizzled hot honey', price: '₹420', veg: false },
  ],
  Desserts: [
    { name: 'Death by Chocolate', desc: 'Decadent dark chocolate ganache, molten lava center, vanilla bean quenelle', price: '₹250', veg: true, special: true },
    { name: 'Classic Venetian Tiramisù', desc: 'Mascarpone cream, espresso-soaked ladyfingers, cocoa dusting', price: '₹230', veg: true },
    { name: 'Salted Caramel Basque Cheesecake', desc: 'Burnt Basque cheesecake, salted caramel drizzle, fleur de sel', price: '₹260', veg: true },
  ],
  Coffee: [
    { name: 'Signature Red Door Caramel', desc: 'Double espresso, oat milk, house salted caramel, topped with cream', price: '₹180', veg: true, special: true },
    { name: 'Single-Origin Espresso Doppio', desc: 'Double shot of our premium single-origin Ethiopian Yirgacheffe', price: '₹120', veg: true },
    { name: 'Cinnamon Honey Flat White', desc: 'Double ristretto, microfoam milk, cinnamon honey drizzle', price: '₹160', veg: true },
    { name: 'Cold Brew Tonic', desc: 'Slow-steeped cold brew, sparkling tonic water, orange zest, ice', price: '₹200', veg: true },
  ],
  Milkshakes: [
    { name: 'Red Velvet Crumble', desc: 'House-blend red velvet ice cream, whipped cream, velvet crumble', price: '₹260', veg: true, special: true },
    { name: 'Belgian Dark Chocolate Silk', desc: 'Belgian dark chocolate, premium vanilla ice cream, chocolate drizzle', price: '₹270', veg: true },
    { name: 'Salted Peanut Butter Pretzel', desc: 'Creamy peanut butter shake, pretzel crumble, caramel swirl', price: '₹280', veg: true },
  ],
  Beverages: [
    { name: 'Iced Lemon Tea', desc: 'Slow-steeped Darjeeling black tea, fresh Assam lemons, crushed wild mint', price: '₹180', veg: true },
    { name: 'Lime & Mint Mojito', desc: 'Fresh muddled Key lime, garden spearmint, pure cane sugar, sparkling soda', price: '₹190', veg: true },
    { name: 'Hibiscus Berry Cooler', desc: 'Hibiscus tea, mixed berries, honey, sparkling water, fresh mint', price: '₹200', veg: true },
  ],
}

const CATEGORIES = Object.keys(MENU_DATA)

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('Starters')

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <Link to="/" className={styles.backBtn}>← Back to Home</Link>
        <div className={styles.headerContent}>
          <span className={styles.label}>FULL MENU</span>
          <h1 className={styles.title}>Red Door Café Menu</h1>
          <p className={styles.subtitle}>Crafted with passion. Served with love.</p>
        </div>
      </header>

      {/* Category Filter Tabs */}
      <div className={styles.tabsWrapper}>
        <div className={styles.tabs}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.tab} ${activeCategory === cat ? styles.tabActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className={styles.content}>
        <div className={styles.categoryTitle}>{activeCategory}</div>
        <div className={styles.grid}>
          {MENU_DATA[activeCategory].map((item, i) => (
            <div key={i} className={`${styles.card} ${item.special ? styles.cardSpecial : ''}`}>
              <div className={styles.cardTop}>
                <div>
                  <div className={styles.badges}>
                    <span className={`${styles.badge} ${item.veg ? styles.badgeVeg : styles.badgeNonVeg}`}>
                      {item.veg ? '🟢 Veg' : '🔴 Non-Veg'}
                    </span>
                    {item.special && <span className={styles.badgeChef}>⭐ Chef's Special</span>}
                  </div>
                  <h3 className={styles.cardName}>{item.name}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </div>
                <span className={styles.cardPrice}>{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div className={styles.note}>
        <p>Prices are inclusive of all applicable taxes. For allergen information, please ask your server.</p>
        <p>📍 1st Sasha Building, 130, E Venkatasamy Rd, R.S. Puram, Coimbatore - 641002 &nbsp;|&nbsp; 📞 0422 293 3333</p>
      </div>
    </div>
  )
}

