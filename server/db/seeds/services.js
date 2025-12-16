exports.seed = async function (knex) {
  await knex("service_steps").del();
  await knex("service_features").del();
  await knex("services").del();

  const [motivateId] = await knex("services").insert({
    title: "Motivate",
    description:
      "Build partnerships that recognize your capabilities, abilities and skills",
    icon: "Heart",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    modalDetails:
      "We start with a guided conversation to understand your story, aspirations, and the barriers in your way. Together we map your strengths and design a plan that keeps you motivated and moving forward.",
    sort_order: 1,
  });

  const [equipId] = await knex("services").insert({
    title: "Equip",
    description:
      "Provide the tools, resources, and training needed for workplace success",
    icon: "Wrench",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    modalDetails:
      "Once we know what you want, we give you the tools to get there. From CVs to interview practice, we focus on practical coaching and resources tailored to the roles and industries you’re targeting.",
    sort_order: 2,
  });

  const [achieveId] = await knex("services").insert({
    title: "Achieve",
    description: "Inspire success and reduce inequality through meaningful outcomes",
    icon: "Target",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    modalDetails:
      "We stay with you through applications, interviews, and those crucial first weeks in a new role. Our team advocates for you with employers and makes sure you settle in with confidence.",
    sort_order: 3,
  });

  await knex("service_features").insert([
    { service_id: motivateId, feature: "Build partnership with tangata whairora that recognises capabilities", sort_order: 1 },
    { service_id: motivateId, feature: "Empower migrants and former refugees with tools and support", sort_order: 2 },
    { service_id: motivateId, feature: "Create opportunities in ethnic communities affected by unemployment", sort_order: 3 },

    { service_id: equipId, feature: "Assist with preparation of work skills needed", sort_order: 1 },
    { service_id: equipId, feature: "Provide career information and connect with opportunities", sort_order: 2 },
    { service_id: equipId, feature: "Organize workshops for communication and employment skills", sort_order: 3 },
    { service_id: equipId, feature: "Link to upskilling and training courses", sort_order: 4 },

    { service_id: achieveId, feature: "Inspire tangata whairora to gain skills and achieve success", sort_order: 1 },
    { service_id: achieveId, feature: "Reduce inequality of income and opportunity", sort_order: 2 },
    { service_id: achieveId, feature: "Enhance well-being through positive engagement and relationships", sort_order: 3 },
    { service_id: achieveId, feature: "Foster trust, belonging, shared values and participation in society", sort_order: 4 },
  ]);

  await knex("service_steps").insert([
    { service_id: motivateId, step: "30–45 minute discovery session to define your goals and constraints", sort_order: 1 },
    { service_id: motivateId, step: "Strengths mapping plus a summary you can share with employers or mentors", sort_order: 2 },
    { service_id: motivateId, step: "Confidence-building check-ins and community connections for encouragement", sort_order: 3 },

    { service_id: equipId, step: "Hands-on workshops for CV, cover letters, and LinkedIn clean-up", sort_order: 1 },
    { service_id: equipId, step: "Industry-specific language support and mock interviews with feedback", sort_order: 2 },
    { service_id: equipId, step: "Introductions to short courses or micro-credentials matched to your path", sort_order: 3 },

    { service_id: achieveId, step: "Warm introductions to employers who value migrant and former refugee talent", sort_order: 1 },
    { service_id: achieveId, step: "Support with work trials or placements, including clear expectations for both sides", sort_order: 2 },
    { service_id: achieveId, step: "Post-placement follow-ups for the first 90 days so you have backup when you need it", sort_order: 3 },
  ]);
};