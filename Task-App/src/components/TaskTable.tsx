/* eslint-disable */
import React from "react";
import axios, { AxiosResponse } from "axios";
import { useState, useEffect, useContext } from "react";
import TaskContext from "../store/task-context";
import TemplateContext from "../store/template-context";
import { FormElement } from "../interface/interface";
import { formattedDate } from "../helper/helper";

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

import { Task } from "../interface/interface";

const Table: React.FC = (): JSX.Element => {
  const { tasks } = useContext(TaskContext);
  const { templates } = useContext(TemplateContext);
  const { dispatchTask } = useContext(TaskContext);
  const { dispatchTemplate } = useContext(TemplateContext);

  const baseUrl = "http://localhost:3000";

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
      const response: AxiosResponse<FormElement[][]> = await axios.get(
        `${baseUrl}/templates`
      );
      if (response.status !== 200) {
        throw new Error("Error fethcing template");
      }
      const jsonData: FormElement[][] = await response.data;
      dispatchTemplate({ type: "GET", data: jsonData });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataTask();
    fetchDataTemplate();
  }, []);

  // logic delete task
  const deleteTask = async (id: number): Promise<void> => {
    try {
      const opt = {
        method: "delete",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      const response = await axios(`${baseUrl}/tasks/${id}`, opt);

      if (response.status !== 200) {
        throw new Error("Gagal delete task");
      }

      fetchDataTask();
    } catch (error) {
      console.log(error);
    }
  };

  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleDeleteClick = (task: any) => {
    setDeletingTask(task);
    setIsDeleteModalOpen(true);
    console.log("Tes delete");
  };

  const handleDeleteConfirmation = () => {
    if (deletingTask) {
      deleteTask(deletingTask.id);
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
        onRender: (__, index: number) => index + 1,
        styles: {
          cellName: {
            fontSize: "20px",
          },
        },
      },
      ...templates.flatMap((row: any) =>
        row.map((field: any) => ({
          key: field.id,
          name: field.name,
          fieldName: field.id,
          minWidth: 100,
          maxWidth: 250,
          isResizable: true,
          styles: {
            cellName: {
              fontSize: "20px",
            },
          },
          onRender: (item: any) => {
            if (field.type === "DatePicker") {
              // Memformat nilai hanya jika jenisnya adalah "DatePicker"
              return formattedDate(item[field.id]);
            }
            // Untuk jenis lain, tampilkan nilai asli
            return item[field.id];
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
      <h1>List of My Tasks</h1>
      {/* {JSON.stringify(tasks)} */}
      {JSON.stringify(templates)}
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
