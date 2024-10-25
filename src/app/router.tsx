import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "@/components/layout/Layout";

const LandingPage = () => import("./pages/Landing.page");
const DiscoverPage = () => import("./pages/Discover.page");
const DashboardPage = () => import("./pages/Dashboard.page");
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", lazy: LandingPage },
      { path: "/discover", lazy: DiscoverPage },
      { path: "/dashboard", lazy: DashboardPage },
    ],
  },
]);

export const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};
