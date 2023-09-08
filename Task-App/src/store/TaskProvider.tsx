import { useReducer } from "react";
import { TaskState, Action, ProviderProps } from "../interface/interface";

import TaskContext from "./task-context";
const defaultTaskState = {
  tasks: [],
};

const taskReducer: React.Reducer<TaskState, Action<object[]>> = (
  state: TaskState = defaultTaskState,
  action: Action<object[]>
): TaskState => {
  if (action.type === "GET") {
    // console.log(action.data, "Ini action taskkkkk");
    return {
      ...state,
      tasks: action.data,
    };
  }

  return defaultTaskState;
};

const TaskProvider: React.FC<ProviderProps> = ({ children }) => {
  const [taskState, dispatchTaskAction] = useReducer(
    taskReducer,
    defaultTaskState
  );

  const taskContext = {
    tasks: taskState.tasks,
    dispatchTask: dispatchTaskAction,
  };

  return (
    <TaskContext.Provider value={taskContext}>{children}</TaskContext.Provider>
  );
};

export default TaskProvider;
