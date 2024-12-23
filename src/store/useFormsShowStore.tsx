import { create, StateCreator } from "zustand"
import { ProductType } from "./useProductsStore"

type FormsShowState = {
    isShowAddProductForm: boolean,
    isShowRenameProductForm: boolean,
    isShowResetFilterForm: boolean,
    selectedProduct: ProductType
}

type FormsShowAction = {
    showAddProductForm: () => void,
    showRenameProductForm: () => void,
    showResetFilterForm: () => void,
    setSelectedProduct: (product: ProductType) => void
}

const FormsShowSlice: StateCreator<FormsShowState & FormsShowAction> = (set) => ({
    isShowAddProductForm: false,
    isShowRenameProductForm: false,
    isShowResetFilterForm: false,
    selectedProduct: {id: '', title: '', description: '', article: '', price: '', expirationDate: ''},
    showAddProductForm: () => {
        set((state) => ({isShowAddProductForm: !state.isShowAddProductForm}));
    },
    showRenameProductForm: () => {
        set((state) => ({isShowRenameProductForm: !state.isShowRenameProductForm}));
    },
    showResetFilterForm: () => {
        set((state) => ({isShowResetFilterForm: !state.isShowResetFilterForm}));
    },
    setSelectedProduct: (product: ProductType) => {
        set({selectedProduct: product})
    }
})

export const useFormShowStore = create<FormsShowState & FormsShowAction>(FormsShowSlice)