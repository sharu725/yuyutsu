---
layout: page
title: Categories
description: All categories in one place
---

<script context="module">
  export const load = async ({ stuff }) => {
    const { posts } = stuff;

    // https://dmitripavlutin.com/javascript-array-group/
    const groupByCategory = posts.reduce((group, post) => {
      const { categories } = post;
      for (let category of categories) {
        group[category] = group[category] ?? [];
        group[category].push(post);
      }
      return group;
    }, {});

    const groupedPosts = Object.entries(groupByCategory);

    return {
      props: {
        groupedPosts,
      },
    };
  };
</script>


<script>
  import PostItem from "$lib/components/PostItem.svelte";
  export let groupedPosts;
</script>

<h1>Categories</h1>

{#each groupedPosts as [category, posts]}

  <div class="category-container">
    <h2>{category}:</h2>
    <div class="grid">
      {#each posts as post}
        <PostItem {post} />
      {/each}
    </div>
  </div>
{/each}

<style>
  .category-container {
    border: 1px solid var(--bg-light);
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
  }
  h2 {
    text-transform: capitalize;
  }

  @media screen and (max-width: 600px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
