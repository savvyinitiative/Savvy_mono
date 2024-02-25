'use client'
import { useSupabase } from '@/contexts/supabase-provider'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import supabase from '@/utils/supabase.browser'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import { useRouter } from 'next/navigation'
import LoginComponent from './login-component'
import SignupComponent from './signup-component'

const LoginForm = () => {
  const [loginError, setLoginError] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const searchParams = useSearchParams()
  // const { supabase } = useSupabase()

  const router = useRouter()

  const redirectUrl =
    searchParams?.get('r') || `${process.env.NEXT_PUBLIC_APP_URL}`

  const signIn = async (provider: any) => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback?next=${redirectUrl}`,
        queryParams: {
          prompt: 'consent'
        }
      }
    })
  }

  const onSigninInWithEmail = async (payload: any) => {
    setLoginError('')
    setIsLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload?.email,
      password: payload.password
      // options: {
      //   redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback?next=${redirectUrl}`
      // }
    })
    if (data) {
      if (data?.session?.access_token) {
        setIsLoading(false)
        // redirect to redirect URL
        router.replace(redirectUrl)
      }
    }
    if (error) {
      console.error('login error', error)
      setLoginError('Invalid login credentials')
      setIsLoading(false)
    }
  }

  const onSignUpWithEmail = async (payload: any) => {
    setLoginError('')
    setIsLoading(true)
    const { error } = await supabase.auth.signUp({
      email: payload?.email,
      password: payload.password,
      options: {
        data: {
          first_name: payload?.firstName,
          last_name: payload?.lastName
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/login?r=${redirectUrl}`
      }
    })
    if (error) {
      console.error('login error', error)
      setLoginError('Invalid login credentials')
    } else {
      alert('Account created, check your email!')
    }
    setIsLoading(false)
  }

  const toggleSignUpForm = () => {
    setIsSignUp(!isSignUp)
  }

  // return (
  //   <Auth
  //     supabaseClient={supabase}
  //     appearance={{ theme: ThemeSupa }}
  //     theme='dark'
  //   />
  // )

  return (
    <div className='component-spacing py-10 flex flex-col space-y-6 justify-items-center w-full h-full justify-center'>
      {/* {JSON.stringify(redirectUrl)} */}
      <h1 className=''>Login</h1>

      <div className='flex flex-col'>
        <div className='flex flex-col items-centerx'>
          {/* <a href='http://localhost:8055/auth/login/google?redirect=http://localhost:4508/auth'>
            Login
          </a> */}

          <button
            className='btnz btnz-secondary w-full'
            onClick={() => signIn('google')}
          >
            <div className='flex space-x-2 w-full  items-center justify-items-centerx justify-center'>
              <span className=''>
                <img
                  className='w-8 h-8 bg-transparent'
                  src={'/logos/google-logo.png'}
                  alt='Logo'
                />
              </span>
              <span className=''>Login with Google</span>
            </div>
          </button>
          <span className='text-center py-2'>OR</span>

          {isSignUp ? (
            <SignupComponent
              onSignUpWithEmail={onSignUpWithEmail}
              toggleSignUpForm={toggleSignUpForm}
              loginError={loginError}
              isLoading={isLoading}
            />
          ) : (
            <LoginComponent
              onSigninInWithEmail={onSigninInWithEmail}
              toggleSignUpForm={toggleSignUpForm}
              loginError={loginError}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginForm
