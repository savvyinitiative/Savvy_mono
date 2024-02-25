import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const UnProtectedRoutes = ['/', '/login']

export async function middleware (request: NextRequest) {
  const path = request.nextUrl.pathname

  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  })

  if (path?.startsWith('/sira')) {
    const splitPath = path.split('/')
    console.log('cumon', splitPath.length, splitPath)
    if (splitPath.length < 5) {
      return response
    }
  }

  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/login'
  const isPublicPath =
    UnProtectedRoutes?.includes(path) || path.startsWith('/_next')

  //   Supabase stuff, create server client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get (name: string) {
          return request.cookies.get(name)?.value
        },
        set (name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options
          })
          response = NextResponse.next({
            request: {
              headers: request.headers
            }
          })
        },
        remove (name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options
          })
          response = NextResponse.next({
            request: {
              headers: request.headers
            }
          })
        }
      }
    }
  )

  const session = await supabase.auth.getSession()

  //   if no session and not a public path. redirect to login and include the url to redirect to after login
  if (!isPublicPath && !session?.data?.session) {
    return NextResponse.redirect(`${origin}/login?r=${request.url}`)
  }

  return response
}

//  config of path list to match
export const config = {
  matcher: [
    '/login', 
    '/profile', 
    // '/sira/:category/:award/:nominee*'
  ]
}
