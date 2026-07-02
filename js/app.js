/* Fancy Baker — shared layout, cart, animations, page logic */
(function () {
  "use strict";

  const WHATSAPP = "https://wa.me/917428720768?text=" + encodeURIComponent("Hi Fancy Baker! I'd like to place an order.");
  const PAGE = document.body.dataset.page || "";
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ───────── Cart store (localStorage) ───────── */
  const Cart = {
    read() { try { return JSON.parse(localStorage.getItem("fb_cart")) || {}; } catch { return {}; } },
    write(c) { localStorage.setItem("fb_cart", JSON.stringify(c)); renderCartUI(); },
    add(id, qty = 1) {
      const c = Cart.read();
      c[id] = (c[id] || 0) + qty;
      Cart.write(c);
      const item = findItem(id);
      toast(`${item ? item.name : "Item"} added to cart`);
      popCartIcon();
    },
    setQty(id, qty) {
      const c = Cart.read();
      if (qty <= 0) delete c[id]; else c[id] = qty;
      Cart.write(c);
    },
    remove(id) { Cart.setQty(id, 0); },
    clear() { Cart.write({}); },
    count() { return Object.values(Cart.read()).reduce((a, b) => a + b, 0); },
    lines() {
      return Object.entries(Cart.read())
        .map(([id, qty]) => ({ item: findItem(id), qty }))
        .filter(l => l.item);
    },
    subtotal() { return Cart.lines().reduce((s, l) => s + l.item.price * l.qty, 0); },
  };
  window.FBCart = Cart;

  /* ───────── Layout: header / footer / floats ───────── */
  const NAV = [
    ["index.html", "Home"], ["menu.html", "Menu"], ["about.html", "About"],
    ["gallery.html", "Gallery"], ["blog.html", "Blog"], ["contact.html", "Contact"],
  ];

  function buildHeader() {
    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `
      <div class="header-inner">
        <a class="logo" href="index.html"><img src="images/bakery_logo.png" class="logo-badge" alt="Logo" style="width:28px;height:28px;object-fit:cover;vertical-align:middle;margin-right:8px;border-radius:50%;">Fancy Baker</a>
        <nav class="main-nav" aria-label="Main">
          ${NAV.map(([href, label]) => `<a href="${href}" ${PAGE === href.replace(".html", "") ? 'class="active"' : ""}>${label}</a>`).join("")}
        </nav>
        <div class="header-actions">
          <div class="search-box">
            <span class="search-ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></span>
            <input type="search" id="site-search" placeholder="Search bakes…" aria-label="Search menu">
            <div class="search-results" id="search-results"></div>
          </div>
          <button class="cart-btn" id="cart-btn" aria-label="Open cart"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg><span class="cart-count" id="cart-count">0</span></button>
          <a class="btn btn-primary btn-sm" href="menu.html" style="white-space:nowrap">Order Now</a>
          <button class="hamburger" id="hamburger" aria-label="Open menu"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button>
        </div>
      </div>`;
    document.body.prepend(header);

    const mnav = document.createElement("nav");
    mnav.className = "mobile-nav";
    mnav.id = "mobile-nav";
    mnav.setAttribute("aria-label", "Mobile");
    mnav.innerHTML = NAV.map(([href, label]) => `<a href="${href}" ${PAGE === href.replace(".html", "") ? 'class="active"' : ""}>${label}</a>`).join("") +
      `<a href="order.html">Cart & Checkout</a><a href="track.html">Track Order</a><a href="faq.html">FAQ</a>
       <a class="btn btn-primary" href="menu.html" style="margin-top:14px">Order Now</a>`;
    document.body.appendChild(mnav);

    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.id = "overlay";
    document.body.appendChild(overlay);

    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 8);
    }, { passive: true });

    const hb = document.getElementById("hamburger");
    hb.addEventListener("click", () => {
      const open = mnav.classList.toggle("open");
      overlay.classList.toggle("show", open);
      hb.textContent = open ? "✕" : "☰";
    });
    overlay.addEventListener("click", closeAllDrawers);
    mnav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeAllDrawers));
  }

  function closeAllDrawers() {
    document.getElementById("mobile-nav").classList.remove("open");
    document.getElementById("mini-cart").classList.remove("open");
    document.getElementById("overlay").classList.remove("show");
    document.getElementById("hamburger").textContent = "☰";
  }

  function buildMiniCart() {
    const el = document.createElement("aside");
    el.className = "mini-cart";
    el.id = "mini-cart";
    el.setAttribute("aria-label", "Shopping cart");
    el.innerHTML = `
      <div class="mini-cart-head"><h3>Your Basket</h3><button class="icon-btn" id="mini-cart-close" aria-label="Close cart">✕</button></div>
      <div class="mini-cart-body" id="mini-cart-body"></div>
      <div class="mini-cart-foot">
        <div class="summary-row total"><span>Subtotal</span><span id="mini-subtotal">₹0</span></div>
        <a class="btn btn-primary btn-block" href="order.html" style="margin-top:12px">Checkout →</a>
      </div>`;
    document.body.appendChild(el);
    document.getElementById("cart-btn").addEventListener("click", () => {
      el.classList.add("open");
      document.getElementById("overlay").classList.add("show");
    });
    document.getElementById("mini-cart-close").addEventListener("click", closeAllDrawers);
  }

  function tileBG(item) {
    return `background:linear-gradient(140deg, hsl(${item.hue},85%,88%), hsl(${item.hue},80%,72%))`;
  }

  function renderCartUI() {
    const count = Cart.count();
    const badge = document.getElementById("cart-count");
    if (badge) badge.textContent = count;
    const body = document.getElementById("mini-cart-body");
    if (body) {
      body.innerHTML = Cart.lines().length === 0
        ? `<p style="text-align:center;padding:40px 0;color:var(--brown-muted)">Your basket is empty.<br>Time to fix that!</p>`
        : Cart.lines().map(l => `
          <div class="mini-line">
            <div class="thumb" style="${tileBG(l.item)}; overflow:hidden;"><img src="${l.item.image}" alt="${l.item.name}" style="width:100%;height:100%;object-fit:cover;"></div>
            <div class="info"><h4>${l.item.name}</h4><small>${formatINR(l.item.price)} each</small></div>
            <div class="qty-ctrl">
              <button data-qty="${l.item.id}|-1" aria-label="Decrease">−</button><span>${l.qty}</span>
              <button data-qty="${l.item.id}|1" aria-label="Increase">+</button>
            </div>
          </div>`).join("");
    }
    const sub = document.getElementById("mini-subtotal");
    if (sub) sub.textContent = formatINR(Cart.subtotal());
    if (PAGE === "order") renderOrderPage();
  }

  function popCartIcon() {
    const btn = document.getElementById("cart-btn");
    if (!btn) return;
    btn.classList.remove("pop");
    void btn.offsetWidth;
    btn.classList.add("pop");
  }

  function buildFooter() {
    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="footer-cta">
        <h2>Craving something sweet?</h2>
        <p>Freshly baked happiness, delivered across Rohini in under 60 minutes.</p>
        <a class="btn btn-dark" href="menu.html">Browse the Menu</a>
      </div>
      <div class="container">
        <div class="footer-main">
          <div class="footer-brand">
            <a class="logo" href="index.html"><img src="images/bakery_logo.png" class="logo-badge" alt="Logo" style="width:28px;height:28px;object-fit:cover;vertical-align:middle;margin-right:8px;border-radius:50%;">Fancy Baker</a>
            <p>Handcrafted breads, cakes and pastries baked fresh every morning in Rohini, New Delhi — since 2015.</p>
            <div class="socials">
              <a href="#" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
              <a href="#" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
              <a href="#" aria-label="YouTube"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></a>
              <a href="#" aria-label="X"><svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/></svg></a>
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="menu.html">Full Menu</a></li><li><a href="about.html">About Us</a></li>
              <li><a href="gallery.html">Our Bakes</a></li><li><a href="blog.html">Blog & Recipes</a></li>
              <li><a href="track.html">Track Order</a></li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li><a href="contact.html">Contact Us</a></li><li><a href="faq.html">FAQ</a></li>
              <li><a href="terms.html">Terms & Conditions</a></li><li><a href="privacy.html">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4>Stay in the loop</h4>
            <p style="font-size:0.88rem;opacity:0.75">Get new bakes & offers in your inbox.</p>
            <form class="newsletter" id="newsletter-form">
              <input type="email" placeholder="Your email" required aria-label="Email for newsletter">
              <button class="btn btn-primary btn-sm" type="submit">Join</button>
            </form>
            <div class="pay-icons" style="display:flex; gap:8px; margin-top:18px; flex-wrap:wrap;">
              <span style="display:flex; align-items:center; gap:6px;"><span style="font-weight:700;font-size:16px;">₹</span> UPI</span>
              <span style="display:flex; align-items:center; gap:6px; padding:6px 14px;"><span style="font-family:sans-serif;font-style:italic;font-weight:900;font-size:16px;letter-spacing:-0.5px;color:var(--brown);">VISA</span></span>
              <span style="display:flex; align-items:center; gap:6px;"><svg viewBox="0 0 40 24" width="24" height="14"><circle cx="12" cy="12" r="12" fill="#eb001b"/><circle cx="28" cy="12" r="12" fill="#f79e1b" opacity=".8"/></svg> MASTERCARD</span>
              <span style="display:flex; align-items:center; gap:6px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> RUPAY</span>
              <span style="display:flex; align-items:center; gap:6px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path></svg> COD</span>
            </div>
            <p style="font-size:0.85rem;margin-top:18px;opacity:0.75">📍 Sector 7, Rohini, New Delhi 110085<br>📞 +91 7428 720 768 · ✉️ hello@fancybaker.in</p>
          </div>
        </div>
        <div class="footer-bottom">© ${new Date().getFullYear()} Fancy Baker. Baked with ❤️ in New Delhi. All rights reserved.</div>
      </div>`;
    document.body.appendChild(footer);
    document.getElementById("newsletter-form").addEventListener("submit", e => {
      e.preventDefault();
      toast("🎉 You're on the list! Sweet news coming soon.");
      e.target.reset();
    });
  }

  function buildFloats() {
    const stack = document.createElement("div");
    stack.className = "float-stack";
    stack.innerHTML = `
      <a class="fab fab-wa" href="${WHATSAPP}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
        </svg>
      </a>
      <button class="fab fab-top" id="fab-top" aria-label="Scroll to top"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg></button>`;
    document.body.appendChild(stack);
    const top = document.getElementById("fab-top");
    window.addEventListener("scroll", () => {
      top.classList.toggle("show", window.scrollY > 420);
    }, { passive: true });
    top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" }));
  }

  function buildPreloader() {
    if (sessionStorage.getItem("fb_loaded")) return;
    const pre = document.createElement("div");
    pre.className = "preloader";
    pre.innerHTML = `<div style="text-align:center"><div class="oven"><img src="favicon.png" style="width:40px;height:40px;"></div><p>Rolling the dough…</p></div>`;
    document.body.appendChild(pre);
    window.addEventListener("load", () => {
      setTimeout(() => {
        pre.classList.add("done");
        sessionStorage.setItem("fb_loaded", "1");
        setTimeout(() => pre.remove(), 600);
      }, REDUCED ? 100 : 700);
    });
  }

  /* ───────── Toast ───────── */
  let toastWrap;
  function toast(msg) {
    if (!toastWrap) {
      toastWrap = document.createElement("div");
      toastWrap.className = "toast-wrap";
      document.body.appendChild(toastWrap);
    }
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    toastWrap.appendChild(t);
    setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 400); }, 2600);
  }
  window.FBToast = toast;

  /* ───────── Search ───────── */
  function initSearch() {
    const input = document.getElementById("site-search");
    const results = document.getElementById("search-results");
    if (!input) return;
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) { results.classList.remove("open"); return; }
      const hits = MENU_ITEMS.filter(i =>
        i.name.toLowerCase().includes(q) || i.cat.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q)
      ).slice(0, 7);
      results.innerHTML = hits.length
        ? hits.map(i => `<a href="product.html?id=${i.id}"><span style="display:flex;align-items:center;gap:8px;"><img src="${i.image}" style="width:24px;height:24px;border-radius:4px;object-fit:cover;"> ${i.name}</span><b>${formatINR(i.price)}</b></a>`).join("")
        : `<a href="menu.html">No matches — browse full menu →</a>`;
      results.classList.add("open");
    });
    document.addEventListener("click", e => {
      if (!e.target.closest(".search-box")) results.classList.remove("open");
    });
  }

  /* ───────── Item card HTML (shared) ───────── */
  function cardHTML(item) {
    return `
      <article class="item-card reveal" data-cat="${item.cat}" data-price="${item.price}">
        <a class="item-img" href="product.html?id=${item.id}" style="${tileBG(item)}; overflow:hidden;">
          <img src="${item.image}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;">
          <span class="badge">${item.tag}</span>
          <span class="rating-chip">★ ${item.rating.toFixed(1)}</span>
        </a>
        <div class="item-body">
          <h3><a href="product.html?id=${item.id}">${item.name}</a></h3>
          <p class="desc">${item.desc}</p>
          <div class="item-foot">
            <span class="price">${formatINR(item.price)}</span>
            <button class="btn btn-primary btn-sm" data-add="${item.id}">Add to Cart</button>
          </div>
        </div>
      </article>`;
  }
  window.FBCardHTML = cardHTML;
  window.FBTileBG = tileBG;

  /* ───────── Page: menu ───────── */
  function initMenuPage() {
    const grid = document.getElementById("menu-grid");
    if (!grid) return;
    const filterBar = document.getElementById("filter-bar");
    const sortSel = document.getElementById("sort-select");
    let activeCat = new URLSearchParams(location.search).get("cat") || "All";

    filterBar.innerHTML = MENU_CATEGORIES.map(c =>
      `<button class="filter-chip ${c === activeCat ? "active" : ""}" data-cat="${c}">${c}</button>`).join("");

    function render() {
      let items = activeCat === "All" ? [...MENU_ITEMS] : MENU_ITEMS.filter(i => i.cat === activeCat);
      const sort = sortSel.value;
      if (sort === "price-asc") items.sort((a, b) => a.price - b.price);
      if (sort === "price-desc") items.sort((a, b) => b.price - a.price);
      if (sort === "rating") items.sort((a, b) => b.rating - a.rating);
      grid.innerHTML = items.map(cardHTML).join("");
      document.getElementById("menu-count").textContent = `${items.length} delicious ${items.length === 1 ? "item" : "items"}`;
      animateReveals(grid);
    }
    filterBar.addEventListener("click", e => {
      const chip = e.target.closest("[data-cat]");
      if (!chip) return;
      activeCat = chip.dataset.cat;
      filterBar.querySelectorAll(".filter-chip").forEach(c => c.classList.toggle("active", c === chip));
      render();
    });
    sortSel.addEventListener("change", render);
    render();
  }

  /* ───────── Page: product detail ───────── */
  function initProductPage() {
    const wrap = document.getElementById("product-wrap");
    if (!wrap) return;
    const id = new URLSearchParams(location.search).get("id");
    const item = findItem(id) || MENU_ITEMS[0];
    document.title = `${item.name} — Fancy Baker`;
    wrap.innerHTML = `
      <div class="split">
        <div class="visual reveal" style="${tileBG(item)}; overflow:hidden;"><img src="${item.image}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;"></div>
        <div class="reveal">
          <div class="breadcrumb"><a href="menu.html">Menu</a> / ${item.cat}</div>
          <h1 style="font-size:clamp(1.9rem,4vw,2.8rem)">${item.name}</h1>
          <p style="color:#b8860b;font-weight:700">★ ${item.rating.toFixed(1)} · <span class="badge" style="position:static">${item.tag}</span></p>
          <p style="color:var(--brown-soft);font-size:1.05rem">${item.desc}</p>
          <p class="price" style="font-size:2rem;margin:18px 0">${formatINR(item.price)}</p>
          <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap">
            <div class="qty-ctrl" style="transform:scale(1.25);transform-origin:left">
              <button id="pd-minus" aria-label="Decrease">−</button><span id="pd-qty">1</span><button id="pd-plus" aria-label="Increase">+</button>
            </div>
            <button class="btn btn-primary" id="pd-add">Add to Cart</button>
          </div>
          <ul style="margin-top:28px;padding-left:20px;color:var(--brown-soft);font-size:0.92rem;display:grid;gap:6px">
            <li>Baked fresh on the day of delivery</li>
            <li>Delivery across Rohini in under 60 minutes</li>
            <li>100% vegetarian kitchen · FSSAI certified</li>
          </ul>
        </div>
      </div>
      <div class="section-head" style="margin-top:80px"><span class="eyebrow">Pairs well with</span><h2>You may also love</h2></div>
      <div class="card-grid" id="related-grid"></div>`;
    let qty = 1;
    const qEl = document.getElementById("pd-qty");
    document.getElementById("pd-minus").addEventListener("click", () => { qty = Math.max(1, qty - 1); qEl.textContent = qty; });
    document.getElementById("pd-plus").addEventListener("click", () => { qty++; qEl.textContent = qty; });
    document.getElementById("pd-add").addEventListener("click", () => Cart.add(item.id, qty));
    const related = MENU_ITEMS.filter(i => i.cat === item.cat && i.id !== item.id).slice(0, 4);
    const pool = related.length ? related : MENU_ITEMS.filter(i => i.id !== item.id).slice(0, 4);
    document.getElementById("related-grid").innerHTML = pool.map(cardHTML).join("");
    animateReveals(wrap);
  }

  /* ───────── Page: order (cart + checkout) ───────── */
  function renderOrderPage() {
    const linesEl = document.getElementById("cart-lines");
    if (!linesEl) return;
    const lines = Cart.lines();
    if (lines.length === 0) {
      linesEl.innerHTML = `<div class="panel" style="text-align:center;padding:60px 30px">
        <div style="font-size:3.5rem;margin-bottom:12px;"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg></div><h3>Your basket is empty</h3>
        <p style="color:var(--brown-muted)">Let's find something delicious.</p>
        <a class="btn btn-primary" href="menu.html">Browse Menu</a></div>`;
    } else {
      linesEl.innerHTML = `<div class="panel">` + lines.map(l => `
        <div class="mini-line">
          <div class="thumb" style="${tileBG(l.item)}; overflow:hidden;"><img src="${l.item.image}" alt="" style="width:100%;height:100%;object-fit:cover;"></div>
          <div class="info"><h4>${l.item.name}</h4><small>${formatINR(l.item.price)} × ${l.qty} = <b>${formatINR(l.item.price * l.qty)}</b></small></div>
          <div class="qty-ctrl">
            <button data-qty="${l.item.id}|-1" aria-label="Decrease">−</button><span>${l.qty}</span>
            <button data-qty="${l.item.id}|1" aria-label="Increase">+</button>
          </div>
          <button class="icon-btn" data-remove="${l.item.id}" aria-label="Remove"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
        </div>`).join("") + `</div>`;
    }
    const sub = Cart.subtotal();
    const delivery = sub === 0 ? 0 : (sub >= 499 ? 0 : 49);
    const gst = Math.round(sub * 0.05);
    document.getElementById("sum-sub").textContent = formatINR(sub);
    document.getElementById("sum-del").textContent = delivery === 0 ? (sub >= 499 ? "FREE 🎉" : "₹0") : formatINR(delivery);
    document.getElementById("sum-gst").textContent = formatINR(gst);
    document.getElementById("sum-total").textContent = formatINR(sub + delivery + gst);
  }

  function initOrderPage() {
    if (PAGE !== "order") return;
    renderOrderPage();
    document.getElementById("checkout-form").addEventListener("submit", e => {
      e.preventDefault();
      if (Cart.count() === 0) { toast("🧺 Your basket is empty — add something first!"); return; }
      const orderId = "FB" + Math.random().toString(36).slice(2, 8).toUpperCase();
      localStorage.setItem("fb_last_order", JSON.stringify({ id: orderId, at: Date.now(), total: document.getElementById("sum-total").textContent }));
      Cart.clear();
      location.href = "track.html?order=" + orderId + "&placed=1";
    });
  }

  /* ───────── Page: track ───────── */
  function initTrackPage() {
    if (PAGE !== "track") return;
    const params = new URLSearchParams(location.search);
    const form = document.getElementById("track-form");
    const result = document.getElementById("track-result");
    function show(orderId) {
      const last = JSON.parse(localStorage.getItem("fb_last_order") || "null");
      const isReal = last && last.id === orderId;
      const mins = isReal ? Math.floor((Date.now() - last.at) / 60000) : 25;
      const stage = Math.min(3, Math.floor(mins / 15) + (params.get("placed") ? 1 : 1));
      const steps = [
        ["1", "Order confirmed", "We've received your order and sent it to the kitchen."],
        ["2", "Baking in progress", "Our bakers are working their magic."],
        ["3", "Packed & out for delivery", "Your box of happiness is on its way."],
        ["4", "Delivered", "Enjoy every bite! Don't forget to rate us."],
      ];
      result.innerHTML = `
        <div class="panel">
          <h3 style="margin-bottom:4px">Order <span style="color:#d99e00">#${orderId}</span></h3>
          ${isReal ? `<p style="color:var(--brown-muted)">Total: ${last.total}</p>` : `<p style="color:var(--brown-muted)">Estimated delivery: 45–60 minutes</p>`}
          <div class="track-steps">
            ${steps.map(([ico, h, p], i) => `
              <div class="track-step ${i <= stage ? "done" : ""}">
                <div class="dot">${i <= stage ? "✓" : ico}</div>
                <div><h4>${h}</h4><p>${p}</p></div>
              </div>`).join("")}
          </div>
        </div>`;
      result.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "center" });
    }
    form.addEventListener("submit", e => {
      e.preventDefault();
      const v = document.getElementById("track-input").value.trim().toUpperCase();
      if (v) show(v);
    });
    if (params.get("order")) {
      document.getElementById("track-input").value = params.get("order");
      if (params.get("placed")) toast("🎉 Order placed successfully!");
      show(params.get("order"));
    }
  }

  /* ───────── Page: home extras ───────── */
  function initHomePage() {
    if (PAGE !== "index") return;
    const featured = document.getElementById("featured-grid");
    if (featured) {
      const picks = MENU_ITEMS.filter(i => i.tag === "Bestseller").slice(0, 8);
      featured.innerHTML = picks.map(cardHTML).join("");
    }
    const cats = document.getElementById("cat-grid");
    if (cats) {
      const catMeta = {
        Breads: "cat_bread.png", Cakes: "cat_cake.png", Pastries: "cat_pastry.png", Cookies: "cat_cookie.png", Cupcakes: "cat_cake.png",
        Donuts: "cat_donut.png", Sandwiches: "cat_sandwich.png", Beverages: "cat_beverage.png"
      };
      cats.innerHTML = Object.entries(catMeta).map(([c, img]) => `
        <a class="feature-card reveal" href="menu.html?cat=${encodeURIComponent(c)}">
          <div class="ico" style="overflow:hidden;border-radius:50%;width:64px;height:64px;margin:0 auto 12px auto;"><img src="images/${img}" style="width:100%;height:100%;object-fit:cover;"></div><h3 style="font-size:1.05rem">${c}</h3>
          <p style="font-size:0.82rem;color:var(--brown-muted);margin:0">${MENU_ITEMS.filter(i => i.cat === c).length} items</p>
        </a>`).join("");
    }
    const track = document.getElementById("reviews-track");
    if (track && typeof REVIEWS !== "undefined") {
      const buildStar = (filled) => filled ? 
        `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>` : 
        `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
      
      const buildReviewCard = (r, dupe) => `
        <div class="testi-card${dupe ? " dupe" : ""}"${dupe ? ' aria-hidden="true"' : ""}>
          <div class="stars" aria-label="${r.stars} out of 5 stars">
            ${buildStar(r.stars >= 1)}${buildStar(r.stars >= 2)}${buildStar(r.stars >= 3)}${buildStar(r.stars >= 4)}${buildStar(r.stars >= 5)}
          </div>
          <p>${r.text}</p>
          <div class="who"><div class="avatar">${r.initial}</div><div><b>${r.name}</b><br><small style="color:var(--brown-muted)">${r.loc}</small></div></div>
        </div>
      `;
      // Second copy makes the drift loop seamless; it's hidden on touch/reduced-motion where the row becomes a swipe scroller.
      track.innerHTML = REVIEWS.map(r => buildReviewCard(r, false)).join("") + REVIEWS.map(r => buildReviewCard(r, true)).join("");
    }
    initHero3D();
    animateHeroText();
  }

  /* ───────── Contact / generic forms ───────── */
  function initForms() {
    const cf = document.getElementById("contact-form");
    if (cf) cf.addEventListener("submit", e => {
      e.preventDefault();
      toast("💌 Message sent! We'll reply within 24 hours.");
      cf.reset();
    });
  }

  /* ───────── Animations (GSAP) ───────── */
  function animateReveals(scope) {
    const els = (scope || document).querySelectorAll(".reveal");
    if (REDUCED || !window.gsap) { els.forEach(el => (el.style.opacity = 1)); return; }
    els.forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 36 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });
  }
  window.FBReveal = animateReveals;

  function animateHeroText() {
    const h1 = document.querySelector(".hero h1");
    if (!h1 || REDUCED || !window.gsap) return;
    // Split into word spans (keeps accent styling intact)
    h1.querySelectorAll(".split-words").forEach(node => {
      node.innerHTML = node.textContent.split(" ").map(w => `<span class="char" style="opacity:0">${w}</span>`).join(" ");
    });
    gsap.to(".hero h1 .char", { opacity: 1, y: 0, stagger: 0.06, duration: 0.7, ease: "power3.out", delay: 0.25, startAt: { y: 28 } });
    gsap.from(".hero p.lead, .hero-cta, .hero-stats", { opacity: 0, y: 24, duration: 0.8, stagger: 0.12, delay: 0.7, ease: "power3.out" });
  }

  /* ───────── Three.js flour particles hero ───────── */
  function initHero3D() {
    const canvas = document.getElementById("hero-canvas");
    if (!canvas || REDUCED || !window.THREE) return;
    try {
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 60);
      camera.position.z = 14;
      const N = 320;
      const pos = new Float32Array(N * 3);
      for (let i = 0; i < N * 3; i++) pos[i] = (Math.random() - 0.5) * 26;
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ color: 0xf4b400, size: 0.14, transparent: true, opacity: 0.55 });
      const points = new THREE.Points(geo, mat);
      scene.add(points);
      const mat2 = new THREE.PointsMaterial({ color: 0xffffff, size: 0.22, transparent: true, opacity: 0.8 });
      const points2 = new THREE.Points(geo.clone(), mat2);
      points2.rotation.z = 1.3;
      scene.add(points2);
      let mx = 0, my = 0;
      window.addEventListener("pointermove", e => {
        mx = (e.clientX / innerWidth - 0.5) * 0.6;
        my = (e.clientY / innerHeight - 0.5) * 0.6;
      }, { passive: true });
      function resize() {
        const w = canvas.clientWidth, h = canvas.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      resize();
      window.addEventListener("resize", resize);
      let raf;
      (function tick(t) {
        points.rotation.y = t * 0.00005 + mx * 0.4;
        points.rotation.x = my * 0.3;
        points2.rotation.y = -t * 0.00003 + mx * 0.25;
        points.position.y = Math.sin(t * 0.0004) * 0.4;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      })(0);
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) cancelAnimationFrame(raf);
        else raf = requestAnimationFrame(function tick(t) {
          points.rotation.y = t * 0.00005 + mx * 0.4;
          renderer.render(scene, camera);
          raf = requestAnimationFrame(tick);
        });
      });
    } catch (e) { /* 3D is progressive enhancement — page works without it */ }
  }

  /* ───────── Global click delegation ───────── */
  document.addEventListener("click", e => {
    const add = e.target.closest("[data-add]");
    if (add) { Cart.add(add.dataset.add); return; }
    const q = e.target.closest("[data-qty]");
    if (q) {
      const [id, delta] = q.dataset.qty.split("|");
      const cur = Cart.read()[id] || 0;
      Cart.setQty(id, cur + parseInt(delta, 10));
      return;
    }
    const rm = e.target.closest("[data-remove]");
    if (rm) { Cart.remove(rm.dataset.remove); toast("Removed from basket"); }
  });

  /* ───────── Boot ───────── */
  if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  buildPreloader();
  buildHeader();
  buildMiniCart();
  buildFooter();
  buildFloats();
  initSearch();
  renderCartUI();
  initHomePage();
  initMenuPage();
  initProductPage();
  initOrderPage();
  initTrackPage();
  initForms();
  animateReveals(document);
})();
