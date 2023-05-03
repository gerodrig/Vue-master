import { ref, watch } from 'vue';

export function useDebounce(action: Function, delayMS = 300) {
  const debouncedValue = ref('');

  const debounce = (fn: Function, delay = delayMS) => {
    let timeout: NodeJS.Timeout;

    return (...args: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  };

  const debouncedSearch = debounce((value: string) => {
    if(typeof action === 'function'){
        action(value);
    }
  });

  watch(debouncedValue, debouncedSearch);

  return {
    debouncedValue,
  };
}
