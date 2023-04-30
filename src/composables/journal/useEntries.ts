import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Swal from "sweetalert2";

import { getDate, uploadImage} from "@/helpers/journal/";
import { Entry, FormattedDate, Rootstate } from "@/interfaces/journal";

export default function useEntries (props: { id: string }) {
    const store = useStore<Rootstate>();
    const router = useRouter();
    const id = ref(props.id);
    const entry = ref<Entry | null>(null);
    const loadedImage = ref<string | null>(null);
    const fileToUpload = ref<File | null>(null);
    const imageSelector = ref<HTMLInputElement | null>(null);


    //methods
    const getEntriesById = <(value: string) => Entry>(
        store.getters["journal/getEntriesById"]
      );

      const loadEntry = (id: string) => {
        let loadedEntry = {} as Entry;
  
        if (id === "new") {
          loadedEntry = {
            text: "",
            date: new Date().toISOString(),
            picture: null,
            id: "new",
          };
        } else {
          loadedEntry = <Entry>getEntriesById(id);
          if (!loadedEntry) return router.push({ name: "no-entry" });
        }
        entry.value = loadedEntry;
      }

      const saveEntry = async (): Promise<void> => {
        try {
          Swal.fire({
            title: "Saving, please wait...",
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
              //green loader
              Swal.showLoading();
              const loader = <HTMLElement>document.querySelector(".swal2-loader");
              loader.style.borderColor = "#4CAF50 rgba(0,0,0,0) #4CAF50 rgba(0,0,0,0)";
            },
          });
  
          const picture = await uploadImage(fileToUpload.value);
  
          if (!entry.value) return;
  
          entry.value.picture = <string>picture;
  
          if (entry.value.id !== "new") {
            //update entry
            await store.dispatch("journal/updateEntry", entry.value);
          } else {
            const id = await store.dispatch("journal/createEntry", entry.value);
  
            router.push({ name: "entry", params: { id } });
          }
  
          Swal.fire({
            title: "Saved!",
            text: "Entry saved successfully",
            icon: "success",
            confirmButtonColor: "#4CAF50",
            confirmButtonText: "Ok",
          });
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong",
            icon: "error",
            confirmButtonColor: "#d33",
            confirmButtonText: "Ok",
          });
        }
  
        fileToUpload.value = null;
      };
  
      const deleteEntry = async () => {
        if (!entry.value) return;
  
        try {
          const { isConfirmed } = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4CAF50",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          });
  
          if (isConfirmed) {
            Swal.fire({
              title: "Deleting, please wait...",
              allowOutsideClick: false,
              showConfirmButton: false,
              willOpen: () => {
                //green loader
                Swal.showLoading();
                const loader = <HTMLElement>document.querySelector(".swal2-loader");
                loader.style.borderColor = "#4CAF50 rgba(0,0,0,0) #4CAF50 rgba(0,0,0,0)";
              },
            });
  
            await store.dispatch("journal/deleteEntry", entry.value);
            router.push({ name: "no-entry" });
  
            Swal.fire({
              title: "Deleted!",
              text: "Entry deleted successfully",
              icon: "success",
              confirmButtonColor: "#4CAF50",
              confirmButtonText: "Ok",
            });
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      const onSelectedImage = (event: Event) => {
        const file = (<HTMLInputElement>event.target).files?.[0];
        if (!file) {
          loadedImage.value = null;
          fileToUpload.value = null;
          return;
        }
  
        fileToUpload.value = file;
  
        const fileReader = new FileReader();
        fileReader.onload = () => (loadedImage.value = <string>fileReader.result);
        fileReader.readAsDataURL(file);
      };
  
      const onUploadImage = async () => {
        imageSelector.value?.click();
      };
  
      loadEntry(id.value);
  
      const date = computed<FormattedDate>(() => getDate(entry.value));
  
      return {
        id: computed(() => props.id),
        entry: entry.value,
        ...date.value,
        loadedImage,
        imageSelector,
  
        //methods
        saveEntry,
        deleteEntry,
        onSelectedImage,
        onUploadImage,
      };
}