/* =========================================================
   RGL3D · Catálogo Online — LÓGICA DE LA APP
   Usa rutas por hash: #/  y  #/producto/<indice>
   Así funciona con GitHub Pages sin configuración extra.
   ========================================================= */

(function () {
  "use strict";

  const viewHome = document.getElementById("view-home");
  const viewProduct = document.getElementById("view-product");
  const productGrid = document.getElementById("product-grid");
  const productDetail = document.getElementById("product-detail");
  const crumbCurrent = document.getElementById("crumb-current");
  const pagerCount = document.getElementById("pager-count");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");

  const fmtMoney = (n) =>
    "$" + Number(n).toLocaleString("es-MX") + " MXN";

  const ICONS = {
    camera:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="14" r="3.5"/></svg>',
    width:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12h18M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3"/></svg>',
    length:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="8" width="16" height="8" rx="1"/><path d="M4 5v3M20 5v3"/></svg>',
    height:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3"/></svg>'
  };

  function stockClass(stock) {
    if (stock === "Disponible") return "stock-ok";
    if (stock === "Agotado") return "stock-out";
    return "";
  }

  function imageBlock(src, captionLabel) {
    const inner = src
      ? `<img src="${src}" alt="${captionLabel}" loading="lazy">`
      : `<div class="img-placeholder">${ICONS.camera}</div>`;
    return `
      <figure>
        <div class="img-box">${inner}</div>
        <figcaption>${captionLabel}</figcaption>
      </figure>`;
  }

  /* ---------------- HOME / GRID ---------------- */

  function renderGrid() {
    productGrid.innerHTML = PRODUCTS.map((p, i) => {
      const thumb = p.images.principal
        ? `<img src="${p.images.principal}" alt="${p.name}">`
        : `<div class="img-placeholder">${ICONS.camera}</div>`;
      return `
        <a class="product-card" href="#/producto/${i}">
          <div class="card-thumb">${thumb}</div>
          <div class="card-body">
            <span class="card-category">${p.category}</span>
            <h3>${p.name}</h3>
            <div class="card-price-row">
              <span class="card-price">${fmtMoney(p.price)}</span>
              <span class="card-stock ${p.stock === "Agotado" ? "out" : ""}">${p.stock}</span>
            </div>
          </div>
        </a>`;
    }).join("");
  }

  /* ---------------- PRODUCT DETAIL ---------------- */

  function renderProduct(index) {
    const p = PRODUCTS[index];
    if (!p) {
      location.hash = "#/";
      return;
    }

    productDetail.innerHTML = `
      <h2 class="product-title">${p.name}</h2>
      <div class="detail-grid">

        <div class="detail-main-image">
          ${imageBlock(p.images.principal, "Vista Principal")}
        </div>

        <div class="detail-thumbs">
          ${imageBlock(p.images.frontal, "Vista Frontal")}
          ${imageBlock(p.images.lateral, "Vista Lateral")}
          ${imageBlock(p.images.trasera, "Vista Trasera")}
        </div>

        <aside class="detail-specs">
          <div class="spec-block">
            <h3>Especificaciones</h3>
            <p class="dim-label">Dimensiones volumétricas (mm)</p>
            <div class="dim-row">
              <div class="dim-item">${ICONS.width}<span class="dim-name">Ancho</span><span class="dim-value">${p.dimensions.ancho}mm</span></div>
              <div class="dim-item">${ICONS.length}<span class="dim-name">Largo</span><span class="dim-value">${p.dimensions.largo}mm</span></div>
              <div class="dim-item">${ICONS.height}<span class="dim-name">Alto</span><span class="dim-value">${p.dimensions.alto}mm</span></div>
            </div>
          </div>

          <div class="spec-block">
            <h3>Precios y opciones</h3>
            <div class="price-row">
              <span class="price-label">Costo por pieza<span class="price-sub">${p.priceUnit}</span></span>
              <span class="price-value">${fmtMoney(p.price)}</span>
            </div>
            <div class="price-row">
              <span class="price-label">Costo por mayoreo<span class="price-sub">${p.mayoreoMinimo}+ pzas</span></span>
              <span class="price-value">${fmtMoney(p.priceMayoreo)} / pza</span>
            </div>

            <ul class="meta-list">
              <li><span class="meta-key">Material</span><span class="meta-val">${p.material}</span></li>
              <li><span class="meta-key">Acabado</span><span class="meta-val">${p.acabado}</span></li>
              <li><span class="meta-key">Stock</span><span class="meta-val ${stockClass(p.stock)}">${p.stock}</span></li>
            </ul>

            <div class="qty-row">
              <label for="qty-input">Cantidad</label>
              <input type="number" id="qty-input" value="1" min="1">
            </div>

            <a class="quote-btn" id="quote-link" href="#">Solicitar cotización</a>
          </div>
        </aside>
      </div>
    `;

    // Build a mailto quote link using current quantity
    const qtyInput = document.getElementById("qty-input");
    const quoteLink = document.getElementById("quote-link");
    function updateQuoteLink() {
      const qty = Math.max(1, parseInt(qtyInput.value, 10) || 1);
      const subject = encodeURIComponent(`Cotización: ${p.name}`);
      const body = encodeURIComponent(
        `Hola RGL3D,\n\nMe interesa cotizar:\nProducto: ${p.name}\nCantidad: ${qty}\n\nGracias.`
      );
      quoteLink.href = `mailto:contacto@rgl3d.com?subject=${subject}&body=${body}`;
    }
    qtyInput.addEventListener("input", updateQuoteLink);
    updateQuoteLink();

    // Breadcrumb + pager state
    crumbCurrent.textContent = p.name;
    pagerCount.textContent = `${index + 1} / ${PRODUCTS.length}`;
    btnPrev.disabled = index <= 0;
    btnNext.disabled = index >= PRODUCTS.length - 1;

    btnPrev.onclick = () => {
      if (index > 0) location.hash = `#/producto/${index - 1}`;
    };
    btnNext.onclick = () => {
      if (index < PRODUCTS.length - 1) location.hash = `#/producto/${index + 1}`;
    };
  }

  /* ---------------- ROUTER ---------------- */

  function showView(view) {
    viewHome.hidden = view !== "home";
    viewProduct.hidden = view !== "product";
  }

  function router() {
    const hash = location.hash || "#/";
    const match = hash.match(/^#\/producto\/(\d+)/);

    if (match) {
      const index = parseInt(match[1], 10);
      showView("product");
      renderProduct(index);
    } else {
      showView("home");
    }
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  // Keyboard navigation (left/right arrows) while viewing a product
  document.addEventListener("keydown", (e) => {
    if (viewProduct.hidden) return;
    if (e.key === "ArrowRight" && !btnNext.disabled) btnNext.click();
    if (e.key === "ArrowLeft" && !btnPrev.disabled) btnPrev.click();
  });

  window.addEventListener("hashchange", router);
  window.addEventListener("DOMContentLoaded", () => {
    renderGrid();
    router();
  });
})();
