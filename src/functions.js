import { db } from "./firebase";
import { collection, deleteDoc, onSnapshot, doc } from "firebase/firestore";

let datosAnteriores = [];
let tasks = [];
export let newTasks = [];
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
// async function pilin() {
//   for (let i = 0; i < tasks.length; i++) {
//     if (tasks[i].name === "asd") {
//       console.log(tasks[i].id);
//       await deleteDoc(doc(db, "2023", tasks[i].id));
//     }
//   }
// }
// pilin();

/**
 * @param {string} mes
 */
function mesAnterior(mes) {
  const indiceMes = meses.indexOf(mes.toLowerCase().trim());
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

  for (let i = 0; i < tasks.length; i++) {
    for (let j = 0; j < datosAnteriores.length; j++) {
      if (
        tasks[i].medi == datosAnteriores[j].mediPast &&
        tasks[i].month.toLowerCase().trim() ==
          datosAnteriores[j].mesPast.toLowerCase().trim() &&
        tasks[i].month.toLowerCase().trim() !== "enero"
      ) {
        tempObj = {
          id: tasks[i].id,
          medi: Number(tasks[i].medi),
          month: tasks[i].month,
          cons: tasks[i].cons,
          name: tasks[i].name,
          paid: tasks[i].paid,
          bill: tasks[i].cons - datosAnteriores[j].consPast,
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
        bill: "No hay mes anterior",
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
        meses.indexOf(newTasks[i].month.toLowerCase().trim()) <
        meses.indexOf(newTasks[j].month.toLowerCase().trim())
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

export default startFetch();
