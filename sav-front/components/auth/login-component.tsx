'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useSupabase } from '@/contexts/supabase-provider'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Actionbutton from '@/components/primitives/action-button'

import ReusableForm from '@/components/forms/reusable-form'
import { ITemplate } from '@/components/forms/reusable-form'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

const loginFormTemplate: ITemplate = {
  title: 'Login with Email',
  fields: [
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      validationProps: {
        required: 'Email is required'
      }
    },
    {
      label: 'Password',
      type: 'password',
      name: 'password',
      validationProps: {
        required: 'Password is required'
      }
    }
  ]
}

interface IProps {
  onSigninInWithEmail: (payload: string) => void
  toggleSignUpForm: () => void
  loginError: string
  isLoading: boolean
}

const LoginComponent = ({
  onSigninInWithEmail,
  toggleSignUpForm,
  loginError,
  isLoading
}: IProps) => {
  //   const [loginError, setLoginError] = useState('')
  //   const [isLogginIn, setIsLogginIn] = useState(false)

  return (
    <div
      className={`${
        isLoading ? 'bg-accent/60 animate-pulse' : 'bg-accent'
      } p-2 flex flex-col w-full rounded-lg shadow-md`}
    >
      <p className='text-lg my-2 font-bold text-center'>Login in with Email</p>
      <ReusableForm
        template={loginFormTemplate}
        watchFields={['firstName', 'email']}
        validate={() => {}}
        onFormSubmit={onSigninInWithEmail}
        submitLabel={'Login'}
      >
        {loginError && (
          <p className='text-error pb-2 text-xs' role='alert'>
            {loginError}
          </p>
        )}
        <div className='w-full'>
          <Actionbutton
            disable={isLoading}
            label='Login'
            style='Secondary'
            type='submit'
          />
        </div>
      </ReusableForm>
      <div className='flex flex-col'>
        <span className='cursor-pointer underline' onClick={toggleSignUpForm}>
          Sign Up Instead?
        </span>
        <span onClick={toggleSignUpForm} className='cursor-pointer underline'>
          Forgot Password?
        </span>
      </div>
    </div>
  )
}

export default LoginComponent
