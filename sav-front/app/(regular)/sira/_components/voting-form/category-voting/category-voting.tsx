import React, { useState } from 'react'
import { motion, useTransform, useScroll, AnimatePresence } from 'framer-motion'
import * as Collapsible from '@radix-ui/react-collapsible'

interface IProps {
  category: any
}
const CategoryVoting = ({ category }: IProps) => {
  const { scrollYProgress } = useScroll()
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className='bg- bg-secondary-50 text-white '
    >
      <Collapsible.Root
        className='w-[300px] hidden'
        open={open}
        onOpenChange={setOpen}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span
            className='text-violet11 text-[15px] leading-[25px]'
            style={{ color: 'white' }}
          >
            @peduarte starred 3 repositories
          </span>
          <Collapsible.Trigger asChild>
            <button className='rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 shadow-[0_2px_10px] shadow-blackA4 outline-none data-[state=closed]:bg-white data-[state=open]:bg-violet3 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black'>
              {open ? 'open icon' : 'closed icon'}
            </button>
          </Collapsible.Trigger>
        </div>

        <div className='rounded my-[10px] p-[10px] shadow-[0_2px_10px] shadow-blackA4'>
          <span className='text-violet11 text-[15px] leading-[25px]'>
            @radix-ui/primitives
          </span>
        </div>

        <Collapsible.Content>
          <div className=' rounded my-[10px] p-[10px] shadow-[0_2px_10px] shadow-blackA4'>
            <span className='text-violet11 text-[15px] leading-[25px]'>
              @radix-ui/colorsi
            </span>
          </div>
          <div className='rounded my-[10px] p-[10px] shadow-[0_2px_10px] shadow-blackA4'>
            <span className='text-violet11 text-[15px] leading-[25px]'>
              @stitches/react
            </span>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
      <pre className='w-40'>{JSON.stringify(category, null, 2)}</pre>
    </motion.div>
  )
}

export default CategoryVoting
