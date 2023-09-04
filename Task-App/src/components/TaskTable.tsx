/* eslint-disable */
import React from "react";

import { useState, useEffect, useContext } from "react";
import TaskContext from "../store/task-context";
import TemplateContext from "../store/template-context";

import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  PrimaryButton,
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
} from "@fluentui/react";

const Table: React.FC = () => {
  const { tasks } = useContext(TaskContext);
  const { templates } = useContext(TemplateContext);
  const { dispatchTask } = useContext(TaskContext);
  const { dispatchTemplate } = useContext(TemplateContext);

  const baseUrl = "http://localhost:3000";

  // useEffect
  useEffect(() => {
    const fetchDataTask = async () => {
      try {
        const response = await fetch(`${baseUrl}/tasks`);
        if (!response.ok) {
          throw { name: "error" };
        }
        const jsonData = await response.json();

        dispatchTask({ type: "GET", data: jsonData });
      } catch (err) {
        console.log(err);
      }
    };

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

    fetchDataTask();
    fetchDataTemplate();
  }, [dispatchTask, dispatchTemplate]);

  // logic delete task
  const removeTask = async (id: number) => {
    try {
      const opt = {
        method: "delete",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };

      const response = await fetch(`${baseUrl}/tasks/${id}`, opt);

      if (!response.ok) {
        throw { name: "error" };
      }

      const updatedResponse = await fetch(`${baseUrl}/tasks`);
      if (!updatedResponse.ok) {
        throw { name: "error" };
      }
      const updatedData = await updatedResponse.json();

      dispatchTask({ type: "GET", data: updatedData });
    } catch (error) {
      console.log(error);
    }
  };

  // Type Task
  type Task = {
    id: number;
    [key: string]: string | number | Date;
  };

  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  //   const [formData, setFormData] = useState({
  //     title: "",
  //     description: "",
  //   });

  const [error, setError] = useState({
    show: false,
    message: "",
  });

  // Delete
  const handleDeleteClick = (task: any) => {
    setDeletingTask(task);
    setIsDeleteModalOpen(true);
    console.log("Tes delete");
  };

  const handleDeleteConfirmation = () => {
    if (deletingTask) {
      removeTask(deletingTask.id);
      setIsDeleteModalOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeletingTask(null);
    setIsDeleteModalOpen(false);
  };

  // pakai DetailsList
  const renderDetailsListColumns = () => {
    const columns: IColumn[] = [
      {
        key: "id",
        name: "No",
        fieldName: "id",
        minWidth: 50,
        maxWidth: 50,
        isResizable: true,
        // className: "kepala-tabel",
        onRender: (item, index: number) => index + 1,
        styles: {
          cellName: {
            fontSize: "20px",
          },
        },
      },
      ...templates.flatMap((row) =>
        row.map((field) => ({
          key: field.id,
          name: field.name,
          fieldName: field.id,
          minWidth: 100,
          maxWidth: 250,
          // className: "kepala-tabel",
          isResizable: true,
          styles: {
            cellName: {
              fontSize: "20px",
            },
          },
        }))
      ),
      {
        key: "actions",
        name: "Action",
        minWidth: 100,
        styles: {
          cellName: {
            fontSize: "20px",
          },
        },
        onRender: (item) => (
          <>
            <button
              onClick={() => handleDeleteClick(item)}
              className="button-delete"
              title="Delete"
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </>
        ),
      },
    ];
    return columns;
  };

  return (
    <>
      <h1>template</h1>
      {JSON.stringify(templates)}
      <h1>List of My Tasks</h1>
      {JSON.stringify(tasks)}
      <div className="table-container">
        {deletingTask !== null && (
          <Dialog
            hidden={!isDeleteModalOpen}
            dialogContentProps={{
              type: DialogType.normal,
              title: `Apakah kamu yakin ingin menghapus task ini?`,
            }}
            modalProps={{
              isBlocking: true,
            }}
          >
            <DialogFooter>
              <PrimaryButton text="Yes" onClick={handleDeleteConfirmation} />
              <DefaultButton text="No" onClick={handleDeleteCancel} />
            </DialogFooter>
          </Dialog>
        )}
        <DetailsList
          items={tasks}
          columns={renderDetailsListColumns()}
          layoutMode={DetailsListLayoutMode.fixedColumns}
        />
      </div>
    </>
  );
};

export default Table;
