<script>
  export let title, date;
</script>

<h1>{title}</h1>
<p class="date">{date}</p>
<slot />

<style>
  .date {
    font-size: 1rem;
    color: var(--text-light);
  }
</style>
