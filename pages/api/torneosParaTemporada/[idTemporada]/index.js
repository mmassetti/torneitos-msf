import { query as q } from "faunadb";
import { serverClient } from "../../../../utils/fauna-auth";

export default async (req, res) => {
  const {
    query: { idTemporada },
  } = req;

  try {
    const torneosParaTemporada = await serverClient.query(
      q.Get(q.Ref(q.Collection("temporadas"), idTemporada))
    );
    console.log(
      "🚀 ~ file: index.js ~ line 14 ~ torneosParaTemporada ",
      torneosParaTemporada
    );
    res.status(200).json(torneosParaTemporada.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
