/**
 * BNM Parts — Invoices
 * InvoiceData.js
 *
 * Dedicated data file and dynamic table renderer for the Invoices page (Invoices.html).
 *
 * Architecture:
 *  - invoicesData       : Single source of truth for all invoice records.
 *  - buildStatusBadge   : Pure function — payment status string → badge element.
 *  - buildInvoiceRow    : Pure function — one data record → one <tr> element.
 *  - renderInvoicesTable: Orchestrates the full table render pass.
 *  - computeInvoiceStats: Derives summary figures from invoicesData for stat cards.
 *  - renderInvoiceStats : Writes computed stats into the DOM stat card slots.
 *
 * To add, remove, or edit an invoice, touch ONLY the invoicesData array.
 * No other code needs to change.
 *
 * Scalable for: search, filter, pagination, print, export, status update — future-ready.
 *
 * Payment status values:
 *   "paid"    — sky-600 badge with checkmark icon
 *   "pending" — amber-600 badge with clock icon
 *   "overdue" — red-600 badge with warning icon
 *   "draft"   — slate-500 badge with pencil icon
 */

/* ════════════════════════════════════════════════════════════════════════════
 *  STATUS BADGE CONFIG
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Maps each payment status to its badge background colour and icon SVG path.
 * @constant {Object}
 */
var INVOICE_STATUS_CONFIG = {
  paid: {
    bgClass: "bg-sky-600",
    iconPath: "M5 13l4 4L19 7",
  },
  pending: {
    bgClass: "bg-amber-500",
    iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  overdue: {
    bgClass: "bg-red-600",
    iconPath: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  draft: {
    bgClass: "bg-slate-500",
    iconPath:
      "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  },
};

/* ════════════════════════════════════════════════════════════════════════════
 *  DATA
 *
 *  Fields per invoice:
 *    id            {string}   — Unique invoice identifier (e.g. "INV-2024-001").
 *    customerName  {string}   — Display name of the customer / business.
 *    customerType  {string}   — "wholesaler" | "trader" | "retailer" | "individual".
 *    invoiceDate   {string}   — Pre-formatted issue date (e.g. "Jan 05, 2024").
 *    dueDate       {string}   — Pre-formatted due date (e.g. "Feb 04, 2024").
 *    products      {Array}    — Line items: [{ name, qty, unitPrice, subtotal }].
 *    subtotal      {number}   — Sum of line items before tax/discount.
 *    tax           {number}   — Tax amount applied.
 *    discount      {number}   — Discount amount deducted.
 *    totalAmount   {number}   — Final total (subtotal + tax − discount).
 *    amountPaid    {number}   — Amount already received.
 *    amountDue     {number}   — Remaining balance (totalAmount − amountPaid).
 *    status        {string}   — "paid" | "pending" | "overdue" | "draft".
 *
 *  NOTE: All 8 invoice records extracted verbatim from the original static HTML.
 *        Currency display uses £ symbol; all figures match the original markup exactly.
 * ════════════════════════════════════════════════════════════════════════════ */

/** @type {Array<Object>} */
var invoicesData = [
  /* ── Invoice 1 ──────────────────────────────────────────────────────────── */
  {
    id: "INV-2024-001",
    customerName: "ABC Electronics Wholesale",
    customerType: "wholesaler",
    invoiceDate: "Jan 05, 2024",
    dueDate: "Feb 04, 2024",
    products: [
      {
        name: "iPhone 15 Pro Max 256GB",
        qty: 10,
        unitPrice: 249.99,
        subtotal: 2499.9,
      },
      {
        name: "USB-C Charging Cable 2m",
        qty: 50,
        unitPrice: 8.79,
        subtotal: 439.5,
      },
    ],
    subtotal: 2939.4,
    tax: 0.0,
    discount: 0.0,
    totalAmount: 2939.4,
    amountPaid: 2939.4,
    amountDue: 0.0,
    status: "paid",
  },

  /* ── Invoice 2 ──────────────────────────────────────────────────────────── */
  {
    id: "INV-2024-002",
    customerName: "Tech Trading Co.",
    customerType: "trader",
    invoiceDate: "Jan 08, 2024",
    dueDate: "Feb 07, 2024",
    products: [
      {
        name: "Samsung Galaxy S24 Ultra 512GB",
        qty: 5,
        unitPrice: 349.99,
        subtotal: 1749.95,
      },
      {
        name: "Wireless Earbuds Pro",
        qty: 20,
        unitPrice: 25.44,
        subtotal: 508.75,
      },
    ],
    subtotal: 2258.7,
    tax: 0.0,
    discount: 0.0,
    totalAmount: 2258.7,
    amountPaid: 2258.7,
    amountDue: 0.0,
    status: "paid",
  },

  /* ── Invoice 3 ──────────────────────────────────────────────────────────── */
  {
    id: "INV-2024-003",
    customerName: "Gadget World Distributors",
    customerType: "wholesaler",
    invoiceDate: "Jan 12, 2024",
    dueDate: "Feb 11, 2024",
    products: [
      {
        name: 'MacBook Pro 14" M3 Pro',
        qty: 8,
        unitPrice: 749.99,
        subtotal: 5999.92,
      },
      {
        name: "Apple Magic Mouse",
        qty: 20,
        unitPrice: 68.36,
        subtotal: 1367.3,
      },
    ],
    subtotal: 7367.22,
    tax: 0.0,
    discount: 0.0,
    totalAmount: 7367.22,
    amountPaid: 0.0,
    amountDue: 7367.22,
    status: "overdue",
  },

  /* ── Invoice 4 ──────────────────────────────────────────────────────────── */
  {
    id: "INV-2024-004",
    customerName: "Mobile Plus Store",
    customerType: "retailer",
    invoiceDate: "Jan 15, 2024",
    dueDate: "Feb 14, 2024",
    products: [
      {
        name: "Screen Protector Tempered Glass Pack",
        qty: 30,
        unitPrice: 12.99,
        subtotal: 389.7,
      },
      {
        name: "Phone Case Silicone Assorted",
        qty: 40,
        unitPrice: 5.5,
        subtotal: 219.94,
      },
    ],
    subtotal: 609.64,
    tax: 0.0,
    discount: 0.0,
    totalAmount: 609.64,
    amountPaid: 609.64,
    amountDue: 0.0,
    status: "paid",
  },

  /* ── Invoice 5 ──────────────────────────────────────────────────────────── */
  {
    id: "INV-2024-005",
    customerName: "Smart Accessories Hub",
    customerType: "trader",
    invoiceDate: "Jan 18, 2024",
    dueDate: "Feb 17, 2024",
    products: [
      {
        name: "Smart Watch Series 9",
        qty: 15,
        unitPrice: 119.99,
        subtotal: 1799.85,
      },
      {
        name: "Portable Power Bank 20000mAh",
        qty: 25,
        unitPrice: 17.25,
        subtotal: 431.25,
      },
    ],
    subtotal: 2231.1,
    tax: 0.0,
    discount: 0.0,
    totalAmount: 2231.1,
    amountPaid: 0.0,
    amountDue: 2231.1,
    status: "overdue",
  },

  /* ── Invoice 6 ──────────────────────────────────────────────────────────── */
  {
    id: "INV-2024-006",
    customerName: "TechMaster Wholesale Ltd",
    customerType: "wholesaler",
    invoiceDate: "Jan 22, 2024",
    dueDate: "Feb 21, 2024",
    products: [
      {
        name: "iPad Air 5th Gen 256GB Wi-Fi",
        qty: 12,
        unitPrice: 249.99,
        subtotal: 2999.88,
      },
      {
        name: "Apple Pencil 2nd Generation",
        qty: 12,
        unitPrice: 69.89,
        subtotal: 838.68,
      },
    ],
    subtotal: 3838.56,
    tax: 0.0,
    discount: 0.0,
    totalAmount: 3838.56,
    amountPaid: 3838.56,
    amountDue: 0.0,
    status: "paid",
  },

  /* ── Invoice 7 ──────────────────────────────────────────────────────────── */
  {
    id: "INV-2024-007",
    customerName: "Sarah Johnson",
    customerType: "retailer",
    invoiceDate: "Feb 01, 2024",
    dueDate: "Feb 01, 2024",
    products: [
      {
        name: "USB Hub 7-Port USB 3.0",
        qty: 4,
        unitPrice: 14.99,
        subtotal: 59.96,
      },
      { name: "HDMI Cable 2m 4K", qty: 2, unitPrice: 9.0, subtotal: 18.0 },
    ],
    subtotal: 77.96,
    tax: 0.0,
    discount: 0.0,
    totalAmount: 77.96,
    amountPaid: 77.96,
    amountDue: 0.0,
    status: "paid",
  },

  /* ── Invoice 8 ──────────────────────────────────────────────────────────── */
  {
    id: "INV-2024-008",
    customerName: "Digital Traders UK",
    customerType: "trader",
    invoiceDate: "Feb 05, 2024",
    dueDate: "Mar 06, 2024",
    products: [
      {
        name: "Laptop Stand Adjustable Aluminium",
        qty: 20,
        unitPrice: 29.99,
        subtotal: 599.8,
      },
      {
        name: "Wireless Keyboard & Mouse Combo",
        qty: 10,
        unitPrice: 24.1,
        subtotal: 240.96,
      },
    ],
    subtotal: 840.76,
    tax: 0.0,
    discount: 0.0,
    totalAmount: 840.76,
    amountPaid: 0.0,
    amountDue: 840.76,
    status: "overdue",
  },
];

/* ════════════════════════════════════════════════════════════════════════════
 *  HELPERS
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Formats a numeric amount as a £-prefixed string with 2 decimal places.
 * @param  {number} amount
 * @returns {string}  e.g. "£2939.40"
 */
function formatCurrency(amount) {
  return "\u00A3" + amount.toFixed(2);
}

/* ════════════════════════════════════════════════════════════════════════════
 *  STATUS BADGE BUILDER
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Builds the status badge <span> element for a given payment status.
 * @param  {string} status  — "paid" | "pending" | "overdue" | "draft"
 * @returns {HTMLSpanElement}
 */
function buildStatusBadge(status) {
  var config =
    INVOICE_STATUS_CONFIG[status] || INVOICE_STATUS_CONFIG["pending"];

  var badge = document.createElement("span");
  badge.className =
    "inline-flex items-center justify-center gap-1 px-2 py-0.5 text-xs font-medium text-white " +
    config.bgClass +
    " border border-transparent rounded-md overflow-hidden";

  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "h-3 w-3");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("viewBox", "0 0 24 24");

  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("d", config.iconPath);

  svg.appendChild(path);
  badge.appendChild(svg);
  badge.appendChild(document.createTextNode(status));

  return badge;
}

/* ════════════════════════════════════════════════════════════════════════════
 *  ACTIONS BUTTON BUILDER
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Builds the three-dot actions <button> element.
 * @param  {string} invoiceId
 * @returns {HTMLButtonElement}
 */
function buildActionsButton(invoiceId) {
  var btn = document.createElement("button");
  btn.type = "button";
  btn.className =
    "inline-flex items-center justify-center h-8 px-2.5 gap-1.5 font-medium bg-transparent rounded-lg";
  btn.setAttribute("data-invoice-id", invoiceId);
  btn.setAttribute("data-action", "menu");

  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "h-4 w-4");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("viewBox", "0 0 24 24");

  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute("stroke-width", "2");
  path.setAttribute(
    "d",
    "M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
  );

  svg.appendChild(path);
  btn.appendChild(svg);

  return btn;
}

/* ════════════════════════════════════════════════════════════════════════════
 *  ROW BUILDER
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Builds a single pixel-perfect <tr> element for one invoice record.
 *
 * Column order (matches thead):
 *   1. Invoice #  — monospace semibold
 *   2. Customer   — name + type sub-label
 *   3. Issue Date — plain text
 *   4. Due Date   — plain text
 *   5. Amount     — bold currency
 *   6. Paid       — green currency
 *   7. Due        — orange currency
 *   8. Status     — coloured badge
 *   9. Actions    — three-dot button
 *
 * @param  {Object}  item   — One entry from invoicesData.
 * @param  {number}  index  — Zero-based row index.
 * @param  {number}  total  — Total number of rows (used to detect last row).
 * @returns {HTMLTableRowElement}
 */
function buildInvoiceRow(item, index, total) {
  var isLastRow = index === total - 1;

  /* ── <tr> ──────────────────────────────────────────────────────────────── */
  var tr = document.createElement("tr");
  tr.className = isLastRow ? "" : "border-b border-black/10";

  /* ── 1. Invoice # ──────────────────────────────────────────────────────── */
  var tdId = document.createElement("td");
  tdId.className = "p-2 font-semibold font-ui_monospace";
  tdId.textContent = item.id;

  /* ── 2. Customer ───────────────────────────────────────────────────────── */
  var tdCustomer = document.createElement("td");
  tdCustomer.className = "p-2";

  var custWrap = document.createElement("div");
  var custName = document.createElement("div");
  custName.className = "font-medium";
  custName.textContent = item.customerName;

  var custType = document.createElement("div");
  custType.className = "text-xs text-slate-600";
  custType.textContent = item.customerType;

  custWrap.appendChild(custName);
  custWrap.appendChild(custType);
  tdCustomer.appendChild(custWrap);

  /* ── 3. Issue Date ─────────────────────────────────────────────────────── */
  var tdIssue = document.createElement("td");
  tdIssue.className = "p-2";
  tdIssue.textContent = item.invoiceDate;

  /* ── 4. Due Date ───────────────────────────────────────────────────────── */
  var tdDue = document.createElement("td");
  tdDue.className = "p-2";
  tdDue.textContent = item.dueDate;

  /* ── 5. Total Amount ───────────────────────────────────────────────────── */
  var tdAmount = document.createElement("td");
  tdAmount.className = "p-2 font-semibold";
  tdAmount.textContent = formatCurrency(item.totalAmount);

  /* ── 6. Paid ───────────────────────────────────────────────────────────── */
  var tdPaid = document.createElement("td");
  tdPaid.className = "p-2 text-green-600";
  tdPaid.textContent = formatCurrency(item.amountPaid);

  /* ── 7. Due ────────────────────────────────────────────────────────────── */
  var tdDueAmt = document.createElement("td");
  tdDueAmt.className = "p-2 text-orange-600";
  tdDueAmt.textContent = formatCurrency(item.amountDue);

  /* ── 8. Status badge ───────────────────────────────────────────────────── */
  var tdStatus = document.createElement("td");
  tdStatus.className = "p-2";
  tdStatus.appendChild(buildStatusBadge(item.status));

  /* ── 9. Actions ────────────────────────────────────────────────────────── */
  var tdActions = document.createElement("td");
  tdActions.className = "p-2 text-right";
  tdActions.appendChild(buildActionsButton(item.id));

  /* ── Assemble row ──────────────────────────────────────────────────────── */
  tr.appendChild(tdId);
  tr.appendChild(tdCustomer);
  tr.appendChild(tdIssue);
  tr.appendChild(tdDue);
  tr.appendChild(tdAmount);
  tr.appendChild(tdPaid);
  tr.appendChild(tdDueAmt);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  return tr;
}

/* ════════════════════════════════════════════════════════════════════════════
 *  TABLE RENDERER
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Clears and fully repopulates the invoices <tbody>.
 * Uses a DocumentFragment for a single, efficient DOM insertion.
 *
 * @param {Array} [data] — Optional filtered dataset; defaults to invoicesData.
 */
function renderInvoicesTable(data) {
  var tbody = document.getElementById("invoices-tbody");
  if (!tbody) return;

  var rows = data || invoicesData;

  /* Clear any residual static markup */
  tbody.innerHTML = "";

  var fragment = document.createDocumentFragment();
  var total = rows.length;

  for (var i = 0; i < total; i++) {
    fragment.appendChild(buildInvoiceRow(rows[i], i, total));
  }

  tbody.appendChild(fragment);
}

/* ════════════════════════════════════════════════════════════════════════════
 *  STATS COMPUTATION
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Computes summary figures from invoicesData for the four stat cards.
 *
 * Returns:
 *   totalRevenue  — sum of amountPaid across all invoices
 *   outstanding   — sum of amountDue across all invoices
 *   overdue       — sum of amountDue for invoices with status "overdue"
 *   draft         — count of invoices with status "draft"
 *
 * @returns {Object}
 */
function computeInvoiceStats() {
  var totalRevenue = 0;
  var outstanding = 0;
  var overdue = 0;
  var draftCount = 0;

  for (var i = 0; i < invoicesData.length; i++) {
    var inv = invoicesData[i];
    totalRevenue += inv.amountPaid;
    outstanding += inv.amountDue;
    if (inv.status === "overdue") {
      overdue += inv.amountDue;
    }
    if (inv.status === "draft") {
      draftCount++;
    }
  }

  return {
    totalRevenue: totalRevenue,
    outstanding: outstanding,
    overdue: overdue,
    draft: draftCount,
  };
}

/**
 * Writes computed stats into the DOM stat card value slots.
 * Expects elements with IDs: stat-revenue, stat-outstanding, stat-overdue, stat-draft.
 */
function renderInvoiceStats() {
  var stats = computeInvoiceStats();

  var elRevenue = document.getElementById("stat-revenue");
  var elOutstanding = document.getElementById("stat-outstanding");
  var elOverdue = document.getElementById("stat-overdue");
  var elDraft = document.getElementById("stat-draft");

  if (elRevenue) elRevenue.textContent = formatCurrency(stats.totalRevenue);
  if (elOutstanding)
    elOutstanding.textContent = formatCurrency(stats.outstanding);
  if (elOverdue) elOverdue.textContent = formatCurrency(stats.overdue);
  if (elDraft) elDraft.textContent = stats.draft;
}

/* ════════════════════════════════════════════════════════════════════════════
 *  ENTRY POINT
 * ════════════════════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {
  renderInvoiceStats();
  renderInvoicesTable();
});
