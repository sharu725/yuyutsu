<script>
  import Categories from "$lib/components/Categories.svelte";
  export let post;
  const { title, description, slug, categories } = post;
</script>

<a sveltekit:prefetch class="title" href="/posts/{slug}"><h2>{title}</h2></a>
<Categories {categories} />
<p>{description}</p>
<p class="read-more">
  <a sveltekit:prefetch href="/posts/{slug}">Read More</a>
</p>

<style>
  .title {
    text-decoration: none;
  }
  h2 {
    font-size: 1.5rem;
  }
  p {
    text-align: justify;
  }
  .read-more {
    display: flex;
  }
  .read-more a {
    margin-left: auto;
    font-size: 1rem;
  }
</style>
