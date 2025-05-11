import fs from 'fs'
import path from 'path'

export function getProducts(locale: string) {
  const productSlugs = ['product1-details', 'product2-details', 'product3-details']

  return productSlugs.map((slug) => {
    const filePath = path.join(process.cwd(),  'locales', locale, 'products', `${slug}.json`)
    const fileContents = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(fileContents)
  })
}
