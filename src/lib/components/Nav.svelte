<script>
  import { menu } from "$lib/constants";
  import { base } from "$app/paths";
  import { page } from "$app/stores";

  $: pathname = $page.url.pathname;
</script>

<nav>
  <ul>
    {#each menu as { title, url, target }}
      <li>
        <a
          class:active={url == pathname}
          sveltekit:prefetch
          href="{base}{url}"
          {target}>{title}</a
        >
      </li>
    {/each}
  </ul>
</nav>

<style>
  nav ul li a {
    padding: 1rem 2rem;
    border-bottom: 1px solid #333;
  }

  nav ul li:first-child a {
    border-top: 1px solid #333;
  }

  nav ul li a:hover,
  .active {
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
</style>
