/* eslint-disable react/react-in-jsx-scope */
import { useQuery } from "@apollo/react-hooks";
import withApollo from "../utils/withApollo";
import Torneo from "./Torneo";
import { GET_TORNEOS_PARA_TEMPORADA } from "../graphql/queries";

function TorneosList({ nombreTemporada }) {
  const { data, loading, error } = useQuery(GET_TORNEOS_PARA_TEMPORADA, {
    variables: { nombre: nombreTemporada },
  });

  if (loading) {
    return "Cargando...";
  }
  if (error) {
    console.log("ERROR: ", error);
  }

  if (data) {
    let torneos = data.temporadaByName.torneos.data;
    if (torneos.length > 0) {
      return (
        <ul>
          {data.temporadaByName.torneos.data.map((torneo) => {
            return <Torneo key={torneo._id} torneoData={torneo} />;
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
    return <p> Se rompió algo</p>;
  }
}

export default withApollo(TorneosList);
