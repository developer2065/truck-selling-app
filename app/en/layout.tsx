import React from "react";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Header/Navbar";
import Sidebar from "@/components/Sidebar";
import "@/Styles/global.css";
import { dir } from "i18next";
import LocaleClientWrapper from "@/components/LocaleClientWrapper";

export const metadata = {
  title: "وبسایت فروش کامیون",
  description: "سایت چندزبانه فروش کامیون و تریلی",
};

export default function FaLayout({ children }: { children: React.ReactNode }) {
  const locale = "en";

  // توجه: دیگر تگ‌های html و body اینجا نیست
  return (
    <LocaleClientWrapper locale={locale}>
      <div dir={dir(locale)} lang={locale}>
        <Navbar />
        <Sidebar />
        {children}
        <Footer />
      </div>
    </LocaleClientWrapper>
  );
}
