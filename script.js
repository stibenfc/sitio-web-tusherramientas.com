/* ---------- HEADER: siempre visible, efecto vidrio al bajar ---------- */
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

/* ---------- HAMBURGER (mobile) ---------- */
const hamburgerBtn = document.getElementById('hamburgerBtn');
if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', () => {
    const nav = document.querySelector('.main-nav');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    nav.style.position='absolute'; nav.style.top='68px'; nav.style.left='0'; nav.style.right='0';
    nav.style.flexDirection='column'; nav.style.background='rgba(255,255,255,0.95)';
    nav.style.padding='18px 24px'; nav.style.gap='16px'; nav.style.backdropFilter='blur(14px)';
  });
}

/* ---------- SCROLL REVEAL ---------- */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

/* ---------- PRODUCT DATA ---------- */
/* Precios de referencia (AJUSTAR a tus precios reales antes de publicar) */
const products = [
  { name:"Motosierra STIHL a Gasolina", slug:"motosierra", tag:"Más vendido", price:1850000, old:2300000,
    desc:"Motosierra profesional STIHL con espada y cadena de alto rendimiento, ideal para poda y tala de árboles medianos y grandes." },
  { name:"Combo Taladro Inalámbrico DeWalt", slug:"combo-taladro-inalambrico", tag:"Oferta", price:649900, old:899900,
    desc:"Taladro percutor DeWalt con maletín completo: 2 baterías, cargador, brocas, puntas, llaves y accesorios para trabajos de precisión." },
  { name:"Guadaña STIHL Profesional", slug:"guadana", tag:"Oferta", price:1450000, old:1750000,
    desc:"Guadaña (desbrozadora) a gasolina STIHL, ideal para el corte de maleza, pasto alto y jardines grandes con máxima resistencia." },
  { name:"Combo DeWalt XR Profesional", slug:"combo-dewalt-xr-profesional", tag:"Combo Pro", price:1890000, old:2390000,
    desc:"Kit profesional DeWalt XR: taladro + amoladora, 2 baterías de 5.0Ah, cargador, maletín y accesorios incluidos." },
  { name:"Rotomartillo DeWalt Inalámbrico", slug:"rotomartillo", tag:"Oferta", price:899900, old:1190000,
    desc:"Rotomartillo SDS DeWalt con batería y cargador de litio, potencia profesional para perforar concreto y mampostería." },
  { name:"Motosierra Corta Makita", slug:"motosierra-corta", tag:"Oferta", price:649900, old:850000,
    desc:"Mini motosierra inalámbrica Makita, compacta y liviana, perfecta para podas y cortes precisos en espacios reducidos." },
  { name:"Kit de Herramientas Mecánicas 40 Piezas", slug:"kit-mecanico-40-piezas", tag:"Combo", price:189900, old:259900,
    desc:"Kit completo con ratchet, dados y llaves combinadas de distintas medidas, en maletín resistente para taller o el hogar." },
];

const fmt = (n) => "$ " + n.toLocaleString("es-CO");
const grid = document.getElementById('productGrid');

if (grid) {
  products.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'product-card reveal';
    card.innerHTML = `
      <div class="product-media" data-idx="${i}">
        <span class="badge">${p.tag}</span>
        <img src="images/${p.slug}-thumb.jpg" alt="${p.name}" loading="lazy">
        <span class="zoom-hint"><i class="fa-solid fa-magnifying-glass-plus"></i></span>
      </div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <div class="price-row">
          <span class="price-old">${fmt(p.old)}</span>
          <span class="price-new">${fmt(p.price)}</span>
        </div>
        <div class="product-cta">
          <button class="btn btn-oscuro" data-idx="${i}" data-action="view">Ver más</button>
          <a class="btn btn-whatsapp" target="_blank" href="https://wa.me/573133245918?text=${encodeURIComponent('Hola, quiero comprar: ' + p.name)}"><i class="fa-brands fa-whatsapp"></i></a>
        </div>
      </div>`;
    grid.appendChild(card);
    io.observe(card);
  });
}

/* ---------- MODAL LOGIC ---------- */
const overlay = document.getElementById('modalOverlay');
const modalMedia = document.getElementById('modalMedia');
const modalInfo = document.getElementById('modalInfo');

function openModal(idx){
  const p = products[idx];
  modalMedia.innerHTML = `<img src="images/${p.slug}.jpg" alt="${p.name}">`;
  modalInfo.innerHTML = `
    <span class="badge-inline">${p.tag}</span>
    <h3>${p.name}</h3>
    <div class="price-row">
      <span class="price-old">${fmt(p.old)}</span>
      <span class="price-new">${fmt(p.price)}</span>
    </div>
    <p class="desc">${p.desc}</p>
    <a class="btn btn-whatsapp" target="_blank" href="https://wa.me/573133245918?text=${encodeURIComponent('Hola, quiero comprar: ' + p.name)}"><i class="fa-brands fa-whatsapp"></i> Comprar por WhatsApp</a>
    <a class="btn btn-ghost" style="margin-top:8px;" href="https://wa.me/573133245918?text=${encodeURIComponent('Hola, quiero asesoría sobre: ' + p.name)}" target="_blank">Pedir asesoría</a>
  `;
  overlay.classList.add('open');
}

if (grid && overlay) {
  grid.addEventListener('click', (e) => {
    const media = e.target.closest('.product-media');
    const viewBtn = e.target.closest('[data-action="view"]');
    if (media) openModal(Number(media.dataset.idx));
    else if (viewBtn) openModal(Number(viewBtn.dataset.idx));
  });
  document.getElementById('modalClose').addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('open'); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') overlay.classList.remove('open'); });
}
