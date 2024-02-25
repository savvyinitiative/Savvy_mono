import React from 'react'
import {
  readItems,
  authentication,
  refresh,
  createDirectus,
  rest,
  readCollections,
  readCollection,
  readMe,
  withOptions,
  withToken
} from '@directus/sdk'
import directus from '@/utils/directus.js'
import { cookies } from 'next/headers'

const ProfilePage = async () => {
  const cookieStore = cookies()
  const accessToken: any = cookieStore.get('access_token')?.value || ''

  let currentUser: any = ''
  try {
    currentUser = await directus.request(
      withToken(
        accessToken,
        readMe({
          fields: ['*']
        })
      )
    )
  } catch (error) {
    console.error('za currentUser error', error)
  }

  return (
    <div>
      ProfilePage is protected
      {JSON.stringify(currentUser)}
    </div>
  )
}

export default ProfilePage
