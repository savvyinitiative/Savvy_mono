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

const signUpFormTemplate: ITemplate = {
  title: 'Login with Email',
  fields: [
    {
      label: 'Name',
      type: 'group',
      name: 'nameGroup',
      content: [
        {
          label: 'First Name',
          type: 'text',
          name: 'firstName',
          validationProps: {
            required: 'First Name is required',
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: 'Only letters are allowed'
            },
            minLength: {
              value: 2,
              message: 'Must be at least 2 characters long'
            }
          }
        },
        {
          label: 'Last Name',
          type: 'text',
          name: 'lastName',
          validationProps: {
            required: 'Last Name is required'
          }
        }
      ]
    },
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
    },
    {
      label: 'Verify Password',
      type: 'password',
      name: 'verify_password',
      validationProps: {
        required: 'Password verification is required',
        validate: (value: any, fields: any) =>
          value === fields?.password || 'Passwords do not match'
      }
    }
  ]
}

interface IProps {
  onSignUpWithEmail: (payload: any) => void
  toggleSignUpForm: () => void
  loginError: string
  isLoading: boolean
}

const SignupComponent = ({
  onSignUpWithEmail,
  toggleSignUpForm,
  loginError,
  isLoading
}: IProps) => {
  //   const [isLogginIn, setIsLogginIn] = useState(false)

  return (
    <div
      className={`${
        isLoading ? 'bg-accent/60 animate-pulse' : 'bg-accent'
      } p-2 flex flex-col w-full rounded-lg shadow-md`}
    >
      <p className='text-lg my-2 font-bold text-center'>Signup with Email</p>
      <ReusableForm
        template={signUpFormTemplate}
        watchFields={['firstName', 'email']}
        validate={() => {}}
        onFormSubmit={onSignUpWithEmail}
        submitLabel={'SignUp'}
      >
        {loginError && (
          <p className='text-error pb-2 text-xs' role='alert'>
            {loginError}
          </p>
        )}
        <div className='w-full'>
          <Actionbutton
            disable={isLoading}
            label='Sign Up'
            style='Secondary'
            type='submit'
          />
        </div>
      </ReusableForm>
      <div className='flex flex-col'>
        <span className='cursor-pointer underline' onClick={toggleSignUpForm}>
          Login Instead?
        </span>
        {/* <span onClick={toggleSignUpForm} className='cursor-pointer underline'>
          Forgot Password?
        </span> */}
      </div>
    </div>
  )
}

export default SignupComponent
