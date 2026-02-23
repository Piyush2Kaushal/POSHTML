/**
 * BNM Parts — Warehouse Page Data & Renderer
 * ============================================
 * Provides all warehouse data in structured format and renders
 * the warehouse table dynamically via DOM manipulation.
 *
 * Usage: Include this script AFTER components.js in WarehouseManagement.html.
 *
 * Data structure:
 *   warehouseData  – array of warehouse location objects
 *   warehouseStats – summary stats for the four stat cards
 */

/* ─────────────────────────────────────────────────────────────────
 * 1.  Stats Data
 * ───────────────────────────────────────────────────────────────── */
const warehouseStats = {
  totalWarehouses: {
    count: 3,
    subtext: "3 active locations",
  },
  totalCapacity: {
    count: 22500,
    formatted: "22,500",
    subtext: "Units across all locations",
  },
  currentStock: {
    count: 14500,
    formatted: "14,500",
    subtext: "Total inventory units",
  },
  utilizationRate: {
    value: "64.4%",
    subtext: "Average capacity usage",
  },
};

/* ─────────────────────────────────────────────────────────────────
 * 2.  Warehouse Locations Data
 * ───────────────────────────────────────────────────────────────── */
const warehouseData = [
  {
    name: "Main Distribution Center",
    code: "MDC-UK",
    city: "London",
    country: "United Kingdom",
    manager: "John Smith",
    phone: "+44 20 1234 5678",
    email: "j.smith@bnmparts.com",
    capacity: 10000,
    capacityFormatted: "10,000",
    currentStock: 6500,
    currentStockFormatted: "6,500",
    utilization: 65,
    status: "active",
    isLastRow: false,
  },
  {
    name: "North Regional Hub",
    code: "NRH-UK",
    city: "Manchester",
    country: "United Kingdom",
    manager: "Sarah Johnson",
    phone: "+44 161 234 5678",
    email: "s.johnson@bnmparts.com",
    capacity: 5000,
    capacityFormatted: "5,000",
    currentStock: 3200,
    currentStockFormatted: "3,200",
    utilization: 64,
    status: "active",
    isLastRow: false,
  },
  {
    name: "South Storage Facility",
    code: "SSF-UK",
    city: "Birmingham",
    country: "United Kingdom",
    manager: "Michael Brown",
    phone: "+44 121 234 5678",
    email: "m.brown@bnmparts.com",
    capacity: 7500,
    capacityFormatted: "7,500",
    currentStock: 4800,
    currentStockFormatted: "4,800",
    utilization: 64,
    status: "active",
    isLastRow: true,
  },
];

/* ─────────────────────────────────────────────────────────────────
 * 3.  Renderer Utilities
 * ───────────────────────────────────────────────────────────────── */

/**
 * Returns the status badge HTML.
 * Currently only "active" is used but structured for extensibility.
 */
function getStatusBadge(status) {
  const statusConfig = {
    active: {
      bg: "bg-[oklch(0.723_0.219_149.579)]",
      label: "active",
    },
    inactive: {
      bg: "bg-[oklch(0.551_0.027_264.364)]",
      label: "inactive",
    },
    maintenance: {
      bg: "bg-[oklch(0.705_0.213_47.604)]",
      label: "maintenance",
    },
  };

  const cfg = statusConfig[status] || statusConfig["active"];

  return `<span class="text-white text-xs font-medium items-center ${cfg.bg} box-border caret-transparent gap-x-1 inline-flex shrink-0 justify-center leading-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1 text-nowrap w-fit border overflow-hidden px-2 py-0.5 rounded-md border-solid border-transparent">${cfg.label}</span>`;
}

/**
 * Returns the utilization progress bar HTML.
 * Uses the same orange progress bar color as the original.
 */
function getUtilizationBar(percentage) {
  return `
    <div class="items-center box-border caret-transparent gap-x-2 flex justify-end outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-2 text-nowrap">
      <div class="bg-[oklch(0.928_0.006_264.531)] box-border caret-transparent h-2 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap w-20 overflow-hidden rounded-[3.35544e+07px]">
        <div class="bg-[oklch(0.705_0.213_47.604)] box-border caret-transparent h-full outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap rounded-[3.35544e+07px] progress-bar" style="width: ${percentage}%"></div>
      </div>
      <span class="font-medium box-border caret-transparent block outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap">${percentage}%</span>
    </div>`;
}

/**
 * Renders a single warehouse table row.
 * @param {Object} warehouse - Warehouse data object
 * @returns {string} - HTML string for <tr>
 */
function renderWarehouseRow(warehouse) {
  /* Last row has no bottom border (matches original Row 3 class) */
  const trClass = warehouse.isLastRow
    ? "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] align-middle transition-all hover:bg-zinc-50"
    : "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] align-middle border-b border-solid border-black/10 transition-all hover:bg-zinc-50";

  return `
    <tr class="${trClass}">
      <!-- Warehouse Name & Code -->
      <td class="box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2">
        <div class="box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap">
          <p class="font-medium box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap">${
            warehouse.name
          }</p>
          <p class="text-[oklch(0.551_0.027_264.364)] text-xs box-border caret-transparent leading-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap">${
            warehouse.code
          }</p>
        </div>
      </td>

      <!-- Location -->
      <td class="box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2">
        <div class="items-center box-border caret-transparent gap-x-2 flex outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-2 text-nowrap">
          <img src="https://c.animaapp.com/mltc94xgw7LC6g/assets/icon-30.svg" alt="Icon" class="text-[oklch(0.707_0.022_261.325)] box-border caret-transparent h-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap w-4" />
          <div class="box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap">
            <p class="box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap">${
              warehouse.city
            }</p>
            <p class="text-[oklch(0.551_0.027_264.364)] text-xs box-border caret-transparent leading-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap">${
              warehouse.country
            }</p>
          </div>
        </div>
      </td>

      <!-- Manager -->
      <td class="box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2">${
        warehouse.manager
      }</td>

      <!-- Contact -->
      <td class="box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2">
        <div class="box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap">
          <p class="box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap">${
            warehouse.phone
          }</p>
          <p class="text-[oklch(0.551_0.027_264.364)] text-xs box-border caret-transparent leading-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap">
            <a href="mailto:${warehouse.email}">${warehouse.email}</a>
          </p>
        </div>
      </td>

      <!-- Capacity -->
      <td class="font-semibold box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-right text-nowrap align-middle p-2">${
        warehouse.capacityFormatted
      }</td>

      <!-- Current Stock -->
      <td class="box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-right text-nowrap align-middle p-2">${
        warehouse.currentStockFormatted
      }</td>

      <!-- Utilization -->
      <td class="box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-right text-nowrap align-middle p-2">
        ${getUtilizationBar(warehouse.utilization)}
      </td>

      <!-- Status -->
      <td class="box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2">
        ${getStatusBadge(warehouse.status)}
      </td>

      <!-- Actions -->
      <td class="box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2">
        <div class="box-border caret-transparent gap-x-1 flex outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1 text-nowrap">
          <button class="font-medium items-center bg-transparent caret-transparent gap-x-1.5 flex shrink-0 h-8 justify-center outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1.5 text-center text-nowrap px-2.5 py-0 rounded-lg transition-all hover:bg-zinc-100 active:scale-95">
            <img src="https://c.animaapp.com/mltc94xgw7LC6g/assets/icon-31.svg" alt="Icon" class="box-border caret-transparent shrink-0 h-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] pointer-events-none text-nowrap w-4" />
          </button>
          <button class="text-[oklch(0.577_0.245_27.325)] font-medium items-center bg-transparent caret-transparent gap-x-1.5 flex shrink-0 h-8 justify-center outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1.5 text-center text-nowrap px-2.5 py-0 rounded-lg transition-all hover:bg-red-50 active:scale-95">
            <img src="https://c.animaapp.com/mltc94xgw7LC6g/assets/icon-32.svg" alt="Icon" class="box-border caret-transparent shrink-0 h-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] pointer-events-none text-nowrap w-4" />
          </button>
        </div>
      </td>
    </tr>`;
}

/* ─────────────────────────────────────────────────────────────────
 * 4.  Stats Renderer
 * ───────────────────────────────────────────────────────────────── */

/**
 * Populates the four stat card values from warehouseStats data.
 * IDs are set on the value containers in WarehouseManagement.html.
 */
function renderWarehouseStats() {
  var totalWarehousesEl = document.getElementById("stat-total-warehouses");
  var totalWarehousesSubEl = document.getElementById(
    "stat-total-warehouses-sub"
  );
  var totalCapacityEl = document.getElementById("stat-total-capacity");
  var totalCapacitySubEl = document.getElementById("stat-total-capacity-sub");
  var currentStockEl = document.getElementById("stat-current-stock");
  var currentStockSubEl = document.getElementById("stat-current-stock-sub");
  var utilizationEl = document.getElementById("stat-utilization");
  var utilizationSubEl = document.getElementById("stat-utilization-sub");

  if (totalWarehousesEl) {
    totalWarehousesEl.textContent = warehouseStats.totalWarehouses.count;
    totalWarehousesEl.setAttribute(
      "data-count",
      warehouseStats.totalWarehouses.count
    );
  }
  if (totalWarehousesSubEl)
    totalWarehousesSubEl.textContent = warehouseStats.totalWarehouses.subtext;

  if (totalCapacityEl) {
    totalCapacityEl.textContent = warehouseStats.totalCapacity.formatted;
    totalCapacityEl.setAttribute(
      "data-count",
      warehouseStats.totalCapacity.count
    );
  }
  if (totalCapacitySubEl)
    totalCapacitySubEl.textContent = warehouseStats.totalCapacity.subtext;

  if (currentStockEl) {
    currentStockEl.textContent = warehouseStats.currentStock.formatted;
    currentStockEl.setAttribute(
      "data-count",
      warehouseStats.currentStock.count
    );
  }
  if (currentStockSubEl)
    currentStockSubEl.textContent = warehouseStats.currentStock.subtext;

  if (utilizationEl)
    utilizationEl.textContent = warehouseStats.utilizationRate.value;
  if (utilizationSubEl)
    utilizationSubEl.textContent = warehouseStats.utilizationRate.subtext;
}

/* ─────────────────────────────────────────────────────────────────
 * 5.  Table Renderer
 * ───────────────────────────────────────────────────────────────── */

/**
 * Renders all warehouse rows into the #warehouse-tbody element.
 * Supports live filtering via the search input.
 */
function renderWarehouseTable(filterText) {
  var tbody = document.getElementById("warehouse-tbody");
  if (!tbody) return;

  var filtered = warehouseData;

  if (filterText && filterText.trim() !== "") {
    var lc = filterText.toLowerCase();
    filtered = warehouseData.filter(function (w) {
      return (
        w.name.toLowerCase().indexOf(lc) !== -1 ||
        w.code.toLowerCase().indexOf(lc) !== -1 ||
        w.city.toLowerCase().indexOf(lc) !== -1 ||
        w.country.toLowerCase().indexOf(lc) !== -1 ||
        w.manager.toLowerCase().indexOf(lc) !== -1 ||
        w.status.toLowerCase().indexOf(lc) !== -1
      );
    });
  }

  /* Re-apply isLastRow correctly after filtering */
  var rows = filtered.map(function (w, i) {
    var clone = Object.assign({}, w, { isLastRow: i === filtered.length - 1 });
    return renderWarehouseRow(clone);
  });

  tbody.innerHTML = rows.join("");
}

/* ─────────────────────────────────────────────────────────────────
 * 6.  Count-up Animation
 *     Matches the original page's animateCount() pattern.
 * ───────────────────────────────────────────────────────────────── */
function animateWarehouseCounts() {
  var countEls = document.querySelectorAll("[data-count]");
  countEls.forEach(function (el) {
    var raw = el.getAttribute("data-count");
    var target = parseInt(raw, 10);
    if (isNaN(target)) return;

    var duration = 1500;
    var step = target / (duration / 16);
    var current = 0;

    var timer = setInterval(function () {
      current += step;
      if (current >= target) {
        clearInterval(timer);
        /* Format with locale commas */
        el.textContent = target.toLocaleString();
      } else {
        el.textContent = Math.floor(current).toLocaleString();
      }
    }, 16);
  });
}

/* ─────────────────────────────────────────────────────────────────
 * 7.  Search Input Wire-up
 * ───────────────────────────────────────────────────────────────── */
function wireWarehouseSearch() {
  var searchInput = document.getElementById("warehouse-search");
  if (!searchInput) return;

  searchInput.addEventListener("input", function () {
    renderWarehouseTable(searchInput.value);
  });
}

/* ─────────────────────────────────────────────────────────────────
 * 8.  Initialisation
 * ───────────────────────────────────────────────────────────────── */
(function init() {
  function run() {
    renderWarehouseStats();
    renderWarehouseTable("");
    animateWarehouseCounts();
    wireWarehouseSearch();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
