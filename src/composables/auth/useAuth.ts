import { User } from "@/interfaces/journal";
import { computed } from "vue";
import { useStore } from "vuex";


const useAuth = () => {

    const store = useStore();

    const createUser = async(user: User) => {

         const response = await store.dispatch('auth/createUser', user);
        
        return response;
    };

    const loginUser = async(user: User) => {

        const response = await store.dispatch('auth/signInUser', user);

        return response;
     }

     const checkAuthStatus = async() => {
            
            const response = await store.dispatch('auth/checkAuthentication');
    
            return response;
     }

     const logout = () => {

        store.commit('auth/logoutUser');
        store.commit('journal/clearEntries');

        }

    return {  

        //getters
        authStatus: computed(() => store.getters['auth/currentAuthState']),
        username: computed(() => store.getters['auth/currentUsername']),

        //methods
        checkAuthStatus,
        createUser,
        loginUser,
        logout,

    };
};

export default useAuth;