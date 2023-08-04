<script>
  import BillPrinted from "../../lib/BillPrinted.svelte";
  import { url } from "@roxi/routify";

  export let info;
  const decodedData = decodeURIComponent(info);
  const task = JSON.parse(decodedData);
  setTimeout(() => {
    window.print();
  }, 200);
</script>

<a href={$url("/")} class="flex justify-center items-center flex-col">
  {#each task as item}
    <BillPrinted {item} />
  {/each}
</a>
