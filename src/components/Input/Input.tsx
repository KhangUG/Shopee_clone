import React from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'
interface Props {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  placeholder?: string
  className?: string
  name: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
  autoComplete?: string
}
export default function Innput({
  type,
  errorMessage,
  placeholder,
  className,
  autoComplete,
  name,
  register,
  rules
}: Props) {
  return (
    <div>
      <div className={className}>
        <input
          type={type}
          className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
          placeholder={placeholder}
          {...register(name, rules)}
        />
        <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'> {errorMessage}</div>
      </div>
    </div>
  )
}
