import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { newTasks } from "../functions";

export default async function exportExcel() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wb = new Workbook();

  const styleTitle = {
    font: {
      size: 20,
    },
    fill: {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "A6A6A6" }, // Color de fondo en formato ARGB (AARRGGBB)
    },
    alignment: {
      horizontal: "center", // Centrar horizontalmente
      vertical: "middle", // Centrar verticalmente
    },
  };

  // Configura el ancho de la columna y las opciones de texto en vertical

  // Agrega los nombres desde el array de objetos
  let ws;
  for (let j = 0; j < newTasks.length; j++) {
    for (let i = 0; i < newTasks.length; i++) {
      newTasks[i].month == "enero"
        ? (ws = wb.addWorksheet(`M_${newTasks[i].medi}`))
        : (ws = wb.addWorksheet(`M_${newTasks[i].medi}`));
      ws.mergeCells("A1:F1");
      ws.getCell("A3").value = "MEDIDOR N°";
      ws.getCell("B3").value = newTasks[i].medi;

      ws.getCell("A5").value = "USUARIO";
      ws.getCell("B5").value = newTasks[i].name;

      ws.getCell("A7").value = "Mes";
      ws.getCell("A8").value = "ENERO";
      ws.getCell("A9").value = "FEBRERO";
      ws.getCell("A10").value = "MARZO";
      ws.getCell("A11").value = "ABRIL";
      ws.getCell("A12").value = "MAYO";
      ws.getCell("A13").value = "JUNIO";
      ws.getCell("A14").value = "JULIO";
      ws.getCell("A15").value = "AGOSTO";
      ws.getCell("A16").value = "SEPTIEMBRE";
      ws.getCell("A17").value = "OCTUBRE";
      ws.getCell("A18").value = "NOVIEMBRE";
      ws.getCell("A19").value = "DICIEMBRE";

      ws.getCell("B7").value = "Lectura";
      ws.getCell("B8").value = newTasks[i].cons;

      ws.getCell("C7").value = "Consumo";

      const columnA = ws.getColumn("A");
      columnA.width = 20;
      columnA.alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      const columnB = ws.getColumn("B");
      columnB.width = 25;
      columnB.alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      const columnC = ws.getColumn("C");
      columnC.width = 15;
      columnC.alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      const title = ws.getCell("A1");
      title.value = "LECTURA DE MEDIDOR";

      // @ts-ignore
      title.style = styleTitle;
    }
  }
  // const lastHeaderGroup = table.getHeaderGroups().at(-1);
  // if (!lastHeaderGroup) {
  //   console.error("No header groups found", table.getHeaderGroups());
  //   return;
  // }

  // ws.columns = lastHeaderGroup.headers
  //   .filter((h) => h.column.getIsVisible())
  //   .map((header) => {
  //     return {
  //       header: header.column.columnDef.header,
  //       key: header.id,
  //       width: 20,
  //     };
  //   });

  // const exportRows = applyFilters
  //   ? table.getFilteredRowModel().rows
  //   : table.getCoreRowModel().rows;

  // exportRows.forEach((row) => {
  //   const cells = row.getVisibleCells();
  //   const values = cells.map((cell) => cell.getValue() ?? "");
  //   console.log("values", values);
  //   ws.addRow(values);
  // });

  // for csv: await wb.csv.writeBuffer();
  const buf = await wb.xlsx.writeBuffer();
  saveAs(new Blob([buf]), `Valores.xlsx`);
}
