import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import "./globals.css";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://music-diagnosis1865.pages.dev"
).replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "音楽家適性・楽器診断 | Musician EQ",
  description:
    "あなたの音楽的志向から楽器適性（Vo, Gt, Ba, Dr, DTM）と称号を精密診断！",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.jpg", type: "image/jpeg" },
    ],
    apple: [{ url: "/icon.jpg" }],
  },
  openGraph: {
    title: "音楽家適性・楽器診断 | Musician EQ",
    description:
      "あなたの音楽的志向から楽器適性（Vo, Gt, Ba, Dr, DTM）と称号を精密診断！",
    url: siteUrl,
    siteName: "音楽家適性・楽器診断 | Musician EQ",
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 630,
        alt: "音楽家適性・楽器診断 | Musician EQ",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "音楽家適性・楽器診断 | Musician EQ",
    description:
      "あなたの音楽的志向から楽器適性（Vo, Gt, Ba, Dr, DTM）と称号を精密診断！",
    images: ["/ogp.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-indigo-500 selection:text-white flex flex-col">
        {/* 背景グラデーション装飾 */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-600/15 blur-[130px] rounded-full" />
          <div className="absolute bottom-0 right-10 w-[500px] h-[350px] bg-purple-600/10 blur-[140px] rounded-full" />
        </div>

        <main className="container mx-auto px-4 py-8 sm:py-14 flex-1 flex flex-col justify-center">
          {children}
        </main>

        {/* グローバルフッター */}
        <footer className="w-full py-6 px-4 border-t border-zinc-900/80 bg-zinc-950/60 backdrop-blur-sm">
          <div className="container mx-auto flex items-center justify-center">
            <a
              href="https://note.com/jazzy_begin"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-zinc-900/70 hover:bg-indigo-500/10 border border-zinc-800/80 hover:border-indigo-500/30 text-xs font-medium text-zinc-400 hover:text-indigo-300 transition-all duration-200"
            >
              <span>©2026 buro</span>
              <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
