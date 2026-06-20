import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Providers } from "@/app/providers";
import "@/app/globals.css";

export const viewport: Viewport = {
  themeColor: "#0f0f12",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://turn2grow.com"),
  title: {
    default: "Turn2Grow — Custom Software for Growing-businesses",
    template: "%s — Turn2Grow",
  },
  description:
    "US-based digital software agency engineering custom SaaS, AI, cloud, and digital solutions for growing businesses and SMEs.",
  authors: [{ name: "Turn2Grow" }],
  openGraph: {
    title: "Turn2Grow — Custom Software for Growing-businesses",
    description:
      "US-based digital software agency engineering custom SaaS, AI, cloud, and digital solutions for growing businesses and SMEs.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        // url: "https://storage.googleapis.com/gpt-engineer-file-uploads/A8HP5dZixqO54jAJ8OUjIvHBOrD2/social-images/social-1779295445603-t2g.webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Turn2Grow — Custom Software for Growing-businesses",
    description:
      "US-based digital software agency engineering custom SaaS, AI, cloud, and digital solutions for growing businesses and SMEs.",
    images: [
      "/og-image.png",
      // "https://storage.googleapis.com/gpt-engineer-file-uploads/A8HP5dZixqO54jAJ8OUjIvHBOrD2/social-images/social-1779295445603-t2g.webp",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Inline theme script — runs before paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=document.documentElement;if(t==='light'){d.classList.remove('dark');d.classList.add('light');}else{d.classList.remove('light');d.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <div className="min-h-screen bg-background text-foreground">
            <SmoothScroll />
            <Header />
            <main className="">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
