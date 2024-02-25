const BG_IMAGE =
  'https://images.ctfassets.net/ocgec2v7knct/2jBMAGCHIPXDx5WcQ3DPln/7f346c15ed420dcf9e13552eefcdef1b/pexels-cottonbro-studio-6590920.jpg'

export default async function SussesulDonation () {
  return (
    <div className=' flex items-center justify-center  bg-cover bg-center bg-no-repeat  p-2 md:p-10 h-full relative overflow-hidden'>
      <img
        loading='lazy'
        srcSet={BG_IMAGE}
        className='absolute z-[-1] h-full w-full object-cover object-center inset-0'
      />
      <div className='hidden md:block md:w-[60%]'></div>
      <div className='md:w-[40%]'>
        <div className='flex flex-col bg-accent p-2 md:p-10 h-full shadow-md max-w-full'>
          <h1 className='text-white'>Thank you for your donation!</h1>
        </div>
      </div>
    </div>
  )
}
