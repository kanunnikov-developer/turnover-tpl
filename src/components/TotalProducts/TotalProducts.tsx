import { useProductsStore } from "../../store/useProductsStore"
import { CardFilter } from "../CardFilter/CardFilter"
import styles from './TotalProducts.module.css'


export const TotalProducts = () => {
    const {products} = useProductsStore();

        
    return(
        <div className={styles['card-filter-row']}>
            <CardFilter productLenght={products.length} info={'Истекут завтра'}/>
            <CardFilter productLenght={products.length} info={'Требуют внимания'}/>
            <CardFilter productLenght={products.length} info={'Можно реализовать'}/>
        </div>
    )
}