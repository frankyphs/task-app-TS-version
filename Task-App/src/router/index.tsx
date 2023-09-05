import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Table from "../components/TaskTable";
import Data from "../components/Data";
// import CustomizeRevise from "../components/CustomizeForm";
import Template from "../components/Template";

const router = createBrowserRouter([
  {
    path: "",
    element: <LandingPage />,
    children: [
      {
        path: "/",
        element: <Table />,
      },
      {
        path: "/add-task",
        element: <Data />,
      },
      // {
      //   path: "/customize-form",
      //   element: <CustomizeRevise />,
      // },
      {
        path: "/customize-form",
        element: <Template />,
      },
    ],
  },
]);

export default router;
