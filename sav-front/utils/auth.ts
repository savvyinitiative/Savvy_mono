import type { NextRequest, NextResponse } from 'next/server'

import { SignJWT, jwtVerify } from 'jose'

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

interface UserJwtPayload {
  jti: string
  iat: number
}

export class AuthError extends Error {}

/**
 * Verifies the user's JWT token and returns its payload if it's valid.
 */
export async function verifyAuth (request: NextRequest) {
  try {
   
    const refreshToken =
      request.cookies.get('directus_refresh_token')?.value || ''

    const existingAccessToken = request.cookies.get('access_token')?.value || ''
    const existingRefreshAccessToken = request.cookies.get('be_refresh')?.value || ''

  

    if (!existingAccessToken && ! existingRefreshAccessToken) {
      const responseFromRefresh = await directus.request(
        withOptions(refresh('json', refreshToken), {
          credentials: 'include'
        })
      )
    
      const accessToken = responseFromRefresh?.access_token || ''
      const newRefreshToken = responseFromRefresh?.refresh_token || ''

      if (!accessToken) throw new AuthError('Missing user token')


      return {accessToken, newRefreshToken}
    }

    return  {accessToken : existingAccessToken, newRefreshToken : existingRefreshAccessToken} 
  } catch (err) {
   
    throw new AuthError('Your token has expired.')
  }
}

/**
 * Adds the user token cookie to a response.
 */
export async function setUserCookie (response: NextResponse) {
  response.cookies.set({
    name: 'access_token',
    value: 'accessToken',
    httpOnly: true,
    path: '/'
  })

  return response
}

/**
 * Expires the user token cookie
 */
export function expireUserCookie (res: NextResponse) {
  res.cookies.set('access_token', '', { httpOnly: true, maxAge: 0 })
  res.cookies.set('be_refresh', '', { httpOnly: true, maxAge: 0 })
  res.cookies.set('directus_refresh_token', '', { httpOnly: true, maxAge: 0 })
  return res
}

