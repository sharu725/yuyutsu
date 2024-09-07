<script>
  import "$lib/css/global.css";
  import SidebarToggle from "$lib/components/SidebarToggle.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import { isSidebarOpen } from "$lib/stores";
  import Header from "$lib/components/Header.svelte";
</script>

<div class="wrapper overflow-hidden">
  <Sidebar />
  <main class:show={$isSidebarOpen}>
    <SidebarToggle />
    <Header />
    <div class="container">
      <slot />
    </div>
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

  .container {
    margin: 2rem auto;
  }
</style>
