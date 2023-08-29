<script>
  import { startFetch, newTasks } from "../functions";
  import Filter from "./Filter.svelte";
  import { url } from "@roxi/routify";

  export let value = "";
  export let month = "";
  export let year = null;
  export let printTasks = [];

  startFetch();

  setInterval(() => {
    if (month == "") {
      month = "ninguno";
      verificacionFiltro();
    }
    if (month == "ninguno" && year == null && value == "") {
      month = "ninguno";
      verificacionFiltro();
    }
  }, 100);

  function verificacionFiltro(e) {
    printTasks = [];
    for (let i = 0; i < newTasks.length; i++) {
      if (e === undefined) printTasks.push(newTasks[i]);
      else if (
        newTasks[i].name.toLowerCase().trim().includes(e.target.value) ||
        value.trim().toLowerCase() === ""
      ) {
        if (newTasks[i].medi == year && year !== null) {
          if (newTasks[i].month.toLowerCase().trim() === month) {
            printTasks.push(newTasks[i]);
          } else if (month == "" || month == "ninguno") {
            printTasks.push(newTasks[i]);
          }
        } else if (year == null) {
          if (newTasks[i].month.toLowerCase().trim() === month) {
            printTasks.push(newTasks[i]);
          } else if (month == "" || month == "ninguno") {
            printTasks.push(newTasks[i]);
          }
        }
      }
    }
  }
</script>

<div class="flex flex-col">
  <div
    class="bg-blue-300 h-20 w-[97%] border-r-2 shadow-xl mr-5 ml-5 rounded-lg flex justify-center items-center"
  >
    <form
      class="bg-white h-10 m-2 flex items-center justify-center p-2 rounded-3xl"
      on:submit|preventDefault
    >
      <input
        on:input={verificacionFiltro}
        bind:value
        name="buscar"
        placeholder="Buscar"
        class="outline-none font-normal w-60"
        id="nombre-buscador"
      />
      <button class="flex justify-center"
        ><span class="material-symbols-outlined"> search </span>
      </button>
    </form>
    <div class=" flex justify-center items-center">
      <form
        class="flex h-10 rounded-3xl p-2 m-2 bg-white justify-center items-center"
      >
        <span>Mes: </span>
        <select
          name="lenguajes"
          id="lang"
          class=" pl-1 outline-none border-0 border-transparent"
          contenteditable="true"
          bind:innerHTML={month}
          on:input={verificacionFiltro}
        >
          <option disabled selected>Elija un mes</option>
          <option value="ninguno">Ninguno</option>
          <option value="enero">Enero</option>
          <option value="febrero">Febrero</option>
          <option value="marzo">Marzo</option>
          <option value="abril">Abril</option>
          <option value="mayo">Mayo</option>
          <option value="junio">Junio</option>
          <option value="julio">Julio</option>
          <option value="agosto">Agosto</option>
          <option value="septiembre">Septiembre</option>
          <option value="octubre">Octubre</option>
          <option value="noviembre">Noviembre</option>
          <option value="diciembre">Diciembre</option>
        </select>
      </form>
      <form
        class="flex bg-white m-2 p-2 h-10 rounded-3xl justify-center items-center"
      >
        <span>N° Medidor:</span>
        <input
          class="outline-none pl-1"
          type="number"
          bind:value={year}
          on:input={verificacionFiltro}
        />
      </form>
    </div>

    <a
      href={$url("./printall/:info", { info: JSON.stringify(printTasks) })}
      class=" absolute right-10 flex bg-transparent m-2 p-4 h-8 rounded-3xl justify-center items-center border-2 border-transparent bg-white text-black text-[10px] hover:bg-transparent hover:border-slate-900 hover:text-white"
      style="cursor: pointer;"
    >
      Imprimir Todo
    </a>
  </div>

  <div class="flex flex-col h-screen w-[98%] mr-5 ml-5 rounded-lg">
    <div>
      <div
        class=" text-black p-2 m-4 text-4xl border-b-2 border-slate-600 items-center justify-center"
      >
        Consulte las Facturas...
      </div>
    </div>
    <div class="flex flex-wrap items-center justify-center">
      {#each newTasks as task}
        <Filter {task} {year} {month} {printTasks} {value} />
      {/each}
    </div>
  </div>
</div>
