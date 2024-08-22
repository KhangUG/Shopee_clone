import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { getRules } from 'src/utils/rules'
import Input from 'src/components/Input'
import { registerAccount } from 'src/api/auth.api'
import { omit } from 'lodash'

interface FormData {
  email: string
  password: string
  confirm_password: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    getValues,
    formState: { errors }
  } = useForm<FormData>()

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })
  const rules = getRules(getValues)

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        console.log('error')
      }
    })
  })

  // const email = watch('email')

  console.log(errors)
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12  lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Ký</div>
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

              <Input
                name='confirm_password'
                register={register}
                type='password'
                className='mt-2'
                errorMessage={
                  typeof errors.confirm_password?.message === 'string' ? errors.confirm_password.message : undefined
                }
                placeholder='Confirm Password'
                rules={rules.confirm_password}
                autoComplete='on'
              />
              <div className='mt-2'>
                <button
                  type='submit'
                  className='mt3  w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                >
                  Đăng Ký
                </button>
              </div>

              <div className='flex item-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='text-red-400 ml-1' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
