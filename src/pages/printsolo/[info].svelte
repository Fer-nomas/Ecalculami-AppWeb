<script>
  import BillPrinted from "../../lib/BillPrinted.svelte";
  import { url } from "@roxi/routify";

  export let info;
  const decodedData = decodeURIComponent(info);
  const item = JSON.parse(decodedData);
  setTimeout(() => {
    window.print();
  }, 200);
</script>

<a href={$url("/")} class="h-screen flex items-center flex-col">
  <BillPrinted {item} />
</a>
