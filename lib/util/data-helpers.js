function test (knex) {
  return knex
    .select("*")
    .from("users");
}






module.exports = {
  test: test
}
