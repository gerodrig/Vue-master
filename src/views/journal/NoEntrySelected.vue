
<template>
    <div class="flex justify-center h-full">
        <h1 class="self-center text-2xl">Nothing is selected</h1>
    </div>
    <Fab @on:click="createNewEntry" />
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'NoEntrySelected',
    components: {
        Fab: defineAsyncComponent(() => import('@components/journal/Fab.vue'))
    },
    setup(){
        const router = useRouter();
        const createNewEntry = () => {
            router.push({ name: 'entry', params: { id: 'new' } });
        }

        return {
            createNewEntry
        }
    }
}
</script>