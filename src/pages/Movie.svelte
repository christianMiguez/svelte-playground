<script>
  import { onMount } from "svelte";
  export let params = {};
  let id = params.id;
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=TMDB_API_KEY&language=en-US`;

  let movie = {};
  onMount(async () => {
    const res = await fetch(url);
    movie = await res.json();
    if (res.ok) {
      return movie;
    } else {
      throw new Error("No hay conexión API");
    }
  });
</script>

<main>
  <div class="row">
    <div class="col-4">
      <img
        src="https://image.tmdb.org/t/p/w500/{movie.poster_path}"
        alt={movie.title}
        class="img-fluid"
      />
    </div>
    <div class="col-8 text-left">
      <h3>{movie.title}</h3>
      <p>{movie.overview}</p>
      <p>Release date: {movie.release_date}</p>
      <p>Runtime: {movie.runtime} minutes</p>
      <p>Vote average: {movie.vote_average}</p>
      <p>Vote count: {movie.vote_count}</p>
      <p>Popularity: {movie.popularity}</p>
    </div>
  </div>
</main>
