'use client';
import React from 'react'
import Link from 'next/link'
import { FaInstagram, FaLinkedin, FaTelegram, FaVideo } from 'react-icons/fa'
import styles from '@/Styles/Footer.module.css'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

const Footer = () => {
  const { t } = useTranslation()
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-container']}>
        <div className={styles['footer-column']}>
          <Image
            width={50}
            height={50}
            src="/images/logo.png"
            alt="لوگوی شرکت"
            className={styles.logo}
          />
          <p>
            {' '}
            تولیدکننده تخصصی انواع تریلی و کامیون با سال‌ها تجربه در صنعت
            حمل‌ونقل سنگین درکنار شماهستیم.
          </p>
        </div>

        {/* بخش لینک‌های نوبار به صورت عمودی */}
        <div className={`${styles['footer-column']} ${styles.links}`}>
          <h4>لینک ها</h4>
          <div className={styles['footer-link-row']}>
            <Link href="/products">محصولات</Link>
            <Link href="/media">رسانه</Link>
            <Link href="/about">درباره ما</Link>
          </div>
          <div className={styles['footer-link-row']}>
            <Link href="/events">رویدادها</Link>
            <Link href="/technology">فناوری</Link>
          </div>
        </div>

        {/* بخش شبکه‌های اجتماعی */}
        <div className={styles['footer-column']}>
          <h4>صفحات اجتماعی</h4>
          <div className={styles['footer-social-icons']}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={25} />
            </a>

            <a
              href="https://www.aparat.com/yourchannel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Aparat"
              style={{ color: 'currentColor', fontSize: '25px' }}
            >
              <FaVideo />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={25} />
            </a>
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegram size={25} />
            </a>
          </div>
        </div>
      </div>

      {/* بخش کپی رایت */}
      <div className={styles['footer-copyright']}>
        <p>© 2025 شرکت شما. تمامی حقوق محفوظ است.</p>
      </div>
    </footer>
  )
}

export default Footer
