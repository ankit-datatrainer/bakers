/* Fancy Baker — Menu data. Single source of truth for all products. */
const MENU_ITEMS = [
  // ── Breads ──
  { id: "sourdough-classic", name: "Classic Sourdough Loaf", cat: "Breads", price: 249, rating: 4.8, tag: "Bestseller", image: "images/sourdough_classic.png", hue: 38, desc: "48-hour fermented artisan sourdough with a crackling crust and airy crumb." },
  { id: "multigrain-bread", name: "Honey Multigrain Bread", cat: "Breads", price: 199, rating: 4.6, tag: "Healthy", image: "images/multigrain_bread.png", hue: 32, desc: "Seven wholesome grains kissed with organic honey. Perfect for breakfast toast." },
  { id: "garlic-baguette", name: "Garlic Herb Baguette", cat: "Breads", price: 179, rating: 4.7, tag: "New", image: "images/garlic_baguette.png", hue: 42, desc: "Crusty French baguette brushed with roasted garlic butter and fresh herbs." },
  { id: "focaccia-rosemary", name: "Rosemary Focaccia", cat: "Breads", price: 229, rating: 4.5, tag: "Eggless", image: "images/focaccia_rosemary.png", hue: 45, desc: "Olive-oil rich Italian flatbread topped with rosemary and sea salt flakes." },
  { id: "milk-bread", name: "Japanese Milk Bread", cat: "Breads", price: 189, rating: 4.9, tag: "Bestseller", image: "images/milk_bread.png", hue: 48, desc: "Cloud-soft shokupan made with tangzhong for the fluffiest slice in Delhi." },
  // ── Cakes ──
  { id: "choco-truffle", name: "Belgian Chocolate Truffle Cake", cat: "Cakes", price: 899, rating: 4.9, tag: "Bestseller", image: "images/choco_truffle.png", hue: 25, desc: "Layers of dark Belgian ganache on moist chocolate sponge. Pure decadence." },
  { id: "red-velvet", name: "Red Velvet Cream Cheese Cake", cat: "Cakes", price: 849, rating: 4.8, tag: "Popular", image: "images/red_velvet.png", hue: 0, desc: "Velvety crimson sponge with silky cream-cheese frosting and white chocolate curls." },
  { id: "pineapple-cake", name: "Fresh Pineapple Cake", cat: "Cakes", price: 649, rating: 4.6, tag: "Eggless", image: "images/pineapple-cake.png", hue: 50, desc: "Classic eggless pineapple cake with fresh fruit and whipped cream clouds." },
  { id: "mango-mousse", name: "Alphonso Mango Mousse Cake", cat: "Cakes", price: 949, rating: 4.9, tag: "Seasonal", image: "images/mango-mousse.png", hue: 40, desc: "Airy mousse of Ratnagiri Alphonso mangoes on a vanilla génoise base." },
  { id: "black-forest", name: "Black Forest Gateau", cat: "Cakes", price: 749, rating: 4.7, tag: "Classic", image: "images/black-forest.png", hue: 350, desc: "Cherries, chocolate shavings and kirsch-scented cream — the timeless favourite." },
  { id: "butterscotch-cake", name: "Butterscotch Crunch Cake", cat: "Cakes", price: 699, rating: 4.6, tag: "Eggless", image: "images/butterscotch-cake.png", hue: 36, desc: "Caramel praline crunch folded through butterscotch cream on golden sponge." },
  // ── Pastries ──
  { id: "croissant-butter", name: "Pure Butter Croissant", cat: "Pastries", price: 129, rating: 4.8, tag: "Bestseller", image: "images/croissant-butter.png", hue: 40, desc: "27 flaky layers laminated with French butter. Baked fresh every morning." },
  { id: "pain-au-chocolat", name: "Pain au Chocolat", cat: "Pastries", price: 149, rating: 4.9, tag: "Popular", image: "images/pain-au-chocolat.png", hue: 28, desc: "Buttery croissant dough wrapped around two batons of dark chocolate." },
  { id: "danish-fruit", name: "Mixed Fruit Danish", cat: "Pastries", price: 139, rating: 4.5, tag: "New", image: "images/danish-fruit.png", hue: 15, desc: "Crisp Danish pastry crowned with custard and glazed seasonal fruits." },
  { id: "eclair-choco", name: "Chocolate Éclair", cat: "Pastries", price: 119, rating: 4.7, tag: "Classic", image: "images/eclair-choco.png", hue: 30, desc: "Choux pastry filled with vanilla crème pâtissière, dipped in dark chocolate." },
  // ── Cookies ──
  { id: "choco-chip-cookie", name: "Double Chocolate Chip Cookies", cat: "Cookies", price: 299, rating: 4.8, tag: "Bestseller", image: "images/choco-chip-cookie.png", hue: 30, desc: "Box of 6 chewy-centred cookies loaded with dark and milk chocolate chunks." },
  { id: "oatmeal-raisin", name: "Oatmeal Raisin Cookies", cat: "Cookies", price: 249, rating: 4.4, tag: "Healthy", image: "images/oatmeal-raisin.png", hue: 35, desc: "Box of 6 wholesome oat cookies with plump raisins and a hint of cinnamon." },
  { id: "butter-shortbread", name: "Scottish Butter Shortbread", cat: "Cookies", price: 279, rating: 4.6, tag: "Eggless", image: "images/butter-shortbread.png", hue: 45, desc: "Melt-in-mouth shortbread fingers made with pure white butter. Box of 8." },
  { id: "almond-biscotti", name: "Almond Biscotti", cat: "Cookies", price: 329, rating: 4.5, tag: "New", image: "images/almond-biscotti.png", hue: 38, desc: "Twice-baked Italian biscotti with roasted almonds — perfect with coffee." },
  // ── Cupcakes ──
  { id: "vanilla-cupcake", name: "Vanilla Bean Cupcake", cat: "Cupcakes", price: 99, rating: 4.6, tag: "Classic", image: "images/vanilla-cupcake.png", hue: 48, desc: "Madagascar vanilla sponge with swirled buttercream and gold sprinkles." },
  { id: "choco-cupcake", name: "Chocolate Fudge Cupcake", cat: "Cupcakes", price: 109, rating: 4.8, tag: "Bestseller", image: "images/choco-cupcake.png", hue: 25, desc: "Rich cocoa cupcake with a molten fudge core and chocolate buttercream." },
  { id: "red-velvet-cupcake", name: "Red Velvet Cupcake", cat: "Cupcakes", price: 119, rating: 4.7, tag: "Popular", image: "images/red-velvet-cupcake.png", hue: 355, desc: "Mini red velvet with cream-cheese frosting and a white chocolate heart." },
  // ── Donuts ──
  { id: "glazed-donut", name: "Classic Glazed Donut", cat: "Donuts", price: 79, rating: 4.5, tag: "Classic", image: "images/glazed-donut.png", hue: 42, desc: "Pillowy yeast donut dipped in shiny vanilla glaze. Simply iconic." },
  { id: "choco-donut", name: "Chocolate Sprinkle Donut", cat: "Donuts", price: 89, rating: 4.6, tag: "Popular", image: "images/choco-donut.png", hue: 28, desc: "Chocolate-glazed ring showered with rainbow sprinkles." },
  { id: "boston-cream", name: "Boston Cream Donut", cat: "Donuts", price: 109, rating: 4.8, tag: "Bestseller", image: "images/boston-cream.png", hue: 35, desc: "Filled with vanilla custard and topped with dark chocolate ganache." },
  { id: "cinnamon-sugar-donut", name: "Cinnamon Sugar Donut", cat: "Donuts", price: 85, rating: 4.4, tag: "Eggless", image: "images/cinnamon-sugar-donut.png", hue: 33, desc: "Warm cake donut rolled in fragrant cinnamon sugar." },
  // ── Sandwiches ──
  { id: "grilled-paneer", name: "Grilled Paneer Tikka Sandwich", cat: "Sandwiches", price: 189, rating: 4.7, tag: "Bestseller", image: "images/grilled-paneer.png", hue: 40, desc: "Smoky paneer tikka with mint chutney on toasted multigrain bread." },
  { id: "veg-club", name: "Triple-Decker Veg Club", cat: "Sandwiches", price: 219, rating: 4.5, tag: "Popular", image: "images/veg-club.png", hue: 90, desc: "Three layers of fresh veggies, cheese and herbed mayo on milk bread." },
  { id: "cheese-corn", name: "Cheese & Corn Melt", cat: "Sandwiches", price: 169, rating: 4.6, tag: "Kids' Fav", image: "images/cheese-corn.png", hue: 48, desc: "Golden sweet corn folded into molten mozzarella on sourdough." },
  { id: "mushroom-panini", name: "Mushroom Truffle Panini", cat: "Sandwiches", price: 249, rating: 4.8, tag: "New", image: "images/mushroom-panini.png", hue: 30, desc: "Sautéed mushrooms, truffle oil and provolone pressed in focaccia." },
  // ── Beverages ──
  { id: "cold-coffee", name: "Classic Cold Coffee", cat: "Beverages", price: 149, rating: 4.6, tag: "Popular", image: "images/cold-coffee.png", hue: 30, desc: "Slow-brewed coffee blended with vanilla ice cream and cocoa dust." },
  { id: "hot-chocolate", name: "Belgian Hot Chocolate", cat: "Beverages", price: 179, rating: 4.9, tag: "Bestseller", image: "images/hot-chocolate.png", hue: 25, desc: "Real melted Belgian couverture with steamed milk and marshmallows." },
  { id: "masala-chai", name: "Bakery Masala Chai", cat: "Beverages", price: 89, rating: 4.5, tag: "Classic", image: "images/masala-chai.png", hue: 35, desc: "Kadak chai brewed with our secret nine-spice masala blend." },
  { id: "fresh-lemonade", name: "Mint Fresh Lemonade", cat: "Beverages", price: 99, rating: 4.4, tag: "Refreshing", image: "images/fresh-lemonade.png", hue: 55, desc: "Hand-pressed lemons with crushed mint and a whisper of honey." },

];

const MENU_CATEGORIES = ["All", "Breads", "Cakes", "Pastries", "Cookies", "Cupcakes", "Donuts", "Sandwiches", "Beverages"];

function findItem(id) { return MENU_ITEMS.find(i => i.id === id); }
function formatINR(n) { return "₹" + n.toLocaleString("en-IN"); }

const REVIEWS = [
  { name: "Priya Sharma", loc: "Rohini Sector 9", initial: "PS", stars: 5, text: "The Belgian truffle cake for my daughter's birthday was the best cake we've ever had. Moist, rich, and it arrived perfectly packed." },
  { name: "Arjun Khanna", loc: "Pitampura", initial: "AK", stars: 5, text: "Their sourdough is honestly better than anything I had in Europe. I order two loaves every weekend without fail." },
  { name: "Neha Gupta", loc: "Rohini Sector 3", initial: "NG", stars: 5, text: "Ordered a custom theme cake with 2 days' notice — the team nailed the design and it tasted even better than it looked!" },
  { name: "Rahul Verma", loc: "Shalimar Bagh", initial: "RV", stars: 5, text: "The Japanese Milk Bread is so soft it practically melts in your mouth. Best bakery in North Delhi!" },
  { name: "Sneha Iyer", loc: "Ashok Vihar", initial: "SI", stars: 5, text: "Those Double Chocolate Chip Cookies are dangerous. I bought a box of 6 and finished them in one sitting." },
  { name: "Vikas Singh", loc: "Paschim Vihar", initial: "VS", stars: 4, text: "Great garlic baguette. Paired it with pasta and it was an absolute hit with the family." },
  { name: "Anjali Desai", loc: "Rohini Sector 13", initial: "AD", stars: 5, text: "I can't recommend the Red Velvet Cream Cheese Cake enough. The frosting is perfectly balanced, not overly sweet." },
  { name: "Rajat Kapoor", loc: "Model Town", initial: "RK", stars: 5, text: "Sunday mornings are incomplete without their Pure Butter Croissants. Flaky, buttery perfection." },
  { name: "Simran Kaur", loc: "Kohat Enclave", initial: "SK", stars: 5, text: "The Mango Mousse Cake was a revelation! So light and airy, and packed with real Alphonso flavor." },
  { name: "Karan Mehta", loc: "Rohini Sector 7", initial: "KM", stars: 5, text: "Walking past this bakery every morning is a test of willpower. Their Grilled Paneer Sandwich is my go-to breakfast." },
  { name: "Meera Reddy", loc: "Civil Lines", initial: "MR", stars: 5, text: "Ordered a dessert hamper for Diwali and the packaging was just as premium as the baked goods inside." },
  { name: "Amit Joshi", loc: "Prashant Vihar", initial: "AJ", stars: 5, text: "Finally, a place that makes authentic Italian Focaccia. The rosemary aroma is incredible." },
  { name: "Pooja Chawla", loc: "Rohini Sector 11", initial: "PC", stars: 5, text: "My kids absolutely love the Cheese & Corn Melt. It's a lifesaver for quick, delicious evening snacks." },
  { name: "Siddharth Jain", loc: "Kamla Nagar", initial: "SJ", stars: 4, text: "Their Cold Coffee is thick, creamy, and has just the right kick of caffeine. Highly recommended." },
  { name: "Divya Patel", loc: "Rohini Sector 8", initial: "DP", stars: 5, text: "The Pain au Chocolat reminds me of my time in Paris. Seriously, it's that good." },
  { name: "Gaurav Sharma", loc: "Mangolpuri", initial: "GS", stars: 5, text: "We ordered the Black Forest Gateau for our anniversary. Classic taste, totally fresh cherries." },
  { name: "Ritu Malhotra", loc: "Punjabi Bagh", initial: "RM", stars: 5, text: "I've tried every eggless cake on their menu, and the Pineapple Cake is an absolute standout." },
  { name: "Aditya Roy", loc: "Rohini Sector 15", initial: "AR", stars: 5, text: "The Boston Cream Donut is generously filled and always fresh. It's my guilty pleasure!" }
];
