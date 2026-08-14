/* =========================================================
   RGL3D · Catálogo Online — DATOS DE PRODUCTOS
   ---------------------------------------------------------
   Para agregar un producto nuevo, copia un bloque { ... }
   completo, pégalo dentro del arreglo PRODUCTS y cambia
   los valores. El catálogo soporta cualquier cantidad de
   productos: cada uno se convierte automáticamente en una
   "hoja" navegable con los botones Anterior / Siguiente.

   images: deja "" (vacío) para mostrar un marcador de
   posición, o escribe la ruta de tu foto, por ejemplo:
   "images/dragon-principal.jpg"
   ========================================================= */

const PRODUCTS = [
  {
    id: "busto-dragon",
    category: "Bustos Miniatura",
    name: "Busto de Dragón Miniatura",
    images: {
      principal: "images/Manut-XXL.jpg",
      frontal: "",
      lateral: "",
      trasera: ""
    },
    dimensions: { ancho: 75, largo: 62, alto: 110 }, // mm
    price: 180,
    priceUnit: "Unitario",
    priceMayoreo: 150,
    mayoreoMinimo: 5,
    material: "Resina UV de Alta Detalle",
    acabado: "Gris Mate",
    stock: "Disponible" // "Disponible" | "Agotado" | "Por encargo"
  },
  {
    id: "busto-dinosaurio",
    category: "Bustos Miniatura",
    name: "Busto de Dinosaurio Miniatura",
    images: {
      principal: "",
      frontal: "",
      lateral: "",
      trasera: ""
    },
    dimensions: { ancho: 75, largo: 62, alto: 110 },
    price: 180,
    priceUnit: "Unitario",
    priceMayoreo: 150,
    mayoreoMinimo: 5,
    material: "Resina UV de Alta Detalle",
    acabado: "Gris Mate",
    stock: "Disponible"
  },
  {
    id: "figura-robot",
    category: "Figuras Coleccionables",
    name: "Figura de Robot Explorador",
    images: {
      principal: "",
      frontal: "",
      lateral: "",
      trasera: ""
    },
    dimensions: { ancho: 60, largo: 60, alto: 130 },
    price: 220,
    priceUnit: "Unitario",
    priceMayoreo: 190,
    mayoreoMinimo: 5,
    material: "PLA Premium",
    acabado: "Pintado a Mano",
    stock: "Por encargo"
  },
  {
    id: "maceta-geometrica",
    category: "Hogar y Decoración",
    name: "Maceta Geométrica Modular",
    images: {
      principal: "",
      frontal: "",
      lateral: "",
      trasera: ""
    },
    dimensions: { ancho: 90, largo: 90, alto: 85 },
    price: 140,
    priceUnit: "Unitario",
    priceMayoreo: 110,
    mayoreoMinimo: 8,
    material: "PETG Reciclado",
    acabado: "Mate Texturizado",
    stock: "Disponible"
  }
];
