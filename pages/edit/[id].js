import Head from "next/head";
import { getTorneoById } from "../../utils/Fauna";
import TorneoForm from "../../components/TorneoForm";

export default function Home({ torneo }) {
  return (
    <div>
      <Head>
        <title>Update Next Torneo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-lg mx-auto">
        <h1 className="text-red-100 text-2xl mb-4">Update Torneo</h1>
        <TorneoForm torneo={torneo} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const id = context.params.id;
    const torneo = await getTorneoById(id);
    return {
      props: { torneo },
    };
  } catch (error) {
    console.error(error);
    context.res.statusCode = 302;
    context.res.setHeader("Location", `/`);
    return { props: {} };
  }
}
