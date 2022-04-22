<script>
  import Seo from "$lib/components/Seo.svelte";
  import { siteTitle } from "$lib/constants";
  export let title, description;
  const seo = {
    title: `${title} | ${siteTitle}`,
    description,
  };
</script>

<Seo {...seo} />

<h1>{title}</h1>
<slot />
