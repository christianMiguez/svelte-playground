<script>
  import { count, counters } from "./store.js";
  import { customCount, customCounters } from "./custom-store.js";
  import { api } from "./api-store.js";
  import Counter from "./Counter.svelte";
  import Increment from "./Increment.svelte";
  import Table from "./Table.svelte";

  let show = true;
</script>

<h1>Hi, svelte</h1>

<h3>Store</h3>
<hr />

<h3>Contador: {$count}</h3>

<h3>from external component</h3>

{#if show}
  <Counter />
{/if}
<button
  on:click={() => {
    show = !show;
  }}>Show</button
>

<h3>increment</h3>

<Increment />

<h4>more than one</h4>
<p>
  Count1:
  {$counters.count1}
</p>
<p>Count2: {$counters.count2}</p>
<hr />

<h3>Custom store</h3>

<p>Custom count: {$customCount}</p>
<button on:click={customCount.decrement}>DECREMENT</button>
<button on:click={customCount.reset}>RESET</button>
<button on:click={customCount.increment}>INCREMENT</button>

multiple!

<p>Custom: {$customCounters.customCounter5}</p>
<button on:click={customCounters.increment} class="btn btn-success">+5</button>

<p>Custom {$customCounters.customCounter10}</p>
<button on:click={customCounters.increment} class="btn btn-primary">+10</button>

<hr />

Readable store

<ul>
  {#each $api as user}
    <li>{user.name}</li>
  {/each}
</ul>

as table
<Table />

<style></style>
