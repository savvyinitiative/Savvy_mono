import { ButtonPicker } from './ButtonPicker'
import { extractLinkFromTarget } from '@/helpers/contentful-helpers'

export interface IButtonFields {
  headline: string
  subline: string
  // size: "small" | "medium" | "large";
  style: 'Primary' | 'Secondary' | 'Accent' | 'Error' | 'Success' | 'Inverted'
  image?: any
}

const BaseButton = ({ entry }: { entry: any }) => {
  const { label, style, target, openInNewTab } = entry?.fields
  const entryId = entry?.sys?.id

  return (
    <div className='md:max-w-fit w-full text-center items-center'>
      <ButtonPicker
        variant={style}
        name={label}
        href={extractLinkFromTarget(target)}
      />
    </div>
  )
}

export default BaseButton
