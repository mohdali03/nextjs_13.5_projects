
import { Inter , Space_Grotesk } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Metadata } from 'next'
import { ThemeProvider } from '@/context/ThemeProvider'

const inter = Inter({ subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900' ],
  variable: '--font-inter' })

const spacegrotesk = Space_Grotesk({ subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', ],
  variable: '--font-spaceGrotesk' })

export const metadata: Metadata = {
  title: 'Stack Flow',
  description: '',
  icons:{
    icon : '/assets/favicon.ico', 

  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="en">
        <body className={inter.className}>
        <ClerkProvider appearance={
          {
            elements:{
              formButtonPrimary: 'primary-gradiant',
              footerActionLink: 'primary-text-gradiant hover: text-primary-500',
              
            }
          }
        }>
        <ThemeProvider >

          {children}
        </ThemeProvider>
        </ClerkProvider>
          </body>
      </html>
  )
}
