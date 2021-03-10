/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import Torneo from "./Torneo";
import { graphQLClient } from "../utils/grahpql-client";
import { GET_TORNEOS_PARA_TEMPORADA } from "../graphql/queries";
import useSWR from "swr";

function TorneosList({ nombreTemporada, temporadasInfo, onUpdateTorneos }) {
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  async function onUpdateTorneo() {
    onUpdateTorneos();
    // alert("Update torneo torneos list");
    // setTriggerUpdate(true);
  }

  let temporada = temporadasInfo?.filter(
    (temporada) => temporada.nombre == nombreTemporada
  );

  let torneos = [];
  if (temporada && temporada[0]) {
    torneos = temporada[0].torneos.data;
  }

  if (torneos) {
    if (torneos.length > 0) {
      return (
        <ul>
          {torneos.map((torneo) => {
            return (
              <Torneo
                key={torneo._id}
                torneoData={torneo}
                onUpdateTorneo={onUpdateTorneo}
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
