import { writable } from "svelte/store";

function counter() {
  const { subscribe, set, update } = writable(0);

  return {
    subscribe,
    increment: () => update((n) => n + 1),
    decrement: () => update((n) => n - 1),
    reset: () => set(0),
  };
}

function counters() {
  const { subscribe, update } = writable({
    customCounter5: 5,
    customCounter10: 10,
  });

  return {
    subscribe,
    increment: () =>
      update((n) => {
        n.customCounter5 = n.customCounter5 + 5;
        n.customCounter10 = n.customCounter10 + 10;
        return n;
      }),
  };
}

export const customCount = counter();
export const customCounters = counters();
