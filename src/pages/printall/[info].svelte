<script>
  import BillPrinted from "../../lib/BillPrinted.svelte";

  export let info;
  const decodedData = decodeURIComponent(info);
  const task = JSON.parse(decodedData);
  setTimeout(() => {
    window.print();
  }, 200);
</script>

<div class="flex justify-center items-center flex-col">
  {#each task as item}
    <BillPrinted {item} />
  {/each}
</div>
