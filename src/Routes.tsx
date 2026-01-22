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
      { path: "process-steps", element: <AdminProcessStepsPage /> },
      { path: "support-ways", element: <SupportWaysAdminPage /> },
      { path: "audiences", element: <AdminAudiencesPage /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
