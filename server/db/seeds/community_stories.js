exports.seed = async function (knex) {
  await knex("community_stories").del();

  await knex("community_stories").insert([
    {
      quote:
        "The Navigate Trust helped me understand the NZ workplace culture and connected me with an employer who values my skills. I'm now working in my field and supporting my family.",
      author: "Maria S.",
      role: "Healthcare Professional",
      image_url:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
      sort_order: 1,
    },
    {
      quote:
        "After years of feeling lost, the mentorship program gave me direction and confidence. The workshops taught me how to present my international experience effectively.",
      author: "Ahmed K.",
      role: "IT Specialist",
      image_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      sort_order: 2,
    },
    {
      quote:
        "The team at Navigate Trust didn’t just help me find a job — they helped me build a future. Their support made all the difference.",
      author: "Priya M.",
      role: "Business Analyst",
      image_url:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      sort_order: 3,
    },
    {
      quote:
        "They helped me rebuild confidence, tailor my CV, and prepare for interviews. I finally felt seen and supported.",
      author: "Daniel T.",
      role: "Operations Assistant",
      image_url:
        "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=400&q=80",
      sort_order: 4,
    },
    {
      quote:
        "The guidance was practical and kind. I learned how to communicate my skills clearly to employers here in NZ.",
      author: "Lina A.",
      role: "Customer Support",
      image_url:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      sort_order: 5,
    },
    {
      quote:
        "I got support with workplace expectations and professional English. That made my transition into work much easier.",
      author: "Joseph N.",
      role: "Trades Assistant",
      image_url:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      sort_order: 6,
    },
  ]);
};