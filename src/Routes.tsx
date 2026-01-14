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
      {
        path: "workshop-registrations",
        element: <WorkshopRegistrationsAdminPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
