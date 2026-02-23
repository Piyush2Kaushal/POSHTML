/**
 * PurchaseData.js
 * ─────────────────────────────────────────────────────────────────────────────
 * BNM Parts — Purchase Management Page
 * Dedicated data + rendering module. Intentionally separate from InventoryData.js.
 *
 * Architecture
 * ────────────
 *  purchaseData[]        — master array of purchase objects (source of truth)
 *  purchaseStats{}       — derived summary stats (computed once at parse-time)
 *  buildPurchaseRow()    — builds one <tr> DOM node from one data object
 *  renderPurchaseTable() — populates #purchase-tbody (supports live filtering)
 *  renderPurchaseStats() — writes computed stats into the four stat cards
 *  wirePurchaseSearch()  — attaches live-search to #purchase-search input
 *
 * Future-ready hooks (sorting, pagination, status filter) are noted inline.
 *
 * All class strings are taken verbatim from the original static HTML so the
 * rendered output is pixel-perfect identical.
 *
 * Asset base for this page's Anima CDN folder:
 *   https://c.animaapp.com/mltdd1b04RiY6X/assets
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ═══════════════════════════════════════════════════════════════════════════
 *  ASSET BASE — icons used inside the table rows
 * ═══════════════════════════════════════════════════════════════════════════ */
var PURCHASE_ASSET_BASE = "https://c.animaapp.com/mltdd1b04RiY6X/assets";

/* ═══════════════════════════════════════════════════════════════════════════
 *  DATA LAYER
 *  Each object represents one purchase order exactly as shown in the UI.
 *
 *  Fields
 *  ──────
 *  id          {number}  – purchase ID (monospace column)
 *  supplier    {string}  – supplier company name
 *  date        {string}  – purchase date, display-formatted ("Dec 15, 2023")
 *  itemCount   {number}  – number of distinct line items in this PO
 *  total       {string}  – formatted total with currency symbol ("£17100.00")
 *  payment     {string}  – payment method slug ("bank_transfer")
 *  status      {string}  – "completed" | "pending"  (lowercase, as in original)
 *
 *  Scalability notes
 *  ─────────────────
 *  • Add a dateISO field alongside date for sort-by-date support.
 *  • Add a totalRaw field (number) for sort-by-amount and aggregations.
 *  • To paginate: pass { page, perPage } into renderPurchaseTable().
 *  • To sort: pass { sortKey, sortDir } into renderPurchaseTable() and
 *    sort a copy of the array before iterating.
 * ═══════════════════════════════════════════════════════════════════════════ */
var purchaseData = [
  {
    id: 1,
    supplier: "Guangzhou Electronics Ltd",
    date: "Dec 15, 2023",
    dateISO: "2023-12-15",
    itemCount: 2,
    total: "£17100.00",
    totalRaw: 17100.0,
    payment: "bank_transfer",
    status: "completed",
  },
  {
    id: 2,
    supplier: "UK Accessories Distributor",
    date: "Dec 20, 2023",
    dateISO: "2023-12-20",
    itemCount: 2,
    total: "£19560.00",
    totalRaw: 19560.0,
    payment: "bank_transfer",
    status: "completed",
  },
  {
    id: 3,
    supplier: "Shenzhen Tech Wholesale",
    date: "Jan 5, 2024",
    dateISO: "2024-01-05",
    itemCount: 2,
    total: "£14490.00",
    totalRaw: 14490.0,
    payment: "bank_transfer",
    status: "completed",
  },
  {
    id: 4,
    supplier: "European Electronics GmbH",
    date: "Jan 10, 2024",
    dateISO: "2024-01-10",
    itemCount: 2,
    total: "£12660.00",
    totalRaw: 12660.0,
    payment: "bank_transfer",
    status: "completed",
  },
  {
    id: 5,
    supplier: "Power Solutions Inc",
    date: "Jan 15, 2024",
    dateISO: "2024-01-15",
    itemCount: 2,
    total: "£16350.00",
    totalRaw: 16350.0,
    payment: "bank_transfer",
    status: "completed",
  },
  {
    id: 6,
    supplier: "Screen Tech Manufacturing",
    date: "Jan 20, 2024",
    dateISO: "2024-01-20",
    itemCount: 2,
    total: "£14280.00",
    totalRaw: 14280.0,
    payment: "bank_transfer",
    status: "completed",
  },
  {
    id: 7,
    supplier: "Accessory World China",
    date: "Jan 25, 2024",
    dateISO: "2024-01-25",
    itemCount: 3,
    total: "£18690.00",
    totalRaw: 18690.0,
    payment: "bank_transfer",
    status: "completed",
  },
  {
    id: 8,
    supplier: "Guangzhou Electronics Ltd",
    date: "Feb 1, 2024",
    dateISO: "2024-02-01",
    itemCount: 1,
    total: "£8460.00",
    totalRaw: 8460.0,
    payment: "bank_transfer",
    status: "pending",
  },
  {
    id: 9,
    supplier: "UK Accessories Distributor",
    date: "Feb 5, 2024",
    dateISO: "2024-02-05",
    itemCount: 1,
    total: "£4920.00",
    totalRaw: 4920.0,
    payment: "bank_transfer",
    status: "pending",
  },
  {
    id: 10,
    supplier: "Shenzhen Tech Wholesale",
    date: "Feb 8, 2024",
    dateISO: "2024-02-08",
    itemCount: 2,
    total: "£9675.00",
    totalRaw: 9675.0,
    payment: "bank_transfer",
    status: "pending",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
 *  DERIVED STATS  (computed once at module parse-time from purchaseData)
 *
 *  These drive the four stat cards:
 *    Total Purchases  → totalPurchases
 *    Total Spent      → totalSpent    (formatted)
 *    Pending          → pending
 *    Completed        → completed
 * ═══════════════════════════════════════════════════════════════════════════ */
var purchaseStats = (function computePurchaseStats() {
  var total = purchaseData.length;
  var pending = 0;
  var completed = 0;
  var spent = 0;

  purchaseData.forEach(function (p) {
    spent += p.totalRaw;
    if (p.status === "completed") {
      completed += 1;
    } else if (p.status === "pending") {
      pending += 1;
    }
  });

  /* Format total as £NNN.00 matching the original */
  var spentFormatted = "£" + spent.toFixed(2);

  return {
    totalPurchases: total,
    totalSpent: spentFormatted,
    pending: pending,
    completed: completed,
  };
})();

/* ═══════════════════════════════════════════════════════════════════════════
 *  BADGE HELPER
 *  Returns the <span> DOM element for the Status column.
 *  Two variants match the original HTML exactly:
 *    completed → white text on green  bg-[oklch(0.627_0.194_149.214)]
 *    pending   → dark text on stone   bg-stone-50, border-transparent
 * ═══════════════════════════════════════════════════════════════════════════ */
function buildStatusBadge(status) {
  var span = document.createElement("span");

  if (status === "completed") {
    span.className =
      "text-white text-xs font-medium items-center bg-[oklch(0.627_0.194_149.214)] box-border" +
      " caret-transparent gap-x-1 inline-flex shrink-0 justify-center leading-4" +
      " outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1 text-nowrap w-fit" +
      " border overflow-hidden px-2 py-0.5 rounded-md border-solid border-transparent";
  } else {
    /* pending (and any future unknown status → treated as pending style) */
    span.className =
      "text-xs font-medium items-center bg-stone-50 box-border caret-transparent gap-x-1" +
      " inline-flex shrink-0 justify-center leading-4" +
      " outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1 text-nowrap w-fit" +
      " border overflow-hidden px-2 py-0.5 rounded-md border-solid border-transparent";
  }

  span.textContent = status;
  return span;
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  ROW BUILDER
 *  Builds one complete <tr> DOM node.
 *  All class strings are copied verbatim from the original HTML.
 *
 *  Column order:
 *    Purchase ID | Supplier | Date | Items | Total | Payment | Status | Action
 *
 *  isLastRow flag → last row has NO border-b (matches original row 10).
 * ═══════════════════════════════════════════════════════════════════════════ */
function buildPurchaseRow(item, index, totalCount) {
  var isLastRow = index === totalCount - 1;

  /* ── <tr> ─────────────────────────────────────────────────────────────── */
  var tr = document.createElement("tr");
  tr.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] align-middle" +
    (isLastRow ? "" : " border-b border-solid border-black/10");

  /* ── Purchase ID (monospace) ─────────────────────────────────────────── */
  var tdId = document.createElement("td");
  tdId.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)]" +
    " text-nowrap align-middle p-2 font-ui_monospace";
  tdId.textContent = item.id;

  /* ── Supplier (medium weight) ────────────────────────────────────────── */
  var tdSupplier = document.createElement("td");
  tdSupplier.className =
    "font-medium box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)]" +
    " text-nowrap align-middle p-2";
  tdSupplier.textContent = item.supplier;

  /* ── Date ────────────────────────────────────────────────────────────── */
  var tdDate = document.createElement("td");
  tdDate.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)]" +
    " text-nowrap align-middle p-2";
  tdDate.textContent = item.date;

  /* ── Items badge ─────────────────────────────────────────────────────── */
  var tdItems = document.createElement("td");
  tdItems.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)]" +
    " text-nowrap align-middle p-2";
  var itemsBadge = document.createElement("span");
  itemsBadge.className =
    "text-xs font-medium items-center box-border caret-transparent gap-x-1 inline-flex" +
    " shrink-0 justify-center leading-4" +
    " outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1 text-nowrap w-fit" +
    " border overflow-hidden px-2 py-0.5 rounded-md border-solid border-black/10";
  itemsBadge.textContent = item.itemCount + " items";
  tdItems.appendChild(itemsBadge);

  /* ── Total (semibold) ────────────────────────────────────────────────── */
  var tdTotal = document.createElement("td");
  tdTotal.className =
    "font-semibold box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)]" +
    " text-nowrap align-middle p-2";
  tdTotal.textContent = item.total;

  /* ── Payment ─────────────────────────────────────────────────────────── */
  var tdPayment = document.createElement("td");
  tdPayment.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)]" +
    " text-nowrap align-middle p-2";
  tdPayment.textContent = item.payment;

  /* ── Status badge ────────────────────────────────────────────────────── */
  var tdStatus = document.createElement("td");
  tdStatus.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)]" +
    " text-nowrap align-middle p-2";
  tdStatus.appendChild(buildStatusBadge(item.status));

  /* ── Action button ───────────────────────────────────────────────────── */
  var tdAction = document.createElement("td");
  tdAction.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)]" +
    " text-nowrap align-middle p-2";

  var btn = document.createElement("button");
  btn.className =
    "font-medium items-center backdrop-blur bg-[oklab(0.999994_0.0000455677_0.0000200868_/_0.6)]" +
    " caret-transparent gap-x-1.5 inline-flex shrink-0 h-8 justify-center" +
    " outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1.5 text-center text-nowrap" +
    " border border-[oklab(0.928_-0.000571842_-0.00597269_/_0.8)] px-2.5 py-0 rounded-lg border-solid";

  var btnIcon = document.createElement("img");
  btnIcon.src = PURCHASE_ASSET_BASE + "/icon-24.svg";
  btnIcon.alt = "Icon";
  btnIcon.className =
    "box-border caret-transparent shrink-0 h-4" +
    " outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] pointer-events-none text-nowrap w-4";

  btn.appendChild(btnIcon);
  tdAction.appendChild(btn);

  /* ── Assemble row ────────────────────────────────────────────────────── */
  tr.append(
    tdId,
    tdSupplier,
    tdDate,
    tdItems,
    tdTotal,
    tdPayment,
    tdStatus,
    tdAction
  );
  return tr;
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  TABLE RENDERER
 *  Populates #purchase-tbody.
 *
 *  @param {string} [filterText]   — optional live-search text (case-insensitive)
 *  @param {string} [statusFilter] — optional status filter ("completed"|"pending"|"")
 *
 *  Designed to be called:
 *    • Once on DOMContentLoaded (no args)
 *    • On every keystroke in the search input
 *    • When the status dropdown changes (future feature)
 * ═══════════════════════════════════════════════════════════════════════════ */
function renderPurchaseTable(filterText, statusFilter) {
  var tbody = document.getElementById("purchase-tbody");
  if (!tbody) return;

  /* ── Apply filters ──────────────────────────────────────────────────── */
  var data = purchaseData;

  if (filterText && filterText.trim() !== "") {
    var lc = filterText.toLowerCase();
    data = data.filter(function (p) {
      return (
        String(p.id).includes(lc) ||
        p.supplier.toLowerCase().includes(lc) ||
        p.date.toLowerCase().includes(lc) ||
        p.payment.toLowerCase().includes(lc) ||
        p.status.toLowerCase().includes(lc) ||
        p.total.toLowerCase().includes(lc)
      );
    });
  }

  if (statusFilter && statusFilter !== "") {
    data = data.filter(function (p) {
      return p.status === statusFilter.toLowerCase();
    });
  }

  /* ── Render ──────────────────────────────────────────────────────────── */
  tbody.innerHTML = "";
  var fragment = document.createDocumentFragment();
  var total = data.length;

  data.forEach(function (item, index) {
    fragment.appendChild(buildPurchaseRow(item, index, total));
  });

  tbody.appendChild(fragment);
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  STATS RENDERER
 *  Writes derived purchase summary values into the four stat card elements.
 *  IDs are declared on the HTML elements; this function is ID-driven so
 *  adding or removing a card never requires changing this function.
 * ═══════════════════════════════════════════════════════════════════════════ */
function renderPurchaseStats() {
  var mapping = {
    "purchase-stat-total": purchaseStats.totalPurchases,
    "purchase-stat-spent": purchaseStats.totalSpent,
    "purchase-stat-pending": purchaseStats.pending,
    "purchase-stat-completed": purchaseStats.completed,
  };

  Object.keys(mapping).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.textContent = mapping[id];
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  SEARCH WIRING
 *  Connects the #purchase-search input to the live-filter.
 *  Non-invasive: simply adds an "input" listener; the input itself is
 *  declared in the HTML exactly as in the original page.
 * ═══════════════════════════════════════════════════════════════════════════ */
function wirePurchaseSearch() {
  var input = document.getElementById("purchase-search");
  if (!input) return;

  input.addEventListener("input", function () {
    renderPurchaseTable(input.value);
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  ENTRY POINT
 *  Fires once DOM is ready. Only activates when #purchase-tbody exists,
 *  so this file is safe to include on any page without side-effects.
 * ═══════════════════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {
  if (!document.getElementById("purchase-tbody")) return;

  renderPurchaseTable(); /* populate table with all rows */
  renderPurchaseStats(); /* fill in the four stat cards  */
  wirePurchaseSearch(); /* wire up live-search input    */
});
