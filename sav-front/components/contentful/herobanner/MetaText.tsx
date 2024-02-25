import React from 'react'
import { ContentfulLivePreview } from '@contentful/live-preview'
import BaseButton from '../base-button/base-button'
import Actionbutton from '@/components/primitives/action-button'

const LOCALE = 'en_US'

export interface IMetaText {
  headline: string
  body: string
  entryId: string
}
const MetaText = ({ entry, actions }: { entry: IMetaText; actions: any }) => {
  const { headline, body, entryId } = entry
  return (
    <div className='flex flex-col space-y-10 h-full py-10'>
      <h1
        className='uppercase text-3xl font-extrabold sm:text-5xl md:mx-0 mx-auto '
        {...ContentfulLivePreview.getProps({
          entryId,
          fieldId: 'headline',
          locale: LOCALE
        })}
      >
        {headline}
      </h1>

      <p
        {...ContentfulLivePreview.getProps({
          entryId,
          fieldId: 'body',
          locale: LOCALE
        })}
        className='mt-4 sm:text-xl/relaxed md:mx-0 mx-auto'
      >
        {body}
      </p>
      <div
        {...ContentfulLivePreview.getProps({
          entryId,
          fieldId: 'actions',
          locale: LOCALE
        })}
        className={`flex flex-col md:flex-row space-y-4 
      md:space-y-0 md:space-x-10 items-start`}
      >
        {Array.isArray(actions) &&
          actions?.map((cta, ctx) => {
            return <BaseButton key={`key-${cta?.sys?.id}`} entry={cta} />
          })}
      </div>
      {/* random shape */}
      <div className='w-[29px] h-[21px] relative hidden'>
        <div className='w-[5px] h-[5px] left-0 top-[8px] absolute rounded-full border border-white' />
        <div className='w-[5px] h-[5px] left-0 top-0 absolute rounded-full border border-white' />
        <div className='w-[5px] h-[5px] left-0 top-[16px] absolute rounded-full border border-white' />
        <div className='w-[5px] h-[5px] left-[8px] top-[8px] absolute rounded-full border border-white' />
        <div className='w-[5px] h-[5px] left-[8px] top-0 absolute rounded-full border border-white' />
        <div className='w-[5px] h-[5px] left-[8px] top-[16px] absolute rounded-full border border-white' />
        <div className='w-[5px] h-[5px] left-[16px] top-[8px] absolute rounded-full border border-white' />
        <div className='w-[5px] h-[5px] left-[16px] top-0 absolute rounded-full border border-white' />
        <div className='w-[5px] h-[5px] left-[16px] top-[16px] absolute rounded-full border border-white' />
        <div className='w-[5px] h-[5px] left-[24px] top-[8px] absolute rounded-full border border-white' />
        <div className='w-[5px] h-[5px] left-[24px] top-0 absolute rounded-full border border-white' />
        <div className='w-[5px] h-[5px] left-[24px] top-[16px] absolute rounded-full border border-white' />
      </div>
    </div>
  )
}

export default MetaText
