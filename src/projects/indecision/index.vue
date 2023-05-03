<template>
    <Header :title="title" />
    <img v-if="image" :src="image" alt="background" class="fixed top-0 left-0 object-cover w-screen h-screen -z-10">
    <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 -z-10"></div>

    <div class="container z-10 pt-40 mx-auto text-center">
        <input type="text" placeholder="Ask a question..." class="w-full px-4 py-2 text-gray-800 bg-white border-none rounded-lg shadow-lg md:w-96" v-model="question" />
        <p class="mt-2 text-gray-300 lg:text-3xl md:text-sm">Remember to end your question with (?)</p>
    </div>
    <div v-if="isValidQuestion" class="mt-32 text-center">
        <h2 class="text-4xl font-bold text-white">{{ question }}</h2>
        <h1 class="mt-4 text-5xl font-bold text-white">{{ answer }}</h1>
    </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';
import Header from '@components/shared/Header.vue';


export default defineComponent({
    name: 'Indecision',
    components: { 
        Header: defineAsyncComponent(() => import('@/components/shared/Header.vue')),
    },
    //get data from input
    data() {
        return {
            question: '',
            answer: null || '',
            image: null,
            isValidQuestion: false,
            title: 'Decision Maker',
        }
    },
    methods: {
        //get data from input
        async getAnswer() {
            try {
                const response = await fetch('https://yesno.wtf/api')
                const { answer, image } = await response.json()
                this.answer = answer[0].toUpperCase() + answer.slice(1);
                this.image = image
                
                
            } catch (error) {
                console.error(error);
                this.answer = 'Sorry, something went wrong';
                this.image = null;
            }
        }
    },
    watch: {
        question(value, oldValue) {

            this.isValidQuestion = false;

            console.log({value });

            if(!value.endsWith('?'))  return;

            this.isValidQuestion = true;
            
            this.getAnswer();
            
        }
    },
})
</script>

<style>
    html {
        background-color: black;
    }
</style>