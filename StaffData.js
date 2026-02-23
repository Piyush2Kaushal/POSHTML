/**
 * BNM Parts — Staff Management
 * StaffData.js
 *
 * Dedicated data file and dynamic table renderer for the
 * Staff Management page (StaffManagement.html).
 *
 * Architecture:
 *  - staffData          : Single source of truth for all staff records.
 *  - ROLE_BADGE_CLASSES : Lookup map — role string → exact badge CSS classes.
 *  - STATUS_BADGE_CLASSES: Lookup map — status string → exact badge CSS classes.
 *  - buildStaffRow      : Pure function — one data record → one <tr> element.
 *  - renderStaffTable   : Orchestrates the full table render pass.
 *
 * To add, remove, or edit a staff member, touch ONLY the staffData array.
 * No other code needs to change.
 *
 * Future-ready for: search, filter by role/status, pagination, edit, delete.
 *
 * Asset base for this page's Anima CDN folder.
 * (Used for action button icons: edit = icon-24, delete = icon-25.)
 */

/* ════════════════════════════════════════════════════════════════════════════
 *  CONFIGURATION
 * ════════════════════════════════════════════════════════════════════════════ */

/** @constant {string} CDN prefix for all icon assets on this page. */
var STAFF_ASSET_BASE = "https://c.animaapp.com/mlumwuqmTtBvBu/assets";

/* ════════════════════════════════════════════════════════════════════════════
 *  BADGE CLASS MAPS
 *
 *  Role badge:   All roles share the same plain bordered style.
 *  Status badge: "active" = green background, white text.
 *                Extend map for "inactive" or other states as needed.
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * @constant {string} ROLE_BADGE_CLASS
 * Single shared class string for ALL role badges (manager, cashier, inventory, admin).
 * All roles in this UI use the same plain bordered badge style.
 */
var ROLE_BADGE_CLASS =
  "text-xs font-medium items-center box-border caret-transparent gap-x-1 inline-flex shrink-0 justify-center leading-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1 capitalize text-nowrap w-fit border overflow-hidden px-2 py-0.5 rounded-md border-solid border-black/10";

/**
 * @constant {Object} STATUS_BADGE_CLASSES
 * Maps status values to their exact pixel-perfect badge class strings.
 */
var STATUS_BADGE_CLASSES = {
  active:
    "text-white text-xs font-medium items-center bg-[oklch(0.627_0.194_149.214)] box-border caret-transparent gap-x-1 inline-flex shrink-0 justify-center leading-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1 text-nowrap w-fit border overflow-hidden px-2 py-0.5 rounded-md border-solid border-transparent",
  inactive:
    "text-white text-xs font-medium items-center bg-[oklch(0.577_0.245_27.325)] box-border caret-transparent gap-x-1 inline-flex shrink-0 justify-center leading-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1 text-nowrap w-fit border overflow-hidden px-2 py-0.5 rounded-md border-solid border-transparent",
};

/* ════════════════════════════════════════════════════════════════════════════
 *  DATA
 *
 *  Fields:
 *    id           {string}  — Unique staff identifier (e.g. "STAFF-001").
 *    name         {string}  — Full display name of the staff member.
 *    email        {string}  — Work email address.
 *    phone        {string}  — Contact phone number.
 *    role         {string}  — Role / designation (manager | cashier | inventory | admin).
 *    department   {string}  — Department name (for future filter/grouping use).
 *    salary       {string}  — Pre-formatted annual salary (e.g. "£45000").
 *    joinDate     {string}  — Pre-formatted joining date (e.g. "Jan 15, 2022").
 *    status       {string}  — "active" | "inactive".
 *
 *  NOTE: 15 records extracted verbatim from the original static HTML.
 *        Stat card totals:  Total Staff = 15, Active Staff = 15,
 *                           Total Salary = £480500, Avg Salary = £32033.
 * ════════════════════════════════════════════════════════════════════════════ */

/** @type {Array<Object>} */
var staffData = [
  /* ── Record 01 ───────────────────────────────────────────────────────── */
  {
    id: "STAFF-001",
    name: "David Anderson",
    email: "david.anderson@bnmparts.co.uk",
    phone: "+44 7700 100001",
    role: "manager",
    department: "Operations",
    salary: "£45000",
    joinDate: "Jan 15, 2022",
    status: "active",
  },
  /* ── Record 02 ───────────────────────────────────────────────────────── */
  {
    id: "STAFF-002",
    name: "Emily Roberts",
    email: "emily.roberts@bnmparts.co.uk",
    phone: "+44 7700 100002",
    role: "cashier",
    department: "Sales",
    salary: "£28000",
    joinDate: "Mar 20, 2022",
    status: "active",
  },
  /* ── Record 03 ───────────────────────────────────────────────────────── */
  {
    id: "STAFF-003",
    name: "Marcus Thompson",
    email: "marcus.thompson@bnmparts.co.uk",
    phone: "+44 7700 100003",
    role: "inventory",
    department: "Warehouse",
    salary: "£38000",
    joinDate: "May 10, 2022",
    status: "active",
  },
  /* ── Record 04 ───────────────────────────────────────────────────────── */
  {
    id: "STAFF-004",
    name: "Sophie Williams",
    email: "sophie.williams@bnmparts.co.uk",
    phone: "+44 7700 100004",
    role: "cashier",
    department: "Sales",
    salary: "£26000",
    joinDate: "Jul 1, 2022",
    status: "active",
  },
  /* ── Record 05 ───────────────────────────────────────────────────────── */
  {
    id: "STAFF-005",
    name: "James Patterson",
    email: "james.patterson@bnmparts.co.uk",
    phone: "+44 7700 100005",
    role: "cashier",
    department: "Sales",
    salary: "£27500",
    joinDate: "Sep 15, 2022",
    status: "active",
  },
  /* ── Record 06 ───────────────────────────────────────────────────────── */
  {
    id: "STAFF-006",
    name: "Rachel Green",
    email: "rachel.green@bnmparts.co.uk",
    phone: "+44 7700 100006",
    role: "manager",
    department: "Operations",
    salary: "£36000",
    joinDate: "Nov 1, 2022",
    status: "active",
  },
  /* ── Record 07 ───────────────────────────────────────────────────────── */
  {
    id: "STAFF-007",
    name: "Tom Bradley",
    email: "tom.bradley@bnmparts.co.uk",
    phone: "+44 7700 100007",
    role: "inventory",
    department: "Warehouse",
    salary: "£24000",
    joinDate: "Jan 10, 2023",
    status: "active",
  },
  /* ── Record 08 ───────────────────────────────────────────────────────── */
  {
    id: "STAFF-008",
    name: "Lisa Martinez",
    email: "lisa.martinez@bnmparts.co.uk",
    phone: "+44 7700 100008",
    role: "admin",
    department: "Administration",
    salary: "£42000",
    joinDate: "Feb 20, 2023",
    status: "active",
  },
  /* ── Record 09 ───────────────────────────────────────────────────────── */
  {
    id: "STAFF-009",
    name: "Kevin Harris",
    email: "kevin.harris@bnmparts.co.uk",
    phone: "+44 7700 100009",
    role: "cashier",
    department: "Sales",
    salary: "£28500",
    joinDate: "Apr 15, 2023",
    status: "active",
  },
  /* ── Record 10 ───────────────────────────────────────────────────────── */
  {
    id: "STAFF-010",
    name: "Amanda Clark",
    email: "amanda.clark@bnmparts.co.uk",
    phone: "+44 7700 100010",
    role: "manager",
    department: "Operations",
    salary: "£32000",
    joinDate: "Jun 1, 2023",
    status: "active",
  },
  /* ── Record 11 ───────────────────────────────────────────────────────── */
  {
    id: "STAFF-011",
    name: "Daniel Lewis",
    email: "daniel.lewis@bnmparts.co.uk",
    phone: "+44 7700 100011",
    role: "inventory",
    department: "Warehouse",
    salary: "£25000",
    joinDate: "Jul 15, 2023",
    status: "active",
  },
  /* ── Record 12 ───────────────────────────────────────────────────────── */
  {
    id: "STAFF-012",
    name: "Jessica Turner",
    email: "jessica.turner@bnmparts.co.uk",
    phone: "+44 7700 100012",
    role: "cashier",
    department: "Sales",
    salary: "£26500",
    joinDate: "Sep 1, 2023",
    status: "active",
  },
  /* ── Record 13 ───────────────────────────────────────────────────────── */
  {
    id: "STAFF-013",
    name: "Michael Brown",
    email: "michael.brown@bnmparts.co.uk",
    phone: "+44 7700 100013",
    role: "admin",
    department: "Administration",
    salary: "£35000",
    joinDate: "Oct 15, 2023",
    status: "active",
  },
  /* ── Record 14 ───────────────────────────────────────────────────────── */
  {
    id: "STAFF-014",
    name: "Sarah Davis",
    email: "sarah.davis@bnmparts.co.uk",
    phone: "+44 7700 100014",
    role: "cashier",
    department: "Sales",
    salary: "£27000",
    joinDate: "Nov 20, 2023",
    status: "active",
  },
  /* ── Record 15 ───────────────────────────────────────────────────────── */
  {
    id: "STAFF-015",
    name: "Christopher Wilson",
    email: "christopher.wilson@bnmparts.co.uk",
    phone: "+44 7700 100015",
    role: "manager",
    department: "Operations",
    salary: "£40000",
    joinDate: "Jan 5, 2024",
    status: "active",
  },
];

/* ════════════════════════════════════════════════════════════════════════════
 *  ROW BUILDER
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Builds a single pixel-perfect <tr> element for one staff record.
 *
 * Column order (matches thead):
 *   1. Name        — semibold text
 *   2. Email       — plain text
 *   3. Phone       — plain text
 *   4. Role        — plain bordered badge (capitalize)
 *   5. Salary      — semibold text
 *   6. Join Date   — plain text
 *   7. Status      — coloured badge (active = green)
 *   8. Actions     — edit button + delete button
 *
 * @param  {object}  item   — One entry from staffData.
 * @param  {number}  index  — Zero-based row index.
 * @param  {number}  total  — Total number of rows (used to detect last row).
 * @returns {HTMLTableRowElement}
 */
function buildStaffRow(item, index, total) {
  var isLastRow = index === total - 1;

  /* ── <tr> ──────────────────────────────────────────────────────────────── */
  var tr = document.createElement("tr");
  tr.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] align-middle" +
    (isLastRow ? "" : " border-b border-solid border-black/10");

  /* ── 1. Name ───────────────────────────────────────────────────────────── */
  var tdName = document.createElement("td");
  tdName.className =
    "font-medium box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdName.textContent = item.name;

  /* ── 2. Email ──────────────────────────────────────────────────────────── */
  var tdEmail = document.createElement("td");
  tdEmail.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdEmail.textContent = item.email;

  /* ── 3. Phone ──────────────────────────────────────────────────────────── */
  var tdPhone = document.createElement("td");
  tdPhone.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdPhone.textContent = item.phone;

  /* ── 4. Role badge ─────────────────────────────────────────────────────── */
  var tdRole = document.createElement("td");
  tdRole.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";

  var roleBadge = document.createElement("span");
  roleBadge.className = ROLE_BADGE_CLASS;
  roleBadge.textContent = item.role;
  tdRole.appendChild(roleBadge);

  /* ── 5. Salary ─────────────────────────────────────────────────────────── */
  var tdSalary = document.createElement("td");
  tdSalary.className =
    "font-semibold box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdSalary.textContent = item.salary;

  /* ── 6. Join Date ──────────────────────────────────────────────────────── */
  var tdJoinDate = document.createElement("td");
  tdJoinDate.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdJoinDate.textContent = item.joinDate;

  /* ── 7. Status badge ───────────────────────────────────────────────────── */
  var tdStatus = document.createElement("td");
  tdStatus.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";

  var statusBadge = document.createElement("span");
  statusBadge.className =
    STATUS_BADGE_CLASSES[item.status] || STATUS_BADGE_CLASSES["active"];
  statusBadge.textContent = item.status;
  tdStatus.appendChild(statusBadge);

  /* ── 8. Actions (edit + delete buttons) ───────────────────────────────── */
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
  editBtn.setAttribute("data-staff-id", item.id);
  editBtn.setAttribute("data-action", "edit");

  var editIcon = document.createElement("img");
  editIcon.src = STAFF_ASSET_BASE + "/icon-24.svg";
  editIcon.alt = "Icon";
  editIcon.className =
    "box-border caret-transparent shrink-0 h-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] pointer-events-none text-nowrap w-4";

  editBtn.appendChild(editIcon);

  /* Delete button */
  var deleteBtn = document.createElement("button");
  deleteBtn.className =
    "text-[oklch(0.577_0.245_27.325)] font-medium items-center backdrop-blur bg-[oklab(0.999994_0.0000455677_0.0000200868_/_0.6)] caret-transparent gap-x-1.5 flex shrink-0 h-8 justify-center outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1.5 text-center text-nowrap border border-[oklab(0.928_-0.000571842_-0.00597269_/_0.8)] px-2.5 py-0 rounded-lg border-solid";
  deleteBtn.setAttribute("data-staff-id", item.id);
  deleteBtn.setAttribute("data-action", "delete");

  var deleteIcon = document.createElement("img");
  deleteIcon.src = STAFF_ASSET_BASE + "/icon-25.svg";
  deleteIcon.alt = "Icon";
  deleteIcon.className =
    "box-border caret-transparent shrink-0 h-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] pointer-events-none text-nowrap w-4";

  deleteBtn.appendChild(deleteIcon);

  actionsWrap.appendChild(editBtn);
  actionsWrap.appendChild(deleteBtn);
  tdActions.appendChild(actionsWrap);

  /* ── Assemble row ──────────────────────────────────────────────────────── */
  tr.appendChild(tdName);
  tr.appendChild(tdEmail);
  tr.appendChild(tdPhone);
  tr.appendChild(tdRole);
  tr.appendChild(tdSalary);
  tr.appendChild(tdJoinDate);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  return tr;
}

/* ════════════════════════════════════════════════════════════════════════════
 *  TABLE RENDERER
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Clears and fully repopulates the staff <tbody>.
 * Uses a DocumentFragment for a single, efficient DOM insertion.
 *
 * @param {Array} [data] — Optional filtered dataset; defaults to staffData.
 *                         Pass a filtered array to support search/filter features.
 */
function renderStaffTable(data) {
  var tbody = document.getElementById("staff-tbody");
  if (!tbody) return;

  var rows = data || staffData;

  /* Clear any residual static markup */
  tbody.innerHTML = "";

  var fragment = document.createDocumentFragment();
  var total = rows.length;

  for (var i = 0; i < total; i++) {
    fragment.appendChild(buildStaffRow(rows[i], i, total));
  }

  tbody.appendChild(fragment);
}

/* ════════════════════════════════════════════════════════════════════════════
 *  ENTRY POINT
 * ════════════════════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {
  renderStaffTable();
});
