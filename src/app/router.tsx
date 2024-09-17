import { Layout } from "@/components/layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const HomePage = () => import("./pages/Home.page");
const ConsumerDashboardPage = () => import("./pages/ConsumerDashboard.page");
const BusinessDashboardPage = () => import("./pages/BusinessDashboard.page");
const CompareDashboardPage = () => import("./pages/CompareDashboard.page");

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", lazy: HomePage },
      { path: "/consumer", lazy: ConsumerDashboardPage },
      { path: "/business", lazy: BusinessDashboardPage },
      { path: "/compare", lazy: CompareDashboardPage },
    ],
  },
]);

export const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};
