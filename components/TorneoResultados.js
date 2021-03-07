import { useState } from "react";
import MaterialTable from "material-table";
import { optionsConfig, localizationConfig } from "./tableConfig";
import { makeStyles } from "@material-ui/core/styles";
import styles from "components/tableStyle.js";

const useStyles = makeStyles(styles);

export default function TorneoResultados({ torneoData }) {
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

  let resultadosArray = [];

  torneoData.resultados.data.map((resultado) => {
    resultadosArray.push({
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
            return new Promise((resolve, reject) => {
              console.log("newValue: " + newValue);
              setTimeout(resolve, 1000);
            });
          },
        }}
      />
    </div>
  );
}
