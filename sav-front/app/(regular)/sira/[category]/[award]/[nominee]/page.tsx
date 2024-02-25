import LandingPage from '@/components/contentful/landing-page/landing-page'
import { extractCtfImageUrl } from '@/helpers/contentful-helpers'
import { fetchPageWithSlug } from '@/services/contentful/pages'
import { createServerClient } from '@supabase/ssr'
import type { Metadata, ResolvingMetadata } from 'next'
import { cookies, draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

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

  const entry = await fetchPageWithSlug({
    slug: `dynamic-${params?.category}-${params?.award}`,
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

const checkIfUserHasVoted = async (
  supabase: any,
  user_id: string,
  params: any
) => {
  // check for exiting vote

  const { data: existingVote, error: existingVoteError } = await supabase
    .from('sira_nominination_votes')
    .select('user_id, award, award_nomination')
    .eq('user_id', user_id)
    .eq('award', params.award)
    .limit(1)
    .single()

  console.log('existingVote', existingVote, existingVoteError)

  if (existingVote) {
    return {
      msg: 'Vote Already Cast: Your vote was recorded earlier. Thank you!',
      data: existingVote
    }
  }

  //  save vote to supabase

  const { data: newVote, error: newVoteError }: any = await supabase
    .from('sira_nominination_votes')
    .insert({
      category: params?.category || '',
      award: params?.award || '',
      award_nomination: params?.nominee || '',
      user_id: user_id || ''
    })
    .select()

  return {
    msg: 'Vote Submitted: Your vote has been successfully submitted.',
    data: newVote
  }
}

export default async function AwardPage ({
  params
}: {
  params: { award: string; category: string; nominee: string }
}) {
  //  get the latest nomination, extract the date and use it as the current year for award nomination request

  const cookieStore = cookies()
  const supabase = createServerClient<Database>(
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

  const entry = await fetchPageWithSlug({
    slug: `dynamic-${params?.category}-${params?.award}`,
    preview: draftMode().isEnabled
  })

  const session = await supabase.auth.getSession()

  if (!session?.data?.session) {
    return redirect(
      `/login?r=${process.env.NEXT_PUBLIC_APP_URL}/sira/${params?.category}/${params?.award}/${params?.nominee}`
    )
  }

  const {
    data: { user }
  } = await supabase.auth.getUser()

  //  check if user already voted. If not, record their vote
  const { msg, data } = await checkIfUserHasVoted(
    supabase,
    user?.id || '',
    params
  )

  return (
    <main className='min-h-screen w-full'>
      <LandingPage page={entry}>
        <div className='gen-spacing'>
          <h2 className='heading2'>{msg}</h2>
        </div>
      </LandingPage>
    </main>
  )
}
