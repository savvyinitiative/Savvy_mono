'use client'
import cmsConfig from '@/json/cmsConfig.json'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import NavItem from './nav-item'
interface Props {
  user?: object | any
}

const LOGO_SRC =
  'https://images.ctfassets.net/ocgec2v7knct/6UUoXHKxH6U8NejJNtLTOz/6bc7e24084d1412dba4554d9b3b105bd/Savvy_Initiative_Logo_Approved-02.png'

const NAV_DATA_KEY = 'navigation'

const MobileNav = ({ user = null as any }) => {
  const [navbarOpen, setNavbarOpen] = useState(false)

  const navGroupData = cmsConfig?.find(e => e?.key === NAV_DATA_KEY)

  const toggleMobileNavbar = () => {
    setNavbarOpen(!navbarOpen)
  }
  const pathname = usePathname()
  return (
    <header
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 0px 0px',
        boxSizing: 'border-box'
      }}
      className={`fixed z-50   
    w-full  h-20 text-sm
    font-AvenirNextLTPro  ${
      navbarOpen ? 'overflow-hidden h-screen' : ''
    } bg-secondary text-white  md:hidden`}
    >
      <div
        className={`w-full flex flex-row  space-x-4 justify-between md:justify-start  items-center component-spacing h-16 `}
      >
        <div className='w-28'>
          <Link href='/'>
            <div className='h-full w-28x w-32x w-40 relative'>
              <img src={LOGO_SRC} alt='' className='' />
            </div>
          </Link>
        </div>

        <div className='md:w-[20%]'></div>
        <div className='w-fullx flex order-last'>
          <button onClick={toggleMobileNavbar} className='md:hidden '>
            {navbarOpen ? (
              <AiOutlineClose size={30} />
            ) : (
              <AiOutlineMenu size={30} />
            )}
          </button>
        </div>
        {/* <nav
          className={`w-full flex ${
            navbarOpen ? 'flex-col' : 'flex-row'
          } order-last justify-between max-w-fit md:max-w-full justify-items-center items-center px-2  `}
        >
          <div className='hidden  md:flex self-end justify-self-end px-2'>
            {user && <>{JSON.stringify(user?.name)}</>}
          </div>
        </nav> */}
      </div>
      <div className='w-full  px-2 relative'>
        <div className='relative md:w-full h-full flex items-center  '>
          <NavigationMenu.Root
            orientation='vertical'
            className={`relative  z-[1] h-full flex w-screenx justify-center ${
              navbarOpen ? 'flex ' : 'hidden md:flex'
            } 
                `}
          >
            <NavigationMenu.List className='center  m-0 flex flex-col md:flex-row list-none  p-1 '>
              {navGroupData?.navigationGroup?.navigationElementsCollection?.items?.map(
                (navItem, x) => {
                  return (
                    <NavItem
                      toggleMobileNavbar={toggleMobileNavbar}
                      pathname={pathname}
                      key={`key-${x}`}
                      navItem={navItem}
                    />
                  )
                }
              )}

              <NavigationMenu.Indicator className='data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-fullx z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]'>
                <div className='relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-accent' />
              </NavigationMenu.Indicator>
            </NavigationMenu.List>

            <div className='perspective-[2000px] absolute top-full left-0 flex w-full justify-center'>
              <NavigationMenu.Viewport className='data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]' />
            </div>
          </NavigationMenu.Root>
        </div>
      </div>
    </header>
  )
}

export default MobileNav
