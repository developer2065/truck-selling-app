
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/Styles/global.css';
import '@fontsource/vazirmatn';
import Navbar from '@/components/Header/Navbar';
import Footer from '@/components/Footer/Footer';
import Sidebar from '@/components/Sidebar';
import { LocaleTypes } from '@/types/i18n-types';


type Props = {
  children: React.ReactNode;
  params: {
    locale: LocaleTypes;
  };
};

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;

  // تنظیمات متادیتا براساس زبان
  return {
    title: locale === 'fa' ? 'تندرتابان نصف جهان' : locale === 'en' ? 'Your Site Title' : 'عنوان سایت',
    description: locale === 'fa' ? 'توضیحات سایت به فارسی' : locale === 'en' ? 'Site description in English' : 'وصف الموقع باللغة العربية',
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html dir='rtl' lang='fa'> 
      <body>
        <Navbar />
        <Sidebar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
