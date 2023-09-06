/* eslint-disable */
import React from "react";
import { Action } from "../interface/interface";
import { FormElement } from "../interface/interface";
interface ITemplateContext {
  templates: FormElement[][];
  dispatchTemplate: React.Dispatch<Action<FormElement[][]>>;
}
const TemplateContext = React.createContext<ITemplateContext>({
  templates: [],
  dispatchTemplate: () => [],
});

export default TemplateContext;
