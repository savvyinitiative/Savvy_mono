'use client'
import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates
} from '@contentful/live-preview/react'
import Reacr from 'react'
import ComponentResolver from '../common/component-resolver'
import ReferenceFieldMapper from '../common/reference-field-mapper'
import ShiftingCountdown from '@/components/shifting-countdown/shifting-countdown'

const ENABLE_COUNTDOWN = true

type Props = {
  // lesson: ILessonEntry | undefined;
  page: any
  children?: any
}
const LandingPage = ({ page: rawPage, children }: Props) => {
  const page = useContentfulLiveUpdates(rawPage)
  const inspectorProps = useContentfulInspectorMode()
  const heroBanner = page?.fields?.heroBanner

  // const { availableWorkshops: workshops } = usePageContext();

  if (!page) {
    return <></>
  }
  return (
    <div className='w-full  '>
      {/* {JSON.stringify(page?.fields)} */}

      {heroBanner && <ComponentResolver field={heroBanner} />}

      {children}

      {ENABLE_COUNTDOWN && (
        <ShiftingCountdown
          title='SIRA in Vegas: Countdown begins!'
          from='06/20/2024'
        />
      )}

      <div className='flex flex-col space-y-4 '>
        <div className=''>
          <ReferenceFieldMapper fields={page?.fields?.topSection} />
        </div>
        {/* <div className="py-8">
          <Tabbed />
        </div> */}
      </div>
    </div>
  )
}

export default LandingPage
