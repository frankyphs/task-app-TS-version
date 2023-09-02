import { useReducer } from "react";

import TemplateContext from "./template-context";
const defaultTemplateState = {
  templates: [],
};

// Buat template reducer
const templateReducer = (state: any, action: any) => {
  if (action.type === "ADD") {
    const existingTemplateIndex = state.templates.findIndex(
      (template: any) => template.id === action.template.id
    );

    let updatedTemplates;

    if (existingTemplateIndex >= 0) {
      updatedTemplates = state.templates;
    } else {
      updatedTemplates = state.templates.concat(action.template);
    }

    return {
      templates: updatedTemplates,
    };
  }

  if (action.type === "REMOVE") {
    const updatedTemplates = state.templates.filter(
      (template: any) => template.id !== action.id
    );

    return {
      templates: updatedTemplates,
    };
  }

  if (action.type === "CLEAR") {
    return defaultTemplateState;
  }

  return defaultTemplateState;
};

const TemplateProvider = (props: any) => {
  const [templateState, dispatchTemplateAction] = useReducer(
    templateReducer,
    defaultTemplateState
  );

  const addTemplateHandler = (template: any) => {
    dispatchTemplateAction({ type: "ADD", template: template });
  };

  const templateContext = {
    templates: templateState.templates,
    addTemplate: addTemplateHandler,
  };

  return (
    <TemplateContext.Provider value={templateContext}>
      {props.children}
    </TemplateContext.Provider>
  );
};

export default TemplateProvider;
