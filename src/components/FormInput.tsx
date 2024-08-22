import React from "react";

interface FormInputProps extends React.HTMLAttributes<HTMLInputElement> {
    name: string,
    label: string,
    placeholder?: string
    type?: 'text' | string
}

export const FormInput: React.FC<FormInputProps> = ({name, label, placeholder, type,...rest}) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <label className="texd-start w-full" htmlFor={name}>{label}</label>
            <input className="border rounded focus:outline-none w-full p-2" type={type} placeholder={placeholder} name={name} id={name} {...rest}></input>
        </div>
    )
}