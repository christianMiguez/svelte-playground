<script>
  import { auth } from "./../firebase.js";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { link, push } from "svelte-spa-router";

  let email = "";
  let password = "";

  auth.onAuthStateChanged((user) => {
    if (user) {
      push("/dashboard");
    }
  });

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
</script>

<h3>Login</h3>

<form on:submit|preventDefault={login}>
  <input type="email" placeholder="email" bind:value={email} />
  <input type="password" placeholder="password" bind:value={password} />
  <button type="submit">Login</button>
</form>

<hr />

<a href="/register" use:link class="btn btn-warning">Register</a>
