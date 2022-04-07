<script>
  import Categories from "$lib/components/Categories.svelte";
  export let post;
  const { title, description, slug, categories } = post;
</script>

<div>
  <a sveltekit:prefetch class="title" href="/posts/{slug}"><h2>{title}</h2></a>
  <Categories {categories} />
  <p>{description}</p>
</div>

<style>
  .title {
    text-decoration: none;
  }
  .title:hover {
    text-decoration: underline;
  }
  h2 {
    font-size: 1.8rem;
  }
  p {
    text-align: justify;
  }
</style>
