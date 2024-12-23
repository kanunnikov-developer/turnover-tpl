import { Form, NavLink, useNavigate } from 'react-router-dom'
import styles from './Login.module.css'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'
import { FormEvent, useEffect } from 'react'
import { useAuthStore } from '../../store/useAuthStore'

export const Login = () => {
    const {login, resetMessage, isAuthenticated} = useAuthStore();
    const navigate = useNavigate()

    const auth = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        
        login(email, password);
    }

    useEffect(() => {
        resetMessage()
    }, [])

    useEffect(() => {
        if(isAuthenticated){
            navigate('/')
        }
    },[isAuthenticated])

    return(
        <div className={styles['content']}>
            <span className={styles['title']}>Вход</span>
            <Form className={styles['form']} onSubmit={auth}>
                <Input className={styles['input']} placeholder='Email' name='email' required/>
                <Input className={styles['input']} type='password' placeholder='Пароль' name='password' required/>
                <Button apperance='accent' className={styles['button']}>Войти</Button>
            </Form>
            <div className={styles['info']}>
                <span>Нет аккаунта?</span>
                <NavLink className={styles['link']} to={'/auth/register'}>Зарегестироваться</NavLink>
            </div>
        </div>
    )
}