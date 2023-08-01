<script>
  // @ts-nocheck
  import { db } from "../firebase";
  import { updateDoc, doc } from "firebase/firestore";
  import Swal from "sweetalert2";
  import { url } from "@roxi/routify";
  export let task;

  let diferenciaConsumo = [];
  let guaranies;

  async function paidBill(currentTask) {
    if (currentTask.paid == false) {
      const { value: bill } = await Swal.fire({
        title: "Factura",
        text: "Esta factura esta a punto de ser pagada!",
        footer: "Estas seguro de realizar esta accion?",
        icon: "warning",
        confirmButtonText: "Pagar",
        confirmButtonColor: "rgb(59 130 246)",
        showCloseButton: true,
      });

      let currentId = currentTask.id;
      let updateTask = {
        name: currentTask.name,
        medi: currentTask.medi,
        cons: currentTask.cons,
        month: currentTask.month,
        paid: true,
      };

      if (bill === true) {
        await updateDoc(doc(db, "2023", currentId), updateTask);
      }
    } else {
      await Swal.fire({
        title: "Factura",
        text: "Esta factura ya fue pagada!",
        icon: "success",
        confirmButtonText: "Confirmar",
        confirmButtonColor: "rgb(59 130 246)",
        showCloseButton: true,
      });
    }
  }

  function calculoDeFactura(bill) {
    if (bill <= 15) {
      guaranies = "25.000 Gs";
      return guaranies;
    } else if (bill == "No hay mes anterior") {
      guaranies = "No hay";
      return guaranies;
    } else if (bill > 15) {
      let resta = bill - 15;
      let extra = resta * 2;
      let total = extra + 15;
      guaranies = `${total}.000 Gs`;
      return guaranies;
    }
  }
</script>

<div
  class=" bg-blue-500 rounded-2xl overflow-hidden flex flex-col m-2 w-[250px] p-8 [&>*]:p-2 [&>*]:text-xs [&>*]:text-white [&>*]:border-b-2 [&>*]:border-slate-100 [&>*]:m-2"
>
  <div class="text-3xl text-center" style="font-size: 20px; margin:0px;">
    Factura
  </div>
  <div>Nombre: {task.name}</div>
  <div>Medidor: {task.medi}</div>
  <div>Mes: {task.month}</div>
  <div>Consumo: {task.cons}</div>
  <div>Uso: {task.bill}</div>
  <div>Pago: {calculoDeFactura(task.bill)}</div>
  <div class="flex flex-col items-start gap-2 p-8" style="border: none">
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a
      href={$url("./printsolo/:info", { info: JSON.stringify(task) })}
      class="flex justify-center bg-white text-black rounded-2xl w-[100%] p-2 border-2 border-transparent hover:bg-transparent hover:border-white hover:text-white"
      >Imprimir</a
    >
    {#if task.paid === true}
      <button
        on:click={paidBill(task)}
        class="bg-green-700 rounded-2xl w-[100%] p-2 border-2 border-transparent hover:bg-transparent hover:border-green-700 hover:text-green-700"
        >Pagado</button
      >
    {:else}
      <button
        on:click={paidBill(task)}
        class="bg-red-700 rounded-2xl w-[100%] p-2 border-2 border-transparent hover:bg-transparent hover:border-red-700 hover:text-red-700"
        >Requerido</button
      >
    {/if}
  </div>
</div>
