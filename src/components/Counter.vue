<template>
    <div class="mx-auto text-center debug">
        <h1 class="text-4xl">Counter</h1>
        <p data-testid="counter" class="my-5 text-2xl"> {{ count }} <sup>2</sup> = {{ squared }}</p>
        <div class="buttons">
        <button data-testid="decrement" class="px-4 py-2 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-700" @click="decrement">-1</button>
        <button data-testid="increment" class="px-4 py-2 ml-5 font-bold text-white bg-green-500 rounded hover:bg-green-700" @click="increment">+1</button>
        </div>
    </div>
</template>


<script lang="ts">
    export default {
        name: 'Counter',
        data() {
            return {
                count: 0
            }
        },
        methods: {
            increment() {
                this.count++
            },
            decrement() {
                this.count--
            }
        },
        computed: {
            squared() {
                return this.count * this.count
            }
        },
    }
</script>