
import type { Metadata } from 'next'
import { dir } from 'i18next'
import { languages } from '@/i18n/settings'
import { ReactNode } from 'react'
import '@/Styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fontsource/vazirmatn'
import LocaleClientWrapper from './LocaleClientWrapper'



export async function generateStaticParams() {
  return languages.map((lng) => ({ locale: lng }))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return {
    title: 'Your Site Title',
    description: 'Your Site Description',
  }
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { locale: string }
}) {
  return (
    <html  dir={dir(params.locale)}>
      <body>
        <LocaleClientWrapper locale={params.locale}>
          {children}
        </LocaleClientWrapper>
      </body>
    </html>
  )
}
