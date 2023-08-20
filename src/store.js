import { writable } from "svelte/store";

export const count = writable(0);
export const counters = writable({
  count1: 0,
  count2: 1,
});
