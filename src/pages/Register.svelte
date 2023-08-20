<script>
  import { auth } from "../firebase.js";
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { link, push } from "svelte-spa-router";

  let email = "";
  let password = "";

  auth.onAuthStateChanged((user) => {
    if (user) {
      push("/");
    }
  });

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        push("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
</script>

<h3>Register</h3>

<form on:submit|preventDefault={register}>
  <input type="email" placeholder="email" bind:value={email} />
  <input type="password" placeholder="password" bind:value={password} />
  <button type="submit">Register</button>
</form>

<hr />

<a href="/login" use:link class="btn btn-warning">Login</a>
