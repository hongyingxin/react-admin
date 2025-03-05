import { RouteObject } from "react-router-dom";
import Layout from "@/layouts/index";
import Test from "@/views/test";
import Home from "@/views/home";
const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "test",
        element: <Test />
      },
      {
        path: "home",
        children: [
          {
            path: "index",
            element: <Home />
          }
        ]
      }
    ]
  }
];

export default routes;