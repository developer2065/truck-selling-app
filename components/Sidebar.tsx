import styles from '@/Styles/Sidebar.module.css'
import { FaPhone, FaEnvelope, FaCommentDots } from 'react-icons/fa'

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <a href="tel:+123456789" className={styles.sidebarButton}>
        <span>فکس و تلفن</span>
        <FaPhone className={styles.icon} />
      </a>
      <a href="mailto:info@example.com" className={styles.sidebarButton}>
        <span>ایمیل</span>
        <FaEnvelope className={styles.icon} />
      </a>
      <a href="#feedback" className={styles.sidebarButton}>
        <span>انتقاد و پیشنهاد</span>
        <FaCommentDots className={styles.icon} />
      </a>
    </div>
  )
}
