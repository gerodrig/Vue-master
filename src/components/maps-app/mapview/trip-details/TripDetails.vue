<template>
    <div v-if="distance" class="fixed p-2 text-2xl bg-white rounded-md shadow-lg bottom-10 left-5 w-96">
       <div>
        Distance: <strong class="text-green-600">{{ distance }} kms</strong>
       </div>
       <div>
        Duration: <strong class="text-green-600">{{ duration }} minutes</strong>
       </div>
    </div>
</template>

<script lang='ts'>
import { useMapStore } from '@/composables/maps-app';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TripDetails',
    setup() {
        
        const { distance , duration } = useMapStore();

        return {
            distance,
            duration,
        };
    },
});
</script>