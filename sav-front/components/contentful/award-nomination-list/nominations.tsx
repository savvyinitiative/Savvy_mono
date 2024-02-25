import React from 'react'
import generateOptions from '@/components/contentful/common/richtext/richtext-options'
import YoutubeVideo from '@/components/primitives/youtube-video'
import {
  extractYoutubeVideoId,
  extractCtfImageUrl
} from '@/helpers/contentful-helpers'
import MediaWrapper from '@/components/contentful/media-wrapper'
import * as Tabs from '@radix-ui/react-tabs'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

interface IProps {
  nominations: any[]
  goToVotingAction: () => void
  onNomineeChange: (e: any) => void
}

interface INominationProps {
  nomination: any
}

const NominationItem = ({ nomination }: INominationProps) => {
  const { awardSlug, nomineeName, nomineeImage, nominationDetails } =
    nomination?.fields
  return (
    <div>
      <div className='flex h-80'>
        {/* <div className='text-black text-[40px] font-semibold leading-7 py-4 md:py-2'>
          {nomineeName}
        </div> */}
        <img
          className={` object-contain w-full  `}
          src={extractCtfImageUrl(nomineeImage)}
        />
      </div>

      <article className='prose-lg text'>
        {documentToReactComponents(nominationDetails, generateOptions())}
      </article>
      {/* <pre className=''>{JSON.stringify(nomination?.fields, null, 2)}</pre> */}
    </div>
  )
}
const Nominations = ({
  nominations,
  goToVotingAction,
  onNomineeChange
}: IProps) => {
  return (
    <div>
      <Tabs.Root
        className='flex flex-col shadow-[0_2px_10px]x shadow-secondary'
        defaultValue={nominations?.[0]?.fields?.nomineeName}
      >
        <Tabs.List
          className='shrink-0 flex flex-col h-40 md:h-full md:flex-row border-b border-primary'
          aria-label='Select A nominee'
        >
          {Array.isArray(nominations) &&
            nominations?.map((nomination, nx) => {
              return (
                <Tabs.Trigger
                  key={`key-${nx}-${nomination?.sys?.id}`}
                  className='bg-white px-5 h-[45px] flex-1 flex items-center justify-center  text-lg leading-none text-black select-none first:rounded-tl-mdx last:rounded-tr-mdx hover:bg-primary-100 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px]x data-[state=active]:focus:shadow-blackx outline-none cursor-pointer'
                  value={nomination?.fields?.nomineeName}
                >
                  {nomination?.fields?.nomineeName}
                </Tabs.Trigger>
              )
            })}
        </Tabs.List>

        {Array.isArray(nominations) &&
          nominations?.map((nomination, nx) => {
            const handleVoteFor = () => {
              onNomineeChange(nomination?.fields?.awardSlug)
              goToVotingAction()
            }
            return (
              <Tabs.Content
                key={`key-${nx}-${nomination?.sys?.id}`}
                className='grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px]x focus:shadow-primaryx'
                value={nomination?.fields?.nomineeName}
              >
                <NominationItem
                  key={`key-${nx}-${nomination?.sys?.id}`}
                  nomination={nomination}
                />
                <div
                  className='cursor-pointerx bg-accentx p-2x text-center w-full  '
                  onClick={handleVoteFor}
                >
                  <div className='btnz btnz-primary m-auto w-full cursor-pointer'>
                    VOTE NOW FOR {nomination?.fields?.nomineeName}
                  </div>
                </div>
              </Tabs.Content>
            )
          })}
      </Tabs.Root>
    </div>
  )
}

export default Nominations
