<template>
  <div>
    <HomePage :data="projects" />
    <ul>
      <li v-for="project in projects" :key="project.id">
        <router-link :to="project.name">{{ project.name }}</router-link>
      </li>
    </ul>
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
          //           Description: The YesNo Decision Maker is a simple web application that helps you make decisions when you're indecisive. It fetches the YesNo API to get a random yes or no answer, which can be useful for making simple decisions like "Should I go out tonight?" or "Should I buy this item?".

          // Features:

          // Fetches the YesNo API to get a random answer (yes, no, or maybe).
          // Displays the answer along with an image related to the answer (e.g. a happy face for "yes" or a sad face for "no").
          // Allows the user to input a custom question to ask the decision maker.
          // Provides a simple and intuitive user interface that is easy to use.
          // Works on desktop and mobile devices.
          // Technologies:

          // HTML, CSS, and JavaScript for the front-end.
          // Axios or the native fetch API to fetch data from the YesNo API.
          // Vue.js or React for building the UI components.
          // Jest or another testing framework for unit and integration tests.
          // Additional Features (optional):

          // Allows the user to share the answer on social media (e.g. Twitter or Facebook).
          // Saves the user's question and the decision made for future reference.
          // Provides a history of previous questions and answers.
          // Offers additional information or resources related to the decision made (e.g. local events for "yes" or online shopping options for "no").
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
      ],
    };
  },
});
</script>
