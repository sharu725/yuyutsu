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
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 300;
    box-shadow: inset 0 0 5px var(--text-light);
    transition-duration: 300ms;
  }
  .categories a:hover {
    color: white;
    background-color: rgb(139, 139, 139);
  }
</style>
