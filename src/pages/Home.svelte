<script>
  import Grid from "../components/Grid.svelte";
  import Loader from "../components/Loader.svelte";
  // TMDB API MOST POPULAR MOVIES
  const url =
    "https://api.themoviedb.org/3/movie/popular?api_key=TMDB_API_KEY&language=en-US&page=1";

  let promise = ajax();
  let movies = [];
  async function ajax() {
    const res = await fetch(url);
    movies = await res.json();
    if (res.ok) {
      return movies.results;
    } else {
      throw new Error("No hay conexión API");
    }
  }
</script>

<main>
  <h3>Popular Movies</h3>
  <small>The most popular movies of all times</small>
  {#await promise}
    <p><Loader /></p>
  {:then movies}
    <Grid {movies} />
  {:catch}
    <p class="text-danger">error</p>
  {/await}
  <hr />
</main>
