import { useFormShowStore } from '../../store/useFormsShowStore'
import { Button } from '../Button/Button'
import { AddProduct } from '../Forms/AddProduct/AddProduct'
import styles from './Header.module.css'

export const Header = () => {
    const {isShowAddProductForm, showAddProductForm} = useFormShowStore()

    return(
        <div className={styles['header']}>
            {isShowAddProductForm ? <AddProduct />: null}
            <div className={styles['logo']}>
                <div className={styles['logo-title']}>
                    <img src="/logo-icon.svg" alt="Логотип" />
                    <h1>Turnover tpl</h1>
                </div>
                <span className={styles['version']}>v 2.0 / 01.12.2024</span>
            </div>
            <Button apperance='white' className={styles['button']} onClick={showAddProductForm}>+ Добавить товар</Button>
        </div>
    )
}