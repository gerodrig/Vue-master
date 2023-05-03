
import { computed, defineAsyncComponent, defineComponent, ref, watch } from 'vue';
import { usePlacesStore } from '@/composables/maps-app/';
import { useDebounce } from '@/composables/shared/useDebounce';

export default defineComponent({
    name: 'SearchBar',
    components: {
        SearchResults: defineAsyncComponent(() => import(/* webpackChunkName: "search-results" */ '../search-results/SearchResults.vue')),
    },
    setup() {

        const { searchPlacesByTerm } = usePlacesStore();

        const { debouncedValue } = useDebounce(searchPlacesByTerm, 500);

        return {
            debouncedValue,
            searchTerm: computed({
                get(){
                    return debouncedValue.value;
                },
                set(value: string){
                    debouncedValue.value = value;
                },
            }),
        };
    }
});