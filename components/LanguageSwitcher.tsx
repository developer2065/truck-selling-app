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
  const { i18n: i18nextInstance } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<string>('fa');
  const [isClient, setIsClient] = useState(false);
  const [router, setRouter] = useState(null);  // Adding state for router
  const menuRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
    setIsClient(true)
    if (i18nextInstance.language) {
      setSelectedLang(i18nextInstance.language)
    }
  }, [i18nextInstance.language])

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const changeLanguage = (code: string) => {
    if (router) {
      i18nextInstance.changeLanguage(code);
      setSelectedLang(code);
      setOpen(false);

      const currentPath = router.asPath;
      const pathWithoutLang = currentPath.replace(`/${i18nextInstance.language}`, '');
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
