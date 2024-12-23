import { Form, NavLink } from 'react-router-dom'
import styles from './Register.module.css'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'
import { FormEvent, useEffect } from 'react'
import { useAuthStore } from '../../store/useAuthStore'

export const Register = () => {

    const {register, resetMessage, setErrorMessage} = useAuthStore()

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if(password.length < 8){
            setErrorMessage('Пароль слишком короткий');
            setTimeout(resetMessage, 1000)
            return null;
        } 

        if(!email.includes('@') || !email.includes('.'))  {
            setErrorMessage('Введен некорректный Email');
        } else {
            register(name, email, password);
        }
    }

    useEffect(() => {
        resetMessage()
    }, [])

    return(
        <div className={styles['content']}>
            <span className={styles['title']}>Регистрация</span>
            <Form className={styles['form']} onSubmit={onSubmit}>
                <label className={styles['label']}>Ваше имя:</label>
                <Input className={styles['input']} placeholder='Имя' name='name' maxLength={15} required/>
                <label className={styles['label']}>Ваш Email:</label>
                <Input className={styles['input']} placeholder='Email' name='email' required/>
                <label className={styles['label']}>Придумайте пароль:</label>
                <Input className={styles['input']} type='password' placeholder='Пароль' name='password' required/>
                <Button apperance='accent' className={styles['button']}>Зарегестрироваться</Button>
            </Form>
            <div className={styles['info']}>
                <span>Есть аккаунт?</span>
                <NavLink className={styles['link']} to={'/auth'}>Войти</NavLink>
            </div>
        </div>
    )
}