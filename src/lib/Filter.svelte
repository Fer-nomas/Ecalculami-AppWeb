<script>
  import Data from "./Data.svelte";
  export let task;
  export let year;
  export let month;
  let diferenciaConsumo = [];
</script>

{#if task.medi.includes(year) && year !== null}
  {#if task.month.toLowerCase().trim() === month}
    <Data {task} />
  {:else if month == "" || month == "ninguno"}
    <Data {task} />
  {/if}
{:else if year == null}
  {#if task.month.toLowerCase().trim() === month}
    <Data {task} />
  {:else if month == "" || month == "ninguno"}
    <Data {task} />
  {/if}
{/if}
