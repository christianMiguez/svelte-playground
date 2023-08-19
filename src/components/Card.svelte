<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let title;
  export let image;
  export let description;

  function watch() {
    dispatch("go-details");
  }
</script>

<div class="card">
  <img
    src="https://image.tmdb.org/t/p/w500/{image}"
    class="card-img-top"
    alt={title}
  />
  <div class="card-body">
    <h5 class="card-title">{title}</h5>
    <p class="card-text">{description}</p>
    <button class="btn btn-primary" on:click={watch}>Details</button>
  </div>
</div>
