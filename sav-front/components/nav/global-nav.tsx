'use client'
import cmsConfig from '@/json/cmsConfig.json'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useWindowSize } from '@uidotdev/usehooks'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import MobileNav from './mobile-nav'
import NavItem from './nav-item'
interface Props {
  user?: object | any
}

const LOGO_SRC =
  'https://images.ctfassets.net/ocgec2v7knct/6UUoXHKxH6U8NejJNtLTOz/6bc7e24084d1412dba4554d9b3b105bd/Savvy_Initiative_Logo_Approved-02.png'

const NAV_DATA_KEY = 'navigation'

const GlobalNav = ({ user = null as any }) => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const { width: windowWidth }: any = useWindowSize()

  const navGroupData = cmsConfig?.find(e => e?.key === NAV_DATA_KEY)

  const toggleMobileNavbar = () => {
    setNavbarOpen(!navbarOpen)
  }
  const pathname = usePathname()

  // if (windowWidth < 640) {
  //   return <MobileNav />
  // }
  return (
    <>
      <MobileNav />
      <header
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 0px 0px',
          boxSizing: 'border-box'
        }}
        className={`fixed z-50   
    w-full  h-20 text-sm
    font-AvenirNextLTPro  bg-secondary text-white hidden md:block`}
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
          <nav
            className={`w-full flex ${
              navbarOpen ? 'flex-col' : 'flex-row'
            } order-last justify-between max-w-fit md:max-w-full justify-items-center items-center px-2  `}
          >
            <div className='w-full  px-2 relative'>
              <div className='relative md:w-full h-full flex items-center   '>
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
              {/* 
            <ul
              className={` bg-secondary text-white py-10 list-none p-4 md:w-full space-y-4 fixed 
      left-0 right-0 min-h-screen   transition duration-200 
      transform md:relative md:flex md:min-h-0 md:space-y-0 md:space-x-6
      md:p-0 md:translate-x-0 ${
        navbarOpen ? 'translate-x-0' : 'translate-x-full'
      } hidden`}
            >
              {navGroupData?.navigationGroup?.navigationElementsCollection?.items?.map(
                (navItem, x) => {
                  return (
                    <NavResolver
                      toggleMobileNavbar={toggleMobileNavbar}
                      pathname={pathname}
                      key={`key-${x}`}
                      navItem={navItem}
                    />
                  )
                }
              )}
            </ul> */}
            </div>

            {/* <div className='hidden  md:flex self-end justify-self-end px-2'>
            {user && <>{JSON.stringify(user?.name)}</>}
          </div> */}
          </nav>
        </div>
      </header>
    </>
  )
}

export default GlobalNav
