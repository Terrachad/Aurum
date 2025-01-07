import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, FieldPath, FieldValues } from 'react-hook-form'

interface CustomInputProps<T extends FieldValues> {
    control: Control<T>
    name: FieldPath<T>
    label: string
    placeholder: string
}

function CustomInput<T extends FieldValues>({
    control,
    name,
    label,
    placeholder
}: CustomInputProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field: { value, ...fieldProps } }) => (
                <div className='form-item'>
                    <FormLabel className='form-label'>{label}</FormLabel>
                    <div className='flex w-full flex-col'>
                        <FormControl>
                            <Input
                                {...fieldProps}
                                value={value || ""}  // Ensure value is never undefined
                                placeholder={placeholder}
                                className='input-class'
                                type={
                                    name === 'password'
                                        ? 'password'
                                        : name === 'dateOfBirth'
                                        ? 'date'
                                        : 'text'
                                }
                            />
                        </FormControl>
                        <FormMessage className='form-message mt-2' />
                    </div>
                </div>
            )}
        />
    )
}

export default CustomInput