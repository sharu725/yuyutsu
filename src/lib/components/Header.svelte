<script>
  import { base } from "$app/paths";
  import { siteTitle } from "$lib/constants";
</script>

<div class="header-container">
  <header class="container">
    <a sveltekit:prefetch href="{base}/"><h1>{siteTitle}</h1></a>
  </header>
</div>

<style>
  .header-container {
    border-bottom: 1px solid var(--text-light);
  }
  header h1 {
    font-size: 2rem;
    margin: 0.5rem 0;
    font-weight: 600;
    text-align: center;
  }

  header a {
    text-decoration: none;
  }

  @media screen and (max-width: 800px) {
    header h1 {
      text-align: center;
    }
  }
</style>
