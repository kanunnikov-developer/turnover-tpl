import { InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

interface Input extends InputHTMLAttributes<HTMLInputElement>{
    placeholder?: string,
    name?: string,
    type?: string
}

export const Input = ({placeholder, type = 'text', name, ...props} :Input) => {
    return(
        <input className={styles['input']} type={type} name={name} placeholder={placeholder} {...props}/>
    )
}