import { ErrorBag, Errors, PageProps } from '@inertiajs/core'
import { User } from '../../components/post/PostCard'

export interface PageGlobalProps extends PageProps {
  auth: {
    user: User
    authenticated: boolean
  }
  success: Record<string, string>
  errors?: Errors & ErrorBag
}
