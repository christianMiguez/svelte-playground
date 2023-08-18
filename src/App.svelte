<script>
  let nombre = "Jorge";
  let v1 = 0;
  let v2 = 0;
  let check = false;

  function alerta1() {
    alert("alerta 1");
  }

  const alerta2 = () => alert("alerta 2");

  let contador = 0;
  let texto = "";
  $: resultado = contador * 10;
  $: if (resultado === 30) {
    texto = "OK";
  } else {
    texto = "Ooouch";
  }

  let login = true;
  const cambio = () => (login = !login);

  let nombres = ["Maria", "Sandra", "Ruben"];

  let personas = [
    {
      id: 1,
      nombre: "Devan",
      apellido: "Mordey",
      email: "dmordey0@google.com.br",
    },
    { id: 2, nombre: "Tobi", apellido: "Knudsen", email: "tknudsen1@cbc.ca" },
    {
      id: 3,
      nombre: "Thia",
      apellido: "Rosengarten",
      email: "trosengarten2@posterous.com",
    },
    {
      id: 4,
      nombre: "Willy",
      apellido: "Sterling",
      email: "wsterling3@blogspot.com",
    },
    {
      id: 5,
      nombre: "Wes",
      apellido: "Chaffin",
      email: "wchaffin4@myspace.com",
    },
    {
      id: 6,
      nombre: "Martyn",
      apellido: "Nicholson",
      email: "mnicholson5@dmoz.org",
    },
    {
      id: 7,
      nombre: "Lannie",
      apellido: "Gallatly",
      email: "lgallatly6@senate.gov",
    },
    {
      id: 8,
      nombre: "Mirella",
      apellido: "De Ruel",
      email: "mderuel7@facebook.com",
    },
    {
      id: 9,
      nombre: "Sunny",
      apellido: "Stening",
      email: "sstening8@odnoklassniki.ru",
    },
    {
      id: 10,
      nombre: "Newton",
      apellido: "Hatchman",
      email: "nhatchman9@ebay.co.uk",
    },
    { id: 11, nombre: "Karalee", apellido: "Ogle", email: "koglea@ted.com" },
    {
      id: 12,
      nombre: "Tobye",
      apellido: "Hefner",
      email: "thefnerb@goo.ne.jp",
    },
    { id: 13, nombre: "Krissie", apellido: "Pimm", email: "kpimmc@jugem.jp" },
    {
      id: 14,
      nombre: "Hadley",
      apellido: "Bouller",
      email: "hboullerd@elpais.com",
    },
    {
      id: 15,
      nombre: "Elizabet",
      apellido: "Shevlan",
      email: "eshevlane@wufoo.com",
    },
    {
      id: 16,
      nombre: "Gris",
      apellido: "Karpenko",
      email: "gkarpenkof@buzzfeed.com",
    },
    {
      id: 17,
      nombre: "Ermina",
      apellido: "Morecombe",
      email: "emorecombeg@dagondesign.com",
    },
    {
      id: 18,
      nombre: "Florrie",
      apellido: "Roylance",
      email: "froylanceh@yahoo.co.jp",
    },
    {
      id: 19,
      nombre: "Jessi",
      apellido: "Scarrisbrick",
      email: "jscarrisbricki@rambler.ru",
    },
    {
      id: 20,
      nombre: "Lura",
      apellido: "Questier",
      email: "lquestierj@howstuffworks.com",
    },
  ];

  function sleep(s) {
    return new Promise((res) => setTimeout(res, s));
  }

  let promesa = ajax();
  let users = [];
  const url = "https://jsonplaceholder.typicode.com/users";

  async function ajax() {
    const res = await fetch(url);
    users = await res.json();
    await sleep(3000);
    if (res.ok) {
      return users;
    } else {
      throw new Error("Error al conectar con la api");
    }
  }
</script>

<main>
  <h1>DATABINGING</h1>
  <h2>{nombre}</h2>
  <input type="text" bind:value={nombre} />
  <hr />
  Valor 1<input type="range" bind:value={v1} />
  Valor 2 <input type="range" bind:value={v2} />
  <p>{v1} + {v2} = {v1 + v2}</p>
  <hr />
  Habilitar botón<input type="checkbox" bind:checked={check} />
  <button disabled={!check}>Guardar</button>
  <h1>ONCLICK</h1>
  <button on:click={alerta1}>Alerta 1</button>
  <button on:click={alerta2}>Alerta 2</button>
  <button on:click={() => alert("alerta 3")}>Alerta 3</button>
  <hr />
  <h1>VARIABLES REACTIVAS</h1>
  <button on:click={() => (contador += 1)}>Contador</button>
  <p>Contador: {contador}, Resultado x 10 {resultado}</p>
  <p>{texto}</p>
  <hr />
  <h1>BLOQUE IF</h1>
  {#if login}
    <h2>Estas logeado</h2>
  {:else}
    <h2>Iniciar sesión</h2>
  {/if}
  <button on:click={cambio}> Login</button>

  <hr />
  <h1>BLOQUE EACH</h1>
  <ul>
    {#each nombres as nombre, i}
      <li>{i + 1} {nombre}</li>
    {/each}
  </ul>
  <hr />
  <table align="center">
    <th>Nombre</th>
    <th>Apellido</th>
    <th>Email</th>
    {#each personas as item}
      <tr>
        <td>{item.nombre}</td>
        <td>{item.apellido}</td>
        <td>{item.email}</td>
      </tr>
    {:else}
      <tr>
        <td colspan="3">La api no tiene datos</td>
      </tr>
    {/each}
  </table>
  <hr />
  <h1>BLOQUE AWAIT</h1>
  {#await promesa}
    <p>Cargando api...</p>
  {:then usuarios}
    {#each usuarios as item}
      <li>{item.name}</li>
    {/each}
  {:catch error}
    <p style="color:red;">{error}</p>
  {/await}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
