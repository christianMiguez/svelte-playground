import Login from "./pages/Login.svelte";
import Register from "./pages/Register.svelte";
import Dashboard from "./pages/Dashboard.svelte";

const routes = {
  "/": Login,
  "/login": Login,
  "/register": Register,
  "/dashboard": Dashboard,
};

export default routes;
