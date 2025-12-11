// Styles
import "./globals.css";

// Fonts
import { Rubik } from "next/font/google";

// Components
import NextTopLoader from "nextjs-toploader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Context
import { SavedDesignsProvider } from "@/context/SavedDesignsContext";

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
        <SavedDesignsProvider>
          <NextTopLoader color="#8b5cf6" showSpinner={false} height={4} />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </SavedDesignsProvider>
      </body>
    </html>
  );
};

export default RootLayout;
