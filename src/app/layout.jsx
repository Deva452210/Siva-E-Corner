import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Siva E-Corner",
  description: "Essential e-services for government-related documents, banking services, and seamless travel solutions.",
  icons: {
    icon: "/Siva-Logo.svg",
  },
  openGraph: {
    title: "Siva E-Corner",
    description: "Essential e-services for government-related documents, banking services, and seamless travel solutions.",
    images: [
      {
        url: "/siva-preview.png",
        width: 1200,
        height: 630,
        alt: "Siva E-Corner Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siva E-Corner",
    description: "Essential e-services for government-related documents, banking services, and seamless travel solutions.",
    images: ["/siva-preview.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">{children}</body>
    </html>
  );
}
