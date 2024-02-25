// import AspectRatioImage from "@/components/common/ui/aspect-ratio-image";
import { IMediaWrapper } from '@/interfaces/interfaces-contentful'
import * as AspectRatio from '@radix-ui/react-aspect-ratio'

const ImageWrapper = (props: IMediaWrapper) => {
  const { title, altText, image, caption } = props?.fields
  return (
    <div className=' '>
      <div className='flex flex-col items-center min-w-[300px] w-full overflow-hidden '>
        <AspectRatio.Root ratio={16 / 9}>
          <img
            src={image?.fields?.file?.url}
            className='h-autox max-w-full h-full w-full object-contain p-10 '
            alt={altText.toString()}
          />
        </AspectRatio.Root>

        {caption && (
          <div className='w-80% mt-4 px-8 text-sm line-clamp-3 text-nt'>
            {caption}
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageWrapper
