import { useEffect } from 'react';
import { TotalProducts } from '../../components/TotalProducts/TotalProducts'
import { useProductsStore } from '../../store/useProductsStore'
import styles from './Products.module.css'
import { Card } from '../../components/Card/Card';
import { Filter } from '../../components/Filter/Filter';
import { useFormShowStore } from '../../store/useFormsShowStore';
import { RenameProduct } from '../../components/Forms/RenameProduct/RenameProduct';
import { Button } from '../../components/Button/Button';
// import { useAuthStore } from '../../store/useAuthStore';

export const Products = () => {
    const {products, loading,  getProducts} = useProductsStore();
    const {isShowRenameProductForm, showAddProductForm, isShowResetFilterForm} = useFormShowStore();
    // const {isAuthenticated} = useAuthStore();

    useEffect(() => {
        getProducts();
    }, []);

    return(
        <>
            {isShowRenameProductForm ? <RenameProduct /> : null}
            {!isShowResetFilterForm ? <TotalProducts/> : null}
            <div className={styles['content']}>
                <div className={styles['grid']}>
                    {/* {console.log(isAuthenticated)} */}
                    {!loading ? products.length === 0 ? 
                        <div className={styles['overlay']}>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'}}>
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', opacity: '50%'}}>
                                    <span>У Вас еще нет товаров</span>
                                    <span>Добавьте свой первый товар</span>
                                </div>
                                <Button style={{width: '100%'}} apperance='accent' onClick={showAddProductForm}>+ Добавить товар</Button>
                            </div>
                        </div> : products.map((product) => 
                        <Card key={product.id} product={product} />
                    ) : <div className={styles['overlay']}>Загрузка...</div>
                    }
                </div>
                <Filter />
            </div>
        </>
    )
}