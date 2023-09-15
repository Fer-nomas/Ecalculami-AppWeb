<script>
  import exportExcel from "../Excel/index";
</script>

<header
  class="h-20 w-[97%] bg-sky-600 m-5 mb-0 rounded-lg flex justify-center items-center"
>
  <img
    class="h-10 m-4"
    src="https://storage.googleapis.com/cms-storage-bucket/0dbfcc7a59cd1cf16282.png"
    alt="logo ecalculami"
  />
  <h1 class="text-2xl text-white">Ecalculami App</h1>
  <button
    on:click={exportExcel}
    class=" absolute right-10 flex bg-transparent m-2 p-4 h-8 rounded-3xl justify-center items-center border-2 border-transparent bg-white text-black text-[10px] hover:bg-transparent hover:border-slate-900 hover:text-white"
    style="cursor: pointer;">Descargar excel</button
  >
</header>
