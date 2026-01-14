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
app.use(express.static("public"));

/* ======================
   JOBS ROUTES
====================== */

app.get("/api/jobs", async (_req, res) => {
  try {
    const jobs = await db("jobs").select("*").orderBy("created_at", "desc");
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
    const services = await db("services").select("*").orderBy("sort_order", "asc");

    const features = await db("service_features")
      .select("*")
      .orderBy("sort_order", "asc");

    const steps = await db("service_steps").select("*").orderBy("sort_order", "asc");

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
   DETAILED SERVICES ROUTES
====================== */
app.get("/api/detailed-services", async (_req, res) => {
  try {
    const services = await db("detailed_services")
      .select("*")
      .orderBy("sort_order", "asc");

    const features = await db("detailed_service_features")
      .select("*")
      .orderBy("sort_order", "asc");

    const grouped = services.map((service) => ({
      id: service.id,
      title: service.title,
      icon: service.icon,
      color: service.color,
      bgColor: service.bg_color,
      image: service.image_url,
      description: service.description,
      features: features
        .filter((feature) => feature.service_id === service.id)
        .map((feature) => feature.feature),
    }));

    res.json(grouped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch detailed services" });
  }
});

app.get("/api/detailed-services/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const service = await db("detailed_services").where({ id }).first();
    if (!service) {
      return res.status(404).json({ error: "Detailed service not found" });
    }

    const features = await db("detailed_service_features")
      .where({ service_id: service.id })
      .orderBy("sort_order", "asc");

    res.json({
      id: service.id,
      title: service.title,
      icon: service.icon,
      color: service.color,
      bgColor: service.bg_color,
      image: service.image_url,
      description: service.description,
      features: features.map((feature) => feature.feature),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch detailed service" });
  }
});

/* ======================
   ✅ SINGLE SERVICE DETAILS ROUTE
====================== */
app.get("/api/services/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const service = await db("services").where({ id }).first();
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    const features = await db("service_features")
      .where({ service_id: service.id })
      .orderBy("sort_order", "asc");

    const steps = await db("service_steps")
      .where({ service_id: service.id })
      .orderBy("sort_order", "asc");

    res.json({
      ...service,
      features: features.map((f) => f.feature),
      modalSteps: steps.map((s) => s.step),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch service" });
  }
});

app.get("/api/services/slug/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const normalized = slug.toLowerCase();

    const service = await db("services")
      .whereRaw("lower(title) = ?", [normalized])
      .first();

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    const features = await db("service_features")
      .where({ service_id: service.id })
      .orderBy("sort_order", "asc");

    const steps = await db("service_steps")
      .where({ service_id: service.id })
      .orderBy("sort_order", "asc");

    res.json({
      ...service,
      features: features.map((feature) => feature.feature),
      modalSteps: steps.map((step) => step.step),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch service" });
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

    let query = db("community_stories").select("*").orderBy("sort_order", "asc");
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

/* =========================
   VALUES ROUTES
========================= */
app.get("/api/values", async (_req, res) => {
  try {
    const rows = await db("values").select("*").orderBy("sort_order", "asc");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch values" });
  }
});

/* =========================
   TEAM ROUTES
========================= */
app.get("/api/team", async (_req, res) => {
  try {
    const team = await db("team_members").select("*").orderBy("sort_order", "asc");
    res.json(team);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch team members" });
  }
});

/* =========================
   ADDITIONAL SERVICES ROUTES
========================= */
app.get("/api/additional-services", async (_req, res) => {
  try {
    const rows = await db("additional_services")
      .select("*")
      .orderBy("sort_order", "asc");

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch additional services" });
  }
});

/* =========================
   CONTACT METHODS ROUTES
========================= */
app.get("/api/contact-methods", async (_req, res) => {
  try {
    const rows = await db("contact_methods")
      .select("*")
      .orderBy("sort_order", "asc")

    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch contact methods" })
  }
})

/* ======================
   START SERVER
====================== */

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
