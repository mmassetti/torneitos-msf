import React, { useEffect, useState } from "react";
import Select, { createFilter } from "react-select";
import { useForm, Controller } from "react-hook-form";
import getlistaEquipos from "../utils/constants";
import { useQuery } from "@apollo/react-hooks";
import withApollo from "../utils/withApollo";
import {
  GET_TEMPORADAS,
  GET_NUMERO_TORNEOS_TEMPORADA,
} from "../graphql/queries";

const getSortedTemporadas = (temporadas) => {
  return temporadas.sort((a, b) => (b.nombre > a.nombre ? 1 : -1));
};

function CrearTorneo({ onFinished, torneo }) {
  const { data, loading, error } = useQuery(GET_TEMPORADAS);

  const {
    data: getNumeroTorneosTemporada,
    loading: getNumeroTorneosTemporadaLoading,
    error: getNumeroTorneosTemporadaError,
  } = useQuery(GET_NUMERO_TORNEOS_TEMPORADA, {
    variables: { nombre: "2018/2019" },
  });

  if (loading || getNumeroTorneosTemporadaLoading) {
    return "Cargando...";
  }
  if (error || getNumeroTorneosTemporadaError) {
    console.log("ERROR: ", error);
  }

  let temporadas = data.allTemporadas.data;
  let sortedTemporadas = getSortedTemporadas(temporadas);

  let temporadasOptions = temporadas.map((temporada) => {
    return { value: temporada.nombre, label: temporada.nombre };
  });

  let numeroTorneo =
    getNumeroTorneosTemporada.temporadaByName.torneos.data.length + 1;

  const { register, handleSubmit, errors, control } = useForm({
    // defaultValues: {
    //   tabla: torneo ? torneo.data.tabla : "",
    //   ganador: torneo ? torneo.data.ganador : "",
    //   resultados: torneo ? torneo.data.resultados : "",
    //   equipos: torneo ? torneo.data.equipos : "",
    //   temporada: torneo ? torneo.data.temporada : "",
    //   numeroTorneo: torneo ? torneo.data.numeroTorneo : "",
    //   equipoChaca: torneo ? torneo.data.equipoChaca : "",
    //   equipoMasa: torneo ? torneo.data.equipoMasa : "",
    //   equipoSeba: torneo ? torneo.data.equipoMasa : "",
    // },
  });

  const [filterConfig] = useState({
    ignoreCase: true,
    ignoreAccents: true,
    trim: true,
    matchFrom: "any",
  });

  const createTorneo = async (data) => {
    const equipoChaca = data.equipoChaca.value;
    const equipoMasa = data.equipoMasa.value;
    const equipoSeba = data.equipoSeba.value;

    const { temporada, numeroTorneo } = data;

    try {
      console.log(
        "FORMULARIO: ",
        equipoChaca,
        equipoMasa,
        equipoSeba,
        temporada,
        numeroTorneo
      );
      // await fetch("/api/createTorneo", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     equipoChaca,
      //     equipoMasa,
      //     equipoSeba,
      //     temporada,
      //     numeroTorneo,
      //   }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      onFinished();
    } catch (err) {
      console.error(err);
    }
  };

  const updateTorneo = async (data) => {
    alert("update torneo");
    // const { tabla, ganador, resultados } = data;
    // const id = torneo.id;
    // try {
    //   await fetch("/api/updateTorneo", {
    //     method: "PUT",
    //     body: JSON.stringify({ tabla, ganador, resultados, id }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   // router.push("/");
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">Nuevo torneo</h6>
            <button
              onClick={() => alert("Lo tengo que hacer todavia esto...")}
              className="bg-green-500 active:bg-gray-700 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              Crear nueva temporada
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit(torneo ? updateTorneo : createTorneo)}>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 py-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Temporada
                  </label>
                  <Controller
                    defaultValue={
                      torneo
                        ? {
                            value: torneo.data.temporada,
                            label: torneo.data.temporada,
                          }
                        : {
                            value: sortedTemporadas[2].nombre,
                            label: sortedTemporadas[2].nombre,
                          }
                    }
                    name="temporada"
                    control={control}
                    options={temporadasOptions}
                    placeholder="Elegir temporada"
                    isClearable
                    isSearchable
                    filterOption={createFilter(filterConfig)}
                    as={Select}
                    rules={{ required: true }}
                  />

                  {errors.temporada && (
                    <p className="font-bold text-red-500">
                      La temporada es requerida
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4 py-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Número de torneo
                  </label>
                  <input
                    type="number"
                    id="numeroTorneo"
                    name="numeroTorneo"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue={numeroTorneo}
                    ref={register({ required: true })}
                  />

                  {errors.numeroTorneo && (
                    <p className="font-bold text-red-500">
                      El número de torneo es requerido
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Equipo chaca
                  </label>
                  <Controller
                    defaultValue={
                      torneo
                        ? {
                            value: torneo.data.equipoChaca,
                            label: torneo.data.equipoChaca,
                          }
                        : ""
                    }
                    name="equipoChaca"
                    control={control}
                    options={getlistaEquipos()}
                    placeholder="Elegir equipo"
                    isClearable
                    isSearchable
                    filterOption={createFilter(filterConfig)}
                    as={Select}
                    rules={{ required: true }}
                  />

                  {errors.equipoChaca && (
                    <p className="font-bold text-red-500">
                      Chaca, elegí un equipo, bobo
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Equipo masa
                  </label>
                  <Controller
                    defaultValue={
                      torneo
                        ? {
                            value: torneo.data.equipoMasa,
                            label: torneo.data.equipoMasa,
                          }
                        : ""
                    }
                    name="equipoMasa"
                    control={control}
                    options={getlistaEquipos()}
                    placeholder="Elegir equipo"
                    isClearable
                    isSearchable
                    filterOption={createFilter(filterConfig)}
                    as={Select}
                    rules={{ required: true }}
                  />

                  {errors.equipoMasa && (
                    <p className="font-bold text-red-500">
                      Masa, elegí un equipo, bobo
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Equipo Seba
                  </label>
                  <Controller
                    defaultValue={
                      torneo
                        ? {
                            value: torneo.data.equipoSeba,
                            label: torneo.data.equipoSeba,
                          }
                        : ""
                    }
                    name="equipoSeba"
                    control={control}
                    options={getlistaEquipos()}
                    placeholder="Elegir equipo"
                    isClearable
                    isSearchable
                    filterOption={createFilter(filterConfig)}
                    as={Select}
                    rules={{ required: true }}
                  />

                  {errors.equipoSeba && (
                    <p className="font-bold text-red-500">
                      Seba, elegí un equipo, bobo
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  ease-linear transition-all duration-150"
                type="submit"
              >
                Crear torneo
              </button>
              <button
                onClick={() => onFinished()}
                className="bg-indigo-500 text-white active:bg-indigo-600 text-sm font-bold uppercase ml-2 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  ease-linear transition-all duration-150"
                type="button"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default withApollo(CrearTorneo);
