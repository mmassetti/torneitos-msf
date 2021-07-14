/* eslint-disable react/react-in-jsx-scope */
import { GET_TORNEOS_PARA_TEMPORADA } from "../graphql/queries";
import { UPDATE_HISTORIAL_PARTIDOS_ENTRE_SI } from "../graphql/mutations";
import Torneo from "./Torneo";
import useSWR from "swr";
import { graphQLClient } from "../utils/grahpql-client";

function TorneosList({ nombre }) {
  const fetcher = async (query) =>
    await graphQLClient.request(query, { nombre });

  const { data, loading, error } = useSWR(
    nombre ? [GET_TORNEOS_PARA_TEMPORADA, nombre] : null,
    fetcher
  );

  if (loading) {
    return "Cargando...";
  }

  if (error) {
    console.log("ERROR TorneosList: ", error);
    return <div>Error al cargar los torneos</div>;
  }

  async function updateHistorialEntreJugadores(
    jugador1,
    jugador2,
    pgJugador1,
    pgJugador2,
    empate
  ) {
    let historialArray = data?.temporadaByName.historialPartidosEntreSi.data;

    historialArray.map(async (historial) => {
      if (
        (historial.jugador1 === jugador1 && historial.jugador2 === jugador2) ||
        (historial.jugador1 === jugador2 && historial.jugador2 === jugador1)
      ) {
        let finalPgJugador1 =
          historial.jugador1 === jugador1 ? pgJugador1 : pgJugador2;
        let finalPgJugador2 =
          historial.jugador2 === jugador2 ? pgJugador2 : pgJugador1;

        let finalVictoriasJugador1 =
          historial.victoriasJugador1 + finalPgJugador1;
        let finalVictoriasJugador2 =
          historial.victoriasJugador2 + finalPgJugador2;

        let finalEmpates = historial.empates + empate;

        await graphQLClient.request(UPDATE_HISTORIAL_PARTIDOS_ENTRE_SI, {
          id: historial._id,
          victoriasJugador1: finalVictoriasJugador1,
          victoriasJugador2: finalVictoriasJugador2,
          empates: finalEmpates,
        });
      }
    });
  }

  if (data) {
    let torneos = data.temporadaByName.torneos.data;

    if (torneos.length > 0) {
      return (
        <ul>
          {torneos.map((torneo) => {
            return (
              <Torneo
                key={torneo._id}
                id={torneo._id}
                onUpdateTorneo={updateHistorialEntreJugadores}
              />
            );
          })}
        </ul>
      );
    } else {
      return (
        <h3 className="text-center font-semibold text-2xl h-screen mt-8">
          Esta temporada todavía no tiene torneos
        </h3>
      );
    }
  } else {
    return <></>;
  }
}

export default TorneosList;
