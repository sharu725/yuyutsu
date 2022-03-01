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
  export let posts;
</script>

{#each posts as post}
  <a sveltekit:prefetch class="title" href="/posts/{post.slug}"><h2>{post.title}</h2></a>
  <p>{post.description}</p>
  <p class="read-more"><a sveltekit:prefetch href="/posts/{post.slug}">Read More</a></p>
{/each}

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
