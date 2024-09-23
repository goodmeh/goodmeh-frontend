import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "@/components/layout/Layout";

const HomePage = () => import("./pages/Home.page");
const DashboardPage = () => import("./pages/Dashboard.page");
const CompareDashboardPage = () => import("./pages/CompareDashboard.page");

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", lazy: HomePage },
      { path: "/dashboard", lazy: DashboardPage },
      { path: "/compare", lazy: CompareDashboardPage },
    ],
  },
]);

export const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};
