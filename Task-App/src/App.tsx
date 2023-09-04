/* eslint-disable */
import "./App.css";

import { RouterProvider } from "react-router-dom";
import router from "./router";
import TaskProvider from "./store/TaskProvider";
import TemplateProvider from "./store/TemplateProvider";

function App() {
  return (
    <TemplateProvider>
      <TaskProvider>
        <RouterProvider router={router} />
      </TaskProvider>
    </TemplateProvider>
  );
}

export default App;
