import styles from '@/Styles/ProductsSection.module.css'
import Link from 'next/link'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'
import { GetStaticProps } from 'next'

interface Product {
  slug: string
  name: string
  infoImage: string
  banner: string
  sticker?: string
}

export default function ProductsSection({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return <div>محصولی برای نمایش وجود ندارد</div>
  }

  return (
    <section className={styles.productsSection}>
      <div className={styles.topArea}>
        <h2 className={styles.title}>محصولات تندرتابان</h2>
        <div className={styles.buttons}>
          <button className={`${styles.actionButton} ${styles.actionButton1}`}>
            دکمه ۱
          </button>
          <button className={`${styles.actionButton} ${styles.actionButton2}`}>
            دکمه ۲
          </button>
        </div>
      </div>

      {[
        { products: products.slice(0, 3), className: styles.productsGridRow1 },
        { products: products.slice(3, 5), className: styles.productsGridRow2 },
        { products: products.slice(5, 8), className: styles.productsGridRow3 }
      ].map(({ products, className }, rowIndex) => (
        <div key={rowIndex} className={className}>
          {products.map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`} className={styles.productCard}>
              <div className={styles.imageWrapper}>
                <Image
                  src={product.infoImage}
                  alt={product.name}
                  width={300}
                  height={250}
                  className={styles.productImage}
                />
                {product.banner && (
                  <Image
                    src={product.banner}
                    alt="بنر"
                    width={40}
                    height={40}
                    className={styles.sticker}
                  />
                )}
              </div>
              <div className={styles.productName}>{product.name}</div>
            </Link>
          ))}
        </div>
      ))}
    </section>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  try {
    const productSlugs = [
      'product1-details',
      'product2-details',
      'product3-details',
      'product4-details',
      'product5-details',
      'product6-details',
      'product7-details',
      'product8-details'
    ]

    const products = await Promise.all(
      productSlugs.map(async (slug) => {
        const filePath = path.join(process.cwd(), 'public', 'locales', locale || 'fa', 'products', `${slug}.json`)
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const data = JSON.parse(fileContent)
        return data
      })
    )

    return {
      props: { products }
    }
  } catch (error) {
    console.error('Error loading products:', error)
    return { props: { products: [] } }
  }
}
