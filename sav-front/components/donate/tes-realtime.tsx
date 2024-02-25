'use client'
import React, { useEffect, useState } from 'react'
import supabase from '@/utils/supabase'
import { useSupabase } from '@/contexts/supabase-provider'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

interface IProps {
  data: any
}

const TestRealtime = ({ data }: IProps) => {
  const [donations, setDonations] = useState(data)
  const { supabase } = useSupabase()
  useEffect(() => {
    const channel = supabase
      .channel('realtime donations')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'donations'
        },
        payload => {
          setDonations([...donations, payload?.new])
        }
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, donations, setDonations])

  const signIn = async () => {
    const provider: any = 'google'
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`
      }
    })
  }

  const signUp = () => {
    supabase.auth.signUp({
      email: '',
      password: ''
    })
  }

  return (
    <div>
      <pre>{JSON.stringify(donations, null, 2)}</pre>
      TestRealtime
    </div>
  )
}

export default TestRealtime
