<script>
  import Seo from "$lib/components/Seo.svelte";
  export let title, description;
  const seo = {
    title,
    description,
  };
</script>

<Seo {...seo} />

<h1>{title}</h1>
<slot />
