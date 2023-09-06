import { useReducer } from "react";
import TemplateContext from "./template-context";
import { Action, ProviderProps } from "../interface/interface";

const defaultTemplateState: FormElement[][] = [];
import { FormElement } from "../interface/interface";
const templateReducer = (
  state: FormElement[][],
  action: Action<FormElement[][]>
): FormElement[][] => {
  if (action.type === "GET") {
    console.log(action.data, "Ini action");
    return action.data;
  }

  return defaultTemplateState;
};

const TemplateProvider = ({ children }: ProviderProps) => {
  const [templateState, dispatchTemplateAction] = useReducer(
    templateReducer,
    defaultTemplateState
  );

  const templateContext = {
    templates: templateState,
    dispatchTemplate: dispatchTemplateAction,
  };

  return (
    <TemplateContext.Provider value={templateContext}>
      {children}
    </TemplateContext.Provider>
  );
};

export default TemplateProvider;
