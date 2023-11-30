/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.increments("id").primary();
      table.uuid("uuid").defaultTo(knex.fn.uuid());
      table.string("name", 255).notNullable();
      table.date("birthday").notNullable();
      table.integer("age").notNullable();
      table.timestamps();
    })
    .createTable("comments", function (table) {
      table.increments("id").primary();
      table.string("text", 255).notNullable();
      table.integer("user_id").unsigned().references("users.id");
      table.timestamps();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
