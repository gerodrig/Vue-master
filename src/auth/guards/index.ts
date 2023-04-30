import { NavigationGuard } from "vue-router";
import store from "@/store";


const isAuthenticatedGuard: NavigationGuard = async (to, from, next) => {

    const { ok } = await store.dispatch('auth/checkAuthentication');

  
    if(ok) next();
    else next({name: 'login'});
}

export default isAuthenticatedGuard;