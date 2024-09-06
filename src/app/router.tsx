import { Layout } from "@/components/layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const HomePage = () => import("./pages/Home.page");

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [{ path: "/", lazy: HomePage }],
  },
]);

export const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};
