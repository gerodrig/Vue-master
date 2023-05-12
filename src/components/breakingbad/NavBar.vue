<script setup lang="ts">
import type { RouterLink } from '@/router/breakingbad/link-routes';

interface Props {
    title?: string;
    links?: RouterLink[];
    showIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    showIcon: true,
    links: () => []
});
</script>

<template>
     
    <nav class="flex items-start w-full mt-3 mb-3 text-xs text-center">
        <img class="mr-2" v-if="props.showIcon" src="@/assets/vue.svg" alt="Vue Logo" height="25" width="25" />
        <span class="mr-3 text-gray-400" v-if="props.title">{{ props.title }}</span>

        <RouterLink class="mr-2" v-for="link of props.links" :key="link.path" :to="link.path">
        {{ link.title  }}
        </RouterLink>
    </nav>
</template>