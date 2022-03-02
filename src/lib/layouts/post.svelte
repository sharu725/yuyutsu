<script>
  import Seo from "$lib/components/Seo.svelte";
  export let title, description, date, edit;
  const seo = {
    title,
    description,
  };
</script>

<Seo {...seo} />

<h1>{title}</h1>
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
</style>
