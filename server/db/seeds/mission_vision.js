exports.seed = async function (knex) {
  await knex("mission_vision").del();

  await knex("mission_vision").insert([
    {
      id: 1,
      mission_title: "Our Mission",
      mission_description:
        "To provide comprehensive support, resources, and advocacy for migrants and former refugees in the Waikato region, helping them achieve economic independence and social integration through employment opportunities and community engagement.",
      vision_title: "Our Vision",
      vision_description:
        "A thriving, inclusive Waikato community where every migrant and former refugee has the opportunity to reach their full potential and contribute meaningfully to society.",
      image_url:
        "https://media.licdn.com/dms/image/v2/C4E12AQGkw2DkzWd14A/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1520437220732?e=2147483647&v=beta&t=wpGG84obe9jBH9u0-MHlJOWTnqH8bGAZZ8BK8VJSSds",
    },
  ]);
};