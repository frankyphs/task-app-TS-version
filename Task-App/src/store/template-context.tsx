import React from "react";

// Buat context
const TemplateContext = React.createContext({
  templates: [],
  addTemplate: (item: any) => {},
});

export default TemplateContext;
