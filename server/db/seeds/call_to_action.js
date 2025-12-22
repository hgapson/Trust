exports.seed = async function (knex) {
  await knex("call_to_action").del();

  await knex("call_to_action").insert([
    {
      heading: "Ready to Start Your Journey?",
      description:
        "Take the first step towards your career success. Our team is here to support you every step of the way.",
      phone: "+64 223146756",
      email: "waikato.navtrust@outlook.com",
      location: "Hamilton, Waikato, New Zealand",
      availability: "Mon–Fri 9:00 AM – 5:00 PM",
      image_url:
        "https://images.unsplash.com/photo-1565665681743-6ff01c5181e3",
      card_title: "Free Initial Consultation",
      card_description:
        "Meet with our team to discuss your goals and create a personalized plan for your career journey.",
      cta_label: "Talk to Us",
    },
  ]);
};