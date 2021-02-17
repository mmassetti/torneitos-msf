import { createTorneo } from "../../utils/Fauna";
export default async function handler(req, res) {
  const { tabla, ganador, resultados } = req.body;
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method not allowed" });
  }
  try {
    const createdTorneo = await createTorneo(tabla, ganador, resultados);
    return res.status(200).json(createdTorneo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong." });
  }
}
