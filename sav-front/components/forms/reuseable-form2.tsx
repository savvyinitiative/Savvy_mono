'use client'
import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface IProps {
  template: ITemplate
  watchFields: any
  validate?: any
}
export interface ITemplateField {
  label: string
  name: string
  type: string
  validationProps?: any
  dynamic?: any
}
export interface ITemplate {
  title: string
  fields: ITemplateField[]
}

const ReusableForm = ({ template, watchFields, validate }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors
  } = useForm()
  const { title, fields } = template

  const renderFields = (fields: ITemplateField[]) => {
    return fields?.map((field, fx: number) => {
      let { label, name, type, validationProps, dynamic } = field
      let watchedField = watch()
      let showField = dynamic
        ? watchedField[dynamic?.field] === dynamic?.value
        : true
      if (!showField) return
      switch (type) {
        case 'text':
          return (
            <div key={`key-${fx}-${name}`}>
              <label>{label}</label>
              <input type={type} {...register(name, field?.validationProps)} />
              {errors?.[name] && (
                <p className='text-error' role='alert'>
                  {(errors?.[name] as any)?.message || errors?.[name]}
                </p>
              )}
            </div>
          )
          break
        case 'email':
          return (
            <div key={`key-${fx}-${name}`}>
              <label>{label}</label>
              <input type={type} {...register(name)} />
            </div>
          )
          break
        case 'checkbox':
          return (
            <div key={`key-${fx}-${name}`}>
              <label>{label}</label>
              <input type={type} {...register(name, field?.validationProps)} />
              {errors?.[name] && (
                <p className='text-error' role='alert'>
                  {(errors?.[name] as any)?.message || errors?.[name]}
                </p>
              )}
            </div>
          )

        case 'url':
          return (
            <div key={`key-${fx}-${name}`}>
              <label>{label}</label>
              <input type={type} {...register(name, field?.validationProps)} />
              {errors?.[name] && (
                <p className='text-error' role='alert'>
                  {(errors?.[name] as any)?.message || errors?.[name]}
                </p>
              )}
            </div>
          )

        default:
          return (
            <div className=' text-error' key={`key-${fx}-${name}`}>
              Invalid field
            </div>
          )
          break
      }
    })
  }

  const onSubmit: SubmitHandler<any> = data => console.log(data)

  useEffect(() => {
    const subscription = watch(data => {
      validate(data, { errors, setError, clearErrors })
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [watch])

  return (
    <div>
      reuseable-form
      {JSON.stringify(fields)}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4 className=''>{title}</h4>
        {renderFields(fields)}

        <input type='submit' />
      </form>
    </div>
  )
}

export default ReusableForm
