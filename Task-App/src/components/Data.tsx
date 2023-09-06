/* eslint-disable */
import { useContext, useEffect } from "react";
import AddForm from "./AddForm";
import { useNavigate } from "react-router-dom";
import TemplateContext from "../store/template-context";
import axios, { AxiosResponse } from "axios";
import { FormElement, Task } from "../interface/interface";
import TaskContext from "../store/task-context";

const baseUrl = "http://localhost:3000";
function Data() {
  const navigate = useNavigate();
  const { templates } = useContext(TemplateContext);
  const { dispatchTemplate } = useContext(TemplateContext);
  const { dispatchTask } = useContext(TaskContext);

  const fetchDataTask = async (): Promise<void> => {
    try {
      const response: AxiosResponse<Task[]> = await axios(`${baseUrl}/tasks`);
      if (response.status !== 200) {
        throw new Error("Error fetching data");
      }
      const jsonData: Task[] = await response.data;
      dispatchTask({ type: "GET", data: jsonData });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDataTemplate = async (): Promise<void> => {
    try {
      const response: AxiosResponse<FormElement[][]> = await axios(
        `${baseUrl}/templates`
      );
      if (response.status !== 200) {
        throw new Error("Error fetching template");
      }
      const jsonData: FormElement[][] = await response.data;
      dispatchTemplate({ type: "GET", data: jsonData });
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async (payload: any): Promise<void> => {
    try {
      const opt = {
        method: "post",
        data: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      const response: AxiosResponse<Task[][]> = await axios(
        `${baseUrl}/tasks`,
        opt
      );
      if (response.status !== 201) {
        throw new Error("Gagal Add Task");
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataTemplate();
    fetchDataTask();
  }, []);

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
