<script context="module">
  export const load = async ({ fetch }) => {
    // Use a `limit` querystring parameter to fetch a limited number of posts
    // e.g. fetch('posts.json?limit=5') for 5 most recent posts
    const res = await fetch("/api/posts.json");
    const posts = await res.json();

    return {
      stuff: {
        posts,
      },
    };
  };
</script>

<script>
  import "../../static/reset.css";
  import "../../static/global.css";
  import SidebarToggle from "$lib/components/SidebarToggle.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import { isSidebarOpen } from "$lib/stores";
  import SvelteTheme from "svelte-themes/SvelteTheme.svelte";
  import Header from "$lib/components/Header.svelte";
</script>

<div class="wrapper overflow-hidden">
  <Sidebar />
  <main class:show={$isSidebarOpen}>
    <SidebarToggle />
    <Header />
    <article class="container">
      <slot />
    </article>
  </main>
</div>

<SvelteTheme />

<style>
  .wrapper {
    display: flex;
    overflow: hidden;
  }
  main {
    width: 100%;
  }

  article {
    margin: 2rem auto;
  }
  .show {
    transform: translateX(18rem);
  }

  @media screen and (max-width: 800px) {
    .show {
      transform: translateX(14rem);
    }
  }
</style>
