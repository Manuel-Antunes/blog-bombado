import { usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'
import { PageGlobalProps } from '../@types/page'
import { MySwal } from '../services/swal'

const Flash: React.FC = () => {
  const {
    props: { errors, success },
  } = usePage<PageGlobalProps>()

  useEffect(() => {
    if (errors) {
      Object.keys(errors).forEach((key) => {
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errors[key][0],
        })
      })
    }
  }, [errors])

  useEffect(() => {
    if (success) {
      Object.keys(success).forEach((key) => {
        MySwal.fire({
          title: 'Sucesso!',
          text: success[key][0],
          icon: 'success',
          confirmButtonText: 'OK',
        })
      })
    }
  }, [success])

  return <></>
}

export default Flash
