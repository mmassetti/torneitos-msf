/* eslint-disable react/react-in-jsx-scope */
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import withApollo from "../utils/withApollo";
import Torneo from "./Torneo";

const GET_TORNEOS = gql`
  {
    allTorneos {
      data {
        _id
        numeroTorneo
        temporada {
          _id
        }
        equipoMasa
        equipoChaca
        equipoSeba
        ganador
        resultados {
          data {
            jugador1
            jugador2
            golesJugador1
            golesJugador2
            numeroEnfrentamiento
          }
        }
        tablas {
          data {
            jugador
            puntos
            pj
            pg
            pe
            pp
            gf
            gc
          }
        }
      }
    }
  }
`;

function TorneosList() {
  const { data, loading, error } = useQuery(GET_TORNEOS);
  console.log("🚀 ~ file: TorneosList.js ~ line 46 ~ TorneosList ~ data", data);
  if (loading) {
    return "Loading...";
  }
  if (error) {
    console.log("ERROR: ", error);
  }

  if (data) {
    return (
      <ul>
        {data.allTorneos.data.map((torneo) => {
          return <Torneo key={torneo._id} torneoData={torneo} />;
        })}
      </ul>
    );
  } else {
    return <p> Se rompió algo</p>;
  }
}

export default withApollo(TorneosList);
