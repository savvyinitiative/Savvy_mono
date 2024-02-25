import LandingPage from '@/components/contentful/landing-page/landing-page'
import { fetchPageWithSlug } from '@/services/contentful/pages'
import { draftMode } from 'next/headers'
import DonateForm from '@/components/donate/donate-form'
import VotingForm from './_components/voting-form/voting-form'
import supabase from '@/utils/supabase'
import { extractCtfImageUrl } from '@/helpers/contentful-helpers'
import type { Metadata, ResolvingMetadata } from 'next'
import CategoryList from './_components/category/category-list'

const PAGE_SLUG = 'sira'
const ENABLE_FEATURE = false

type MetaProps = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata (
  { params, searchParams }: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params

  // const entry = await fetchPageWithSlug({
  //   slug: params?.slug,
  //   preview: draftMode().isEnabled
  // })
  const entry = await fetchPageWithSlug({
    slug: PAGE_SLUG,
    preview: draftMode().isEnabled
  })
  const seo = entry?.fields?.seo

  const previousTitle = (await parent).title || ''
  const previousDescription = (await parent).description || ''
  const previousImages = (await parent).openGraph?.images || []
  const extractedImage = extractCtfImageUrl(seo?.fields?.image)
  const image = extractedImage ? `https:${extractedImage}` : ''

  return {
    title: seo?.fields?.title || previousTitle,
    description: seo?.fields?.description || previousDescription,
    openGraph: {
      images: [image, ...previousImages]
    }
  }
}

export default async function Home () {
  const { data: awardCategories, error }: any = await supabase.from(
    'award_categories'
  ).select(`
      id, 
      friendly_name,
      official_name,
      description, 
      awards:awards(
        award_name,
        slug,
        status
      )
  `)

  const awards = await supabase.from('awards').select(`
  id, 
  award_name,
  category(
    friendly_name
  )
`)
  const entry = await fetchPageWithSlug({
    slug: PAGE_SLUG,
    preview: draftMode().isEnabled
  })
  return (
    <main className='min-h-screen w-full'>
      <div className=''>
        <LandingPage page={entry}>
          {/* <VotingForm awardCategories={awardCategories} /> */}
          {ENABLE_FEATURE && <CategoryList awardCategories={awardCategories} />}
        </LandingPage>
      </div>
    </main>
  )
}
