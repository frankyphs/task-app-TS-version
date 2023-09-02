import { useReducer } from "react";

import TaskContext from "./task-context";
const defaultTaskState = {
  tasks: [],
};

const taskReducer = (state: any, action: any) => {
  if (action.type === "ADD") {
    const existingTaskIndex = state.tasks.findIndex(
      (task: any) => task.id === action.task.id
    );

    let updatedTasks;

    if (existingTaskIndex >= 0) {
      updatedTasks = state.tasks;
    } else {
      updatedTasks = state.tasks.concat(action.task);
    }

    return {
      tasks: updatedTasks,
    };
  }

  if (action.type === "REMOVE") {
    const updatedTasks = state.tasks.filter(
      (task: any) => task.id !== action.id
    );

    return {
      tasks: updatedTasks,
    };
  }

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

  const addTaskHandler = (task: any) => {
    dispatchTaskAction({ type: "ADD", task: task });
  };

  const removeTaskHandler = (id: number) => {
    dispatchTaskAction({ type: "REMOVE", id: id });
  };

  const taskContext = {
    tasks: taskState.tasks,
    addTask: addTaskHandler,
    removeTask: removeTaskHandler,
  };

  return (
    <TaskContext.Provider value={taskContext}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
