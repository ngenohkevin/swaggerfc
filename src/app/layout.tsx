import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  weight: "400",
  subsets: ["latin"],
});

const siteUrl = "https://swaggersportsacademy.co.ke";
const siteName = "Swagger Sports Academy";
const siteDescription = "More than just football. A community united by passion for the beautiful game. Where every player is family and every training day is a celebration.";
const logoUrl = `${siteUrl}/logo.png`;

export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: `${siteName} - More Than Just Football`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Swagger Sports Academy",
    "football academy",
    "football",
    "soccer",
    "Kenya football",
    "youth football",
    "football training",
    "sports academy",
    "football development",
    "players",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,

  // Favicon and icons
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },

  // Open Graph (Facebook, LinkedIn, WhatsApp, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: `${siteName} - More Than Just Football`,
    description: siteDescription,
    images: [
      {
        url: logoUrl,
        width: 475,
        height: 525,
        alt: `${siteName} Logo`,
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@swaggerfc",
    creator: "@swaggerfc",
    title: `${siteName} - More Than Just Football`,
    description: siteDescription,
    images: [logoUrl],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (add your codes when you have them)
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  // },

  // Canonical URL
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },

  // App-specific
  applicationName: siteName,
  category: "sports",

  // Other
  other: {
    "theme-color": "#c9a227",
    "msapplication-TileColor": "#1a1f2e",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Additional meta tags for better sharing */}
        <meta name="theme-color" content="#c9a227" />
        <meta name="msapplication-TileColor" content="#1a1f2e" />
        <link rel="manifest" href="/manifest.json" />
        {/* Blocking script to prevent theme flash - runs before page renders */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('swaggerfc-theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${dmSerifDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
