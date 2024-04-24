import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../utils/supabase.ts'
import React from 'react'

const SignIn: React.FC = () => {
  return (
    <div className="ion-padding">
      <Auth
        supabaseClient={supabase}
        providers={['google']}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: 'var(--ion-color-primary)',
                brandAccent: 'var(--ion-color-primary-shade)'
              }
            }
          },
          style: {
            input: { color: 'red' }
          }
        }}
      />
    </div>
  )
}

export default SignIn
