import styles from '@/Styles/DiagonalSection.module.css'
import Image from 'next/image'
import Link from 'next/link'

const DiagonalSection = () => {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.imageBox}`}>
        <Image src="/images/right.png" alt="left" width={600} height={400} />
      </div>

      <div className={styles.middleBox}>
        <div className={styles.diagonalBackground}>
          <div className={styles.content}>
            <h3>خرید مطمئن پشتیبانی مستمر</h3>
            <ul>
              <li>
                <Link href="/warranty">گارانتی محصولات</Link>
              </li>
              <li>
                <Link href="/spare-parts">قطعات یدکی و لوازم جانبی</Link>
              </li>
              <li>
                <Link href="/service-centers">مراکز خدمات پس از فروش</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`${styles.imageBox}`}>
        <Image src="/images/left.jpg" alt="right" width={600} height={400} />
      </div>
    </div>
  )
}

export default DiagonalSection
