'use client'
import React from 'react'

// import { SessionProvider } from 'next-auth/react'

const SessionProviderWrapper = ({
  children
}: {
  children: React.ReactNode
}) => {
  return <>{children}</>
}

export default SessionProviderWrapper
