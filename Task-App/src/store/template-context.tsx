import React from "react";

const TemplateContext = React.createContext({
  templates: [],
  dispatchTemplate: (action: any) => {}, // Tambahkan dispatch ke dalam context
});

export default TemplateContext;
