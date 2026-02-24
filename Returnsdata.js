/**
 * BNM Parts — Return Management
 * ReturnsData.js
 *
 * Dedicated data file and dynamic table renderer for the Return Management page
 * (ReturnManagement.html).
 *
 * Architecture:
 *  - returnsData          : Single source of truth for all return records.
 *  - RETURN_STATUS_CONFIG : Status → badge appearance mapping.
 *  - buildStatusBadge     : Pure function — status string → badge <span> element.
 *  - buildActionButtons   : Pure function — status string → action buttons for that row.
 *  - buildReturnRow       : Pure function — one data record → one <tr> element.
 *  - computeReturnStats   : Derives summary figures from returnsData.
 *  - renderReturnStats    : Writes computed stats into the DOM stat card slots.
 *  - renderReturnsTable   : Orchestrates the full table render pass.
 *
 * To add, remove, or edit a return, touch ONLY the returnsData array.
 * No other code needs to change.
 *
 * Scalable for: filter by status, search, refund handling, reports,
 *               pagination, export — fully future-ready.
 *
 * Status values:
 *   "approved"  — sky-600 badge with checkmark icon
 *   "pending"   — stone-50 bg / amber-600 clock icon (no text colour override)
 *   "rejected"  — red-600 badge with X icon
 *   "completed" — green-600 badge with checkmark icon
 *
 * Return reason values (display label shown verbatim):
 *   "Defective" | "Wrong Item" | "Customer Request" | "Not As_described" | etc.
 */

"use strict";

/* ════════════════════════════════════════════════════════════════════════════
 *  STATUS BADGE CONFIG
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Maps each return status to its visual badge configuration.
 * @constant {Object}
 */
var RETURN_STATUS_CONFIG = {
  approved: {
    wrapperClass:
      "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-white bg-sky-600 border border-transparent rounded-md overflow-hidden whitespace-nowrap",
    iconPath: "M5 13l4 4L19 7",
    iconClass: "w-3 h-3",
    label: "approved",
  },
  pending: {
    wrapperClass:
      "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-stone-50 border border-transparent rounded-md overflow-hidden whitespace-nowrap",
    iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    iconClass: "w-3 h-3 text-amber-600",
    label: "pending",
  },
  rejected: {
    wrapperClass:
      "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-white bg-red-600 border border-transparent rounded-md overflow-hidden whitespace-nowrap",
    iconPath: "M6 18L18 6M6 6l12 12",
    iconClass: "w-3 h-3",
    label: "rejected",
  },
  completed: {
    wrapperClass:
      "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-white bg-green-600 border border-transparent rounded-md overflow-hidden whitespace-nowrap",
    iconPath: "M5 13l4 4L19 7",
    iconClass: "w-3 h-3",
    label: "completed",
  },
};

/* ════════════════════════════════════════════════════════════════════════════
 *  DATA
 *
 *  Fields per return record:
 *    returnId      {string}  — Unique return identifier  (e.g. "RET-2024-001").
 *    invoiceId     {string}  — Referenced invoice ID     (e.g. "INV-2024-001").
 *    customerName  {string}  — Display name of the customer.
 *    productName   {string}  — Name of the returned product.
 *    quantity      {number}  — Number of units returned.
 *    returnDate    {string}  — Human-readable date       (e.g. "Jan 20, 2024").
 *    reason        {string}  — Return reason label shown verbatim in the badge.
 *    refundAmount  {string}  — Formatted refund amount   (e.g. "£125.94").
 *    status        {string}  — "approved" | "pending" | "rejected" | "completed".
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Master returns data array.
 * Add or remove objects here to control what appears on the page.
 * @type {Array<Object>}
 */
var returnsData = [
  {
    returnId: "RET-2024-001",
    invoiceId: "INV-2024-001",
    customerName: "ABC Electronics Wholesale",
    productName: "USB-C Hub 7-Port",
    quantity: 1,
    returnDate: "Jan 20, 2024",
    reason: "Defective",
    refundAmount: "£125.94",
    status: "approved",
  },
  {
    returnId: "RET-2024-002",
    invoiceId: "INV-2024-002",
    customerName: "Tech Trading Co.",
    productName: "Wireless Keyboard MK550",
    quantity: 1,
    returnDate: "Jan 25, 2024",
    reason: "Wrong Item",
    refundAmount: "£81.58",
    status: "approved",
  },
  {
    returnId: "RET-2024-003",
    invoiceId: "INV-2024-004",
    customerName: "Mobile Plus Store",
    productName: "Bluetooth Speaker Pro",
    quantity: 1,
    returnDate: "Feb 01, 2024",
    reason: "Customer Request",
    refundAmount: "£35.96",
    status: "pending",
  },
  {
    returnId: "RET-2024-004",
    invoiceId: "INV-2024-006",
    customerName: "TechMaster Wholesale Ltd",
    productName: "Gaming Mouse RGB",
    quantity: 1,
    returnDate: "Feb 05, 2024",
    reason: "Defective",
    refundAmount: "£109.08",
    status: "approved",
  },
  {
    returnId: "RET-2024-005",
    invoiceId: "INV-2024-007",
    customerName: "Sarah Johnson",
    productName: "HDMI Cable 2m",
    quantity: 1,
    returnDate: "Feb 08, 2024",
    reason: "Not As_described",
    refundAmount: "£29.99",
    status: "rejected",
  },
];

/* ════════════════════════════════════════════════════════════════════════════
 *  PURE BUILDER FUNCTIONS
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Builds a status badge <span> for a given status string.
 * Pixel-perfect match to the static HTML badge structure.
 *
 * @param  {string} status — One of the RETURN_STATUS_CONFIG keys.
 * @returns {HTMLElement}
 */
function buildStatusBadge(status) {
  var cfg = RETURN_STATUS_CONFIG[status] || RETURN_STATUS_CONFIG["pending"];

  var span = document.createElement("span");
  span.className = cfg.wrapperClass;

  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", cfg.iconClass);
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("viewBox", "0 0 24 24");

  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("d", cfg.iconPath);

  svg.appendChild(path);
  span.appendChild(svg);
  span.appendChild(document.createTextNode(" " + cfg.label));

  return span;
}

/**
 * Builds the action button cell content for a given status.
 * Mirrors the exact button set the original static HTML showed per status:
 *   approved  → View + Complete
 *   pending   → View + Approve (green) + Reject (red)
 *   rejected  → View only
 *   completed → View only
 *
 * @param  {string} returnId
 * @param  {string} status
 * @returns {HTMLElement} — wrapper <div> containing the buttons
 */
function buildActionButtons(returnId, status) {
  var wrap = document.createElement("div");
  wrap.className = "flex items-center justify-end gap-2 whitespace-nowrap";

  /* ── View button (always present) ── */
  var viewBtn = document.createElement("button");
  viewBtn.className =
    "flex items-center justify-center gap-1.5 h-8 px-2.5 font-medium backdrop-blur bg-white/60 border border-slate-200/80 rounded-lg";
  viewBtn.dataset.action = "view";
  viewBtn.dataset.returnId = returnId;
  viewBtn.innerHTML =
    '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>' +
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>' +
    "</svg>";
  wrap.appendChild(viewBtn);

  if (status === "approved") {
    /* Complete button */
    var completeBtn = document.createElement("button");
    completeBtn.className =
      "flex items-center justify-center gap-1.5 h-8 px-2.5 font-medium text-white bg-blue-600 shadow-sm rounded-lg";
    completeBtn.dataset.action = "complete";
    completeBtn.dataset.returnId = returnId;
    completeBtn.innerHTML =
      '<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>' +
      "</svg>Complete";
    wrap.appendChild(completeBtn);
  } else if (status === "pending") {
    /* Approve button */
    var approveBtn = document.createElement("button");
    approveBtn.className =
      "flex items-center justify-center gap-1.5 h-8 px-2.5 font-medium text-white bg-green-600 shadow-sm rounded-lg";
    approveBtn.dataset.action = "approve";
    approveBtn.dataset.returnId = returnId;
    approveBtn.innerHTML =
      '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>' +
      "</svg>";
    wrap.appendChild(approveBtn);

    /* Reject button */
    var rejectBtn = document.createElement("button");
    rejectBtn.className =
      "flex items-center justify-center gap-1.5 h-8 px-2.5 font-medium text-white bg-red-600 shadow-sm rounded-lg";
    rejectBtn.dataset.action = "reject";
    rejectBtn.dataset.returnId = returnId;
    rejectBtn.innerHTML =
      '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>' +
      "</svg>";
    wrap.appendChild(rejectBtn);
  }
  /* rejected / completed → view button only (already appended above) */

  return wrap;
}

/**
 * Builds a complete <tr> element from one return data record.
 * Pixel-perfect replica of the static HTML row structure.
 *
 * @param  {Object}  ret      — One object from returnsData.
 * @param  {boolean} isLast   — When true, omits the bottom border class.
 * @returns {HTMLTableRowElement}
 */
function buildReturnRow(ret, isLast) {
  var tr = document.createElement("tr");
  tr.className = isLast ? "" : "border-b border-black/10";
  tr.dataset.returnId = ret.returnId;

  /* — Return ID — */
  var tdRetId = document.createElement("td");
  tdRetId.className = "p-2 font-semibold whitespace-nowrap font-mono";
  tdRetId.textContent = ret.returnId;
  tr.appendChild(tdRetId);

  /* — Invoice ID — */
  var tdInvId = document.createElement("td");
  tdInvId.className = "p-2 whitespace-nowrap font-mono";
  tdInvId.textContent = ret.invoiceId;
  tr.appendChild(tdInvId);

  /* — Customer name — */
  var tdCustomer = document.createElement("td");
  tdCustomer.className = "p-2 font-medium whitespace-nowrap";
  tdCustomer.textContent = ret.customerName;
  tr.appendChild(tdCustomer);

  /* — Items badge — */
  var tdItems = document.createElement("td");
  tdItems.className = "p-2 whitespace-nowrap";
  var itemsBadge = document.createElement("span");
  itemsBadge.className =
    "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium border border-black/10 rounded-md overflow-hidden whitespace-nowrap";
  itemsBadge.textContent = ret.quantity + " items";
  tdItems.appendChild(itemsBadge);
  tr.appendChild(tdItems);

  /* — Return date — */
  var tdDate = document.createElement("td");
  tdDate.className = "p-2 whitespace-nowrap";
  tdDate.textContent = ret.returnDate;
  tr.appendChild(tdDate);

  /* — Reason badge — */
  var tdReason = document.createElement("td");
  tdReason.className = "p-2 whitespace-nowrap";
  var reasonBadge = document.createElement("span");
  reasonBadge.className =
    "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium capitalize border border-black/10 rounded-md overflow-hidden whitespace-nowrap";
  reasonBadge.textContent = ret.reason;
  tdReason.appendChild(reasonBadge);
  tr.appendChild(tdReason);

  /* — Refund amount — */
  var tdRefund = document.createElement("td");
  tdRefund.className =
    "p-2 text-right font-semibold text-red-600 whitespace-nowrap";
  tdRefund.textContent = ret.refundAmount;
  tr.appendChild(tdRefund);

  /* — Status badge — */
  var tdStatus = document.createElement("td");
  tdStatus.className = "p-2 whitespace-nowrap";
  tdStatus.appendChild(buildStatusBadge(ret.status));
  tr.appendChild(tdStatus);

  /* — Actions — */
  var tdActions = document.createElement("td");
  tdActions.className = "p-2 text-right whitespace-nowrap";
  tdActions.appendChild(buildActionButtons(ret.returnId, ret.status));
  tr.appendChild(tdActions);

  return tr;
}

/* ════════════════════════════════════════════════════════════════════════════
 *  STATS COMPUTATION
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Derives summary figures from the current returnsData array.
 * @returns {{ total: number, pending: number, completed: number, totalRefunded: string }}
 */
function computeReturnStats() {
  var total = returnsData.length;
  var pending = 0;
  var completed = 0;
  var refundedPence = 0;

  returnsData.forEach(function (ret) {
    if (ret.status === "pending") pending++;
    if (ret.status === "completed") completed++;

    /* Parse refund amount — strip currency symbol and commas, then multiply ×100 */
    if (ret.status === "completed") {
      var raw = ret.refundAmount.replace(/[^0-9.]/g, "");
      refundedPence += Math.round(parseFloat(raw) * 100);
    }
  });

  var refundedFormatted =
    "£" +
    (refundedPence / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return {
    total: total,
    pending: pending,
    completed: completed,
    totalRefunded: refundedFormatted,
  };
}

/**
 * Writes computed stats into the DOM stat card value slots.
 * Targets elements with IDs: stat-total, stat-pending, stat-completed, stat-refunded.
 */
function renderReturnStats() {
  var stats = computeReturnStats();

  var elTotal = document.getElementById("stat-total");
  var elPending = document.getElementById("stat-pending");
  var elCompleted = document.getElementById("stat-completed");
  var elRefunded = document.getElementById("stat-refunded");

  if (elTotal) elTotal.textContent = stats.total;
  if (elPending) elPending.textContent = stats.pending;
  if (elCompleted) elCompleted.textContent = stats.completed;
  if (elRefunded) elRefunded.textContent = stats.totalRefunded;
}

/* ════════════════════════════════════════════════════════════════════════════
 *  TABLE RENDERER
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Clears the returns table <tbody> and re-renders all rows from returnsData.
 * Targets the element with id="returns-tbody".
 *
 * @param {Array<Object>} [dataset] — Optional filtered subset; defaults to returnsData.
 */
function renderReturnsTable(dataset) {
  var data = dataset || returnsData;
  var tbody = document.getElementById("returns-tbody");

  if (!tbody) {
    console.warn("ReturnsData.js: #returns-tbody element not found in page.");
    return;
  }

  tbody.innerHTML = "";

  if (!data || data.length === 0) {
    var emptyRow = document.createElement("tr");
    var emptyCell = document.createElement("td");
    emptyCell.colSpan = 9;
    emptyCell.className = "p-6 text-center text-sm text-slate-400";
    emptyCell.textContent = "No returns found.";
    emptyRow.appendChild(emptyCell);
    tbody.appendChild(emptyRow);
    return;
  }

  data.forEach(function (ret, idx) {
    var isLast = idx === data.length - 1;
    tbody.appendChild(buildReturnRow(ret, isLast));
  });
}

/* ════════════════════════════════════════════════════════════════════════════
 *  SEARCH & FILTER  (future-ready, hooked to existing DOM inputs)
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Filters returnsData by search text (across returnId, invoiceId, customerName)
 * and/or by status, then re-renders the table.
 *
 * @param {string} searchText
 * @param {string} statusFilter — "" means "All Status"
 */
function filterAndRender(searchText, statusFilter) {
  var q = (searchText || "").toLowerCase().trim();
  var s = (statusFilter || "").toLowerCase().trim();

  var filtered = returnsData.filter(function (ret) {
    var matchesSearch =
      !q ||
      ret.returnId.toLowerCase().includes(q) ||
      ret.invoiceId.toLowerCase().includes(q) ||
      ret.customerName.toLowerCase().includes(q) ||
      ret.reason.toLowerCase().includes(q);

    var matchesStatus = !s || s === "all status" || ret.status === s;

    return matchesSearch && matchesStatus;
  });

  renderReturnsTable(filtered);
}

/* ════════════════════════════════════════════════════════════════════════════
 *  ACTION HANDLERS  (wired via event delegation — stubs ready for real logic)
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Approves a pending return and re-renders.
 * @param {string} returnId
 */
function onReturnApprove(returnId) {
  var ret = returnsData.find(function (r) {
    return r.returnId === returnId;
  });
  if (!ret || ret.status !== "pending") return;
  ret.status = "approved";
  renderReturnsTable();
  renderReturnStats();
  console.log("[Returns] Approved:", returnId);
}

/**
 * Rejects a pending return and re-renders.
 * @param {string} returnId
 */
function onReturnReject(returnId) {
  var ret = returnsData.find(function (r) {
    return r.returnId === returnId;
  });
  if (!ret || ret.status !== "pending") return;
  ret.status = "rejected";
  renderReturnsTable();
  renderReturnStats();
  console.log("[Returns] Rejected:", returnId);
}

/**
 * Marks an approved return as completed and re-renders.
 * @param {string} returnId
 */
function onReturnComplete(returnId) {
  var ret = returnsData.find(function (r) {
    return r.returnId === returnId;
  });
  if (!ret || ret.status !== "approved") return;
  ret.status = "completed";
  renderReturnsTable();
  renderReturnStats();
  console.log("[Returns] Completed:", returnId);
}

/**
 * Opens the view/detail panel for a return (stub — implement modal/nav as needed).
 * @param {string} returnId
 */
function onReturnView(returnId) {
  console.log("[Returns] View requested:", returnId);
  /* TODO: open detail modal or navigate to detail page */
}

/* ════════════════════════════════════════════════════════════════════════════
 *  BOOTSTRAP — wire up everything once DOM is ready
 * ════════════════════════════════════════════════════════════════════════════ */

(function bootstrap() {
  function init() {
    /* Initial render */
    renderReturnsTable();
    renderReturnStats();

    /* ── Event delegation on <tbody> for action buttons ── */
    var tbody = document.getElementById("returns-tbody");
    if (tbody) {
      tbody.addEventListener("click", function (e) {
        var btn = e.target.closest("button[data-action]");
        if (!btn) return;
        var action = btn.dataset.action;
        var rid = btn.dataset.returnId;
        if (action === "view") onReturnView(rid);
        else if (action === "approve") onReturnApprove(rid);
        else if (action === "reject") onReturnReject(rid);
        else if (action === "complete") onReturnComplete(rid);
      });
    }

    /* ── Search input — live filter ── */
    var searchInput = document.getElementById("returns-search");
    var statusSelect = document.getElementById("returns-status-filter");

    function applyFilters() {
      filterAndRender(
        searchInput ? searchInput.value : "",
        statusSelect ? statusSelect.value : "",
      );
    }

    if (searchInput) {
      searchInput.addEventListener("input", applyFilters);
    }
    if (statusSelect) {
      statusSelect.addEventListener("change", applyFilters);
    }

    /* ── Create Return button ── */
    var createBtn = document.getElementById("create-return-btn");
    if (createBtn) {
      createBtn.addEventListener("click", function () {
        console.log("[Returns] Create Return clicked — implement modal/nav.");
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
