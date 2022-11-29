import { useController, Control } from 'react-hook-form'
import Select, { Options } from 'react-select'
type MultiSelectProps = {
  name: string
  control: Control<any, any>
  placeholder?: string
  label?: string
  options: any[]
  items?: any[]
  required?: boolean
  getOptionLabel?: (option: any) => string
  getOptionValue?: (option: any) => string
  isOptionSelected?: (option: any, selectValue: Options<any[]>) => boolean
}
export const MultiSelect = ({
  items,
  options,
  placeholder,
  getOptionLabel,
  getOptionValue,
  isOptionSelected,
  name,
  control,
  label,
  required,
}: MultiSelectProps) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    defaultValue: items,
    rules: { required },
  })

  return (
    <>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          {label}
        </label>
      )}
      <Select
        ref={ref}
        {...inputProps}
        placeholder={placeholder}
        options={options}
        isMulti
        isClearable={false}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        isOptionSelected={isOptionSelected}
        styles={{
          control: baseStyles => ({
            ...baseStyles,
            backgroundColor: 'rgb(55,65,81)',
          }),
          menu: baseStyles => ({
            ...baseStyles,
            backgroundColor: 'rgb(55,65,81)',
            color: 'white',
          }),
          option: baseStyles => ({
            ...baseStyles,
            backgroundColor: 'rgb(55,65,81)',
            color: 'white',
            ':hover': {
              backgroundColor: '#55637a',
            },
          }),
        }}
      />
    </>
  )
}
