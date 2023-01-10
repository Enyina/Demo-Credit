/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("transactions", (table) => {
    table.string("id");
    table.integer("src_id").index().references("acc_num").inTable("accounts");
    table.integer("dest_id").index().notNullable();
    table.float("amount").notNullable;
    table.string("status").notNullable;
    table.timestamp("tnx_time").defaultTo(knex.raw("now()"));
    table.string("description").nullable;
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("transactions");
};
