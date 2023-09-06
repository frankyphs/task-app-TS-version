/* eslint-disable */

import React from "react";
import { Action } from "../interface/interface";

interface ITaskContext {
  tasks: object[];
  dispatchTask: React.Dispatch<Action<object[]>>;
}

const TaskContext = React.createContext<ITaskContext>({
  tasks: [],
  dispatchTask: (props) => [], // Tambahkan dispatch ke dalam context
});

export default TaskContext;
