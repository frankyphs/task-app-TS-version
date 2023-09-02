import { createBrowserRouter } from "react-router-dom";
import TaskTable from "../components/tasks";
import LandingPage from "../pages/LandingPage";
import AddTaskForm from "../pages/AddFormPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <LandingPage />,
    children: [
      {
        path: "/",
        element: <TaskTable />,
      },
      {
        path: "/add-task",
        element: <AddTaskForm />,
      },
    ],
  },
]);

export default router;
