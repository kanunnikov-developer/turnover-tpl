import { Form } from 'react-router-dom'
import { useFormShowStore } from '../../../store/useFormsShowStore'
import styles from './AddProduct.module.css'
import { Input } from '../../Input/Input'
import { Button } from '../../Button/Button'
import dayjs from 'dayjs'
import { FormEvent } from 'react'
import { useProductsStore } from '../../../store/useProductsStore'

export const AddProduct = () => {
    const {showAddProductForm} = useFormShowStore();
    const {addProduct} = useProductsStore();

    const handleForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const article = formData.get('article') as string;
        const price = formData.get('price') as string;
        const expirationDate = formData.get('expirationDate') as string;

        const newProduct = {
            id: '',
            title,
            description,
            article,
            price,
            expirationDate
        }

        addProduct(newProduct);
        showAddProductForm();
    }

    return(
        <>
            <div className={styles['content']}>
                <h3 className={styles['title']}>Новый товар</h3>
                <Form className={styles['form']} onSubmit={handleForm}>
                    <Input placeholder='Название' name='title' maxLength={30} required/>
                    <Input placeholder='Описание' name='description' maxLength={23} required/>
                    <Input placeholder='Артикул' name='article' maxLength={15} required/>
                    <Input placeholder='Цена' name='price' maxLength={8} required/>
                    <span className={styles['text']}>Годен до:</span>
                    <Input type='date' placeholder='Цена' name='expirationDate' min={dayjs().format('YYYY-MM-DD')} required/>
                    <div className={styles['btn']}>
                        <Button className={styles['button']} apperance='accent'>Создать</Button>
                        <Button onClick={showAddProductForm} className={styles['button']} apperance='white'>Закрыть</Button>
                    </div>
                </Form>
            </div>
            <div onClick={showAddProductForm} className={styles['overlay']}>

            </div>
        </>   
    )
}