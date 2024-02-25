import TestRealtime from '@/components/donate/tes-realtime'
// import supabase from '@/utils/supabase'
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { headers, cookies } from 'next/headers'

export const revalidate = 0

export default async function Page () {
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
  const { data } = await supabase.from('donations').select()
  return (
    <>
      !
      <TestRealtime data={data} />
    </>
  )
}
