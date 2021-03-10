/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from "react";
import { graphQLClient } from "../utils/grahpql-client";
import EquiposJugadores from "./EquiposJugadores";
import TorneoPuntajes from "./TorneoPuntajes";

import TorneoResultados from "./TorneoResultados";
import { UPDATE_ESTADISTICA_TABLA } from "../graphql/mutations";

export default function Torneo({ torneoData, onUpdateTorneo }) {
  async function onUpdate(
    esLocalJugadorActual,
    numeroEnfrentamiento,
    golesJugadorActual,
    nombreJugadorActual
  ) {
    onUpdateTorneo();

    let enfrentamiento = torneoData.resultados.data[numeroEnfrentamiento - 1];
    console.log(
      "🚀 ~ file: Torneo.js ~ line 15 ~ onUpdate ~ enfrentamiento ",
      enfrentamiento
    );

    let shouldUpdatePuntajes = false;
    if (esLocalJugadorActual) {
      if (enfrentamiento.anotadosGolesJugador2) {
        shouldUpdatePuntajes = true;
      }
    } else {
      if (enfrentamiento.anotadosGolesJugador1) {
        shouldUpdatePuntajes = true;
      }
    }

    if (shouldUpdatePuntajes) {
      //Actualizo tabla de puntajes

      //1) Actualizo tabla jugador actual (probablemente el visitante si ya puse al local)
      let jugadorActual = torneoData.tablas.data.filter(
        (tabla) => tabla.jugador == nombreJugadorActual
      )[0];

      let idToEditJugadorActual = jugadorActual._id;

      let nombreOtroJugador =
        jugadorActual == enfrentamiento.jugador1
          ? enfrentamiento.jugador2
          : enfrentamiento.jugador1;

      let otroJugador = torneoData.tablas.data.filter(
        (tabla) => tabla.jugador == nombreOtroJugador
      )[0];
      console.log(
        "🚀 ~ file: Torneo.js ~ line 54 ~ Torneo ~ otroJugador",
        otroJugador
      );

      let idToEditOtroJugador = otroJugador._id;

      let golesOtroJugador = parseInt(
        JSON.parse(localStorage.getItem("golesOtroJugador"))
      );

      let ganadorPartido = "";
      if (golesJugadorActual > golesOtroJugador) {
        ganadorPartido = nombreJugadorActual;
      } else if (golesOtroJugador > golesJugadorActual) {
        ganadorPartido = nombreOtroJugador;
      }

      let puntosJugadorActual = 0;
      let puntosOtroJugador = 0;
      let pgJugadorActual = 0;
      let ppJugadorActual = 0;
      let pgOtroJugador = 0;
      let ppOtroJugador = 0;
      let empate = 0;

      if (ganadorPartido == nombreJugadorActual) {
        puntosJugadorActual = 3;
        puntosOtroJugador = 0;
        pgJugadorActual = 1;
        ppOtroJugador = 1;
      } else if (ganadorPartido == nombreOtroJugador) {
        puntosJugadorActual = 0;
        puntosOtroJugador = 3;
        ppJugadorActual = 1;
        pgOtroJugador = 1;
      } else {
        empate = 1;
        puntosJugadorActual = 1;
        puntosOtroJugador = 1;
      }

      console.log(
        "🚀 ~ file: Torneo.js ~ line 100 ~ Torneo ~ jugadorActual.pj",
        jugadorActual.pj
      );

      await graphQLClient.request(UPDATE_ESTADISTICA_TABLA, {
        id: idToEditJugadorActual,
        jugador: nombreJugadorActual,
        pj: jugadorActual.pj ? parseInt(jugadorActual.pj) + 1 : 1,
        gf: jugadorActual.gf
          ? jugadorActual.gf + parseInt(golesJugadorActual)
          : parseInt(golesJugadorActual),
        gc: jugadorActual.gc
          ? parseInt(jugadorActual.gc) + parseInt(golesOtroJugador)
          : parseInt(golesOtroJugador),
        puntos: jugadorActual.puntos
          ? parseInt(jugadorActual.puntos) + parseInt(puntosJugadorActual)
          : parseInt(puntosJugadorActual),
        pg: jugadorActual.pg
          ? parseInt(jugadorActual.pg) + parseInt(pgJugadorActual)
          : parseInt(pgJugadorActual),
        pe: jugadorActual.pe
          ? parseInt(jugadorActual.pe) + parseInt(empate)
          : parseInt(empate),
        pp: jugadorActual.pp
          ? parseInt(jugadorActual.pp) + parseInt(ppJugadorActual)
          : parseInt(ppJugadorActual),
      });

      console.log(
        "🚀 ~ file: Torneo.js ~ line 130 ~ Torneo ~ otroJugador.pj",
        otroJugador.pj
      );

      //2) Actualizo tabla jugador anterior (probablemente el local)
      await graphQLClient.request(UPDATE_ESTADISTICA_TABLA, {
        id: idToEditOtroJugador,
        jugador: nombreOtroJugador,
        pj: otroJugador.pj ? parseInt(otroJugador.pj) + 1 : 1,
        gf: otroJugador.gf
          ? parseInt(otroJugador.gf) + parseInt(golesOtroJugador)
          : parseInt(golesOtroJugador),
        gc: otroJugador.gc
          ? parseInt(otroJugador.gc) + parseInt(golesJugadorActual)
          : parseInt(golesJugadorActual),
        puntos: otroJugador.puntos
          ? parseInt(otroJugador.puntos) + parseInt(puntosOtroJugador)
          : parseInt(puntosOtroJugador),
        pg: otroJugador.pg
          ? parseInt(otroJugador.pg) + parseInt(pgOtroJugador)
          : parseInt(pgOtroJugador),
        pe: otroJugador.pe
          ? parseInt(otroJugador.pe) + parseInt(empate)
          : parseInt(empate),
        pp: otroJugador.pp
          ? parseInt(otroJugador.pp) + parseInt(ppOtroJugador)
          : parseInt(ppOtroJugador),
      });

      localStorage.removeItem("golesOtroJugador");
    } else {
      //Estoy poniendo los goles del primre jugador, tengo que guardarlos para despues cuando ponga los del segundo
      localStorage.setItem(
        "golesOtroJugador",
        JSON.stringify(golesJugadorActual)
      );
    }
  }

  return (
    <>
      <div className="divide-y-4 divide-yellow-600 divide-dashed">
        <h3 className="w-full md:w-4/12 px-4 mr-auto ml-auto text-3xl mb-2 mt-4 font-semibold leading-normal">
          Torneo{" "}
          <span className={"font-bold text-blue-600"}>
            #{torneoData.numeroTorneo}{" "}
          </span>
        </h3>
        <div className="flex flex-row-reverse px-4 mx-auto">
          <div className="w-full overflow-auto bg-gray-500 ">
            <div className="content flex flex-row flex-no-wrap items-start justify-center m-2">
              <div
                className="item bg-white  w-64"
                style={{ marginTop: "-2.2rem" }}
              >
                <div className="p-4">
                  <TorneoResultados
                    torneoData={torneoData}
                    onUpdate={onUpdate}
                  />
                </div>
              </div>
              <div className="item bg-white m-2 w-64">
                <div className="p-4">
                  <EquiposJugadores torneoData={torneoData} />
                </div>
              </div>

              <div className="item bg-white m-2 w-64">
                <div className="p-4 mt-4">
                  <TorneoPuntajes torneoData={torneoData} />
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        <hr className="mt-6 border-b-1 border-gray-400" />
      </div>
    </>
  );
}
