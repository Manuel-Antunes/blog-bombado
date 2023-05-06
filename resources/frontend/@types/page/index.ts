import { PageProps } from '@inertiajs/core'

export interface User {
  id: number
  name: string
  email: string
  password?: string
  remember_me_token: string
  created_at: string
  updated_at: string
}

export interface PageGlobalProps extends PageProps {
  auth: {
    user: User
  }
  success: Record<string, string>
}
