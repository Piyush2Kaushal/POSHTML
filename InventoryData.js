/**
 * BNM Parts — Shared Product Data
 * Used by both Inventory.html and ProductManagement.html.
 *
 * Fields used by BOTH pages:
 *   product, category, price (retail), stock, status, value
 *
 * Fields used ONLY by ProductManagement.html (extra):
 *   sku, wholesale, trader
 *
 * Table rows are generated dynamically — UI remains pixel-perfect.
 */

const inventoryData = [
  // ── Cases ──────────────────────────────────────────────────────────────────
  {
    product: "iPhone 15 Pro Max Case - Black",
    sku: "CASE-IPH-BLK-001",
    category: "Cases",
    wholesale: "£20.99",
    trader: "£24.99",
    price: "£29.99",
    stock: 145,
    status: "In Stock",
    value: "£4348.55",
    margin: "30.0%",
  },
  {
    product: "iPhone 15 Case - Clear",
    sku: "CASE-IPH-CLR-002",
    category: "Cases",
    wholesale: "£17.49",
    trader: "£20.99",
    price: "£24.99",
    stock: 238,
    status: "In Stock",
    value: "£5947.62",
    margin: "30.0%",
  },
  {
    product: "Samsung S24 Ultra Case - Blue",
    sku: "CASE-SAM-BLU-003",
    category: "Cases",
    wholesale: "£19.59",
    trader: "£23.49",
    price: "£27.99",
    stock: 152,
    status: "In Stock",
    value: "£4254.48",
    margin: "30.0%",
  },
  {
    product: "iPhone 14 Leather Case - Brown",
    sku: "CASE-IPH-LED-101",
    category: "Cases",
    wholesale: "£34.99",
    trader: "£42.49",
    price: "£49.99",
    stock: 67,
    status: "In Stock",
    value: "£3349.33",
    margin: "30.0%",
  },
  {
    product: "Samsung S23 Armor Case",
    sku: "CASE-SAM-ARM-102",
    category: "Cases",
    wholesale: "£24.49",
    trader: "£29.49",
    price: "£34.99",
    stock: 89,
    status: "In Stock",
    value: "£3114.11",
    margin: "30.0%",
  },
  {
    product: "Google Pixel 8 Case - Black",
    sku: "CASE-PIX-BLK-103",
    category: "Cases",
    wholesale: "£18.19",
    trader: "£21.99",
    price: "£25.99",
    stock: 54,
    status: "In Stock",
    value: "£1403.46",
    margin: "30.0%",
  },
  {
    product: "OnePlus 11 Case - Green",
    sku: "CASE-OPL-GRN-104",
    category: "Cases",
    wholesale: "£16.79",
    trader: "£19.99",
    price: "£23.99",
    stock: 42,
    status: "In Stock",
    value: "£1007.58",
    margin: "30.0%",
  },
  {
    product: "iPhone 15 Military Grade Case",
    sku: "CASE-IPH-MIL-105",
    category: "Cases",
    wholesale: "£27.99",
    trader: "£33.99",
    price: "£39.99",
    stock: 76,
    status: "In Stock",
    value: "£3039.24",
    margin: "30.0%",
  },
  {
    product: "Samsung S24 Wallet Case",
    sku: "CASE-SAM-WAL-106",
    category: "Cases",
    wholesale: "£31.49",
    trader: "£37.99",
    price: "£44.99",
    stock: 35,
    status: "In Stock",
    value: "£1574.65",
    margin: "30.0%",
  },
  {
    product: "iPhone 13 Slim Case - Red",
    sku: "CASE-IPH-RED-107",
    category: "Cases",
    wholesale: "£13.99",
    trader: "£16.99",
    price: "£19.99",
    stock: 156,
    status: "In Stock",
    value: "£3118.44",
    margin: "30.0%",
  },

  // ── Cables ─────────────────────────────────────────────────────────────────
  {
    product: "USB-C to USB-C Cable 6ft",
    sku: "CBL-USBC-6FT-001",
    category: "Cables",
    wholesale: "£13.99",
    trader: "£16.99",
    price: "£19.99",
    stock: 320,
    status: "In Stock",
    value: "£6396.80",
    margin: "30.0%",
  },
  {
    product: "Lightning Cable 6ft",
    sku: "CBL-LGHT-6FT-002",
    category: "Cables",
    wholesale: "£16.09",
    trader: "£19.49",
    price: "£22.99",
    stock: 295,
    status: "In Stock",
    value: "£6782.05",
    margin: "30.0%",
  },
  {
    product: "USB-C Cable 10ft - Braided",
    sku: "CBL-USBC-10B-003",
    category: "Cables",
    wholesale: "£17.49",
    trader: "£20.99",
    price: "£24.99",
    stock: 187,
    status: "In Stock",
    value: "£4673.13",
    margin: "30.0%",
  },
  {
    product: "Lightning Cable 3ft - White",
    sku: "CBL-LGHT-3FT-004",
    category: "Cables",
    wholesale: "£10.49",
    trader: "£12.49",
    price: "£14.99",
    stock: 245,
    status: "In Stock",
    value: "£3672.55",
    margin: "30.0%",
  },
  {
    product: "Micro USB Cable 6ft",
    sku: "CBL-MUSB-6FT-005",
    category: "Cables",
    wholesale: "£9.09",
    trader: "£10.99",
    price: "£12.99",
    stock: 165,
    status: "In Stock",
    value: "£2143.35",
    margin: "30.0%",
  },
  {
    product: "3-in-1 Cable (Lightning/USB-C/Micro)",
    sku: "CBL-3IN1-UNV-006",
    category: "Cables",
    wholesale: "£20.99",
    trader: "£24.99",
    price: "£29.99",
    stock: 134,
    status: "In Stock",
    value: "£4018.66",
    margin: "30.0%",
  },
  {
    product: "MagSafe Charging Cable 3ft",
    sku: "CBL-MGSF-3FT-007",
    category: "Cables",
    wholesale: "£24.49",
    trader: "£29.49",
    price: "£34.99",
    stock: 98,
    status: "In Stock",
    value: "£3429.02",
    margin: "30.0%",
  },

  // ── Chargers ───────────────────────────────────────────────────────────────
  {
    product: "Wireless Charger Pad - Qi Certified",
    sku: "CHG-WRLS-QI-001",
    category: "Chargers",
    wholesale: "£27.99",
    trader: "£33.99",
    price: "£39.99",
    stock: 130,
    status: "In Stock",
    value: "£5198.70",
    margin: "30.0%",
  },
  {
    product: "Fast Charger 20W USB-C",
    sku: "CHG-FAST-20W-002",
    category: "Chargers",
    wholesale: "£24.49",
    trader: "£29.49",
    price: "£34.99",
    stock: 242,
    status: "In Stock",
    value: "£8467.58",
    margin: "30.0%",
  },
  {
    product: "Wireless Charging Stand - 15W",
    sku: "CHG-WRLS-15W-003",
    category: "Chargers",
    wholesale: "£31.49",
    trader: "£37.99",
    price: "£44.99",
    stock: 87,
    status: "In Stock",
    value: "£3914.13",
    margin: "30.0%",
  },
  {
    product: "GaN Charger 65W - Dual Port",
    sku: "CHG-GAN-65W-004",
    category: "Chargers",
    wholesale: "£38.49",
    trader: "£46.49",
    price: "£54.99",
    stock: 56,
    status: "In Stock",
    value: "£3079.44",
    margin: "30.0%",
  },
  {
    product: "Car Charger 30W Dual USB",
    sku: "CHG-CAR-30W-005",
    category: "Chargers",
    wholesale: "£17.49",
    trader: "£20.99",
    price: "£24.99",
    stock: 178,
    status: "In Stock",
    value: "£4448.22",
    margin: "30.0%",
  },
  {
    product: "MagSafe Charger 15W",
    sku: "CHG-MGSF-15W-006",
    category: "Chargers",
    wholesale: "£34.99",
    trader: "£42.49",
    price: "£49.99",
    stock: 92,
    status: "In Stock",
    value: "£4599.08",
    margin: "30.0%",
  },
  {
    product: "Multi-Device Charger 6-Port",
    sku: "CHG-MULT-6PT-007",
    category: "Chargers",
    wholesale: "£48.99",
    trader: "£59.49",
    price: "£69.99",
    stock: 43,
    status: "In Stock",
    value: "£3009.57",
    margin: "30.0%",
  },
  {
    product: "3-in-1 Wireless Charger (Phone/Watch/Buds)",
    sku: "CHG-3IN1-WRL-008",
    category: "Chargers",
    wholesale: "£55.99",
    trader: "£67.99",
    price: "£79.99",
    stock: 64,
    status: "In Stock",
    value: "£5119.36",
    margin: "30.0%",
  },

  // ── Screen Protectors ──────────────────────────────────────────────────────
  {
    product: "Screen Protector - Tempered Glass",
    sku: "SCR-TEMP-UNV-001",
    category: "Screen Protectors",
    wholesale: "£10.49",
    trader: "£12.49",
    price: "£14.99",
    stock: 378,
    status: "In Stock",
    value: "£5666.22",
    margin: "30.0%",
  },
  {
    product: "Screen Protector - Matte Anti-Glare",
    sku: "SCR-MATT-UNV-002",
    category: "Screen Protectors",
    wholesale: "£9.09",
    trader: "£10.99",
    price: "£12.99",
    stock: 265,
    status: "In Stock",
    value: "£3442.35",
    margin: "30.0%",
  },
  {
    product: "Privacy Screen Protector",
    sku: "SCR-PRIV-UNV-003",
    category: "Screen Protectors",
    wholesale: "£13.99",
    trader: "£16.99",
    price: "£19.99",
    stock: 145,
    status: "In Stock",
    value: "£2898.55",
    margin: "30.0%",
  },
  {
    product: "Ultra Clear Screen Protector - HD",
    sku: "SCR-CLRH-UNV-004",
    category: "Screen Protectors",
    wholesale: "£11.89",
    trader: "£14.49",
    price: "£16.99",
    stock: 198,
    status: "In Stock",
    value: "£3364.02",
    margin: "30.0%",
  },
  {
    product: "Camera Lens Protector",
    sku: "SCR-LENS-UNV-005",
    category: "Screen Protectors",
    wholesale: "£6.99",
    trader: "£8.49",
    price: "£9.99",
    stock: 287,
    status: "In Stock",
    value: "£2867.13",
    margin: "30.0%",
  },

  // ── Accessories ────────────────────────────────────────────────────────────
  {
    product: "PopSocket - Black",
    sku: "ACC-POPS-BLK-001",
    category: "Accessories",
    wholesale: "£6.99",
    trader: "£8.49",
    price: "£9.99",
    stock: 450,
    status: "In Stock",
    value: "£4495.50",
    margin: "30.0%",
  },
  {
    product: "PopSocket - Marble Design",
    sku: "ACC-POPS-MRB-002",
    category: "Accessories",
    wholesale: "£8.39",
    trader: "£9.99",
    price: "£11.99",
    stock: 332,
    status: "In Stock",
    value: "£3980.68",
    margin: "30.0%",
  },
  {
    product: "Car Phone Mount - Dashboard",
    sku: "ACC-MNTS-DSH-003",
    category: "Accessories",
    wholesale: "£17.49",
    trader: "£20.99",
    price: "£24.99",
    stock: 156,
    status: "In Stock",
    value: "£3898.44",
    margin: "30.0%",
  },
  {
    product: "Phone Ring Holder - 360° Rotation",
    sku: "ACC-RING-360-004",
    category: "Accessories",
    wholesale: "£5.59",
    trader: "£6.79",
    price: "£7.99",
    stock: 298,
    status: "In Stock",
    value: "£2381.02",
    margin: "30.0%",
  },
  {
    product: "Adjustable Desk Phone Stand",
    sku: "ACC-STND-DSK-005",
    category: "Accessories",
    wholesale: "£13.99",
    trader: "£16.99",
    price: "£19.99",
    stock: 167,
    status: "In Stock",
    value: "£3338.33",
    margin: "30.0%",
  },
  {
    product: "Sports Armband - Universal",
    sku: "ACC-ARMB-UNV-006",
    category: "Accessories",
    wholesale: "£10.49",
    trader: "£12.49",
    price: "£14.99",
    stock: 123,
    status: "In Stock",
    value: "£1843.77",
    margin: "30.0%",
  },
  {
    product: "Selfie Stick with Bluetooth",
    sku: "ACC-SLFI-BLT-007",
    category: "Accessories",
    wholesale: "£20.99",
    trader: "£24.99",
    price: "£29.99",
    stock: 87,
    status: "In Stock",
    value: "£2609.13",
    margin: "30.0%",
  },
  {
    product: "Car Cup Holder Phone Mount",
    sku: "ACC-MNTS-CUP-008",
    category: "Accessories",
    wholesale: "£13.99",
    trader: "£16.99",
    price: "£19.99",
    stock: 134,
    status: "In Stock",
    value: "£2678.66",
    margin: "30.0%",
  },

  // ── Audio ──────────────────────────────────────────────────────────────────
  {
    product: "Bluetooth Earbuds - Pro Series",
    sku: "AUD-EARD-PRO-001",
    category: "Audio",
    wholesale: "£55.99",
    trader: "£67.99",
    price: "£79.99",
    stock: 128,
    status: "In Stock",
    value: "£10238.72",
    margin: "30.0%",
  },
  {
    product: "Wired Earphones - USB-C",
    sku: "AUD-EARE-USC-002",
    category: "Audio",
    wholesale: "£11.19",
    trader: "£13.49",
    price: "£15.99",
    stock: 288,
    status: "In Stock",
    value: "£4605.12",
    margin: "30.0%",
  },
  {
    product: "Bluetooth Headphones - Over Ear",
    sku: "AUD-HEAD-OVR-003",
    category: "Audio",
    wholesale: "£69.99",
    trader: "£84.99",
    price: "£99.99",
    stock: 67,
    status: "In Stock",
    value: "£6699.33",
    margin: "30.0%",
  },
  {
    product: "Portable Bluetooth Speaker",
    sku: "AUD-SPKR-BLT-004",
    category: "Audio",
    wholesale: "£34.99",
    trader: "£42.49",
    price: "£49.99",
    stock: 94,
    status: "In Stock",
    value: "£4699.06",
    margin: "30.0%",
  },
  {
    product: "Gaming Headset with Mic",
    sku: "AUD-HEAD-GAM-005",
    category: "Audio",
    wholesale: "£48.99",
    trader: "£59.49",
    price: "£69.99",
    stock: 52,
    status: "In Stock",
    value: "£3639.48",
    margin: "30.0%",
  },
  {
    product: "Bluetooth Neckband - Sport",
    sku: "AUD-NECK-SPT-006",
    category: "Audio",
    wholesale: "£27.99",
    trader: "£33.99",
    price: "£39.99",
    stock: 78,
    status: "In Stock",
    value: "£3119.22",
    margin: "30.0%",
  },

  // ── Power Banks ────────────────────────────────────────────────────────────
  {
    product: "Power Bank 10000mAh",
    sku: "PWR-BANK-10K-001",
    category: "Power Banks",
    wholesale: "£31.49",
    trader: "£37.99",
    price: "£44.99",
    stock: 135,
    status: "In Stock",
    value: "£6073.65",
    margin: "30.0%",
  },
  {
    product: "Power Bank 20000mAh - Fast Charge",
    sku: "PWR-BANK-20K-002",
    category: "Power Banks",
    wholesale: "£41.99",
    trader: "£50.99",
    price: "£59.99",
    stock: 92,
    status: "In Stock",
    value: "£5519.08",
    margin: "30.0%",
  },
  {
    product: "Mini Power Bank 5000mAh",
    sku: "PWR-BANK-5KM-003",
    category: "Power Banks",
    wholesale: "£17.49",
    trader: "£20.99",
    price: "£24.99",
    stock: 187,
    status: "In Stock",
    value: "£4673.13",
    margin: "30.0%",
  },
  {
    product: "Power Bank 30000mAh - Laptop Compatible",
    sku: "PWR-BANK-30K-004",
    category: "Power Banks",
    wholesale: "£62.99",
    trader: "£76.49",
    price: "£89.99",
    stock: 43,
    status: "In Stock",
    value: "£3869.57",
    margin: "30.0%",
  },
  {
    product: "Wireless Power Bank 10000mAh",
    sku: "PWR-BANK-10W-005",
    category: "Power Banks",
    wholesale: "£38.49",
    trader: "£46.49",
    price: "£54.99",
    stock: 76,
    status: "In Stock",
    value: "£4179.24",
    margin: "30.0%",
  },

  // ── Adapters ───────────────────────────────────────────────────────────────
  {
    product: "USB-C Hub - 7-in-1",
    sku: "ADP-USBC-7IN-001",
    category: "Adapters",
    wholesale: "£27.99",
    trader: "£33.99",
    price: "£39.99",
    stock: 89,
    status: "In Stock",
    value: "£3559.11",
    margin: "30.0%",
  },
  {
    product: "USB-C to HDMI Adapter",
    sku: "ADP-USBC-HDM-002",
    category: "Adapters",
    wholesale: "£17.49",
    trader: "£20.99",
    price: "£24.99",
    stock: 145,
    status: "In Stock",
    value: "£3623.55",
    margin: "30.0%",
  },
  {
    product: "Lightning to 3.5mm Adapter",
    sku: "ADP-LGHT-35M-003",
    category: "Adapters",
    wholesale: "£9.09",
    trader: "£10.99",
    price: "£12.99",
    stock: 234,
    status: "In Stock",
    value: "£3039.66",
    margin: "30.0%",
  },
  {
    product: "USB-C to Lightning Adapter",
    sku: "ADP-USBC-LGHT-137",
    category: "Adapters",
    wholesale: "£10.49",
    trader: "£12.49",
    price: "£14.99",
    stock: 198,
    status: "In Stock",
    value: "£2968.02",
    margin: "30.0%",
  },
];

/* ════════════════════════════════════════════════════════════════════════════
 *  SHARED HELPERS
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Determines the CSS classes for the Status badge (Inventory page).
 * @param {string} status
 * @returns {string}
 */
function getStatusBadgeClasses(status) {
  const base =
    "text-white text-xs font-medium items-center box-border caret-transparent gap-x-1 inline-flex shrink-0 justify-center leading-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1 text-nowrap w-fit border overflow-hidden px-2 py-0.5 rounded-md border-solid border-transparent";

  const colorMap = {
    "In Stock": "bg-[oklch(0.627_0.194_149.214)]",
    "Low Stock": "bg-[oklch(0.646_0.222_41.116)]",
    "Out of Stock": "bg-[oklch(0.45_0.18_20)]",
  };

  const color = colorMap[status] ?? colorMap["In Stock"];
  return `${base} ${color}`;
}

/* ════════════════════════════════════════════════════════════════════════════
 *  INVENTORY PAGE RENDERER
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Builds a single <tr> for the Inventory table.
 * Columns: Product | Category | Price | Stock | Status | Value | Action
 */
function buildInventoryRow(item, index) {
  const isLastRow = index === inventoryData.length - 1;

  const tr = document.createElement("tr");
  tr.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] align-middle" +
    (isLastRow ? "" : " border-b border-solid border-black/10");

  // ── Product ──────────────────────────────────────────────────────────────
  const tdProduct = document.createElement("td");
  tdProduct.className =
    "font-medium box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdProduct.textContent = item.product;

  // ── Category ─────────────────────────────────────────────────────────────
  const tdCategory = document.createElement("td");
  tdCategory.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdCategory.textContent = item.category;

  // ── Price ─────────────────────────────────────────────────────────────────
  const tdPrice = document.createElement("td");
  tdPrice.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdPrice.textContent = item.price;

  // ── Stock ─────────────────────────────────────────────────────────────────
  const tdStock = document.createElement("td");
  tdStock.className =
    "font-semibold box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdStock.textContent = item.stock;

  // ── Status badge ──────────────────────────────────────────────────────────
  const tdStatus = document.createElement("td");
  tdStatus.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  const badge = document.createElement("span");
  badge.className = getStatusBadgeClasses(item.status);
  badge.textContent = item.status;
  tdStatus.appendChild(badge);

  // ── Value ─────────────────────────────────────────────────────────────────
  const tdValue = document.createElement("td");
  tdValue.className =
    "font-semibold box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdValue.textContent = item.value;

  // ── Action button ─────────────────────────────────────────────────────────
  const tdAction = document.createElement("td");
  tdAction.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  const btn = document.createElement("button");
  btn.className =
    "font-medium items-center backdrop-blur bg-[oklab(0.999994_0.0000455677_0.0000200868_/_0.6)] caret-transparent gap-x-1.5 inline-flex shrink-0 h-8 justify-center outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1.5 text-center text-nowrap border border-[oklab(0.928_-0.000571842_-0.00597269_/_0.8)] px-3 py-0 rounded-lg border-solid";
  btn.textContent = "Update";
  tdAction.appendChild(btn);

  // ── Assemble ──────────────────────────────────────────────────────────────
  tr.append(
    tdProduct,
    tdCategory,
    tdPrice,
    tdStock,
    tdStatus,
    tdValue,
    tdAction
  );
  return tr;
}

/**
 * Renders all rows into the Inventory table body.
 */
function renderInventoryTable() {
  const tbody = document.querySelector("tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  const fragment = document.createDocumentFragment();
  inventoryData.forEach((item, index) => {
    fragment.appendChild(buildInventoryRow(item, index));
  });
  tbody.appendChild(fragment);
}

/* ════════════════════════════════════════════════════════════════════════════
 *  PRODUCT MANAGEMENT PAGE RENDERER
 * ════════════════════════════════════════════════════════════════════════════ */

/** Asset base for ProductManagement icons */
const PM_ASSET_BASE = "https://c.animaapp.com/mlumnnrdWogcyt/assets";

/**
 * Builds a single <tr> for the Product Management table.
 * Columns: Product Name | SKU | Category | Wholesale | Trader | Retail | Stock | Value | Actions
 */
function buildProductRow(item, index) {
  const isLastRow = index === inventoryData.length - 1;

  const tr = document.createElement("tr");
  tr.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] align-middle" +
    (isLastRow ? "" : " border-b border-solid border-black/10");

  // ── Product Name ─────────────────────────────────────────────────────────
  const tdProduct = document.createElement("td");
  tdProduct.className =
    "font-medium box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdProduct.textContent = item.product;

  // ── SKU ───────────────────────────────────────────────────────────────────
  const tdSku = document.createElement("td");
  tdSku.className =
    "text-[oklch(0.446_0.03_256.802)] box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2 font-ui_monospace";
  tdSku.textContent = item.sku;

  // ── Category badge ────────────────────────────────────────────────────────
  const tdCategory = document.createElement("td");
  tdCategory.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  const catBadge = document.createElement("span");
  catBadge.className =
    "text-xs font-medium items-center box-border caret-transparent gap-x-1 inline-flex shrink-0 justify-center leading-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1 text-nowrap w-fit border overflow-hidden px-2 py-0.5 rounded-md border-solid border-black/10";
  catBadge.textContent = item.category;
  tdCategory.appendChild(catBadge);

  // ── Wholesale ─────────────────────────────────────────────────────────────
  const tdWholesale = document.createElement("td");
  tdWholesale.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdWholesale.textContent = item.wholesale;

  // ── Trader ────────────────────────────────────────────────────────────────
  const tdTrader = document.createElement("td");
  tdTrader.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdTrader.textContent = item.trader;

  // ── Retail (price) ────────────────────────────────────────────────────────
  const tdRetail = document.createElement("td");
  tdRetail.className =
    "font-semibold box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdRetail.textContent = item.price;

  // ── Stock badge ───────────────────────────────────────────────────────────
  const tdStock = document.createElement("td");
  tdStock.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  const stockBadge = document.createElement("span");
  stockBadge.className =
    "text-white text-xs font-medium items-center bg-sky-600 box-border caret-transparent gap-x-1 inline-flex shrink-0 justify-center leading-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1 text-nowrap w-fit border overflow-hidden px-2 py-0.5 rounded-md border-solid border-transparent";
  stockBadge.textContent = item.stock;
  tdStock.appendChild(stockBadge);

  // ── Value ─────────────────────────────────────────────────────────────────
  const tdValue = document.createElement("td");
  tdValue.className =
    "font-semibold box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdValue.textContent = item.value;

  // ── Actions (Edit + Delete buttons) ──────────────────────────────────────
  const tdActions = document.createElement("td");
  tdActions.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";

  const actionsWrap = document.createElement("div");
  actionsWrap.className =
    "box-border caret-transparent gap-x-2 flex outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-2 text-nowrap";

  // Edit button
  const btnEdit = document.createElement("button");
  btnEdit.className =
    "font-medium items-center backdrop-blur bg-[oklab(0.999994_0.0000455677_0.0000200868_/_0.6)] caret-transparent gap-x-1.5 flex shrink-0 h-8 justify-center outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1.5 text-center text-nowrap border border-[oklab(0.928_-0.000571842_-0.00597269_/_0.8)] px-2.5 py-0 rounded-lg border-solid";
  const imgEdit = document.createElement("img");
  imgEdit.src = PM_ASSET_BASE + "/icon-23.svg";
  imgEdit.alt = "Icon";
  imgEdit.className =
    "box-border caret-transparent shrink-0 h-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] pointer-events-none text-nowrap w-4";
  btnEdit.appendChild(imgEdit);

  // Delete button
  const btnDelete = document.createElement("button");
  btnDelete.className =
    "text-[oklch(0.577_0.245_27.325)] font-medium items-center backdrop-blur bg-[oklab(0.999994_0.0000455677_0.0000200868_/_0.6)] caret-transparent gap-x-1.5 flex shrink-0 h-8 justify-center outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1.5 text-center text-nowrap border border-[oklab(0.928_-0.000571842_-0.00597269_/_0.8)] px-2.5 py-0 rounded-lg border-solid";
  const imgDelete = document.createElement("img");
  imgDelete.src = PM_ASSET_BASE + "/icon-24.svg";
  imgDelete.alt = "Icon";
  imgDelete.className =
    "box-border caret-transparent shrink-0 h-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] pointer-events-none text-nowrap w-4";
  btnDelete.appendChild(imgDelete);

  actionsWrap.append(btnEdit, btnDelete);
  tdActions.appendChild(actionsWrap);

  // ── Assemble ──────────────────────────────────────────────────────────────
  tr.append(
    tdProduct,
    tdSku,
    tdCategory,
    tdWholesale,
    tdTrader,
    tdRetail,
    tdStock,
    tdValue,
    tdActions
  );
  return tr;
}

/**
 * Renders all rows into the Product Management table body.
 */
function renderProductTable() {
  const tbody = document.getElementById("product-tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  const fragment = document.createDocumentFragment();
  inventoryData.forEach((item, index) => {
    fragment.appendChild(buildProductRow(item, index));
  });
  tbody.appendChild(fragment);
}

/* ════════════════════════════════════════════════════════════════════════════
 *  PRICE MANAGEMENT PAGE RENDERER
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Builds a single <tr> for the Price Management table.
 * Columns: Product Name | Category | Wholesale | Trader | Retail | Margin | Action
 *
 * Margin badge: green pill — same bg-[oklch(0.627_0.194_149.214)] for all rows.
 * Action: "Edit Prices" text button (no icons).
 */
function buildPricingRow(item, index) {
  const isLastRow = index === inventoryData.length - 1;

  const tr = document.createElement("tr");
  tr.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] align-middle" +
    (isLastRow ? "" : " border-b border-solid border-black/10");

  // ── Product Name ─────────────────────────────────────────────────────────
  const tdProduct = document.createElement("td");
  tdProduct.className =
    "font-medium box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdProduct.textContent = item.product;

  // ── Category badge ────────────────────────────────────────────────────────
  const tdCategory = document.createElement("td");
  tdCategory.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  const catBadge = document.createElement("span");
  catBadge.className =
    "text-xs font-medium items-center box-border caret-transparent gap-x-1 inline-flex shrink-0 justify-center leading-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1 text-nowrap w-fit border overflow-hidden px-2 py-0.5 rounded-md border-solid border-black/10";
  catBadge.textContent = item.category;
  tdCategory.appendChild(catBadge);

  // ── Wholesale ─────────────────────────────────────────────────────────────
  const tdWholesale = document.createElement("td");
  tdWholesale.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdWholesale.textContent = item.wholesale;

  // ── Trader ────────────────────────────────────────────────────────────────
  const tdTrader = document.createElement("td");
  tdTrader.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdTrader.textContent = item.trader;

  // ── Retail (price) — bold ─────────────────────────────────────────────────
  const tdRetail = document.createElement("td");
  tdRetail.className =
    "font-semibold box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdRetail.textContent = item.price;

  // ── Margin badge ──────────────────────────────────────────────────────────
  const tdMargin = document.createElement("td");
  tdMargin.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  const marginBadge = document.createElement("span");
  marginBadge.className =
    "text-white text-xs font-medium items-center bg-[oklch(0.627_0.194_149.214)] box-border caret-transparent gap-x-1 inline-flex shrink-0 justify-center leading-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1 text-nowrap w-fit border overflow-hidden px-2 py-0.5 rounded-md border-solid border-transparent";
  marginBadge.textContent = item.margin;
  tdMargin.appendChild(marginBadge);

  // ── Action — "Edit Prices" button (text only, no icon) ────────────────────
  const tdAction = document.createElement("td");
  tdAction.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  const btn = document.createElement("button");
  btn.className =
    "font-medium items-center backdrop-blur bg-[oklab(0.999994_0.0000455677_0.0000200868_/_0.6)] caret-transparent gap-x-1.5 inline-flex shrink-0 h-8 justify-center outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1.5 text-center text-nowrap border border-[oklab(0.928_-0.000571842_-0.00597269_/_0.8)] px-3 py-0 rounded-lg border-solid";
  btn.textContent = "Edit Prices";
  tdAction.appendChild(btn);

  // ── Assemble ──────────────────────────────────────────────────────────────
  tr.append(
    tdProduct,
    tdCategory,
    tdWholesale,
    tdTrader,
    tdRetail,
    tdMargin,
    tdAction
  );
  return tr;
}

/**
 * Renders all rows into the Price Management table body.
 */
function renderPricingTable() {
  const tbody = document.getElementById("pricing-tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  const fragment = document.createDocumentFragment();
  inventoryData.forEach((item, index) => {
    fragment.appendChild(buildPricingRow(item, index));
  });
  tbody.appendChild(fragment);
}

/* ════════════════════════════════════════════════════════════════════════════
 *  ENTRY POINTS — each page only runs its own renderer
 * ════════════════════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {
  // Inventory page: has a plain <tbody> with no specific id
  if (
    document.querySelector("tbody") &&
    !document.getElementById("product-tbody") &&
    !document.getElementById("pricing-tbody") &&
    !document.getElementById("shelving-tbody")
  ) {
    renderInventoryTable();
  }
  // Product Management page: has tbody#product-tbody
  if (document.getElementById("product-tbody")) {
    renderProductTable();
  }
  // Price Management page: has tbody#pricing-tbody
  if (document.getElementById("pricing-tbody")) {
    renderPricingTable();
  }
  // Product Shelving page: has tbody#shelving-tbody
  if (document.getElementById("shelving-tbody")) {
    renderShelvingTable();
    renderShelvingStats();
    wireShelvingSearch();
  }
});

/* ════════════════════════════════════════════════════════════════════════════
 *  PRODUCT SHELVING PAGE — Data & Renderer
 *  Extension of inventoryData: each item gains shelving-specific fields:
 *    warehouse   – warehouse code (e.g. "MDC-UK")
 *    rack        – rack identifier (e.g. "A-01")
 *    shelf       – shelf number within rack (e.g. "1")
 *    bin         – bin slot on shelf (e.g. "A")
 *    shelfCode   – computed display code: "<rack>-<shelf>-<bin>" (e.g. "A-01-1-A")
 *    zone        – zone label displayed in the Zone column (e.g. "Zone A")
 *    temperature – temperature category badge ("ambient" | "cool" | "frozen")
 *    isPrimary   – boolean, shown as "Primary" / "Secondary" badge
 *    lastRestocked – date string shown in Last Restocked column
 * ════════════════════════════════════════════════════════════════════════════ */

/** Asset base for the Shelving page icons */
const SHELVING_ASSET_BASE = "https://c.animaapp.com/mltd9ksuMx2CxO/assets";

/**
 * Shelving location data.
 * These entries map real products (by SKU match from inventoryData) to their
 * physical shelf positions.  The product name and SKU are duplicated here so
 * the shelving table is self-contained and filterable without a join.
 *
 * Columns rendered: Product | SKU | Shelf Location | Zone | Quantity |
 *                   Temperature | Primary | Last Restocked | Actions
 */
const shelvingData = [
  {
    product: "iPhone 13 Pro Max Case",
    sku: "ACC-001",
    warehouse: "MDC-UK",
    rack: "A-01",
    shelf: "1",
    bin: "A",
    shelfCode: "A-01-1-A",
    zone: "Zone A",
    quantity: 45,
    temperature: "ambient",
    isPrimary: true,
    lastRestocked: "2/10/2024",
  },
  {
    product: "Samsung Galaxy S21 Screen Protector",
    sku: "ACC-002",
    warehouse: "MDC-UK",
    rack: "A-01",
    shelf: "2",
    bin: "B",
    shelfCode: "A-01-2-B",
    zone: "Zone A",
    quantity: 30,
    temperature: "ambient",
    isPrimary: true,
    lastRestocked: "2/12/2024",
  },
  {
    product: "Wireless Charging Pad",
    sku: "ACC-003",
    warehouse: "MDC-UK",
    rack: "C-10",
    shelf: "1",
    bin: "A",
    shelfCode: "C-10-1-A",
    zone: "Zone C",
    quantity: 75,
    temperature: "ambient",
    isPrimary: true,
    lastRestocked: "2/15/2024",
  },
];

/**
 * Summary statistics derived from shelvingData.
 * Mirrors the five stat cards shown on the page.
 *
 *   totalShelves  – distinct shelf codes in use
 *   available     – shelf slots with no stock (quantity === 0)
 *   occupied      – shelf slots with stock (quantity > 0)
 *   capacity      – total quantity across all shelving entries
 *   utilization   – percentage occupied / capacity (display string)
 *   utilizationSub – e.g. "150 / 275 units"
 */
const shelvingStats = (function computeStats() {
  const totalShelves = 4; // static per original UI (includes one empty slot)
  const occupied = shelvingData.filter((r) => r.quantity > 0).length;
  const available = totalShelves - occupied;
  const currentUnits = shelvingData.reduce((s, r) => s + r.quantity, 0);
  const capacity = 275; // static total capacity per original UI
  const pct = ((currentUnits / capacity) * 100).toFixed(1) + "%";
  return {
    totalShelves,
    available,
    occupied,
    capacity,
    utilization: pct,
    utilizationSub: currentUnits + " / " + capacity + " units",
  };
})();

/* ─────────────────────────────────────────────────────────────────
 *  Shelving — badge & cell helpers
 *  All class strings are taken verbatim from the original HTML so
 *  the output is pixel-perfect identical.
 * ───────────────────────────────────────────────────────────────── */

/** Returns the temperature badge <span> element. */
function buildTemperatureBadge(temp) {
  const span = document.createElement("span");
  span.className =
    "text-[oklch(0.446_0.03_256.802)] text-xs font-medium items-center box-border caret-transparent gap-x-1 inline-flex shrink-0 justify-center leading-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1 text-nowrap w-fit border overflow-hidden px-2 py-0.5 rounded-md border-solid border-[oklch(0.707_0.022_261.325)]";
  span.textContent = temp;
  return span;
}

/** Returns the Primary / Secondary badge <span> element. */
function buildPrimaryBadge(isPrimary) {
  const span = document.createElement("span");
  span.className =
    "text-white text-xs font-medium items-center bg-[oklch(0.723_0.219_149.579)] box-border caret-transparent gap-x-1 inline-flex shrink-0 justify-center leading-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1 text-nowrap w-fit border overflow-hidden px-2 py-0.5 rounded-md border-solid border-transparent";
  span.textContent = isPrimary ? "Primary" : "Secondary";
  return span;
}

/**
 * Builds one <tr> for the Product Shelving table.
 * Column order: Product | SKU | Shelf Location | Zone |
 *               Quantity | Temperature | Primary | Last Restocked | Actions
 */
function buildShelvingRow(item, index) {
  const isLastRow = index === shelvingData.length - 1;

  const tr = document.createElement("tr");
  tr.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] align-middle" +
    (isLastRow ? "" : " border-b border-solid border-black/10");

  /* ── Product name ───────────────────────────────────────────────────── */
  const tdProduct = document.createElement("td");
  tdProduct.className =
    "font-medium box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdProduct.textContent = item.product;

  /* ── SKU badge ──────────────────────────────────────────────────────── */
  const tdSku = document.createElement("td");
  tdSku.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  const skuBadge = document.createElement("span");
  skuBadge.className =
    "text-xs font-medium items-center box-border caret-transparent gap-x-1 inline-flex shrink-0 justify-center leading-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1 text-nowrap w-fit border overflow-hidden px-2 py-0.5 rounded-md border-solid border-black/10";
  skuBadge.textContent = item.sku;
  tdSku.appendChild(skuBadge);

  /* ── Shelf Location (icon + monospace code) ─────────────────────────── */
  const tdShelf = document.createElement("td");
  tdShelf.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  const shelfWrap = document.createElement("div");
  shelfWrap.className =
    "items-center box-border caret-transparent gap-x-2 flex outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-2 text-nowrap";
  const shelfIcon = document.createElement("img");
  shelfIcon.src = SHELVING_ASSET_BASE + "/icon-30.svg";
  shelfIcon.alt = "Icon";
  shelfIcon.className =
    "text-[oklch(0.558_0.288_302.321)] box-border caret-transparent h-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap w-4";
  const shelfCode = document.createElement("span");
  shelfCode.className =
    "font-semibold box-border caret-transparent block outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap font-ui_monospace";
  shelfCode.textContent = item.shelfCode;
  shelfWrap.append(shelfIcon, shelfCode);
  tdShelf.appendChild(shelfWrap);

  /* ── Zone badge ─────────────────────────────────────────────────────── */
  const tdZone = document.createElement("td");
  tdZone.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  const zoneBadge = document.createElement("span");
  zoneBadge.className =
    "text-xs font-medium items-center bg-stone-50 box-border caret-transparent gap-x-1 inline-flex shrink-0 justify-center leading-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1 text-nowrap w-fit border overflow-hidden px-2 py-0.5 rounded-md border-solid border-transparent";
  zoneBadge.textContent = item.zone;
  tdZone.appendChild(zoneBadge);

  /* ── Quantity ───────────────────────────────────────────────────────── */
  const tdQty = document.createElement("td");
  tdQty.className =
    "font-semibold box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-right text-nowrap align-middle p-2";
  tdQty.textContent = item.quantity;

  /* ── Temperature badge ──────────────────────────────────────────────── */
  const tdTemp = document.createElement("td");
  tdTemp.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdTemp.appendChild(buildTemperatureBadge(item.temperature));

  /* ── Primary badge ──────────────────────────────────────────────────── */
  const tdPrimary = document.createElement("td");
  tdPrimary.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdPrimary.appendChild(buildPrimaryBadge(item.isPrimary));

  /* ── Last Restocked ─────────────────────────────────────────────────── */
  const tdRestocked = document.createElement("td");
  tdRestocked.className =
    "text-[oklch(0.446_0.03_256.802)] box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdRestocked.textContent = item.lastRestocked;

  /* ── Delete action button ───────────────────────────────────────────── */
  const tdAction = document.createElement("td");
  tdAction.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  const btn = document.createElement("button");
  btn.className =
    "text-[oklch(0.577_0.245_27.325)] font-medium items-center bg-transparent caret-transparent gap-x-1.5 inline-flex shrink-0 h-8 justify-center outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1.5 text-center text-nowrap px-2.5 py-0 rounded-lg";
  const btnIcon = document.createElement("img");
  btnIcon.src = SHELVING_ASSET_BASE + "/icon-31.svg";
  btnIcon.alt = "Icon";
  btnIcon.className =
    "box-border caret-transparent shrink-0 h-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] pointer-events-none text-nowrap w-4";
  btn.appendChild(btnIcon);
  tdAction.appendChild(btn);

  /* ── Assemble ───────────────────────────────────────────────────────── */
  tr.append(
    tdProduct,
    tdSku,
    tdShelf,
    tdZone,
    tdQty,
    tdTemp,
    tdPrimary,
    tdRestocked,
    tdAction
  );
  return tr;
}

/**
 * Renders all shelving rows into #shelving-tbody.
 * Accepts an optional filter string for live search.
 */
function renderShelvingTable(filterText) {
  const tbody = document.getElementById("shelving-tbody");
  if (!tbody) return;

  let data = shelvingData;

  if (filterText && filterText.trim() !== "") {
    const lc = filterText.toLowerCase();
    data = shelvingData.filter(
      (item) =>
        item.product.toLowerCase().includes(lc) ||
        item.sku.toLowerCase().includes(lc) ||
        item.shelfCode.toLowerCase().includes(lc) ||
        item.zone.toLowerCase().includes(lc) ||
        item.warehouse.toLowerCase().includes(lc)
    );
  }

  tbody.innerHTML = "";
  const fragment = document.createDocumentFragment();
  data.forEach((item, index) => {
    fragment.appendChild(buildShelvingRow(item, index));
  });
  tbody.appendChild(fragment);
}

/**
 * Populates the five stat-card value elements from shelvingStats.
 * IDs are assigned in ProductShelvingManagement.html.
 */
function renderShelvingStats() {
  const ids = {
    "shelving-stat-total": shelvingStats.totalShelves,
    "shelving-stat-available": shelvingStats.available,
    "shelving-stat-occupied": shelvingStats.occupied,
    "shelving-stat-capacity": shelvingStats.capacity,
    "shelving-stat-utilization": shelvingStats.utilization,
  };
  const subs = {
    "shelving-stat-total-sub": "Locations available",
    "shelving-stat-available-sub": "Empty locations",
    "shelving-stat-occupied-sub": "Shelves in use",
    "shelving-stat-capacity-sub": "Total units",
    "shelving-stat-utilization-sub": shelvingStats.utilizationSub,
  };
  Object.entries(ids).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  });
  Object.entries(subs).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  });
}

/**
 * Wires the shelving search input to live-filter the table.
 */
function wireShelvingSearch() {
  const input = document.getElementById("shelving-search");
  if (!input) return;
  input.addEventListener("input", function () {
    renderShelvingTable(input.value);
  });
}
