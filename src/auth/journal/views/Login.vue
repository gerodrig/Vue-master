<template>
  <span
    class="block pb-10 font-mono text-3xl font-bold leading-4 text-center text-white uppercase"
  >
    Log in
  </span>
  <form @submit.prevent="onSubmit" class="w-full pt-2 pb-8 bg-white rounded-xl">
    <p v-if="errorMessage" class="text-center text-red-600">{{ errorMessage }}</p>
    <div
      class="relative w-full px-0 border border-solid border-b-gray-300 py-7"
      data-validate="email"
    >
      <input
        v-model="userForm.email"
        autocomplete="current-email"
        class="text-xl text-[#555555] leading-[1.2] block w-full h-[50px] transition-all duration-[0.4s] pl-20 pr-2.5 py-0 focus:pl-[60px]"
        type="text"
        placeholder="Email"
        required
      />
      <span
        class="absolute block w-full h-full pointer-events-none left-0 top-0 before:content-[''] before:block before:absolute before:w-0 before:h-px before:transition-all before:duration-[0.4s] before:left-0 before:-bottom-px focus-input"
        data-placeholder="&#xe818;"
      ></span>
    </div>

    <div
      class="relative w-full px-0 border border-solid border-b-gray-300 py-7"
      data-validate="password"
    >
      <input
        v-model="userForm.password"
        autocomplete="current-password"
        class="text-xl text-[#555555] leading-[1.2] block w-full h-[50px] transition-all duration-[0.4s] pl-20 pr-2.5 py-0 focus:pl-[60px]"
        type="password"
        placeholder="Password"
        required
      />
      <span
        class="absolute block w-full h-full top-0 left-0 pointer-events-none before:content-[''] before:bg-gradient-to-r before:from-rose-600 before:via-red-600 before:to-pink-600 focus:pl-14 focus-input"
        data-placeholder="&#xe80f;"
      ></span>
    </div>

    <div class="flex flex-wrap justify-center w-full mt-8">
      <button
        class="font-mono text-lg text-white leading-4 uppercase flex justify-center items-center py-0 px-5 min-w-[160px] h-11 rounded-3xl relative -z-0 transition-all duration-300 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 hover:opacity-90"
      >
        Login
      </button>
    </div>

    <div class="flex flex-wrap justify-center w-full mt-8">
      <router-link
        :to="{ name: 'register' }"
        class="text-indigo-500 hover:text-indigo-700"
        >Don't have an account?</router-link
      >
    </div>
  </form>
</template>

<script lang="ts">
import useAuth from '@/composables/auth/useAuth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'AuthLogin',
  setup() {
    const { loginUser } = useAuth();
    const router = useRouter();
    const errorMessage = ref<string | null>(null);

    const userForm = ref({
      email: '',
      password: '',
    });

    return {
      userForm,
      errorMessage,

      //methods
      onSubmit: async () => {
        errorMessage.value = null;
        const userCredentials = {
          email: userForm.value.email,
          password: userForm.value.password,
        };

        const { ok, message } = await loginUser(userCredentials);

        if (!ok) {
          switch (message) {
            case "EMAIL_NOT_FOUND":
              errorMessage.value = "Email not found";
              break;
            case "INVALID_PASSWORD":
              errorMessage.value = "Invalid password";
              break;
            default:
              errorMessage.value = "Error logging in";
          }
        } else {
          router.push({ name: 'no-entry' });
        }
        
      },
    };
  },
};
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/linearicons@1.0.2/dist/web-font/style.min.css');

.focus-input::after {
  font-family: Linearicons-Free;
  font-size: 18px;
  color: #999999;

  content: attr(data-placeholder);
  display: block;
  width: 100%;
  position: absolute;
  top: 40px;
  left: 35px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}
</style>
