// 'use client'
// import { usePathname } from "next/navigation";
// import { ReactNode } from "react";

// interface ClientLayoutProps {
//   children: ReactNode;
// }

// export default function ClientLayout({ children }: ClientLayoutProps) {
//   const pathname = usePathname();
//   const isHome = pathname === "/";
  
//   // تعیین پس‌زمینه برای هر صفحه
//   const backgroundStyles = {
//     "/": "bg-home",
//     "/services": "bg-services",
//     "/products": "bg-products",
//     "/contact": "bg-contact",
//   }

  
//   return (
//     <div className={`min-h-screen ${isHome ? "home" : ""} ${backgroundStyles[pathname] || "bg-default"}`}>

//       {children}
//     </div>
//   );
// }
