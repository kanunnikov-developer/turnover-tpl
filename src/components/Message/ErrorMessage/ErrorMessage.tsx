import { useAuthStore } from '../../../store/useAuthStore'
import styles from './ErrorMessage.module.css'

export const ErrorMessage = () => {
    const {errorMessage} = useAuthStore()

    return(
        <div className={styles['message']}>
            <h1 className={styles['title']}>Ошибка!</h1>
            <span className={styles['text']}>{errorMessage}</span>
        </div>
    )
}