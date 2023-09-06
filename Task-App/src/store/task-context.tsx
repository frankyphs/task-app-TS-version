/* eslint-disable */

import React from "react";
import { Action } from "../interface/interface";

interface ITaskContext {
  tasks: object[];
  dispatchTask: React.Dispatch<Action<object[]>>;
}

const TaskContext = React.createContext<ITaskContext>({
  tasks: [],
  dispatchTask: () => [], // Tambahkan dispatch ke dalam context agar bisa dipakai oleh child
});

export default TaskContext;
