"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import styles from "@/Styles/LanguageSwitcher.module.css";
import { usePathname, useRouter } from "next/navigation";

const languages = [
  { code: "fa", label: "Fa" },
  { code: "ar", label: "Ar" },
  { code: "en", label: "En" },
];

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("fa");
  const [isClient, setIsClient] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    if (i18n.language) {
      setSelectedLang(i18n.language);
    }
  }, [i18n.language]);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const changeLanguage = (code) => {
    // 1. تغییر زبان در i18n
    i18n.changeLanguage(code);
    setSelectedLang(code);
    setOpen(false);

    // 2. اصلاح مسیر به روشی که با ساختار روتینگ Next.js سازگار باشد
    const segments = pathname.split("/").filter(Boolean);

    // حذف زبان فعلی اگر اولین بخش مسیر باشد
    if (segments.length > 0 && languages.some((l) => l.code === segments[0])) {
      segments.shift();
    }

    // ساخت مسیر جدید با زبان جدید
    const newPath = `/${code}${
      segments.length ? `/${segments.join("/")}` : ""
    }`;

    // انتقال به مسیر جدید
    router.push(newPath);
  };

  useEffect(() => {
    if (open) {
      gsap.fromTo(
        ".lang-item",
        { opacity: 0, y: -5 },
        { opacity: 1, y: 0, duration: 0.2, stagger: 0.05 }
      );
    }

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  if (!isClient) return null;

  return (
    <div ref={menuRef} className={styles.switcher}>
      <div className={styles.icon} onClick={toggleMenu}>
        <span className={styles.iconText}>🌍</span>
      </div>

      {open && (
        <div className={styles.dropdown}>
          {languages
            .filter((l) => l.code !== selectedLang)
            .map((lang) => (
              <div
                key={lang.code}
                className={`lang-item ${styles.langItem}`}
                onClick={() => changeLanguage(lang.code)}
              >
                {lang.label}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
