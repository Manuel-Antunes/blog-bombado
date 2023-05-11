import { ErrorBag, Errors, PageProps } from '@inertiajs/core'
import { User } from '../../components/post/PostCard'

export interface Notification {
  data: any
  id: number
  created_at: string
  read_at: string
  updated_at: string
  notifiable_id: number
}

export interface PageGlobalProps extends PageProps {
  auth: {
    user: User
    authenticated: boolean
    notifications: Notification[]
  }
  success: Record<string, string>
  errors?: Errors & ErrorBag
  infos: Record<string, string>
}
