/* eslint-disable react/react-in-jsx-scope */
import { graphQLClient } from "../utils/grahpql-client";
import EquiposJugadores from "./EquiposJugadores";
import TorneoPuntajes from "./TorneoPuntajes";

import TorneoResultados from "./TorneoResultados";
import {
  UPDATE_ESTADISTICA_TABLA,
  DELETE_ENFRENTAMIENTO,
  DELETE_ESTADISTICA_TABLA,
  DELETE_TORNEO,
} from "../graphql/mutations";
import useSWR from "swr";
import { GET_INFO_TORNEO } from "../graphql/queries";

export default function Torneo({ onUpdateTorneo, id }) {
  const fetcher = async (query) => await graphQLClient.request(query, { id });
  const { data, loading, error, mutate } = useSWR(
    id ? [GET_INFO_TORNEO, id] : null,
    fetcher
  );

  if (loading) {
    return "Cargando...";
  }

  if (error) {
    console.log("ERROR TorneoPuntajes: ", error);
    return <div>Error al cargar los datos del torneo </div>;
  }

  async function handleTorneoDelete() {
    //mutation to delete "tablas"
    let tablasEstadisticasToDelete = [];

    // eslint-disable-next-line no-unused-expressions
    data?.findTorneoByID.tablas.data.map((tabla) => {
      tablasEstadisticasToDelete.push(
        graphQLClient.request(DELETE_ESTADISTICA_TABLA, {
          id: tabla._id,
        })
      );
      return null;
    });

    await Promise.all([tablasEstadisticasToDelete]);

    //mutation to delete "resultados"
    let resultadosToDelete = [];
    // eslint-disable-next-line no-unused-expressions
    data?.findTorneoByID.resultados.data.map((resultado) => {
      resultadosToDelete.push(
        graphQLClient.request(DELETE_ENFRENTAMIENTO, {
          id: resultado._id,
        })
      );
      return null;
    });

    await Promise.all([resultadosToDelete]);

    //mutation to delete torneo
    await graphQLClient.request(DELETE_TORNEO, {
      id: data?.findTorneoByID._id,
    });
  }

  async function onUpdate(
    esLocalJugadorActual,
    numeroEnfrentamiento,
    golesJugadorActual,
    nombreJugadorActual
  ) {
    mutate();

    let enfrentamiento =
      data?.findTorneoByID.resultados.data[numeroEnfrentamiento - 1];

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
      let jugadorActual = data?.findTorneoByID.tablas.data.filter(
        (tabla) => tabla.jugador === nombreJugadorActual
      )[0];

      let idToEditJugadorActual = jugadorActual._id;

      let nombreOtroJugador =
        jugadorActual.jugador === enfrentamiento.jugador1
          ? enfrentamiento.jugador2
          : enfrentamiento.jugador1;

      let otroJugador = data?.findTorneoByID.tablas.data.filter(
        (tabla) => tabla.jugador === nombreOtroJugador
      )[0];

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

      if (ganadorPartido === nombreJugadorActual) {
        puntosJugadorActual = 3;
        puntosOtroJugador = 0;
        pgJugadorActual = 1;
        ppOtroJugador = 1;
      } else if (ganadorPartido === nombreOtroJugador) {
        puntosJugadorActual = 0;
        puntosOtroJugador = 3;
        ppJugadorActual = 1;
        pgOtroJugador = 1;
      } else {
        empate = 1;
        puntosJugadorActual = 1;
        puntosOtroJugador = 1;
      }

      let golesAFavorActualizadosJugadorActual = jugadorActual.gf
        ? jugadorActual.gf + parseInt(golesJugadorActual)
        : parseInt(golesJugadorActual);

      let golesEnContraActualizadosJugadorActual = jugadorActual.gc
        ? parseInt(jugadorActual.gc) + parseInt(golesOtroJugador)
        : parseInt(golesOtroJugador);

      await graphQLClient.request(UPDATE_ESTADISTICA_TABLA, {
        id: idToEditJugadorActual,
        jugador: nombreJugadorActual,
        pj: jugadorActual.pj ? parseInt(jugadorActual.pj) + 1 : 1,
        gf: golesAFavorActualizadosJugadorActual,
        gc: golesEnContraActualizadosJugadorActual,
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
        difGoles:
          golesAFavorActualizadosJugadorActual -
          golesEnContraActualizadosJugadorActual,
      });

      let golesAFavorActualizadosOtroJugador = otroJugador.gf
        ? parseInt(otroJugador.gf) + parseInt(golesOtroJugador)
        : parseInt(golesOtroJugador);

      let golesEnContraActualizadosOtroJugador = otroJugador.gc
        ? parseInt(otroJugador.gc) + parseInt(golesJugadorActual)
        : parseInt(golesJugadorActual);

      //2) Actualizo tabla jugador anterior (probablemente el local)
      await graphQLClient.request(UPDATE_ESTADISTICA_TABLA, {
        id: idToEditOtroJugador,
        jugador: nombreOtroJugador,
        pj: otroJugador.pj ? parseInt(otroJugador.pj) + 1 : 1,
        gf: golesAFavorActualizadosOtroJugador,
        gc: golesEnContraActualizadosOtroJugador,
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
        difGoles:
          golesAFavorActualizadosOtroJugador -
          golesEnContraActualizadosOtroJugador,
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
        <div>
          <div className="relative h-32 w-32 ...">
            <div className="absolute top-0 right-0 h-16 w-16">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleTorneoDelete();
                }}
              >
                <i className={"fas fa-trash  text-red-500"}></i>
              </button>{" "}
            </div>
          </div>
        </div>
        <h3 className="w-full md:w-4/12 px-4 mr-auto ml-auto text-3xl mb-2 mt-4 font-semibold leading-normal text-center">
          Torneo{" "}
          <span className={"font-bold text-blue-600"}>
            #{data?.findTorneoByID?.numeroTorneo}
          </span>
        </h3>
        <section className="text-black body-font">
          <div className="flex">
            <div className="flex-col w-1/2 ">
              <div className="p-4 md:w-1/3 ml-24 ">
                <TorneoResultados
                  torneoData={data?.findTorneoByID}
                  onUpdate={onUpdate}
                />
              </div>{" "}
              <div
                className="p-4 w-1/2  ml-36 text-center bg-custom bg-opacity-50 shadow-lg rounded-lg mt-3  "
                style={{ maxHeight: "9rem" }}
              >
                <EquiposJugadores
                  torneoData={data ? data.findTorneoByID : []}
                />
              </div>
            </div>
            <div className="w-3/4">
              {id ? (
                <div className="flex-1 p-4">
                  <TorneoPuntajes id={id} />
                </div>
              ) : (
                <p>Cargando...</p>
              )}
            </div>
          </div>
        </section>
        <hr className="mt-6 border-b-1 border-gray-400" />
      </div>
    </>
  );
}
