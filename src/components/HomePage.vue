<template>
  <div class="flex flex-col justify-between min-h-screen bg-gray-100">
    <Header />
    <main class="container p-4 mx-auto">
      <Logo />
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:h-96 lg:grid-cols-3">

      <router-link v-for="project in data" :key="project.id" :to="project.path">
        <Card :data="project" />
      </router-link>

      </div>
    </main>
    <Footer title="Gerardo Rodriguez" />
  </div>

<!-- //example to keep alive -->
  <!-- <router-view v-slot="{ Component }">
   <keep-alive>
     <component :is="Component" />
    </keep-alive>
  </router-view> -->
</template>

<script lang="ts">
import { Footer, Header, Logo, Card } from '@components/shared';

interface Project {
  id: number;
  name: string;
  path: string;
  description?: string;
}

export default {
  name: 'HomePage',
  components: { Footer, Header, Logo, Card },
  props: {
    msg: String,
    data: {
      type: Array as () => Project[],
      default: () => [],
      validator: (value: Project[]) => {
        return value.every((item: Project) => {
          return (
            item.hasOwnProperty('id') &&
            item.hasOwnProperty('name') &&
            item.hasOwnProperty('path')
          );
        });
      },
    },
  },
};
</script>
