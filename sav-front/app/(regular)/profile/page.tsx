import React from 'react'


import { cookies } from 'next/headers'

const ProfilePage = async () => {
  const cookieStore = cookies()
  const accessToken: any = cookieStore.get('access_token')?.value || ''

  let currentUser: any = ''


  return (
    <div>
      ProfilePage is protected
      {JSON.stringify(currentUser)}
    </div>
  )
}

export default ProfilePage
