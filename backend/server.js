const express = require('express');
const cors = require('cors');
const path = require('path');
const Knex = require('knex');

const dbFile = path.join(__dirname, 'tutorials.sqlite');

const knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: dbFile
  },
  useNullAsDefault: true
});

// Initialize table if missing
async function init() {
  const exists = await knex.schema.hasTable('tutorials');
  if (!exists) {
    await knex.schema.createTable('tutorials', (table) => {
      table.string('id').primary();
      table.string('title').notNullable();
      table.text('description').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
    // seed
    await knex('tutorials').insert([
      { id: '1', title: 'Getting started with React', description: 'Intro to components, props and state.' },
      { id: '2', title: 'Building REST APIs with Express', description: 'Create routes, middleware and connect to DB.' }
    ]);
  }
}

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/tutorials', async (req, res) => {
  try {
    const rows = await knex('tutorials').select('*').orderBy('created_at', 'desc');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

app.post('/api/tutorials', async (req, res) => {
  try {
    const { title, description } = req.body;
    const id = Date.now().toString();
    await knex('tutorials').insert({ id, title, description });
    const row = await knex('tutorials').where({ id }).first();
    res.status(201).json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

app.put('/api/tutorials/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    await knex('tutorials').where({ id }).update(payload);
    const row = await knex('tutorials').where({ id }).first();
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

app.delete('/api/tutorials/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await knex('tutorials').where({ id }).del();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

const PORT = process.env.PORT || 4000;
init().then(() => {
  app.listen(PORT, () => console.log('Backend (SQLite+Knex) running on', PORT));
}).catch(err => {
  console.error('Failed to initialize DB', err);
});