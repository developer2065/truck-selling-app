'use client'
import { FaBars, FaSearch } from 'react-icons/fa'
import Image from 'next/image'
import gsap from 'gsap'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import React, { useState, useEffect, useRef } from 'react'
import LanguageSwitcher from '../LanguageSwitcher'
import { usePathname, useRouter } from 'next/navigation'
import styles from '@/Styles/Navbar.module.css'
import {
  FaTelegramPlane,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa'
import SearchModal from '../SearchModal'

const Navbar = () => {
 const { t, i18n } = useTranslation('navbar')
  const pathname = usePathname()
  const locale = i18n.language

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [showSearch, setShowSearch] = useState(false)

  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setMenuOpen((prev) => !prev)
  const isActive = (path: string) => pathname === path

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const handleMouseEnter = (menu: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current)
    setActiveMenu(menu)
  }

  const handleMouseLeaveWithDelay = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current)
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
    }, 150)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav
      ref={navRef}
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
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
        <ul className={`${styles.navList} ${menuOpen ? styles.open : ''}`}>
          <li className={isActive(`/${locale}`) ? styles.active : ''}>
            <Link href={`/${locale}`}>{t('home')}</Link>
          </li>

          <li
            className={`${styles.dropdown} ${styles.navItemWithSub}`}
            onMouseEnter={() => handleMouseEnter('products')}
            onMouseLeave={handleMouseLeaveWithDelay}
          >
            <Link href={`/${locale}/products`}>
              <div className={styles.menuItem}>
                {t('products')}
                <span
                  className={`${styles.arrow} ${
                    activeMenu === 'products' ? styles.rotate : ''
                  }`}
                />
              </div>
            </Link>
          </li>

          <li
            className={`${styles.dropdown} ${styles.navItemWithSub}`}
            onMouseEnter={() => handleMouseEnter('media')}
            onMouseLeave={handleMouseLeaveWithDelay}
          >
            <Link href={`/${locale}/media`}>
              <div className={styles.menuItem}>
                {t('media')}
                <span
                  className={`${styles.arrow} ${
                    activeMenu === 'media' ? styles.rotate : ''
                  }`}
                />
              </div>
            </Link>
          </li>

          <li className={isActive(`/${locale}/events`) ? styles.active : ''}>
            <Link href={`/${locale}/events`}>{t('events')}</Link>
          </li>

          <li
            className={isActive(`/${locale}/technology`) ? styles.active : ''}
          >
            <Link href={`/${locale}/technology`}>{t('technology')}</Link>
          </li>

          <li className={isActive(`/${locale}/about`) ? styles.active : ''}>
            <Link href={`/${locale}/about`}>{t('about')}</Link>
          </li>

          <li className={isActive(`/${locale}/contact`) ? styles.active : ''}>
            <Link href={`/${locale}/contact`}>{t('contact')}</Link>
          </li>
        </ul>

        {activeMenu === 'products' && (
          <div
            className={styles.fullWidthSubmenu}
            onMouseEnter={() => handleMouseEnter('products')}
            onMouseLeave={handleMouseLeaveWithDelay}
          >
            <ul>
              <li>
                <Link href={`/${locale}/products/tipper`}>{t('product1')}</Link>
              </li>
              <li>
                <Link href={`/${locale}/products/tank`}>{t('product2')}</Link>
              </li>
              <li>
                <Link href={`/${locale}/products/platform`}>
                  {t('product3')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products/sider`}>{t('product4')}</Link>
              </li>
              <li>
                <Link href={`/${locale}/products/curtain`}>
                  {t('product5')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products/bunki`}>{t('product6')}</Link>
              </li>
              <li>
                <Link href={`/${locale}/products/container`}>
                  {t('product7')}
                </Link>
              </li>
              <li>
                <Link href={`/${locales}/products/lowbed`}>{t('product8')}</Link>
              </li>
            </ul>
          </div>
        )}

        {activeMenu === 'media' && (
          <div
            className={styles.fullWidthSubmenu}
            onMouseEnter={() => handleMouseEnter('media')}
            onMouseLeave={handleMouseLeaveWithDelay}
          >
            <ul>
              <li>
                <Link href={`/${locale}/media/photos`}>{t('media_photo')}</Link>
              </li>
              <li>
                <Link href={`/${locale}/media/videos`}>{t('media_video')}</Link>
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
          className={`${styles.menuButton} ${menuOpen ? styles.open : ''}`}
          onClick={toggleMenu}
        >
          <FaBars />
        </button>
      </div>

      {showSearch && (
        <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />
      )}
    </nav>
  )
}

export default Navbar
