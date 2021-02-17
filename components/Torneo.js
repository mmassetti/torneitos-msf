import React from "react";
import Code from "./code";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Torneo({ torneo, torneoDeleted }) {
  console.log("🚀 ~ file: Torneo.js ~ line 7 ~ Torneo ~ torneo", torneo);
  const router = useRouter();

  const deleteTorneo = async () => {
    try {
      await fetch("/api/deleteTorneo", {
        method: "DELETE",
        body: JSON.stringify({ id: torneo.id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      torneoDeleted();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="bg-gray-100 p-4 rounded-md my-2 shadow-lg">
      {torneo.data.ganador ? torneo.data.ganador : null}

      <div>
        <Link href={`/edit/${torneo.id}`}>
          <a className="text-gray-800 mr-2">Editar</a>
        </Link>
        <button onClick={deleteTorneo} className="text-gray-800 mr-2">
          Eliminar
        </button>
      </div>
    </div>
  );
}
