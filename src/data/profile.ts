export const profile = {
  "name": "Suresh Ganesan",
  "title": "Senior Supply Chain / Procurement Professional",
  "summary": "Procurement and Supply Chain professional with 9+ years of experience across manufacturing, fabrication projects, and International sourcing Experienced in strategic sourcing, technical and commercial procurement, CAPEX/OPEX, P2P, Contract management, vendor development, and project procurement.",
  "tagline": "Procurement and Supply Chain professional with 9 years of experience across\nmanufacturing, fabrication projects, and international procurement. Experienced in\nstrategic sourcing, technical and commercial procurement, CAPEX/OPEX, P2P,\ncontract management, vendor development, and project procurement. Seeking to\ncontribute my cross-functional and international experience to drive cost efficiency,\nsupplier performance, and timely project execution while growing into a broader\nprocurement leadership role",
  "location": "Chennai, Tamil Nadu, India",
  "email": "mailmesuresh005@gmail.com",
  "phones": [
    "+91 9787932244",
    "+65 80923216"
  ],
  "linkedin": "https://www.linkedin.com/in/suresh005/",
  "github": "https://github.com/Chillbroz005/",
  "githubProfile": "https://github.com/Chillbroz005",
  "githubUsername": "Chillbroz005",
  "experienceYears": "9 years",
  "regions": [
    "Hong Kong",
    "Japan",
    "Singapore",
    "Australia",
    "Saudi Arabia",
    "Malaysia"
  ],
  "industries": [
    "Manufacturing",
    "Textiles",
    "Fabrication",
    "Marine",
    "Lifting gears"
  ],
  "functions": [
    "Strategic sourcing",
    "Procurement",
    "P2P",
    "CAPEX/OPEX",
    "Contracts",
    "Vendor management",
    "IT procurement",
    "Tender evaluation",
    "Contracts (WO / SO / MSA)",
    "Know Your Supplier (KYS)"
  ],
  "achievements": [
    "Best Employee of the Year — 2019 & 2021",
    "Gold Award — QCFI Kaizen Mela, Madurai chapter, 2018",
    "Presented 35+ Kaizens in Loyal Group Kaizen competition"
  ]
} as const;

export type ExperienceItem = {
  company: string;
  role: string;
  location: string;
  dates: string;
  startDate: string;
  endDate: string | null;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    "company": "ATMARTH TEKNIK SOLUTIONS PRIVATE LIMITED",
    "role": "Senior Procurement Executive (supporting client AirTrunk as Senior Procurement Manager)",
    "location": "Chennai, Tamil Nadu, India",
    "dates": "August 2026 – Present",
    "startDate": "2026-08-01",
    "endDate": null,
    "bullets": [
      "Led RFI activities on the Felix platform, including vendor stakeholder meetings, RFI preparation and dispatch, and vendor onboarding.",
      "Managed vendor communication and documentation, and issued RFQs on Felix.",
      "Conducted tender comparison and bid evaluation to shortlist vendors.",
      "Drafted, negotiated and executed Work Orders (WO), Service Orders (SO) and Master Service Agreements (MSA) through Jira.",
      "Completed Know Your Supplier (KYS) checks and NDAs with vendors.",
      "Raised Purchase Orders in coordination with the ICT team.",
      "Tracked supplier relationships and KPI deliverables, with Power BI dashboard updates."
    ]
  },
  {
    "company": "FRANKLIN OFFSHORE INTERNATIONAL PTE LTD",
    "role": "Procurement Engineer – Fabrication & Project Division",
    "location": "Singapore",
    "dates": "May 2025 – May 2026",
    "startDate": "2025-05-15",
    "endDate": "2026-05-15",
    "bullets": [
      "Managed end-to-end procurement for fabrication projects including PR creation, PO conversion and material availability against drawings and BOM.",
      "Evaluated, onboarded and developed vendors using quality, cost, delivery performance and technical capability.",
      "Negotiated pricing, contracts and payment terms against budget targets.",
      "Tracked orders and supplier follow-ups to support on-time project delivery.",
      "Coordinated with design, production, quality and warehouse teams.",
      "Reviewed MTCs and inspection reports and maintained traceability and compliance documentation.",
      "Handled non-conformance issues, invoice verification and delivery/billing discrepancies.",
      "Analyzed quotations and market trends to optimize procurement strategy and cost efficiency.",
      "Maintained procurement documentation for ISO audits and reporting; coordinated with finance for payment processing."
    ]
  },
  {
    "company": "LOYAL TEXTILES MILLS LIMITED",
    "role": "Assistant Manager – Purchase and Projects",
    "location": "Chennai, Tamil Nadu, India",
    "dates": "June 2017 – May 2025",
    "startDate": "2017-06-01",
    "endDate": "2025-05-14",
    "bullets": [
      "Developed strategic sourcing plans to optimize costs and supplier relationships.",
      "Managed procure-to-pay activities for CAPEX, OPEX and MEP requirements.",
      "Managed contract lifecycle and work orders including BOQs, rate analyses and contract drafting for manpower, O&M and service contracts.",
      "Evaluated and negotiated supplier contracts.",
      "Implemented best practices to enhance procurement and 5% cost reduction.",
      "Identified and mitigated supply-chain risks; coordinated supplier payments and reconciliations with Finance.",
      "Maintained QMS, EMS and OHSAS documentation aligned with ISO standards; conducted 5S audits and monthly cost tracking.",
      "Provided MIS reports to management.",
      "Handled civil contracts/purchases, O&M and manpower service contracts, OEM work orders, dyes and chemicals, firewood, spinning/weaving/sizing/knitting materials, machinery purchase & sales, modernization/expansion projects, IT material/software licensing, and purchase consultancy for TSM & MRCAS colleges."
    ]
  }
];

export const engagements = [
  "Modernization & Expansion Project (MEP) — 1800 Million",
  "AOP (CAPEX & Civil projects) — 1200 Million",
  "Naidupeta, AP plant fire-damage restoration project — 500 Million",
  "O&M contracts for Wartsila 12V32LN (4MW) & Kirloskar S.E.M.P.T Pielstic (2.5MW) gensets",
  "Guarding service agreement for AP Plant",
  "LOYAL Group AMC for weighing balance & swimming pool",
  "Work order for PICONOL N.V — 17,27,700 EURO"
];

export const skills = [
  "Supply Chain",
  "Strategic Sourcing",
  "Technical Procurement",
  "Commercial Procurement",
  "CAPEX / OPEX",
  "Procure-to-Pay (P2P)",
  "Global Sourcing",
  "Vendor Management",
  "Contract Management",
  "RFQ / RFP",
  "Inventory Management / Optimization",
  "MRP",
  "Civil Contracts & Purchases",
  "O&M & Manpower Contracts",
  "IT Material & Software Licensing",
  "MEP / Projects",
  "MIS Reporting",
  "Tender Evaluation",
  "KYS / Vendor Compliance",
  "ISO / QMS / EMS / OHSAS",
  "5S / Kaizen"
];

export const software = [
  "NOW ERP 6.0",
  "MS Office",
  "AutoCAD",
  "Oracle DBMS",
  "SAP HANA",
  "SolidWorks",
  "Power BI",
  "Oracle EPB"
];

export const tools = [
  "Jira",
  "NetGain",
  "NetSuite",
  "Compliance Catalyst",
  "Felix",
  "Excel Query"
];

export const education = [
  {
    "degree": "B.E., Mechanical Engineering",
    "institution": "Agni College of Technology, Chennai",
    "year": "2017",
    "detail": "8 CGPA"
  },
  {
    "degree": "Higher Secondary Certificate",
    "institution": "Government Higher Secondary School, Tanjore",
    "year": "2013",
    "detail": "86%"
  },
  {
    "degree": "Secondary School Leaving Certificate",
    "institution": "Government Higher Secondary School, Tanjore",
    "year": "2011",
    "detail": "93%"
  }
];

export const certifications = [
  "Lean Six Sigma – Green Belt",
  "NDT",
  "PLC & SCADA"
];

export const projects = [
  {
    "title": "Modernization & Expansion Project",
    "category": "Procurement",
    "description": "Procurement and project engagement documented in the resume.",
    "technologies": [],
    "github": ""
  },
  {
    "title": "Fabrication & Project Procurement",
    "category": "Procurement",
    "description": "End-to-end procurement for fabrication projects, including PR-to-PO flow, vendor development, material coordination and documentation.",
    "technologies": [
      "P2P",
      "RFQ/RFP",
      "Vendor management"
    ],
    "github": ""
  },
  {
    "title": "Notification Logger",
    "category": "Android",
    "description": "An Android app built in Kotlin that captures and logs all device notifications in real time. Runs as a background service and stores notification data locally — useful for auditing, monitoring and automation use cases across any installed app.",
    "technologies": [
      "Kotlin",
      "Android",
      "Notifications API",
      "Background Service"
    ],
    "github": "https://github.com/Chillbroz005/Notification_Logger"
  },
  {
    "title": "Group Guardian & Filter Bot",
    "category": "Automation",
    "description": "A Telegram bot that automates group chat moderation — filters spam and unwanted messages, manages member actions, and enforces rules without any manual intervention. Commercially deployed for real customer groups.",
    "technologies": [
      "Python",
      "Telegram Bot API",
      "Flask",
      "Automation"
    ],
    "github": "https://github.com/Chillbroz005/Telegram-bot"
  },
  {
    "title": "Personal Portfolio Website",
    "category": "Other",
    "description": "This portfolio — built from scratch using TypeScript and deployed via GitHub Pages. Dynamically loads GitHub repositories via the public API, features filterable project cards, an interactive career timeline, and a contact form. Demonstrates full front-end development capability alongside a professional procurement profile.",
    "technologies": [
      "TypeScript",
      "GitHub Pages",
      "GitHub API",
      "HTML",
      "CSS"
    ],
    "github": "https://github.com/Chillbroz005/portfolio"
  }
];
