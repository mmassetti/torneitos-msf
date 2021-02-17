import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";

export default function TorneoForm({ torneo }) {
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      tabla: torneo ? torneo.data.tabla : "",
      ganador: torneo ? torneo.data.ganador : "",
      resultados: torneo ? torneo.data.resultados : "",
    },
  });
  const router = useRouter();

  const createTorneo = async (data) => {
    const { tabla, ganador, resultados } = data;

    try {
      await fetch("/api/createTorneo", {
        method: "POST",
        body: JSON.stringify({ tabla, ganador, resultados }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  const updateTorneo = async (data) => {
    const { tabla, ganador, resultados } = data;
    const id = torneo.id;
    try {
      await fetch("/api/updateTorneo", {
        method: "PUT",
        body: JSON.stringify({ tabla, ganador, resultados, id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form onSubmit={handleSubmit(torneo ? updateTorneo : createTorneo)}>
      <div className="mb-4">
        <label
          className="block text-red-100 text-sm font-bold mb-1"
          htmlFor="name"
        >
          Tabla
        </label>
        <input
          type="text"
          id="tabla"
          name="tabla"
          className="w-full border bg-white rounded px-3 py-2 outline-none text-gray-700"
          ref={register({ required: true })}
        />
        {errors.tabla && (
          <p className="font-bold text-red-900">Tabla is required</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-red-100 text-sm font-bold mb-1"
          htmlFor="language"
        >
          Ganador
        </label>
        <select
          id="ganador"
          name="ganador"
          className="w-full border bg-white rounded px-3 py-2 outline-none text-gray-700"
          ref={register({ required: true })}
        >
          <option className="py-1">Chaca</option>
          <option className="py-1">Masa</option>
          <option className="py-1">Seba</option>
        </select>
        {errors.ganador && (
          <p className="font-bold text-red-900">Ganador is required</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-red-100 text-sm font-bold mb-1"
          htmlFor="description"
        >
          Resultados
        </label>
        <textarea
          name="resultados"
          id="resultados"
          rows="3"
          className="resize-none w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          placeholder="What does the torneo do?"
          ref={register({ required: true })}
        ></textarea>
        {errors.resultados && (
          <p className="font-bold text-red-900">Resultados is required.</p>
        )}
      </div>

      <button
        className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
        type="submit"
      >
        Guardar
      </button>
      <Link href="/">
        <a className="mt-3 inline-block bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Cancelar
        </a>
      </Link>
    </form>
  );
}
