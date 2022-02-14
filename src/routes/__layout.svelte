<script>
  import "../../static/reset.css";
  import "../../static/global.css";
  import SidebarToggle from "$lib/SidebarToggle.svelte";
  import Sidebar from "$lib/Sidebar.svelte";
  import { isSidebarOpen } from "$lib/stores";
</script>

<div class="wrapper overflow-hidden">
  <Sidebar />
  <main class:show={$isSidebarOpen}>
    <SidebarToggle />
    <div class="header-container">
      <header class="container">
        <h1>The site title</h1>
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
