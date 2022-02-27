<script>
  import { footerText } from "$lib/constants";
  const date = new Date();
  const year = date.getFullYear();
</script>

<p>© {year}. {footerText}</p>

<style>
  p {
    color: #ddd;
    font-size: 0.9rem;
  }
</style>
