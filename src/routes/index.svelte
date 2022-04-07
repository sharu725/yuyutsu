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
  import { paginate, PaginationNav } from "svelte-paginate";
  import "../../static/pagination.css";
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
  <PostItem {post} />
{/each}

<PaginationNav
  totalItems={items.length}
  {pageSize}
  {currentPage}
  limit={1}
  showStepOptions={true}
  on:setPage={(e) => (currentPage = e.detail.page)}
/>
