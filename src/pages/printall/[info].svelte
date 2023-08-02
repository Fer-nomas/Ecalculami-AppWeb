<script>
  import BillPrinted from "../../lib/BillPrinted.svelte";

  export let info;
  const decodedData = decodeURIComponent(info);
  const task = JSON.parse(decodedData);
  function name(params) {
    window.print();
  }
</script>

<div on:click={name} class="flex justify-center items-center flex-col">
  {#each task as item}
    <BillPrinted {item} />
  {/each}
</div>
