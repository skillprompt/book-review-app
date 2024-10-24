import {
  createBrowserRouter,
  RouterProvider as RouterProviderD,
} from "react-router-dom";
import { HomePage } from "./pages/home";
import { RegisterPage } from "./pages/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export function RouterProvider() {
  return <RouterProviderD router={router} />;
}
