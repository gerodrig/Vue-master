<template>
   <!-- Start of card -->
    <div class="card h-52 lg:h-60">
            <div class="card-header">
              <h2 class="text-xl font-semibold">{{ name }}</h2>
            </div>
            <p class="card-body">
              {{  description }}
            </p>
      </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Project {
  id: number;
  name: string;
  path: string;
  image?: string;
  description?: string;
}

export default defineComponent({
    name: 'Card',
    props: {
      data: {
        type: Object as () => Project,
        default: () => {},
        validator: (value: Project) => {
          return (
            value.hasOwnProperty('id') &&
            value.hasOwnProperty('name') &&
            value.hasOwnProperty('path')
          );
        },
      },
    },
    setup(props) {
      const { name, description, id, image } = props.data;
      return { name, image, description };
    }
})
</script>


<style scoped>
.card {
  @apply bg-white shadow-lg rounded p-4;
}

.card-header {
  @apply mb-4;
}

.card-body {
  @apply text-gray-700;
}
</style>
