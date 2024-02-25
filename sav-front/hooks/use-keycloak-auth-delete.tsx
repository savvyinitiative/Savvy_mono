'use client'
import { useState, useEffect } from 'react'
import Keycloak, { KeycloakConfig } from 'keycloak-js'

function parseClientToken (token: string | null): any | null {
  if (token) {
    try {
      return JSON.parse(token) as any
    } catch (error) {
      console.error('Error parsing clientToken:', error)
    }
  }
  return null // or provide a default user data
}

const keycloakConfig: KeycloakConfig = {
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || '',
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || '',
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || ''
}
const useKeyCloakAuth = (user = false) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState('')
  const clientToken: string | null = localStorage.getItem('token')
  const parsedUserData = parseClientToken(clientToken)
  const [userData, setUserData] = useState<any>(parsedUserData)

  const initializeClient = async () => {
    const client = new Keycloak(keycloakConfig)
    const initializedClient = await client.init({ onLoad: 'login-required' })

    return client
  }

  const hasTokenExpired = (storedUserData: any) => {
    try {
      const tokenExpiration = storedUserData?.expiry || 0
      const currentTimestamp = Math.floor(Date.now() / 1000)

      return tokenExpiration < currentTimestamp
    } catch (error) {
      return true
    }
  }

  useEffect(() => {
    return () => {
      try {
        const clientToken = localStorage.getItem('token')
        if (clientToken) {
          const storedUserData = JSON.parse(clientToken)
          setUserData(storedUserData)

          const checkTokenExpiry = hasTokenExpired(storedUserData)

          if (!checkTokenExpiry) return
        }
      } catch (error) {}

      try {
        initializeClient().then(client => {
          setIsLoggedIn(client?.authenticated as boolean)
          setToken(client?.token as string)

          const userData: any = {
            first_name: client?.tokenParsed?.given_name,
            last_name: client?.tokenParsed?.family_name,
            email: client?.tokenParsed?.email,
            name: client?.tokenParsed?.name,
            token: client?.token,
            expiry: client?.tokenParsed?.exp
          }
          localStorage.setItem('token', JSON.stringify(userData))

          setUserData(userData)
        })
        // const client = new Keycloak(keycloakConfig)
        // client.init({ onLoad: 'login-required' }).then((res) => {
        //   setIsLoggedIn(res)
      } catch (error) {
        console.error('useKeyCloakAuth', error)
      }
    }
  }, [])

  return {
    isLoggedIn,
    token,
    userData
  }
}

export default useKeyCloakAuth
