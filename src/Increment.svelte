<script>
  import { count, counters } from "./store.js";

  function increment() {
    count.update((n) => n + 1);
    counters.update((n) => {
      return {
        ...n,
        count1: n.count1 + 1,
        count2: n.count2 + 2,
      };
    });
  }
  function decrement() {
    count.update((n) => n - 1);
    counters.update((n) => {
      return {
        ...n,
        count1: n.count1 - 1,
        count2: n.count2 - 2,
      };
    });
  }
  function reset() {
    count.set(0);
    counters.set({
      count1: 0,
      count2: 0,
    });
  }
</script>

<button on:click={decrement}>-1</button>
<button on:click={reset}>REST</button>
<button on:click={increment}>+1</button>
