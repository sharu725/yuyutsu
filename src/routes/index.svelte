<script context="module">
  export const load = async ({ fetch }) => {
    // Use a `limit` querystring parameter to fetch a limited number of posts
    // e.g. fetch('posts.json?limit=5') for 5 most recent posts
    const res = await fetch("/api/posts.json");
    const posts = await res.json();

    return {
      props: {
        posts,
      },
    };
  };
</script>

<script>
  import Seo from "$lib/components/Seo.svelte";
  import { siteTitle, siteDescription } from "$lib/constants";
  import { paginate, PaginationNav } from "svelte-paginate";
  import "../../static/pagination.css"
  export let posts;

  const seo = {
    title: siteTitle,
    description: siteDescription,
  };

  let items = posts.reverse();
  let currentPage = 1;
  let pageSize = 2;
  $: paginatedItems = paginate({ items, pageSize, currentPage });
</script>

<Seo {...seo} />

{#each paginatedItems as post}
  <a sveltekit:prefetch class="title" href="/posts/{post.slug}"
    ><h2>{post.title}</h2></a
  >
  <p>{post.description}</p>
  <p class="read-more">
    <a sveltekit:prefetch href="/posts/{post.slug}">Read More</a>
  </p>
{/each}

<PaginationNav
  totalItems={items.length}
  {pageSize}
  {currentPage}
  limit={1}
  showStepOptions={true}
  on:setPage={(e) => (currentPage = e.detail.page)}
/>

<style>
  .title {
    text-decoration: none;
  }
  h2 {
    font-size: 2rem;
  }
  p {
    text-align: justify;
  }
  .read-more {
    display: flex;
  }
  .read-more a {
    margin-left: auto;
    font-size: 1rem;
  }
</style>
