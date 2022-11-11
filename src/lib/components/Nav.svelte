<script>
  import { menu } from "$lib/constants";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  // import { theme, themeChanger } from "$lib/stores";

  $: pathname = $page.url.pathname;
</script>

<nav>
  <ul>
    {#each menu as { title, url, target }}
      <li>
        <a
          rel={url.match("http") ? "noopener noreferrer" : ""}
          data-sveltekit-prefetch={url.match("http") ? null : true}
          class:active={url !== "/" ? pathname.match(url) : url === pathname}
          href="{base}{url}"
          {target}>{title}</a
        >
      </li>
    {/each}
    <!-- TODO: fix them switching without flashes -->
    <!-- <li>
      <a
        href={""}
        on:click={() => ($theme = $theme == "light" ? "dark" : "light")}
        data-change={$themeChanger}
        >{$theme == "dark" ? "Light" : "Dark"} Mode</a
      >
    </li> -->
  </ul>
</nav>

<style>
  nav ul li a {
    padding: 1rem 2rem;
    border-bottom: 1px solid var(--text-color);
  }

  nav ul li:first-child a {
    border-top: 1px solid var(--text-color);
  }

  nav ul li a:hover,
  .active {
    background-color: var(--text-color);
  }
  a {
    display: block;
    color: #ddd;
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
</style>