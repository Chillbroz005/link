import "./globals.css";
import { BASE } from "../data/base";
import type { ReactNode } from "react";

export const metadata = {
  metadataBase: new URL("https://chillbroz005.github.io"),
  title: "Suresh Ganesan | Supply Chain & Procurement",
  description: "Executive portfolio and interactive resume for Suresh Ganesan — Supply Chain, Procurement, CAPEX/OPEX, P2P and project experience.",
  keywords: ["Suresh Ganesan","Supply Chain","Procurement","SCM","P2P","CAPEX","OPEX","Vendor Management"],
  authors: [{ name: "Suresh Ganesan" }],
  openGraph: {
    title: "Suresh Ganesan | Supply Chain & Procurement",
    description: "Executive portfolio and interactive resume for Suresh Ganesan.",
    type: "website",
    images: [{ url: `${BASE}/profile-photo.png`, width: 1254, height: 1254, alt: "Suresh Ganesan" }]
  },
  icons: { icon: `${BASE}/favicon.svg` }
};

export default function RootLayout({children}:{children:ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
