const faunadb = require("faunadb");
const faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET });
const q = faunadb.query;

const getTorneos = async () => {
  const { data } = await faunaClient.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("torneos"))),
      q.Lambda("ref", q.Get(q.Var("ref")))
    )
  );
  const torneos = data.map((torneo) => {
    torneo.id = torneo.ref.id;
    delete torneo.ref;
    return torneo;
  });

  return torneos;
};

const getTorneoById = async (id) => {
  const torneo = await faunaClient.query(
    q.Get(q.Ref(q.Collection("torneos"), id))
  );
  torneo.id = torneo.ref.id;
  delete torneo.ref;
  return torneo;
};

const createTorneo = async (
  equipoChaca,
  equipoMasa,
  equipoSeba,
  temporada,
  numeroTorneo
) => {
  return await faunaClient.query(
    q.Create(q.Collection("torneos"), {
      data: { equipoChaca, equipoMasa, equipoSeba, temporada, numeroTorneo },
    })
  );
};

const updateTorneo = async (
  id,
  tabla,
  ganador,
  resultados,
  equipoChaca,
  equipoMasa,
  equipoSeba,
  temporada,
  numeroTorneo
) => {
  return await faunaClient.query(
    q.Update(q.Ref(q.Collection("torneos"), id), {
      data: {
        tabla,
        ganador,
        resultados,
        equipoChaca,
        equipoMasa,
        equipoSeba,
        temporada,
        numeroTorneo,
      },
    })
  );
};

const deleteTorneo = async (id) => {
  return await faunaClient.query(q.Delete(q.Ref(q.Collection("torneos"), id)));
};

module.exports = {
  createTorneo,
  getTorneos,
  getTorneoById,
  updateTorneo,
  deleteTorneo,
};
