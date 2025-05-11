'use client'
import { useState } from 'react';
import Image from 'next/image';
import styles from '@/Styles/EventsSection.module.css';
import Link from 'next/link';

const events = [
  {
    id: 1,
    image: '/images/ax1.webp',
    title: 'افتتاح خط تولید جدید',
    description: 'با حضور مدیران کشوری، خط تولید جدید رونمایی شد.',
    imageHeight: 110,
  },
  {
    id: 2,
    image: '/images/ax1.webp',
    title: 'شرکت در نمایشگاه بین‌المللی',
    description: 'حضور موفق در نمایشگاه خودروهای سنگین در آلمان.',
    imageHeight: 70,
  },
  {
    id: 3,
    image: '/images/ax1.webp',
    title: 'انعقاد تفاهم‌نامه با شرکت خارجی',
    description: 'تفاهم‌نامه همکاری مشترک در زمینه فناوری کامیون‌های برقی.',
    imageHeight: 110,
  },
];

export default function EventsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className={styles.eventsSection}>
      <div className={styles.header}>
        <h2>رویدادها</h2>
        <div className={styles.headerBtns}>
          <button onClick={openModal} className={styles.newsletterBtn}>
            عضویت در خبرنامه
          </button>
          <Link href="/events" className={styles.allEventsBtn}>
            کل رویدادها
          </Link>
        </div>
      </div>
      <div className={styles.cards}>
        {events.map((event) => (
          <div key={event.id} className={styles.card}>
            <Image
              width={300}
              height={event.imageHeight}
              src={event.image}
              alt={event.title}
              className={styles.image}
            />
            <div className={styles.cardContent}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div className={styles.linkWrapper}>
                <Link href="/events" className={styles.eventLink}>
                  رویدادها
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* مودال عضویت در خبرنامه */}
      {isModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <span className={styles.close} onClick={closeModal}>
              &times;
            </span>
            <h3>عضویت در خبرنامه</h3>
            <input type="name" placeholder="نام ونام خانوادگی " />
            <input type="email" placeholder="ایمیل" />
            <button>ثبت عضویت</button>
          </div>
        </div>
      )}
    </section>
  );
}
