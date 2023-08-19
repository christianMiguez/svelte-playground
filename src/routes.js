import Home from "./pages/Home.svelte";
import Movie from "./pages/Movie.svelte";
import ErrorPage from "./pages/ErrorPage.svelte";

const routes = {
  "/": Home,
  "/movie/:id": Movie,
  "*": ErrorPage,
};

export default routes;
