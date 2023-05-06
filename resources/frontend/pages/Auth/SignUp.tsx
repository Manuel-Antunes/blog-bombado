import { Link, router, usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { MySwal } from '../../services/swal'

interface SignUpFormData {
  name: string
  email: string
  password: string
  password_confirmation: string
  accept_terms: boolean
}

const SignUp: React.FC = () => {
  const {
    props: { errors },
  } = usePage()

  const { register, handleSubmit } = useForm<SignUpFormData>()

  const onSubmit = (data: SignUpFormData) => {
    if (data.accept_terms) {
      router.post('/users', data as any)
    }
  }

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

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-2/6 h-full bg-white flex items-center justify-center">
          <div className="w-full px-12">
            <h1 className="text-center text-5xl xl:leading-snug font-extrabold">Sign Up</h1>
            <p className="text-center mt-5 text-md md:text-xl">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 hover:underline"
                title="Sign In"
              >
                Sign in here
              </Link>
            </p>
            <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col my-4">
                <label htmlFor="name" className="text-gray-700 sr-only">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                  placeholder="Name"
                  {...register('name', { required: true })}
                />
              </div>
              <div className="flex flex-col my-4">
                <label htmlFor="email" className="sr-only text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                  placeholder="Email"
                  {...register('email', { required: true })}
                />
              </div>
              <div className="flex flex-col my-4">
                <label htmlFor="password" className="sr-only text-gray-700">
                  Password
                </label>
                <div className="relative flex items-center mt-2">
                  <input
                    type="password"
                    id="password"
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal w-full"
                    placeholder="Password"
                    {...register('password', { required: true })}
                  />
                </div>
              </div>
              <div className="flex flex-col my-4">
                <label htmlFor="password_confirmation" className="sr-only text-gray-700">
                  Password Confirmation
                </label>
                <div className="relative flex items-center mt-2">
                  <input
                    type="password"
                    id="password_confirmation"
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal w-full"
                    placeholder="Password again"
                    {...register('password_confirmation', { required: true })}
                  />
                </div>
              </div>
              <div className="flex items-center text-md font-medium md:text-lg">
                <input
                  type="checkbox"
                  id="accept_terms"
                  className="mr-2 focus:ring-0 rounded"
                  {...register('accept_terms', { required: true })}
                />
                <label htmlFor="accept_terms" className="text-gray-700">
                  I accept the{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">
                    terms
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">
                    privacy policy
                  </a>
                </label>
              </div>
              <div className="my-4 flex items-center justify-end space-x-4">
                <button className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white w-full">
                  Sign Up
                </button>
              </div>
            </form>
            <div className="flex items-center justify-between">
              <div className="w-full h-[1px] bg-gray-300" />
              <span className="text-sm uppercase mx-6 text-gray-400">Or</span>
              <div className="w-full h-[1px] bg-gray-300" />
            </div>
            <div className="flex flex-col w-full mt-5 space-y-5">
              <button className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black relative">
                <span className="absolute left-4">
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <path
                      fill="#EA4335 "
                      d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                    />
                    <path
                      fill="#34A853"
                      d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                    />
                    <path
                      fill="#4A90E2"
                      d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                    />
                  </svg>
                </span>
                <span>Sign in with Google</span>
              </button>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:w-1/2 xl:w-4/6 text-black h-full ">
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#ffe85c]">
            <div className="flex items-center justify-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 xl:h-20 xl:w-20 2xl:h-24 2xl:w-24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                />
              </svg>
              <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-extrabold tracking-wider">
                Blog Bombado
              </h1>
            </div>
            <p className="mt-4 px-16 text-center font-bold text-lg">
              Free admin dashboard template created with Tailwind CSS and Alpine.js
            </p>
            <button className="mt-10 max-w-sm w-full inline-block flex-none px-4 py-3 border-2 rounded-lg font-medium border-black bg-black text-white">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
