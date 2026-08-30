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
const drillIcon = (fill1, fill2) => `
  <svg viewBox="0 0 300 260" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="120" width="120" height="46" rx="10" fill="${fill1}"/>
    <rect x="60" y="70" width="46" height="60" rx="8" fill="${fill1}"/>
    <rect x="66" y="50" width="18" height="26" rx="4" fill="${fill2}"/>
    <path d="M150 138 L235 138 L235 150 L150 150 Z" fill="${fill1}"/>
    <path d="M225 118 L268 138 L225 158 Z" fill="${fill1}"/>
    <path d="M52 172 L120 172 L136 205 L36 205 Z" fill="#31363E"/>
    <rect x="20" y="205" width="130" height="12" rx="5" fill="#20242A"/>
  </svg>`;

const products = [
  { name:"Kit Taladro Percutor Brushless 1/2\" Pro", tag:"Más vendido", price:219900, old:599900,
    desc:"Motor brushless de alta durabilidad, mandril metálico de 1/2\" y batería de litio de larga duración. Ideal para uso profesional intensivo." },
  { name:"Kit Taladro Inalámbrico Mandril Metálico 1/2\"", tag:"Oferta", price:199900, old:399800,
    desc:"Potencia y precisión para taladrar y atornillar en madera, metal y mampostería, con maletín y accesorios incluidos." },
  { name:"Kit Taladro Digital 3/8\" Alto Torque", tag:"Oferta", price:199900, old:399800,
    desc:"Pantalla digital de control, mandril metálico de 3/8\" y múltiples velocidades para trabajos de precisión." },
  { name:"Kit Taladro + 35 Accesorios", tag:"Combo", price:189900, old:429900,
    desc:"El taladro y todos los accesorios que necesitas para empezar: brocas, puntas y adaptadores en un solo kit." },
  { name:"Kit Taladro Compacto 3/8\" Amarillo Edition", tag:"Oferta", price:169900, old:319800,
    desc:"Diseño compacto y liviano, perfecto para el hogar y proyectos de bricolaje cotidianos." },
  { name:"Kit Taladro Eco 3/8\" Azul", tag:"Económico", price:159900, old:319800,
    desc:"La opción ideal para iniciar: buen desempeño, batería recargable y garantía incluida." },
  { name:"Kit Taladro 28 Piezas Mandril 3/8\"", tag:"Oferta", price:119900, old:349900,
    desc:"Kit completo con 28 piezas, mandril de 3/8\" y estuche de transporte resistente." },
  { name:"Combo Taladro + Atornillador Doble Batería", tag:"Combo Pro", price:249900, old:649900,
    desc:"Dos herramientas, dos baterías: taladro percutor y atornillador de impacto para no parar de trabajar." },
];

const fmt = (n) => "$ " + n.toLocaleString("es-CO");
const grid = document.getElementById('productGrid');
const colors = [["#FF6A13","#FFC199"],["#31363E","#FF6A13"],["#FF6A13","#20242A"],["#E24E00","#FFC199"]];

if (grid) {
  products.forEach((p, i) => {
    const [c1,c2] = colors[i % colors.length];
    const card = document.createElement('div');
    card.className = 'product-card reveal';
    card.innerHTML = `
      <div class="product-media" data-idx="${i}">
        <span class="badge">${p.tag}</span>
        ${drillIcon(c1,c2)}
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
          <a class="btn btn-whatsapp" target="_blank" href="https://wa.me/573243998485?text=${encodeURIComponent('Hola, quiero comprar: ' + p.name)}"><i class="fa-brands fa-whatsapp"></i></a>
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
  const [c1,c2] = colors[idx % colors.length];
  modalMedia.innerHTML = drillIcon(c1,c2);
  modalInfo.innerHTML = `
    <span class="badge-inline">${p.tag}</span>
    <h3>${p.name}</h3>
    <div class="price-row">
      <span class="price-old">${fmt(p.old)}</span>
      <span class="price-new">${fmt(p.price)}</span>
    </div>
    <p class="desc">${p.desc}</p>
    <a class="btn btn-whatsapp" target="_blank" href="https://wa.me/573243998485?text=${encodeURIComponent('Hola, quiero comprar: ' + p.name)}"><i class="fa-brands fa-whatsapp"></i> Comprar por WhatsApp</a>
    <a class="btn btn-ghost" style="margin-top:8px;" href="https://wa.me/573243998485?text=${encodeURIComponent('Hola, quiero asesoría sobre: ' + p.name)}" target="_blank">Pedir asesoría</a>
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
