import { useContext } from "react";
import axios, { AxiosResponse } from "axios";
import CustomizeRevise from "./CustomizeForm";
import TemplateContext from "../store/template-context";
import { useNavigate } from "react-router-dom";
import { FormElement } from "../interface/interface";
const baseUrl = "http://localhost:3000";

const Template = () => {
  const { templates } = useContext(TemplateContext);
  const navigate = useNavigate();

  console.log(templates, "Ini templates dari useContext");

  const addTemplate = async (payload: FormElement[][]) => {
    try {
      const opt = {
        method: "post",
        data: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };

      const response: AxiosResponse<FormElement[][]> = await axios(
        `${baseUrl}/templates`,
        opt
      );
      if (response.status !== 201) {
        throw new Error("fail to save template");
      }
    } catch (error) {
      console.log(error);
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
