<script>
  export let info;
  const decodedData = decodeURIComponent(info);
  const task = JSON.parse(decodedData);
</script>

<h1>siiii</h1>
{#each task as item}
  {item.name}
{/each}
