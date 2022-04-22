---
layout: page
title: Home
description: "A minimal Sveltekit theme with a sidebar."
---

<script context="module">
  export const load = async ({ stuff }) => {
    const { posts } = stuff;

    return {
      props: {
        posts,
      },
    };
  };
</script>

<script>
  import PostItem from "$lib/components/PostItem.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import { siteTitle, siteDescription } from "$lib/constants";
  export let posts;
</script>

{#each posts as post}
<PostItem {post} />
{/each}
