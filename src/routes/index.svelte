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

  const seo = {
    title: siteTitle,
    description: siteDescription,
  };
</script>

<Seo {...seo} />

{#each posts as post}
  <PostItem {post} />
{/each}
