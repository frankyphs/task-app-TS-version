import { createBrowserRouter } from "react-router-dom";
import TaskTable from "../components/tasks";
import LandingPage from "../pages/LandingPage";
import AddTaskForm from "../pages/AddFormPage";
import Table from "../components/TaskTable";
import Data from "../components/Data";
import CustomizeRevise from "../components/CustomizeForm";

const router = createBrowserRouter([
  {
    path: "",
    element: <LandingPage />,
    children: [
      // {
      //   path: "/",
      //   element: <TaskTable />,
      // },
      {
        path: "/",
        element: <Table />,
      },
      {
        path: "/add-task",
        element: <Data />,
      },
      {
        path: "/customize-form",
        element: <CustomizeRevise />,
      },
    ],
  },
]);

export default router;
