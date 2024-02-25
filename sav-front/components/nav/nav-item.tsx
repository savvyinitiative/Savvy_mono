import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import Link from 'next/link'
import React from 'react'
import { resolveTarget } from './nav-resolver'

interface Props {
  navItem: any
  pathname: string
  toggleMobileNavbar: any
}

const WithoutChildren = ({ navItem, pathname, toggleMobileNavbar }: Props) => {
  const href = resolveTarget(navItem?.target)
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Link
        className=' hover:text-accent focus:shadow-white block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]'
        href={resolveTarget(navItem?.target)}
      >
        {/* {navItem?.label} */}
        <div
          onClick={toggleMobileNavbar}
          className='flex flex-col items-center w-full cursor-pointer'
        >
          <span className='w-full'>{navItem?.label}</span>
          <div
            className={`w-[27px] h-[0px] mt-2 border-[1px] border-accent ${
              pathname === href ? 'hidden md:block' : 'hidden'
            }`}
          ></div>
        </div>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  )
}

const WithChildren = ({ navItem, pathname, toggleMobileNavbar }: Props) => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true)
  const [urlsChecked, setUrlsChecked] = React.useState(false)
  const [person, setPerson] = React.useState('pedro')
  const subNavigationElements = navItem?.subNavigationElementsCollection?.items

  const isViewingChildPage = subNavigationElements?.find(
    (e: any) => pathname === resolveTarget(e)
  )

  return (
    <NavigationMenu.Item>
      <NavigationMenu.Trigger className='hover:text-accent focus:shadow-accent group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]'>
        {navItem?.label}
      </NavigationMenu.Trigger>
      <NavigationMenu.Content className='absolute top-0 left-0 w-full sm:w-auto text-black'>
        <ul className='m-0 grid list-none gap-x-[10px] p-[22px]x md:w-[600px] w-full min-w-full sm:grid-flow-col sm:grid-rows-3'>
          {subNavigationElements?.map((subItem: any, sx: number) => {
            return (
              <li
                onClick={toggleMobileNavbar}
                key={`key-${sx}`}
                className='group text-[13px] hover:text-accent leading-none py-6 rounded-[3px] flex items-center h-[25px] px-[5px]x relative pl-[25px]x px-4 select-none outline-none data-[disabled]:text-gray-400 data-[disabled]:pointer-events-none data-[highlighted]:text-accent '
              >
                <Link href={resolveTarget(subItem)}>
                  <div className='flex flex-col items-center cursor-pointer'>
                    <span className=''>{subItem?.title}</span>
                    <div
                      className={`w-[27px] h-[0px] mt-2 border-2 border-accent ${
                        pathname === resolveTarget(subItem) ? 'block' : 'hidden'
                      }`}
                    ></div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  )
}

const NavItem = ({ navItem, pathname, toggleMobileNavbar }: Props) => {
  const subNavigationElements = navItem?.subNavigationElementsCollection?.items

  if (subNavigationElements?.length > 0) {
    return (
      <WithChildren
        toggleMobileNavbar={toggleMobileNavbar}
        pathname={pathname}
        navItem={navItem}
      />
    )
  }

  return (
    <WithoutChildren
      toggleMobileNavbar={toggleMobileNavbar}
      pathname={pathname}
      navItem={navItem}
    />
  )
}

export default NavItem
