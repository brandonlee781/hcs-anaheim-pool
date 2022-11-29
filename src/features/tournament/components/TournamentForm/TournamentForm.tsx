import clsx from 'clsx'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { Input } from '@/components/Elements/Form/Input'

import { Tournament } from '../../types'

import Earth from '~icons/mdi/earth'

type TournamentFormProps = Pick<
  Tournament,
  | 'title'
  | 'liquipediaLink'
  | 'location'
  | 'prizePool'
  | 'startDate'
  | 'endDate'
  | 'isOnline'
  | 'timezone'
> & { register: UseFormRegister<any>; setValue: UseFormSetValue<any> }
export const TournamentForm = ({
  title,
  liquipediaLink,
  location,
  prizePool,
  startDate,
  endDate,
  isOnline,
  timezone,
  register,
  setValue,
}: TournamentFormProps) => {
  const locationRegister = register('location')
  register('isOnline')

  const clickOnline = () => {
    if (isOnline) {
      setValue('isOnline', false, { shouldDirty: true })
      setValue('location', '')
    } else {
      setValue('isOnline', true, { shouldDirty: true })
      setValue('location', 'Online')
    }
  }

  return (
    <div className={clsx('grid grid-cols-1 grid-auto-rows md:grid-cols-12 md:grid-rows-2 gap-2')}>
      <Input
        {...register('title')}
        defaultValue={title}
        label="Title"
        wrapperClassName="col-span-4"
      />
      <Input
        {...register('timezone')}
        defaultValue={timezone}
        label="Timezone"
        wrapperClassName="col-span-4"
      />
      <Input
        {...register('liquipediaLink')}
        defaultValue={liquipediaLink}
        label="Link"
        wrapperClassName="col-span-4"
      />
      <Input
        {...locationRegister}
        defaultValue={location}
        label="Location"
        appendIcon={<Earth className={clsx(isOnline && 'text-blue-500')} />}
        clickAppendIcon={clickOnline}
        wrapperClassName="col-span-3"
      />
      <Input
        {...register('prizePool')}
        defaultValue={prizePool}
        label="Prize Pool"
        inputType="number"
        wrapperClassName="col-span-3"
      />
      <Input
        {...register('startDate', { valueAsDate: true })}
        defaultValue={startDate}
        label="Start Date"
        inputType="date"
        wrapperClassName="col-span-3"
      />
      <Input
        {...register('endDate', { valueAsDate: true })}
        defaultValue={endDate}
        label="End Date"
        inputType="date"
        wrapperClassName="col-span-3"
      />
    </div>
  )
}
