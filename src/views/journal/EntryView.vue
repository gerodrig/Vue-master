<template>
  <template v-if="entry">
    <div class="flex justify-between p-2">
      <div>
        <span class="text-3xl font-bold text-green-600">{{ day }}</span>
        <span class="mx-1 text-2xl">{{ month }}</span>
        <span class="mx-2 text-xl font-light">{{ year }}, {{ dayOfWeek }}</span>
      </div>
      <div>
        <input
          type="file"
          @change="onSelectedImage"
          v-show="false"
          accept="image/*"
          ref="imageSelector"
        />
        <button
          v-if="entry.id && entry.id !== 'new'"
          class="px-4 py-2 mx-2 font-bold text-white bg-red-500 rounded hover:bg-red-600"
          @click="deleteEntry"
        >
          Delete
          <i class="fa fa-trash-alt"></i>
        </button>
        <button
          class="px-4 py-2 font-bold text-white bg-blue-700 rounded hover:bg-blue-900"
          @click="onUploadImage"
        >
          Upload photo
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>
    <hr />
    <div class="flex flex-col h-screen px-3">
      <textarea
        class="flex-1 h-full p-2 mt-4 text-xl border-2 outline-emerald-700 bg-green-50"
        placeholder="What happened today?"
        v-model="entry.text"
      ></textarea>
    </div>
    <img
      v-if="entry.picture && !loadedImage"
      :src="entry.picture"
      alt="entry-picture"
      class="fixed w-48 border border-gray-400 rounded-md shadow-md bottom-36 right-5"
    />
    <img
      v-if="loadedImage"
      :src="loadedImage"
      alt="entry-picture"
      class="fixed w-48 border border-gray-400 rounded-md shadow-md bottom-36 right-5"
    />
    <Fab icon="fa-save" @on:click="saveEntry" />
  </template>
</template>

<script lang="ts">
import { defineAsyncComponent } from "vue";
import useEntries from "@/composables/journal/useEntries";

export default {
  name: "EntryView",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    Fab: defineAsyncComponent(() => import("@/components/journal/Fab.vue")),
  },
  setup(props) {

    const {
      id,
      entry,
      day,
      month,
      year,
      dayOfWeek,
      loadedImage,
      imageSelector,
  
      //methods
      saveEntry,
      deleteEntry,
      onSelectedImage,
      onUploadImage,

    } = useEntries(props);

    return {
      id,
      entry,
      day,
      month,
      year,
      dayOfWeek,
      loadedImage,
      imageSelector,
  
      //methods
      saveEntry,
      deleteEntry,
      onSelectedImage,
      onUploadImage,
    };
},
};
</script>




