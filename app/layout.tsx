
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Header/Navbar'
import Sidebar from '@/components/Sidebar'
import '@/Styles/global.css'
import { ReactNode } from 'react';
import { dir } from 'i18next'; // برای تنظیم جهت صفحه (راست به چپ یا چپ به راست)
import LocaleClientWrapper from '@/components/LocaleClientWrapper'; // wrapper برای تنظیم زبان

export const metadata = {
  title: 'وبسایت فروش کامیون',
  description: 'سایت چندزبانه فروش کامیون و تریلی',
}


export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale} dir={dir(params.locale)}>
      <body>
        <LocaleClientWrapper locale={params.locale}>
            <Navbar />
            <Sidebar />
          {children}
          <Footer />
        </LocaleClientWrapper>
      </body>
    </html>
  );
}