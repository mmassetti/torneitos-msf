/* eslint-disable react/react-in-jsx-scope */
import { useQuery } from "@apollo/react-hooks";
import withApollo from "../utils/withApollo";
import Torneo from "./Torneo";
import { GET_TORNEOS_PARA_TEMPORADA } from "../graphql/queries";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

function TorneosList({ idTemporada }) {
  console.log(
    "🚀 ~ file: TorneosList.js ~ line 11 ~ TorneosList ~ idTemporada ",
    idTemporada
  );
  // const { data, loading, error } = useQuery(GET_TORNEOS_PARA_TEMPORADA, {
  //   variables: { nombre: nombreTemporada },
  // });

  const { data, loading, error } = useSWR(
    `/api/torneosParaTemporada/${idTemporada}`,
    fetcher
  );
  // console.log("🚀 ~ file: TorneosList.js ~ line 16 ~ TorneosList ~ data", data);

  if (loading) {
    return "Cargando...";
  }

  if (error) {
    console.log("ERROR TorneosList: ", error);
    return <div>Error al cargar los torneos de esta temporada </div>;
  }

  // console.log("🚀 ~ file: TorneosList.js ~ line 9 ~ TorneosList ~ data", data);

  // if (data) {
  //   let torneos = data.temporadaByName.torneos.data;
  //   if (torneos.length > 0) {
  //     return (
  //       <ul>
  //         {data.temporadaByName.torneos.data.map((torneo) => {
  //           return <Torneo key={torneo._id} torneoData={torneo} />;
  //         })}
  //       </ul>
  //     );
  //   } else {
  //     return (
  //       <h3 className="text-center font-semibold text-2xl h-screen mt-8">
  //         Esta temporada todavía no tiene torneos
  //       </h3>
  //     );
  //   }
  // } else {
  //   return <p> Se rompió algo</p>;
  // }
  return <p>info de cada torneo</p>;
}

export default withApollo(TorneosList);
