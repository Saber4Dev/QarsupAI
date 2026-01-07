import './globals.css'
import './assets/css/tailwind.css'
import "./assets/css/materialdesignicons.min.css"
import { Figtree} from 'next/font/google'
import CookieWrapper from './components/cookieWrapper'

const figtree= Figtree({ 
  subsets: ['latin'],
  weight:['400','500','600','700'],
  variable: '--font-figtree',
})

export const metadata = {
  title: 'Qarsup AI - Next Js AI Writer & Copywriting Template',
  description: 'Qarsup AI - Next Js AI Writer & Copywriting Template',
  openGraph: {
    title: 'Qarsup AI - Next Js AI Writer & Copywriting Template',
    description: 'Qarsup AI - Next Js AI Writer & Copywriting Template',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qarsup AI - Next Js AI Writer & Copywriting Template',
    description: 'Qarsup AI - Next Js AI Writer & Copywriting Template',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth" dir="ltr">
      <body className={`${figtree.variable} font-figtree text-base text-slate-900 dark:text-white dark:bg-slate-900 `} suppressHydrationWarning>
        {children}
        <CookieWrapper />
      </body>
    </html>
  )
}
