import React from 'react'

const SEND_ICON =
  'https://images.ctfassets.net/ocgec2v7knct/Qh6XY7d3oRvfiGJhxGbIY/68ff23be2b288eae3e1dc5e35e64f758/sav.svg'

const SubscribeNewsletter = () => {
  return (
    <div className='component-mtx '>
      <div className='w-full py-10 bg-secondary '>
        <div className='flex flex-col space-y-10 md:space-y-0 md:space-x-10  md:flex-row p-2 component-spacing h-full'>
          <div className='flex flex-col items-center space-y-2 h-full text-left'>
            <div className=" text-white text-lg font-bold  leading-tight">
              NEWSLETTER
            </div>
            <div className=" text-white text-sm font-medium  leading-tight">
              Stay Upto Date
            </div>
          </div>
      
          <div className='w-full min-w-[100px] bg-white h-12 rounded-3xl relative flex '>
            <input
              type='text'
              className='ml-4  w-[80%] bg-transparent outline-none focus:outline-none'
              placeholder='Your Email'
            />
            <div className='absolute right-0 '>
              <div className='bg-accent rounded-full h-12 w-12 flex items-center justify-center'>
                <img loading='lazy' src={SEND_ICON} className='w-8 h-8' />
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='hidden border h-20 bg-white flex w-[892px] max-w-full grow flex-col mt-24x pl-5 rounded-3xl border-solid border-stone-300 '>
              <img
                loading='lazy'
                src={SEND_ICON}
                className='aspect-square object-cover object-center w-[52px] shrink-0 -mr-px'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscribeNewsletter
