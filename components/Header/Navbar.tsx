"use client";
import { FaBars, FaSearch } from "react-icons/fa";
import Image from "next/image";
import gsap from "gsap";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect, useRef } from "react";
import LanguageSwitcher from "../LanguageSwitcher";
import { usePathname } from "next/navigation";
import styles from "@/Styles/Navbar.module.css";
import {
  FaTelegramPlane,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import SearchModal from "../SearchModal";

const Navbar = () => {
  const { t, i18n } = useTranslation("navbar");
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const menuTimeoutRef = useRef(null);
  const navRef = useRef(null);

  // تشخیص محیط کلاینت
  useEffect(() => {
    setIsClient(true);
    // اجبار به به‌روزرسانی زبان بر اساس URL
    const urlPath = window.location.pathname;
    const langFromUrl = urlPath.split("/")[1]; // اولین بخش پس از /

    if (langFromUrl && ["fa", "en", "ar"].includes(langFromUrl)) {
      i18n.changeLanguage(langFromUrl);
    }
  }, []);

  // تشخیص زبان فعلی
  const locale = isClient ? i18n.language : "fa";

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const isActive = (path) => pathname === path;

  useEffect(() => {
    if (!isClient) return;
    setMenuOpen(false);
  }, [pathname, isClient]);

  const handleMouseEnter = (menu) => {
    if (!isClient) return;
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeaveWithDelay = () => {
    if (!isClient) return;
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  useEffect(() => {
    if (!isClient) return;

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isClient]);

  // نمایش کامپوننت خالی در سمت سرور برای جلوگیری از خطای hydration
  if (!isClient) {
    return <nav className={styles.navbar}></nav>;
  }

  return (
    <nav
      ref={navRef}
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
    >
      <div className={styles.languageSearchWrapper}>
        <LanguageSwitcher />
        <button
          className={styles.searchButton}
          onClick={() => setShowSearch(true)}
        >
          <FaSearch />
        </button>
        <div className={styles.socialIcons}>
          <a
            href="https://t.me/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegramPlane />
          </a>
          <a
            href="https://wa.me/yourwhatsapplink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://youtube.com/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
        </div>
      </div>

      <div className={styles.navListWrapper}>
        <ul
          className={`${styles.navList} ${
            isClient && menuOpen ? styles.open : ""
          }`}
          suppressHydrationWarning
        >
          <li className={isActive(`/${locale}`) ? styles.active : ""}>
            <Link href={`/${locale}`}>{t("home")}</Link>
          </li>

          <li
            className={`${styles.dropdown} ${styles.navItemWithSub}`}
            onMouseEnter={() => handleMouseEnter("products")}
            onMouseLeave={handleMouseLeaveWithDelay}
          >
            <Link href={`/${locale}/products`}>
              <div className={styles.menuItem}>
                {t("products")}
                <span
                  className={`${styles.arrow} ${
                    activeMenu === "products" ? styles.rotate : ""
                  }`}
                />
              </div>
            </Link>
          </li>

          <li
            className={`${styles.dropdown} ${styles.navItemWithSub}`}
            onMouseEnter={() => handleMouseEnter("media")}
            onMouseLeave={handleMouseLeaveWithDelay}
            suppressHydrationWarning
          >
            <Link href={`/${locale}/media`} suppressHydrationWarning>
              <div className={styles.menuItem}>
                {isClient ? t("media") : "رسانه"}
                <span
                  className={`${styles.arrow} ${
                    isClient && activeMenu === "media" ? styles.rotate : ""
                  }`}
                  suppressHydrationWarning
                />
              </div>
            </Link>
          </li>

          <li
            className={isActive(`/${locale}/events`) ? styles.active : ""}
            suppressHydrationWarning
          >
            <Link href={`/${locale}/events`} suppressHydrationWarning>
              {isClient ? t("events") : "رویدادها"}
            </Link>
          </li>

          <li
            className={isActive(`/${locale}/technology`) ? styles.active : ""}
            suppressHydrationWarning
          >
            <Link href={`/${locale}/technology`} suppressHydrationWarning>
              {isClient ? t("technology") : "تکنولوژی"}
            </Link>
          </li>

          <li
            className={isActive(`/${locale}/about`) ? styles.active : ""}
            suppressHydrationWarning
          >
            <Link href={`/${locale}/about`} suppressHydrationWarning>
              {isClient ? t("about") : "درباره ما"}
            </Link>
          </li>

          <li
            className={isActive(`/${locale}/contact`) ? styles.active : ""}
            suppressHydrationWarning
          >
            <Link href={`/${locale}/contact`} suppressHydrationWarning>
              {isClient ? t("contact") : "تماس با ما"}
            </Link>
          </li>
        </ul>

        {isClient && activeMenu === "products" && (
          <div
            className={styles.fullWidthSubmenu}
            onMouseEnter={() => handleMouseEnter("products")}
            onMouseLeave={handleMouseLeaveWithDelay}
          >
            <ul>
              <li>
                <Link href={`/${locale}/products/tipper`}>{t("product1")}</Link>
              </li>
              <li>
                <Link href={`/${locale}/products/tank`}>{t("product2")}</Link>
              </li>
              <li>
                <Link href={`/${locale}/products/platform`}>
                  {t("product3")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products/sider`}>{t("product4")}</Link>
              </li>
              <li>
                <Link href={`/${locale}/products/curtain`}>
                  {t("product5")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products/bunki`}>{t("product6")}</Link>
              </li>
              <li>
                <Link href={`/${locale}/products/container`}>
                  {t("product7")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products/lowbed`}>{t("product8")}</Link>
              </li>
            </ul>
          </div>
        )}

        {isClient && activeMenu === "media" && (
          <div
            className={styles.fullWidthSubmenu}
            onMouseEnter={() => handleMouseEnter("media")}
            onMouseLeave={handleMouseLeaveWithDelay}
          >
            <ul>
              <li>
                <Link href={`/${locale}/media/photos`}>{t("media_photo")}</Link>
              </li>
              <li>
                <Link href={`/${locale}/media/videos`}>{t("media_video")}</Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className={styles.logoWrapper}>
        <Link href={`/${locale}`}>
          <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
        </Link>
      </div>

      <div className={styles.menuButtonWrapper}>
        <button
          className={`${styles.menuButton} ${
            isClient && menuOpen ? styles.open : ""
          }`}
          onClick={toggleMenu}
          suppressHydrationWarning
        >
          <FaBars />
        </button>
      </div>

      {isClient && showSearch && (
        <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />
      )}
    </nav>
  );
};

export default Navbar;
