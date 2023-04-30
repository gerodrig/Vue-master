
<template>
    <nav class="flex items-center justify-between h-16 bg-green-900">
        <a class="text-2xl text-white">
            <img src="@/assets/vue.svg" alt="Vue Logo" class="inline-block w-10 h-10 mx-2">
            Daybook
        </a>

        <div @click="onLogout" class="right-0 p-4 mr-2 text-white hover:cursor-pointer">
            <span class="mr-2">{{ username }}</span>
            <button>
                <i class="text-2xl hover:text-yellow-500 fa fa-sign-out-alt"></i>
            </button>
        </div>
    </nav>
</template>

<script lang='ts'>
import { useRouter } from 'vue-router';
 import useAuth from '@/composables/auth/useAuth';
    export default {
        name: 'Navbar',
        setup() {
            const router = useRouter();
            const { username, logout } = useAuth();

            return {
                username,
                
                //methods
                onLogout: () => {
                    router.push({ name: 'login' })
                    logout();
                }
            }
        }
    };
</script>
