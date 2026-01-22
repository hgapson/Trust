module.exports.seed = async function (knex) {
  await knex("faqs").del()

  await knex("faqs").insert([
    {
      question: "Who can access your services?",
      answer:
        "Our services are available to all migrants and former refugees in the Waikato region who are seeking employment support. Whether you've just arrived in New Zealand or have been here for some time, we're here to help you achieve your career goals.",
      sort_order: 1,
    },
    {
      question: "Are your services free?",
      answer:
        "Yes! All our core services are provided free of charge to those who need support finding employment. This includes workshops, one-on-one mentoring, career counseling, and connections to employer networks.",
      sort_order: 2,
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "We offer comprehensive support including resume and cover letter writing, interview preparation, skills assessment, professional development workshops, mentorship programs, job matching services, and ongoing career guidance. We also help with understanding NZ workplace culture and expectations.",
      sort_order: 3,
    },
    {
      question: "How long does the program take?",
      answer:
        "The timeline varies based on your individual needs and goals. Some people find employment within weeks, while others benefit from longer-term support to upskill or transition careers. We work at your pace and provide support for as long as you need it.",
      sort_order: 4,
    },
    {
      question: "Do I need to speak perfect English?",
      answer:
        "No, you don't need perfect English to access our services. We have multilingual staff and volunteers who can provide support in various languages. We also offer resources to help improve your professional communication skills.",
      sort_order: 5,
    },
    {
      question: "How do I get started?",
      answer:
        "Simply contact us via phone, email, or visit our office. We'll arrange an initial consultation to understand your background, skills, and career aspirations. From there, we'll create a personalized plan to support your employment journey.",
      sort_order: 6,
    },
    {
      question: "Can you guarantee me a job?",
      answer:
        "While we can't guarantee employment, we are committed to providing you with all the tools, skills, training, and connections needed to significantly improve your employment prospects. Our strong network of local employers and proven track record speak to the effectiveness of our approach.",
      sort_order: 7,
    },
    {
      question: "What makes your organization different?",
      answer:
        "We understand the unique challenges that migrants and former refugees face. Our team has lived experience and cultural competency that allows us to provide truly personalized, empathetic support. We focus on your strengths and help employers recognize the value of diversity.",
      sort_order: 8,
    },
  ])
}
