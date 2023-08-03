<script>
  import BillPrinted from "../../lib/BillPrinted.svelte";

  export let info;
  const decodedData = decodeURIComponent(info);
  const item = JSON.parse(decodedData);
  setTimeout(() => {
    window.print();
  }, 200);
</script>

<div class="flex items-center justify-center flex-col">
  <BillPrinted {item} />
</div>
