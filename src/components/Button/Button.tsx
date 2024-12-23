import cn from 'classnames'
import styles from './Button.module.css'
import { ButtonHTMLAttributes, ReactNode } from "react";

interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    apperance?: 'accent' | 'white'
}

export const Button = ({children, apperance, className, ...props}: Button) => {
    return(
        <button className={cn({
            [styles['accent']]: apperance === 'accent',
            [styles['white']]: apperance === 'white',
    
        }, className)} {...props}>{children}</button>
    )
    
}