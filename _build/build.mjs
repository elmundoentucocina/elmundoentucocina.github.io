// Generador del sitio estático. Uso:  node _build/build.mjs
// Escribe HTML plano en la raíz del proyecto (lo que GitHub Pages publica).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://elmundoentucocina.github.io";
const TAG = "jetc-web-21";
const EBOOK = `https://www.amazon.es/dp/B0HLT3C4NK?tag=${TAG}`;
const PAPER = `https://www.amazon.es/dp/B0HM1KHS7G?tag=${TAG}`;
const GOATCOUNTER_CODE = "elmundoentucocina"; // <- el código que elijas al registrarte en goatcounter.com
const PINTEREST_TOKEN = "bc99a5c1928c9041e7e2a8cfa60a0ecf"; // <- ver guía paso 6
const AFILIADO = "Como afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables.";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const AUTOR = "Rodrigo Domínguez Montero";
const pinPng = (slug) => `${SITE}/assets/pines/${slug}.png`;

// Imagen del pin + botón de guardar en Pinterest (sin JavaScript de terceros)
function pinFigure({ slug, path, alt, description }) {
  const save = `https://www.pinterest.es/pin/create/button/?url=${encodeURIComponent(SITE + path)}&media=${encodeURIComponent(pinPng(slug))}&description=${encodeURIComponent(description)}`;
  return `<figure class="pin">
    <img src="/assets/pines/${slug}.webp" width="600" height="900" alt="${esc(alt)}" fetchpriority="high">
    <figcaption><a class="btn btn-pin" href="${esc(save)}" target="_blank" rel="noopener">Guardar en Pinterest</a></figcaption>
  </figure>`;
}

function layout({ path, title, description, body, jsonld, type = "website", image }) {
  const url = `${SITE}${path}`;
  const t = esc(title);
  const d = esc(description);
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${t}</title>
<meta name="description" content="${d}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#8E1B22">
<meta name="p:domain_verify" content="${PINTEREST_TOKEN}">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="El mundo en tu cocina">
<meta property="og:title" content="${t}">
<meta property="og:description" content="${d}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="es_ES">
${image ? `<meta property="og:image" content="${image}">\n<meta property="og:image:width" content="1000">\n<meta property="og:image:height" content="1500">\n` : ""}
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&display=swap">
<link rel="stylesheet" href="/assets/style.css">
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>\n` : ""}</head>
<body>
<header class="site-header">
  <a class="brand" href="/">El mundo en tu cocina</a>
  <nav aria-label="Principal">
    <a href="/recetas/">Recetas</a>
    <a href="/guias/">Guías</a>
    <a href="/libro/">El libro</a>
  </nav>
</header>
<main>
${body}
</main>
<footer class="site-footer">
  <p class="afiliado">${AFILIADO}</p>
  <p>© ${new Date().getFullYear()} El mundo en tu cocina · <a href="/aviso-legal/">Aviso legal y privacidad</a></p>
</footer>
<script data-goatcounter="https://${GOATCOUNTER_CODE}.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
</body>
</html>
`;
}

const bookBox = (lead = "¿Quieres 30 recetas más como esta?") => `<aside class="book-box">
  <p class="eyebrow">Del libro</p>
  <h2>${lead}</h2>
  <p><strong>Japón en tu cocina</strong>: 30 recetas japonesas con alma española, hechas con lo que encuentras en cualquier supermercado. Sin viajes a tiendas especializadas ni listas imposibles.</p>
  <p class="btns">
    <a class="btn" href="${EBOOK}" rel="sponsored noopener" target="_blank">Ebook en Amazon</a>
    <a class="btn btn-alt" href="${PAPER}" rel="sponsored noopener" target="_blank">Tapa blanda en Amazon</a>
  </p>
  <p class="small">Enlaces de afiliado de Amazon: a ti te cuestan lo mismo.</p>
</aside>`;

const write = (path, html) => {
  const file = join(ROOT, path === "/" ? "index.html" : join(path, "index.html"));
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
};

// ---------- contenido ----------
const recetas = [
  {
    slug: "arroz-japones-con-arroz-espanol",
    kind: "recetas",
    title: "Arroz japonés con arroz español",
    h1: "Cómo hacer arroz japonés con arroz español",
    desc: "Arroz japonés sin arrocera y con el arroz redondo de siempre: 300 g de arroz, 360 ml de agua y 4 pasos. Con el aliño para sushi.",
    intro: "Sin arrocera y con el arroz redondo de siempre. No necesitas arroz de sushi importado: un arroz redondo español (tipo Albufera o Calasparra) queda pegajoso, brillante y con ese punto firme. Lo que importa es el método.",
    alt: "Pin: cómo hacer arroz japonés con arroz español. 300 g de arroz redondo y 360 ml de agua: lávalo, déjalo reposar 30 minutos, cuécelo tapado 12 minutos y reposa 10 minutos.",
    meta: { time: "PT1H", servings: "4", cookTime: "PT25M", prep: "PT35M" },
    ingredientes: [
      "300 g de arroz redondo (Albufera, Calasparra o el redondo de tu súper). <strong>No uses bomba</strong>",
      "360 ml de agua",
      "Para sushi: 45 ml de vinagre de arroz, 1 cucharada de azúcar y 1 cucharadita de sal",
    ],
    pasos: [
      "<strong>Lávalo</strong> frotándolo con las manos y cambiando el agua 3 o 4 veces, hasta que salga casi transparente. Escurre bien.",
      "<strong>Déjalo reposar 30 minutos</strong> en el cazo con los 360 ml de agua medida. Es lo que da una textura pareja.",
      "Pon el cazo tapado a fuego fuerte. Cuando hierva (lo oirás, no destapes), baja al mínimo y <strong>cuécelo tapado 12 minutos</strong>.",
      "<strong>Reposa 10 minutos más</strong> con el fuego apagado y la tapa puesta. Aquí termina de hacerse con el vapor.",
      "Airea con una espátula, cortando y levantando, sin aplastar los granos.",
      "<strong>Para sushi:</strong> calienta el vinagre con el azúcar y la sal hasta que se disuelvan, y mézclalo con el arroz aún tibio, en un bol ancho y sin amasar. Abanica unos minutos para que brille.",
    ],
    notas: [
      "<strong>Ojo: el arroz bomba no sirve.</strong> Absorbe demasiado y no se pega, justo lo contrario de lo que buscamos.",
      "Cada marca absorbe un poco distinto. Si te queda duro, la próxima vez sube a 380 ml de agua; si queda blando, baja a 340 ml.",
      "Usa un cazo con tapa que cierre bien. Una tapa que deja escapar vapor es la causa número uno de arroz seco.",
      "Si no tienes vinagre de arroz, vale vinagre de manzana suave con un pellizco más de azúcar.",
      "Se conserva 1 día en la nevera, pero mejor sírvelo el mismo día. Recaliéntalo con una cucharada de agua en el microondas.",
    ],
    siguiente: ["huevos-de-ramen-ajitama"],
  },
  {
    slug: "dashi-de-boletus",
    kind: "recetas",
    title: "Dashi de boletus",
    h1: "Dashi casero con boletus secos",
    desc: "El caldo base de la cocina japonesa, sin bonito seco ni alga kombu: 15 g de boletus secos, 1 litro de agua y 3 pasos.",
    intro: "Sin bonito seco ni alga kombu, y con sabor a bosque. El dashi es la base de la cocina japonesa: un caldo ligero y lleno de umami. El tradicional lleva katsuobushi (bonito seco) y kombu, difíciles de encontrar. Los boletus secos están en cualquier supermercado.",
    alt: "Pin: dashi casero con boletus secos. 15 g de boletus secos y 1 litro de agua templada: remojo de 20 minutos, hervir suave 10 minutos y colar.",
    meta: { time: "PT35M", servings: "4", cookTime: "PT15M", prep: "PT20M" },
    ingredientes: [
      "15 g de boletus secos",
      "1 litro de agua templada",
      "Sal, al final y solo si hace falta",
    ],
    pasos: [
      "<strong>Remojo de 20 minutos:</strong> pon los boletus en el agua templada.",
      "<strong>Llévalo a ebullición</strong> y deja hervir suave 10 minutos.",
      "<strong>Cuela el caldo</strong> con un colador fino (o un paño, si los boletus traen arenilla). Pica los boletus y aprovéchalos en la sopa.",
    ],
    notas: [
      "<strong>Por qué funciona:</strong> los boletus aportan el mismo umami que el dashi japonés. Perfecto para sopa de miso, fideos y guisos.",
      "Prueba antes de salar: el caldo se suele usar con miso o soja, que ya ponen la sal.",
      "<strong>Si un día encuentras kombu</strong> (herbolarios, tiendas bio), añade un trozo de 10 cm al remojo y retíralo antes de que hierva. Queda más redondo, pero no es imprescindible.",
      "Dura 3 días en la nevera o 3 meses congelado (en cubiteras, para usar por porciones).",
    ],
    siguiente: ["gyozas-crujientes"],
  },
  {
    slug: "gyozas-crujientes",
    kind: "recetas",
    title: "Gyozas crujientes",
    h1: "Cómo hacer gyozas crujientes por abajo",
    desc: "La técnica para gyozas crujientes por abajo y tiernas por arriba: plancha, vapor y plancha en la misma sartén. Con relleno de cerdo y repollo y salsa.",
    intro: "Plancha, vapor y plancha, en la misma sartén. El secreto de una buena gyoza está en la cocción: dorar, añadir agua y tapar para hacerlas al vapor, y destapar para que la base vuelva a quedar crujiente. Abajo tienes también un relleno clásico de cerdo y repollo.",
    alt: "Pin: cómo hacer gyozas crujientes por abajo. Dóralas 2 minutos, echa 100 ml de agua y tapa 4-5 minutos al vapor, y destapa 1 minuto más.",
    meta: { time: "PT1H", servings: "4 (unas 24 gyozas)", cookTime: "PT10M", prep: "PT50M" },
    ingredientes: [
      "24 obleas de gyoza (o de empanadilla pequeña del súper, o la masa casera de abajo)",
      "250 g de carne picada de cerdo",
      "150 g de repollo (o col china) picado muy fino, con 1/2 cucharadita de sal",
      "2 cebolletas picadas finas",
      "1 diente de ajo rallado",
      "1 cucharada de jengibre fresco rallado",
      "1 cucharada de salsa de soja",
      "1 cucharadita de aceite de sésamo",
      "1 cucharada de vino blanco seco o sake",
      "1 cucharadita de maicena y pimienta",
      "<strong>Masa casera (opcional):</strong> 200 g de harina de trigo, 100 ml de agua recién hervida y una pizca de sal",
      "<strong>Salsa:</strong> 3 cucharadas de salsa de soja, 1 cucharada de vinagre de arroz y unas gotas de aceite de sésamo",
    ],
    pasos: [
      "<strong>Masa casera:</strong> mezcla la harina con el agua caliente y la sal, amasa 5 minutos y deja reposar tapada 30 minutos. Estira fina y corta discos de 8 cm.",
      "Mezcla el repollo con la sal, deja 10 minutos y <strong>escúrrelo apretando</strong> con las manos. Este paso evita que el relleno suelte agua y rompa la masa.",
      "Mezcla el repollo con el resto del relleno y amasa con la mano hasta que la carne quede pegajosa.",
      "Pon una cucharadita colmada en cada oblea, humedece el borde, dobla y <strong>pliega</strong> en 5-7 pliegues cerrando bien.",
      "<strong>Dóralas 2 minutos</strong> en una sartén con tapa y un poco de aceite, a fuego medio-alto, apoyadas en su base y muy juntas.",
      "<strong>Echa 100 ml de agua y tapa enseguida</strong> (cuidado, salpica). Déjalas 4-5 minutos al vapor, hasta que el agua se evapore.",
      "<strong>Destapa y deja 1 minuto más</strong> para que la base vuelva a quedar crujiente.",
      "Sirve con la salsa mezclada.",
    ],
    notas: [
      "<strong>¿No encuentras obleas de gyoza?</strong> Las de empanadillas pequeñas del súper sirven.",
      "<strong>¿Te sobran?</strong> Congélalas crudas en una bandeja, sin que se toquen, y luego pásalas a una bolsa. Cocínalas sin descongelar, con 1 minuto más de vapor.",
      "<strong>Truco de la «ala» crujiente:</strong> disuelve 1 cucharadita de harina en los 100 ml de agua. Al evaporarse queda una lámina crujiente que une todas las gyozas.",
      "Si el relleno te parece seco, añade una cucharada de agua o de caldo (por ejemplo, <a href=\"/recetas/dashi-de-boletus/\">dashi de boletus</a>).",
    ],
    siguiente: ["huevos-de-ramen-ajitama"],
  },
  {
    slug: "huevos-de-ramen-ajitama",
    kind: "recetas",
    title: "Huevos de ramen (ajitama)",
    h1: "Cómo hacer huevos de ramen en casa",
    desc: "Huevos de ramen (ajitama) con yema melosa y marinado de soja y Pedro Ximénez: tiempo exacto de cocción y de marinado.",
    intro: "Yema melosa y marinado de soja y Pedro Ximénez. Los ajitama son los huevos que coronan el ramen. Aquí el Pedro Ximénez hace el papel del mirin, y también están buenísimos con arroz, en ensaladas o solos como aperitivo.",
    alt: "Pin: cómo hacer huevos de ramen en casa. 4 huevos, 100 ml de salsa de soja, 100 ml de agua y 2 cucharadas de Pedro Ximénez: cuécelos 6 minutos y medio, agua con hielo, marínalos de 4 horas a una noche.",
    meta: { time: "PT4H20M", servings: "4", cookTime: "PT7M", prep: "PT15M" },
    ingredientes: [
      "4 huevos, sacados de la nevera",
      "100 ml de salsa de soja",
      "100 ml de agua",
      "2 cucharadas de Pedro Ximénez",
      "Hielo y agua fría",
    ],
    pasos: [
      "Mezcla en un recipiente la soja, el agua y el Pedro Ximénez. Esa es la marinada.",
      "<strong>Cuécelos 6 minutos y medio</strong> en agua ya hirviendo. Bájalos con una cuchara, fríos, directos de la nevera.",
      "<strong>Pásalos a agua con hielo</strong> 10 minutos y pélalos con cuidado, mejor bajo un hilo de agua.",
      "<strong>Marínalos</strong> en la nevera, de 4 horas a una noche. Mejor en una bolsa con cierre y sin aire, para que queden cubiertos.",
      "<strong>Córtalos justo antes de servir</strong> con un hilo o un cuchillo mojado.",
    ],
    notas: [
      "<strong>El Pedro Ximénez hace el papel del mirin:</strong> brillo y un punto dulce.",
      "No pases de <strong>24 horas</strong> de marinada: quedan salados y la yema se endurece.",
      "Si el huevo es muy grande o muy pequeño, ajusta medio minuto arriba o abajo. 7 minutos si quieres la yema más cuajada.",
      "Ya pelados y marinados, duran 3 días en la nevera.",
      "Sírvelos sobre <a href=\"/recetas/arroz-japones-con-arroz-espanol/\">arroz japonés</a> con un chorrito de la marinada, o en un caldo caliente de <a href=\"/recetas/dashi-de-boletus/\">dashi de boletus</a>.",
    ],
    siguiente: ["arroz-japones-con-arroz-espanol"],
  },
];

const bySlug = Object.fromEntries(recetas.map((r) => [r.slug, r]));

for (const r of recetas) {
  const path = `/${r.kind}/${r.slug}/`;
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: r.title,
    description: r.desc,
    inLanguage: "es",
    author: { "@type": "Person", name: AUTOR },
    image: pinPng(r.slug),
    prepTime: r.meta.prep,
    cookTime: r.meta.cookTime,
    totalTime: r.meta.time,
    recipeYield: r.meta.servings,
    recipeCuisine: "Japonesa",
    recipeIngredient: r.ingredientes.map((i) => i.replace(/<[^>]+>/g, "")),
    recipeInstructions: r.pasos.map((p) => ({ "@type": "HowToStep", text: p.replace(/<[^>]+>/g, "") })),
    mainEntityOfPage: `${SITE}${path}`,
  };
  const otras = r.siguiente
    .map((s) => bySlug[s])
    .map((o) => `<li><a href="/recetas/${o.slug}/">${o.title}</a></li>`)
    .join("");
  const body = `<article class="wrap recipe">
  <p class="crumbs"><a href="/">Inicio</a> › <a href="/recetas/">Recetas</a></p>
  <h1>${esc(r.h1)}</h1>
  <p class="lead">${r.intro}</p>
  ${pinFigure({ slug: r.slug, path, alt: r.alt, description: r.h1 })}
  <ul class="facts">
    <li><strong>Tiempo total</strong> ${humanTime(r.meta.time)}</li>
    <li><strong>Raciones</strong> ${esc(r.meta.servings)}</li>
  </ul>
  <h2>Ingredientes</h2>
  <ul class="ingredients">${r.ingredientes.map((i) => `<li>${i}</li>`).join("\n")}</ul>
  <h2>Preparación</h2>
  <ol class="steps">${r.pasos.map((p) => `<li>${p}</li>`).join("\n")}</ol>
  <h2>Notas y trucos</h2>
  <ul class="notes">${r.notas.map((n) => `<li>${n}</li>`).join("\n")}</ul>
  ${bookBox()}
  <h2>Sigue cocinando</h2>
  <ul class="more">${otras}<li><a href="/guias/sustitutos-espanoles-ingredientes-japoneses/">8 sustitutos españoles para cocinar comida japonesa</a></li></ul>
</article>`;
  write(path, layout({ path, title: `${r.title} | El mundo en tu cocina`, description: r.desc, body, jsonld, type: "article", image: pinPng(r.slug) }));
}

function humanTime(iso) {
  const h = /(\d+)H/.exec(iso)?.[1];
  const m = /(\d+)M/.exec(iso)?.[1];
  return [h && `${h} h`, m && `${m} min`].filter(Boolean).join(" ");
}

// ---------- guía de sustitutos ----------
// Los 8 del pin (en el mismo orden)
const ocho = [
  ["Mirin", "Pedro Ximénez + agua", "A partes iguales. Dulce y con cuerpo, da el mismo brillo a teriyakis y glaseados."],
  ["Sake de cocina", "Fino o manzanilla", "La misma cantidad. Seco y aromático, para marinados y caldos. Un vino blanco seco también sirve."],
  ["Dashi", "Caldo de boletus secos", "15 g de boletus secos por litro de agua. <a href=\"/recetas/dashi-de-boletus/\">Receta de dashi de boletus</a>."],
  ["Katsuobushi", "Virutas de jamón crujiente", "Seca lonchas finas de jamón en la sartén o en el horno hasta que crujan y desmígalas. Para espolvorear sobre arroz, verduras u okonomiyaki."],
  ["Beni shoga", "Piparras", "Picadas finas, dan el mismo contraste ácido y picante al yakisoba, el okonomiyaki o los cuencos de arroz."],
  ["Mayonesa japonesa", "Mayonesa casera + vinagre de arroz", "Hazla con vinagre de arroz en lugar de limón: queda más suave y con el punto ácido de la japonesa."],
  ["Tenkasu", "Picatostes machacados", "Las bolitas crujientes de tempura. Machaca picatostes y añádelos al final para que no se ablanden."],
  ["Salsa okonomiyaki", "Ketchup, Worcestershire, soja y miel", "Por ejemplo: 3 cucharadas de ketchup, 2 de Worcestershire, 1 de soja y 1 de miel. Ajusta a tu gusto."],
];

const sustitutos = [
  ["Arroz de sushi", "Arroz redondo (Albufera, Calasparra). El bomba no sirve", "Lávalo bien y respeta el reposo. <a href=\"/recetas/arroz-japones-con-arroz-espanol/\">Ver método</a>."],
  ["Vinagre de arroz", "Vinagre de manzana suave", "Añade una pizca más de azúcar para redondear la acidez."],
  ["Panko", "Pan rallado grueso de pan del día anterior", "Tritura pan sin corteza en trozos grandes y tuéstalo unos minutos en el horno. Queda igual de crujiente."],
  ["Wasabi", "Rábano picante (rábano rusticano) + un toque de mostaza", "El de tubo lleva en realidad mucho rábano picante. Mejor el que se vende como crema de rábano picante."],
  ["Jengibre encurtido (gari)", "Jengibre fresco en láminas finas con vinagre y azúcar", "Escalda 1 minuto las láminas y deja 2 horas en vinagre con azúcar y sal."],
  ["Cebollino japonés (negi)", "Cebolleta, puerro joven o cebollino", "La parte blanca de la cebolleta es la que más se parece."],
  ["Daikon", "Rábano blanco o nabo", "Rállalo crudo o cuécelo en caldos."],
  ["Yuzu", "Limón con un poco de mandarina o pomelo", "Mezcla jugo y un poco de ralladura."],
  ["Shichimi togarashi", "Pimentón picante, pimienta, sésamo y piel de naranja seca", "Mezcla al gusto; guárdalo en un bote."],
  ["Shiitake", "Setas shiitake frescas (cada vez más fáciles de encontrar), champiñón portobello o boletus seco", "Los secos hidratados dan más sabor."],
  ["Chashu (panceta de cerdo)", "Panceta fresca o secreto ibérico", "Cuécelo lento en soja, agua, azúcar y jengibre."],
  ["Harina de tempura", "Harina de trigo + maicena, con agua con gas muy fría", "A partes iguales harina y maicena, y no la batas demasiado."],
];

const noSustituto = [
  ["Salsa de soja", "Es la base. Cómprala siempre real: marcas conocidas ya están en el súper normal. La «soja sin gluten» es el tamari."],
  ["Miso", "No tiene sustituto fiel. Se encuentra en herbolarios y en secciones de productos asiáticos de los grandes supermercados."],
  ["Nori y kombu", "Algas secas: herbolarios, tiendas bio y supermercados grandes."],
];

{
  const path = "/guias/sustitutos-espanoles-ingredientes-japoneses/";
  const slug = "sustitutos-espanoles-ingredientes-japoneses";
  const rows = sustitutos
    .map(([j, e, n]) => `<tr><th scope="row">${j}</th><td>${e}</td><td>${n}</td></tr>`)
    .join("\n");
  const ochoList = ocho
    .map(([j, e, n]) => `<li><p class="swap"><span>${j}</span> <span aria-hidden="true">→</span><span class="sr">: sustitúyelo por</span> <strong>${e}</strong></p><p>${n}</p></li>`)
    .join("\n");
  const noRows = noSustituto.map(([j, n]) => `<li><strong>${j}.</strong> ${n}</li>`).join("\n");
  const body = `<article class="wrap guide">
  <p class="crumbs"><a href="/">Inicio</a> › <a href="/guias/">Guías</a></p>
  <h1>8 sustitutos españoles para cocinar comida japonesa</h1>
  <p class="lead">Con lo que ya tienes en la despensa. Casi todo lo que pide una receta japonesa tiene un equivalente en el supermercado español: estos son los ocho que más uso y cómo usarlos.</p>
  ${pinFigure({ slug, path, alt: "Pin: 8 sustitutos españoles para cocinar comida japonesa. Mirin: Pedro Ximénez y agua. Sake de cocina: fino o manzanilla. Dashi: caldo de boletus secos. Katsuobushi: virutas de jamón crujiente. Beni shoga: piparras. Mayonesa japonesa: mayonesa casera con vinagre de arroz. Tenkasu: picatostes machacados. Salsa okonomiyaki: ketchup, Worcestershire, soja y miel.", description: "8 sustitutos españoles para cocinar comida japonesa" })}
  <ol class="swaps">
${ochoList}
  </ol>
  <h2>Más sustitutos</h2>
  <p>Otros ingredientes japoneses que también tienen un buen equivalente aquí:</p>
  <div class="table-wrap">
  <table>
    <thead><tr><th scope="col">Ingrediente japonés</th><th scope="col">Sustituto español</th><th scope="col">Cómo usarlo</th></tr></thead>
    <tbody>
${rows}
    </tbody>
  </table>
  </div>
  <h2>Lo que sí conviene comprar</h2>
  <p>Hay tres cosas donde un sustituto cambia demasiado el resultado:</p>
  <ul class="notes">${noRows}</ul>
  <p>Con estos tres y la tabla de arriba puedes cocinar la gran mayoría de platos de una cocina japonesa casera.</p>
  ${bookBox("30 recetas para usarlos")}
</article>`;
  write(path, layout({
    path,
    title: "8 sustitutos españoles para cocinar comida japonesa | El mundo en tu cocina",
    description: "Mirin, sake, dashi, katsuobushi, beni shoga, mayonesa japonesa, tenkasu y salsa okonomiyaki: sus sustitutos con ingredientes españoles, y cómo usarlos.",
    body,
    image: pinPng(slug),
    jsonld: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "8 sustitutos españoles para cocinar comida japonesa",
      image: pinPng(slug),
      author: { "@type": "Person", name: AUTOR },
      inLanguage: "es",
      mainEntityOfPage: `${SITE}${path}`,
    },
    type: "article",
  }));
}

// ---------- portadas de sección ----------
const card = (href, kicker, title, text) => `<a class="card" href="${href}"><span class="kicker">${kicker}</span><h3>${title}</h3><p>${text}</p></a>`;
const cardsRecetas = recetas.map((r) => card(`/recetas/${r.slug}/`, "Receta", r.title, r.desc)).join("\n");
const cardGuia = card("/guias/sustitutos-espanoles-ingredientes-japoneses/", "Guía", "8 sustitutos españoles para cocinar comida japonesa", "Qué usar en lugar de mirin, sake, dashi, katsuobushi y más, con lo que ya tienes en la despensa.");

write("/recetas/", layout({
  path: "/recetas/",
  title: "Recetas japonesas con ingredientes españoles | El mundo en tu cocina",
  description: "Recetas japonesas caseras con ingredientes de supermercado español: gyozas, dashi, huevos de ramen, arroz.",
  body: `<section class="wrap"><h1>Recetas</h1><div class="cards">${cardsRecetas}</div>${bookBox()}</section>`,
}));

write("/guias/", layout({
  path: "/guias/",
  title: "Guías de cocina japonesa práctica | El mundo en tu cocina",
  description: "Guías prácticas para cocinar japonés en España sin tiendas especializadas.",
  body: `<section class="wrap"><h1>Guías</h1><div class="cards">${cardGuia}</div>${bookBox()}</section>`,
}));

// ---------- portada ----------
write("/", layout({
  path: "/",
  title: "El mundo en tu cocina | Cocina japonesa con ingredientes españoles",
  description: "Recetas y guías gratis de cocina japonesa con ingredientes que encuentras en cualquier supermercado español. Del autor de «Japón en tu cocina».",
  jsonld: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "El mundo en tu cocina",
    url: `${SITE}/`,
    inLanguage: "es",
  },
  body: `<section class="hero">
  <div class="wrap">
    <p class="eyebrow">Cocina japonesa · ingredientes españoles</p>
    <h1>Japón, con lo que ya tienes en tu cocina</h1>
    <p class="lead">Recetas y guías gratis para cocinar japonés sin viajar a tiendas especializadas. Del autor de <em>Japón en tu cocina</em>.</p>
    <p class="btns"><a class="btn" href="/recetas/">Ver recetas</a><a class="btn btn-alt" href="/libro/">El libro</a></p>
  </div>
</section>
<section class="wrap">
  <h2>Empieza por aquí</h2>
  <div class="cards">
${cardsRecetas}
${cardGuia}
  </div>
  ${bookBox("¿Te gusta cómo cocinamos? Hay 30 recetas más")}
</section>`,
}));

// ---------- libro ----------
write("/libro/", layout({
  path: "/libro/",
  title: "Japón en tu cocina: 30 recetas japonesas con alma española",
  description: "«Japón en tu cocina», de Rodrigo Domínguez Montero: 30 recetas japonesas con alma española. Disponible en ebook y tapa blanda en Amazon.",
  jsonld: {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "Japón en tu cocina",
    author: { "@type": "Person", name: AUTOR },
    inLanguage: "es",
    description: "30 recetas japonesas con alma española.",
    workExample: [
      { "@type": "Book", bookFormat: "https://schema.org/EBook", url: "https://www.amazon.es/dp/B0HLT3C4NK" },
      { "@type": "Book", bookFormat: "https://schema.org/Paperback", url: "https://www.amazon.es/dp/B0HM1KHS7G" },
    ],
  },
  body: `<article class="wrap">
  <p class="crumbs"><a href="/">Inicio</a> › El libro</p>
  <h1>Japón en tu cocina</h1>
  <p class="lead">30 recetas japonesas con alma española. De ${AUTOR}.</p>
  <p>Este libro nace de lo mismo que esta web: cocinar japonés en casa sin depender de tiendas especializadas ni de ingredientes imposibles de encontrar. Cada receta está pensada para el supermercado español y para una cocina normal.</p>
  <h2>Qué vas a encontrar</h2>
  <ul class="notes">
    <li>30 recetas japonesas adaptadas a ingredientes que ya conoces.</li>
    <li>Equivalencias y sustitutos para cada ingrediente delicado.</li>
    <li>Técnicas básicas explicadas paso a paso.</li>
  </ul>
  <p class="btns">
    <a class="btn" href="${EBOOK}" rel="sponsored noopener" target="_blank">Ebook en Amazon</a>
    <a class="btn btn-alt" href="${PAPER}" rel="sponsored noopener" target="_blank">Tapa blanda en Amazon</a>
  </p>
  <p class="small">Enlaces de afiliado de Amazon: a ti te cuestan lo mismo.</p>
  <h2>Antes de comprarlo</h2>
  <p>Prueba primero las recetas gratis de esta web: <a href="/recetas/arroz-japones-con-arroz-espanol/">arroz japonés</a>, <a href="/recetas/gyozas-crujientes/">gyozas crujientes</a> o <a href="/recetas/dashi-de-boletus/">dashi de boletus</a>. Si te gusta cómo cocinamos, el libro sigue por ahí.</p>
</article>`,
}));

// ---------- aviso legal ----------
write("/aviso-legal/", layout({
  path: "/aviso-legal/",
  title: "Aviso legal y privacidad | El mundo en tu cocina",
  description: "Aviso legal, política de privacidad y divulgación de afiliación de El mundo en tu cocina.",
  body: `<article class="wrap legal">
  <h1>Aviso legal y privacidad</h1>
  <h2>Titular del sitio</h2>
  <p>Titular: <strong>Rodrigo Domínguez Montero</strong><br>
  Contacto: <a href="mailto:elmundoentucocina93@gmail.com">elmundoentucocina93@gmail.com</a></p>
  <h2>Objeto</h2>
  <p>«El mundo en tu cocina» es un sitio web de recetas y guías de cocina, con enlaces a la venta del libro «Japón en tu cocina» en Amazon.</p>
  <h2>Afiliación a Amazon</h2>
  <p>${AFILIADO}</p>
  <p>Los enlaces a Amazon que llevan el identificador de afiliado no suponen ningún coste adicional para ti.</p>
  <h2>Privacidad y cookies</h2>
  <p>Este sitio <strong>no usa cookies</strong> ni recoge datos personales. Las visitas se miden con <a href="https://www.goatcounter.com/" rel="noopener">GoatCounter</a>, una analítica sin cookies y sin identificar al visitante.</p>
  <p>El sitio se aloja en GitHub Pages, que puede registrar datos técnicos de conexión (como la dirección IP) en sus propios registros. Las tipografías se cargan desde Google Fonts, lo que implica una petición a servidores de Google.</p>
  <p>Al hacer clic en un enlace a Amazon, pasas a un sitio de terceros con su propia política de privacidad.</p>
  <h2>Propiedad intelectual</h2>
  <p>Los textos y recetas de este sitio son propiedad del titular. Puedes compartir enlaces libremente; para reproducir contenidos, pide permiso por escrito.</p>
  <h2>Responsabilidad</h2>
  <p>Las recetas se ofrecen de buena fe. Cada persona debe comprobar los ingredientes que pueden afectar a alergias o intolerancias y las medidas de seguridad alimentaria (cocción, conservación) antes de consumir los platos.</p>
</article>`,
}));

// ---------- 404 ----------
writeFileSync(join(ROOT, "404.html"), layout({
  path: "/404.html",
  title: "Página no encontrada | El mundo en tu cocina",
  description: "No hemos encontrado esta página.",
  body: `<section class="wrap"><h1>Esta página no existe</h1><p class="lead">Quizá el enlace ha cambiado. Prueba con las <a href="/recetas/">recetas</a> o la <a href="/">portada</a>.</p></section>`,
}));

// ---------- sitemap y robots ----------
const urls = ["/", "/recetas/", "/guias/", "/libro/", "/aviso-legal/", ...recetas.map((r) => `/${r.kind}/${r.slug}/`), "/guias/sustitutos-espanoles-ingredientes-japoneses/"];
const today = new Date().toISOString().slice(0, 10);
writeFileSync(join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod></url>`).join("\n")}\n</urlset>\n`);
writeFileSync(join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
writeFileSync(join(ROOT, ".nojekyll"), "");
console.log("OK:", urls.length, "páginas");
