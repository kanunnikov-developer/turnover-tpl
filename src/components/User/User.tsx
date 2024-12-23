import { NavLink } from 'react-router-dom'
import styles from './User.module.css'
import { useAuthStore } from '../../store/useAuthStore'

export const User = () => {
    const {logout} = useAuthStore()

    return(
        <div className={styles['user']}>
            <div className={styles['user-one']}>
                <img src="/avatar-icon.svg" alt="Аватар" />
                <div className={styles['user-info']}>
                    <h2 className={styles['name']}>{localStorage.getItem('name')}</h2>
                    <span className={styles['number']}>{localStorage.getItem('email')}</span>
                </div>
            </div>
            <NavLink to={'/auth'} onClick={logout}><img src="/exit-icon.svg" alt="Выйти"/></NavLink>
        </div>
    )
}