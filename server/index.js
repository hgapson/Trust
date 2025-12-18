require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { db } = require("./db");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

/* ======================
   JOBS ROUTES
====================== */

app.get("/api/jobs", async (_req, res) => {
  try {
    const jobs = await db("jobs")
      .select("*")
      .orderBy("created_at", "desc");
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

app.post("/api/jobs", async (req, res) => {
  const { title, company, description } = req.body;

  if (!title || !company) {
    return res.status(400).json({ error: "title and company required" });
  }

  try {
    const [id] = await db("jobs").insert({ title, company, description });
    const job = await db("jobs").where({ id }).first();
    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create job" });
  }
});
/* ======================
   AUDIENCES ROUTES
====================== */
app.get("/api/audiences", async (_req, res) => {
  try {
    const audiences = await db("audiences")
      .select("*")
      .orderBy("sort_order", "asc");

    res.json(audiences);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch audiences" });
  }
});
/* ======================
   SERVICES ROUTES
====================== */

app.get("/api/services", async (_req, res) => {
  try {
    const services = await db("services")
      .select("*")
      .orderBy("sort_order", "asc");

    const features = await db("service_features")
      .select("*")
      .orderBy("sort_order", "asc");

    const steps = await db("service_steps")
      .select("*")
      .orderBy("sort_order", "asc");

    const grouped = services.map((service) => ({
      ...service,
      features: features
        .filter((f) => f.service_id === service.id)
        .map((f) => f.feature),
      modalSteps: steps
        .filter((s) => s.service_id === service.id)
        .map((s) => s.step),
    }));

    res.json(grouped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

/* ======================
   START SERVER
====================== */

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`API running on port ${port}`);
});