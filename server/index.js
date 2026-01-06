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
   WHO WE SERVE ROUTES
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
   HOW WE HELP ROUTES
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
   APPROACH ROUTES
====================== */
app.get("/api/approach-steps", async (_req, res) => {
  try {
    const steps = await db("approach_steps")
      .select("*")
      .orderBy("sort_order", "asc");

    res.json(steps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch approach steps" });
  }
});

/* ======================
   COMMUNITY STORIES ROUTES
====================== */
app.get("/api/community-stories", async (req, res) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : null;

    let query = db("community_stories")
      .select("*")
      .orderBy("sort_order", "asc");

    if (limit) query = query.limit(limit);

    const stories = await query;
    res.json(stories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch community stories" });
  }
});

/* ======================
   CALL TO ACTION ROUTES
====================== */
app.get("/api/call-to-action", async (_req, res) => {
  try {
    const cta = await db("call_to_action").select("*").first();
    res.json(cta);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch call to action" });
  }
});
/* ======================
   MISSION & VISION ROUTES
====================== */
app.get("/api/mission-vision", async (_req, res) => {
  try {
    const row = await db("mission_vision").first();
    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch mission & vision" });
  }
});

/* ======================
   PARTNERS & FUNDERS ROUTES
====================== */
/* ==========================
   PARTNERS & FUNDERS ROUTES
   ========================== */

app.get("/api/partners", async (_req, res) => {
  try {
    const rows = await db("partners")
      .where({ type: "partner" })
      .orderBy("sort_order", "asc");

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch partners" });
  }
});

app.get("/api/funders", async (_req, res) => {
  try {
    const rows = await db("partners")
      .where({ type: "funder" })
      .orderBy("sort_order", "asc");

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch funders" });
  }
});

/* ======================
   START SERVER
====================== */

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`API running on port ${port}`);
});