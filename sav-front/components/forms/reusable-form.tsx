import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import TextInput from '../primitives/text-input'
import Actionbutton from '@/components/primitives/action-button'
import SelectInput from '@/components/primitives/select-input'

interface IProps {
  template: ITemplate
  watchFields: any
  validate?: any
  onFormSubmit: any
  submitLabel?: string
  children?: React.ReactNode
}

export interface ITemplateField {
  label: string
  name: string
  type: string
  options?: any[]
  optionName?: string
  optionIdName?: string
  validationProps?: any
  dynamic?: any
  content?: ITemplateField[]
}

export interface ITemplate {
  title: string
  fields: ITemplateField[]
}

const ReusableForm: React.FC<IProps> = ({
  template,
  watchFields,
  validate,
  onFormSubmit,
  submitLabel = 'Submit',
  children
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    control
  } = useForm()
  const { title, fields } = template

  const [selectFieldValue, setSelectFieldValue] = useState(null)

  const handleOnSelectField = (
    event: any,
    options: any,
    field: any,
    optionName: string,
    optionIdName: string
  ) => {
    const val = event.target.value
    const selectedOption = options?.find((e: any) => e?.[optionIdName] === val)
    const selectedOptionValue = selectedOption?.[optionIdName]
    if (selectedOptionValue) {
      field.onChange(selectedOptionValue)
    }
  }

  const renderField = (field: ITemplateField, index: number) => {
    const {
      label,
      name,
      type,
      validationProps,
      dynamic,
      content,
      options,
      optionName,
      optionIdName
    } = field
    const watchedField = watch()
    const showField = dynamic
      ? watchedField[dynamic?.field] === dynamic?.value
      : true

    if (!showField) return null

    if (type === 'group') {
      return (
        <div className='flex flex-col md:flex-row md:space-x-2 w-full overflow-x-hidden'>
          {content?.map((field, index) => renderField(field, index))}
        </div>
      )
    }

    if (type === 'select') {
      if (!options || !optionName || !optionIdName) {
        return <>Select needs options, optionName and optionIdName</>
      }

      return (
        <div
          key={`${index}-${name}`}
          className='flex flex-col space-y-2 py-2 w-fullx'
        >
          <Controller
            name={name}
            control={control}
            rules={validationProps}
            render={({ field }) => (
              <SelectInput
                // label={
                //   field?.value
                //     ? options.find(e => e?.iso2 === field?.value)?.name
                //     : ''
                // }
                optionName={optionName}
                optionIdName={optionIdName}
                label={label}
                type={type}
                {...field}
                onChange={(e: any) =>
                  handleOnSelectField(
                    e,
                    options,
                    field,
                    optionName,
                    optionIdName
                  )
                }
                options={options}
              />
            )}
          />

          {errors?.[name] && (
            <p className='text-error' role='alert'>
              {(errors?.[name] as any)?.message || errors?.[name]}
            </p>
          )}
        </div>
      )
      return (
        <div className='flex flex-col md:flex-row md:space-x-2 w-full overflow-x-hidden '>
          <select className='block appearance-nonex border  hover:border-primary-500  pr-8  shadow leading-tight focus:outline-none focus:shadow-outline rounded-2xl  bg-white text-black px-3 outline-primary-50/40 w-full h-12'>
            {options?.map((country, cx) => {
              return (
                <option key={`key-${country?.name}-${cx}`}>
                  {country?.name} | {country?.iso2}
                </option>
              )
            })}
          </select>
        </div>
      )
    }
    // if (type === 'checkbox') {
    //   return <input type={type} {...register(name, validationProps)} />
    // }

    return (
      <div
        key={`${index}-${name}`}
        className='flex flex-col space-y-2 py-2 w-full'
      >
        <Controller
          name={name}
          control={control}
          rules={validationProps}
          render={({ field }) => (
            <TextInput label={label} type={type} {...field} />
          )}
        />
        {/* <TextInput
          label={label}
          type={type}
          {...register(name, validationProps)}
        /> */}

        {errors?.[name] && (
          <p className='text-error' role='alert'>
            {(errors?.[name] as any)?.message || errors?.[name]}
          </p>
        )}

        {/* {errors?.[name] && (
          <p className='text-error' role='alert'>
            {errors?.[name].message}
          </p>
        )} */}
      </div>
    )
  }

  const onSubmit: SubmitHandler<any> = data => onFormSubmit(data)

  useEffect(() => {
    const subscription = watch(data => {
      validate(data, { errors, setError, clearErrors })
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [watch, errors, setError, clearErrors, validate])

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => renderField(field, index))}
        {/* <input type='submit' /> */}

        <div className='py-4'>{children}</div>
      </form>
    </div>
  )
}

export default ReusableForm
