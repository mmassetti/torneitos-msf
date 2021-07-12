import React, { useState, useMemo, useEffect } from "react";
import HistorialPartidosEntreSiTable from "./HistorialPartidosEntreSiTable";

export default function HistorialPartidosEntreSi({ historialData }) {
  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: "Jugador 1",
        accessor: "jugador1",
      },
      {
        Header: "Victorias 1",
        accessor: "victoriasJugador1",
      },
      {
        Header: "Empates",
        accessor: "empates",
      },
      {
        Header: "Victorias 2",
        accessor: "victoriasJugador2",
      },
      {
        Header: "Jugador 2",
        accessor: "jugador2",
      },
    ],
    []
  );

  useEffect(() => {
    let historialArray = [];

    // eslint-disable-next-line no-unused-expressions
    historialData?.forEach((historial) => {
      historialArray.push({
        jugador1: historial.jugador1,
        jugador2: historial.jugador2,
        victoriasJugador1: historial.victoriasJugador1,
        victoriasJugador2: historial.victoriasJugador2,
        empates: historial.empates,
      });
    });

    setData(historialArray);
  }, [historialData]);

  if (data && data.length > 0) {
    return <HistorialPartidosEntreSiTable columns={columns} data={data} />;
  } else {
    return (
      <h1 className="justify-center text-center text-2xl p-4 m-4 h-500-px">
        Todavía no hay estadísticas para esta temporada
      </h1>
    );
  }
}
