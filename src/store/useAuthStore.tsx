import axios from "axios"
import { create, StateCreator } from "zustand"


type AuthState = {
    token: string | null,
    isAuthenticated: boolean;
    succesMessage: string | null
    errorMessage: string | null
};

type AuthAction = {
    register: (name: string, email: string, password: string) => Promise<void>,
    login: (email: string, password: string) => Promise<void>
    logout: () => void,
    setErrorMessage: (error: string | null) => void;
    resetMessage: () => void
};

const AuthSlice: StateCreator<AuthState & AuthAction> = (set) => ({
    token: null,
    isAuthenticated: false,
    succesMessage: null,
    errorMessage: null,
    resetMessage: () => {
        set({
            succesMessage: null,
            errorMessage: null
        })
    },
    register: async (name, email, password) => {
        try {
            const response = await axios.post('http://localhost:3000/api/register', {
                name,
                email,
                password
            });

            set({ errorMessage: null})
            set({ succesMessage: response.data})
        } catch (error) {
            if(axios.isAxiosError(error)){
                if(error.response){
                    set({ succesMessage: null})
                    set({ errorMessage: error.response.data})
                }
            }
        }
    },
    login: async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                email,
                password
            });

            const { token } = response.data;
            const { user } = response.data;
            
            if(token){
                localStorage.setItem('jwt', token);
                localStorage.setItem('name', user.name);
                localStorage.setItem('email', user.email);
                set({ token, isAuthenticated: true});
            }

            set({ errorMessage: null})

        } catch (error: any) {
            if(axios.isAxiosError(error)){
                if(error.response){
                    set({ errorMessage: error.response.data})
                }
            }
        }
    },
    logout: () => {
        set({ token: null, isAuthenticated: false})
        localStorage.removeItem('jwt')
        localStorage.removeItem('name')
        localStorage.removeItem('email')
    },
    setErrorMessage: (error: string | null) => {
        set({errorMessage: error})
    }
});

export const useAuthStore = create<AuthState & AuthAction>(AuthSlice)