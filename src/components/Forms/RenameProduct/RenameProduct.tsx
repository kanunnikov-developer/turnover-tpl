import styles from './../AddProduct/AddProduct.module.css'
import { Form } from "react-router-dom"
import { Input } from '../../Input/Input'
import { useFormShowStore } from '../../../store/useFormsShowStore'
import { Button } from '../../Button/Button'
import dayjs from 'dayjs'
import { FormEvent, useState } from 'react'
import { useProductsStore } from '../../../store/useProductsStore'

export const RenameProduct = () => {
    const {selectedProduct, showRenameProductForm} = useFormShowStore();
    const {renameProduct} = useProductsStore()

    const [title, setTitle] = useState<string>(selectedProduct.title);
    const [description, setDescription] = useState<string>(selectedProduct.description);
    const [article, setArticle] = useState<string>(selectedProduct.article);
    const [price, setPrice] = useState<string>(selectedProduct.price);
    const [expirationDate, setExpirationDate] = useState<string>(selectedProduct.expirationDate);

    const handleForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const article = formData.get('article') as string;
        const price = formData.get('price') as string;
        const expirationDate = formData.get('expirationDate') as string;

        const newRenameProduct = {
            id: selectedProduct.id,
            title,
            description,
            article,
            price,
            expirationDate
        };

        renameProduct(newRenameProduct);
        showRenameProductForm();
    };

    return (
        <>
            <div className={styles['content']}>
                <h3 className={styles['title']}>Изменить товар</h3>
                <Form className={styles['form']} onSubmit={handleForm}>
                    <Input placeholder='Название' name='title' value={title} onChange={(e) => setTitle(e.target.value)} maxLength={30} required/>
                    <Input placeholder='Описание' name='description' value={description} onChange={(e) => setDescription(e.target.value)} maxLength={23} required/>
                    <Input placeholder='Артикул' name='article' value={article} onChange={(e) => setArticle(e.target.value)} maxLength={15} required/>
                    <Input placeholder='Цена' name='price' value={price} onChange={(e) => setPrice(e.target.value)} maxLength={8} required/>
                    <span className={styles['text']}>Годен до:</span>
                    <Input type='date' placeholder='Цена' name='expirationDate' min={dayjs().format('YYYY-MM-DD')} value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} required/>
                    <div className={styles['btn']}>
                        <Button className={styles['button']} apperance='accent'>Изменить</Button>
                        <Button onClick={showRenameProductForm} className={styles['button']} apperance='white'>Закрыть</Button>
                    </div>
                </Form>
            </div>
            <div onClick={showRenameProductForm} className={styles['overlay']}>

            </div>
        </>
    )
}