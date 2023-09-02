import { useEffect, useContext } from "react";
import TaskContext from "../store/task-context";
import { useState } from "react";

const baseUrl = "http://localhost:3000";

const TaskTable = () => {
  const { dispatch } = useContext(TaskContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/tasks`);
        if (!response.ok) {
          throw { name: "error" };
        }
        const jsonData = await response.json();

        // Setelah data berhasil diambil, kirim tindakan "GET" ke reducer
        setTasks(jsonData);

        dispatch({ type: "GET", data: jsonData });
      } catch (err) {
        console.log(err);
      }
    };

    fetchData(); // Panggil fungsi fetchData saat komponen dirender
  }, [dispatch]); // Pastikan untuk menyertakan dispatch sebagai dependensi

  return (
    // JSX komponen Anda
    <>
      <p>{JSON.stringify(tasks)}</p>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.judul}-{task.deskripsi}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskTable;
