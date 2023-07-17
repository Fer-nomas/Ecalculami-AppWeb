<script>
  // @ts-nocheck

  import { db } from "../firebase";
  import { collection, onSnapshot } from "firebase/firestore";
  import Filter from "./Filter.svelte";

  export let value = "";
  export let month = "";
  export let year = null;
  let tasks = [];
  let datosAnteriores = [];
  let modifiedTasks = [];
  let consumibleTasks = [];

  function mesAnterior(mes) {
    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    const indiceMes = meses.indexOf(mes);
    if (meses[indiceMes + 1] === undefined) {
      return "No hay datos anteriores";
    } else {
      return meses[indiceMes + 1];
    }
  }

  function registrarDatosAnt() {
    tasks.forEach((e) => {
      datosAnteriores.push({
        mesPast: mesAnterior(e.month),
        mediPast: e.medi,
        consPast: e.cons,
        idPast: e.id,
      });
    });
  }

  function cargarDatos() {
    let tempObj;

    for (let i = 0; i < datosAnteriores.length; i++) {
      for (let j = 0; j < tasks.length; j++) {
        if (
          tasks[j].medi.includes(datosAnteriores[i].mediPast) &&
          tasks[j].month.includes(datosAnteriores[i].mesPast)
        ) {
          tempObj = {
            id: tasks[j].id,
            medi: tasks[j].medi,
            month: tasks[j].month,
            cons: tasks[j].cons,
            name: tasks[j].name,
            paid: tasks[j].paid,
            bill: tasks[j].cons - datosAnteriores[i].consPast,
          };

          modifiedTasks.push(tempObj);
        }
      }
    }

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].month == "enero") {
        tempObj = {
          id: tasks[i].id,
          medi: tasks[i].medi,
          month: tasks[i].month,
          cons: tasks[i].cons,
          name: tasks[i].name,
          paid: tasks[i].paid,
          bill: "No hay mes anterior",
        };
        modifiedTasks.unshift(tempObj);
      }
    }
  }

  function crearApi() {
    datosAnteriores = [];
    modifiedTasks = [];
    consumibleTasks = [];

    registrarDatosAnt();

    cargarDatos();

    console.log(modifiedTasks);

    consumibleTasks = modifiedTasks.map((e) => e);
  }

  onSnapshot(collection(db, "2023"), (querySnapshot) => {
    tasks = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    crearApi();
  });
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
        bind:value
        name="buscar"
        placeholder="Buscar"
        class="outline-none font-normal w-60"
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
        <input class="outline-none pl-1" type="number" bind:value={year} />
      </form>
    </div>

    <div
      class=" absolute right-10 flex bg-transparent m-2 p-4 h-8 rounded-3xl justify-center items-center border-2 border-transparent bg-white text-black text-[10px] hover:bg-transparent hover:border-slate-900 hover:text-white"
      style="cursor: pointer;"
    >
      Imprimir Todo
    </div>
  </div>

  <div class="flex flex-col h-screen w-[98%] mr-5 ml-5 rounded-lg">
    <div>
      <div
        class="text-black p-2 m-4 text-4xl border-b-2 border-slate-600 items-center justify-center"
      >
        Consulte las Facturas...
      </div>
    </div>
    <div class="flex flex-wrap items-center justify-center">
      {#each consumibleTasks as task}
        {#if task.name
          .toLowerCase()
          .trim()
          .includes(value.toLowerCase().trim())}
          <Filter {task} {year} {month} />
        {/if}
      {/each}
    </div>
  </div>
</div>
