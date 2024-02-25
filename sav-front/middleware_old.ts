import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
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
import { verifyAuth, setUserCookie, expireUserCookie } from './utils/auth'

import { SignJWT, jwtVerify } from 'jose'

// This function can be marked `async` if using `await` inside
export async function middleware (request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/login' || path === '/'
  const access_token = request.cookies.get('access_token')?.value || ''

  // if it is not a public path, protect
  if (!isPublicPath && !access_token) {
    const verifiedToken = await verifyAuth(request).catch(err => {
      console.error(err.message)
    })

    if (verifiedToken) {
        const {accessToken, newRefreshToken} = verifiedToken;
      let authResponse = NextResponse.next()
    //   authResponse = NextResponse.redirect(
    //     new URL(`/login?r=${request.url}`, request.url)
    //   )

    
    authResponse.cookies.set({
        name: 'be_refresh',
        value: newRefreshToken || '',
        httpOnly: true,
        path: '/'
      });

      authResponse.cookies.set({
        name: 'access_token',
        value: accessToken || '',
        httpOnly: true,
        path: '/'
      })
      return authResponse

      return NextResponse.redirect(
        new URL(`/login?r=${request.url}`, request.url)
      )
    }
    return NextResponse.redirect(
      new URL(`/login?r=${request.url}`, request.url)
    )
  }

  //   if not public route and token exists there's a token, verify it
  if (!isPublicPath) {
    // validate the user is authenticated
    const verifiedToken = await verifyAuth(request).catch(err => {
      console.error(err.message)
    })
    if (!verifiedToken) {
      return NextResponse.redirect(
        new URL(`/login?r=${request.url}`, request.url)
      )
    }
  }

  //   return NextResponse.redirect(new URL('/homepage', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  //   matcher: '/about/:path*',
  matcher: ['/login', '/profile']
}
