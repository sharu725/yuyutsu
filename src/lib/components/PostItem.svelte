<script>
  import Categories from "$lib/components/Categories.svelte";
  export let post;
  const { title, description, slug, categories, image } = post;
</script>

<div class="post-item">
  <a sveltekit:prefetch class="title" href="/posts/{slug}"><h2>{title}</h2></a>
  <img src={image} alt={title} />
  <Categories {categories} />
  <p>{description}</p>
</div>

<style>
  .post-item {
    margin-bottom: 3rem;
  }
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
