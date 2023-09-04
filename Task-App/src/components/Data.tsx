/* eslint-disable */
import { useContext, useEffect } from "react";
import AddForm from "./AddForm";
import { useNavigate, NavLink } from "react-router-dom";
import TemplateContext from "../store/template-context";
const baseUrl = "http://localhost:3000";

function Data() {
  const navigate = useNavigate();
  const { templates } = useContext(TemplateContext);
  const { dispatchTemplate } = useContext(TemplateContext);

  if (templates === undefined) {
    return (
      <div>
        <NavLink to="/customize-form" style={{ fontSize: "24px" }}>
          Customize the form
          <i className="fas fa-cog"></i>
        </NavLink>
      </div>
    );
  }

  const addTask = async (payload: any) => {
    try {
      const opt = {
        method: "post",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };

      const response = await fetch(`${baseUrl}/tasks`, opt);
      if (!response.ok) {
        throw { name: "error", data: await response.json() };
      }
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchDataTemplate = async () => {
      try {
        const response = await fetch(`${baseUrl}/templates`);
        if (!response.ok) {
          throw { name: "error" };
        }
        const jsonData = await response.json();

        dispatchTemplate({ type: "GET", data: jsonData });
      } catch (err) {
        console.log(err);
      }
    };

    fetchDataTemplate();
  }, [dispatchTemplate]);

  return (
    <div>
      <AddForm
        onSave={(formValues) => {
          addTask(formValues);
          navigate("/");
        }}
        template={templates}
      />
    </div>
  );
}

export default Data;
