<script>
  import "../../static/reset.css";
  import "../../static/global.css";
  import SidebarToggle from "$lib/components/SidebarToggle.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import { isSidebarOpen } from "$lib/stores";
  import { base } from "$app/paths";
  import { siteTitle } from "$lib/constants";
</script>

<div class="wrapper overflow-hidden">
  <Sidebar />
  <main class:show={$isSidebarOpen}>
    <SidebarToggle />
    <div class="header-container">
      <header class="container">
        <a sveltekit:prefetch href="{base}/"><h1>{siteTitle}</h1></a>
      </header>
    </div>
    <article class="container">
      <slot />
    </article>
  </main>
</div>

<style>
  .wrapper {
    display: flex;
    overflow: hidden;
  }
  main {
    width: 100%;
  }
  .header-container {
    border-bottom: 1px solid #ddd;
  }
  header h1 {
    font-size: 2.25rem;
    margin: 1rem 0;
  }

  header a {
    text-decoration: none;
  }
  article {
    margin: 2rem auto;
  }
  .show {
    transform: translateX(18rem);
  }

  @media screen and (max-width: 800px) {
    header h1 {
      text-align: center;
    }
    .show {
      transform: translateX(14rem);
    }
  }
</style>
