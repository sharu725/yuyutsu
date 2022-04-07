<script>
  export let categories;
</script>

<ul class="categories">
  {#each categories as category}
    <li>
      <a href={`/categories/${category}`}>{category}</a>
    </li>
  {/each}
</ul>

<style>
  .categories {
    display: flex;
    margin-bottom: 1rem;
  }
  .categories a {
    margin-right: 1rem;
    padding: 0.05rem 0.5rem;
    border-radius: 0.2rem;
    color: white;
    background: rgb(114, 114, 114);
    text-decoration: none;
    font-size: 1rem;
    font-weight: 300;
  }
  .categories a:hover {
    background-color: rgb(139, 139, 139);
  }
</style>
