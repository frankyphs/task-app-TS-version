/* eslint-disable */

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(bodyParser.json());

let tasks = [];
let template = [
  [
    {
      type: "TextField",
      id: "1",
      name: "Judul",
      data: { isMandatory: true, defaultValue: "" },
    },
    {
      type: "TextField",
      id: "4",
      name: "Subjek",
      data: { isMandatory: true, defaultValue: "" },
    },
  ],
  [
    {
      type: "SpinButton",
      id: "3",
      name: "Repetisi",
      data: { isMandatory: false, defaultValue: "" },
    },
  ],
  [
    {
      type: "DatePicker",
      id: "5",
      name: "Deadline",
      data: { isMandatory: false, defaultValue: "" },
    },
    {
      type: "TextField",
      id: "6",
      name: "Deskripsi",
      data: { isMandatory: false, defaultValue: "" },
    },
  ],
];

//TASKS
app.post(`/tasks`, async (req, res) => {
  const { ...customData } = req.body;

  const newTask = { id: tasks.length + 1, ...customData };
  tasks.push(newTask);
  return res.status(201).json(newTask);
});

app.get("/tasks", async (req, res) => {
  const results = tasks;
  return res.json(results);
});

app.post(`/templates`, async (req, res) => {
  const customData = req.body;
  template = customData;
  return res.status(201).json(template);
});

app.get(`/templates`, async (req, res) => {
  const result = template;
  return res.json(result);
});

app.get(`/tasks/:id`, async (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  return res.json(task);
});

app.put(`/tasks/:id`, async (req, res) => {
  const taskId = parseInt(req.params.id);
  const editedTask = req.body;

  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...editedTask,
  };

  return res.json(tasks[taskIndex]);
});

app.delete(`/tasks/:id`, async (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const deletedTask = tasks.splice(taskIndex, 1);
  return res.json(deletedTask[0]);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
