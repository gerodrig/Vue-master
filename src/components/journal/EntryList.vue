
<template>
    <div class="h-screen mx-4 mt-4 border-r border-green-900 entry-list-container">
        <input 
            type="text"
            class="items-center w-11/12 px-2 py-2 mx-auto rounded-md shadow-md ring-1 ring-gray-400 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            placeholder="Search Entry"
            v-model="term"
        />

        <div class="flex flex-col items-center justify-center my-4">
            <button @click="$router.push({name: 'entry', params: {id: 'new'}})" class="w-2/3 px-4 py-2 font-semibold text-white bg-green-800 rounded hover:bg-green-900 ">
                <i class="fas fa-plus-circle"></i>
                New Entry
            </button>
        </div>

        <div class="overflow-scroll entry-scroll-area">
            <Entry :entry="entry" v-for="entry in entries" :key="entry.id" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineAsyncComponent, computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { Rootstate, Entry } from '@interfaces/journal/index';

export default {
    name: 'EntryList',
    components: {
        Entry: defineAsyncComponent(() => import('@components/journal/Entry.vue'))
    },
    setup() {
        const store = useStore<Rootstate>();
        const term = ref('');
        const getEntriesByTerm = (value: string): Entry[] =>  store.getters['journal/getEntriesByTerm'](value);
        
        const entries =  computed<Entry[]>(() => {
            if (term.value.length > 2) {
                return getEntriesByTerm(term.value);
            } else {
                return store.state.journal.entries;
            }
        });
        
        return {
            term,
            entries
        }
    }
}
</script>

<style   scoped >
.entry-list-container {
    height: calc(100vh - 56px);
}

.entry-scroll-area {
    height: calc( 100vh - 120px);
}

</style>