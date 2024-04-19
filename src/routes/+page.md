---
layout: page
title: Our Vizz
description: "AMCAT Exam Visualisations"
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

<div class="post-container">
  {#each $paginatedPosts as post}
    <PostItem {post} />
  {/each}
</div>

<style>
  .post-container {
    display: flex;
  }

   @media (max-width: 768px) {
    .post-container {
      flex-wrap: wrap;
    }
  }
</style>

<Pagination items={posts} itemsPerPage={3} />
