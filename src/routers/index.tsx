import { RouteObject } from "react-router-dom";
import Layout from "@/layouts/index";
import Test from "@/views/test";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "test",
        element: <Test />
      }
    ]
  }
];

export default routes;