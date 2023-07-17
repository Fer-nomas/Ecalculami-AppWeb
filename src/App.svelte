<script>
  import Header from "./lib/Header.svelte";
  import Body from "./lib/Body.svelte";
</script>

<div class="h-screen w-screen">
  <Header />
  <Body />
</div>

<style>
  :global(body) {
    background-color: white;
    overflow-x: hidden;
    font-family: "Poppins", sans-serif;
    font-size: 12px;
  }
  :global(body::-webkit-scrollbar) {
    width: 8px;
    height: 8px;
    border-radius: 20px;
  }
  :global(body::-webkit-scrollbar-thumb) {
    background: #ccc;
    border-radius: 4px;
  }
  :global(body::-webkit-scrollbar-thumb:hover) {
    background: #b3b3b3;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
  }
  :global(body::-webkit-scrollbar-thumb:active) {
    background-color: #999999;
  }
</style>
