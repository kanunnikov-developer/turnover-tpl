import axios from "axios"
import { create, StateCreator } from "zustand"

// Установите базовую URL
axios.defaults.baseURL = 'http://localhost:3000/api';

// Установка интерсептора для добавления токена в заголовок запроса
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export type ProductType = {
    id: string,
    title: string,
    description: string,
    article: string, 
    price: string,
    expirationDate: string
    authorId?: string
}

type ProductsState = {
    products: ProductType[],
    loading: boolean
}

type ProductAction = {
    getProducts: () => Promise<void>,
    deleteProduct: (id: string) => Promise<void>,
    addProduct: (product: ProductType) => Promise<void>,
    renameProduct: (product: ProductType) => Promise<void>,
    filterProduct: (title: string, article: string) => void,
    copuProduct: (id: string) => Promise<void>
}

const ProductsSlice: StateCreator<ProductsState & ProductAction> = (set) => ({
    loading: false,
    products: [],
    getProducts: async () => {
        set({loading: true});
        try {
            const {data} = await axios.get<ProductType[]>(`/products`);
            set({products: data});
        } catch (error) {
            console.log('Ошибка получения данных');
        }
        finally {
            set({loading: false})
        }
    },
    deleteProduct: async (id: string) => {
        try {
            await axios.delete(`/products/${id}`);
            set((state) => ({products: state.products.filter((product) => product.id !== id)}))
        } catch (error) {
            console.log('Ошибка удаление товара');
        }
    },
    addProduct: async (product: ProductType) => {
        set({loading: true});
        try {
            const responce = await axios.post(`/products`, product);
            set((state) => ({products: [...state.products, responce.data]}))
            
        } catch (error) {
            console.log('Не удалось добавить товар');
        }
        finally {
            set({loading: false})
        }
    },
    renameProduct: async (product: ProductType) => {
        try {
            await axios.put(`/products/${product.id}`, product);
            set((state) => {
                const updatedProducts = state.products.map(p => 
                    p.id === product.id ? product : p
                );

                return {products: updatedProducts};
            });
        } catch (error) {
            console.log('Не удалось изменить товар');
        }
    },
    filterProduct: (title: string, article: string) => {
        set((state) => {
            const filteredProducts = state.products.filter(product => {
                const titleMatch = title ? product.title.toLowerCase().includes(title.toLowerCase()) : true;
                const articleMatch = article ? product.article.toLowerCase().includes(article.toLowerCase()) : true;
                return titleMatch && articleMatch; // Используйте || для соответствия хотя бы одному условию
            });
            return { products: filteredProducts };
        });
    },
    copuProduct: async (id: string) => {
        try {
            const responce = await axios.post(`/products/copy/${id}`,);
            set((state) => ({products: [...state.products, responce.data]}))
        } catch (error) {
            console.log('Не удалось добавить товар');
        }
    }
});

export const useProductsStore = create<ProductsState & ProductAction>(ProductsSlice)

