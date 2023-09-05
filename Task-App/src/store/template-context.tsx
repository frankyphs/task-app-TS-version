/* eslint-disable */
import React from "react";
import { Action } from "./TaskProvider";
import { FormElement } from "../components/CustomizeForm";
interface ITemplateContext {
  // templates: object[][];
  templates: FormElement[][];
  // dispatchTemplate: React.Dispatch<Action<object[][]>>;
  dispatchTemplate: React.Dispatch<Action<FormElement[][]>>;
}
const TemplateContext = React.createContext<ITemplateContext>({
  templates: [],
  dispatchTemplate: (props) => [], // Tambahkan dispatch ke dalam context
});

export default TemplateContext;
