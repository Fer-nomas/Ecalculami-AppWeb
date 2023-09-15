import { db } from "./firebase";
import { collection, deleteDoc, onSnapshot, doc } from "firebase/firestore";

let datosAnteriores = [];
let tasks = [];
export let newTasks = [];
export const MESES = [
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
// async function pilin() {
//   for (let i = 0; i < tasks.length; i++) {
//     console.log(tasks);
//     if (tasks[i].medi == 58) {
//       console.log(tasks[i].id);
//       await deleteDoc(doc(db, "2023", tasks[i].id));
//     }
//   }
// }

/**
 * @param {string} mes
 */
function mesAnterior(mes) {
  const indiceMes = MESES.indexOf(mes.toLowerCase().trim());
  if (MESES[indiceMes + 1] === undefined) {
    return "No hay datos anteriores";
  } else {
    return MESES[indiceMes + 1];
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

  for (let i = 0; i < tasks.length; i++) {
    for (let j = 0; j < datosAnteriores.length; j++) {
      if (
        tasks[i].medi == datosAnteriores[j].mediPast &&
        tasks[i].month.toLowerCase().trim() ==
          datosAnteriores[j].mesPast.toLowerCase().trim() &&
        tasks[i].month.toLowerCase().trim() !== "enero"
      ) {
        let excess;
        if (tasks[i].cons - datosAnteriores[j].consPast > 15) {
          excess = tasks[i].cons - datosAnteriores[j].consPast - 15;
        } else excess = 0;

        tempObj = {
          id: tasks[i].id,
          medi: Number(tasks[i].medi),
          month: tasks[i].month,
          cons: tasks[i].cons,
          name: tasks[i].name,
          paid: tasks[i].paid,
          bill: tasks[i].cons - datosAnteriores[j].consPast,
          prevCons: datosAnteriores[j].consPast,
          excess: excess,
        };
        newTasks.push(tempObj);
      }
    }
  }

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].month.toLowerCase() == "enero") {
      tempObj = {
        id: tasks[i].id,
        medi: Number(tasks[i].medi),
        month: tasks[i].month,
        cons: tasks[i].cons,
        name: tasks[i].name,
        paid: tasks[i].paid,
        bill: "No hay",
        excess: "--",
      };
      newTasks.unshift(tempObj);
    }
  }
}

function ordenarDatos() {
  for (let i = 0; i < newTasks.length; i++) {
    for (let j = 0; j < i; j++) {
      if (newTasks[i].medi < newTasks[j].medi) {
        let temp;
        temp = newTasks[i];
        newTasks[i] = newTasks[j];
        newTasks[j] = temp;
      }
      if (
        MESES.indexOf(newTasks[i].month.toLowerCase().trim()) <
        MESES.indexOf(newTasks[j].month.toLowerCase().trim())
      ) {
        let temp;
        temp = newTasks[i];
        newTasks[i] = newTasks[j];
        newTasks[j] = temp;
      }
    }
  }
}

export function crearApi() {
  datosAnteriores = [];
  newTasks = [];
  newTasks = [];

  registrarDatosAnt();

  cargarDatos();

  // @ts-ignore
  ordenarDatos(newTasks);
  return newTasks;
}

export async function startFetch() {
  onSnapshot(collection(db, "2023"), (querySnapshot) => {
    tasks = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    crearApi();
  });
}

let guaranies;
export function calculoDeFactura(bill) {
  if (bill <= 15) {
    guaranies = "25.000 Gs";
    return guaranies;
  } else if (bill == "No hay") {
    guaranies = "25.000 Gs";
    return guaranies;
  } else if (bill > 15) {
    let resta = bill - 15;
    let extra = resta * 2;
    let total = extra + 25;
    guaranies = `${total}.000 Gs`;
    return guaranies;
  }
}
export default startFetch();
