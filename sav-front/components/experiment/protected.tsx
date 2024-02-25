'use client'

import { fetchData } from '@/services/keycloak/backend/test/keycloak'

const Protected = () => {
  const goGetData = () => {
    fetchData().then(r => {})
  }

  return (
    <div>
      {/* {isLoggedIn ? <>Logged in</> : <>Not logged in</>} */}
      <div
        onClick={goGetData}
        className='bg-primary h-20 w-20 cursor-pointer'
      ></div>

      <div className=' bg-secondary-500 h-20 w-20'></div>
      <div className=' bg-primary-500 h-20 w-20'></div>
      <div className='bg-accent-500 h-20 w-20'></div>
      {/* {JSON.stringify(userData)} */}
      {/* <div className='w-40 overflow-scroll'>{JSON.stringify(token)}</div> */}
    </div>
  )
}

export default Protected
