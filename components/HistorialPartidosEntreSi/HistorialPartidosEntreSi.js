import React, { useState, useMemo, useEffect } from "react";
import HistorialPartidosEntreSiTable from "./HistorialPartidosEntreSiTable";

export default function HistorialPartidosEntreSi({ arrayTorneos }) {
  const [partidosEntreSi, setPartidosEntreSi] = useState([]);
  const [golesEntreSi, setGolesEntreSi] = useState([]);

  const columnsPartidosEntreSi = useMemo(
    () => [
      {
        Header: "Jugador 1",
        accessor: "jugador1",
      },
      {
        Header: "Victorias",
        accessor: "victoriasJugador1",
      },
      {
        Header: "Empates",
        accessor: "empates",
      },
      {
        Header: "Victorias",
        accessor: "victoriasJugador2",
      },
      {
        Header: "Jugador 2",
        accessor: "jugador2",
      },
    ],
    []
  );

  const columnsGolesEntreSi = useMemo(
    () => [
      {
        Header: "Jugador 1",
        accessor: "jugador1",
      },
      {
        Header: "Goles",
        accessor: "golesJugador1",
      },
      {
        Header: "Goles",
        accessor: "golesJugador2",
      },

      {
        Header: "Jugador 2",
        accessor: "jugador2",
      },
    ],
    []
  );

  useEffect(() => {
    //I know this can be done in fewer lines of code and much better.

    let historialChacaMasa = {
      pgMasa: 0,
      pgChaca: 0,
      empates: 0,
      golesMasa: 0,
      golesChaca: 0,
    };

    let historialChacaSeba = {
      pgSeba: 0,
      pgChaca: 0,
      empates: 0,
      golesSeba: 0,
      golesChaca: 0,
    };

    let historialMasaSeba = {
      pgMasa: 0,
      pgSeba: 0,
      empates: 0,
      golesMasa: 0,
      golesSeba: 0,
    };

    arrayTorneos.forEach((torneo) => {
      // eslint-disable-next-line no-unused-expressions
      torneo.resultados?.data?.map((resultado) => {
        if (
          resultado.anotadosGolesJugador1 &&
          resultado.anotadosGolesJugador2
        ) {
          if (
            (resultado.jugador1 === "Masa" && resultado.jugador2 === "Chaca") ||
            (resultado.jugador1 === "Chaca" && resultado.jugador2 === "Masa")
          ) {
            //MASA VS CHACA
            let golesFinalChaca = 0;
            let golesFinalMasa = 0;

            if (resultado.jugador1 === "Masa") {
              golesFinalChaca = resultado.golesJugador2;
              golesFinalMasa = resultado.golesJugador1;
            } else {
              golesFinalChaca = resultado.golesJugador1;
              golesFinalMasa = resultado.golesJugador2;
            }

            let ganadorMasa = 0;
            let ganadorChaca = 0;
            let empate = 0;
            if (golesFinalChaca < golesFinalMasa) {
              ganadorMasa = 1;
            } else if (golesFinalChaca === golesFinalMasa) {
              empate = 1;
            } else {
              ganadorChaca = 1;
            }

            historialChacaMasa.pgMasa += ganadorMasa;
            historialChacaMasa.pgChaca += ganadorChaca;
            historialChacaMasa.empates += empate;
            historialChacaMasa.golesChaca += golesFinalChaca;
            historialChacaMasa.golesMasa += golesFinalMasa;
          } else if (
            //SEBA VS CHACA
            (resultado.jugador1 === "Seba" && resultado.jugador2 === "Chaca") ||
            (resultado.jugador1 === "Chaca" && resultado.jugador2 === "Seba")
          ) {
            let golesFinalChaca = 0;
            let golesFinalSeba = 0;

            if (resultado.jugador1 === "Seba") {
              golesFinalChaca = resultado.golesJugador2;
              golesFinalSeba = resultado.golesJugador1;
            } else {
              golesFinalChaca = resultado.golesJugador1;
              golesFinalSeba = resultado.golesJugador2;
            }

            let ganadorSeba = 0;
            let ganadorChaca = 0;
            let empate = 0;
            if (golesFinalChaca < golesFinalSeba) {
              ganadorSeba = 1;
            } else if (golesFinalChaca === golesFinalSeba) {
              empate = 1;
            } else {
              ganadorChaca = 1;
            }

            historialChacaSeba.pgSeba += ganadorSeba;
            historialChacaSeba.pgChaca += ganadorChaca;
            historialChacaSeba.empates += empate;
            historialChacaSeba.golesChaca += golesFinalChaca;
            historialChacaSeba.golesSeba += golesFinalSeba;
          } else {
            //MASA VS SEBA
            let golesFinalSeba = 0;
            let golesFinalMasa = 0;

            if (resultado.jugador1 === "Masa") {
              golesFinalSeba = resultado.golesJugador2;
              golesFinalMasa = resultado.golesJugador1;
            } else {
              golesFinalSeba = resultado.golesJugador1;
              golesFinalMasa = resultado.golesJugador2;
            }

            let ganadorMasa = 0;
            let ganadorSeba = 0;
            let empate = 0;
            if (golesFinalSeba < golesFinalMasa) {
              ganadorMasa = 1;
            } else if (golesFinalSeba === golesFinalMasa) {
              empate = 1;
            } else {
              ganadorSeba = 1;
            }

            historialMasaSeba.pgMasa += ganadorMasa;
            historialMasaSeba.pgSeba += ganadorSeba;
            historialMasaSeba.empates += empate;
            historialMasaSeba.golesSeba += golesFinalSeba;
            historialMasaSeba.golesMasa += golesFinalMasa;
          }
        }
      });
    });

    let historialArray = [];
    let golesArray = [];

    historialArray.push({
      jugador1: "Masa",
      jugador2: "Chaca",
      victoriasJugador1: historialChacaMasa.pgMasa,
      victoriasJugador2: historialChacaMasa.pgChaca,
      empates: historialChacaMasa.empates,
    });

    golesArray.push({
      jugador1: "Masa",
      jugador2: "Chaca",
      golesJugador1: historialChacaMasa.golesMasa,
      golesJugador2: historialChacaMasa.golesChaca,
    });

    historialArray.push({
      jugador1: "Seba",
      jugador2: "Chaca",
      victoriasJugador1: historialChacaSeba.pgSeba,
      victoriasJugador2: historialChacaSeba.pgChaca,
      empates: historialChacaSeba.empates,
    });

    golesArray.push({
      jugador1: "Seba",
      jugador2: "Chaca",
      golesJugador1: historialChacaSeba.golesSeba,
      golesJugador2: historialChacaSeba.golesChaca,
    });

    historialArray.push({
      jugador1: "Masa",
      jugador2: "Seba",
      victoriasJugador1: historialMasaSeba.pgMasa,
      victoriasJugador2: historialMasaSeba.pgSeba,
      empates: historialMasaSeba.empates,
    });

    golesArray.push({
      jugador1: "Masa",
      jugador2: "Seba",
      golesJugador1: historialMasaSeba.golesMasa,
      golesJugador2: historialMasaSeba.golesSeba,
    });

    setPartidosEntreSi(historialArray);
    setGolesEntreSi(golesArray);
  }, [arrayTorneos]);

  if (arrayTorneos && arrayTorneos.length > 0) {
    return (
      <>
        <div className="flex">
          <div>
            <HistorialPartidosEntreSiTable
              columns={columnsPartidosEntreSi}
              data={partidosEntreSi}
              title="Historial partidos entre si"
            />
          </div>
          <div>
            <HistorialPartidosEntreSiTable
              columns={columnsGolesEntreSi}
              data={golesEntreSi}
              title="Historial goles"
            />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <h1 className="justify-center text-center text-2xl p-4 m-4 h-500-px">
        Todavía no hay estadísticas para esta temporada
      </h1>
    );
  }
}
