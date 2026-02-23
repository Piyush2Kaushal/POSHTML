/**
 * BNM Parts — Invoice Templates
 * InvoiceTemplatesData.js
 *
 * Dedicated data file and dynamic card renderer for the Invoice Templates page
 * (InvoiceTemplates.html).
 *
 * Architecture:
 *  - invoiceTemplatesData   : Single source of truth for all template records.
 *  - buildTemplateCard      : Pure function — one data record → one card element.
 *  - renderTemplateCards    : Orchestrates the full card-grid render pass.
 *
 * To add, remove, or edit a template, touch ONLY the invoiceTemplatesData array.
 * No other code needs to change.
 *
 * Scalable for: preview, select, edit, duplicate, delete, search, filter — future-ready.
 *
 * Status values:
 *   "default"  — green badge (oklch 0.723 0.219 149.579) with star icon
 *   "active"   — blue badge  with checkmark icon
 *   "inactive" — grey badge  with dash icon
 *
 * Layout types:
 *   "single-column" | "two-column" | "compact" | "detailed"
 *
 * Theme / style names:
 *   "Classic" | "Modern" | "Minimal" | "Bold" | "Professional" | "Elegant"
 */

/* ════════════════════════════════════════════════════════════════════════════
 *  ASSET BASE
 *  Reuses the same Anima CDN folder as InvoiceTemplates.html static icons.
 * ════════════════════════════════════════════════════════════════════════════ */
var TEMPLATES_ASSET_BASE = "https://c.animaapp.com/mlun6fsjfLZwOf/assets";

/* ════════════════════════════════════════════════════════════════════════════
 *  STATUS BADGE CONFIG
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Maps each template status to its badge bg-class and SVG icon path.
 * @constant {Object}
 */
var TEMPLATE_STATUS_CONFIG = {
  default: {
    bgClass: "bg-[oklch(0.723_0.219_149.579)]",
    /* star icon path — matches icon-22.svg used in the original static card */
    iconSlot: "icon-22.svg",
    label: "Default",
  },
  active: {
    bgClass: "bg-sky-600",
    iconSlot: "icon-22.svg",
    label: "Active",
  },
  inactive: {
    bgClass: "bg-slate-400",
    iconSlot: "icon-22.svg",
    label: "Inactive",
  },
};

/* ════════════════════════════════════════════════════════════════════════════
 *  DATA
 *
 *  Fields per template:
 *    id            {string}   — Unique template identifier (e.g. "TPL-001").
 *    name          {string}   — Display name shown on the card heading.
 *    layoutType    {string}   — Layout descriptor (e.g. "single-column").
 *    theme         {string}   — Style / theme name (e.g. "Classic").
 *    previewImage  {string}   — Relative or absolute path to preview image.
 *    primaryColor  {string}   — Tailwind bg-class for the primary swatch.
 *    secondaryColor{string}   — Tailwind bg-class for the secondary swatch.
 *    totalSample   {string}   — Sample amount displayed on the card (e.g. "£100.00").
 *    invoiceSample {string}   — Sample invoice number (e.g. "INV-00001").
 *    status        {string}   — "default" | "active" | "inactive".
 *    createdDate   {string}   — ISO date string of creation.
 *    businessName  {string}   — Business / brand name shown below the heading.
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Master template data array.
 * Add or remove objects here to control what appears on the page.
 * @type {Array<Object>}
 */
var invoiceTemplatesData = [
  {
    id: "TPL-001",
    name: "Default Template",
    layoutType: "single-column",
    theme: "Classic",
    previewImage: "",
    primaryColor: "bg-blue-600",
    secondaryColor: "bg-slate-500",
    totalSample: "£100.00",
    invoiceSample: "INV-00001",
    status: "default",
    createdDate: "2024-01-15",
    businessName: "BNM parts",
  },
  {
    id: "TPL-002",
    name: "Modern Minimal",
    layoutType: "two-column",
    theme: "Modern",
    previewImage: "",
    primaryColor: "bg-sky-500",
    secondaryColor: "bg-slate-300",
    totalSample: "£250.00",
    invoiceSample: "INV-00002",
    status: "active",
    createdDate: "2024-02-10",
    businessName: "BNM parts",
  },
  {
    id: "TPL-003",
    name: "Bold Professional",
    layoutType: "detailed",
    theme: "Bold",
    previewImage: "",
    primaryColor: "bg-indigo-700",
    secondaryColor: "bg-indigo-300",
    totalSample: "£500.00",
    invoiceSample: "INV-00003",
    status: "inactive",
    createdDate: "2024-03-05",
    businessName: "BNM parts",
  },
];

/* ════════════════════════════════════════════════════════════════════════════
 *  CARD BUILDER
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Builds a single template card DOM element from one data record.
 * Pixel-perfect replica of the static card structure found in InvoiceTemplates.html.
 *
 * @param  {Object} tpl  — One object from invoiceTemplatesData.
 * @returns {HTMLElement} — The fully constructed card <div>.
 */
function buildTemplateCard(tpl) {
  var statusCfg =
    TEMPLATE_STATUS_CONFIG[tpl.status] || TEMPLATE_STATUS_CONFIG.active;

  /* ── Outer card wrapper ── */
  var card = document.createElement("div");
  card.className =
    "relative backdrop-blur-xl bg-[oklab(0.999994_0.0000455677_0.0000200868_/_0.8)] shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.1)_0px_1px_3px_0px,rgba(0,0,0,0.1)_0px_1px_2px_-1px] box-border caret-transparent gap-x-6 flex flex-col outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-6 border border-[oklab(0.928_-0.000571842_-0.00597269_/_0.5)] rounded-xl border-solid";
  card.dataset.templateId = tpl.id;

  /* ── Status badge (absolute top-right) ── */
  var badge = document.createElement("span");
  badge.className =
    "absolute text-white text-xs font-medium items-center " +
    statusCfg.bgClass +
    " box-border caret-transparent gap-x-1 flex shrink-0 justify-center leading-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1 text-nowrap w-fit border overflow-hidden px-2 py-0.5 rounded-md border-solid border-transparent right-3 top-3";

  var badgeIcon = document.createElement("img");
  badgeIcon.src = TEMPLATES_ASSET_BASE + "/" + statusCfg.iconSlot;
  badgeIcon.alt = "Icon";
  badgeIcon.className =
    "box-border caret-transparent h-3 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] pointer-events-none text-nowrap w-3 mr-1";

  badge.appendChild(badgeIcon);
  badge.appendChild(document.createTextNode(statusCfg.label));
  card.appendChild(badge);

  /* ── Card heading area ── */
  var headingWrap = document.createElement("div");
  headingWrap.className =
    "items-start box-border caret-transparent gap-x-1.5 grid auto-rows-min grid-rows-[auto_auto] outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1.5 pt-6 pb-3 px-6";

  var heading = document.createElement("h4");
  heading.className =
    "text-lg font-medium box-border caret-transparent leading-7 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)]";
  heading.textContent = tpl.name;

  var subheading = document.createElement("p");
  subheading.className =
    "text-neutral-500 box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)]";
  subheading.textContent = tpl.businessName;

  headingWrap.appendChild(heading);
  headingWrap.appendChild(subheading);
  card.appendChild(headingWrap);

  /* ── Card body (meta + action buttons) ── */
  var body = document.createElement("div");
  body.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] pb-6 px-6";

  var innerBody = document.createElement("div");
  innerBody.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)]";

  /* — Color swatches row — */
  var swatchRow = document.createElement("div");
  swatchRow.className =
    "items-center box-border caret-transparent gap-x-2 flex outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-2 mb-3";

  var swatchIcon = document.createElement("img");
  swatchIcon.src = TEMPLATES_ASSET_BASE + "/icon-23.svg";
  swatchIcon.alt = "Icon";
  swatchIcon.className =
    "text-[oklch(0.551_0.027_264.364)] box-border caret-transparent h-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] w-4";

  var swatchGroup = document.createElement("div");
  swatchGroup.className =
    "box-border caret-transparent gap-x-2 flex outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-2";

  var primarySwatch = document.createElement("div");
  primarySwatch.title = "Primary Color";
  primarySwatch.className =
    tpl.primaryColor +
    " box-border caret-transparent h-6 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] w-6 border rounded-bl rounded-br rounded-tl rounded-tr border-solid border-black/10";

  var secondarySwatch = document.createElement("div");
  secondarySwatch.title = "Secondary Color";
  secondarySwatch.className =
    tpl.secondaryColor +
    " box-border caret-transparent h-6 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] w-6 border rounded-bl rounded-br rounded-tl rounded-tr border-solid border-black/10";

  swatchGroup.appendChild(primarySwatch);
  swatchGroup.appendChild(secondarySwatch);
  swatchRow.appendChild(swatchIcon);
  swatchRow.appendChild(swatchGroup);
  innerBody.appendChild(swatchRow);

  /* — Total amount row — */
  var amountRow = document.createElement("div");
  amountRow.className =
    "text-[oklch(0.446_0.03_256.802)] text-sm items-center box-border caret-transparent gap-x-2 flex leading-5 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-2 mb-3";

  var amountIcon = document.createElement("img");
  amountIcon.src = TEMPLATES_ASSET_BASE + "/icon-24.svg";
  amountIcon.alt = "Icon";
  amountIcon.className =
    "box-border caret-transparent h-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] w-4";

  var amountSpan = document.createElement("span");
  amountSpan.className =
    "box-border caret-transparent block outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)]";
  amountSpan.textContent = tpl.totalSample;

  amountRow.appendChild(amountIcon);
  amountRow.appendChild(amountSpan);
  innerBody.appendChild(amountRow);

  /* — Invoice number row — */
  var invRow = document.createElement("div");
  invRow.className =
    "text-[oklch(0.446_0.03_256.802)] text-sm items-center box-border caret-transparent gap-x-2 flex leading-5 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-2 mb-3";

  var invIcon = document.createElement("img");
  invIcon.src = TEMPLATES_ASSET_BASE + "/icon-25.svg";
  invIcon.alt = "Icon";
  invIcon.className =
    "box-border caret-transparent h-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] w-4";

  var invSpan = document.createElement("span");
  invSpan.className =
    "box-border caret-transparent block outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)]";
  invSpan.textContent = tpl.invoiceSample;

  invRow.appendChild(invIcon);
  invRow.appendChild(invSpan);
  innerBody.appendChild(invRow);

  /* — Action buttons — */
  var btnRow = document.createElement("div");
  btnRow.className =
    "box-border caret-transparent gap-x-2 flex outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-2 pt-2";

  /* Edit button (grows to fill remaining width) */
  var editBtn = document.createElement("button");
  editBtn.className =
    "text-sm font-medium items-center backdrop-blur bg-[oklab(0.999994_0.0000455677_0.0000200868_/_0.6)] caret-transparent gap-x-1.5 flex basis-[0%] grow h-8 justify-center leading-5 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1.5 text-center text-nowrap border border-[oklab(0.928_-0.000571842_-0.00597269_/_0.8)] px-2.5 py-0 rounded-lg border-solid";
  editBtn.dataset.action = "edit";
  editBtn.dataset.templateId = tpl.id;

  var editIcon = document.createElement("img");
  editIcon.src = TEMPLATES_ASSET_BASE + "/icon-26.svg";
  editIcon.alt = "Icon";
  editIcon.className =
    "box-border caret-transparent shrink-0 h-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] pointer-events-none text-nowrap w-4 mr-1";

  editBtn.appendChild(editIcon);
  editBtn.appendChild(document.createTextNode("Edit"));

  /* Duplicate button */
  var dupBtn = document.createElement("button");
  dupBtn.className =
    "text-sm font-medium items-center backdrop-blur bg-[oklab(0.999994_0.0000455677_0.0000200868_/_0.6)] caret-transparent gap-x-1.5 flex shrink-0 h-8 justify-center leading-5 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1.5 text-center text-nowrap border border-[oklab(0.928_-0.000571842_-0.00597269_/_0.8)] px-2.5 py-0 rounded-lg border-solid";
  dupBtn.dataset.action = "duplicate";
  dupBtn.dataset.templateId = tpl.id;

  var dupIcon = document.createElement("img");
  dupIcon.src = TEMPLATES_ASSET_BASE + "/icon-27.svg";
  dupIcon.alt = "Icon";
  dupIcon.className =
    "box-border caret-transparent shrink-0 h-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] pointer-events-none text-nowrap w-4";

  dupBtn.appendChild(dupIcon);

  /* Delete button */
  var delBtn = document.createElement("button");
  delBtn.className =
    "text-sm font-medium items-center backdrop-blur bg-[oklab(0.999994_0.0000455677_0.0000200868_/_0.6)] caret-transparent gap-x-1.5 flex shrink-0 h-8 justify-center leading-5 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1.5 text-center text-nowrap border border-[oklab(0.928_-0.000571842_-0.00597269_/_0.8)] px-2.5 py-0 rounded-lg border-solid";
  delBtn.dataset.action = "delete";
  delBtn.dataset.templateId = tpl.id;

  var delIcon = document.createElement("img");
  delIcon.src = TEMPLATES_ASSET_BASE + "/icon-28.svg";
  delIcon.alt = "Icon";
  delIcon.className =
    "box-border caret-transparent shrink-0 h-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] pointer-events-none text-nowrap w-4";

  delBtn.appendChild(delIcon);

  btnRow.appendChild(editBtn);
  btnRow.appendChild(dupBtn);
  btnRow.appendChild(delBtn);
  innerBody.appendChild(btnRow);

  body.appendChild(innerBody);
  card.appendChild(body);

  return card;
}

/* ════════════════════════════════════════════════════════════════════════════
 *  RENDERER
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Clears the template card grid and re-renders all cards from invoiceTemplatesData.
 * Targets the element with id="templates-grid".
 */
function renderTemplateCards() {
  var grid = document.getElementById("templates-grid");
  if (!grid) {
    console.warn(
      "InvoiceTemplatesData.js: #templates-grid element not found in page."
    );
    return;
  }

  /* Clear existing content */
  grid.innerHTML = "";

  if (!invoiceTemplatesData || invoiceTemplatesData.length === 0) {
    var empty = document.createElement("p");
    empty.className =
      "text-[oklch(0.446_0.03_256.802)] text-sm col-span-3 text-center py-12";
    empty.textContent = "No templates found.";
    grid.appendChild(empty);
    return;
  }

  invoiceTemplatesData.forEach(function (tpl) {
    grid.appendChild(buildTemplateCard(tpl));
  });
}

/* ════════════════════════════════════════════════════════════════════════════
 *  ACTION HANDLERS  (edit / duplicate / delete — wired via event delegation)
 *  These are intentionally minimal stubs. Replace with real logic as needed.
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Handles edit action for a given template ID.
 * @param {string} id
 */
function onTemplateEdit(id) {
  console.log("[Templates] Edit requested for:", id);
  /* TODO: open edit modal / navigate to edit page */
}

/**
 * Handles duplicate action for a given template ID.
 * @param {string} id
 */
function onTemplateDuplicate(id) {
  var original = invoiceTemplatesData.find(function (t) {
    return t.id === id;
  });
  if (!original) return;

  var copy = Object.assign({}, original);
  copy.id = "TPL-" + Date.now();
  copy.name = original.name + " (Copy)";
  copy.status = "inactive";
  copy.createdDate = new Date().toISOString().split("T")[0];

  invoiceTemplatesData.push(copy);
  renderTemplateCards();
  console.log("[Templates] Duplicated:", id, "→", copy.id);
}

/**
 * Handles delete action for a given template ID.
 * @param {string} id
 */
function onTemplateDelete(id) {
  if (window.confirm("Delete this template? This cannot be undone.")) {
    invoiceTemplatesData = invoiceTemplatesData.filter(function (t) {
      return t.id !== id;
    });
    renderTemplateCards();
    console.log("[Templates] Deleted:", id);
  }
}

/* ════════════════════════════════════════════════════════════════════════════
 *  BOOTSTRAP — wire up and render when the DOM is ready
 * ════════════════════════════════════════════════════════════════════════════ */

(function bootstrap() {
  function init() {
    /* Render cards */
    renderTemplateCards();

    /* Event delegation for action buttons */
    var grid = document.getElementById("templates-grid");
    if (grid) {
      grid.addEventListener("click", function (e) {
        var btn = e.target.closest("button[data-action]");
        if (!btn) return;

        var action = btn.dataset.action;
        var tid = btn.dataset.templateId;

        if (action === "edit") onTemplateEdit(tid);
        else if (action === "duplicate") onTemplateDuplicate(tid);
        else if (action === "delete") onTemplateDelete(tid);
      });
    }

    /* "New Template" button — wire up if present */
    var newTplBtn = document.getElementById("new-template-btn");
    if (newTplBtn) {
      newTplBtn.addEventListener("click", function () {
        console.log("[Templates] New Template clicked — implement modal/nav.");
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
