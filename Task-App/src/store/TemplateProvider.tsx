import { useReducer } from "react";
import TemplateContext from "./template-context";

const defaultTemplateState = {
  templates: [],
};

const templateReducer = (state: any, action: any) => {
  if (action.type === "GET") {
    return {
      ...state,
      templates: action.data,
    };
  }

  return defaultTemplateState;
};

const TemplateProvider = (props: any) => {
  const [templateState, dispatchTemplateAction] = useReducer(
    templateReducer,
    defaultTemplateState
  );

  const templateContext = {
    templates: templateState.templates,
    dispatchTemplate: dispatchTemplateAction,
  };

  return (
    <TemplateContext.Provider value={templateContext}>
      {props.children}
    </TemplateContext.Provider>
  );
};

export default TemplateProvider;
