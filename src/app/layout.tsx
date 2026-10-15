import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "H.M. Tours & Travels | হজ ও উমরাহ কাফেলা (লাইসেন্স নং ০৮০১)",
  description: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত হজ ও উমরাহ ট্রাভেল এজেন্সি।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="scroll-smooth">
      <head>
        {/* ১০০% নিশ্চিত ডিজাইনের জন্য Tailwind CDN ও চমৎকার বাংলা ও আরবি ফন্ট */}
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Amiri:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-slate-50 text-slate-800" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}