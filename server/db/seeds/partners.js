/**
 * @param {import("knex").Knex} knex
 */
exports.seed = async function seed(knex) {
  await knex("partners").del();

  await knex("partners").insert([
    // ---------------- PARTNERS ----------------
    {
      type: "partner",
      name: "Community Waikato",
      logo_url:
        "https://images.squarespace-cdn.com/content/v1/5f2a22d539307a4ca976ace6/1600921303317-GY8C1CVTIH2SK2WN4OUW/CW-logo-web.png",
      website_url: "https://www.communitywaikato.org.nz",
      focus: "Community capability",
      description:
        "Supporting local organisations with advisory, governance, and funding guidance.",
      location: "Hamilton",
      contribution: "Capacity building and sector support",
      sort_order: 1,
    },
    {
      type: "partner",
      name: "Volunteering Waikato",
      logo_url: "https://volunteeringwaikato.org.nz/images/main/logo-2023.png",
      website_url: "https://www.volunteeringwaikato.org.nz",
      focus: "Volunteer pathways",
      description: "Connecting people to volunteering and community initiatives.",
      location: "Hamilton",
      contribution: "Volunteer matching and training",
      sort_order: 2,
    },
    {
      type: "partner",
      name: "Sport Waikato",
      logo_url: "https://www.sportwaikato.org.nz/images/logos/Logo@2x.png",
      website_url: "https://www.sportwaikato.org.nz",
      focus: "Healthy communities",
      description: "Growing active lifestyles through sport and recreation.",
      location: "Hamilton",
      contribution: "Community wellbeing programs",
      sort_order: 3,
    },
    {
      type: "partner",
      name: "Creative Waikato",
      logo_url: "https://creativewaikato.co.nz/site/uploads/cw-social-logo.png",
      website_url: "https://creativewaikato.co.nz",
      focus: "Arts and culture",
      description: "Championing creative initiatives across the region.",
      location: "Hamilton",
      contribution: "Creative sector partnerships",
      sort_order: 4,
    },
    {
      type: "partner",
      name: "Waikato Museum",
      logo_url:
        "https://tewharetaonga.nz/assets/Uploads/Te-Whare-Taonga-o-Waikato_logo.jpg",
      website_url: "https://www.waikatomuseum.co.nz",
      focus: "Culture and heritage",
      description: "Celebrating stories, exhibitions, and learning for the community.",
      location: "Hamilton",
      contribution: "Community exhibitions and learning",
      sort_order: 5,
    },
    {
      type: "partner",
      name: "Hamilton City Council",
      logo_url:
        "https://hamilton.govt.nz/_resources/themes/hcc-theme/img/logos/logo-black.png",
      website_url: "https://hamilton.govt.nz",
      focus: "Civic services",
      description: "Supporting community development and local initiatives.",
      location: "Hamilton",
      contribution: "Community grants and support",
      sort_order: 6,
    },

    // ---------------- FUNDERS ----------------
    {
      type: "funder",
      name: "Trust Waikato",
      logo_url:
        "https://trustwaikato.co.nz/wp-content/themes/trustwaikato/src/img/logo/icon.png",
      website_url: "https://trustwaikato.co.nz",
      focus: "Community funding",
      description: "Funding initiatives that strengthen Waikato communities.",
      location: "Hamilton",
      contribution: "Community grants",
      sort_order: 1,
    },
    {
      type: "funder",
      name: "WEL Networks",
      logo_url: "https://wel.co.nz/images/Logo.svg",
      website_url: "https://wel.co.nz",
      focus: "Regional investment",
      description: "Investing in local infrastructure and community wellbeing.",
      location: "Hamilton",
      contribution: "Sponsorship and community funding",
      sort_order: 2,
    },
    {
      type: "funder",
      name: "University of Waikato",
      logo_url:
        "https://www.waikato.ac.nz/_resources/themes/app/dist/icons/logo.svg",
      website_url: "https://www.waikato.ac.nz",
      focus: "Research and education",
      description: "Supporting pathways, skills, and community-led research.",
      location: "Hamilton",
      contribution: "Research collaboration and scholarships",
      sort_order: 3,
    },
    {
      type: "funder",
      name: "Wintec | Te Pūkenga",
      logo_url:
        "https://www.wintec.ac.nz/ResourcePackages/WintecPublicWebsite/assets/dist/images/brand/logo-wintec.svg",
      website_url: "https://www.wintec.ac.nz",
      focus: "Skills development",
      description: "Training and upskilling for workforce readiness.",
      location: "Hamilton",
      contribution: "Training partnerships",
      sort_order: 4,
    },
    {
      type: "funder",
      name: "Waikato District Council",
      logo_url:
        "https://www.waikatodistrict.govt.nz/ResourcePackages/WaikatoDistrictCouncil/assets/dist/images/waikato-district-council-logo.svg",
      website_url: "https://www.waikatodistrict.govt.nz",
      focus: "Regional services",
      description: "Supporting community-led projects across the district.",
      location: "Waikato District",
      contribution: "Community development funding",
      sort_order: 5,
    },
    {
      type: "funder",
      name: "Te Whatu Ora - Health NZ",
      logo_url: "https://www.tewhatuora.govt.nz/logo.png",
      website_url: "https://www.tewhatuora.govt.nz",
      focus: "Health access",
      description: "Supporting wellbeing services and local health initiatives.",
      location: "Waikato",
      contribution: "Health partnership support",
      sort_order: 6,
    },
  ]);
}