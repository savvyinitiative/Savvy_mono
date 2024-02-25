import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Lora } from 'next/font/google'
import Footer from '@/components/footer/footer'
import { Poppins } from 'next/font/google'
import SupabaseProvider from '@/contexts/supabase-provider'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })
const lora = Lora({ subsets: ['latin'] })
const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap'
})

const ogImage =
  'https://images.ctfassets.net/ocgec2v7knct/cRIPSTwgcvSvOD0yN6iNh/c7f774a84fdd8056ed8209fbfcb5d258/Savvy_Initiative_Logo_Approved-01.png'

export const metadata: Metadata = {
  title: 'SAVVY | Celebrating Excellence, Inspiring Change',
  description:
    'Welcome to SIRA Awards, presented by SAVVY Initiative—a distinguished institution dedicated to building, recognizing, and celebrating excellence across diverse fields'
  // openGraph: {
  //   images: [ogImage]
  // }
}

export default async function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get (name: string) {
          return cookieStore.get(name)?.value
        }
      }
    }
  )
  const {
    data: { session }
  } = await supabase.auth.getSession()
  return (
    <html lang='en'>
      <body className={lora.className}>
        <SupabaseProvider accessToken={session?.access_token}>
          <div className=''>
            <div className=''> {children}</div>
            <Footer />
          </div>
        </SupabaseProvider>
      </body>
    </html>
  )
}
