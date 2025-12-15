require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { db } = require('./db');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173'
  })
);
app.use(express.json());

app.get('/api/jobs', async (_req, res) => {
  try {
    const jobs = await db('jobs').select('*').orderBy('created_at', 'desc');
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

app.post('/api/jobs', async (req, res) => {
  const { title, company, description } = req.body;
  if (!title || !company) {
    return res.status(400).json({ error: 'title and company required' });
  }

  try {
    const [id] = await db('jobs').insert({ title, company, description });
    const job = await db('jobs').where({ id }).first();
    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create job' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
