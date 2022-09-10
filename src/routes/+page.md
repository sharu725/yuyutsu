---
layout: page
title: Home
description: "A minimal Sveltekit theme with a sidebar."
---

<script>
  import PostItem from "$lib/components/PostItem.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import { siteTitle, siteDescription } from "$lib/constants";
  export let data;

  $: ({ posts } = data)
</script>

{#each posts as post}
<PostItem {post} />
{/each}
