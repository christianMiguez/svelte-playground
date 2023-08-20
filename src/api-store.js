import { readable } from "svelte/store";

// @ts-ignore
export const api = readable([], async (set) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  set(data);
});
