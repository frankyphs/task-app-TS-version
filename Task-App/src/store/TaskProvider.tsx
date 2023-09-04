import { useReducer } from "react";

import TaskContext from "./task-context";
const defaultTaskState = {
  tasks: [],
};

const taskReducer = (state: any, action: any) => {
  if (action.type === "GET") {
    return {
      ...state,
      tasks: action.data,
    };
  }

  return defaultTaskState;
};

const TaskProvider = (props: any) => {
  const [taskState, dispatchTaskAction] = useReducer(
    taskReducer,
    defaultTaskState
  );

  const taskContext = {
    tasks: taskState.tasks,
    dispatchTask: dispatchTaskAction,
  };

  return (
    <TaskContext.Provider value={taskContext}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
