const db = require("../data/db-config");

function find() {
  return db("schemes").select();
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

async function add(data) {
  const [id] = await db("schemes").insert(data);
  return db("schemes")
    .where({ id })
    .first();
}

async function update(body, id) {
  await db("schemes")
    .where({ id })
    .update(body);
  return findById(id);
}

function remove(id) {
  return db("schemes")
    .where({ id })
    .del();
}

function findSteps(scheme_id) {
  return db("schemes")
    .join("steps", "steps.id", "steps.scheme_id")
    .where({ scheme_id })
    .select(
      "steps.scheme_id",
      "steps.step_number",
      "steps.instructions",
      "schemes.scheme_name"
    );
}

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
  findSteps
};
