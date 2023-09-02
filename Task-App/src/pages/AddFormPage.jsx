import React from "react";
import { useState, useContext } from "react";
// import { useTaskContext } from "./TaskContext";
import TaskContext from "../store/task-context";

const baseUrl = "http://localhost:3000";
const YourComponent = () => {
  const { dispatch } = useContext(TaskContext);
  //   const { taskState, dispatch } = useTaskContext();
  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
  });
  const addTask = async () => {
    try {
      const payload = {
        judul: formData.judul,
        deskripsi: formData.deskripsi,
      };

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

      // Setelah berhasil menambahkan tugas, kirim tindakan "ADD" ke reducer
      dispatch({ type: "ADD", task: payload });

      // Selanjutnya, Anda dapat memanggil fetchTasks atau tindakan lain jika diperlukan
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      {/* Render komponen Anda dengan menggunakan state dari taskState */}
      <p>ini Add Task Form</p>
      <label htmlFor="judul">Judul:</label>
      <input
        type="text"
        id="judul"
        name="judul"
        value={formData.judul}
        onChange={handleChange}
      />

      {/* Input untuk Deskripsi */}
      <label htmlFor="deskripsi">Deskripsi:</label>
      <input
        type="text"
        id="deskripsi"
        name="deskripsi"
        value={formData.deskripsi}
        onChange={handleChange}
      />
      <button
        // style={{ width: "20px", height: "15px" }}
        onClick={addTask}
      >
        Submit
      </button>
    </div>
  );
};

export default YourComponent;
