'use client'
import React from 'react'
import { useState, useEffect,  } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import cmsConfig from '@/json/cmsConfig.json'
import { extractLinkFromTarget } from '@/helpers/contentful-helpers'
import NavResolver from './nav-resolver'
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineMenuUnfold
} from 'react-icons/ai'



const LinkItem = ({
    toggleMobileNavbar,
    href,
    pathname,
    label
  }: {
    toggleMobileNavbar: any
    href: string
    pathname: string
    label: string
  }) => {
    return (
      <li
        onClick={toggleMobileNavbar}
        className='list-none text-white text-base font-medium '
        data-state="open"
      >
        <Link  href={href}>
          <div className='flex flex-col items-center'>
            <span className=''>{label}</span>
            <div
              className={`w-[27px] h-[0px] mt-1 border-2 border-accent ${
                pathname === href ? 'block' : 'hidden'
              }`}
            ></div>
          </div>
        </Link>
      </li>
    )
  }

export default LinkItem