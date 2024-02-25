import Protected from '@/components/experiment/protected'
import directus from '@/utils/directus.js'

const HOMEPAGE_SLUG = 'homepage'

export default async function Home () {
  // {params, searchParams}
  //   const state = searchParams?.state
  //   const scope = searchParams?.scope
  //   const prompt = searchParams?.prompt

  // await getDirectusToken()

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className=''>
        <Protected />
      </div>
    </main>
  )
}
