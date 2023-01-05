<script>
  import { paginatedPosts } from "./paginatedPosts";

  export let items = [];
  export let currentPage = 1;
  export let itemsPerPage = 1;

  let numberOfPages = Math.ceil(items.length / itemsPerPage);

  const paginate = (array, page_size, page_number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  };

  $: $paginatedPosts = paginate(items, 2, currentPage);
</script>

<nav>
  <ul>
    {#each Array(numberOfPages) as _, index}
      <li>
        <button
          class:active={currentPage == index + 1}
          on:click={() => (currentPage = index + 1)}>{index + 1}</button
        >
      </li>
    {/each}
  </ul>
</nav>

<style>
  ul {
    display: flex;
    place-content: center;
  }
  li {
    margin-right: 2px;
  }
  .active {
    color: white;
    background-color: var(--sidebar-bg);
  }
</style>
