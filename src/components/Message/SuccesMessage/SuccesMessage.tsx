import { useAuthStore } from '../../../store/useAuthStore'
import styles from './SuccesMessage.module.css'

export const SuccesMessage = () => {
    const {succesMessage} = useAuthStore()

    return(
        <div className={styles['message']}>
            <h1 className={styles['title']}>Успех!</h1>
            <span className={styles['text']}>{succesMessage}</span>
        </div>
    )
}