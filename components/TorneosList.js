/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import Torneo from "./Torneo";
import { graphQLClient } from "../utils/grahpql-client";
import { GET_TORNEOS_PARA_TEMPORADA } from "../graphql/queries";

function TorneosList({ nombreTemporada }) {
  const [torneos, setTorneos] = useState("");

  useEffect(() => {
    async function getTorneos() {
      const variables = {
        nombre: nombreTemporada,
      };

      const torneosParaTemporada = await graphQLClient.request(
        GET_TORNEOS_PARA_TEMPORADA,
        variables
      );

      setTorneos(torneosParaTemporada.temporadaByName.torneos.data);
    }
    getTorneos();
  }, [nombreTemporada]);

  if (torneos) {
    if (torneos.length > 0) {
      return (
        <ul>
          {torneos.map((torneo) => {
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
    return <></>;
  }
}

export default TorneosList;
