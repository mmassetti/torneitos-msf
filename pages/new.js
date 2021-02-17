import Head from "next/head";
import TorneoForm from "../components/TorneoForm";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Torneitos MSF</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-lg mx-auto">
        <h1 className="text-red-100 text-2xl mb-4">Nuevo torneo</h1>
        <TorneoForm />
      </main>
    </div>
  );
}
