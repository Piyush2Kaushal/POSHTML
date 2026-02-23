/**
 * BNM Parts — Categories Management
 * CategoriesData.js
 *
 * Dedicated data file and dynamic table renderer for the
 * Categories Management page (CategoriesManagement.html).
 *
 * Architecture:
 *  - categoriesData   : Single source of truth for all category records.
 *  - buildCategoryRow : Pure function — one data record → one <tr> element.
 *  - renderCategoriesTable : Orchestrates the full table render pass.
 *
 * To add, remove, or edit a category, touch ONLY the categoriesData array.
 * No other code needs to change.
 *
 * Asset base for this page's Anima CDN folder.
 * (Used for the category-name icon and the delete-button icon.)
 */

/* ════════════════════════════════════════════════════════════════════════════
 *  CONFIGURATION
 * ════════════════════════════════════════════════════════════════════════════ */

/** @constant {string} CDN prefix for all icon assets on this page. */
var CAT_ASSET_BASE = "https://c.animaapp.com/mlt9zgbxbGhHAE/assets";

/* ════════════════════════════════════════════════════════════════════════════
 *  DATA
 *
 *  Fields:
 *    name        {string}  — Display name of the category.
 *    productCount{number}  — Number of distinct products in this category.
 *    totalStock  {number}  — Aggregate stock count across all products.
 *    totalValue  {string}  — Pre-formatted total inventory value (e.g. "£31157.46").
 *
 *  NOTE: productCount drives the "X items" badge label automatically.
 * ════════════════════════════════════════════════════════════════════════════ */

/** @type {Array<{name: string, productCount: number, totalStock: number, totalValue: string}>} */
var categoriesData = [
  {
    name: "Cases",
    productCount: 10,
    totalStock: 1054,
    totalValue: "£31157.46",
  },
  {
    name: "Cables",
    productCount: 7,
    totalStock: 1444,
    totalValue: "£31115.56",
  },
  {
    name: "Chargers",
    productCount: 8,
    totalStock: 892,
    totalValue: "£37836.08",
  },
  {
    name: "Screen Protectors",
    productCount: 5,
    totalStock: 1273,
    totalValue: "£18238.27",
  },
  {
    name: "Accessories",
    productCount: 8,
    totalStock: 1747,
    totalValue: "£25225.53",
  },
  {
    name: "Audio",
    productCount: 6,
    totalStock: 707,
    totalValue: "£33000.93",
  },
  {
    name: "Power Banks",
    productCount: 5,
    totalStock: 533,
    totalValue: "£24314.67",
  },
  {
    name: "Adapters",
    productCount: 4,
    totalStock: 666,
    totalValue: "£13190.34",
  },
];

/* ════════════════════════════════════════════════════════════════════════════
 *  ROW BUILDER
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Builds a single pixel-perfect <tr> element for one category record.
 *
 * Column order (matches thead):
 *   1. Category Name  — icon + text
 *   2. Products       — "X items" badge
 *   3. Total Stock    — plain semibold number
 *   4. Total Value    — green semibold currency string
 *   5. Actions        — disabled delete button (opacity-50 / pointer-events-none)
 *
 * @param  {object}  item       — One entry from categoriesData.
 * @param  {number}  index      — Zero-based row index.
 * @param  {number}  total      — Total number of rows (used to detect last row).
 * @returns {HTMLTableRowElement}
 */
function buildCategoryRow(item, index, total) {
  var isLastRow = index === total - 1;

  /* ── <tr> ──────────────────────────────────────────────────────────────── */
  var tr = document.createElement("tr");
  tr.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] align-middle" +
    (isLastRow ? "" : " border-b border-solid border-black/10");

  /* ── 1. Category Name ──────────────────────────────────────────────────── */
  var tdName = document.createElement("td");
  tdName.className =
    "font-medium box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";

  var nameWrap = document.createElement("div");
  nameWrap.className =
    "items-center box-border caret-transparent gap-x-2 flex outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-2 text-nowrap";

  var nameIcon = document.createElement("img");
  nameIcon.src = CAT_ASSET_BASE + "/icon-22.svg";
  nameIcon.alt = "Icon";
  nameIcon.className =
    "text-[oklch(0.551_0.027_264.364)] box-border caret-transparent h-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap w-4";

  nameWrap.appendChild(nameIcon);
  nameWrap.appendChild(document.createTextNode(item.name));
  tdName.appendChild(nameWrap);

  /* ── 2. Products badge ─────────────────────────────────────────────────── */
  var tdProducts = document.createElement("td");
  tdProducts.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";

  var productsBadge = document.createElement("span");
  productsBadge.className =
    "text-xs font-medium items-center box-border caret-transparent gap-x-1 inline-flex shrink-0 justify-center leading-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1 text-nowrap w-fit border overflow-hidden px-2 py-0.5 rounded-md border-solid border-black/10";
  productsBadge.textContent = item.productCount + " items";
  tdProducts.appendChild(productsBadge);

  /* ── 3. Total Stock ────────────────────────────────────────────────────── */
  var tdStock = document.createElement("td");
  tdStock.className =
    "font-semibold box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdStock.textContent = item.totalStock;

  /* ── 4. Total Value ────────────────────────────────────────────────────── */
  var tdValue = document.createElement("td");
  tdValue.className =
    "text-[oklch(0.627_0.194_149.214)] font-semibold box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdValue.textContent = item.totalValue;

  /* ── 5. Actions (disabled delete button) ──────────────────────────────── */
  var tdActions = document.createElement("td");
  tdActions.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";

  var deleteBtn = document.createElement("button");
  deleteBtn.className =
    "text-[oklch(0.577_0.245_27.325)] font-medium items-center backdrop-blur bg-[oklab(0.999994_0.0000455677_0.0000200868_/_0.6)] caret-transparent gap-x-1.5 inline-flex shrink-0 h-8 justify-center opacity-50 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] pointer-events-none gap-y-1.5 text-center text-nowrap border border-[oklab(0.928_-0.000571842_-0.00597269_/_0.8)] px-2.5 py-0 rounded-lg border-solid";

  var deleteIcon = document.createElement("img");
  deleteIcon.src = CAT_ASSET_BASE + "/icon-23.svg";
  deleteIcon.alt = "Icon";
  deleteIcon.className =
    "box-border caret-transparent shrink-0 h-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap w-4";

  deleteBtn.appendChild(deleteIcon);
  tdActions.appendChild(deleteBtn);

  /* ── Assemble row ──────────────────────────────────────────────────────── */
  tr.appendChild(tdName);
  tr.appendChild(tdProducts);
  tr.appendChild(tdStock);
  tr.appendChild(tdValue);
  tr.appendChild(tdActions);

  return tr;
}

/* ════════════════════════════════════════════════════════════════════════════
 *  TABLE RENDERER
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Clears and fully repopulates the categories <tbody>.
 * Uses a DocumentFragment for a single, efficient DOM insertion.
 */
function renderCategoriesTable() {
  var tbody = document.getElementById("categories-tbody");
  if (!tbody) return;

  /* Clear any residual static markup */
  tbody.innerHTML = "";

  var fragment = document.createDocumentFragment();
  var total = categoriesData.length;

  for (var i = 0; i < total; i++) {
    fragment.appendChild(buildCategoryRow(categoriesData[i], i, total));
  }

  tbody.appendChild(fragment);
}

/* ════════════════════════════════════════════════════════════════════════════
 *  ENTRY POINT
 * ════════════════════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", renderCategoriesTable);
