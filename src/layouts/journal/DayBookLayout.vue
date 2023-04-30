<template>
    <Navbar />

    <Loader v-if="isLoading" />

    <div v-else class="flex">
        <div class="w-1/3">
            <EntryList />
        </div>
        <div class="flex-grow">
            <router-view :key="$route.fullPath" />
        </div>
    
    </div>
</template>




<script lang="ts">
import { defineAsyncComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { Rootstate } from '@/interfaces/journal';

export default {
    name: 'DayBookLayout',
    components: {
        Navbar: defineAsyncComponent(() => import('@components/journal/Navbar.vue')),
        EntryList: defineAsyncComponent(() => import('@components/journal/EntryList.vue')),
        Loader: defineAsyncComponent(() => import('@components/journal/UI/Loader.vue'))
    },
    setup() {
        const store = useStore<Rootstate>();
        const loadEntries = () => {
            store.dispatch('journal/loadEntries');
        }


        loadEntries();
        return {
            isLoading: computed(() => store.state.journal?.isLoading)
        }
    }

}
</script>