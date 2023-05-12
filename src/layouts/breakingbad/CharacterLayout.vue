<script setup lang="ts">
import {RouterView} from 'vue-router';

import NavBar from '@/components/breakingbad/NavBar.vue';

import characterRoute from '@/router/breakingbad';
import type { RouterLink } from '@/router/breakingbad/link-routes';

// import Header from '@/components/shared/Header.vue';
 
const routeLinks: RouterLink[] = characterRoute.children!.filter( route => (route.props as {visible: boolean}).visible).map( route => {
    return {
        name: route.name as string,
        path: route.path,
        title: (route.props as {title: string, visible: boolean}).title
    }
})

</script>

<template>
    <!-- <Header/> -->
    <h1 class="text-gray-400">Characters</h1>

    <!-- Navbar -->
    <NavBar :show-icon="false" :links="routeLinks" />

    <!-- RouterView + Suspense -->
    <RouterView />
</template>