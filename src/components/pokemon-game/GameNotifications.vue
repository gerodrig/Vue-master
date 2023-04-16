<template>
    <div class="absolute top-36 right-12 md:right-36 md:top-1/3 xl:right-24 xl:top-1/3 2xl:right-1/4 2xl:w-96 2xl:h-96">
        <div v-if="showAnswer" class="flex flex-col items-center justify-center w-full h-full max-w-md px-6 py-4 mx-auto my-4 font-semibold text-center text-gray-800 bg-white border-2 border-blue-500 rounded-lg shadow-md ">
                        <h1 v-if="won" class="text-4xl font-bold text-center text-yellow-500">{{message}}</h1>
                        <h1 v-else="won" class="text-3xl font-bold text-center text-red-500">{{message}}</h1>

                        <!-- //button with a pokemon style -->
                        <button class="px-4 py-2 mt-10 font-bold text-white bg-red-500 rounded hover:bg-red-700" @click="$emit('resetGame')">Restart Game</button>
                    </div> 
    </div>
                
</template>

<script lang='ts'>
import { defineComponent, toRef } from 'vue';
export default defineComponent({
  name: 'GameNotifications',
  props: {
    message: {
      type: String,
      required: true,
    },
    won: {
      type: Boolean,
      required: true,
    },
    showAnswer: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const showAnswer = toRef(props, 'showAnswer');
    const won = toRef(props, 'won');
    const message = toRef(props, 'message');
    return {
      showAnswer,
        won,
        message,
    };
  },
});
</script>