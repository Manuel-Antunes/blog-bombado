import { usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'
import { PageGlobalProps } from '../@types/page'
import { toast } from '../services/toast'

const Flash: React.FC = () => {
  const {
    props: { errors, success, infos },
  } = usePage<PageGlobalProps>()

  useEffect(() => {
    if (errors) {
      Object.keys(errors).forEach((key) => {
        toast.error(errors[key][0])
      })
    }
  }, [errors])

  useEffect(() => {
    if (success) {
      Object.keys(success).forEach((key) => {
        toast.success(success[key][0])
      })
    }
  }, [success])

  useEffect(() => {
    if (infos) {
      Object.keys(infos).forEach((key) => {
        toast.info(infos[key][0])
      })
    }
  }, [infos])

  return <></>
}

export default Flash
