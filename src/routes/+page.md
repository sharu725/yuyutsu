---
layout: page
title: Home
description: "A minimal Sveltekit theme with a sidebar."
---

<script>
  import PostItem from "$lib/components/PostItem.svelte";
  import Pagination from "$lib/components/Pagination/Pagination.svelte";
  import { paginatedPosts } from "$lib/components/Pagination/paginatedPosts";
  import Seo from "$lib/components/Seo.svelte";
  import { siteTitle, siteDescription } from "$lib/constants";
  
  export let data;

  $: ({ posts } = data);
</script>

{#each $paginatedPosts as post}
  <PostItem {post} />
{/each}

<Pagination items={posts} itemsPerPage={2} />
