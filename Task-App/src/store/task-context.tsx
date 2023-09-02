import React from "react";

const TaskContext = React.createContext({
  tasks: [],
  addTask: (task: any) => {},
  removeTask: (id: number) => {},
});

export default TaskContext;
