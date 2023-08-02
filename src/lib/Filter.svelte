<script>
  import Data from "./Data.svelte";
  export let task;
  export let year;
  export let month;
  export let value;
  export let printTasks;
  let newPrintTasks = [];

  function test() {
    if (task.name.toLowerCase().trim().includes(value.trim().toLowerCase())) {
      if (task.medi == year && year !== null) {
        if (task.month.toLowerCase().trim() === month) {
          printTasks.push(task);
        } else if (month == "" || month == "ninguno") {
          printTasks.push(task);
        }
      } else if (year == null) {
        if (task.month.toLowerCase().trim() === month) {
          printTasks.push(task);
        } else if (month == "" || month == "ninguno") {
          printTasks.push(task);
        }
      }
    }
  }

  $: {
    if (value != "" || year != "" || month != "") {
      printTasks = [];
      test();
      // @ts-ignore
      if (printTasks[0] != []) {
        newPrintTasks.push(printTasks[0]);
        printTasks = [];
      }
    }
  }
</script>

{#if task.name.toLowerCase().trim().includes(value.toLowerCase().trim())}
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
{/if}
