<script>
  import { api } from "./api-store.js";
</script>

<table class="table table-striped">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    {#each $api as item}
      <tr>
        <td>{item.name}</td>
        <td>{item.email}</td>
      </tr>
    {/each}
  </tbody>
</table>
