import { Form } from 'react-router-dom'
import { Input } from '../Input/Input'
import styles from './Filter.module.css'
import { Button } from '../Button/Button'
import { FormEvent} from 'react'
import { useProductsStore } from '../../store/useProductsStore'
import { useFormShowStore } from '../../store/useFormsShowStore'

export const Filter = () => {

    const {filterProduct, getProducts} = useProductsStore();
    const {isShowResetFilterForm, showResetFilterForm} = useFormShowStore();

    const resetFilter = () => {
        getProducts();
        showResetFilterForm();
    };

    const handleForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);
        const title = formData.get('title') as string;
        const article = formData.get('article') as string;
        if(title !== '' || article !== '') {
            showResetFilterForm();
            filterProduct(title, article);
            event.currentTarget.reset();
        }
        
    };

    return(
        <div className={styles['form-container']}>
        <Form className={styles['form']} onSubmit={handleForm}>
            <Input placeholder='Название' name='title'/>
            <Input placeholder='Артикул' name='article'/>
            {!isShowResetFilterForm ? <Button type='submit' className={styles['button']} apperance='accent'>Применить фильтр</Button> : null}
        </Form>
            {isShowResetFilterForm ? <Button onClick={resetFilter} className={styles['button']} apperance='white'>Сбросить фильтр</Button> : null}
        </div>
        
    )
}