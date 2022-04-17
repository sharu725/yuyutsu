<script>
  import { menu } from "$lib/constants";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import themeStore, { setTheme } from "svelte-themes";

  $: pathname = $page.url.pathname;
</script>

<nav>
  <ul>
    {#each menu as { title, url, target }}
      <li>
        <a
          sveltekit:prefetch={url.match("http") ? null : true}
          class:active={url !== "/" ? pathname.match(url) : url === pathname}
          href="{base}{url}"
          {target}>{title}</a
        >
      </li>
    {/each}
    <li>
      <a
        href={"#"}
        on:click={() =>
          setTheme(`${$themeStore.theme === "dark" ? "light" : "dark"}`)}
        >{$themeStore.theme === "dark" ? "Light" : "Dark"} Mode</a
      >
    </li>
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
