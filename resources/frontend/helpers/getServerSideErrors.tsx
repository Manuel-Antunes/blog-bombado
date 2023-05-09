import { ErrorBag, Errors } from '@inertiajs/core'
export function getServerSideErrors(errors: Errors & ErrorBag = {}) {
  const err = Object.entries(errors).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: {
        message: value,
      },
    }
  }, {})
  return err
}
