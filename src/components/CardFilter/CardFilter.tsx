import { calcProductInfo } from '../../helpers/calculateProduct'
import styles from './CardFilter.module.css'

interface CardFilter {
    productLenght: number,
    info: string
}

export const CardFilter = ({ productLenght, info }: CardFilter) => {
    return(
        <div className={styles['filter-card']}>
            <div className={styles['content']}>
                <div className={styles['count']}>{productLenght}</div>
                <div className={styles['info']}>
                    <span className={styles['title']}>{calcProductInfo(productLenght)}</span>
                    <span>{info}</span>
                </div>
            </div>
        </div>
    )
}