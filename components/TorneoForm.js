import React, { useState } from "react";
import Select, { createFilter } from "react-select";
import { useForm, Controller } from "react-hook-form";

const listaEquipos = [
  { value: "Ajax", label: "Ajax" },
  { value: "Arsenal", label: "Arsenal" },
  { value: "Atlético madrid", label: "Atlético Madrid" },
  { value: "Barcelona", label: "Barcelona" },
  { value: "Bayern Munich", label: "Bayern Munich" },
  { value: "Borussia Dortmund", label: "Borussia Dortmund" },
  { value: "Chelsea", label: "Chelsea" },
  { value: "Inter", label: "Inter" },
  { value: "Juventus", label: "Juventus" },
  { value: "Liverpool", label: "Liverpool" },
  { value: "Manchester City", label: "Manchester City" },
  { value: "Manchester United", label: "Manchester United" },
  { value: "PSG", label: "PSG" },
  { value: "Real Madrid", label: "Real Madrid" },
  { value: "Tottenham", label: "Tottenham" },
];

export default function CrearTorneo({ onCancel, torneo }) {
  const { register, handleSubmit, errors, control, reset } = useForm({
    defaultValues: {
      tabla: torneo ? torneo.data.tabla : "",
      ganador: torneo ? torneo.data.ganador : "",
      resultados: torneo ? torneo.data.resultados : "",
      equipos: torneo ? torneo.data.equipos : "",
      temporada: torneo ? torneo.data.temporada : "",
      numeroTorneo: torneo ? torneo.data.numeroTorneo : "",
      equipoChaca: torneo ? torneo.data.equipoChaca : "",
    },
  });

  const [filterConfig, setFilterConfig] = useState({
    ignoreCase: true,
    ignoreAccents: true,
    trim: true,
    matchFrom: "start",
  });

  const createTorneo = async (data) => {
    console.log(
      "🚀 ~ file: TorneoForm.js ~ line 43 ~ createTorneo ~ data",
      data
    );

    console.log(
      "🚀 ~ file: TorneoForm.js ~ line 25 ~ CrearTorneo ~ errors",
      errors
    );

    const equipoChaca = data.equipoChaca.value;
    const equipoMasa = data.equipoMasa.value;
    const equipoSeba = data.equipoSeba.value;

    const {
      // tabla,
      // ganador,
      // resultados,
      temporada,
      numeroTorneo,
    } = data;

    try {
      await fetch("/api/createTorneo", {
        method: "POST",
        body: JSON.stringify({
          equipoChaca,
          equipoMasa,
          equipoSeba,
          temporada,
          numeroTorneo,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // router.push("/");
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
              className="bg-green-500 active:bg-gray-700 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              Sortear equipos
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
                  <input
                    type="text"
                    id="temporada"
                    name="temporada"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue="2021" //TODO: bring latest from database
                    ref={register({ required: true })}
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
                    defaultValue="4" //TODO: bring latest from database
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
                    name="equipoChaca"
                    control={control}
                    options={listaEquipos}
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
                    name="equipoMasa"
                    control={control}
                    options={listaEquipos}
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
                    name="equipoSeba"
                    control={control}
                    options={listaEquipos}
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
                // disabled= Si alguno no eligio equipo
                onClick={() => onCancel()}
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
