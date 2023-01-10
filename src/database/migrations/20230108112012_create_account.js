/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("accounts", (table) => {
    table.integer("acc_num").primary();
    table.float("balance").notNullable;
    table.string("user_id").index().references("id").inTable("users");
    table.timestamp("createdAt").defaultTo(knex.raw("now()"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("accounts");
};
