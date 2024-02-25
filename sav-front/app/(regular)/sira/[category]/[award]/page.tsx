import ComponentResolver from '@/components/contentful/common/component-resolver'
import LandingPage from '@/components/contentful/landing-page/landing-page'
import { extractCtfImageUrl } from '@/helpers/contentful-helpers'
import { fetchPageWithSlug } from '@/services/contentful/pages'
import supabase from '@/utils/supabase'
import type { Metadata, ResolvingMetadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import AnimatedCarousel from '@/components/animated-carousel/animated-carousel'

type MetaProps = {
  params: { award: string; category: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const CURRENT_AWARD_YEAR = 2024 // probably not the best way to handle this
export async function generateMetadata (
  { params, searchParams }: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { data: awardNomination, error: awardNominationError } = await supabase
    .from('award_nominations')
    .select(
      `id,
  year`
    )
    .order('year', { ascending: false })
    .limit(1)
    .single()

  const currentAwardYear = awardNomination?.year || CURRENT_AWARD_YEAR

  const { data: award, error } = await supabase
    .from('awards')
    .select(
      `
  id,
  award_name,
  category,
  status,
  slug,
  nominations:award_nominations!award_nominations_award_fkey(
    id,
    nominee_name,
    year,
    slug,
    summary
  )
`
    )
    .eq('slug', params.award)
    .eq('nominations.year', currentAwardYear)

  const entry = await fetchPageWithSlug({
    slug: `dynamic-${params?.category}-${award?.[0]?.slug}`,
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

export const revalidate = 0

export default async function AwardPage ({
  params
}: {
  params: { award: string; category: string }
}) {
  //  get the latest nomination, extract the date and use it as the current year for award nomination request

  const { data: awardNomination, error: awardNominationError } = await supabase
    .from('award_nominations')
    .select(
      `id,
    year`
    )
    .order('year', { ascending: false })
    .limit(1)
    .single()

  const currentAwardYear = awardNomination?.year || CURRENT_AWARD_YEAR

  const { data: award, error } = await supabase
    .from('awards')
    .select(
      `
    id,
    award_name,
    category,
    status,
    slug,
    nominations:award_nominations!award_nominations_award_fkey(
      id,
      nominee_name,
      year,
      slug,
      summary
    )
`
    )
    .eq('slug', params.award)
    .eq('nominations.year', currentAwardYear)

  console.log('awardNominationError', award, error)

  const entry = await fetchPageWithSlug({
    slug: `dynamic-${params?.category}-${award?.[0]?.slug}`,
    preview: draftMode().isEnabled
  })

  if (!award?.[0]) {
    // not found
    return notFound()
  }

  return (
    <main className='min-h-screen w-full'>
      <LandingPage page={entry}>
        {entry?.fields?.topic && (
          <ComponentResolver field={entry?.fields?.topic} />
        )}
      </LandingPage>
    </main>
  )
}
