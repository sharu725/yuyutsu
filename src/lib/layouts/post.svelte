<script>
  import Seo from "$lib/components/Seo.svelte";
  import Categories from "$lib/components/Categories.svelte";
  export let title, description, date, categories, edit;
  const seo = {
    title,
    description,
  };
</script>

<Seo {...seo} />

<h1>{title}</h1>
<Categories {categories} />
<p class="date">{date}</p>
<slot />
<p class="edit"><a href={edit} target="_blank">Edit this page</a></p>

<style>
  .date {
    font-size: 1rem;
    color: var(--text-light);
  }
  .edit {
    display: flex;
  }
  .edit a {
    margin-left: auto;
  }

  @media screen and (max-width: 600px) {
    h1 {
      font-size: 2rem;
    }
  }
</style>
