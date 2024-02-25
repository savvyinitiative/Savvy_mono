import { fetchPages, fetchPageWithSlug } from '@/services/contentful/pages'
import LandingPage from '@/components/contentful/landing-page/landing-page'
import { draftMode } from 'next/headers'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import { extractCtfImageUrl } from '@/helpers/contentful-helpers'

type MetaProps = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata (
  { params, searchParams }: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params

  const entry = await fetchPageWithSlug({
    slug: params?.slug,
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

export async function generateStaticParams () {
  const pages = await fetchPages()
  try {
    const slugs = pages?.items.map((page: any) => {
      if (!page?.fields?.slug.startsWith('dynamic')) {
        return { slug: page?.fields?.slug }
      }
    })

    return slugs
  } catch (error) {
    return [{ slug: '' }]
  }
}

// export const revalidate = 3600;
export default async function Home ({ params }: { params: { slug: string } }) {
  const entry = await fetchPageWithSlug({
    slug: params?.slug,
    preview: draftMode().isEnabled
  })

  if (!entry || params?.slug?.startsWith('dynamic')) {
    return notFound()
  }
  return (
    <main className='min-h-screen w-full'>
      {/* {JSON.stringify(params)} */}

      {/* <PageProvider workshops={workshops as any}> */}
      <LandingPage page={entry} />
      {/* </PageProvider> */}
    </main>
  )
}
