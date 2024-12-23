import { Outlet } from 'react-router-dom'
import styles from './Auth.module.css'
import { useAuthStore } from '../../store/useAuthStore'
import { SuccesMessage } from '../../components/Message/SuccesMessage/SuccesMessage'
import { ErrorMessage } from '../../components/Message/ErrorMessage/ErrorMessage'

export const Auth = () => {
    const {succesMessage, errorMessage} = useAuthStore();
    return(
        <div className={styles['content']}>
            {succesMessage ? <SuccesMessage/> : null}
            {errorMessage ? <ErrorMessage/> : null}
            <div className={styles['auth']}>
                <div className={styles['logo']}>
                    <img className={styles['icon']} src="/logo-icon.svg" alt="Логотип" />
                    <h1>Turnover tpl</h1>
                </div>
            </div>
            <div className={styles['outlet']}>
                <Outlet />
            </div>
        </div>
    )
}