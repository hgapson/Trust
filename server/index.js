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
   ADMIN: WHO WE SERVE
====================== */
app.get("/api/admin/audiences", async (_req, res) => {
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

app.post("/api/admin/audiences", async (req, res) => {
  const { title, description, icon, color, bgColor, sort_order } = req.body;

  if (!title || !description || !icon || !color || !bgColor) {
    return res.status(400).json({
      error: "title, description, icon, color, bgColor are required",
    });
  }

  try {
    const [id] = await db("audiences").insert({
      title,
      description,
      icon,
      color,
      bgColor,
      sort_order: Number(sort_order) || 0,
    });
    const created = await db("audiences").where({ id }).first();
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create audience" });
  }
});

app.patch("/api/admin/audiences/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid id" });

  const { title, description, icon, color, bgColor, sort_order } = req.body;

  if (!title || !description || !icon || !color || !bgColor) {
    return res.status(400).json({
      error: "title, description, icon, color, bgColor are required",
    });
  }

  try {
    const updated = await db("audiences")
      .where({ id })
      .update({
        title,
        description,
        icon,
        color,
        bgColor,
        sort_order: Number(sort_order) || 0,
      });
    if (!updated) return res.status(404).json({ error: "Not found" });
    const row = await db("audiences").where({ id }).first();
    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update audience" });
  }
});

app.delete("/api/admin/audiences/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid id" });

  try {
    const deleted = await db("audiences").where({ id }).del();
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete audience" });
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
   ADMIN: HOW WE HELP (SERVICES)
====================== */
app.get("/api/admin/services", async (_req, res) => {
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

app.post("/api/admin/services", async (req, res) => {
  const { title, description, icon, color, bgColor, modalDetails, sort_order, features, modalSteps } = req.body;

  if (!title || !description || !icon || !color || !bgColor) {
    return res.status(400).json({
      error: "title, description, icon, color, bgColor are required",
    });
  }

  try {
    const [id] = await db("services").insert({
      title,
      description,
      icon,
      color,
      bgColor,
      modalDetails: modalDetails || null,
      sort_order: Number(sort_order) || 0,
    });

    const featureRows = Array.isArray(features) ? features : [];
    const stepRows = Array.isArray(modalSteps) ? modalSteps : [];

    if (featureRows.length) {
      await db("service_features").insert(
        featureRows.map((feature, index) => ({
          service_id: id,
          feature,
          sort_order: index,
        })),
      );
    }

    if (stepRows.length) {
      await db("service_steps").insert(
        stepRows.map((step, index) => ({
          service_id: id,
          step,
          sort_order: index,
        })),
      );
    }

    const created = await db("services").where({ id }).first();
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create service" });
  }
});

app.patch("/api/admin/services/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid id" });

  const { title, description, icon, color, bgColor, modalDetails, sort_order, features, modalSteps } = req.body;

  if (!title || !description || !icon || !color || !bgColor) {
    return res.status(400).json({
      error: "title, description, icon, color, bgColor are required",
    });
  }

  try {
    const updated = await db("services")
      .where({ id })
      .update({
        title,
        description,
        icon,
        color,
        bgColor,
        modalDetails: modalDetails || null,
        sort_order: Number(sort_order) || 0,
      });

    if (!updated) return res.status(404).json({ error: "Not found" });

    const featureRows = Array.isArray(features) ? features : [];
    const stepRows = Array.isArray(modalSteps) ? modalSteps : [];

    await db("service_features").where({ service_id: id }).del();
    await db("service_steps").where({ service_id: id }).del();

    if (featureRows.length) {
      await db("service_features").insert(
        featureRows.map((feature, index) => ({
          service_id: id,
          feature,
          sort_order: index,
        })),
      );
    }

    if (stepRows.length) {
      await db("service_steps").insert(
        stepRows.map((step, index) => ({
          service_id: id,
          step,
          sort_order: index,
        })),
      );
    }

    const row = await db("services").where({ id }).first();
    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update service" });
  }
});

app.delete("/api/admin/services/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid id" });

  try {
    const deleted = await db("services").where({ id }).del();
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete service" });
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
   ADMIN: APPROACH STEPS
====================== */
app.get("/api/admin/approach-steps", async (_req, res) => {
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

app.post("/api/admin/approach-steps", async (req, res) => {
  const { title, description, icon, step, sort_order } = req.body;

  if (!title || !description || !icon || !step) {
    return res.status(400).json({
      error: "title, description, icon, step are required",
    });
  }

  try {
    const [id] = await db("approach_steps").insert({
      title,
      description,
      icon,
      step,
      sort_order: Number(sort_order) || 0,
    });
    const created = await db("approach_steps").where({ id }).first();
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create approach step" });
  }
});

app.patch("/api/admin/approach-steps/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid id" });

  const { title, description, icon, step, sort_order } = req.body;

  if (!title || !description || !icon || !step) {
    return res.status(400).json({
      error: "title, description, icon, step are required",
    });
  }

  try {
    const updated = await db("approach_steps")
      .where({ id })
      .update({
        title,
        description,
        icon,
        step,
        sort_order: Number(sort_order) || 0,
      });

    if (!updated) return res.status(404).json({ error: "Not found" });
    const row = await db("approach_steps").where({ id }).first();
    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update approach step" });
  }
});

app.delete("/api/admin/approach-steps/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid id" });

  try {
    const deleted = await db("approach_steps").where({ id }).del();
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete approach step" });
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
   ADMIN: CALL TO ACTION
====================== */
app.get("/api/admin/call-to-action", async (_req, res) => {
  try {
    const cta = await db("call_to_action").select("*").first();
    res.json(cta);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch call to action" });
  }
});

app.patch("/api/admin/call-to-action", async (req, res) => {
  const {
    heading,
    description,
    phone,
    email,
    location,
    availability,
    image_url,
    card_title,
    card_description,
    cta_label,
  } = req.body;

  if (
    !heading ||
    !description ||
    !phone ||
    !email ||
    !location ||
    !availability ||
    !image_url ||
    !card_title ||
    !card_description ||
    !cta_label
  ) {
    return res.status(400).json({
      error:
        "heading, description, phone, email, location, availability, image_url, card_title, card_description, cta_label are required",
    });
  }

  try {
    const existing = await db("call_to_action").select("id").first();

    if (existing?.id) {
      await db("call_to_action")
        .where({ id: existing.id })
        .update({
          heading,
          description,
          phone,
          email,
          location,
          availability,
          image_url,
          card_title,
          card_description,
          cta_label,
        });
      const updated = await db("call_to_action").where({ id: existing.id }).first();
      return res.json(updated);
    }

    const [id] = await db("call_to_action").insert({
      heading,
      description,
      phone,
      email,
      location,
      availability,
      image_url,
      card_title,
      card_description,
      cta_label,
    });
    const created = await db("call_to_action").where({ id }).first();
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update call to action" });
  }
});

app.delete("/api/admin/call-to-action", async (_req, res) => {
  try {
    await db("call_to_action").del();
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete call to action" });
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

/* =========================
   UPCOMING WORKSHOP ROUTES
========================= */
app.get("/api/workshops", async (req, res) => {
  try {
    const upcomingOnly = req.query.upcoming === "true"

    let query = db("workshops").select("*").where({ is_active: 1 })

    if (upcomingOnly) {
      query = query.where("start_at", ">=", db.fn.now())
    }

    const rows = await query.orderBy("start_at", "asc")
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch workshops" })
  }
})

/* =========================
   WORKSHOP REGISTRATION ROUTES
========================= */
app.post("/api/workshops/:id/register", async (req, res) => {
  const workshopId = Number(req.params.id)
  const { full_name, email, phone, notes } = req.body

  if (!full_name || !email) {
    return res.status(400).json({ error: "full_name and email are required" })
  }

  try {
    const workshop = await db("workshops").where({ id: workshopId }).first()
    if (!workshop) return res.status(404).json({ error: "Workshop not found" })

    // Optional capacity check
    if (workshop.capacity) {
      const [{ count }] = await db("workshop_registrations")
        .where({ workshop_id: workshopId })
        .count({ count: "*" })

      if (Number(count) >= workshop.capacity) {
        return res.status(409).json({ error: "Workshop is full" })
      }
    }

    const [id] = await db("workshop_registrations").insert({
      workshop_id: workshopId,
      full_name,
      email,
      phone: phone || null,
      notes: notes || null,
    })

    const row = await db("workshop_registrations").where({ id }).first()
    res.status(201).json(row)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to register" })
  }
})

/* =========================
   ADMIN: WORKSHOP REGISTRATIONS
========================= */

app.get("/api/admin/workshop-registrations", async (_req, res) => {
  try {
    const rows = await db("workshop_registrations as r")
      .leftJoin("workshops as w", "r.workshop_id", "w.id")
      .select(
        "r.id",
        "r.workshop_id",
        "r.full_name",
        "r.email",
        "r.phone",
        "r.notes",
        "r.status",
        "r.created_at",
        "w.title as workshop_title",
        "w.start_at",
        "w.end_at"
      )
      .orderBy("r.created_at", "desc");

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch registrations" });
  }
});

app.patch("/api/admin/workshop-registrations/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    const allowed = new Set(["new", "contacted", "closed"]);
    if (!allowed.has(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    await db("workshop_registrations").where({ id }).update({ status });
    const updated = await db("workshop_registrations").where({ id }).first();

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update registration" });
  }
});

app.delete("/api/admin/workshop-registrations/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await db("workshop_registrations").where({ id }).del();
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete registration" });
  }
});

/* =========================
   PROCESS TIMELINE ROUTES
========================= */
app.get("/api/process-steps", async (_req, res) => {
  try {
    const steps = await db("process_steps")
      .select("*")
      .orderBy("sort_order", "asc");

    res.json(steps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch process steps" });
  }
});

/* =========================
   VOLUNTEER OPPORTUNITIES ROUTES
========================= */

app.get("/api/volunteer-opportunities", async (_req, res) => {
  try {
    const opportunities = await db("volunteer_opportunities").select("*");
    res.json(opportunities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch volunteer opportunities" });
  }
});

/* ======================
   SUPPORT WAYS ROUTES
====================== */

app.get("/api/support-ways", async (_req, res) => {
  try {
    const rows = await db("support_ways").select("*").orderBy("sort_order", "asc")
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch support ways" })
  }
})

/* ======================
   ADMIN: SUPPORT WAYS
====================== */

app.get("/api/admin/support-ways", async (_req, res) => {
  try {
    const rows = await db("support_ways").select("*").orderBy("sort_order", "asc")
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch support ways" })
  }
})

app.post("/api/admin/support-ways", async (req, res) => {
  const { title, description, icon_key, color, bg_color, sort_order } = req.body

  if (!title || !description || !icon_key || !color || !bg_color) {
    return res.status(400).json({
      error: "title, description, icon_key, color, bg_color are required",
    })
  }

  try {
    const [id] = await db("support_ways").insert({
      title,
      description,
      icon_key,
      color,
      bg_color,
      sort_order: Number(sort_order) || 0,
    })

    const created = await db("support_ways").where({ id }).first()
    res.status(201).json(created)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to create support way" })
  }
})

app.delete("/api/admin/support-ways/:id", async (req, res) => {
  const id = Number(req.params.id)
  if (!id) return res.status(400).json({ error: "Invalid id" })

  try {
    const deleted = await db("support_ways").where({ id }).del()
    if (!deleted) return res.status(404).json({ error: "Not found" })
    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to delete support way" })
  }
})
/* ======================
   START SERVER
====================== */

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
