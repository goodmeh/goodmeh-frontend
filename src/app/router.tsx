import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "@/components/layout/Layout";

const LandingPage = () => import("./pages/Landing.page");
const DiscoverPage = () => import("./pages/Discover.page");
const RecommendPage = () => import("./pages/Recommend.page");
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", lazy: LandingPage },
      { path: "/discover", lazy: DiscoverPage },
      { path: "/recommend", lazy: RecommendPage },
    ],
  },
]);

export const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};
