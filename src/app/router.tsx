import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "@/components/layout/Layout";

const HomePage = () => import("./pages/Home.page");
const DiscoverPage = () => import("./pages/Discover.page");
const DashboardPage = () => import("./pages/Dashboard.page");
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", lazy: HomePage },
      { path: "/discover", lazy: DiscoverPage },
      { path: "/dashboard", lazy: DashboardPage },
    ],
  },
]);

export const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};
