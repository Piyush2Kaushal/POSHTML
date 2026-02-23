/**
 * BNM Parts — Customer Management
 * CustomerData.js
 *
 * Dedicated data file and dynamic table renderer for the
 * Customer Management page (CustomerManagement.html).
 *
 * Architecture:
 *  - customersData     : Single source of truth for all customer records.
 *  - buildCustomerRow  : Pure function — one data record → one <tr> element.
 *  - renderCustomersTable : Orchestrates the full table render pass.
 *
 * To add, remove, or edit a customer, touch ONLY the customersData array.
 * No other code needs to change.
 *
 * Scalable for: search, filter, pagination, edit, delete — future-ready.
 *
 * Asset base for this page's Anima CDN folder.
 * (Used for the edit and delete button icons.)
 */

/* ════════════════════════════════════════════════════════════════════════════
 *  CONFIGURATION
 * ════════════════════════════════════════════════════════════════════════════ */

/** @constant {string} CDN prefix for all icon assets on this page. */
var CUST_ASSET_BASE = "https://c.animaapp.com/mltdg2foRe7mQ1/assets";

/* ════════════════════════════════════════════════════════════════════════════
 *  TYPE BADGE CONFIG
 *
 *  Each customer "type" maps to a specific badge style used in the UI.
 *    wholesaler  — white text, sky-600 background, transparent border
 *    trader      — default text, stone-50 background, transparent border
 *    retailer    — default text, plain background, border-black/10
 * ════════════════════════════════════════════════════════════════════════════ */

/** @constant {Object} Badge class map per customer type. */
var TYPE_BADGE_CLASSES = {
  wholesaler:
    "text-white text-xs font-medium items-center bg-sky-600 box-border caret-transparent gap-x-1 inline-flex shrink-0 justify-center leading-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1 capitalize text-nowrap w-fit border overflow-hidden px-2 py-0.5 rounded-md border-solid border-transparent",
  trader:
    "text-xs font-medium items-center bg-stone-50 box-border caret-transparent gap-x-1 inline-flex shrink-0 justify-center leading-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1 capitalize text-nowrap w-fit border overflow-hidden px-2 py-0.5 rounded-md border-solid border-transparent",
  retailer:
    "text-xs font-medium items-center box-border caret-transparent gap-x-1 inline-flex shrink-0 justify-center leading-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1 capitalize text-nowrap w-fit border overflow-hidden px-2 py-0.5 rounded-md border-solid border-black/10",
};

/* ════════════════════════════════════════════════════════════════════════════
 *  DATA
 *
 *  Fields:
 *    id            {string}  — Unique customer identifier (e.g. "CUST-001").
 *    name          {string}  — Display name of the customer / business.
 *    type          {string}  — "wholesaler" | "trader" | "retailer".
 *    phone         {string}  — Contact phone number.
 *    email         {string}  — Contact email address.
 *    creditBalance {string}  — Pre-formatted credit balance (e.g. "£1250.50").
 *    joined        {string}  — Pre-formatted join date (e.g. "Jan 15, 2023").
 *    city          {string}  — City of operation (for future filter/search use).
 *    address       {string}  — Full street address (for future use).
 *    status        {string}  — "active" | "inactive" (for future filter use).
 *
 *  NOTE: All 25 customer records extracted verbatim from the original static HTML.
 *        Count breakdown: 5 wholesalers, 6 traders, 14 retailers (matches stat cards).
 * ════════════════════════════════════════════════════════════════════════════ */

/** @type {Array<Object>} */
var customersData = [
  /* ── Wholesalers (5) ─────────────────────────────────────────────────── */
  {
    id: "CUST-001",
    name: "ABC Electronics Wholesale",
    type: "wholesaler",
    phone: "+44 20 7123 4567",
    email: "info@abcelectronics.co.uk",
    creditBalance: "£1250.50",
    joined: "Jan 15, 2023",
    city: "London",
    address: "12 Trade Park, London",
    status: "active",
  },
  {
    id: "CUST-002",
    name: "TechMaster Wholesale Ltd",
    type: "wholesaler",
    phone: "+44 121 234 5678",
    email: "orders@techmaster.co.uk",
    creditBalance: "£2150.00",
    joined: "Feb 10, 2023",
    city: "Birmingham",
    address: "45 Wholesale Row, Birmingham",
    status: "active",
  },
  {
    id: "CUST-003",
    name: "Mobile Accessories Direct",
    type: "wholesaler",
    phone: "+44 113 987 6543",
    email: "sales@mobileaccessoriesdirect.com",
    creditBalance: "£875.25",
    joined: "Mar 5, 2023",
    city: "Leeds",
    address: "7 Distribution Way, Leeds",
    status: "active",
  },
  {
    id: "CUST-004",
    name: "Gadget World Distributors",
    type: "wholesaler",
    phone: "+44 161 456 7890",
    email: "contact@gadgetworld.co.uk",
    creditBalance: "£3400.75",
    joined: "Jan 25, 2023",
    city: "Manchester",
    address: "99 Gadget Lane, Manchester",
    status: "active",
  },
  {
    id: "CUST-005",
    name: "Global Parts Supply",
    type: "wholesaler",
    phone: "+44 117 555 6666",
    email: "supply@globalparts.co.uk",
    creditBalance: "£5200.00",
    joined: "Dec 1, 2022",
    city: "Bristol",
    address: "3 Import Quarter, Bristol",
    status: "active",
  },

  /* ── Traders (6) ─────────────────────────────────────────────────────── */
  {
    id: "CUST-006",
    name: "Edinburgh Parts Traders",
    type: "trader",
    phone: "+44 131 222 3333",
    email: "hello@edinburghparts.co.uk",
    creditBalance: "£890.00",
    joined: "Mar 12, 2023",
    city: "Edinburgh",
    address: "22 Market Street, Edinburgh",
    status: "active",
  },
  {
    id: "CUST-007",
    name: "Mobile Gear Traders",
    type: "trader",
    phone: "+44 29 2012 3456",
    email: "trade@mobilegear.co.uk",
    creditBalance: "£456.75",
    joined: "Apr 1, 2023",
    city: "Cardiff",
    address: "5 Trade Road, Cardiff",
    status: "active",
  },
  {
    id: "CUST-008",
    name: "Tech Solutions Trading",
    type: "trader",
    phone: "+44 141 333 4444",
    email: "info@techsolutionstrading.com",
    creditBalance: "£678.90",
    joined: "Mar 25, 2023",
    city: "Glasgow",
    address: "17 Tech Avenue, Glasgow",
    status: "active",
  },
  {
    id: "CUST-009",
    name: "Accessory Exchange Ltd",
    type: "trader",
    phone: "+44 151 888 9999",
    email: "exchange@accessoryexchange.co.uk",
    creditBalance: "£1100.00",
    joined: "Apr 10, 2023",
    city: "Liverpool",
    address: "8 Exchange Court, Liverpool",
    status: "active",
  },
  {
    id: "CUST-010",
    name: "Parts Traders Direct",
    type: "trader",
    phone: "+44 113 111 2222",
    email: "direct@partstraders.co.uk",
    creditBalance: "£325.50",
    joined: "May 5, 2023",
    city: "Leeds",
    address: "34 Traders Yard, Leeds",
    status: "active",
  },
  {
    id: "CUST-011",
    name: "Northern Trading Co",
    type: "trader",
    phone: "+44 191 444 5555",
    email: "info@northerntrading.co.uk",
    creditBalance: "£760.00",
    joined: "Feb 20, 2023",
    city: "Newcastle",
    address: "11 North Quay, Newcastle",
    status: "active",
  },

  /* ── Retailers (14) ──────────────────────────────────────────────────── */
  {
    id: "CUST-012",
    name: "Mobile Plus Store",
    type: "retailer",
    phone: "+44 20 8345 6789",
    email: "shop@mobileplus.co.uk",
    creditBalance: "£234.50",
    joined: "Mar 10, 2023",
    city: "London",
    address: "101 High Street, London",
    status: "active",
  },
  {
    id: "CUST-013",
    name: "Phone Zone Retail",
    type: "retailer",
    phone: "+44 114 777 8888",
    email: "phonezone@retail.co.uk",
    creditBalance: "£145.00",
    joined: "Apr 15, 2023",
    city: "Sheffield",
    address: "56 Shop Row, Sheffield",
    status: "active",
  },
  {
    id: "CUST-014",
    name: "Gadget Corner",
    type: "retailer",
    phone: "+44 115 666 7777",
    email: "info@gadgetcorner.co.uk",
    creditBalance: "£89.50",
    joined: "May 1, 2023",
    city: "Nottingham",
    address: "9 Corner Lane, Nottingham",
    status: "active",
  },
  {
    id: "CUST-015",
    name: "Tech Store Express",
    type: "retailer",
    phone: "+44 116 555 6666",
    email: "info@techstoreexpress.co.uk",
    creditBalance: "£0.00",
    joined: "May 10, 2023",
    city: "Leicester",
    address: "44 Express Way, Leicester",
    status: "active",
  },
  {
    id: "CUST-016",
    name: "Mobile World Shop",
    type: "retailer",
    phone: "+44 118 444 5555",
    email: "hello@mobileworldshop.co.uk",
    creditBalance: "£312.75",
    joined: "May 20, 2023",
    city: "Reading",
    address: "67 World Road, Reading",
    status: "active",
  },
  {
    id: "CUST-017",
    name: "Accessory Avenue",
    type: "retailer",
    phone: "+44 1865 333 4444",
    email: "sales@accessoryavenue.co.uk",
    creditBalance: "£178.25",
    joined: "Jun 1, 2023",
    city: "Oxford",
    address: "22 Avenue Close, Oxford",
    status: "active",
  },
  {
    id: "CUST-018",
    name: "Smart Gadgets Shop",
    type: "retailer",
    phone: "+44 1223 222 3333",
    email: "info@smartgadgetsshop.co.uk",
    creditBalance: "£425.00",
    joined: "Jun 15, 2023",
    city: "Cambridge",
    address: "5 Smart Row, Cambridge",
    status: "active",
  },
  {
    id: "CUST-019",
    name: "The Phone Hub",
    type: "retailer",
    phone: "+44 1604 111 2222",
    email: "hub@thephonehub.co.uk",
    creditBalance: "£67.00",
    joined: "Jul 1, 2023",
    city: "Northampton",
    address: "78 Hub Street, Northampton",
    status: "active",
  },
  {
    id: "CUST-020",
    name: "Mobile Fix Centre",
    type: "retailer",
    phone: "+44 1905 999 0000",
    email: "fix@mobilefixcentre.co.uk",
    creditBalance: "£198.50",
    joined: "Jul 10, 2023",
    city: "Worcester",
    address: "33 Fix Lane, Worcester",
    status: "active",
  },
  {
    id: "CUST-021",
    name: "Accessories & More",
    type: "retailer",
    phone: "+44 1743 888 9999",
    email: "more@accessoriesandmore.co.uk",
    creditBalance: "£0.00",
    joined: "Aug 1, 2023",
    city: "Shrewsbury",
    address: "14 More Close, Shrewsbury",
    status: "active",
  },
  {
    id: "CUST-022",
    name: "Tech Corner Store",
    type: "retailer",
    phone: "+44 1244 777 8888",
    email: "store@techcornerstore.co.uk",
    creditBalance: "£55.25",
    joined: "Sep 5, 2023",
    city: "Chester",
    address: "6 Corner Place, Chester",
    status: "active",
  },
  {
    id: "CUST-023",
    name: "Phone & Gadget Shop",
    type: "retailer",
    phone: "+44 1782 666 7777",
    email: "shop@phoneandgadget.co.uk",
    creditBalance: "£320.00",
    joined: "Oct 12, 2023",
    city: "Stoke-on-Trent",
    address: "19 Gadget Street, Stoke-on-Trent",
    status: "active",
  },
  {
    id: "CUST-024",
    name: "James Wilson",
    type: "retailer",
    phone: "+44 7700 900004",
    email: "james.wilson@email.co.uk",
    creditBalance: "£0.00",
    joined: "Feb 1, 2024",
    city: "London",
    address: "28 Wilson Close, London",
    status: "active",
  },
  {
    id: "CUST-025",
    name: "Olivia Martinez",
    type: "retailer",
    phone: "+44 7700 900005",
    email: "olivia.martinez@email.co.uk",
    creditBalance: "£0.00",
    joined: "Feb 1, 2024",
    city: "London",
    address: "31 Martinez Road, London",
    status: "active",
  },
];

/* ════════════════════════════════════════════════════════════════════════════
 *  ROW BUILDER
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Builds a single pixel-perfect <tr> element for one customer record.
 *
 * Column order (matches thead):
 *   1. Customer Name  — blue semibold text
 *   2. Type           — styled badge (wholesaler / trader / retailer)
 *   3. Phone          — plain text
 *   4. Email          — muted-color link text
 *   5. Credit Balance — purple bold currency string
 *   6. Joined         — plain date text
 *   7. Actions        — edit button + delete button
 *
 * @param  {object}  item       — One entry from customersData.
 * @param  {number}  index      — Zero-based row index.
 * @param  {number}  total      — Total number of rows (used to detect last row).
 * @returns {HTMLTableRowElement}
 */
function buildCustomerRow(item, index, total) {
  var isLastRow = index === total - 1;

  /* ── <tr> ──────────────────────────────────────────────────────────────── */
  var tr = document.createElement("tr");
  tr.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] align-middle" +
    (isLastRow ? "" : " border-b border-solid border-black/10");

  /* ── 1. Customer Name ──────────────────────────────────────────────────── */
  var tdName = document.createElement("td");
  tdName.className =
    "text-[oklch(0.546_0.245_262.881)] font-medium box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdName.textContent = item.name;

  /* ── 2. Type badge ─────────────────────────────────────────────────────── */
  var tdType = document.createElement("td");
  tdType.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";

  var typeBadge = document.createElement("span");
  typeBadge.className =
    TYPE_BADGE_CLASSES[item.type] || TYPE_BADGE_CLASSES["retailer"];
  typeBadge.textContent = item.type;
  tdType.appendChild(typeBadge);

  /* ── 3. Phone ──────────────────────────────────────────────────────────── */
  var tdPhone = document.createElement("td");
  tdPhone.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdPhone.textContent = item.phone;

  /* ── 4. Email ──────────────────────────────────────────────────────────── */
  var tdEmail = document.createElement("td");
  tdEmail.className =
    "text-[oklch(0.446_0.03_256.802)] box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdEmail.textContent = item.email;

  /* ── 5. Credit Balance ─────────────────────────────────────────────────── */
  var tdCredit = document.createElement("td");
  tdCredit.className =
    "text-[oklch(0.558_0.288_302.321)] font-bold box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdCredit.textContent = item.creditBalance;

  /* ── 6. Joined date ────────────────────────────────────────────────────── */
  var tdJoined = document.createElement("td");
  tdJoined.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdJoined.textContent = item.joined;

  /* ── 7. Actions (edit + delete buttons) ───────────────────────────────── */
  var tdActions = document.createElement("td");
  tdActions.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";

  var actionsWrap = document.createElement("div");
  actionsWrap.className =
    "box-border caret-transparent gap-x-2 flex outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-2 text-nowrap";

  /* Edit button */
  var editBtn = document.createElement("button");
  editBtn.className =
    "font-medium items-center backdrop-blur bg-[oklab(0.999994_0.0000455677_0.0000200868_/_0.6)] caret-transparent gap-x-1.5 flex shrink-0 h-8 justify-center outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1.5 text-center text-nowrap border border-[oklab(0.928_-0.000571842_-0.00597269_/_0.8)] px-2.5 py-0 rounded-lg border-solid";
  editBtn.setAttribute("data-customer-id", item.id);
  editBtn.setAttribute("data-action", "edit");

  var editIcon = document.createElement("img");
  editIcon.src = CUST_ASSET_BASE + "/icon-23.svg";
  editIcon.alt = "Icon";
  editIcon.className =
    "box-border caret-transparent shrink-0 h-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] pointer-events-none text-nowrap w-4";

  editBtn.appendChild(editIcon);

  /* Delete button */
  var deleteBtn = document.createElement("button");
  deleteBtn.className =
    "text-[oklch(0.577_0.245_27.325)] font-medium items-center backdrop-blur bg-[oklab(0.999994_0.0000455677_0.0000200868_/_0.6)] caret-transparent gap-x-1.5 flex shrink-0 h-8 justify-center outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1.5 text-center text-nowrap border border-[oklab(0.928_-0.000571842_-0.00597269_/_0.8)] px-2.5 py-0 rounded-lg border-solid";
  deleteBtn.setAttribute("data-customer-id", item.id);
  deleteBtn.setAttribute("data-action", "delete");

  var deleteIcon = document.createElement("img");
  deleteIcon.src = CUST_ASSET_BASE + "/icon-24.svg";
  deleteIcon.alt = "Icon";
  deleteIcon.className =
    "box-border caret-transparent shrink-0 h-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] pointer-events-none text-nowrap w-4";

  deleteBtn.appendChild(deleteIcon);

  actionsWrap.appendChild(editBtn);
  actionsWrap.appendChild(deleteBtn);
  tdActions.appendChild(actionsWrap);

  /* ── Assemble row ──────────────────────────────────────────────────────── */
  tr.appendChild(tdName);
  tr.appendChild(tdType);
  tr.appendChild(tdPhone);
  tr.appendChild(tdEmail);
  tr.appendChild(tdCredit);
  tr.appendChild(tdJoined);
  tr.appendChild(tdActions);

  return tr;
}

/* ════════════════════════════════════════════════════════════════════════════
 *  TABLE RENDERER
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Clears and fully repopulates the customers <tbody>.
 * Uses a DocumentFragment for a single, efficient DOM insertion.
 *
 * @param {Array} [data] — Optional filtered dataset; defaults to customersData.
 */
function renderCustomersTable(data) {
  var tbody = document.getElementById("customers-tbody");
  if (!tbody) return;

  var rows = data || customersData;

  /* Clear any residual static markup */
  tbody.innerHTML = "";

  var fragment = document.createDocumentFragment();
  var total = rows.length;

  for (var i = 0; i < total; i++) {
    fragment.appendChild(buildCustomerRow(rows[i], i, total));
  }

  tbody.appendChild(fragment);
}

/* ════════════════════════════════════════════════════════════════════════════
 *  ENTRY POINT
 * ════════════════════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {
  renderCustomersTable();
});
