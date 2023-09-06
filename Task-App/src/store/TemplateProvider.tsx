import { useReducer } from "react";
import TemplateContext from "./template-context";
import { Action, ProviderProps } from "../interface/interface";

const defaultTemplateState: FormElement[][] = [];
import { FormElement } from "../components/CustomizeForm";
const templateReducer = (
  state: FormElement[][],
  action: Action<FormElement[][]>
): FormElement[][] => {
  if (action.type === "GET") {
    return action.data;
  }

  return defaultTemplateState;
};

const TemplateProvider = (props: ProviderProps) => {
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
      {props.children}
    </TemplateContext.Provider>
  );
};

export default TemplateProvider;
