import React, { useState, useMemo, useEffect } from "react";
import { graphQLClient } from "../utils/grahpql-client";
import {
  UPDATE_ENFRENTAMIENTO_JUGADOR1,
  UPDATE_ENFRENTAMIENTO_JUGADOR2,
} from "../graphql/mutations";
import Table from "./ResultadosTable";

export default function TorneoResultados({ torneoData, onUpdate }) {
  const [skipPageReset, setSkipPageReset] = useState(false);
  const [data, setData] = useState([]);

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

  const columns = useMemo(
    () => [
      {
        Header: "Local",
        accessor: "local", // accessor is the "key" in the data
        Cell: function Cell(cell) {
          return <span>{cell.value}</span>;
        },
      },
      {
        Header: "",
        accessor: "golesLocal",
      },
      {
        Header: "",
        accessor: "golesVisitante",
      },
      {
        Header: "Visitante",
        accessor: "visitante",
        Cell: function Cell(cell) {
          return <span>{cell.value}</span>;
        },
      },
    ],
    []
  );

  useEffect(() => {
    let resultadosArray = [];

    // eslint-disable-next-line no-unused-expressions
    torneoData?.resultados.data.forEach((resultado) => {
      resultadosArray.push({
        numeroEnfrentamiento: resultado.numeroEnfrentamiento,
        local: resultado.jugador1,
        golesLocal:
          resultado.golesJugador1 || resultado.golesJugador1 === 0
            ? resultado.golesJugador1
            : "-",
        visitante: resultado.jugador2,
        golesVisitante:
          resultado.golesJugador2 || resultado.golesJugador2 === 0
            ? resultado.golesJugador2
            : "-",
      });
    });

    // resultadosArray.sort(
    //   (a, b) => a.numeroEnfrentamiento - b.numeroEnfrentamiento
    // );

    // const memoizedData = React.useMemo(() => resultadosArray, []);
    setData(resultadosArray);
    setSkipPageReset(false);
  }, [torneoData]);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data

  const updateMyData = async (rowIndex, columnId, value, backgroundColors) => {
    let esLocal = columnId === "golesLocal";
    let numeroEnfrentamiento = rowIndex + 1;
    let goles = value;

    const nombreJugador = esLocal
      ? data[rowIndex].local
      : data[rowIndex].visitante;

    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
    await updateInfo(esLocal, numeroEnfrentamiento, goles, nombreJugador);
  };

  return (
    <Table
      columns={columns}
      data={data}
      updateMyData={updateMyData}
      skipPageReset={skipPageReset}
      //colores
    />
  );
}
