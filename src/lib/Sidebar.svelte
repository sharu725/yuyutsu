<script>
  import { menu } from "$lib/constants";
  import { isSidebarOpen } from "$lib/stores";
  import Footer from "$lib/Footer.svelte";
  import { base } from "$app/paths";
  import { siteTitle } from "$lib/constants";
</script>

<div class="sidebar" class:show={$isSidebarOpen}>
  <div class="wrapper">
    <h1>{siteTitle}</h1>
  </div>
  <nav>
    <ul>
      {#each menu as { title, url }}
        <li><a href="{base}{url}">{title}</a></li>
      {/each}
    </ul>
  </nav>
  <div class="wrapper">
    <Footer />
  </div>
</div>

<style>
  .sidebar {
    position: fixed;
    display: flex;
    flex-direction: column;
    left: -18rem;
    width: 18rem;
    height: 100vh;
    background-color: #222;
    font-size: 1rem;
  }
  h1 {
    color: white;
    font-weight: bold;
    font-size: 2rem;
  }
  nav ul li a {
    padding: 1rem 2rem;
    border-bottom: 1px solid #333;
  }

  nav ul li:first-child a {
    border-top: 1px solid #333;
  }

  nav ul li a:hover {
    background-color: #333;
  }
  a {
    display: block;
    color: white;
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
  .show {
    transform: translateX(18rem);
    box-shadow: 0 10px 5px #222;
  }

  .wrapper {
    padding: 2rem;
  }

  @media screen and (max-width: 800px) {
    .sidebar {
      left: -14rem;
      width: 14rem;
    }
    .show {
      transform: translateX(14rem);
    }
  }
</style>
