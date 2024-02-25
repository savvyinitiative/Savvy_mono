'use client'
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from 'react'
// import Keycloak, { KeycloakConfig } from 'keycloak-js'

import keycloak from '@/services/keycloak/keaycloak'
import { ReactKeycloakProvider, useKeycloak,  } from "@react-keycloak/web";


interface AuthContextType {
  isLoggedIn: boolean
//   token: string
//   user: any
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// const keycloakConfig: KeycloakConfig = {
//   url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || '',
//   realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || '',
//   clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || ''
// }

export const AuthProvider = ({ children }: {
  children: React.ReactNode
}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  //   const [token, setToken] = useState<string>('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

//   const { token, userData, isLoggedIn } = useKeyCloakAuth()

//   useEffect(() => {
//     try {
//         const clientToken = localStorage.getItem('token');
//         if(clientToken){
            
//             setUser(JSON.parse(clientToken))
//             setLoading(false);
//         }
        
//     } catch (error) {
        
//     }
    
    
   
//     return () => {}
//   }, [])

//   useEffect(() => {
 
//     setLoading(false);
//     return () => {}
//   }, [userData])

  return (
  <AuthContext.Provider value={{isLoggedIn}}>
      {/* {JSON.stringify(userData)} */}
      
      
      <ReactKeycloakProvider authClient={keycloak}>{children}</ReactKeycloakProvider>
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
