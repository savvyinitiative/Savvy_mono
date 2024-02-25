'use client'
import React, { useRef, useState, useEffect } from 'react'
import Nominations from './nominations'
import * as RadioGroup from '@radix-ui/react-radio-group'
import Actionbutton from '@/components/primitives/action-button'
import {
  extractYoutubeVideoId,
  extractCtfImageUrl
} from '@/helpers/contentful-helpers'
import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import supabase from '@/utils/supabase.browser'
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'
import AnimatedTabs from '@/components/animated-tabs/animated-tabs'

interface IProps {
  fields: IFields
}

interface IFields {
  title: string
  category: string
  year: Number
  nominations: any[]
}
interface IVoteActionProps {
  nominations: any[]
  onNomineeChange: (e: any) => void
  selectedNomineeId: any
}

const VoteAction = ({
  nominations,
  onNomineeChange,
  selectedNomineeId
}: IVoteActionProps) => {
  return (
    <div className='py-6'>
      <div className=''>
        <p className=''>Select and Vote a nominee </p>
      </div>
      <RadioGroup.Root
        className=' grid grid-cols-1 md:grid-cols-3 gap-4 '
        // defaultValue={selectedNomineeId}
        value={selectedNomineeId}
        aria-label='Select and Vote a nominee'
        onValueChange={onNomineeChange}
      >
        {Array.isArray(nominations) &&
          nominations?.map((nomination, nx) => {
            return (
              <RadioGroup.Item
                key={`key-${nx}-${nomination?.sys?.id}`}
                //   className='bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px]  hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default'
                className={`relative w-72 h-72  ring-primary transition-ease focus:shadow-[0_0_0_2px] focus:ring-8 ${
                  nomination?.fields?.awardSlug === selectedNomineeId
                    ? ' ring-4 border-2 border-accent '
                    : 'shadow-md'
                } outline-none cursor-pointer overflow-hidden  rounded-full`}
                value={nomination?.fields?.awardSlug}
                id={nomination?.sys?.id}
                required
              >
                <div
                  className='bg-fixedx bg-auto bg-no-repeat bg-center  h-full'
                  style={{
                    backgroundImage: `url(${extractCtfImageUrl(
                      nomination?.fields?.nomineeImage
                    )}?w=500&f=face&fit=thumb)`
                  }}
                >
                  <div className=' h-full flex items-center m-auto'>
                    <label
                      className='bg-primary shadow-md text-3xl leading-none pl-[15px]x m-auto p-2'
                      htmlFor={nomination?.sys?.id}
                    >
                      {nomination?.fields?.nomineeName}
                    </label>
                  </div>
                </div>

                {/* <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-red-400" /> */}
              </RadioGroup.Item>
            )
          })}
      </RadioGroup.Root>
    </div>
  )
}
const AwardNominationList = (props: IProps) => {
  const router = useRouter()
  const votingRef = useRef<HTMLDivElement>(null)
  const { title, category, year, nominations } = props?.fields

  const [selectedNomineeId, setSelectedNomineeId] = useState(
    nominations?.[0]?.fields?.awardSlug
  )
  const [selectedNomineeName, setSelectedNomineeName] = useState(
    nominations?.[0]?.fields?.nomineeName
  )

  const onNomineeChange = (e: any) => {
    setSelectedNomineeId(e)
    const selectedNomineeEntry = nominations?.find(
      entry => entry?.fields?.awardSlug === e
    )

    if (selectedNomineeEntry) {
      setSelectedNomineeName(selectedNomineeEntry?.fields?.nomineeName)
    }
  }

  const goToVotingAction = () => {
    try {
      if (votingRef?.current) {
        votingRef?.current?.scrollIntoView({ behavior: 'smooth' })
      }
    } catch (error) {
      console.error('Error scrolling to voting action:', error)
    }
  }

  const handleVoteSubmission = async () => {
    try {
      const session = await supabase.auth.getSession()
      if (!session?.data?.session) {
        return router.push(
          `/login?r=${process.env.NEXT_PUBLIC_APP_URL}/sira/${searchParams?.category}/${searchParams?.award}/${selectedNomineeId}`
        )
      }
      const {
        data: { user }
      } = await supabase.auth.getUser()

      const { data: existingVote, error: existingVoteError } = await supabase
        .from('sira_nominination_votes')
        .select('user_id, award, award_nomination')
        .eq('user_id', user?.id || '')
        .eq('award', searchParams.award)
        .limit(1)
        .single()

      if (existingVote) {
        alert('Vote Already Cast: Your vote was recorded earlier. Thank you!')
        return {
          msg: 'Vote Already Cast: Your vote was recorded earlier. Thank you!',
          data: existingVote
        }
      }

      //  save vote to supabase

      const payload: any = {
        category: searchParams?.category || '',
        award: searchParams?.award || '',
        award_nomination: selectedNomineeId,
        user_id: user?.id || ''
      }

      const { data: newVote, error: newVoteError }: any = await supabase
        .from('sira_nominination_votes')
        .insert(payload)
        .select()

      if (newVote) {
        alert('Vote Submitted: Your vote has been successfully submitted.')
      } else {
        alert('Error occured: Your vote was not submited.')
      }

      return {
        msg: 'Vote Submitted: Your vote has been successfully submitted.',
        data: newVote
      }
    } catch (error) {
      console.error('Error Submitting vote:', error)
    }
  }

  const searchParams = useParams()
  const tabs = [
    {
      title: 'Product',
      value: 'product',
      content: (
        <div className='w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900'>
          <p>Product Tab</p>
          <DummyContent />
        </div>
      )
    },
    {
      title: 'Services',
      value: 'services',
      content: (
        <div className='w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900'>
          <p>Services tab</p>
          <DummyContent />
        </div>
      )
    },
    {
      title: 'Playground',
      value: 'playground',
      content: (
        <div className='w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900'>
          <p>Playground tab</p>
          <DummyContent />
        </div>
      )
    },
    {
      title: 'Content',
      value: 'content',
      content: (
        <div className='w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900'>
          <p>Content tab</p>
          <DummyContent />
        </div>
      )
    },
    {
      title: 'Random',
      value: 'random',
      content: (
        <div className='w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900'>
          <p>Random tab</p>
          <DummyContent />
        </div>
      )
    }
  ]

  return (
    <div className='component-spacing'>
      {/* <div className='h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40'>
        <AnimatedTabs tabs={tabs} />
      </div> */}
      <div className='text prose-xl component-py component-spacing flex flex-col space-y-6'>
        <div className='heading2'>
          {title} ({year.toString()}) Nominees
        </div>
        <Nominations
          nominations={nominations}
          goToVotingAction={goToVotingAction}
          onNomineeChange={onNomineeChange}
        />
        <div ref={votingRef} className=''>
          <VoteAction
            nominations={nominations}
            selectedNomineeId={selectedNomineeId}
            onNomineeChange={onNomineeChange}
          />
        </div>

        <div className='flex flex-col space-y-2'>
          <p className=''>
            Cast your vote for <b>{selectedNomineeName} </b> to receive the
            prestigious{' '}
            <b>
              {year.toString()} SIRA {title}
            </b>
            . Your support shapes the future. Vote now!
          </p>

          <Actionbutton
            label='Submit Vote'
            onClick={handleVoteSubmission}
            style='Secondary'
          />
          {/* <Link
            href={`/sira/${searchParams?.category}/${searchParams?.award}/${selectedNomineeId}`}
          >
            <div className='btnz btnz-secondary'>Submit Vote</div>
          </Link> */}
        </div>
      </div>
    </div>
  )
}

const DummyContent = () => {
  return (
    <img
      src='/linear.webp'
      alt='dummy image'
      width='1000'
      height='1000'
      className='object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto'
    />
  )
}

export default AwardNominationList
