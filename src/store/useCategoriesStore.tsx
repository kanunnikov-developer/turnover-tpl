import axios from "axios"
import { create, StateCreator } from "zustand"
import { API } from "../helpers/API"

type CategoryType = {
    id: number,
    categories: string[]
}

type CategoriesType = {
    categories: CategoryType[],
}

type CategoriesAction = {
    getCategories: () => Promise<void>
}

const CategoriesSlice: StateCreator<CategoriesType & CategoriesAction> = (set) => ({
    categories: [],
    getCategories: async () => {
        try {
            const {data} = await axios.get<CategoryType[]>(`${API}/categories`);
            set(({categories: data}));
        } catch (error) {
            console.log("Не удалось получить категории");
        }
    }
});

export const useCategoriesStore = create<CategoriesType & CategoriesAction>(CategoriesSlice);

