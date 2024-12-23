import { showExpirensIn } from '../../helpers/calculateDateDelete'
import { useFormShowStore } from '../../store/useFormsShowStore'
import { ProductType, useProductsStore } from '../../store/useProductsStore'
import { Button } from '../Button/Button'
import styles from './Card.module.css'

type Card = {
    product: ProductType
}

export const Card = ({product}: Card) => {
    const {deleteProduct, copuProduct} = useProductsStore()
    const {setSelectedProduct, showRenameProductForm} = useFormShowStore();

    const renameProduct = () => {
        setSelectedProduct(product);
        showRenameProductForm(); 
    };

    const copies = (product: ProductType) => {
        copuProduct(product.id);
    }

    return(
        <div className={styles['card']}>
            <div className={styles['title_row']}>
                <div style={{display: 'flex', gap: '5px'}}>
                    <h3 className={styles['title']}>{product.title}</h3>
                </div>
                <button title='Копировать' onClick={() => copies(product)}><img className={styles['copy-img']} src="/copu-icon.svg" alt="Копировать" /></button>
            </div>
            <span>{product.description}</span>
            <span>Арт: <span className={styles['article']}>{product.article}</span></span>
            <div className={styles['price-date']}>
                <span className={styles['price']}>{product.price} руб</span>
                <div className={styles['date']}>
                    <span>Истекает через:</span>
                    <span className={styles['expirationDate']}>{showExpirensIn(product.expirationDate)}</span>
                </div>
            </div>
            <div className={styles['button']}>
                <Button onClick={renameProduct} apperance='accent'>Изменить</Button>
                <Button onClick={() => deleteProduct(product.id)} apperance='white'>Удалить</Button>
            </div>
        </div>
    )
}