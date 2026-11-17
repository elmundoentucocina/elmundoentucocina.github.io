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
const PINTEREST_TOKEN = "PEGA_AQUI_EL_CODIGO_DE_PINTEREST"; // <- ver guía paso 6
const AFILIADO = "Como afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables.";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function layout({ path, title, description, body, jsonld, type = "website" }) {
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
  <p><strong>Japón en tu cocina</strong>: 30 recetas japonesas hechas con ingredientes que encuentras en cualquier supermercado español. Sin viajes a tiendas especializadas ni listas imposibles.</p>
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
    h1: "Arroz japonés con arroz español (sin comprar arroz de sushi)",
    desc: "Cómo cocer arroz al estilo japonés con arroz redondo o bomba de supermercado: proporciones, lavado, reposo y sazonado para sushi.",
    intro: "No necesitas arroz de sushi importado. Un buen arroz redondo español (tipo Albufera, Calasparra o bomba) da un arroz japonés pegajoso, brillante y con ese punto firme. Lo que importa es el método.",
    meta: { time: "PT50M", servings: "4", cookTime: "PT15M", prep: "PT35M" },
    ingredientes: [
      "300 g de arroz redondo (Albufera, Calasparra o bomba)",
      "360 ml de agua (proporción 1:1,2; ver nota)",
      "Para sushi: 45 ml de vinagre de arroz, 1 cucharada de azúcar y 1 cucharadita de sal",
    ],
    pasos: [
      "<strong>Lava el arroz</strong> en un bol con agua fría, removiendo con la mano. Cambia el agua 3 o 4 veces hasta que salga casi transparente. Escurre.",
      "<strong>Remoja</strong> el arroz 20-30 minutos en el agua de cocción (los 360 ml). Es lo que da una textura pareja.",
      "Pon la olla tapada a <strong>fuego fuerte</strong> hasta que hierva (vas a oír el burbujeo; no destapes).",
      "Baja al <strong>mínimo y cuece 12 minutos</strong> tapado.",
      "Apaga el fuego y <strong>deja reposar 10 minutos sin abrir</strong>. Aquí termina de hacerse con el vapor.",
      "Airea con una espátula, cortando y levantando, sin aplastar los granos.",
      "<strong>Para sushi:</strong> calienta el vinagre con el azúcar y la sal hasta que se disuelvan, y mézclalo con el arroz aún tibio, en un bol ancho y sin amasar. Abanica unos minutos para que brille.",
    ],
    notas: [
      "<strong>Nota de proporciones:</strong> cada marca absorbe distinto. Empieza en 1:1,2 en peso/volumen; si te queda duro, la próxima vez sube a 1:1,3. La bomba suele pedir algo más de agua que el redondo corriente.",
      "Usa una olla con tapa que cierre bien. Una tapa que deja escapar vapor es la causa número uno de arroz seco.",
      "Si no tienes vinagre de arroz, vale vinagre de manzana suave con un pellizco más de azúcar.",
      "Se conserva 1 día en la nevera, pero mejor sírvelo el mismo día. Recaliéntalo con una cucharada de agua en el microondas.",
    ],
    siguiente: ["huevos-de-ramen-ajitama"],
  },
  {
    slug: "dashi-de-boletus",
    kind: "recetas",
    title: "Dashi de boletus",
    h1: "Dashi de boletus: el caldo japonés con ingredientes de aquí",
    desc: "Un dashi con boletus seco y alga kombu para sopa de miso, fideos, huevos y salsas. Receta sencilla, hecha en 40 minutos.",
    intro: "El dashi es la base de la cocina japonesa: un caldo ligero y lleno de umami. El tradicional lleva katsuobushi (bonito seco), difícil de encontrar. El boletus seco da un umami profundo y se compra en cualquier supermercado.",
    meta: { time: "PT40M", servings: "4", cookTime: "PT15M", prep: "PT25M" },
    ingredientes: [
      "1 litro de agua",
      "15 g de boletus seco",
      "10 g de alga kombu (un trozo de unos 10 cm; opcional, ver nota)",
      "Sal, al final y solo si hace falta",
    ],
    pasos: [
      "Pon el boletus y el kombu en el agua <strong>fría</strong> y déjalos <strong>30 minutos</strong> (o toda la noche en la nevera, aún mejor).",
      "Calienta a fuego medio-bajo. <strong>Retira el kombu justo antes de que hierva</strong>: si hierve, amarga y se vuelve algo viscoso.",
      "Mantén el caldo a fuego suave con el boletus <strong>8-10 minutos</strong>, sin hervir fuerte.",
      "Cuela con un colador fino o un paño. Prueba, y sala solo si lo necesitas.",
    ],
    notas: [
      "<strong>Sin kombu:</strong> sale un caldo más terroso y menos redondo, pero muy bueno. Puedes añadir un trozo de puerro para dar dulzor.",
      "No tires el boletus hidratado: pícalo y úsalo en rellenos, revueltos o en la salsa de unos fideos.",
      "<strong>Para qué sirve:</strong> sopa de miso, caldo de fideos, caldo para huevos y verduras, arroz. Prueba a sustituir el agua por dashi en cualquier receta.",
      "Dura 3 días en la nevera o 3 meses congelado (en cubiteras, para usar por porciones).",
    ],
    siguiente: ["gyozas-crujientes"],
  },
  {
    slug: "gyozas-crujientes",
    kind: "recetas",
    title: "Gyozas crujientes",
    h1: "Gyozas crujientes de cerdo y repollo (con trucos para que no se peguen)",
    desc: "Gyozas caseras con relleno de cerdo y repollo, doradas por abajo y tiernas por arriba. Con salsa y opción de masa casera o obleas de supermercado.",
    intro: "El secreto de una buena gyoza es la técnica de cocción: dorar, añadir agua, tapar para cocer al vapor y destapar para que vuelva a quedar crujiente. Puedes usar obleas compradas o hacer la masa tú.",
    meta: { time: "PT1H", servings: "4 (unas 24 gyozas)", cookTime: "PT10M", prep: "PT50M" },
    ingredientes: [
      "24 obleas de gyoza (o la masa casera de abajo)",
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
      "Calienta 1 cucharada de aceite en una sartén antiadherente con tapa. Coloca las gyozas con la base plana hacia abajo y dóralas <strong>2 minutos</strong>.",
      "Añade <strong>80 ml de agua</strong> (con cuidado: salpica), <strong>tapa y cuece 5 minutos</strong> al vapor.",
      "Destapa y deja que se evapore el agua <strong>1-2 minutos</strong> más, hasta que la base quede dorada y crujiente.",
      "Sirve con la salsa mezclada.",
    ],
    notas: [
      "<strong>Truco de la «ala» crujiente:</strong> sustituye el agua del paso 6 por 1 cucharadita de harina disuelta en 80 ml de agua. Al evaporarse queda una lámina crujiente que une todas las gyozas.",
      "<strong>Congelar:</strong> pon las gyozas crudas en una bandeja sin tocarse, congela y luego pásalas a una bolsa. Se cocinan directamente del congelador sumando 1-2 minutos.",
      "Si el relleno te parece seco, añade una cucharada de agua o de caldo (por ejemplo, <a href=\"/recetas/dashi-de-boletus/\">dashi de boletus</a>).",
    ],
    siguiente: ["huevos-de-ramen-ajitama"],
  },
  {
    slug: "huevos-de-ramen-ajitama",
    kind: "recetas",
    title: "Huevos de ramen (ajitama)",
    h1: "Huevos de ramen (ajitama): yema melosa y marinada en soja",
    desc: "Cómo hacer ajitama en casa: tiempo exacto de cocción, marinada con soja y tiempo de reposo para una yema melosa.",
    intro: "Los ajitama son huevos cocidos con la yema todavía blanda y marinados en una mezcla de soja y mirin. Van en ramen, pero también con arroz, ensaladas o solos como aperitivo.",
    meta: { time: "PT8H20M", servings: "4", cookTime: "PT7M", prep: "PT20M" },
    ingredientes: [
      "4 huevos grandes, sacados de la nevera",
      "80 ml de salsa de soja",
      "80 ml de agua",
      "3 cucharadas de mirin (o 3 de vino blanco seco + 1 cucharadita extra de azúcar)",
      "1 cucharada de azúcar",
      "Hielo y agua fría",
    ],
    pasos: [
      "Mezcla la soja, el agua, el mirin y el azúcar. Calienta hasta que el azúcar se disuelva y <strong>deja enfriar del todo</strong>.",
      "Hierve abundante agua. Baja los huevos <strong>fríos, directos de la nevera</strong>, con una cuchara y empieza a contar.",
      "<strong>6 minutos y 30 segundos</strong> para yema líquida y melosa. 7 minutos si la quieres más cuajada.",
      "Pásalos enseguida a un bol con <strong>agua con hielo</strong> y déjalos 10 minutos.",
      "Pela con cuidado bajo un hilo de agua.",
      "Mételos en una bolsa con cierre (o un recipiente justo) con la marinada fría, sacando el aire para que queden cubiertos.",
      "Marina en la nevera <strong>entre 4 y 12 horas</strong>. Dales la vuelta de vez en cuando.",
    ],
    notas: [
      "No pases de <strong>24 horas</strong> de marinada: quedan salados y la yema se endurece.",
      "Si el huevo es muy grande o muy pequeño, ajusta medio minuto arriba o abajo.",
      "Duran 3 días en la nevera. Para servir, corta por la mitad con un hilo de coser o un cuchillo bien mojado.",
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
    author: { "@type": "Person", name: "Autor de «Japón en tu cocina»" },
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
  <ul class="more">${otras}<li><a href="/guias/sustitutos-espanoles-ingredientes-japoneses/">Sustitutos españoles de ingredientes japoneses</a></li></ul>
</article>`;
  write(path, layout({ path, title: `${r.title} | El mundo en tu cocina`, description: r.desc, body, jsonld, type: "article" }));
}

function humanTime(iso) {
  const h = /(\d+)H/.exec(iso)?.[1];
  const m = /(\d+)M/.exec(iso)?.[1];
  return [h && `${h} h`, m && `${m} min`].filter(Boolean).join(" ");
}

// ---------- guía de sustitutos ----------
const sustitutos = [
  ["Arroz de sushi", "Arroz redondo (Albufera, Calasparra) o bomba", "Lávalo bien y respeta el reposo. <a href=\"/recetas/arroz-japones-con-arroz-espanol/\">Ver método</a>."],
  ["Mirin", "Vino blanco seco + una pizca de azúcar", "3 cucharadas de vino + 1 cucharadita de azúcar por cada 3 de mirin. En marinadas y salsas apenas se nota."],
  ["Sake (para cocinar)", "Vino blanco seco, fino o manzanilla", "Misma cantidad. Evapora el alcohol al calentar."],
  ["Vinagre de arroz", "Vinagre de manzana suave", "Añade una pizca más de azúcar para redondear la acidez."],
  ["Dashi", "Caldo de boletus seco (con o sin kombu)", "<a href=\"/recetas/dashi-de-boletus/\">Receta de dashi de boletus</a>."],
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
  const rows = sustitutos
    .map(([j, e, n]) => `<tr><th scope="row">${j}</th><td>${e}</td><td>${n}</td></tr>`)
    .join("\n");
  const noRows = noSustituto.map(([j, n]) => `<li><strong>${j}.</strong> ${n}</li>`).join("\n");
  const body = `<article class="wrap guide">
  <p class="crumbs"><a href="/">Inicio</a> › <a href="/guias/">Guías</a></p>
  <h1>Sustitutos españoles de ingredientes japoneses</h1>
  <p class="lead">Casi todo lo que necesitas para cocinar japonés está en tu supermercado. Esta es la tabla de equivalencias que más uso, qué sustituir y qué conviene comprar de verdad.</p>
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
  ${bookBox("¿Quieres 30 recetas hechas así?")}
</article>`;
  write(path, layout({
    path,
    title: "Sustitutos españoles de ingredientes japoneses | El mundo en tu cocina",
    description: "Tabla de equivalencias para cocinar japonés con ingredientes españoles: mirin, sake, panko, wasabi, dashi, arroz de sushi y más.",
    body,
    jsonld: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Sustitutos españoles de ingredientes japoneses",
      inLanguage: "es",
      mainEntityOfPage: `${SITE}${path}`,
    },
    type: "article",
  }));
}

// ---------- portadas de sección ----------
const card = (href, kicker, title, text) => `<a class="card" href="${href}"><span class="kicker">${kicker}</span><h3>${title}</h3><p>${text}</p></a>`;
const cardsRecetas = recetas.map((r) => card(`/recetas/${r.slug}/`, "Receta", r.title, r.desc)).join("\n");
const cardGuia = card("/guias/sustitutos-espanoles-ingredientes-japoneses/", "Guía", "Sustitutos españoles de ingredientes japoneses", "Qué usar en lugar de mirin, panko, wasabi, dashi y arroz de sushi.");

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
  title: "Japón en tu cocina: 30 recetas japonesas con ingredientes españoles",
  description: "«Japón en tu cocina»: 30 recetas japonesas con ingredientes españoles. Disponible en ebook y tapa blanda en Amazon.",
  jsonld: {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "Japón en tu cocina",
    inLanguage: "es",
    description: "30 recetas japonesas con ingredientes españoles.",
    workExample: [
      { "@type": "Book", bookFormat: "https://schema.org/EBook", url: "https://www.amazon.es/dp/B0HLT3C4NK" },
      { "@type": "Book", bookFormat: "https://schema.org/Paperback", url: "https://www.amazon.es/dp/B0HM1KHS7G" },
    ],
  },
  body: `<article class="wrap">
  <p class="crumbs"><a href="/">Inicio</a> › El libro</p>
  <h1>Japón en tu cocina</h1>
  <p class="lead">30 recetas japonesas hechas con ingredientes españoles.</p>
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
  <p>Titular: <strong>[TU NOMBRE Y APELLIDOS]</strong><br>
  NIF: <strong>[TU NIF]</strong><br>
  Contacto: <strong>[TU EMAIL]</strong></p>
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
