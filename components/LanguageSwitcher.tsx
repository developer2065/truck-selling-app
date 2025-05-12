'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import styles from '@/Styles/LanguageSwitcher.module.css';
import { useRouter } from 'next/router';

const languages = [
  { code: 'fa', label: 'Fa' },
  { code: 'ar', label: 'Ar' },
  { code: 'en', label: 'En' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<string>('fa');
  const [isClient, setIsClient] = useState(false);
  const [router, setRouter] = useState<any>(null);  // Router state to ensure it's client-side
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    if (i18n.language) {
      setSelectedLang(i18n.language);
    }
    
    // Ensure useRouter is only called on the client
    if (typeof window !== 'undefined') {
      const routerInstance = useRouter();
      setRouter(routerInstance);
    }
  }, [i18n.language]);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setSelectedLang(code);
    setOpen(false);

    // Update the URL to reflect the new language
    if (router) {
      const currentPath = router.asPath;
      const pathWithoutLang = currentPath.replace(`/${i18n.language}`, '');
      const newPath = `/${code}${pathWithoutLang}`;

      router.push(newPath);
    }
  };

  useEffect(() => {
    if (open) {
      gsap.fromTo(
        '.lang-item',
        { opacity: 0, y: -5 },
        { opacity: 1, y: 0, duration: 0.2, stagger: 0.05 }
      );
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  if (!isClient) return null; // Prevent rendering on server side

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
