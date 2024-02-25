'use client'
import React from 'react'
import FooterGroup from './footer-group'
import SubscribeNewsletter from '../subscribe-newsletter/subscribe-newsletter'
import cmsConfig from '@/json/cmsConfig.json'

const FOOTER_CONFIG_DATA_KEY = 'footer'

const Footer = () => {
  const year = new Date().getFullYear()
  const siteName = 'Savvy Initiative'
  const footerGroupData = cmsConfig?.find(
    e => e?.key === FOOTER_CONFIG_DATA_KEY
  )
  return (
    <div className='component-mtx mt-40'>
      {/* {JSON.stringify(footerGroupData)}! */}

      <SubscribeNewsletter />
      <footer className='bg-secondary text-on-secondary'>
        <div className='text-on-secondary py-20 flex flex-col md:flex-row  space-y-10 md:space-y-0 md:space-x-10 component-spacing w-full  '>
          {footerGroupData?.navigationGroup?.navigationElementsCollection?.items?.map(
            (el, x) => {
              return (
                <FooterGroup
                  key={`key-${x}-${el?.label}`}
                  title={el?.label}
                  linkElements={el?.subNavigationElementsCollection?.items}
                />
              )
            }
          )}
          {/* <FooterGroup title={'Company'} />
          <FooterGroup title={'HELP CENTRE'} />
          <FooterGroup title={'CONTACT INFO'} /> */}
        </div>

        <div className='w-full p-2 md:pr-20'>
          <p className='md:order-last md:float-right '>
            <span className='text-xs lg:text-sm max-w-7xl m-auto py-2'>
              &copy; {year} {siteName} | All Right Reserved.
            </span>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
