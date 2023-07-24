<script>
  import Data from "./Data.svelte";
  export let task;
  export let year;
  export let month;
</script>

{#if task.medi == year && year !== null}
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
