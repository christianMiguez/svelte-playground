<script>
  import { push } from "svelte-spa-router";
  import { auth, db, storage } from "../firebase.js";

  import {
    onSnapshot,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
  } from "firebase/firestore";

  import {
    getDownloadURL,
    ref,
    uploadBytesResumable,
    deleteObject,
  } from "firebase/storage";

  let emailUser = "";
  let idUser = "";

  let name = "";
  let email = "";
  let idUpdate = "";
  let users = [];

  let files;
  let progress = 0;
  let imgDelete = "";

  // the following onSnapshot function is used to get the data from the database. This function is executed every time the data changes in the database.
  onSnapshot(
    collection(db, "users"),
    (snapshot) => {
      users = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    },
    (error) => {
      console.log(error);
    }
  );

  async function addUser(imageUrl, fileName) {
    try {
      await addDoc(collection(db, "users"), {
        name,
        email,
        url: imageUrl,
        fileName,
      });
      console.log("Document written");
      name = "";
      email = "";
    } catch (error) {
      console.log(error);
    }
  }

  async function addUserWithImage(url, fileName) {
    let file = "";
    if (files && files[0]) {
      file = files[0].name + Math.random().toString(30);
    }

    const storageRef = ref(storage, `images/${file}`);
    const uploadTask = uploadBytesResumable(storageRef, files[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          url = downloadURL;
          fileName = file;
          addUser(downloadURL, file);
        });
      }
    );
  }

  async function editUserWithImage(url, fileName) {
    let file = "";
    if (files && files[0]) {
      file = files[0].name + Math.random().toString(30);
    }

    const storageRef = ref(storage, `images/${file}`);
    const uploadTask = uploadBytesResumable(storageRef, files[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          deleteImg(imgDelete);
          updateUser(downloadURL, file);
        });
      }
    );
  }

  async function updateUser(url, filename) {
    const userRef = doc(db, "users", idUpdate);
    await updateDoc(userRef, {
      name,
      email,
      url,
      filename,
    });
    console.log("Document updated");
    name = "";
    email = "";
  }

  const deleteUser = async (id, fileName) => {
    try {
      await deleteDoc(doc(db, "users", id));
      deleteImg(fileName);
      console.log("Document deleted");
    } catch (error) {}
  };

  function handleSubmit(nameUser, idUser, emailUser, fileName) {
    name = nameUser;
    idUpdate = idUser;
    email = emailUser;
    imgDelete = fileName;

    return function () {
      console.log(name, idUpdate, email);
    };
  }

  function deleteImg(fileName) {
    const storageRef = ref(storage, `images/${fileName}`);
    deleteObject(storageRef)
      .then(() => {
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  auth.onAuthStateChanged((user) => {
    if (!user) {
      push("/");
    } else {
      emailUser = user.email;
      idUser = user.uid;
      console.log(emailUser, idUser);
    }
  });

  const logout = () => {
    auth.signOut();
  };
</script>

<h3>SVELTE CRUD</h3>
<main class="h-50">
  <small>Hola, {emailUser}</small>
  <hr />
  <div class="my-4 p-3 bg-light" style="min-height : 200px">
    <input type="hidden" bind:value={idUpdate} />
    <input type="text" placeholder="name" bind:value={name} />
    <input type="email" placeholder="email" bind:value={email} />
    <input type="file" bind:files />
    <button class="btn btn-primary" on:click={addUserWithImage}>Save</button>
    <button class="btn btn-warning" on:click={editUserWithImage}>Update</button>

    <hr />

    <table class="table table-striped">
      <thead>
        <th />
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th />
        <th />
      </thead>
      <tbody>
        {#each users as user}
          <tr>
            <td>
              <img
                src={user.url}
                class="rounded-circle"
                alt={user.fileName}
                width="50"
                height="50"
              />
            </td><td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <button
                class="btn btn-warning"
                on:click={handleSubmit(
                  user.name,
                  user.id,
                  user.email,
                  user.fileName
                )}>Edit</button
              ></td
            >
            <td
              ><button
                class="btn btn-danger"
                on:click={() => deleteUser(user.id, user.fileName)}
                >Delete</button
              ></td
            >
          </tr>
        {:else}
          <tr>
            <td colspan="5">No hay usuarios</td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div
      class="progress"
      role="progressbar"
      aria-label="Success example"
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div class="progress-bar bg-success" style="width: {progress}%" />
    </div>
  </div>
</main>
<button class="btn btn-danger mx-auto" on:click={logout}>Cerrar sesión</button>
