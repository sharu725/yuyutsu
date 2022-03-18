<script>
  export let items, currentPage, itemsPerPage;

  let numberOfPages = Math.ceil(items.length / itemsPerPage);

</script>

<nav>
  <ul>
    {#each Array(numberOfPages) as page, index}
      <li>
        <button on:click={() => (currentPage = index + 1)}>{index + 1}</button>
      </li>
    {/each}
  </ul>
</nav>

<style>
  ul {
    display: flex;
  }
</style>
