/**
 * components.js
 * Loads shared header.html and sidebar.html into any page.
 *
 * Each page must define (before this script):
 *   window.PAGE_ID   — one of the NAV_CONFIG keys below
 *   window.ASSET_BASE — path prefix to the Anima CDN asset folder for this page
 *                       e.g. "https://c.animaapp.com/mlt18op6AAV2ml/assets"
 */

(function () {
  "use strict";

  /* ─────────────────────────────────────────────
   * 1.  Per-page configuration
   * ───────────────────────────────────────────── */
  var NAV_CONFIG = {
    /* key: PAGE_ID
       title        – shown in the header breadcrumb
       showNewSale  – whether the "New Sale" button appears in the header
       activeNav    – which sidebar nav item gets the active treatment
    */
    "new-sale": {
      title: "New Sale",
      showNewSale: false,
      activeNav: "new-sale",
    },
    inventory: {
      title: "Inventory",
      showNewSale: true,
      activeNav: "inventory",
    },
    products: {
      title: "Products",
      showNewSale: true,
      activeNav: "products",
    },
    categories: {
      title: "Categories",
      showNewSale: true,
      activeNav: "categories",
    },
    pricing: {
      title: "Pricing",
      showNewSale: true,
      activeNav: "pricing",
    },
    warehouse: {
      title: "Warehouse",
      showNewSale: true,
      activeNav: "warehouse",
    },
    shelving: {
      title: "Shelving",
      showNewSale: true,
      activeNav: "shelving",
    },
    purchases: {
      title: "Purchases",
      showNewSale: true,
      activeNav: "purchases",
    },
    customers: {
      title: "Customers",
      showNewSale: true,
      activeNav: "customers",
    },
    staff: {
      title: "Staff",
      showNewSale: true,
      activeNav: "staff",
    },
    invoices: {
      title: "Invoices",
      showNewSale: true,
      activeNav: "invoices",
    },
    templates: {
      title: "Templates",
      showNewSale: true,
      activeNav: "templates",
    },
    returns: {
      title: "Returns",
      showNewSale: true,
      activeNav: "returns",
    },
    reports: {
      title: "Reports",
      showNewSale: true,
      activeNav: "reports",
    },
    website: {
      title: "Website",
      showNewSale: true,
      activeNav: "website",
    },
  };

  /* ─────────────────────────────────────────────
   * 2.  Icon slot → asset filename mapping
   *     These are the icon filenames as they appear in
   *     each page's Anima asset folder.
   *     We keep TWO sets because Panther.html and
   *     Inventory.html share the same sidebar structure
   *     but the Anima export gave them different
   *     sequential filenames.
   *     The ASSET_BASE the page declares will be used,
   *     so the filenames just need to match what is
   *     actually in that CDN folder.
   *
   *     To keep things simple we rely on the page
   *     telling us ASSET_BASE and we use a lookup
   *     table built per known ASSET_BASE.
   * ───────────────────────────────────────────── */

  /* Asset maps keyed by ASSET_BASE */
  var ASSET_MAPS = {};

  /* Panther.html asset map */
  ASSET_MAPS["https://c.animaapp.com/mlt18op6AAV2ml/assets"] = {
    /* header */
    "header-logo-img": "icon-1.svg",
    "header-search-icon": "icon-2.svg",
    "header-search-icon-mobile": "icon-2.svg",
    "header-store-icon": "icon-3.svg",
    "header-new-sale-icon": "icon-5.svg" /* same shopping-bag icon */,
    /* sidebar expand chevron */
    "sidebar-expand-icon": "icon-4.svg",
    /* sidebar nav icons */
    "sidebar-newsale-icon": "icon-5.svg",
    "sidebar-inventory-icon": "icon-6.svg",
    "sidebar-products-icon": "icon-7.svg",
    "sidebar-categories-icon": "icon-8.svg",
    "sidebar-pricing-icon": "icon-9.svg",
    "sidebar-warehouse-icon": "icon-10.svg",
    "sidebar-shelving-icon": "icon-11.svg",
    "sidebar-purchases-icon": "icon-12.svg",
    "sidebar-customers-icon": "icon-13.svg",
    "sidebar-staff-icon": "icon-14.svg",
    "sidebar-invoices-icon": "icon-15.svg",
    "sidebar-templates-icon": "icon-16.svg",
    "sidebar-returns-icon": "icon-17.svg",
    "sidebar-reports-icon": "icon-18.svg",
    "sidebar-website-icon": "icon-19.svg",
  };

  /* Inventory.html asset map */
  ASSET_MAPS["https://c.animaapp.com/mlt6keynOEbpVN/assets"] = {
    /* header */
    "header-logo-img": "icon-1.svg",
    "header-search-icon": "icon-3.svg",
    "header-search-icon-mobile": "icon-3.svg",
    "header-store-icon": "icon-4.svg",
    "header-new-sale-icon": "icon-2.svg",
    /* sidebar expand chevron */
    "sidebar-expand-icon": "icon-5.svg",
    /* sidebar nav icons */
    "sidebar-newsale-icon": "icon-6.svg",
    "sidebar-inventory-icon": "icon-7.svg",
    "sidebar-products-icon": "icon-8.svg",
    "sidebar-categories-icon": "icon-9.svg",
    "sidebar-pricing-icon": "icon-10.svg",
    "sidebar-warehouse-icon": "icon-11.svg",
    "sidebar-shelving-icon": "icon-12.svg",
    "sidebar-purchases-icon": "icon-13.svg",
    "sidebar-customers-icon": "icon-14.svg",
    "sidebar-staff-icon": "icon-15.svg",
    "sidebar-invoices-icon": "icon-16.svg",
    "sidebar-templates-icon": "icon-17.svg",
    "sidebar-returns-icon": "icon-18.svg",
    "sidebar-reports-icon": "icon-19.svg",
    "sidebar-website-icon": "icon-20.svg",
  };

  /* ProductManagement.html asset map */
  ASSET_MAPS["https://c.animaapp.com/mlumnnrdWogcyt/assets"] = {
    /* header */
    "header-logo-img": "icon-1.svg",
    "header-new-sale-icon": "icon-2.svg",
    "header-search-icon": "icon-3.svg",
    "header-search-icon-mobile": "icon-3.svg",
    "header-store-icon": "icon-4.svg",
    /* sidebar expand chevron */
    "sidebar-expand-icon": "icon-5.svg",
    /* sidebar nav icons */
    "sidebar-newsale-icon": "icon-6.svg",
    "sidebar-inventory-icon": "icon-7.svg",
    "sidebar-products-icon": "icon-8.svg",
    "sidebar-categories-icon": "icon-9.svg",
    "sidebar-pricing-icon": "icon-10.svg",
    "sidebar-warehouse-icon": "icon-11.svg",
    "sidebar-shelving-icon": "icon-12.svg",
    "sidebar-purchases-icon": "icon-13.svg",
    "sidebar-customers-icon": "icon-14.svg",
    "sidebar-staff-icon": "icon-15.svg",
    "sidebar-invoices-icon": "icon-16.svg",
    "sidebar-templates-icon": "icon-17.svg",
    "sidebar-returns-icon": "icon-18.svg",
    "sidebar-reports-icon": "icon-19.svg",
    "sidebar-website-icon": "icon-20.svg",
  };

  /* PriceManagement.html asset map */
  ASSET_MAPS["https://c.animaapp.com/mltbff08OJQADD/assets"] = {
    /* header */
    "header-logo-img": "icon-1.svg",
    "header-new-sale-icon": "icon-2.svg",
    "header-search-icon": "icon-3.svg",
    "header-search-icon-mobile": "icon-3.svg",
    "header-store-icon": "icon-4.svg",
    /* sidebar expand chevron */
    "sidebar-expand-icon": "icon-5.svg",
    /* sidebar nav icons */
    "sidebar-newsale-icon": "icon-6.svg",
    "sidebar-inventory-icon": "icon-7.svg",
    "sidebar-products-icon": "icon-8.svg",
    "sidebar-categories-icon": "icon-9.svg",
    "sidebar-pricing-icon": "icon-10.svg",
    "sidebar-warehouse-icon": "icon-11.svg",
    "sidebar-shelving-icon": "icon-12.svg",
    "sidebar-purchases-icon": "icon-13.svg",
    "sidebar-customers-icon": "icon-14.svg",
    "sidebar-staff-icon": "icon-15.svg",
    "sidebar-invoices-icon": "icon-16.svg",
    "sidebar-templates-icon": "icon-17.svg",
    "sidebar-returns-icon": "icon-18.svg",
    "sidebar-reports-icon": "icon-19.svg",
    "sidebar-website-icon": "icon-20.svg",
  };

  /* ProductShelvingManagement.html asset map */
  ASSET_MAPS["https://c.animaapp.com/mltd9ksuMx2CxO/assets"] = {
    /* header */
    "header-logo-img": "icon-1.svg",
    "header-new-sale-icon": "icon-2.svg",
    "header-search-icon": "icon-3.svg",
    "header-search-icon-mobile": "icon-3.svg",
    "header-store-icon": "icon-4.svg",
    /* sidebar expand chevron */
    "sidebar-expand-icon": "icon-5.svg",
    /* sidebar nav icons */
    "sidebar-newsale-icon": "icon-6.svg",
    "sidebar-inventory-icon": "icon-7.svg",
    "sidebar-products-icon": "icon-8.svg",
    "sidebar-categories-icon": "icon-9.svg",
    "sidebar-pricing-icon": "icon-10.svg",
    "sidebar-warehouse-icon": "icon-11.svg",
    "sidebar-shelving-icon": "icon-12.svg",
    "sidebar-purchases-icon": "icon-13.svg",
    "sidebar-customers-icon": "icon-14.svg",
    "sidebar-staff-icon": "icon-15.svg",
    "sidebar-invoices-icon": "icon-16.svg",
    "sidebar-templates-icon": "icon-17.svg",
    "sidebar-returns-icon": "icon-18.svg",
    "sidebar-reports-icon": "icon-19.svg",
    "sidebar-website-icon": "icon-20.svg",
  };

  /* WarehouseManagement.html asset map */
  ASSET_MAPS["https://c.animaapp.com/mltc94xgw7LC6g/assets"] = {
    /* header */
    "header-logo-img": "icon-1.svg",
    "header-new-sale-icon": "icon-2.svg",
    "header-search-icon": "icon-3.svg",
    "header-search-icon-mobile": "icon-3.svg",
    "header-store-icon": "icon-4.svg",
    /* sidebar expand chevron */
    "sidebar-expand-icon": "icon-5.svg",
    /* sidebar nav icons */
    "sidebar-newsale-icon": "icon-6.svg",
    "sidebar-inventory-icon": "icon-7.svg",
    "sidebar-products-icon": "icon-8.svg",
    "sidebar-categories-icon": "icon-9.svg",
    "sidebar-pricing-icon": "icon-10.svg",
    "sidebar-warehouse-icon": "icon-11.svg",
    "sidebar-shelving-icon": "icon-12.svg",
    "sidebar-purchases-icon": "icon-13.svg",
    "sidebar-customers-icon": "icon-14.svg",
    "sidebar-staff-icon": "icon-15.svg",
    "sidebar-invoices-icon": "icon-16.svg",
    "sidebar-templates-icon": "icon-17.svg",
    "sidebar-returns-icon": "icon-18.svg",
    "sidebar-reports-icon": "icon-19.svg",
    "sidebar-website-icon": "icon-20.svg",
  };

  /* PurchaseManagement.html asset map */
  ASSET_MAPS["https://c.animaapp.com/mltdd1b04RiY6X/assets"] = {
    /* header */
    "header-logo-img": "icon-1.svg",
    "header-new-sale-icon": "icon-2.svg",
    "header-search-icon": "icon-3.svg",
    "header-search-icon-mobile": "icon-3.svg",
    "header-store-icon": "icon-4.svg",
    /* sidebar expand chevron */
    "sidebar-expand-icon": "icon-5.svg",
    /* sidebar nav icons */
    "sidebar-newsale-icon": "icon-6.svg",
    "sidebar-inventory-icon": "icon-7.svg",
    "sidebar-products-icon": "icon-8.svg",
    "sidebar-categories-icon": "icon-9.svg",
    "sidebar-pricing-icon": "icon-10.svg",
    "sidebar-warehouse-icon": "icon-11.svg",
    "sidebar-shelving-icon": "icon-12.svg",
    "sidebar-purchases-icon": "icon-13.svg",
    "sidebar-customers-icon": "icon-14.svg",
    "sidebar-staff-icon": "icon-15.svg",
    "sidebar-invoices-icon": "icon-16.svg",
    "sidebar-templates-icon": "icon-17.svg",
    "sidebar-returns-icon": "icon-18.svg",
    "sidebar-reports-icon": "icon-19.svg",
    "sidebar-website-icon": "icon-20.svg",
  };

  /* CustomerManagement.html asset map */
  ASSET_MAPS["https://c.animaapp.com/mltdg2foRe7mQ1/assets"] = {
    /* header */
    "header-logo-img": "icon-1.svg",
    "header-new-sale-icon": "icon-2.svg",
    "header-search-icon": "icon-3.svg",
    "header-search-icon-mobile": "icon-3.svg",
    "header-store-icon": "icon-4.svg",
    /* sidebar expand chevron */
    "sidebar-expand-icon": "icon-5.svg",
    /* sidebar nav icons */
    "sidebar-newsale-icon": "icon-6.svg",
    "sidebar-inventory-icon": "icon-7.svg",
    "sidebar-products-icon": "icon-8.svg",
    "sidebar-categories-icon": "icon-9.svg",
    "sidebar-pricing-icon": "icon-10.svg",
    "sidebar-warehouse-icon": "icon-11.svg",
    "sidebar-shelving-icon": "icon-12.svg",
    "sidebar-purchases-icon": "icon-13.svg",
    "sidebar-customers-icon": "icon-14.svg",
    "sidebar-staff-icon": "icon-15.svg",
    "sidebar-invoices-icon": "icon-16.svg",
    "sidebar-templates-icon": "icon-17.svg",
    "sidebar-returns-icon": "icon-18.svg",
    "sidebar-reports-icon": "icon-19.svg",
    "sidebar-website-icon": "icon-20.svg",
  };

  /* CategoriesManagement.html asset map */
  ASSET_MAPS["https://c.animaapp.com/mlt9zgbxbGhHAE/assets"] = {
    /* header */
    "header-logo-img": "icon-1.svg",
    "header-new-sale-icon": "icon-2.svg",
    "header-search-icon": "icon-3.svg",
    "header-search-icon-mobile": "icon-3.svg",
    "header-store-icon": "icon-4.svg",
    /* sidebar expand chevron */
    "sidebar-expand-icon": "icon-5.svg",
    /* sidebar nav icons */
    "sidebar-newsale-icon": "icon-6.svg",
    "sidebar-inventory-icon": "icon-7.svg",
    "sidebar-products-icon": "icon-8.svg",
    "sidebar-categories-icon": "icon-9.svg",
    "sidebar-pricing-icon": "icon-10.svg",
    "sidebar-warehouse-icon": "icon-11.svg",
    "sidebar-shelving-icon": "icon-12.svg",
    "sidebar-purchases-icon": "icon-13.svg",
    "sidebar-customers-icon": "icon-14.svg",
    "sidebar-staff-icon": "icon-15.svg",
    "sidebar-invoices-icon": "icon-16.svg",
    "sidebar-templates-icon": "icon-17.svg",
    "sidebar-returns-icon": "icon-18.svg",
    "sidebar-reports-icon": "icon-19.svg",
    "sidebar-website-icon": "icon-20.svg",
  };

  /* InvoiceTemplates.html asset map */
  ASSET_MAPS["https://c.animaapp.com/mlun6fsjfLZwOf/assets"] = {
    /* header */
    "header-logo-img": "icon-1.svg",
    "header-new-sale-icon": "icon-2.svg",
    "header-search-icon": "icon-3.svg",
    "header-search-icon-mobile": "icon-3.svg",
    "header-store-icon": "icon-4.svg",
    /* sidebar expand chevron */
    "sidebar-expand-icon": "icon-5.svg",
    /* sidebar nav icons */
    "sidebar-newsale-icon": "icon-6.svg",
    "sidebar-inventory-icon": "icon-7.svg",
    "sidebar-products-icon": "icon-8.svg",
    "sidebar-categories-icon": "icon-9.svg",
    "sidebar-pricing-icon": "icon-10.svg",
    "sidebar-warehouse-icon": "icon-11.svg",
    "sidebar-shelving-icon": "icon-12.svg",
    "sidebar-purchases-icon": "icon-13.svg",
    "sidebar-customers-icon": "icon-14.svg",
    "sidebar-staff-icon": "icon-15.svg",
    "sidebar-invoices-icon": "icon-16.svg",
    "sidebar-templates-icon": "icon-17.svg",
    "sidebar-returns-icon": "icon-18.svg",
    "sidebar-reports-icon": "icon-19.svg",
    "sidebar-website-icon": "icon-20.svg",
  };

  /* AdvancedReports_Analytics.html asset map */
  ASSET_MAPS["https://c.animaapp.com/mlusi31a23OTLI/assets"] = {
    /* header */
    "header-logo-img": "icon-1.svg",
    "header-new-sale-icon": "icon-2.svg",
    "header-search-icon": "icon-3.svg",
    "header-search-icon-mobile": "icon-3.svg",
    "header-store-icon": "icon-4.svg",
    /* sidebar expand chevron */
    "sidebar-expand-icon": "icon-5.svg",
    /* sidebar nav icons */
    "sidebar-newsale-icon": "icon-6.svg",
    "sidebar-inventory-icon": "icon-7.svg",
    "sidebar-products-icon": "icon-8.svg",
    "sidebar-categories-icon": "icon-9.svg",
    "sidebar-pricing-icon": "icon-10.svg",
    "sidebar-warehouse-icon": "icon-11.svg",
    "sidebar-shelving-icon": "icon-12.svg",
    "sidebar-purchases-icon": "icon-13.svg",
    "sidebar-customers-icon": "icon-14.svg",
    "sidebar-staff-icon": "icon-15.svg",
    "sidebar-invoices-icon": "icon-16.svg",
    "sidebar-templates-icon": "icon-17.svg",
    "sidebar-returns-icon": "icon-18.svg",
    "sidebar-reports-icon": "icon-19.svg",
    "sidebar-website-icon": "icon-20.svg",
  };

  /* WebsiteManagement.html asset map
   * ASSET_BASE = "https://c.animaapp.com/mlur29t8j9XsT1/assets"
   * Icon numbers verified directly from WebsiteManagement.html Anima export.
   *   icon-1  = logo
   *   icon-2  = new-sale button icon
   *   icon-3  = search
   *   icon-4  = store
   *   icon-5  = sidebar expand chevron
   *   icon-6  = new sale nav
   *   icon-7  = inventory
   *   icon-8  = products
   *   icon-9  = categories
   *   icon-10 = pricing
   *   icon-11 = warehouse
   *   icon-12 = shelving
   *   icon-13 = purchases
   *   icon-14 = customers
   *   icon-15 = staff
   *   icon-16 = invoices
   *   icon-17 = templates
   *   icon-18 = returns
   *   icon-19 = reports
   *   icon-20 = website (active)
   */
  ASSET_MAPS["https://c.animaapp.com/mlur29t8j9XsT1/assets"] = {
    /* header */
    "header-logo-img": "icon-1.svg",
    "header-new-sale-icon": "icon-2.svg",
    "header-search-icon": "icon-3.svg",
    "header-search-icon-mobile": "icon-3.svg",
    "header-store-icon": "icon-4.svg",
    /* sidebar expand chevron */
    "sidebar-expand-icon": "icon-5.svg",
    /* sidebar nav icons */
    "sidebar-newsale-icon": "icon-6.svg",
    "sidebar-inventory-icon": "icon-7.svg",
    "sidebar-products-icon": "icon-8.svg",
    "sidebar-categories-icon": "icon-9.svg",
    "sidebar-pricing-icon": "icon-10.svg",
    "sidebar-warehouse-icon": "icon-11.svg",
    "sidebar-shelving-icon": "icon-12.svg",
    "sidebar-purchases-icon": "icon-13.svg",
    "sidebar-customers-icon": "icon-14.svg",
    "sidebar-staff-icon": "icon-15.svg",
    "sidebar-invoices-icon": "icon-16.svg",
    "sidebar-templates-icon": "icon-17.svg",
    "sidebar-returns-icon": "icon-18.svg",
    "sidebar-reports-icon": "icon-19.svg",
    "sidebar-website-icon": "icon-20.svg",
  };

  /* StaffManagement.html asset map */
  ASSET_MAPS["https://c.animaapp.com/mlumwuqmTtBvBu/assets"] = {
    /* header */
    "header-logo-img": "icon-1.svg",
    "header-new-sale-icon": "icon-2.svg",
    "header-search-icon": "icon-3.svg",
    "header-search-icon-mobile": "icon-3.svg",
    "header-store-icon": "icon-4.svg",
    /* sidebar expand chevron */
    "sidebar-expand-icon": "icon-5.svg",
    /* sidebar nav icons */
    "sidebar-newsale-icon": "icon-6.svg",
    "sidebar-inventory-icon": "icon-7.svg",
    "sidebar-products-icon": "icon-8.svg",
    "sidebar-categories-icon": "icon-9.svg",
    "sidebar-pricing-icon": "icon-10.svg",
    "sidebar-warehouse-icon": "icon-11.svg",
    "sidebar-shelving-icon": "icon-12.svg",
    "sidebar-purchases-icon": "icon-13.svg",
    "sidebar-customers-icon": "icon-14.svg",
    "sidebar-staff-icon": "icon-15.svg",
    "sidebar-invoices-icon": "icon-16.svg",
    "sidebar-templates-icon": "icon-17.svg",
    "sidebar-returns-icon": "icon-18.svg",
    "sidebar-reports-icon": "icon-19.svg",
    "sidebar-website-icon": "icon-20.svg",
  };

  /* ─────────────────────────────────────────────
   * 3.  Active-state classes
   *     Exactly as found in the original pages.
   * ───────────────────────────────────────────── */

  /* Classes added to the <a> wrapper when active */
  var ACTIVE_LINK_ADD =
    "bg-[oklch(0.97_0.014_254.604)] shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.1)_0px_1px_3px_0px,rgba(0,0,0,0.1)_0px_1px_2px_-1px]".split(
      " "
    );

  /* The icon-wrap background on the active "New Sale" item in Panther */
  var ACTIVE_NEWSALE_ICON_BG =
    "bg-[linear-gradient(to_right_bottom,oklch(0.623_0.214_259.815)_0%,oklch(0.715_0.143_215.221)_100%)] shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.1)_0px_1px_3px_0px,rgba(0,0,0,0.1)_0px_1px_2px_-1px]".split(
      " "
    );

  /* The icon-wrap background on the active "Inventory" item */
  var ACTIVE_INVENTORY_ICON_BG =
    "bg-[linear-gradient(to_right_bottom,oklch(0.696_0.17_162.48)_0%,oklch(0.704_0.14_182.503)_100%)] shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.1)_0px_1px_3px_0px,rgba(0,0,0,0.1)_0px_1px_2px_-1px]".split(
      " "
    );

  /* Generic gradient for any other active item */
  var ACTIVE_GENERIC_ICON_BG =
    "bg-[linear-gradient(to_right_bottom,oklch(0.623_0.214_259.815)_0%,oklch(0.546_0.245_262.881)_100%)] shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.1)_0px_1px_3px_0px,rgba(0,0,0,0.1)_0px_1px_2px_-1px]".split(
      " "
    );

  var DEFAULT_ICON_BG = "bg-[oklch(0.967_0.003_264.542)]";

  /* ─────────────────────────────────────────────
   * 4.  Helpers
   * ───────────────────────────────────────────── */
  function fetchHTML(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        cb(null, xhr.responseText);
      } else {
        cb(new Error("Failed to load " + url + " (" + xhr.status + ")"));
      }
    };
    xhr.onerror = function () {
      cb(new Error("Network error loading " + url));
    };
    xhr.send();
  }

  function resolveComponentPath(filename) {
    /* Allow the page to override the component directory */
    var base = window.COMPONENTS_BASE || "";
    /* Trim trailing slash if any */
    if (base && base.charAt(base.length - 1) === "/") {
      base = base.slice(0, -1);
    }
    return base ? base + "/" + filename : filename;
  }

  function applyAssets(assetMap, base) {
    Object.keys(assetMap).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        el.src = base + "/" + assetMap[id];
      }
    });
  }

  function addClasses(el, classes) {
    classes.forEach(function (c) {
      if (c) el.classList.add(c);
    });
  }

  function removeClasses(el, classes) {
    classes.forEach(function (c) {
      if (c) el.classList.remove(c);
    });
  }

  /* ─────────────────────────────────────────────
   * 5.  Apply active state to one sidebar item
   * ───────────────────────────────────────────── */

  /* All nav IDs in sidebar order */
  var ALL_NAV_IDS = [
    "new-sale",
    "inventory",
    "products",
    "categories",
    "pricing",
    "warehouse",
    "shelving",
    "purchases",
    "customers",
    "staff",
    "invoices",
    "templates",
    "returns",
    "reports",
    "website",
  ];

  function activateSidebarItem(navId) {
    /* ── STEP 1: Reset EVERY item to default first ──────────────────
       This guarantees no stale active styling ever bleeds onto any
       item other than the one we are about to activate.              */
    ALL_NAV_IDS.forEach(function (id) {
      var lEl = document.getElementById("nav-" + id);
      var bEl = document.getElementById("nav-" + id + "-active-bar");
      var wEl = document.getElementById("nav-" + id + "-icon-wrap");

      if (lEl) removeClasses(lEl, ACTIVE_LINK_ADD);
      if (bEl) bEl.classList.add("hidden");
      if (wEl) {
        removeClasses(wEl, ACTIVE_NEWSALE_ICON_BG);
        removeClasses(wEl, ACTIVE_INVENTORY_ICON_BG);
        removeClasses(wEl, ACTIVE_GENERIC_ICON_BG);
        wEl.classList.add(DEFAULT_ICON_BG);

        var img = wEl.querySelector("img");
        if (img) {
          /* Clear the invert filter — restore dark icon appearance */
          img.style.filter = "";
        }
      }
    });

    /* ── STEP 2: Activate only the selected item ────────────────── */
    var linkEl = document.getElementById("nav-" + navId);
    var barEl = document.getElementById("nav-" + navId + "-active-bar");
    var iconWrapEl = document.getElementById("nav-" + navId + "-icon-wrap");

    if (!linkEl) return;

    /* Highlight the link wrapper */
    addClasses(linkEl, ACTIVE_LINK_ADD);

    /* Show the active left-edge bar */
    if (barEl) barEl.classList.remove("hidden");

    /* Icon wrap: swap grey bg for the coloured gradient */
    if (iconWrapEl) {
      iconWrapEl.classList.remove(DEFAULT_ICON_BG);

      var gradientClasses;
      if (navId === "new-sale") {
        gradientClasses = ACTIVE_NEWSALE_ICON_BG;
      } else if (navId === "inventory") {
        gradientClasses = ACTIVE_INVENTORY_ICON_BG;
      } else {
        gradientClasses = ACTIVE_GENERIC_ICON_BG;
      }
      addClasses(iconWrapEl, gradientClasses);

      /* ── KEY FIX ─────────────────────────────────────────────────
         text-white / CSS `color` has NO effect on <img> elements.
         CSS filter is the correct way to recolour an <img>:
           brightness(0)  →  collapses the image to pure black
           invert(1)      →  flips black → white
         Result: any dark icon SVG/PNG becomes clean white,
         perfectly visible on the coloured gradient background.
         Only THIS img gets the filter — all others were cleared
         in the reset loop above, so no other icon turns white.   */
      var iconImg = iconWrapEl.querySelector("img");
      if (iconImg) {
        iconImg.style.filter = "brightness(0) invert(1)";
      }
    }
  }

  /* ─────────────────────────────────────────────
   * 6.  Orchestration
   * ───────────────────────────────────────────── */
  function init() {
    var pageId = window.PAGE_ID || "new-sale";
    var assetBase = window.ASSET_BASE || "";
    var config = NAV_CONFIG[pageId] || NAV_CONFIG["new-sale"];
    var assetMap = ASSET_MAPS[assetBase] || {};

    var headerSlot = document.getElementById("header-slot");
    var sidebarSlot = document.getElementById("sidebar-slot");

    if (!headerSlot || !sidebarSlot) {
      console.warn(
        "components.js: #header-slot or #sidebar-slot not found in page."
      );
      return;
    }

    var loaded = 0;

    function onBothLoaded() {
      /* ---- Header ---- */
      /* Page title */
      var titleEl = document.getElementById("header-page-title");
      if (titleEl) titleEl.textContent = config.title;

      /* "New Sale" button visibility */
      var newSaleBtnWrap = document.getElementById("header-new-sale-btn-wrap");
      if (newSaleBtnWrap) {
        if (config.showNewSale) {
          /* Remove the hidden class so the md:block rule takes effect */
          newSaleBtnWrap.classList.remove("hidden");
        } else {
          newSaleBtnWrap.classList.add("hidden");
        }
      }

      /* ---- Sidebar active state ---- */
      activateSidebarItem(config.activeNav);

      /* ---- Restore sidebar open/close state ---- */
      restoreSidebarState();

      /* ---- Asset images ---- */
      applyAssets(assetMap, assetBase);
    }

    function tryDone() {
      loaded += 1;
      if (loaded === 2) onBothLoaded();
    }

    /* Load header */
    fetchHTML(resolveComponentPath("/header.html"), function (err, html) {
      if (err) {
        console.error(err);
        return;
      }
      headerSlot.innerHTML = html;
      tryDone();
    });

    /* Load sidebar */
    fetchHTML(resolveComponentPath("/sidebar.html"), function (err, html) {
      if (err) {
        console.error(err);
        return;
      }
      sidebarSlot.innerHTML = html;
      tryDone();
    });
  }

  /* ─────────────────────────────────────────────
   * 7.  Desktop sidebar toggle (exposed globally)
   * ───────────────────────────────────────────── */
  window.toggleDesktopSidebar = function () {
    var sidebar = document.getElementById("main-sidebar");
    if (!sidebar) return;
    sidebar.classList.toggle("expanded");
    /* Persist state so it survives page navigation */
    try {
      localStorage.setItem(
        "sidebarExpanded",
        sidebar.classList.contains("expanded") ? "1" : "0"
      );
    } catch (e) {}
  };

  function restoreSidebarState() {
    try {
      var saved = localStorage.getItem("sidebarExpanded");
      if (saved === "1") {
        var sidebar = document.getElementById("main-sidebar");
        if (sidebar) sidebar.classList.add("expanded");
      }
    } catch (e) {}
  }

  /* Run after DOM is ready */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
