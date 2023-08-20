<script>
  import Router from "svelte-spa-router";
  import routes from "./routes";
</script>

<h1>Hi, svelte</h1>

<div class="container">
  <Router {routes} />
</div>
