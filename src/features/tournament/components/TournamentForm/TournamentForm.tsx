import clsx from 'clsx'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { Input } from '@/components/Elements/Form/Input'

import { Tournament } from '../../types'

import styles from './TournamentForm.module.css'

import Earth from '~icons/mdi/earth'

type TournamentFormProps = Pick<
  Tournament,
  'title' | 'liquipediaLink' | 'location' | 'prizePool' | 'startDate' | 'endDate' | 'isOnline'
> & { register: UseFormRegister<any>; setValue: UseFormSetValue<any> }
export const TournamentForm = ({
  title,
  liquipediaLink,
  location,
  prizePool,
  startDate,
  endDate,
  isOnline,
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
    <div className={clsx(styles.tournamentForm)}>
      <Input {...register('title')} defaultValue={title} label="Title" />
      <Input {...register('liquipediaLink')} defaultValue={liquipediaLink} label="Link" />
      <Input
        {...locationRegister}
        defaultValue={location}
        label="Location"
        appendIcon={<Earth className={clsx(isOnline && 'text-blue-500')} />}
        clickAppendIcon={clickOnline}
      />
      <Input
        {...register('prizePool')}
        defaultValue={prizePool}
        label="Prize Pool"
        inputType="number"
      />
      <Input
        {...register('startDate', { valueAsDate: true })}
        defaultValue={startDate}
        label="Start Date"
        inputType="date"
      />
      <Input
        {...register('endDate', { valueAsDate: true })}
        defaultValue={endDate}
        label="End Date"
        inputType="date"
      />
    </div>
  )
}
