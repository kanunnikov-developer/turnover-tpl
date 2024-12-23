import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header/Header'
import { User } from '../../components/User/User'
import styles from './Main.module.css'

export const Main = () => {

    return (
        <div className={styles['content']}>
            <div className={styles['header-row']}>
                <Header />
                <User />
            </div>
            <div className={styles['outlet']}>
                <Outlet />
            </div>
        </div>
    )
}