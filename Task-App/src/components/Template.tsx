import { useContext } from "react";
import CustomizeRevise, { FormElement } from "./CustomizeForm";
import TemplateContext from "../store/template-context";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:3000";

const Template = () => {
  const { dispatchTemplate } = useContext(TemplateContext);
  const { templates } = useContext(TemplateContext);
  const navigate = useNavigate();

  console.log(templates, "Ini templates dari useContext");
  const addTemplate = async (payload: FormElement[][]) => {
    try {
      const opt = {
        method: "post",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };

      const response = await fetch(`${baseUrl}/templates`, opt);
      if (!response.ok) {
        throw { name: "error", data: await response.json() };
      }
      console.log(payload, "Ini payload");

      const updatedResponse = await fetch(`${baseUrl}/templates`);
      if (!updatedResponse.ok) {
        throw { name: "error" };
      }
      const updatedData = await updatedResponse.json();

      dispatchTemplate({ type: "GET", data: updatedData });
      //   navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <CustomizeRevise
        onSave={(formTemplate) => {
          addTemplate(formTemplate);
          navigate("/add-task");
        }}
        templates={templates}
      />
    </div>
  );
};

export default Template;
