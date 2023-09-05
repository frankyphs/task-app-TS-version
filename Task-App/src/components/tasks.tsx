// import { useEffect, useContext } from "react";
// import TaskContext from "../store/task-context";
// // import { useState } from "react";

// const baseUrl = "http://localhost:3000";

// const TaskTable = () => {
//   const { dispatchTask } = useContext(TaskContext);
//   const { tasks } = useContext(TaskContext);

//   useEffect(() => {
//     const fetchDataTask = async () => {
//       try {
//         const response = await fetch(`${baseUrl}/tasks`);
//         if (!response.ok) {
//           throw { name: "error" };
//         }
//         const jsonData = await response.json();

//         dispatchTask({ type: "GET", data: jsonData });
//         console.log("tes fecth disini");
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchDataTask();
//   }, [dispatchTask]);

//   const removeTask = async (id: number) => {
//     try {
//       const opt = {
//         method: "delete",
//         headers: {
//           "Content-type": "application/json; charset=UTF-8",
//         },
//       };

//       const response = await fetch(`${baseUrl}/tasks/${id}`, opt);

//       if (!response.ok) {
//         throw { name: "error" };
//       }

//       const updatedResponse = await fetch(`${baseUrl}/tasks`);
//       if (!updatedResponse.ok) {
//         throw { name: "error" };
//       }
//       const updatedData = await updatedResponse.json();

//       dispatchTask({ type: "GET", data: updatedData });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <p>{JSON.stringify(tasks)}</p>

//       <ul>
//         {tasks.map((task) => (
//           <li key={task.id}>
//             {task.judul}-{task.deskripsi}
//             <button onClick={() => removeTask(task.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };

// export default TaskTable;
