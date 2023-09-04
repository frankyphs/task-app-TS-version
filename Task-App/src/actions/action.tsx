// import { useContext } from "react";
// import TaskContext from "../store/task-context";
// import TemplateContext from "../store/template-context";

// const baseUrl = "http://localhost:3000";

// export const FetchDataTask = async () => {
//   const { dispatchTask } = useContext(TaskContext);
//   try {
//     const response = await fetch(`${baseUrl}/tasks`);
//     if (!response.ok) {
//       throw { name: "error" };
//     }
//     const jsonData = await response.json();

//     dispatchTask({ type: "GET", data: jsonData });
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const FetchDataTemplate = async () => {
//   const { dispatchTemplate } = useContext(TemplateContext);
//   try {
//     const response = await fetch(`${baseUrl}/templates`);
//     if (!response.ok) {
//       throw { name: "error" };
//     }
//     const jsonData = await response.json();

//     dispatchTemplate({ type: "GET", data: jsonData });
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const RemoveTask = async (id: number) => {
//   const { dispatchTask } = useContext(TaskContext);
//   try {
//     const opt = {
//       method: "delete",
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     };

//     const response = await fetch(`${baseUrl}/tasks/${id}`, opt);

//     if (!response.ok) {
//       throw { name: "error" };
//     }

//     const updatedResponse = await fetch(`${baseUrl}/tasks`);
//     if (!updatedResponse.ok) {
//       throw { name: "error" };
//     }
//     const updatedData = await updatedResponse.json();

//     dispatchTask({ type: "GET", data: updatedData });
//   } catch (error) {
//     console.log(error);
//   }
// };

// interface FormValues {
//   [key: number]: string | number | Date;
// }

// export const AddTask = async (payload: FormValues) => {
//   try {
//     const opt = {
//       method: "post",
//       body: JSON.stringify(payload),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     };

//     const response = await fetch(`${baseUrl}/tasks`, opt);
//     if (!response.ok) {
//       throw { name: "error", data: await response.json() };
//     }
//     //   navigate("/");
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const AddTemplate = async (payload: any) => {
//   const { dispatchTemplate } = useContext(TemplateContext);
//   try {
//     const opt = {
//       method: "post",
//       body: JSON.stringify(payload),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     };

//     const response = await fetch(`${baseUrl}/templates`, opt);
//     if (!response.ok) {
//       throw { name: "error", data: await response.json() };
//     }
//     console.log(payload, "Ini payload");

//     const updatedResponse = await fetch(`${baseUrl}/templates`);
//     if (!updatedResponse.ok) {
//       throw { name: "error" };
//     }
//     const updatedData = await updatedResponse.json();

//     dispatchTemplate({ type: "GET", data: updatedData });
//   } catch (err) {
//     console.log(err);
//   }
// };
