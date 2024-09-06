import { createBrowserRouter } from "react-router-dom";

const HomePage = () => import("./pages/Home.page");

export const router = createBrowserRouter([{ path: "/", lazy: HomePage }]);
