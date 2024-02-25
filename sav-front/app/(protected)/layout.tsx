import AuthStatus from '@/components/experiment/auth-status'
import SessionProviderWrapper from '@/components/experiment/session-provider-wrapper'
import GlobalNav from '@/components/nav/global-nav'

export default async function ProtectedLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <SessionProviderWrapper>
        <div className=''>
          <div className='h-20'>
            <GlobalNav user={{ name: '' }} />
          </div>
          <AuthStatus />
          <div className=''> {children}</div>
        </div>
      </SessionProviderWrapper>
    </div>
  )
}
