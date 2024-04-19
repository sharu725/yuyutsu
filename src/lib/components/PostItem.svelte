<script>
  import Categories from "$lib/components/Categories.svelte";
  export let post;
  $: ({ title, description, slug, categories, image } = post);
</script>

<div class="post-item grid grid-cols-3 w-full max-w-3xl">
  <div class="col-span-3 align-start">
    <a data-sveltekit-prefetch class="title" href="/posts/{slug}">
      <h2 class="text-2xl font-bold mb-2 text-center">{title}</h2>
    </a>
  </div>
  <div class="col-span-3 align-start mb-4">
    <div class="w-full">
      <a data-sveltekit-prefetch class="title" href="/posts/{slug}">
        <img class="w-full max-w-lg h-auto mx-auto" src={image} alt={title} />
      </a>
    </div>
  </div>
  <div class="col-span-3 align-start">
    <Categories {categories} />
    <a data-sveltekit-prefetch class="title" href="/posts/{slug}">
      <p class="text-gray-700 m-3">{description}</p>
    </a>
  </div>
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
  img {
    object-fit: cover;
    object-position: center;
  }
  @media screen and (max-width: 768px) {
    img {
      height: 200px;
      object-fit: contain;
      object-position: center;
    }
  }
</style>
