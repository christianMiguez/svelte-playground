<script>
  import Card from "./Card.svelte";
  import { push } from "svelte-spa-router";

  export let movies = [];
</script>

<div class="row mt-3">
  {#each movies as movie}
    <div class="col-3">
      <Card
        title={movie.title}
        image={movie.poster_path}
        description={movie.overview}
        on:go-details={() => push(`/movie/${movie.id}`)}
      />
    </div>
  {/each}
</div>
