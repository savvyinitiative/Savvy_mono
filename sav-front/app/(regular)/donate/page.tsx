import LandingPage from '@/components/contentful/landing-page/landing-page'
import { fetchPageWithSlug } from '@/services/contentful/pages'
import { draftMode } from 'next/headers'
import DonateForm from '@/components/donate/donate-form'

const PAGE_SLUG = 'donate'

export default async function Home () {
  const entry = await fetchPageWithSlug({
    slug: PAGE_SLUG,
    preview: draftMode().isEnabled
  })
  return (
    <main className='min-h-screen w-full'>
      <div className=''>
        <DonateForm />
        <LandingPage page={entry} />
      </div>
    </main>
  )
}
