import { useState } from "react";
import MaterialTable from "material-table";
import { optionsConfig, localizationConfig } from "./tableConfig";
import { makeStyles } from "@material-ui/core/styles";
import styles from "components/tableStyle.js";
import { graphQLClient } from "../utils/grahpql-client";
import {
  UPDATE_ENFRENTAMIENTO_JUGADOR1,
  UPDATE_ENFRENTAMIENTO_JUGADOR2,
} from "../graphql/mutations";

const useStyles = makeStyles(styles);

export default function TorneoResultados({ torneoData, onUpdate }) {
  const classes = useStyles();

  const [columns] = useState([
    { title: "Local", field: "local", editable: "never" },
    { title: "", field: "golesLocal" },
    { title: "", field: "golesVisitante" },
    {
      title: "Visitante",
      field: "visitante",
      editable: "never",
    },
  ]);

  async function updateInfo(
    esLocal,
    numeroEnfrentamiento,
    goles,
    nombreJugador
  ) {
    let idToEdit = torneoData?.resultados.data[numeroEnfrentamiento - 1]._id;

    if (esLocal) {
      await graphQLClient.request(UPDATE_ENFRENTAMIENTO_JUGADOR1, {
        id: idToEdit,
        golesJugador1: parseInt(goles),
        anotadosGolesJugador1: true,
      });
    } else {
      await graphQLClient.request(UPDATE_ENFRENTAMIENTO_JUGADOR2, {
        id: idToEdit,
        golesJugador2: parseInt(goles),
        anotadosGolesJugador2: true,
      });
    }

    await onUpdate(esLocal, numeroEnfrentamiento, goles, nombreJugador);
  }

  let resultadosArray = [];

  torneoData?.resultados.data.map((resultado) => {
    resultadosArray.push({
      numeroEnfrentamiento: resultado.numeroEnfrentamiento,
      local: resultado.jugador1,
      golesLocal:
        resultado.golesJugador1 || resultado.golesJugador1 == 0
          ? resultado.golesJugador1
          : "-",
      visitante: resultado.jugador2,
      golesVisitante:
        resultado.golesJugador2 || resultado.golesJugador2 == 0
          ? resultado.golesJugador2
          : "-",
    });
  });

  // resultadosArray.sort(
  //   (a, b) => a.numeroEnfrentamiento - b.numeroEnfrentamiento
  // );

  return (
    <div className={classes.tableResponsive}>
      <MaterialTable
        title="Resultados"
        columns={columns}
        data={resultadosArray}
        options={optionsConfig}
        localization={localizationConfig}
        cellEditable={{
          onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
            let esLocal = columnDef.field === "golesLocal";

            let numeroEnfrentamiento = rowData.tableData.id + 1;

            let goles = newValue;

            return new Promise((resolve, reject) => {
              setTimeout(async () => {
                const dataUpdate = [...resultadosArray];
                const index = rowData.tableData.id;
                const nombreJugador = esLocal
                  ? rowData.local
                  : rowData.visitante;
                if (esLocal) {
                  dataUpdate[index].golesLocal = newValue;
                } else {
                  dataUpdate[index].golesVisitante = newValue;
                }

                await updateInfo(
                  esLocal,
                  numeroEnfrentamiento,
                  goles,
                  nombreJugador
                );

                resolve();
              }, 1000);
            });
          },
        }}
      />
    </div>
  );
}
