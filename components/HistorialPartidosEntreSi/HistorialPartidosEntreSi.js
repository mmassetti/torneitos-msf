import React, { useState, useEffect } from "react";
import HistorialPartidosEntreSiTable from "./HistorialPartidosEntreSiTable";
import HistorialTorneosYPartidosTable from "./HistorialTorneosYPartidosTable";
import {
  columnsPartidosEntreSi,
  columnsGolesEntreSi,
  columnsTorneosYPartidos,
} from "./columns";

export default function HistorialPartidosEntreSi({
  arrayTorneos,
  isGlobal,
  partidosEntreSiGlobal,
  golesEntreSiGlobal,
}) {
  const [partidosEntreSi, setPartidosEntreSi] = useState([]);
  const [golesEntreSi, setGolesEntreSi] = useState([]);
  const [torneosYPartidos, setTorneosYPartidos] = useState([]);

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

    let historialTorneosYPartidosMasa = {
      torneos: 0,
      pg: 0,
      pe: 0,
      pp: 0,
      pt: 0,
      puntosTotales: 0,
      gf: 0,
      gc: 0,
      dif: 0,
      porcentajeVictorias: 0,
    };

    let historialTorneosYPartidosChaca = {
      torneos: 0,
      pg: 0,
      pe: 0,
      pp: 0,
      pt: 0,
      puntosTotales: 0,
      gf: 0,
      gc: 0,
      dif: 0,
      porcentajeVictorias: 0,
    };

    let historialTorneosYPartidosSeba = {
      torneos: 0,
      pg: 0,
      pe: 0,
      pp: 0,
      pt: 0,
      puntosTotales: 0,
      gf: 0,
      gc: 0,
      dif: 0,
      porcentajeVictorias: 0,
    };

    // eslint-disable-next-line no-unused-expressions
    arrayTorneos?.forEach((torneo) => {
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

            historialTorneosYPartidosMasa.pg += ganadorMasa;
            historialTorneosYPartidosMasa.pe += empate;
            historialTorneosYPartidosMasa.pp += ganadorChaca;
            historialTorneosYPartidosMasa.gf += golesFinalMasa;
            historialTorneosYPartidosMasa.gc += golesFinalChaca;
            historialTorneosYPartidosMasa.pt++;
            historialTorneosYPartidosMasa.puntosTotales += ganadorMasa
              ? 3
              : empate
              ? 1
              : 0;
            historialTorneosYPartidosMasa.dif =
              historialTorneosYPartidosMasa.gf -
              historialTorneosYPartidosMasa.gc;

            historialTorneosYPartidosChaca.pg += ganadorChaca;
            historialTorneosYPartidosChaca.pe += empate;
            historialTorneosYPartidosChaca.pp += ganadorMasa;
            historialTorneosYPartidosChaca.gf += golesFinalChaca;
            historialTorneosYPartidosChaca.gc += golesFinalMasa;
            historialTorneosYPartidosChaca.pt++;
            historialTorneosYPartidosChaca.puntosTotales += ganadorChaca
              ? 3
              : empate
              ? 1
              : 0;
            historialTorneosYPartidosChaca.dif =
              historialTorneosYPartidosChaca.gf -
              historialTorneosYPartidosChaca.gc;
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

            historialTorneosYPartidosSeba.pg += ganadorSeba;
            historialTorneosYPartidosSeba.pe += empate;
            historialTorneosYPartidosSeba.pp += ganadorChaca;
            historialTorneosYPartidosSeba.gf += golesFinalSeba;
            historialTorneosYPartidosSeba.gc += golesFinalChaca;
            historialTorneosYPartidosSeba.pt++;
            historialTorneosYPartidosSeba.puntosTotales += ganadorSeba
              ? 3
              : empate
              ? 1
              : 0;
            historialTorneosYPartidosSeba.dif =
              historialTorneosYPartidosSeba.gf -
              historialTorneosYPartidosSeba.gc;

            historialTorneosYPartidosChaca.pg += ganadorChaca;
            historialTorneosYPartidosChaca.pe += empate;
            historialTorneosYPartidosChaca.pp += ganadorSeba;
            historialTorneosYPartidosChaca.gf += golesFinalChaca;
            historialTorneosYPartidosChaca.gc += golesFinalSeba;
            historialTorneosYPartidosChaca.pt++;
            historialTorneosYPartidosChaca.puntosTotales += ganadorChaca
              ? 3
              : empate
              ? 1
              : 0;
            historialTorneosYPartidosChaca.dif =
              historialTorneosYPartidosChaca.gf -
              historialTorneosYPartidosChaca.gc;
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

            historialTorneosYPartidosMasa.pg += ganadorMasa;
            historialTorneosYPartidosMasa.pe += empate;
            historialTorneosYPartidosMasa.pp += ganadorSeba;
            historialTorneosYPartidosMasa.gf += golesFinalMasa;
            historialTorneosYPartidosMasa.gc += golesFinalSeba;
            historialTorneosYPartidosMasa.pt++;
            historialTorneosYPartidosMasa.puntosTotales += ganadorMasa
              ? 3
              : empate
              ? 1
              : 0;
            historialTorneosYPartidosMasa.dif =
              historialTorneosYPartidosMasa.gf -
              historialTorneosYPartidosMasa.gc;

            historialTorneosYPartidosSeba.pg += ganadorSeba;
            historialTorneosYPartidosSeba.pe += empate;
            historialTorneosYPartidosSeba.pp += ganadorMasa;
            historialTorneosYPartidosSeba.gf += golesFinalSeba;
            historialTorneosYPartidosSeba.gc += golesFinalMasa;
            historialTorneosYPartidosSeba.pt++;
            historialTorneosYPartidosSeba.puntosTotales += ganadorSeba
              ? 3
              : empate
              ? 1
              : 0;
            historialTorneosYPartidosSeba.dif =
              historialTorneosYPartidosSeba.gf -
              historialTorneosYPartidosSeba.gc;
          }
        }
      });
    });

    let historialArray = [];
    let golesArray = [];

    let torneosYPartidosArray = [];

    torneosYPartidosArray.push({
      jugador: "Masa",
      pg: historialTorneosYPartidosMasa.pg,
      pe: historialTorneosYPartidosMasa.pe,
      pp: historialTorneosYPartidosMasa.pp,
      pt: historialTorneosYPartidosMasa.pt,
      gf: historialTorneosYPartidosMasa.gf,
      gc: historialTorneosYPartidosMasa.gc,
      dif:
        historialTorneosYPartidosMasa.dif > 0
          ? "+" + historialTorneosYPartidosMasa.dif
          : historialTorneosYPartidosMasa.dif,
      puntosTotales: historialTorneosYPartidosMasa.puntosTotales,
    });

    torneosYPartidosArray.push({
      jugador: "Chaca",
      pg: historialTorneosYPartidosChaca.pg,
      pe: historialTorneosYPartidosChaca.pe,
      pp: historialTorneosYPartidosChaca.pp,
      pt: historialTorneosYPartidosChaca.pt,
      gf: historialTorneosYPartidosChaca.gf,
      gc: historialTorneosYPartidosChaca.gc,
      dif:
        historialTorneosYPartidosChaca.dif > 0
          ? "+" + historialTorneosYPartidosChaca.dif
          : historialTorneosYPartidosChaca.dif,
      puntosTotales: historialTorneosYPartidosChaca.puntosTotales,
    });

    torneosYPartidosArray.push({
      jugador: "Seba",
      pg: historialTorneosYPartidosSeba.pg,
      pe: historialTorneosYPartidosSeba.pe,
      pp: historialTorneosYPartidosSeba.pp,
      pt: historialTorneosYPartidosSeba.pt,
      gf: historialTorneosYPartidosSeba.gf,
      gc: historialTorneosYPartidosSeba.gc,
      dif:
        historialTorneosYPartidosSeba.dif > 0
          ? "+" + historialTorneosYPartidosSeba.dif
          : historialTorneosYPartidosSeba.dif,
      puntosTotales: historialTorneosYPartidosSeba.puntosTotales,
    });

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
    setTorneosYPartidos(torneosYPartidosArray);
  }, [arrayTorneos]);

  if (isGlobal) {
    return (
      <div className="flex justify-center">
        <div className="mr-12">
          <HistorialPartidosEntreSiTable
            columns={columnsPartidosEntreSi}
            data={partidosEntreSiGlobal}
            title="Historial partidos entre si"
            global={true}
          />
        </div>
        <div>
          <HistorialPartidosEntreSiTable
            columns={columnsGolesEntreSi}
            data={golesEntreSiGlobal}
            title="Historial goles"
            global={true}
          />
        </div>
      </div>
    );
  } else {
    if (arrayTorneos && arrayTorneos.length > 0) {
      return (
        <>
          <div className="flex justify-center">
            <HistorialTorneosYPartidosTable
              columns={columnsTorneosYPartidos}
              data={torneosYPartidos}
              title="Historial torneos y partidos"
            />
          </div>
          <div className="flex justify-center">
            <div className="mr-12">
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
}
