<script>
  import { MESES, calculoDeFactura } from "../functions";
  export let item;
  let ciclo =
    "0" + (MESES.indexOf(item.month.trim().toLowerCase()) + 1) + "-2023";
  let fecha =
    "01-" +
    "0" +
    (MESES.indexOf(item.month.trim().toLowerCase()) + 1) +
    "-2023";
  let vencimiento =
    "10-" +
    "0" +
    (MESES.indexOf(item.month.trim().toLowerCase()) + 1) +
    "-2023";
  console.log(item);
</script>

<div class="border-2 border-black w-[600px] h-[400px] m-2 p-4">
  <header class="h-1/4 bg-red-800 border-b-4 border-black" />
  <main class="h-3/4 bg-yellow-600 flex flex-wrap">
    <div
      class="w-2/3 h-1/2 bg-blue-600 [&>*]:px-4 [&>*]:font-normal flex flex-col justify-around"
    >
      <p>Fecha: {fecha}</p>
      <p>Usuario: {item.name}</p>
      <p>Direccion: {item.medi}</p>
    </div>
    <div
      class="w-1/3 h-1/2 bg-violet-900 [&>*]:px-4 [&>*]:font-normal flex flex-col justify-around"
    >
      <p>Vencimiento: {vencimiento}</p>
      <p>C.I/RUC:</p>
      <p>TEL:</p>
    </div>
    <div
      class="w-1/2 h-1/2 bg-gray-700 [&>*]:px-4 [&>*]:font-normal flex flex-col justify-around border-2 border-black"
    >
      <p>Ciclo: {ciclo}</p>
      <p>Lectura Anterior: {item.prevCons ? item.prevCons : "--"}</p>
      <p>Lectura Actual: {item.cons}</p>
      <div class="flex">
        Minimo 15
        <p class="mx-6">Exceso: {item.excess}</p>
        <p class="mx-6">Total: {item.bill == "No hay" ? "--" : item.bill}</p>
      </div>
    </div>
    <div
      class="w-1/2 h-1/2 bg-orange-500 [&>*]:px-4 [&>*]:font-normal flex flex-row justify-around border-t-2 border-b-2 border-r-2 border-black"
    >
      <div class="flex flex-col justify-around">
        <p>Monto Minimo a Pagar:</p>
        <p>Consumo en Exceso:</p>
        <p>Deuda anterior:</p>
        <p>Total a pagar:</p>
      </div>
      <div class="flex flex-col justify-around items-end">
        <p>25.000 Gs.</p>
        <p>{item.excess * 2 ? item.excess * 2 + ".000" : "--"} Gs.</p>
        <p>-- Gs.</p>
        <p>{calculoDeFactura(item.bill)}.</p>
      </div>
    </div>
  </main>
</div>
