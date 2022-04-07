<script context="module">
  export const load = async ({ stuff, params }) => {
    const { slug } = params;
    const { posts } = stuff;
    const title = slug;
    const filteredPosts = posts.filter((post) => {
      return post.categories.includes(slug);
    });

    return {
      props: {
        posts: filteredPosts,
        title,
      },
    };
  };
</script>

<script>
  import PostItem from "$lib/components/PostItem.svelte";
  import { siteTitle } from "$lib/constants";
  export let posts, title;
</script>

<h1>Category: {title}</h1>
{#each posts as post}
  <PostItem {post} />
{/each}

<svelte:head>
  <title>{title} | {siteTitle}</title>
  <meta name="description" content="Categories are found here" />
</svelte:head>

<style>
  h1 {
    text-transform: capitalize;
  }
  @media screen and (max-width: 600px) {
    h1 {
      font-size: 2rem;
    }
  }
</style>
