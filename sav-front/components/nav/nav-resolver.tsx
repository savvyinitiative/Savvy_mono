'use client'
import React from 'react'
import { useState, useEffect, forwardRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import cmsConfig from '@/json/cmsConfig.json'
import { extractLinkFromTarget } from '@/helpers/contentful-helpers'
import LinkItem from './link-item'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
// import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import type * as Radix from '@radix-ui/react-primitive'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/primitives/dropdown-primitiv'

import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineMenuUnfold
} from 'react-icons/ai'

interface Props {
  navItem: any
  pathname: string
  toggleMobileNavbar: any
}
export const resolveTarget = (target: any) => {
  const contentType = target?.__typename

  if (!contentType) return '/'

  switch (contentType) {
    case 'ExternalLink':
      return target?.link || '/'

      break

    case 'Page':
      const page = target
      return `/${page?.slug}` || '/'

      break

    default:
      return '/'
      break
  }

  return '/'
}

const WithoutChildren = ({ navItem, pathname, toggleMobileNavbar }: Props) => {
  return (
    <LinkItem
      href={resolveTarget(navItem?.target)}
      pathname={pathname}
      toggleMobileNavbar={toggleMobileNavbar}
      label={navItem?.label}
      // label={extractLinkFromTarget(navItem?.target)}
    />
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
    <li
      onClick={toggleMobileNavbar}
      className='list-none text-white text-base font-medium  '
    >
      <div className='self-center m-auto flex flex-col  justify-items-center '>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className='outline-none cursor-pointer'>
              <div className='flex flex-col items-center cursor-pointer m-auto'>
                <span className=''>{navItem?.label}</span>
                <div
                  className={`w-[27px] h-[0px] mt-1 border-2 border-accent ${
                    isViewingChildPage ? 'block' : 'hidden'
                  }`}
                ></div>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            // align='end'
            className='min-w-[220px] z-50  bg-secondary text-white rounded-md p-[5px] shadow-primary will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade'
          >
            {subNavigationElements?.map((subItem: any, sx: number) => {
              return (
                <DropdownMenuItem
                  asChild
                  key={`key-${sx}`}
                  className='group text-[13px] leading-none py-6 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1'
                >
                  <Link href={resolveTarget(subItem)}>
                    <div className='flex flex-col items-center cursor-pointer'>
                      <span className=''>{subItem?.title}</span>
                      <div
                        className={`w-[27px] h-[0px] mt-2 border-2 border-accent ${
                          pathname === resolveTarget(subItem)
                            ? 'block'
                            : 'hidden'
                        }`}
                      ></div>
                    </div>
                  </Link>
                  {/* <div className=' group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8'>
                  <LinkItem
                    href={resolveTarget(subItem)}
                    pathname={pathname}
                    toggleMobileNavbar={toggleMobileNavbar}
                    label={subItem?.title}
                  />
                </div> */}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* <div className='flex flex-col items-center'>
        <span className=''>{navItem?.label}</span>
        <div
          className={`w-[27px] h-[0px] mt-1 border-2 border-accent ${
            pathname === navItem?.slug ? 'block' : 'hidden'
          }`}
        ></div>
      </div> */}
      {/* 

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <div className='flex flex-col items-center cursor-pointer'>
            <span className=''>{navItem?.label}</span>
            <div
              className={`w-[27px] h-[0px] mt-1 border-2 border-accent ${
                pathname === navItem?.slug ? 'block' : 'hidden'
              }`}
            ></div>
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className='min-w-[220px] z-50  bg-secondary text-white rounded-md p-[5px] shadow-primary will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade'
            sideOffset={10}
            
          >
            <DropdownMenu.Item className='group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1'>
              New Tab{' '}
              <div className='ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8'>
                ⌘+T
              </div>
            </DropdownMenu.Item>
            {subNavigationElements?.map((subItem: any, sx: number) => {
              return (
                <DropdownMenu.Item
                  asChild
                  key={`key-${sx}`}
                  className='group text-[13px] leading-none py-6 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1'
                >
                  <div className=' group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8'>
               

                    <LinkItem
                      href={resolveTarget(subItem)}
                      pathname={pathname}
                      toggleMobileNavbar={toggleMobileNavbar}
                      label={subItem?.title}
                     
                    />
                  </div>
                </DropdownMenu.Item>
              )
            })}

            <DropdownMenu.Arrow className='fill-white' />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root> */}
    </li>
  )
}

const NavResolver = ({ navItem, pathname, toggleMobileNavbar }: Props) => {
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

  return (
    <div>
      {/* {resolveTarget(navItem?.target)} */}
      {/* {JSON.stringify(subNavigationElements)} */}
      <LinkItem
        href={resolveTarget(navItem?.target)}
        pathname={pathname}
        toggleMobileNavbar={toggleMobileNavbar}
        label={navItem?.label}
        // label={extractLinkFromTarget(navItem?.target)}
      />
      {subNavigationElements?.length > 0 ? 'has children' : ''}
    </div>
  )
}

export default NavResolver
