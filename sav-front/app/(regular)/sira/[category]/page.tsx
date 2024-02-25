import { fetchPages, fetchPageWithSlug } from '@/services/contentful/pages'
import LandingPage from '@/components/contentful/landing-page/landing-page'
import { draftMode } from 'next/headers'
import type { Metadata, ResolvingMetadata } from 'next'
import supabase from '@/utils/supabase'
import { notFound } from 'next/navigation'
import CategoryList from '../_components/category/category-list'
import AwardList from '../_components/award/award-list'

import { extractCtfImageUrl } from '@/helpers/contentful-helpers'

type MetaProps = {
  params: { category: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata (
  { params, searchParams }: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  //   const entry = await fetchPageWithSlug({
  //     slug: params?.category,
  //     preview: draftMode().isEnabled
  //   })

  //   const seo = entry?.fields?.seo

  //   const previousTitle = (await parent).title || ''
  //   const previousDescription = (await parent).description || ''
  //   const previousImages = (await parent).openGraph?.images || []
  //   const extractedImage = extractCtfImageUrl(seo?.fields?.image)
  //   const image = extractedImage ? `https:${extractedImage}` : ''

  const { data: awardCategory, error } = await supabase
    .from('award_categories')
    .select(
      `
      id,
      friendly_name,
      official_name,
      description
  `
    )
    .eq('friendly_name', params.category)

  return {
    title: `SAVVY | ${awardCategory?.[0]?.official_name}`,
    description: awardCategory?.[0]?.description
    // openGraph: {
    //   images: [image, ...previousImages]
    // }
  }
}

export async function generateStaticParams () {
  //   const pages = await fetchPages()

  const { data: awardCategories, error }: any = await supabase.from(
    'award_categories'
  ).select(`
      id, 
      friendly_name,
      official_name,
      description
  `)

  try {
    // const slugs = pages?.items.map((page: any) => {
    //   return { slug: page?.fields?.slug }
    // })

    if (!awardCategories) {
      return [{ category: '' }]
    }

    const slugs = awardCategories?.map((category: any) => {
      return { category: category?.friendly_name }
    })

    return slugs
  } catch (error) {
    return [{ category: '' }]
  }
}

export const revalidate = 0
export default async function CategoriesPage ({
  params
}: {
  params: { category: string }
}) {
  //   const entry = await fetchPageWithSlug({
  //     slug: params?.slug,
  //     preview: draftMode().isEnabled
  //   })
  const { data: awardCategories, error } = await supabase
    .from('award_categories')
    .select(
      `
        id,
        friendly_name,
        official_name,
        description,
        awards:awards(
            award_name,
            slug,
            status
          )
    `
    )
    .eq('friendly_name', params.category)

  if (!awardCategories?.[0]) {
    // not found
    return notFound()
  }

  return (
    <main className='min-h-screen w-full p-10'>
      <AwardList
        category={params?.category}
        awards={awardCategories?.[0]?.awards}
        categoryName={awardCategories?.[0]?.official_name}
        categoryFriendlyName={awardCategories?.[0]?.friendly_name}
      />

      {/* <LandingPage page={entry} /> */}
    </main>
  )
}
