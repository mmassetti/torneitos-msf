// import { getTorneos } from "../../utils/Fauna";

// export default async function handler(req, res) {
//   if (req.method !== "GET") {
//     return res.status(405);
//   }
//   try {
//     const torneos = await getTorneos();
//     return res.status(200).json(torneos);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Something went wrong." });
//   }
// }

import { query as q } from "faunadb";
import { serverClient } from "../../utils/fauna-auth";

export default async (req, res) => {
  try {
    const torneos = await serverClient.query(
      q.Map(
        // iterate each item in result
        q.Paginate(
          // make paginatable
          q.Match(
            // query index
            q.Index("allTorneos") // specify source
          )
        ),
        (ref) => q.Get(ref) // lookup each result by its reference
      )
    );
    // ok
    res.status(200).json(torneos.data);
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};
