import "./App.css";

import { RouterProvider } from "react-router-dom";
import router from "./router";
import TaskProvider from "./store/TaskProvider";

function App() {
  return (
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  );
}

export default App;
