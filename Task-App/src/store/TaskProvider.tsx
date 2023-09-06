import { useReducer } from "react";
import { TaskState, Action, ProviderProps } from "../interface/interface";

import TaskContext from "./task-context";
// interface Task {
//   [key:number]: string
// }
const defaultTaskState = {
  tasks: [],
};

// export interface TaskState {
//   tasks: object[];
// }

// export interface Task {
//   [key: string]: string | number | Date;
//   id: number;
// }

// export interface Action<T> {
//   type: string;
//   data: T;
// }

// export interface ProviderProps {
//   children: React.ReactNode;
// }

const taskReducer: React.Reducer<TaskState, Action<object[]>> = (
  state: TaskState,
  action: Action<object[]>
): TaskState => {
  if (action.type === "GET") {
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
