import LandingPage from '@/components/contentful/landing-page/landing-page'
import { fetchPageWithSlug } from '@/services/contentful/pages'
import { draftMode } from 'next/headers'
import supabase from '@/utils/supabase'

const HOMEPAGE_SLUG = 'homepage'

export default async function Home () {
  const entry = await fetchPageWithSlug({
    slug: HOMEPAGE_SLUG,
    preview: draftMode().isEnabled
  })

  const { data } = await supabase.from('donations').select()
  return (
    <main className='min-h-screen w-full'>
      <div className=''>
        <LandingPage page={entry} />
      </div>
    </main>
  )
}
