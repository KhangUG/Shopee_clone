import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { getRules } from 'src/utils/rules'
import Input from 'src/components/Input'
import { login, registerAccount } from 'src/api/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from '../../utils/utils'
import { ResponseApi } from 'src/types/utils.type'

interface FormData {
  email: string
  password: string
  confirm_password: string
}

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    getValues,
    formState: { errors }
  } = useForm<FormData>()

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => login(body)
  })
  const rules = getRules(getValues)

  const onSubmit = handleSubmit((data) => {
    registerAccountMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12  lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Nhập</div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={typeof errors.email?.message === 'string' ? errors.email.message : undefined}
                placeholder='Email'
                rules={rules.email}
              />
              <Input
                name='password'
                register={register}
                type='password'
                className='mt-2'
                errorMessage={typeof errors.password?.message === 'string' ? errors.password.message : undefined}
                placeholder='Password'
                rules={rules.password}
                autoComplete='on'
              />

              <div className='mt-3'>
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm'></div>
                <button
                  type='submit'
                  className='mt3 w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                >
                  Đăng Nhập
                </button>
              </div>

              <div className='flex item-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='text-red-400 ml-1' to='/register'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
