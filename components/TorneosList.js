/* eslint-disable react/react-in-jsx-scope */
import { GET_TORNEOS_PARA_TEMPORADA } from "../graphql/queries";
import Torneo from "./Torneo";
import useSWR from "swr";
import { graphQLClient } from "../utils/grahpql-client";
import { classnames } from "tailwindcss-classnames";

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

    let campeonatosArray = [
      {
        nombre: "Chaca",
        campeonatos: 0,
      },
      {
        nombre: "Masa",
        campeonatos: 0,
      },
      {
        nombre: "Seba",
        campeonatos: 0,
      },
    ];

    // eslint-disable-next-line no-unused-expressions
    torneos?.map((torneo) => {
      if (torneo.campeon) {
        if (torneo.campeon === "Chaca") {
          campeonatosArray[0].campeonatos++;
        } else if (torneo.campeon === "Masa") {
          campeonatosArray[1].campeonatos++;
        } else {
          campeonatosArray[2].campeonatos++;
        }
      }
    });

    campeonatosArray.sort(function (a, b) {
      return b.campeonatos - a.campeonatos;
    });

    const numberOfLeaders = () => {
      if (
        campeonatosArray[0].campeonatos === campeonatosArray[1].campeonatos &&
        campeonatosArray[0].campeonatos === campeonatosArray[2].campeonatos
      ) {
        //triple empate
        return 3;
      } else if (
        campeonatosArray[0].campeonatos === campeonatosArray[1].campeonatos
      ) {
        //doble empate en la punta
        return 2;
      } else {
        return 1;
      }
    };

    const numberOfSecondPlace = () => {
      if (campeonatosArray[1].campeonatos === campeonatosArray[2].campeonatos) {
        return 2;
      } else {
        return 1;
      }
    };

    if (torneos.length > 0) {
      return (
        <>
          {torneos.length > 0 ? (
            <div className="flex  flex-col justify-center mt-4 mb-24">
              <h1 className="text-3xl font-semibold text-center ">
                Se {torneos.length === 1 ? "jugó" : "jugaron"}{" "}
                <span className="text-blue-600 font-semibold">
                  {torneos.length}
                </span>{" "}
                {torneos.length === 1 ? "torneo" : "torneos"} en {nombre}
              </h1>

              <h2 className="text-center text-2xl mt-2">
                {campeonatosArray[0].nombre} ganó{" "}
                <span
                  className={classnames("font-bold", {
                    "text-green-600": numberOfLeaders() === 1,
                    "text-yellow-500":
                      numberOfLeaders() === 2 || numberOfLeaders() === 3,
                  })}
                >
                  {campeonatosArray[0].campeonatos}{" "}
                </span>
                - {campeonatosArray[1].nombre} ganó{" "}
                <span
                  className={classnames("font-bold", {
                    "text-yellow-500":
                      numberOfSecondPlace() === 1 ||
                      numberOfSecondPlace() === 2,
                  })}
                >
                  {" "}
                  {campeonatosArray[1].campeonatos}{" "}
                </span>
                - {campeonatosArray[2].nombre} ganó{" "}
                <span
                  className={classnames("font-bold", {
                    "text-yellow-500": numberOfSecondPlace() === 2,
                    "text-red-500": numberOfSecondPlace() === 1,
                  })}
                >
                  {" "}
                  {campeonatosArray[2].campeonatos}
                </span>
              </h2>
            </div>
          ) : null}
          <ul>
            {torneos.map((torneo) => {
              return <Torneo key={torneo._id} id={torneo._id} />;
            })}
          </ul>
        </>
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
