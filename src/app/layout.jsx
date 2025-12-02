// Styles
import "./globals.css";

// React
import { Suspense } from "react";

// Fonts
import { Rubik } from "next/font/google";

// Components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const rubik = Rubik({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: ["400", "500", "600", "700"],
});

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={rubik.variable}>
      <body className={`${rubik.className} antialiased bg-white`}>
        <div className="flex flex-col min-h-screen">
          <Suspense fallback={<div className="h-32 bg-gray-50" />}>
            <Header />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
