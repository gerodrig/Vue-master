<template>
  <div>
    <HomePage :data="projects" />
   
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomePage from '@/components/HomePage.vue';

export default defineComponent({
  name: 'ProjectsIndex',
  components: {
    HomePage,
  },
  data() {
    return {
      projects: [
        {
          id: 1,
          name: 'Decision Maker App',
          description: `The YesNo Decision Maker is a simple web application that helps you make decisions when you're indecisive. It fetches the YesNo API to get a random yes or no answer, which can be useful for making simple decisions.`,
          image: '',
          path: '/indecision',
        },
        {
          id: 2,
          name: 'Pokemon Game App',
          description: `The Pokemon Game is a simple web application that allows you to play a game of Pokemon. It fetches the PokeAPI to get a random Pokemon and player will have to guess who is that Pokemon!"`,
          image: '',
          path: '/pokemon',
        },
        {
          id: 3,
          name: 'Journal App',
          description: `The Journal App is a simple web application that allows you to write and save your thoughts.`,
          image: '',
          path: '/journal',
        },
        {
          id: 4,
          name: 'Maps App',
          description: `The Maps App is a location-based application that utilizes Mapbox to provide users with a map interface for navigation. With the ability to calculate distances based on the user's location.`,
          image: '',
          path: '/maps-app',
        },
        {
          id: 5,
          name: 'Breakingbad App',
          description: `The Breaking Bad app is a character encyclopedia where users can search and browse through detailed profiles of their favorite characters from the hit TV series. Perfect for fans looking to dive deeper into the world of Breaking Bad on-the-go!`,
          image: '',
          path: '/breakingbad',
        },
        {
          id: 6,
          name: 'Vue Issue App',
          description: `This App explores the Vue.js Github API to fetch the latest issues from the Vue.js repository. it uses useQuery, Pinia and Quasar UI and it's built with Vue 3.`,
          image: '',
          path: '/vue-issues',
        },
      ],
    };
  },
});
</script>
