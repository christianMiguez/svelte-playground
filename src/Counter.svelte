<script>
  import { count } from "./store.js";
  import { onDestroy } from "svelte";

  let counterValue;
  const unsuscribe = count.subscribe((value) => {
    counterValue = value + 1;
  });

  onDestroy(unsuscribe);
</script>

<p>counter</p>
<p>{counterValue}</p>
