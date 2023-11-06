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
  let randomNumber = Math.floor(Math.random() * 9999999);
</script>

<div
  class="border-2 border-black w-[600px] h-[320px] m-[3px] p-4 items-center justify-center"
>
  <header class="flex h-1/4 border-b-4 border-black mb-2">
    <div class="h-full w-1/2 py-2 text-sm">
      Comision de Agua <br /> Fraccion "Los Naranjos" <br />Barrio San Jose -
      CDE - Py
    </div>
    <div
      class="text-sm flex flex-col justify-start py-5 items-center h-full w-1/2"
    >
      RECIBO DE PAGO DE AGUA
      <div class="flex gap-3">
        <p>N°</p>
        <p class="text-red-600">{randomNumber}</p>
      </div>
    </div>
  </header>
  <main class="h-3/4 flex flex-wrap">
    <div
      class="w-2/3 h-1/3 [&>*]:px-4 [&>*]:font-normal flex flex-col justify-around"
    >
      <p>Fecha: {fecha}</p>
      <p>Usuario: {item.name}</p>
      <p>Direccion: {item.medi}</p>
    </div>
    <div
      class="w-1/3 h-1/3 900 [&>*]:px-4 [&>*]:font-normal flex flex-col justify-around"
    >
      <p>Vencimiento: {vencimiento}</p>
      <p>C.I/RUC:</p>
      <p>TEL:</p>
    </div>
    <div
      class="w-1/2 h-1/2 0 [&>*]:px-4 [&>*]:font-normal flex flex-col justify-around border-2 border-black"
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
      class="w-1/2 h-1/2 500 [&>*]:px-4 [&>*]:font-normal flex flex-row justify-around border-t-2 border-b-2 border-r-2 border-black"
    >
      <div class="flex flex-col justify-around">
        <p>Monto Minimo:</p>
        <p>Consumo en Exceso:</p>
        <p>Deuda anterior:</p>
        <p>Total a pagar:</p>
      </div>
      <div class="flex flex-col justify-around items-end">
        <p>25.000 Gs.</p>
        <p>{item.excess * 2 ? item.excess * 2 + ".000" : "--"} Gs.</p>
        <p>{item.debit ? item.debit : "0"}</p>
        <p>{calculoDeFactura(item.bill)}.</p>
      </div>
    </div>
  </main>
</div>
