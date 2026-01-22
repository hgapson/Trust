import { createBrowserRouter, type RouteObject } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AdminLayout from "./components/Layout/AdminLayout";

import { HomePage } from "./components/pages/home";
import { AboutPage } from "./components/pages/AboutPage";
import { ServicesPage } from "./components/pages/ServicesPage";
import { GetInvolvedPage } from "./components/pages/GetInvolvedPage";
import { ContactPage } from "./components/pages/ContactPage";
import { JobsPage } from "./components/pages/jobs";
import { ServiceDetailsPage } from "./components/pages/services/ServiceDetailsPage";

import WorkshopRegistrationsAdminPage from "./components/pages/Admin/WorkshopRegistrations";

// ✅ New: Admin home + placeholders (create these files)
import AdminHomePage from "./components/pages/Admin/AdminHomePage";
import AdminWorkshopsPage from "./components/pages/Admin/sections/AdminWorkshopsPage";
import AdminTeamPage from "./components/pages/Admin/sections/AdminTeamPage";
import AdminVolunteersPage from "./components/pages/Admin/sections/AdminVolunteersPage";
import AdminPartnersPage from "./components/pages/Admin/sections/AdminPartnersPage";
import AdminServicesPage from "./components/pages/Admin/sections/AdminServicesPage";
import AdminProcessStepsPage from "./components/pages/Admin/sections/AdminProcessStepsPage";
import SupportWaysAdminPage from "./components/pages/Admin/sections/SupportWays"
import AdminAudiencesPage from "./components/pages/Admin/sections/AdminAudiencesPage"
import AdminCallToActionPage from "./components/pages/Admin/sections/AdminCallToActionPage"
import AdminMissionVisionPage from "./components/pages/Admin/sections/AdminMissionVisionPage"
import AdminValuesPage from "./components/pages/Admin/sections/AdminValuesPage"
import AdminCommunityStoriesPage from "./components/pages/Admin/sections/AdminCommunityStoriesPage"
import AdminDetailedServicesPage from "./components/pages/Admin/sections/AdminDetailedServicesPage"
import AdminAdditionalServicesPage from "./components/pages/Admin/sections/AdminAdditionalServicesPage"
import AdminProcessTimelinePage from "./components/pages/Admin/sections/AdminProcessTimelinePage"
import AdminJobsPage from "./components/pages/Admin/sections/AdminJobsPage"
import AdminContactMethodsPage from "./components/pages/Admin/sections/AdminContactMethodsPage"
import AdminOfficeInfoPage from "./components/pages/Admin/sections/AdminOfficeInfoPage"
import AdminSupportedLanguagesPage from "./components/pages/Admin/sections/AdminSupportedLanguagesPage"
import AdminFaqsPage from "./components/pages/Admin/sections/AdminFaqsPage"


const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "services/:slug", element: <ServiceDetailsPage /> },
      { path: "jobs", element: <JobsPage /> },
      { path: "get-involved", element: <GetInvolvedPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "*", element: <HomePage /> },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      // ✅ Admin landing page (/admin)
      { index: true, element: <AdminHomePage /> },

      // ✅ Workshops
      { path: "workshops", element: <AdminWorkshopsPage /> },
      { path: "workshop-registrations", element: <WorkshopRegistrationsAdminPage /> },

      // ✅ Content tables (placeholders for now)
      { path: "team", element: <AdminTeamPage /> },
      { path: "volunteers", element: <AdminVolunteersPage /> },
      { path: "partners", element: <AdminPartnersPage /> },
      { path: "services", element: <AdminServicesPage /> },
      { path: "approach-steps", element: <AdminProcessStepsPage /> },
      { path: "process-steps", element: <AdminProcessTimelinePage /> },
      { path: "support-ways", element: <SupportWaysAdminPage /> },
      { path: "audiences", element: <AdminAudiencesPage /> },
      { path: "jobs", element: <AdminJobsPage /> },
      { path: "call-to-action", element: <AdminCallToActionPage /> },
      { path: "mission-vision", element: <AdminMissionVisionPage /> },
      { path: "values", element: <AdminValuesPage /> },
      { path: "community-stories", element: <AdminCommunityStoriesPage /> },
      { path: "detailed-services", element: <AdminDetailedServicesPage /> },
      { path: "additional-services", element: <AdminAdditionalServicesPage /> },
      { path: "contact-methods", element: <AdminContactMethodsPage /> },
      { path: "office-info", element: <AdminOfficeInfoPage /> },
      { path: "supported-languages", element: <AdminSupportedLanguagesPage /> },
      { path: "faqs", element: <AdminFaqsPage /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
