import React from "react";

const TaskContext = React.createContext({
  tasks: [],
  dispatchTask: (action: any) => {}, // Tambahkan dispatch ke dalam context
});

export default TaskContext;
