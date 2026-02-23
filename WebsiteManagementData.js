/**
 * BNM Parts — Website Management
 * WebsiteManagementData.js
 *
 * Dedicated data file and dynamic renderer for the
 * Website Management page (WebsiteManagement.html).
 *
 * Architecture:
 *  - WEBSITE_ASSET_BASE        : CDN prefix for all icon/image assets on this page.
 *  - websiteConfig             : Single source of truth — all website settings/data.
 *  - websiteOverviewStats      : Overview tab stat cards data.
 *  - websiteQuickActions       : Quick action buttons data.
 *  - websitePopularProducts    : Popular products table data.
 *  - websiteTabs               : Tab bar configuration.
 *  - renderWebsiteOverview()   : Renders the Overview tab (stat cards, quick actions, popular products table).
 *  - renderWebsiteTabBar()     : Renders the tab navigation bar dynamically.
 *  - initWebsiteTabs()         : Wires tab switching behaviour.
 *  - initWebsiteManagement()   : Master entry point — called on DOMContentLoaded.
 *
 * To update any visible data/text, touch ONLY the data objects below.
 * No other code needs to change.
 *
 * Scope for future edit/update/save actions is built in via the
 * websiteConfig object — each section is independently addressable.
 */

/* ════════════════════════════════════════════════════════════════════════════
 *  CONFIGURATION
 * ════════════════════════════════════════════════════════════════════════════ */

/** @constant {string} CDN prefix for all icon assets on this page. */
var WEBSITE_ASSET_BASE = "https://c.animaapp.com/mlur29t8j9XsT1/assets";

/* ════════════════════════════════════════════════════════════════════════════
 *  WEBSITE CONFIGURATION — Single source of truth
 *
 *  Sections:
 *    general     — Website name, tagline, contact, logo, favicon.
 *    seo         — Meta title, description, keywords.
 *    social      — Social media links.
 *    theme       — Primary colour, font, dark-mode preference.
 *    homepage    — Hero banner text, CTA label.
 *    footer      — Footer text, links, copyright.
 *    maintenance — Maintenance mode flag, message.
 *
 *  These fields are the canonical data store. Edit/save actions
 *  should read from and write back to this object.
 * ════════════════════════════════════════════════════════════════════════════ */

/** @type {object} Master website configuration record. */
var websiteConfig = {
  general: {
    websiteName: "BNM Parts",
    tagline: "Your number one mobile accessories store",
    email: "info@bnmparts.co.uk",
    phone: "+44 20 1234 5678",
    address: "123 Tech Street, London, UK",
    logoUrl: "",
    faviconUrl: "",
  },
  seo: {
    metaTitle: "BNM Parts – Mobile Accessories UK",
    metaDescription:
      "Shop the best mobile phone cases, cables, chargers and accessories at BNM Parts.",
    metaKeywords: "mobile accessories, phone cases, chargers, cables, UK",
  },
  social: {
    facebook: "https://facebook.com/bnmparts",
    instagram: "https://instagram.com/bnmparts",
    twitter: "https://twitter.com/bnmparts",
    tiktok: "",
  },
  theme: {
    primaryColour: "#0ea5e9",
    fontFamily: "Inter, sans-serif",
    darkMode: false,
  },
  homepage: {
    heroBannerHeading: "Premium Mobile Accessories",
    heroBannerSubheading: "Free UK delivery on orders over £30",
    ctaLabel: "Shop Now",
    ctaUrl: "/shop",
  },
  footer: {
    copyrightText: "© 2025 BNM Parts. All rights reserved.",
    footerLinks: [
      { label: "Privacy Policy", url: "/privacy" },
      { label: "Terms of Service", url: "/terms" },
      { label: "Contact Us", url: "/contact" },
    ],
  },
  maintenance: {
    enabled: false,
    message:
      "We are currently performing scheduled maintenance. We will be back shortly.",
  },
};

/* ════════════════════════════════════════════════════════════════════════════
 *  OVERVIEW STATS
 *
 *  Fields:
 *    iconSrc   {string}  — Asset filename for the card icon.
 *    label     {string}  — Card heading text.
 *    value     {string}  — Primary metric value (displayed large).
 *    subLabel  {string}  — Small descriptor text below the value.
 *    valueClass{string}  — Tailwind colour class applied to the value element.
 * ════════════════════════════════════════════════════════════════════════════ */

/** @type {Array<object>} Overview stat card data. */
var websiteOverviewStats = [
  {
    iconSrc: "icon-28.svg",
    label: "Total Visitors",
    value: "12,543",
    subLabel: "All time visitors",
    valueClass: "text-[oklch(0.21_0.034_264.665)]",
  },
  {
    iconSrc: "icon-29.svg",
    label: "Today\u2019s Visitors",
    value: "342",
    subLabel: "Visitors today",
    valueClass: "text-[oklch(0.546_0.245_262.881)]",
  },
  {
    iconSrc: "icon-30.svg",
    label: "Online Orders",
    value: "156",
    subLabel: "Total orders",
    valueClass: "text-[oklch(0.627_0.194_149.214)]",
  },
  {
    iconSrc: "icon-31.svg",
    label: "Conversion Rate",
    value: "3.2%",
    subLabel: "Visitors to customers",
    valueClass: "text-[oklch(0.558_0.288_302.321)]",
  },
];

/* ════════════════════════════════════════════════════════════════════════════
 *  QUICK ACTIONS
 *
 *  Fields:
 *    iconSrc    {string} — Asset filename for the button icon.
 *    iconClass  {string} — Tailwind colour class for the icon.
 *    label      {string} — Button label text.
 *    action     {string} — Identifier for future click-handler wiring.
 * ════════════════════════════════════════════════════════════════════════════ */

/** @type {Array<object>} Quick action button data. */
var websiteQuickActions = [
  {
    iconSrc: "icon-32.svg",
    iconClass: "text-[oklch(0.546_0.245_262.881)]",
    label: "Manage Banners",
    action: "manage-banners",
  },
  {
    iconSrc: "icon-33.svg",
    iconClass: "text-[oklch(0.627_0.194_149.214)]",
    label: "Edit Pages",
    action: "edit-pages",
  },
  {
    iconSrc: "icon-34.svg",
    iconClass: "text-[oklch(0.558_0.288_302.321)]",
    label: "Manage Products",
    action: "manage-products",
  },
  {
    iconSrc: "icon-35.svg",
    iconClass: "text-[oklch(0.646_0.222_41.116)]",
    label: "Website Settings",
    action: "website-settings",
  },
];

/* ════════════════════════════════════════════════════════════════════════════
 *  POPULAR PRODUCTS TABLE
 *
 *  Fields:
 *    name        {string} — Product display name.
 *    views       {number} — Page view count.
 *    orders      {number} — Order count.
 *    conversion  {string} — Pre-formatted conversion rate string (e.g. "12.3%").
 * ════════════════════════════════════════════════════════════════════════════ */

/** @type {Array<object>} Popular products table data. */
var websitePopularProducts = [
  {
    name: "iPhone 15 Pro Max Case - Black",
    views: 537,
    orders: 66,
    conversion: "12.3%",
  },
  {
    name: "iPhone 15 Case - Clear",
    views: 511,
    orders: 8,
    conversion: "1.6%",
  },
  {
    name: "Samsung S24 Ultra Case - Blue",
    views: 16,
    orders: 76,
    conversion: "475.0%",
  },
  {
    name: "iPhone 14 Leather Case - Brown",
    views: 661,
    orders: 78,
    conversion: "11.8%",
  },
  {
    name: "Samsung S23 Armor Case",
    views: 779,
    orders: 74,
    conversion: "9.5%",
  },
];

/* ════════════════════════════════════════════════════════════════════════════
 *  TAB BAR CONFIGURATION
 *
 *  Fields:
 *    id        {string}  — Unique tab identifier.
 *    iconSrc   {string}  — Asset filename for the tab icon.
 *    label     {string}  — Tab label text.
 *    active    {boolean} — Whether this tab is initially active.
 * ════════════════════════════════════════════════════════════════════════════ */

/** @type {Array<object>} Tab bar configuration. */
var websiteTabs = [
  { id: "overview", iconSrc: "icon-23.svg", label: "Overview", active: true },
  { id: "settings", iconSrc: "icon-24.svg", label: "Settings", active: false },
  { id: "banners", iconSrc: "icon-25.svg", label: "Banners", active: false },
  { id: "pages", iconSrc: "icon-26.svg", label: "Pages", active: false },
  { id: "products", iconSrc: "icon-27.svg", label: "Products", active: false },
];

/* ════════════════════════════════════════════════════════════════════════════
 *  STAT CARD BUILDER
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Builds a single overview stat card <div> from one data record.
 *
 * @param  {object} item — One entry from websiteOverviewStats.
 * @returns {HTMLDivElement}
 */
function buildStatCard(item) {
  var card = document.createElement("div");
  card.className =
    "backdrop-blur-xl bg-[oklab(0.999994_0.0000455677_0.0000200868_/_0.8)] shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.1)_0px_1px_3px_0px,rgba(0,0,0,0.1)_0px_1px_2px_-1px] box-border caret-transparent gap-x-6 flex flex-col outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-6 border border-[oklab(0.928_-0.000571842_-0.00597269_/_0.5)] rounded-xl border-solid";

  /* Header section */
  var headerDiv = document.createElement("div");
  headerDiv.className =
    "items-start box-border caret-transparent gap-x-1.5 grid auto-rows-min grid-rows-[auto_auto] outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1.5 pt-6 pb-2 px-6";

  var h4 = document.createElement("h4");
  h4.className =
    "text-[oklch(0.446_0.03_256.802)] text-sm font-medium items-center box-border caret-transparent gap-x-2 flex leading-5 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-2";

  var icon = document.createElement("img");
  icon.src = WEBSITE_ASSET_BASE + "/" + item.iconSrc;
  icon.alt = "Icon";
  icon.className =
    "box-border caret-transparent h-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] w-4";

  h4.appendChild(icon);
  h4.appendChild(document.createTextNode(item.label));
  headerDiv.appendChild(h4);

  /* Body section */
  var bodyDiv = document.createElement("div");
  bodyDiv.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] pb-6 px-6";

  var valueDiv = document.createElement("div");
  valueDiv.className =
    item.valueClass +
    " text-3xl font-bold box-border caret-transparent leading-9 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)]";
  valueDiv.textContent = item.value;

  var subP = document.createElement("p");
  subP.className =
    "text-[oklch(0.551_0.027_264.364)] text-xs box-border caret-transparent leading-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] mt-1";
  subP.textContent = item.subLabel;

  bodyDiv.appendChild(valueDiv);
  bodyDiv.appendChild(subP);

  card.appendChild(headerDiv);
  card.appendChild(bodyDiv);

  return card;
}

/* ════════════════════════════════════════════════════════════════════════════
 *  QUICK ACTION BUTTON BUILDER
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Builds a single quick action <button> element.
 *
 * @param  {object} item — One entry from websiteQuickActions.
 * @returns {HTMLButtonElement}
 */
function buildQuickActionButton(item) {
  var btn = document.createElement("button");
  btn.className =
    "text-sm font-medium items-center backdrop-blur bg-[oklab(0.999994_0.0000455677_0.0000200868_/_0.6)] caret-transparent gap-x-2 flex flex-col shrink-0 h-24 justify-center leading-5 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-2 text-center text-nowrap border border-[oklab(0.928_-0.000571842_-0.00597269_/_0.8)] px-3 py-2 rounded-lg border-solid";
  btn.dataset.action = item.action;

  var icon = document.createElement("img");
  icon.src = WEBSITE_ASSET_BASE + "/" + item.iconSrc;
  icon.alt = "Icon";
  icon.className =
    item.iconClass +
    " box-border caret-transparent shrink-0 h-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] pointer-events-none text-nowrap w-4";

  var span = document.createElement("span");
  span.className =
    "box-border caret-transparent block outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap";
  span.textContent = item.label;

  btn.appendChild(icon);
  btn.appendChild(span);

  return btn;
}

/* ════════════════════════════════════════════════════════════════════════════
 *  POPULAR PRODUCTS TABLE ROW BUILDER
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Builds a single <tr> for one popular product record.
 *
 * @param  {object}  item      — One entry from websitePopularProducts.
 * @param  {number}  index     — Zero-based row index.
 * @param  {number}  total     — Total rows (detects last row for border removal).
 * @returns {HTMLTableRowElement}
 */
function buildPopularProductRow(item, index, total) {
  var isLastRow = index === total - 1;

  var tr = document.createElement("tr");
  tr.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] align-middle" +
    (isLastRow ? "" : " border-b border-solid border-black/10");

  /* Product Name */
  var tdName = document.createElement("td");
  tdName.className =
    "font-medium box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdName.textContent = item.name;

  /* Views */
  var tdViews = document.createElement("td");
  tdViews.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdViews.textContent = item.views;

  /* Orders */
  var tdOrders = document.createElement("td");
  tdOrders.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  tdOrders.textContent = item.orders;

  /* Conversion badge */
  var tdConversion = document.createElement("td");
  tdConversion.className =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";

  var badge = document.createElement("span");
  badge.className =
    "text-xs font-medium items-center bg-stone-50 box-border caret-transparent gap-x-1 inline-flex shrink-0 justify-center leading-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1 text-nowrap w-fit border overflow-hidden px-2 py-0.5 rounded-md border-solid border-transparent";
  badge.textContent = item.conversion;
  tdConversion.appendChild(badge);

  tr.appendChild(tdName);
  tr.appendChild(tdViews);
  tr.appendChild(tdOrders);
  tr.appendChild(tdConversion);

  return tr;
}

/* ════════════════════════════════════════════════════════════════════════════
 *  TAB BUTTON BUILDER
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Builds a single tab <button> element.
 *
 * @param  {object} item — One entry from websiteTabs.
 * @returns {HTMLButtonElement}
 */
function buildTabButton(item) {
  var btn = document.createElement("button");
  btn.type = "button";
  btn.role = "tab";
  btn.dataset.tabId = item.id;

  var activeClasses =
    "text-zinc-900 text-sm font-medium items-center bg-white caret-transparent gap-x-1.5 flex basis-[0%] grow h-[calc(100%_-_1px)] justify-center leading-5 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1.5 text-center text-nowrap border px-2 py-1 rounded-xl border-solid border-transparent";
  var inactiveClasses =
    "text-zinc-900 text-sm font-medium items-center bg-transparent caret-transparent gap-x-1.5 flex basis-[0%] grow h-[calc(100%_-_1px)] justify-center leading-5 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] gap-y-1.5 text-center text-nowrap border px-2 py-1 rounded-xl border-solid border-transparent";

  btn.className = item.active ? activeClasses : inactiveClasses;
  btn.dataset.activeClass = activeClasses;
  btn.dataset.inactiveClass = inactiveClasses;

  var icon = document.createElement("img");
  icon.src = WEBSITE_ASSET_BASE + "/" + item.iconSrc;
  icon.alt = "Icon";
  icon.className =
    "box-border caret-transparent shrink-0 h-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] pointer-events-none text-nowrap w-4 mr-2";

  btn.appendChild(icon);
  btn.appendChild(document.createTextNode(item.label));

  return btn;
}

/* ════════════════════════════════════════════════════════════════════════════
 *  OVERVIEW PANEL RENDERER
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Fully populates the Overview tab panel using DocumentFragments for
 * minimal DOM reflows.
 *
 * Targets:
 *  - #website-stat-cards-grid   : Overview stat cards container.
 *  - #website-quick-actions-grid: Quick actions grid container.
 *  - #website-popular-tbody     : Popular products <tbody>.
 */
function renderWebsiteOverview() {
  /* ── Stat Cards ─────────────────────────────────────────────────────────── */
  var statsGrid = document.getElementById("website-stat-cards-grid");
  if (statsGrid) {
    statsGrid.innerHTML = "";
    var statsFragment = document.createDocumentFragment();
    for (var i = 0; i < websiteOverviewStats.length; i++) {
      statsFragment.appendChild(buildStatCard(websiteOverviewStats[i]));
    }
    statsGrid.appendChild(statsFragment);
  }

  /* ── Quick Actions ──────────────────────────────────────────────────────── */
  var actionsGrid = document.getElementById("website-quick-actions-grid");
  if (actionsGrid) {
    actionsGrid.innerHTML = "";
    var actionsFragment = document.createDocumentFragment();
    for (var j = 0; j < websiteQuickActions.length; j++) {
      actionsFragment.appendChild(
        buildQuickActionButton(websiteQuickActions[j])
      );
    }
    actionsGrid.appendChild(actionsFragment);
  }

  /* ── Popular Products Table ─────────────────────────────────────────────── */
  var tbody = document.getElementById("website-popular-tbody");
  if (tbody) {
    tbody.innerHTML = "";
    var tableFragment = document.createDocumentFragment();
    var total = websitePopularProducts.length;
    for (var k = 0; k < total; k++) {
      tableFragment.appendChild(
        buildPopularProductRow(websitePopularProducts[k], k, total)
      );
    }
    tbody.appendChild(tableFragment);
  }
}

/* ════════════════════════════════════════════════════════════════════════════
 *  TAB BAR RENDERER
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Clears and repopulates the tab bar from websiteTabs data.
 * Targets: #website-tab-bar
 */
function renderWebsiteTabBar() {
  var tabBar = document.getElementById("website-tab-bar");
  if (!tabBar) return;

  tabBar.innerHTML = "";
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < websiteTabs.length; i++) {
    fragment.appendChild(buildTabButton(websiteTabs[i]));
  }
  tabBar.appendChild(fragment);
}

/* ════════════════════════════════════════════════════════════════════════════
 *  TAB SWITCHING LOGIC
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Attaches click handlers to tab buttons to switch visible panels.
 *
 * Panels are identified by [data-tab-panel="<tabId>"] attributes.
 * The active tab button gets the bg-white / border style; inactive get bg-transparent.
 */
function initWebsiteTabs() {
  var tabBar = document.getElementById("website-tab-bar");
  if (!tabBar) return;

  var tabButtons = tabBar.querySelectorAll("button[data-tab-id]");
  var tabPanels = document.querySelectorAll("[data-tab-panel]");

  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var targetId = btn.dataset.tabId;

      /* Update button styles */
      tabButtons.forEach(function (b) {
        b.className = b.dataset.inactiveClass;
      });
      btn.className = btn.dataset.activeClass;

      /* Switch panels */
      tabPanels.forEach(function (panel) {
        if (panel.dataset.tabPanel === targetId) {
          panel.classList.remove("hidden");
          panel.classList.add("block");
        } else {
          panel.classList.add("hidden");
          panel.classList.remove("block");
        }
      });
    });
  });
}

/* ════════════════════════════════════════════════════════════════════════════
 *  MASTER ENTRY POINT
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Orchestrates the full dynamic render pass for the Website Management page.
 * Called automatically on DOMContentLoaded.
 */
function initWebsiteManagement() {
  renderWebsiteTabBar();
  renderWebsiteOverview();
  initWebsiteTabs();
}

document.addEventListener("DOMContentLoaded", initWebsiteManagement);
