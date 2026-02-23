/**
 * BNM Parts — Advanced Reports & Analytics
 * AdvancedReportsData.js
 *
 * Dedicated data engine for AdvancedReports_Analytics.html.
 * DO NOT MERGE with any other data files.
 *
 * Architecture:
 *   SECTION 1 — DATA SOURCES  (products, customers, invoices, purchases)
 *   SECTION 2 — COMPUTE LAYER (pure analytic functions)
 *   SECTION 3 — RENDER LAYER  (DOM update helpers for cards, tables, grids)
 *   SECTION 4 — CHART LAYER   (Chart.js responsive factory functions)
 *   SECTION 5 — TAB CONTROLLER (tab switching + lazy chart init)
 *   SECTION 6 — ENTRY POINT   (DOMContentLoaded bootstrapper)
 */

(function () {
  "use strict";

  /* ═══════════════════════════════════════════════════════
   *  SECTION 1 — DATA SOURCES
   * ═══════════════════════════════════════════════════════ */

  var productsData = [
    // Cases (10)
    {
      id: "PRD-001",
      name: "iPhone 15 Pro Max Case",
      category: "Cases",
      stock: 85,
      costPrice: 4.5,
      sellPrice: 14.99,
    },
    {
      id: "PRD-002",
      name: "Samsung Galaxy S24 Case",
      category: "Cases",
      stock: 120,
      costPrice: 3.8,
      sellPrice: 12.99,
    },
    {
      id: "PRD-003",
      name: "Leather Wallet Case",
      category: "Cases",
      stock: 45,
      costPrice: 8.0,
      sellPrice: 24.99,
    },
    {
      id: "PRD-004",
      name: "Clear Slim Case",
      category: "Cases",
      stock: 200,
      costPrice: 1.5,
      sellPrice: 6.99,
    },
    {
      id: "PRD-005",
      name: "Rugged Shockproof Case",
      category: "Cases",
      stock: 60,
      costPrice: 6.0,
      sellPrice: 19.99,
    },
    {
      id: "PRD-006",
      name: "Silicone Case Multipack",
      category: "Cases",
      stock: 150,
      costPrice: 5.0,
      sellPrice: 15.99,
    },
    {
      id: "PRD-007",
      name: "Folio Flip Case",
      category: "Cases",
      stock: 40,
      costPrice: 9.5,
      sellPrice: 28.99,
    },
    {
      id: "PRD-008",
      name: "MagSafe Compatible Case",
      category: "Cases",
      stock: 75,
      costPrice: 7.0,
      sellPrice: 22.99,
    },
    {
      id: "PRD-009",
      name: "Kids Drop-Proof Case",
      category: "Cases",
      stock: 55,
      costPrice: 5.5,
      sellPrice: 17.99,
    },
    {
      id: "PRD-010",
      name: "Ultra Thin Case",
      category: "Cases",
      stock: 224,
      costPrice: 1.2,
      sellPrice: 5.99,
    },
    // Cables (7)
    {
      id: "PRD-011",
      name: "USB-C to USB-C Cable 1m",
      category: "Cables",
      stock: 300,
      costPrice: 2.0,
      sellPrice: 8.99,
    },
    {
      id: "PRD-012",
      name: "USB-C to Lightning Cable",
      category: "Cables",
      stock: 250,
      costPrice: 2.5,
      sellPrice: 9.99,
    },
    {
      id: "PRD-013",
      name: "Braided USB-C Cable 2m",
      category: "Cables",
      stock: 180,
      costPrice: 3.5,
      sellPrice: 12.99,
    },
    {
      id: "PRD-014",
      name: "Micro-USB Cable Pack x3",
      category: "Cables",
      stock: 150,
      costPrice: 4.0,
      sellPrice: 13.99,
    },
    {
      id: "PRD-015",
      name: "MagSafe Charging Cable",
      category: "Cables",
      stock: 200,
      costPrice: 6.0,
      sellPrice: 19.99,
    },
    {
      id: "PRD-016",
      name: "Right Angle USB-C Cable",
      category: "Cables",
      stock: 120,
      costPrice: 3.0,
      sellPrice: 10.99,
    },
    {
      id: "PRD-017",
      name: "Retractable USB Cable",
      category: "Cables",
      stock: 244,
      costPrice: 2.8,
      sellPrice: 9.99,
    },
    // Chargers (8)
    {
      id: "PRD-018",
      name: "65W GaN Charger",
      category: "Chargers",
      stock: 80,
      costPrice: 12.0,
      sellPrice: 39.99,
    },
    {
      id: "PRD-019",
      name: "20W USB-C Fast Charger",
      category: "Chargers",
      stock: 150,
      costPrice: 7.0,
      sellPrice: 22.99,
    },
    {
      id: "PRD-020",
      name: "Wireless Charging Pad 15W",
      category: "Chargers",
      stock: 90,
      costPrice: 9.0,
      sellPrice: 29.99,
    },
    {
      id: "PRD-021",
      name: "Dual Port Car Charger",
      category: "Chargers",
      stock: 120,
      costPrice: 5.0,
      sellPrice: 16.99,
    },
    {
      id: "PRD-022",
      name: "3-in-1 Wireless Charger",
      category: "Chargers",
      stock: 50,
      costPrice: 15.0,
      sellPrice: 49.99,
    },
    {
      id: "PRD-023",
      name: "USB Wall Adapter 4-Port",
      category: "Chargers",
      stock: 180,
      costPrice: 8.0,
      sellPrice: 24.99,
    },
    {
      id: "PRD-024",
      name: "MagSafe Charger 15W",
      category: "Chargers",
      stock: 90,
      costPrice: 18.0,
      sellPrice: 45.99,
    },
    {
      id: "PRD-025",
      name: "Solar Panel Charger",
      category: "Chargers",
      stock: 132,
      costPrice: 14.0,
      sellPrice: 39.99,
    },
    // Screen Protectors (5)
    {
      id: "PRD-026",
      name: "Tempered Glass iPhone 15",
      category: "Screen Protectors",
      stock: 400,
      costPrice: 1.5,
      sellPrice: 7.99,
    },
    {
      id: "PRD-027",
      name: "Privacy Screen Protector",
      category: "Screen Protectors",
      stock: 250,
      costPrice: 2.5,
      sellPrice: 11.99,
    },
    {
      id: "PRD-028",
      name: "Samsung S24 Glass Guard",
      category: "Screen Protectors",
      stock: 300,
      costPrice: 1.8,
      sellPrice: 8.99,
    },
    {
      id: "PRD-029",
      name: "Matte Film Protector",
      category: "Screen Protectors",
      stock: 200,
      costPrice: 1.2,
      sellPrice: 5.99,
    },
    {
      id: "PRD-030",
      name: "Anti-Blue Light Screen",
      category: "Screen Protectors",
      stock: 123,
      costPrice: 2.0,
      sellPrice: 9.99,
    },
    // Accessories (8)
    {
      id: "PRD-031",
      name: "PopSocket Phone Grip",
      category: "Accessories",
      stock: 300,
      costPrice: 2.0,
      sellPrice: 9.99,
    },
    {
      id: "PRD-032",
      name: "Phone Tripod Mount",
      category: "Accessories",
      stock: 150,
      costPrice: 5.0,
      sellPrice: 17.99,
    },
    {
      id: "PRD-033",
      name: "Ring Light Selfie",
      category: "Accessories",
      stock: 80,
      costPrice: 6.0,
      sellPrice: 21.99,
    },
    {
      id: "PRD-034",
      name: "Card Slot Holder",
      category: "Accessories",
      stock: 400,
      costPrice: 1.0,
      sellPrice: 5.99,
    },
    {
      id: "PRD-035",
      name: "Magnetic Car Mount",
      category: "Accessories",
      stock: 200,
      costPrice: 4.0,
      sellPrice: 14.99,
    },
    {
      id: "PRD-036",
      name: "Phone Stand Adjustable",
      category: "Accessories",
      stock: 250,
      costPrice: 3.5,
      sellPrice: 12.99,
    },
    {
      id: "PRD-037",
      name: "Lens Kit 3-in-1",
      category: "Accessories",
      stock: 60,
      costPrice: 8.0,
      sellPrice: 24.99,
    },
    {
      id: "PRD-038",
      name: "Waterproof Phone Pouch",
      category: "Accessories",
      stock: 307,
      costPrice: 2.5,
      sellPrice: 9.99,
    },
    // Audio (6)
    {
      id: "PRD-039",
      name: "Bluetooth Earbuds Pro",
      category: "Audio",
      stock: 120,
      costPrice: 18.0,
      sellPrice: 54.99,
    },
    {
      id: "PRD-040",
      name: "Over-Ear Headphones",
      category: "Audio",
      stock: 60,
      costPrice: 25.0,
      sellPrice: 79.99,
    },
    {
      id: "PRD-041",
      name: "In-Ear Sports Earphones",
      category: "Audio",
      stock: 180,
      costPrice: 8.0,
      sellPrice: 24.99,
    },
    {
      id: "PRD-042",
      name: "ANC Wireless Headphones",
      category: "Audio",
      stock: 40,
      costPrice: 40.0,
      sellPrice: 119.99,
    },
    {
      id: "PRD-043",
      name: "USB-C Earphones",
      category: "Audio",
      stock: 200,
      costPrice: 5.0,
      sellPrice: 15.99,
    },
    {
      id: "PRD-044",
      name: "Wired Earphones 3.5mm",
      category: "Audio",
      stock: 107,
      costPrice: 4.0,
      sellPrice: 12.99,
    },
    // Power Banks (5)
    {
      id: "PRD-045",
      name: "10000mAh Power Bank",
      category: "Power Banks",
      stock: 150,
      costPrice: 12.0,
      sellPrice: 34.99,
    },
    {
      id: "PRD-046",
      name: "20000mAh Power Bank",
      category: "Power Banks",
      stock: 100,
      costPrice: 18.0,
      sellPrice: 49.99,
    },
    {
      id: "PRD-047",
      name: "Slim 5000mAh Power Bank",
      category: "Power Banks",
      stock: 120,
      costPrice: 8.0,
      sellPrice: 24.99,
    },
    {
      id: "PRD-048",
      name: "Solar Power Bank 15000mAh",
      category: "Power Banks",
      stock: 80,
      costPrice: 20.0,
      sellPrice: 59.99,
    },
    {
      id: "PRD-049",
      name: "MagSafe Battery Pack",
      category: "Power Banks",
      stock: 83,
      costPrice: 22.0,
      sellPrice: 64.99,
    },
    // Adapters (4)
    {
      id: "PRD-050",
      name: "USB-C to 3.5mm Adapter",
      category: "Adapters",
      stock: 300,
      costPrice: 2.0,
      sellPrice: 9.99,
    },
    {
      id: "PRD-051",
      name: "Lightning to USB-C Adapter",
      category: "Adapters",
      stock: 200,
      costPrice: 3.0,
      sellPrice: 12.99,
    },
    {
      id: "PRD-052",
      name: "HDMI to USB-C Adapter",
      category: "Adapters",
      stock: 100,
      costPrice: 6.0,
      sellPrice: 24.99,
    },
    {
      id: "PRD-053",
      name: "Multi-Port USB Hub",
      category: "Adapters",
      stock: 66,
      costPrice: 10.0,
      sellPrice: 34.99,
    },
  ];

  var customersData = [
    {
      id: "CUST-001",
      name: "ABC Electronics Wholesale",
      type: "wholesaler",
      joined: "Jan 15, 2023",
    },
    {
      id: "CUST-002",
      name: "TechMaster Wholesale Ltd",
      type: "wholesaler",
      joined: "Feb 10, 2023",
    },
    {
      id: "CUST-003",
      name: "Mobile Accessories Direct",
      type: "wholesaler",
      joined: "Mar 5, 2023",
    },
    {
      id: "CUST-004",
      name: "GadgetPro Wholesale UK",
      type: "wholesaler",
      joined: "Apr 20, 2023",
    },
    {
      id: "CUST-005",
      name: "ElectroBulk Suppliers",
      type: "wholesaler",
      joined: "Jun 8, 2023",
    },
    {
      id: "CUST-006",
      name: "London Mobile Traders",
      type: "trader",
      joined: "Jan 25, 2023",
    },
    {
      id: "CUST-007",
      name: "Birmingham Phone Mart",
      type: "trader",
      joined: "Feb 28, 2023",
    },
    {
      id: "CUST-008",
      name: "Manchester Tech Traders",
      type: "trader",
      joined: "Apr 12, 2023",
    },
    {
      id: "CUST-009",
      name: "Leeds Mobile Trade",
      type: "trader",
      joined: "May 18, 2023",
    },
    {
      id: "CUST-010",
      name: "Glasgow Gadget Traders",
      type: "trader",
      joined: "Jul 30, 2023",
    },
    {
      id: "CUST-011",
      name: "Bristol Phone Trade",
      type: "trader",
      joined: "Sep 14, 2023",
    },
    {
      id: "CUST-012",
      name: "John Smith",
      type: "retailer",
      joined: "Feb 3, 2023",
    },
    {
      id: "CUST-013",
      name: "Emma Johnson",
      type: "retailer",
      joined: "Feb 22, 2023",
    },
    {
      id: "CUST-014",
      name: "Michael Brown",
      type: "retailer",
      joined: "Mar 14, 2023",
    },
    {
      id: "CUST-015",
      name: "Sarah Davis",
      type: "retailer",
      joined: "Mar 28, 2023",
    },
    {
      id: "CUST-016",
      name: "James Wilson",
      type: "retailer",
      joined: "Apr 5, 2023",
    },
    {
      id: "CUST-017",
      name: "Olivia Taylor",
      type: "retailer",
      joined: "May 9, 2023",
    },
    {
      id: "CUST-018",
      name: "William Anderson",
      type: "retailer",
      joined: "Jun 17, 2023",
    },
    {
      id: "CUST-019",
      name: "Sophie Martinez",
      type: "retailer",
      joined: "Jul 22, 2023",
    },
    {
      id: "CUST-020",
      name: "Robert Thomas",
      type: "retailer",
      joined: "Aug 8, 2023",
    },
    {
      id: "CUST-021",
      name: "Charlotte Garcia",
      type: "retailer",
      joined: "Sep 3, 2023",
    },
    {
      id: "CUST-022",
      name: "Daniel Lee",
      type: "retailer",
      joined: "Oct 11, 2023",
    },
    {
      id: "CUST-023",
      name: "Isabella Robinson",
      type: "retailer",
      joined: "Nov 5, 2023",
    },
    {
      id: "CUST-024",
      name: "Matthew Clark",
      type: "retailer",
      joined: "Dec 1, 2023",
    },
    {
      id: "CUST-025",
      name: "Amelia White",
      type: "retailer",
      joined: "Jan 8, 2024",
    },
  ];

  var invoicesData = [
    {
      id: "INV-001",
      customerName: "ABC Electronics Wholesale",
      date: "Nov 12, 2024",
      items: 45,
      paymentMethod: "Bank Transfer",
      status: "paid",
      subtotal: 3980.0,
      taxRate: 20,
      taxAmount: 796.0,
      total: 4776.0,
    },
    {
      id: "INV-002",
      customerName: "London Mobile Traders",
      date: "Nov 28, 2024",
      items: 18,
      paymentMethod: "Card",
      status: "paid",
      subtotal: 1540.0,
      taxRate: 20,
      taxAmount: 308.0,
      total: 1848.0,
    },
    {
      id: "INV-003",
      customerName: "TechMaster Wholesale Ltd",
      date: "Dec 5, 2024",
      items: 62,
      paymentMethod: "Bank Transfer",
      status: "paid",
      subtotal: 5200.0,
      taxRate: 20,
      taxAmount: 1040.0,
      total: 6240.0,
    },
    {
      id: "INV-004",
      customerName: "John Smith",
      date: "Dec 14, 2024",
      items: 3,
      paymentMethod: "Cash",
      status: "paid",
      subtotal: 79.97,
      taxRate: 20,
      taxAmount: 16.0,
      total: 95.97,
    },
    {
      id: "INV-005",
      customerName: "Birmingham Phone Mart",
      date: "Jan 8, 2025",
      items: 25,
      paymentMethod: "Card",
      status: "paid",
      subtotal: 2100.0,
      taxRate: 20,
      taxAmount: 420.0,
      total: 2520.0,
    },
    {
      id: "INV-006",
      customerName: "Mobile Accessories Direct",
      date: "Jan 22, 2025",
      items: 80,
      paymentMethod: "Bank Transfer",
      status: "pending",
      subtotal: 6800.0,
      taxRate: 20,
      taxAmount: 1360.0,
      total: 8160.0,
    },
    {
      id: "INV-007",
      customerName: "Emma Johnson",
      date: "Feb 3, 2025",
      items: 2,
      paymentMethod: "Cash",
      status: "paid",
      subtotal: 34.98,
      taxRate: 20,
      taxAmount: 7.0,
      total: 41.98,
    },
    {
      id: "INV-008",
      customerName: "GadgetPro Wholesale UK",
      date: "Feb 14, 2025",
      items: 55,
      paymentMethod: "Bank Transfer",
      status: "overdue",
      subtotal: 4680.0,
      taxRate: 20,
      taxAmount: 936.0,
      total: 5616.0,
    },
    {
      id: "INV-009",
      customerName: "Manchester Tech Traders",
      date: "Mar 2, 2025",
      items: 30,
      paymentMethod: "Card",
      status: "paid",
      subtotal: 2560.0,
      taxRate: 20,
      taxAmount: 512.0,
      total: 3072.0,
    },
    {
      id: "INV-010",
      customerName: "Michael Brown",
      date: "Mar 18, 2025",
      items: 5,
      paymentMethod: "Cash",
      status: "paid",
      subtotal: 119.95,
      taxRate: 20,
      taxAmount: 24.0,
      total: 143.95,
    },
    {
      id: "INV-011",
      customerName: "ElectroBulk Suppliers",
      date: "Apr 10, 2025",
      items: 90,
      paymentMethod: "Bank Transfer",
      status: "paid",
      subtotal: 7500.0,
      taxRate: 20,
      taxAmount: 1500.0,
      total: 9000.0,
    },
    {
      id: "INV-012",
      customerName: "Leeds Mobile Trade",
      date: "Apr 25, 2025",
      items: 22,
      paymentMethod: "Card",
      status: "pending",
      subtotal: 1890.0,
      taxRate: 20,
      taxAmount: 378.0,
      total: 2268.0,
    },
    {
      id: "INV-013",
      customerName: "Sarah Davis",
      date: "May 7, 2025",
      items: 4,
      paymentMethod: "Card",
      status: "paid",
      subtotal: 89.96,
      taxRate: 20,
      taxAmount: 18.0,
      total: 107.96,
    },
    {
      id: "INV-014",
      customerName: "ABC Electronics Wholesale",
      date: "May 20, 2025",
      items: 70,
      paymentMethod: "Bank Transfer",
      status: "paid",
      subtotal: 5900.0,
      taxRate: 20,
      taxAmount: 1180.0,
      total: 7080.0,
    },
    {
      id: "INV-015",
      customerName: "Glasgow Gadget Traders",
      date: "Jun 5, 2025",
      items: 35,
      paymentMethod: "Card",
      status: "paid",
      subtotal: 2975.0,
      taxRate: 20,
      taxAmount: 595.0,
      total: 3570.0,
    },
    {
      id: "INV-016",
      customerName: "James Wilson",
      date: "Jun 19, 2025",
      items: 6,
      paymentMethod: "Cash",
      status: "paid",
      subtotal: 149.94,
      taxRate: 20,
      taxAmount: 30.0,
      total: 179.94,
    },
    {
      id: "INV-017",
      customerName: "TechMaster Wholesale Ltd",
      date: "Jul 8, 2025",
      items: 100,
      paymentMethod: "Bank Transfer",
      status: "paid",
      subtotal: 8400.0,
      taxRate: 20,
      taxAmount: 1680.0,
      total: 10080.0,
    },
    {
      id: "INV-018",
      customerName: "Bristol Phone Trade",
      date: "Jul 23, 2025",
      items: 28,
      paymentMethod: "Card",
      status: "overdue",
      subtotal: 2380.0,
      taxRate: 20,
      taxAmount: 476.0,
      total: 2856.0,
    },
    {
      id: "INV-019",
      customerName: "Olivia Taylor",
      date: "Aug 4, 2025",
      items: 3,
      paymentMethod: "Cash",
      status: "paid",
      subtotal: 59.97,
      taxRate: 20,
      taxAmount: 12.0,
      total: 71.97,
    },
    {
      id: "INV-020",
      customerName: "Mobile Accessories Direct",
      date: "Aug 17, 2025",
      items: 65,
      paymentMethod: "Bank Transfer",
      status: "paid",
      subtotal: 5525.0,
      taxRate: 20,
      taxAmount: 1105.0,
      total: 6630.0,
    },
    {
      id: "INV-021",
      customerName: "William Anderson",
      date: "Sep 2, 2025",
      items: 7,
      paymentMethod: "Card",
      status: "paid",
      subtotal: 184.93,
      taxRate: 20,
      taxAmount: 37.0,
      total: 221.93,
    },
    {
      id: "INV-022",
      customerName: "GadgetPro Wholesale UK",
      date: "Sep 15, 2025",
      items: 50,
      paymentMethod: "Bank Transfer",
      status: "paid",
      subtotal: 4250.0,
      taxRate: 20,
      taxAmount: 850.0,
      total: 5100.0,
    },
    {
      id: "INV-023",
      customerName: "Sophie Martinez",
      date: "Oct 1, 2025",
      items: 2,
      paymentMethod: "Cash",
      status: "paid",
      subtotal: 44.98,
      taxRate: 20,
      taxAmount: 9.0,
      total: 53.98,
    },
    {
      id: "INV-024",
      customerName: "ElectroBulk Suppliers",
      date: "Oct 14, 2025",
      items: 85,
      paymentMethod: "Bank Transfer",
      status: "pending",
      subtotal: 7225.0,
      taxRate: 20,
      taxAmount: 1445.0,
      total: 8670.0,
    },
    {
      id: "INV-025",
      customerName: "Robert Thomas",
      date: "Nov 3, 2025",
      items: 4,
      paymentMethod: "Card",
      status: "paid",
      subtotal: 99.96,
      taxRate: 20,
      taxAmount: 20.0,
      total: 119.96,
    },
  ];

  var purchasesData = [
    {
      id: "PO-001",
      supplier: "TechCo Wholesale",
      date: "Oct 1, 2024",
      totalCost: 2400.0,
    },
    {
      id: "PO-002",
      supplier: "Mobile Parts Ltd",
      date: "Oct 15, 2024",
      totalCost: 3600.0,
    },
    {
      id: "PO-003",
      supplier: "GadgetSource UK",
      date: "Nov 5, 2024",
      totalCost: 5000.0,
    },
    {
      id: "PO-004",
      supplier: "TechCo Wholesale",
      date: "Nov 20, 2024",
      totalCost: 4800.0,
    },
    {
      id: "PO-005",
      supplier: "PhoneParts Direct",
      date: "Dec 8, 2024",
      totalCost: 2700.0,
    },
    {
      id: "PO-006",
      supplier: "Mobile Parts Ltd",
      date: "Jan 10, 2025",
      totalCost: 4200.0,
    },
    {
      id: "PO-007",
      supplier: "GadgetSource UK",
      date: "Jan 25, 2025",
      totalCost: 6600.0,
    },
    {
      id: "PO-008",
      supplier: "TechCo Wholesale",
      date: "Feb 12, 2025",
      totalCost: 3360.0,
    },
    {
      id: "PO-009",
      supplier: "AccessoryWorld",
      date: "Mar 3, 2025",
      totalCost: 2250.0,
    },
    {
      id: "PO-010",
      supplier: "PhoneParts Direct",
      date: "Mar 18, 2025",
      totalCost: 4800.0,
    },
    {
      id: "PO-011",
      supplier: "Mobile Parts Ltd",
      date: "Apr 7, 2025",
      totalCost: 3120.0,
    },
    {
      id: "PO-012",
      supplier: "GadgetSource UK",
      date: "Apr 22, 2025",
      totalCost: 8000.0,
    },
    {
      id: "PO-013",
      supplier: "TechCo Wholesale",
      date: "May 9, 2025",
      totalCost: 4560.0,
    },
    {
      id: "PO-014",
      supplier: "AccessoryWorld",
      date: "May 24, 2025",
      totalCost: 2400.0,
    },
    {
      id: "PO-015",
      supplier: "PhoneParts Direct",
      date: "Jun 6, 2025",
      totalCost: 4500.0,
    },
    {
      id: "PO-016",
      supplier: "Mobile Parts Ltd",
      date: "Jun 20, 2025",
      totalCost: 5040.0,
    },
    {
      id: "PO-017",
      supplier: "GadgetSource UK",
      date: "Jul 4, 2025",
      totalCost: 11200.0,
    },
    {
      id: "PO-018",
      supplier: "TechCo Wholesale",
      date: "Jul 19, 2025",
      totalCost: 4200.0,
    },
    {
      id: "PO-019",
      supplier: "AccessoryWorld",
      date: "Aug 2, 2025",
      totalCost: 2700.0,
    },
    {
      id: "PO-020",
      supplier: "PhoneParts Direct",
      date: "Aug 16, 2025",
      totalCost: 3600.0,
    },
  ];

  /* ═══════════════════════════════════════════════════════
   *  SECTION 2 — COMPUTE LAYER
   * ═══════════════════════════════════════════════════════ */

  var MONTH_NAMES = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function fmt(n) {
    return "£" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function parseDateKey(dateStr) {
    var p = dateStr.replace(",", "").split(" ");
    return {
      mon: p[0],
      year: parseInt(p[1], 10),
      monthIdx: MONTH_NAMES.indexOf(p[0]),
    };
  }

  function bucketByMonth(arr, getDate, getValue) {
    var map = {};
    arr.forEach(function (item) {
      var d = parseDateKey(getDate(item));
      var key = d.mon + " " + d.year;
      if (!map[key])
        map[key] = { label: key, year: d.year, monthIdx: d.monthIdx, value: 0 };
      map[key].value += getValue(item);
    });
    var entries = Object.values(map);
    entries.sort(function (a, b) {
      return a.year - b.year || a.monthIdx - b.monthIdx;
    });
    return {
      labels: entries.map(function (e) {
        return e.label;
      }),
      values: entries.map(function (e) {
        return e.value;
      }),
    };
  }

  function computeTotalRevenue() {
    return invoicesData.reduce(function (a, i) {
      return a + i.total;
    }, 0);
  }
  function computeTotalPurchaseCost() {
    return purchasesData.reduce(function (a, p) {
      return a + p.totalCost;
    }, 0);
  }
  function computeTotalTax() {
    return invoicesData.reduce(function (a, i) {
      return a + i.taxAmount;
    }, 0);
  }
  function computeTotalItemsSold() {
    return invoicesData.reduce(function (a, i) {
      return a + i.items;
    }, 0);
  }

  function computeInvoiceStatusBreakdown() {
    var c = { paid: 0, pending: 0, overdue: 0, draft: 0 };
    invoicesData.forEach(function (i) {
      if (c[i.status] !== undefined) c[i.status]++;
      else c.draft++;
    });
    return c;
  }

  function computeCustomerTypeBreakdown() {
    var c = { wholesaler: 0, trader: 0, retailer: 0 };
    customersData.forEach(function (cu) {
      if (c[cu.type] !== undefined) c[cu.type]++;
    });
    return c;
  }

  function computePaymentMethodBreakdown() {
    var map = {};
    invoicesData.forEach(function (inv) {
      var m = inv.paymentMethod || "Other";
      if (!map[m]) map[m] = { label: m, count: 0, total: 0 };
      map[m].count++;
      map[m].total += inv.total;
    });
    return map;
  }

  function computeMonthlyRevenueTrend() {
    return bucketByMonth(
      invoicesData,
      function (i) {
        return i.date;
      },
      function (i) {
        return i.total;
      }
    );
  }

  function computeMonthlyPurchaseCost() {
    return bucketByMonth(
      purchasesData,
      function (p) {
        return p.date;
      },
      function (p) {
        return p.totalCost;
      }
    );
  }

  function computeStockByCategory() {
    var map = {};
    productsData.forEach(function (p) {
      map[p.category] = (map[p.category] || 0) + p.stock;
    });
    return { labels: Object.keys(map), values: Object.values(map) };
  }

  function computeCategoryValue() {
    var map = {};
    productsData.forEach(function (p) {
      map[p.category] = (map[p.category] || 0) + p.stock * p.sellPrice;
    });
    return { labels: Object.keys(map), values: Object.values(map) };
  }

  function computeTopProductsByValue(n) {
    return productsData
      .slice()
      .sort(function (a, b) {
        return b.stock * b.sellPrice - a.stock * a.sellPrice;
      })
      .slice(0, n);
  }

  function computeLowStockProducts(threshold) {
    return productsData.filter(function (p) {
      return p.stock <= (threshold || 50);
    });
  }

  function computeCustomerGrowthByMonth() {
    var map = {};
    customersData.forEach(function (c) {
      var d = parseDateKey(c.joined);
      var key = d.mon + " " + d.year;
      if (!map[key])
        map[key] = { label: key, year: d.year, monthIdx: d.monthIdx, value: 0 };
      map[key].value++;
    });
    var entries = Object.values(map);
    entries.sort(function (a, b) {
      return a.year - b.year || a.monthIdx - b.monthIdx;
    });
    var running = 0;
    var cumulative = entries.map(function (e) {
      running += e.value;
      return running;
    });
    return {
      labels: entries.map(function (e) {
        return e.label;
      }),
      values: cumulative,
    };
  }

  /* ═══════════════════════════════════════════════════════
   *  SECTION 3 — RENDER LAYER
   * ═══════════════════════════════════════════════════════ */

  function setText(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function renderKPICards() {
    var rev = computeTotalRevenue();
    var purchCost = computeTotalPurchaseCost();
    var profit = rev - purchCost;
    var margin = rev > 0 ? (profit / rev) * 100 : 0;
    var items = computeTotalItemsSold();
    var count = invoicesData.length;
    setText("kpi-total-revenue", fmt(rev));
    setText("kpi-total-revenue-sub", "Sales: £0.00 | Invoices: " + fmt(rev));
    setText("kpi-transactions", String(count));
    setText("kpi-transactions-sub", "Sales: 0 | Invoices: " + count);
    setText("kpi-gross-profit", fmt(profit));
    setText("kpi-gross-profit-sub", "Margin: " + margin.toFixed(1) + "%");
    setText("kpi-items-sold", String(items));
    setText(
      "kpi-items-sold-sub",
      "Avg per transaction: " + (count > 0 ? (items / count).toFixed(1) : "0.0")
    );
  }

  function renderSalesTabCards() {
    var rev = computeTotalRevenue();
    var count = invoicesData.length;
    var avg = count > 0 ? rev / count : 0;
    setText("sales-total-transactions", String(count));
    setText("sales-total-revenue-mini", fmt(rev));
    setText("sales-avg-transaction", fmt(avg));
  }

  function renderPaymentMethods() {
    var grid = document.getElementById("payment-methods-grid");
    if (!grid) return;
    grid.innerHTML = "";
    var pmData = computePaymentMethodBreakdown();
    var colors = {
      "Bank Transfer": {
        bg: "bg-[oklch(0.97_0.014_254.604)] border-[oklch(0.882_0.059_254.128)]",
        num: "text-[oklch(0.488_0.243_264.376)]",
        sub: "text-[oklch(0.546_0.245_262.881)]",
      },
      Card: {
        bg: "bg-[oklch(0.982_0.018_155.826)] border-[oklch(0.925_0.084_155.995)]",
        num: "text-[oklch(0.527_0.154_150.069)]",
        sub: "text-[oklch(0.627_0.194_149.214)]",
      },
      Cash: {
        bg: "bg-[oklch(0.977_0.014_308.299)] border-[oklch(0.902_0.063_306.703)]",
        num: "text-[oklch(0.496_0.265_301.924)]",
        sub: "text-[oklch(0.558_0.288_302.321)]",
      },
    };
    var def = {
      bg: "bg-zinc-50 border-black/10",
      num: "text-zinc-700",
      sub: "text-zinc-500",
    };
    Object.keys(pmData).forEach(function (method) {
      var d = pmData[method];
      var c = colors[method] || def;
      var card = document.createElement("div");
      card.className =
        "backdrop-blur-xl shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.1)_0px_1px_3px_0px,rgba(0,0,0,0.1)_0px_1px_2px_-1px] box-border caret-transparent flex flex-col outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] border rounded-xl border-solid p-4 " +
        c.bg;
      card.innerHTML =
        '<div class="' +
        c.num +
        ' text-xl font-bold leading-8">' +
        d.count +
        ' txns</div><p class="' +
        c.sub +
        ' text-sm leading-5 mt-1">' +
        method +
        '</p><p class="' +
        c.sub +
        ' text-xs leading-4">' +
        fmt(d.total) +
        "</p>";
      grid.appendChild(card);
    });
  }

  function renderTableBody(tbodyId, rows, buildRow) {
    var tbody = document.getElementById(tbodyId);
    if (!tbody) return;
    tbody.innerHTML = "";
    var frag = document.createDocumentFragment();
    rows.forEach(function (row, i) {
      var tr = buildRow(row, i, rows.length);
      frag.appendChild(tr);
    });
    tbody.appendChild(frag);
  }

  var TR_CLS =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] align-middle";
  var TR_BORDER = " border-b border-solid border-black/10";
  var TD_CLS =
    "box-border caret-transparent outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap align-middle p-2";
  var TD_MED = "font-medium " + TD_CLS;
  var TD_SEM = "font-semibold " + TD_CLS;
  var TD_GREEN =
    "font-semibold text-[oklch(0.627_0.194_149.214)] " + TD_CLS + " text-right";
  var TD_RED =
    "font-semibold text-[oklch(0.577_0.245_27.325)] " + TD_CLS + " text-right";
  var TD_BLUE =
    "font-semibold text-[oklch(0.546_0.245_262.881)] " + TD_CLS + " text-right";
  var TD_RIGHT = TD_SEM + " text-right";

  function renderSalesTable() {
    renderTableBody(
      "sales-transactions-tbody",
      invoicesData,
      function (inv, i, total) {
        var tr = document.createElement("tr");
        tr.className = TR_CLS + (i < total - 1 ? TR_BORDER : "");
        tr.innerHTML =
          '<td class="' +
          TD_CLS +
          '">' +
          inv.date +
          '</td><td class="' +
          TD_CLS +
          '">' +
          inv.customerName +
          '</td><td class="' +
          TD_CLS +
          '">' +
          inv.items +
          '</td><td class="' +
          TD_CLS +
          '">' +
          inv.paymentMethod +
          '</td><td class="' +
          TD_GREEN +
          '">' +
          fmt(inv.total) +
          "</td>";
        return tr;
      }
    );
  }

  function renderProductsTable() {
    var sorted = productsData.slice().sort(function (a, b) {
      return b.stock * b.sellPrice - a.stock * a.sellPrice;
    });
    renderTableBody("products-report-tbody", sorted, function (p, i, total) {
      var tr = document.createElement("tr");
      tr.className = TR_CLS + (i < total - 1 ? TR_BORDER : "");
      var badge =
        '<span class="text-xs font-medium items-center box-border caret-transparent inline-flex justify-center leading-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] text-nowrap border overflow-hidden px-2 py-0.5 rounded-md border-solid border-black/10">' +
        p.category +
        "</span>";
      tr.innerHTML =
        '<td class="' +
        TD_MED +
        '">' +
        p.name +
        '</td><td class="' +
        TD_CLS +
        '">' +
        badge +
        '</td><td class="' +
        TD_RIGHT +
        '">' +
        p.stock +
        '</td><td class="' +
        TD_RIGHT +
        '">' +
        fmt(p.sellPrice) +
        '</td><td class="' +
        TD_GREEN +
        '">' +
        fmt(p.stock * p.sellPrice) +
        "</td>";
      return tr;
    });
  }

  function renderInventoryCards() {
    var totalStock = productsData.reduce(function (a, p) {
      return a + p.stock;
    }, 0);
    var lowStock = computeLowStockProducts(50);
    setText("inv-total-products", String(productsData.length));
    setText("inv-total-stock", String(totalStock));
    setText("inv-low-stock", String(lowStock.length));
  }

  function renderLowStockTable() {
    var items = computeLowStockProducts(50);
    renderTableBody("low-stock-tbody", items, function (p, i, total) {
      var tr = document.createElement("tr");
      tr.className = TR_CLS + (i < total - 1 ? TR_BORDER : "");
      tr.innerHTML =
        '<td class="' +
        TD_MED +
        '">' +
        p.name +
        '</td><td class="' +
        TD_CLS +
        '">' +
        p.category +
        '</td><td class="' +
        TD_RED +
        '">' +
        p.stock +
        '</td><td class="' +
        TD_RIGHT +
        '">' +
        fmt(p.sellPrice) +
        "</td>";
      return tr;
    });
  }

  function renderCustomerCards() {
    var bd = computeCustomerTypeBreakdown();
    setText("cust-total", String(customersData.length));
    setText("cust-wholesalers", String(bd.wholesaler));
    setText("cust-traders", String(bd.trader));
    setText("cust-retailers", String(bd.retailer));
  }

  function renderInvoicesCards() {
    var rev = computeTotalRevenue();
    var avg = invoicesData.length > 0 ? rev / invoicesData.length : 0;
    setText("inv-count", String(invoicesData.length));
    setText("inv-total-value", fmt(rev));
    setText("inv-avg-value", fmt(avg));
  }

  function renderInvoicesTable() {
    var STATUS_CLASSES = {
      paid: "text-white bg-sky-600 border-transparent",
      pending: "text-xs font-medium bg-stone-50 border-transparent",
      overdue:
        "text-[oklch(0.577_0.245_27.325)] bg-[oklch(0.977_0.025_12.42)] border-[oklch(0.936_0.032_17.717)]",
      draft: "border-black/10",
    };
    renderTableBody(
      "invoices-report-tbody",
      invoicesData,
      function (inv, i, total) {
        var tr = document.createElement("tr");
        tr.className = TR_CLS + (i < total - 1 ? TR_BORDER : "");
        var sc = STATUS_CLASSES[inv.status] || STATUS_CLASSES.draft;
        var badge =
          '<span class="text-xs font-medium items-center box-border caret-transparent inline-flex justify-center leading-4 outline-[oklab(0.515373_-0.0460556_-0.153747_/_0.5)] capitalize text-nowrap border overflow-hidden px-2 py-0.5 rounded-md border-solid ' +
          sc +
          '">' +
          inv.status +
          "</span>";
        tr.innerHTML =
          '<td class="' +
          TD_MED +
          '">' +
          inv.id +
          '</td><td class="' +
          TD_CLS +
          '">' +
          inv.customerName +
          '</td><td class="' +
          TD_CLS +
          '">' +
          inv.date +
          '</td><td class="' +
          TD_CLS +
          '">' +
          badge +
          '</td><td class="' +
          TD_GREEN +
          '">' +
          fmt(inv.total) +
          "</td>";
        return tr;
      }
    );
  }

  function renderFinancialCards() {
    var rev = computeTotalRevenue();
    var purchCost = computeTotalPurchaseCost();
    var profit = rev - purchCost;
    var margin = rev > 0 ? (profit / rev) * 100 : 0;
    setText("fin-revenue", fmt(rev));
    setText("fin-purchase-cost", fmt(purchCost));
    setText("fin-net-profit", fmt(profit));
    setText("fin-margin", margin.toFixed(1) + "%");
  }

  function renderTaxCards() {
    var tax = computeTotalTax();
    var rev = computeTotalRevenue();
    var rate = rev > 0 ? (tax / rev) * 100 : 0;
    setText("tax-total-collected", fmt(tax));
    setText("tax-taxable-revenue", fmt(rev));
    setText("tax-avg-rate", rate.toFixed(1) + "%");
  }

  function renderTaxTable() {
    renderTableBody("tax-report-tbody", invoicesData, function (inv, i, total) {
      var tr = document.createElement("tr");
      tr.className = TR_CLS + (i < total - 1 ? TR_BORDER : "");
      tr.innerHTML =
        '<td class="' +
        TD_MED +
        '">' +
        inv.id +
        '</td><td class="' +
        TD_CLS +
        '">' +
        inv.customerName +
        '</td><td class="' +
        TD_RIGHT +
        '">' +
        fmt(inv.subtotal) +
        '</td><td class="' +
        TD_RIGHT +
        '">' +
        inv.taxRate +
        '%</td><td class="' +
        TD_RED +
        '">' +
        fmt(inv.taxAmount) +
        '</td><td class="' +
        TD_GREEN +
        '">' +
        fmt(inv.total) +
        "</td>";
      return tr;
    });
  }

  function renderDateRange() {
    var today = new Date();
    var todayStr =
      MONTH_NAMES[today.getMonth()] +
      " " +
      today.getDate() +
      ", " +
      today.getFullYear();
    setText("report-date-to", todayStr);
    if (invoicesData.length > 0)
      setText("report-date-from", invoicesData[0].date);
  }

  /* ═══════════════════════════════════════════════════════
   *  SECTION 4 — CHART LAYER
   * ═══════════════════════════════════════════════════════ */

  var _charts = {};
  var PALETTE = [
    "rgba(99,132,255,0.8)",
    "rgba(72,187,120,0.8)",
    "rgba(167,85,200,0.8)",
    "rgba(255,165,0,0.8)",
    "rgba(239,68,68,0.8)",
    "rgba(20,184,166,0.8)",
    "rgba(249,115,22,0.8)",
    "rgba(16,185,129,0.8)",
  ];

  function destroyChart(id) {
    if (_charts[id]) {
      _charts[id].destroy();
      delete _charts[id];
    }
  }

  var BASE_OPTS = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { position: "top", labels: { font: { size: 12 }, boxWidth: 12 } },
    },
    scales: {
      x: { ticks: { font: { size: 11 } } },
      y: { ticks: { font: { size: 11 } }, beginAtZero: true },
    },
  };

  function gbpTick(v) {
    return "£" + Number(v).toLocaleString();
  }

  function renderChartMonthlySales() {
    destroyChart("chart-monthly-sales");
    var ctx = document.getElementById("chart-monthly-sales");
    if (!ctx) return;
    var d = computeMonthlyRevenueTrend();
    _charts["chart-monthly-sales"] = new Chart(ctx, {
      type: "line",
      data: {
        labels: d.labels,
        datasets: [
          {
            label: "Monthly Revenue (£)",
            data: d.values,
            borderColor: "rgba(99,132,255,1)",
            backgroundColor: "rgba(99,132,255,0.1)",
            tension: 0.4,
            fill: true,
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "top",
            labels: { font: { size: 12 }, boxWidth: 12 },
          },
        },
        scales: {
          x: { ticks: { font: { size: 11 } } },
          y: {
            ticks: { font: { size: 11 }, callback: gbpTick },
            beginAtZero: true,
          },
        },
      },
    });
  }

  function renderChartTopProducts() {
    destroyChart("chart-top-products");
    var ctx = document.getElementById("chart-top-products");
    if (!ctx) return;
    var top = computeTopProductsByValue(10);
    _charts["chart-top-products"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: top.map(function (p) {
          return p.name;
        }),
        datasets: [
          {
            label: "Inventory Value (£)",
            data: top.map(function (p) {
              return parseFloat((p.stock * p.sellPrice).toFixed(2));
            }),
            backgroundColor: PALETTE,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        indexAxis: "y",
        plugins: {
          legend: {
            position: "top",
            labels: { font: { size: 12 }, boxWidth: 12 },
          },
        },
        scales: {
          x: {
            ticks: { font: { size: 11 }, callback: gbpTick },
            beginAtZero: true,
          },
          y: { ticks: { font: { size: 11 } } },
        },
      },
    });
  }

  function renderChartCategoryBreakdown() {
    destroyChart("chart-category-breakdown");
    var ctx = document.getElementById("chart-category-breakdown");
    if (!ctx) return;
    var cv = computeCategoryValue();
    _charts["chart-category-breakdown"] = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: cv.labels,
        datasets: [
          {
            data: cv.values.map(function (v) {
              return parseFloat(v.toFixed(2));
            }),
            backgroundColor: PALETTE,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "right",
            labels: { font: { size: 12 }, boxWidth: 12 },
          },
          tooltip: {
            callbacks: {
              label: function (c) {
                return c.label + ": " + gbpTick(c.raw);
              },
            },
          },
        },
      },
    });
  }

  function renderChartStockByCategory() {
    destroyChart("chart-stock-by-category");
    var ctx = document.getElementById("chart-stock-by-category");
    if (!ctx) return;
    var sc = computeStockByCategory();
    _charts["chart-stock-by-category"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: sc.labels,
        datasets: [
          {
            label: "Total Stock Units",
            data: sc.values,
            backgroundColor: PALETTE,
            borderRadius: 4,
          },
        ],
      },
      options: BASE_OPTS,
    });
  }

  function renderChartCustomerGrowth() {
    destroyChart("chart-customer-growth");
    var ctx = document.getElementById("chart-customer-growth");
    if (!ctx) return;
    var cg = computeCustomerGrowthByMonth();
    _charts["chart-customer-growth"] = new Chart(ctx, {
      type: "line",
      data: {
        labels: cg.labels,
        datasets: [
          {
            label: "Cumulative Customers",
            data: cg.values,
            borderColor: "rgba(72,187,120,1)",
            backgroundColor: "rgba(72,187,120,0.1)",
            tension: 0.4,
            fill: true,
            pointRadius: 4,
          },
        ],
      },
      options: BASE_OPTS,
    });
  }

  function renderChartCustomerTypes() {
    destroyChart("chart-customer-types");
    var ctx = document.getElementById("chart-customer-types");
    if (!ctx) return;
    var bd = computeCustomerTypeBreakdown();
    _charts["chart-customer-types"] = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Wholesalers", "Traders", "Retailers"],
        datasets: [
          {
            data: [bd.wholesaler, bd.trader, bd.retailer],
            backgroundColor: [
              "rgba(99,132,255,0.8)",
              "rgba(72,187,120,0.8)",
              "rgba(167,85,200,0.8)",
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "right",
            labels: { font: { size: 12 }, boxWidth: 12 },
          },
        },
      },
    });
  }

  function renderChartInvoiceStatus() {
    destroyChart("chart-invoice-status");
    var ctx = document.getElementById("chart-invoice-status");
    if (!ctx) return;
    var st = computeInvoiceStatusBreakdown();
    _charts["chart-invoice-status"] = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Paid", "Pending", "Overdue", "Draft"],
        datasets: [
          {
            data: [st.paid, st.pending, st.overdue, st.draft],
            backgroundColor: [
              "rgba(72,187,120,0.8)",
              "rgba(249,115,22,0.8)",
              "rgba(239,68,68,0.8)",
              "rgba(156,163,175,0.8)",
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "right",
            labels: { font: { size: 12 }, boxWidth: 12 },
          },
        },
      },
    });
  }

  function renderChartRevenueVsCost() {
    destroyChart("chart-revenue-vs-cost");
    var ctx = document.getElementById("chart-revenue-vs-cost");
    if (!ctx) return;
    var revData = computeMonthlyRevenueTrend();
    var costData = computeMonthlyPurchaseCost();

    // Merge and sort all labels
    var allLabels = revData.labels.slice();
    costData.labels.forEach(function (l) {
      if (allLabels.indexOf(l) === -1) allLabels.push(l);
    });
    allLabels.sort(function (a, b) {
      var pa = a.split(" "),
        pb = b.split(" ");
      var ya = parseInt(pa[1], 10),
        yb = parseInt(pb[1], 10);
      if (ya !== yb) return ya - yb;
      return MONTH_NAMES.indexOf(pa[0]) - MONTH_NAMES.indexOf(pb[0]);
    });

    var revMap = {};
    revData.labels.forEach(function (l, i) {
      revMap[l] = revData.values[i];
    });
    var costMap = {};
    costData.labels.forEach(function (l, i) {
      costMap[l] = costData.values[i];
    });

    _charts["chart-revenue-vs-cost"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: allLabels,
        datasets: [
          {
            label: "Revenue (£)",
            data: allLabels.map(function (l) {
              return revMap[l] || 0;
            }),
            backgroundColor: "rgba(72,187,120,0.7)",
            borderRadius: 4,
          },
          {
            label: "Purchase Cost (£)",
            data: allLabels.map(function (l) {
              return costMap[l] || 0;
            }),
            backgroundColor: "rgba(239,68,68,0.7)",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "top",
            labels: { font: { size: 12 }, boxWidth: 12 },
          },
        },
        scales: {
          x: { ticks: { font: { size: 10 } } },
          y: {
            ticks: { font: { size: 11 }, callback: gbpTick },
            beginAtZero: true,
          },
        },
      },
    });
  }

  /* ═══════════════════════════════════════════════════════
   *  SECTION 5 — TAB CONTROLLER
   * ═══════════════════════════════════════════════════════ */

  /* Map of tab id -> whether its charts have been initialised */
  var _chartsInitialised = {};

  /* Chart init per tab (lazy — only called first time tab is shown) */
  var TAB_CHARTS = {
    sales: function () {
      renderChartMonthlySales();
    },
    products: function () {
      renderChartTopProducts();
      renderChartCategoryBreakdown();
    },
    inventory: function () {
      renderChartStockByCategory();
    },
    customers: function () {
      renderChartCustomerGrowth();
      renderChartCustomerTypes();
    },
    invoices: function () {
      renderChartInvoiceStatus();
    },
    financial: function () {
      renderChartRevenueVsCost();
    },
    tax: function () {
      /* no charts */
    },
  };

  function showTab(tabId) {
    /* Update tab buttons */
    var buttons = document.querySelectorAll(".tab-btn");
    buttons.forEach(function (btn) {
      var isActive = btn.getAttribute("data-tab") === tabId;
      if (isActive) {
        btn.style.background = "white";
        btn.classList.add("shadow-sm");
      } else {
        btn.style.background = "transparent";
        btn.classList.remove("shadow-sm");
      }
    });

    /* Show/hide panels */
    var panels = document.querySelectorAll("[role='tabpanel']");
    panels.forEach(function (panel) {
      var id = panel.getAttribute("id");
      if (id === "tabpanel-" + tabId) {
        panel.classList.remove("hidden");
      } else {
        panel.classList.add("hidden");
      }
    });

    /* Lazy chart initialisation */
    if (!_chartsInitialised[tabId]) {
      _chartsInitialised[tabId] = true;
      if (TAB_CHARTS[tabId]) TAB_CHARTS[tabId]();
    }
  }

  function initTabController() {
    var buttons = document.querySelectorAll(".tab-btn");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        showTab(btn.getAttribute("data-tab"));
      });
    });
  }

  /* ═══════════════════════════════════════════════════════
   *  SECTION 6 — DOWNLOAD HELPERS
   * ═══════════════════════════════════════════════════════ */

  function downloadCSV(data, filename) {
    if (!data || data.length === 0) return;
    var keys = Object.keys(data[0]);
    var csv =
      keys.join(",") +
      "\n" +
      data
        .map(function (row) {
          return keys
            .map(function (k) {
              var v = String(row[k]).replace(/"/g, '""');
              return '"' + v + '"';
            })
            .join(",");
        })
        .join("\n");
    var blob = new Blob([csv], { type: "text/csv" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function downloadJSON(data, filename) {
    var blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function initDownloadButtons() {
    var csvBtn = document.getElementById("sales-download-csv");
    var jsonBtn = document.getElementById("sales-download-json");
    var exportBtn = document.getElementById("btn-export-csv");

    if (csvBtn)
      csvBtn.addEventListener("click", function () {
        downloadCSV(invoicesData, "bnm-sales-report.csv");
      });
    if (jsonBtn)
      jsonBtn.addEventListener("click", function () {
        downloadJSON(invoicesData, "bnm-sales-report.json");
      });
    if (exportBtn)
      exportBtn.addEventListener("click", function () {
        downloadCSV(invoicesData, "bnm-full-report.csv");
      });
  }

  /* ═══════════════════════════════════════════════════════
   *  SECTION 7 — ENTRY POINT
   * ═══════════════════════════════════════════════════════ */

  function init() {
    /* Render all static content immediately */
    renderDateRange();
    renderKPICards();

    /* Sales tab (default active) */
    renderSalesTabCards();
    renderPaymentMethods();
    renderSalesTable();

    /* Products tab */
    renderProductsTable();

    /* Inventory tab */
    renderInventoryCards();
    renderLowStockTable();

    /* Customers tab */
    renderCustomerCards();

    /* Invoices tab */
    renderInvoicesCards();
    renderInvoicesTable();

    /* Financial tab */
    renderFinancialCards();

    /* Tax tab */
    renderTaxCards();
    renderTaxTable();

    /* Wire up tabs */
    initTabController();

    /* Wire up downloads */
    initDownloadButtons();

    /* Init Sales charts (default active tab) */
    /* Slight defer so DOM layout is complete */
    setTimeout(function () {
      _chartsInitialised["sales"] = true;
      renderChartMonthlySales();
    }, 100);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
