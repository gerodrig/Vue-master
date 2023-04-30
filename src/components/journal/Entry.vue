<template>
  <div
    class="p-2 mb-3 transition-all duration-200 ease-in border-b border-green-600 cursor-pointer hover:bg-slate-300"
    @click="$router.push({ name: 'entry', params: { id } })"
  >
    <!-- Title -->
    <div class="flex">
      <span class="text-lg font-bold text-green-600">{{ day }}</span>
      <span class="mx-1 font-bold">{{ month }}</span>
      <span class="mx-2 font-light">{{ year }}, {{ dayOfWeek }}</span>
    </div>

    <div class="text-base">
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, toRef } from 'vue';
import { Entry, FormattedDate} from '@interfaces/journal/index';
import { getDate } from '../../helpers/journal/getDate';



export default {
  name: 'Entry',
  props: {
    entry: {
      type: Object as () => Entry,
      required: true,
    },
  },
  setup(props ) {
    const entry = toRef(props, 'entry');
    const date = computed<FormattedDate>(() => getDate(entry.value));

    const shortText = computed(() => {
      const text = entry.value.text;
      return text.length > 100 ? text.substring(0, 100) + '...' : text;
    });

    return {
      ...date.value,
      text: shortText,
      id: computed(() => entry.value.id),
    };
  },
};
</script>
