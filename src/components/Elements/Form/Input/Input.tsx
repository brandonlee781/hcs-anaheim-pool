import clsx from 'clsx'
import { uniqueId } from 'lodash'
import { UseFormRegister } from 'react-hook-form'

type InputProps = React.ButtonHTMLAttributes<HTMLInputElement> &
  Partial<ReturnType<UseFormRegister<any>>> & {
    id?: string
    label?: string
    value?: string
    inputType?: 'text' | 'password' | 'number' | 'date' | 'time' | 'datetime-local'
    wrapperClassName?: string
    appendIcon?: React.ReactNode
    clickAppendIcon?: () => void
  }

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      value,
      name,
      placeholder,
      inputType = 'text',
      onChange,
      onBlur,
      className,
      wrapperClassName,
      appendIcon,
      clickAppendIcon,
    },
    ref
  ) => {
    const inputId = id ?? uniqueId()
    return (
      <div className={clsx('w-full', wrapperClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            value={value}
            id={inputId}
            className={clsx(
              'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
              className
            )}
            placeholder={placeholder}
            {...{ onChange, onBlur, name }}
          />
          {appendIcon && (
            <button
              type="button"
              className={clsx(
                'append-icon absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8',
                'cursor-pointer hover:bg-gray-400 hover:!text-black/70 rounded-full flex items-center justify-center'
              )}
              onClick={clickAppendIcon}
              onKeyDown={clickAppendIcon}
            >
              {appendIcon}
            </button>
          )}
        </div>
      </div>
    )
  }
)
