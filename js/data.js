/* Grace Bakers — Menu data. Single source of truth for all products.
   Categories: Cookies · Chocolates · Dry Cakes · Celebration Cakes · Brownies
   (The client will add / replace products here later — the whole site reads from this file.) */
const MENU_ITEMS = [
  // ── Cookies ──
  { id: "choco-chip-cookie", name: "Double Chocolate Chip Cookies", cat: "Cookies", price: 299, rating: 4.9, tag: "Bestseller", image: "images/choco-chip-cookie.png", hue: 30, desc: "Box of 6 chewy-centred cookies loaded with dark and milk chocolate chunks." },
  { id: "oatmeal-raisin", name: "Oatmeal Raisin Cookies", cat: "Cookies", price: 249, rating: 4.5, tag: "Wholesome", image: "images/oatmeal-raisin.png", hue: 35, desc: "Box of 6 hearty oat cookies with plump raisins and a hint of cinnamon." },
  { id: "butter-shortbread", name: "Melt-in-Mouth Butter Cookies", cat: "Cookies", price: 279, rating: 4.7, tag: "Eggless", image: "images/butter-shortbread.png", hue: 45, desc: "Buttery shortbread fingers that dissolve on the tongue. Box of 8." },
  { id: "almond-biscotti", name: "Almond Biscotti", cat: "Cookies", price: 329, rating: 4.6, tag: "New", image: "images/almond-biscotti.png", hue: 38, desc: "Twice-baked Italian biscotti with roasted almonds — perfect with coffee or tea." },
  { id: "red-velvet-cookie", name: "Red Velvet Cookies", cat: "Cookies", price: 319, rating: 4.8, tag: "Popular", image: "images/cat_cookie.png", hue: 355, desc: "Soft red velvet cookies studded with white chocolate chips. Box of 6." },

  // ── Chocolates ──
  { id: "assorted-truffles", name: "Assorted Chocolate Truffles", cat: "Chocolates", price: 499, rating: 4.9, tag: "Bestseller", image: "images/choco_truffle.png", hue: 25, desc: "A hand-rolled box of 9 truffles — dark, milk and hazelnut ganache centres." },
  { id: "hazelnut-pralines", name: "Hazelnut Pralines", cat: "Chocolates", price: 549, rating: 4.8, tag: "Premium", image: "images/eclair-choco.png", hue: 28, desc: "Roasted hazelnut praline filled in smooth Belgian couverture. Box of 8." },
  { id: "choco-dipped-berries", name: "Chocolate-Dipped Delights", cat: "Chocolates", price: 459, rating: 4.7, tag: "New", image: "images/boston-cream.png", hue: 20, desc: "Seasonal treats hand-dipped in glossy dark chocolate — a little box of joy." },
  { id: "dark-chocolate-bark", name: "Dark Chocolate Bark", cat: "Chocolates", price: 399, rating: 4.6, tag: "Vegan", image: "images/choco-donut.png", hue: 22, desc: "70% dark chocolate slab loaded with almonds, cranberries and sea salt." },
  { id: "hot-chocolate-jar", name: "Sipping Hot Chocolate Jar", cat: "Chocolates", price: 349, rating: 4.8, tag: "Gift", image: "images/hot-chocolate.png", hue: 25, desc: "Real melted couverture flakes in a jar — just add warm milk for café-style cocoa." },

  // ── Dry Cakes ──
  { id: "vanilla-pound-cake", name: "Classic Vanilla Pound Cake", cat: "Dry Cakes", price: 349, rating: 4.7, tag: "Classic", image: "images/vanilla-cupcake.png", hue: 48, desc: "Buttery Madagascar-vanilla tea cake — the everyday loaf that never disappoints." },
  { id: "marble-tea-cake", name: "Marble Tea Cake", cat: "Dry Cakes", price: 379, rating: 4.6, tag: "Popular", image: "images/butterscotch-cake.png", hue: 30, desc: "Swirls of vanilla and cocoa sponge in a soft, sliceable loaf." },
  { id: "almond-orange-loaf", name: "Almond & Orange Loaf", cat: "Dry Cakes", price: 419, rating: 4.8, tag: "Eggless", image: "images/milk_bread.png", hue: 40, desc: "Moist orange-scented cake topped with toasted almond flakes." },
  { id: "banana-walnut-cake", name: "Banana Walnut Cake", cat: "Dry Cakes", price: 389, rating: 4.7, tag: "Wholesome", image: "images/multigrain_bread.png", hue: 36, desc: "Ripe banana loaf folded with crunchy walnuts — a teatime favourite." },
  { id: "lemon-drizzle-loaf", name: "Lemon Drizzle Loaf", cat: "Dry Cakes", price: 369, rating: 4.6, tag: "New", image: "images/pineapple-cake.png", hue: 55, desc: "Zesty lemon sponge soaked in tangy citrus syrup and a sugar glaze." },

  // ── Celebration Cakes ──
  { id: "choco-truffle", name: "Belgian Chocolate Truffle Cake", cat: "Celebration Cakes", price: 899, rating: 4.9, tag: "Bestseller", image: "images/choco_truffle.png", hue: 25, desc: "Layers of dark Belgian ganache on moist chocolate sponge. Pure decadence — 500g." },
  { id: "red-velvet", name: "Red Velvet Cream Cheese Cake", cat: "Celebration Cakes", price: 849, rating: 4.8, tag: "Popular", image: "images/red_velvet.png", hue: 0, desc: "Velvety crimson sponge with silky cream-cheese frosting and white chocolate curls." },
  { id: "black-forest", name: "Black Forest Gateau", cat: "Celebration Cakes", price: 749, rating: 4.7, tag: "Classic", image: "images/black-forest.png", hue: 350, desc: "Cherries, chocolate shavings and fresh cream — the timeless celebration classic." },
  { id: "mango-mousse", name: "Alphonso Mango Mousse Cake", cat: "Celebration Cakes", price: 949, rating: 4.9, tag: "Seasonal", image: "images/mango-mousse.png", hue: 40, desc: "Airy mousse of Ratnagiri Alphonso mangoes on a soft vanilla génoise base." },
  { id: "pineapple-cake", name: "Fresh Pineapple Cake", cat: "Celebration Cakes", price: 649, rating: 4.6, tag: "Eggless", image: "images/pineapple-cake.png", hue: 50, desc: "Classic eggless pineapple cake with fresh fruit and whipped cream clouds." },
  { id: "custom-theme-cake", name: "Custom Theme Cake", cat: "Celebration Cakes", price: 1199, rating: 5.0, tag: "Made to Order", image: "images/hero_cake.png", hue: 45, desc: "Birthdays, weddings, anniversaries — share your dream and we'll bake it to life." },

  // ── Brownies ──
  { id: "classic-fudge-brownie", name: "Classic Fudge Brownie", cat: "Brownies", price: 259, rating: 4.9, tag: "Bestseller", image: "images/choco-cupcake.png", hue: 25, desc: "Dense, gooey-centred chocolate brownie with a crackly top. Box of 4." },
  { id: "walnut-brownie", name: "Walnut Brownie", cat: "Brownies", price: 289, rating: 4.8, tag: "Popular", image: "images/choco_truffle.png", hue: 28, desc: "Rich fudge brownie packed with toasted California walnuts. Box of 4." },
  { id: "salted-caramel-brownie", name: "Salted Caramel Brownie", cat: "Brownies", price: 319, rating: 4.9, tag: "New", image: "images/eclair-choco.png", hue: 30, desc: "Molten salted-caramel swirl through our signature fudge brownie. Box of 4." },
  { id: "nutella-brownie", name: "Nutella Stuffed Brownie", cat: "Brownies", price: 339, rating: 4.8, tag: "Kids' Fav", image: "images/boston-cream.png", hue: 24, desc: "Oozing hazelnut-chocolate centre in a decadent brownie. Box of 4." },
  { id: "brownie-gift-box", name: "Assorted Brownie Gift Box", cat: "Brownies", price: 599, rating: 4.9, tag: "Gift", image: "images/cat_cake.png", hue: 26, desc: "A curated box of 8 brownies across all our flavours — the perfect gift." },
];

const MENU_CATEGORIES = ["All", "Cookies", "Chocolates", "Dry Cakes", "Celebration Cakes", "Brownies"];

function findItem(id) { return MENU_ITEMS.find(i => i.id === id); }
function formatINR(n) { return "₹" + n.toLocaleString("en-IN"); }

const REVIEWS = [
  { name: "Priya Sharma", loc: "Rohini, Delhi", initial: "PS", stars: 5, text: "The Belgian truffle cake for my daughter's birthday was the best cake we've ever had. Moist, rich, and it arrived perfectly packed." },
  { name: "Arjun Khanna", loc: "Dwarka, Delhi", initial: "AK", stars: 5, text: "Grace Bakers' brownies are honestly addictive. I order a box every weekend without fail — always fresh, always gooey." },
  { name: "Neha Gupta", loc: "Saket, Delhi", initial: "NG", stars: 5, text: "Ordered a custom theme cake with 2 days' notice — the team nailed the design and it tasted even better than it looked!" },
  { name: "Rahul Verma", loc: "Lajpat Nagar, Delhi", initial: "RV", stars: 5, text: "Their chocolate truffles are pure luxury. Best gift box I've sent this festive season. Delivery was quick too." },
  { name: "Sneha Iyer", loc: "Vasant Kunj, Delhi", initial: "SI", stars: 5, text: "Those Double Chocolate Chip Cookies are dangerous. I bought a box of 6 and finished them in one sitting." },
  { name: "Vikas Singh", loc: "Janakpuri, Delhi", initial: "VS", stars: 4, text: "Great vanilla pound cake with my evening chai. Loved that it stayed soft for days. Family favourite now." },
  { name: "Anjali Desai", loc: "Preet Vihar, Delhi", initial: "AD", stars: 5, text: "I can't recommend the Red Velvet Cream Cheese Cake enough. The frosting is perfectly balanced, not overly sweet." },
  { name: "Rajat Kapoor", loc: "Karol Bagh, Delhi", initial: "RK", stars: 5, text: "Sunday teatime is incomplete without Grace Bakers' cookies. Everything is freshly baked and beautifully packed." },
  { name: "Simran Kaur", loc: "Punjabi Bagh, Delhi", initial: "SK", stars: 5, text: "The Mango Mousse Cake was a revelation! So light and airy, and packed with real Alphonso flavour." },
  { name: "Kavya Mehta", loc: "Mayur Vihar, Delhi", initial: "KM", stars: 5, text: "Ordered brownies for an office party and everyone kept asking where they were from. Grace Bakers it is, forever." },
  { name: "Meera Reddy", loc: "Greater Kailash, Delhi", initial: "MR", stars: 5, text: "Ordered a chocolate gift hamper for Diwali and the packaging was just as premium as the treats inside." },
  { name: "Amrita Joshi", loc: "Pitampura, Delhi", initial: "AJ", stars: 5, text: "The salted caramel brownie is unreal — molten centre and a crackly top. Delivered warm and on time." },
  { name: "Pooja Chawla", loc: "Rajouri Garden, Delhi", initial: "PC", stars: 5, text: "My kids absolutely love the Nutella stuffed brownies. It's my go-to for their little celebrations." },
  { name: "Shreya Jain", loc: "Model Town, Delhi", initial: "SJ", stars: 4, text: "Clean, hygienic, and premium quality. The lemon drizzle loaf is my new teatime obsession." },
  { name: "Divya Patel", loc: "Kalkaji, Delhi", initial: "DP", stars: 5, text: "The hazelnut pralines melt in your mouth. Ordered again within a week — that good." },
  { name: "Gaurav Sharma", loc: "Paschim Vihar, Delhi", initial: "GS", stars: 5, text: "We ordered the Black Forest cake for our anniversary. Classic taste, fresh cherries, delivered right on schedule." },
  { name: "Ritu Malhotra", loc: "Uttam Nagar, Delhi", initial: "RM", stars: 5, text: "I've tried every eggless cake on their menu, and the Pineapple Cake is an absolute standout." },
  { name: "Aditi Roy", loc: "Shalimar Bagh, Delhi", initial: "AR", stars: 5, text: "Fast delivery all across Delhi and the treats always arrive fresh. Grace Bakers never misses!" },
];
