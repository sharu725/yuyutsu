<script>
  import { isSidebarOpen } from "$lib/stores";
</script>

<div class="sidebar" class:show={$isSidebarOpen}>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/">Home</a></li>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</div>

<style>
  .sidebar {
    position: fixed;
    left: -18rem;
    width: 18rem;
    height: 100vh;
    background-color: #222;
  }
  nav {
    padding: 2rem;
  }
  .show {
    transform: translateX(18rem);
    box-shadow: 0 10px 5px #222;
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
