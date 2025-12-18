exports.seed = async function (knex) {
  await knex("community_stories").del();

  await knex("community_stories").insert([
    {
      quote:
        "The Navigate Trust helped me understand the NZ workplace culture and connected me with an employer who values my skills.",
      author: "Maria S.",
      role: "Healthcare Professional",
      image_url:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      sort_order: 1,
    },
    {
      quote:
        "After years of feeling lost, the mentorship program gave me direction and confidence.",
      author: "Ahmed K.",
      role: "IT Specialist",
      image_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      sort_order: 2,
    },
    {
      quote:
        "The team didn’t just help me find a job — they helped me build a future.",
      author: "Priya M.",
      role: "Business Analyst",
      image_url:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      sort_order: 3,
    },
  ]);
};