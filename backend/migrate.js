/**
 * This script is optional — server will auto-create table on startup.
 * You can run: node migrate.js
 */
const path = require('path');
const Knex = require('knex');

const dbFile = path.join(__dirname, 'tutorials.sqlite');

const knex = Knex({
  client: 'sqlite3',
  connection: { filename: dbFile },
  useNullAsDefault: true
});

async function run() {
  const exists = await knex.schema.hasTable('tutorials');
  if (!exists) {
    await knex.schema.createTable('tutorials', (table) => {
      table.string('id').primary();
      table.string('title').notNullable();
      table.text('description').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
    console.log('Table created');
  } else {
    console.log('Table already exists');
  }
  await knex.destroy();
}

run().catch(err => { console.error(err); process.exit(1); });