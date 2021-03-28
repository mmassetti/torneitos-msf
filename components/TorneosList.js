/* eslint-disable react/react-in-jsx-scope */
import { GET_TORNEOS_PARA_TEMPORADA } from "../graphql/queries";
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

  if (data) {
    let torneos = data.temporadaByName.torneos.data;

    if (torneos.length > 0) {
      return (
        <ul>
          {torneos.map((torneo) => {
            return <Torneo key={torneo._id} id={torneo._id} />;
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
