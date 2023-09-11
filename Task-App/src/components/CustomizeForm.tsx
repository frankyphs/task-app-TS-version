/* eslint-disable */

import React, { useState } from "react";
import { useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import {
  TextField,
  DatePicker,
  SpinButton,
  // Panel,
} from "@fluentui/react";

import { FormElement } from "../interface/interface";
import { filterArray, modifyArray } from "../helper/helper";

type Component = FormElement;
const COMPONENT: Component[] = [
  { type: "TextField", id: "11", class: "fas fa-font" },
  { type: "DatePicker", id: "12", class: "far fa-calendar-alt" },
  { type: "SpinButton", id: "13", class: "fas fa-cog" },
];
export interface OpenPanelType {
  nameComponent: string;
  idComponent: string;
}

interface AddTemplateProps {
  templates: FormElement[][];
  onChange: (formTemplate: FormElement[][]) => void;
  onClick: (
    name: string,
    id: any,
    isMandatory: boolean,
    defaultValue: string | undefined,
    type: string
  ) => void;
}

const CustomizeRevise: React.FC<AddTemplateProps> = ({
  templates,
  onChange,
  onClick,
}): JSX.Element => {
  const [template, setTemplate] = useState<FormElement[][]>([]);

  const [custom, setCustom] = useState<Component[]>(COMPONENT);

  useState(false);

  useEffect(() => {
    setTemplate(modifyArray(templates));
  }, []);

  //balikin lagi semua props dari parent

  const [showDeleteButton, setShowDeleteButton] = useState<boolean>(false);
  const [deleteButtonIndex, setDeleteButtonIndex] = useState<number | null>(
    null
  );
  const [deleteButtonRow, setDeleteButtonRow] = useState<number | null>(null);
  //handle mouse enter

  const handleMouseEnter = (row: number, index: number) => {
    setDeleteButtonIndex(index);
    setDeleteButtonRow(row);
    setShowDeleteButton(true);
  };
  //handle mouse leave
  const handleMouseLeave = () => {
    setShowDeleteButton(false);
    setDeleteButtonIndex(null);
    setDeleteButtonIndex(null);
  };

  //buat fungsi onClick untuk callback ke parent

  const handleClick = (
    name: string,
    id: any,
    isMandatory: boolean,
    defaultValue: string | undefined,
    inputType: string
  ) => {
    onClick(name, id, isMandatory, defaultValue, inputType);
  };

  //handle delete component
  const handleDeleteComponent = (id: string | number) => {
    let targetGroupIndex = -1;
    let targetComponentIndex = -1;

    template.forEach((group, groupIndex) => {
      group.forEach((component, componentIndex) => {
        if (component.id === id) {
          targetGroupIndex = groupIndex;
          targetComponentIndex = componentIndex;
        }
      });
    });

    if (targetGroupIndex !== -1 && targetComponentIndex !== -1) {
      // Salin array template dan hapus komponen yang sesuai
      const updatedTemplate = [...template];
      updatedTemplate[targetGroupIndex].splice(targetComponentIndex, 1);

      // Simpan perubahan ke state template
      const arrayFilter = filterArray(updatedTemplate);
      const hasilArray = modifyArray(arrayFilter);
      setTemplate(hasilArray);
      onChange(hasilArray);
    }
  };

  const handleDragandDrops = (results: any) => {
    const { source, destination } = results;

    if (!destination) {
      return;
    }

    // ini logic ketika tidak terjadi perubahan apapun
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // ini logic untuk pemindahan komponen pada baris / row yang sama / droppableId yg sama
    if (source.droppableId === destination.droppableId) {
      // logic untuk pindah antar 3 komponen utama (tapi udah saya bikin isDropDisabled true)
      if (source.droppableId !== "group") {
        const newTemplate = [...template];
        const simpanArray = [...newTemplate[source.droppableId]];
        const [movedComponent] = simpanArray.splice(source.index, 1);
        simpanArray.splice(destination.index, 0, movedComponent);
        newTemplate[source.droppableId] = simpanArray;
        const newArray = filterArray(newTemplate);
        const finalArray = modifyArray(newArray);
        setTemplate(finalArray);
        onChange(finalArray);
      } else {
        const reorderedStores = [...template];
        const storeSourceIndex = source.index;
        const storeDestinatonIndex = destination.index;

        const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
        reorderedStores.splice(storeDestinatonIndex, 0, removedStore);
        const newArray = filterArray(reorderedStores);
        const finalArray = modifyArray(newArray);
        setTemplate(finalArray);
        onChange(finalArray);
      }
    }

    // ini logic untuk penambahan komponen pada form area
    if (
      source.droppableId === "component" &&
      destination.droppableId !== "group"
    ) {
      // setShowDialog(true);
      const newTemplate = [...template];
      const reorderedComponents = [...custom];
      const arrayDropId = destination.droppableId;
      const simpanArrayTujuan = [...newTemplate[arrayDropId]];
      const [movedOriginComponent] = reorderedComponents.splice(
        source.index,
        1
      );
      const newComponent: FormElement = {
        type: movedOriginComponent.type,
        id: new Date().getTime().toString(),
        name: movedOriginComponent.type,
      };

      simpanArrayTujuan.splice(destination.index, 0, newComponent);
      newTemplate[destination.droppableId] = simpanArrayTujuan;
      setCustom(custom);
      const newArray = filterArray(newTemplate);
      const finalArray = modifyArray(newArray);
      setTemplate(finalArray);
      onChange(finalArray);
    }

    // ini logic untuk pemindahan komponen antar baris row
    if (
      source.droppableId !== destination.droppableId &&
      source.droppableId !== "component"
    ) {
      const newTemplate = [...template];
      const simpanArrayAsal = [...newTemplate[source.droppableId]];
      const simpanArrayTujuan = [...newTemplate[destination.droppableId]];
      const [movedComponent] = simpanArrayAsal.splice(source.index, 1);
      simpanArrayTujuan.splice(destination.index, 0, movedComponent);
      newTemplate[source.droppableId] = simpanArrayAsal;
      newTemplate[destination.droppableId] = simpanArrayTujuan;

      const newArray = filterArray(newTemplate);
      const finalArray = modifyArray(newArray);
      setTemplate(finalArray);
      onChange(finalArray);
    }
    console.log(template, "Ini Template");
  };

  return (
    <>
      <div>
        <DragDropContext onDragEnd={handleDragandDrops}>
          <Droppable
            droppableId="component"
            type="component1"
            isDropDisabled={true}
          >
            {(provided: any) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="dropArea-component"
              >
                {custom.map((el, index) => (
                  <Draggable key={el.id} draggableId={el.id} index={index}>
                    {(provided: any) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className="draggable-component"
                      >
                        <i className={el.class}></i> {el.type}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="group" type="form">
            {(provided: any, snapshot: any) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="dropArea1"
                style={{
                  backgroundColor: snapshot.isDraggingOver ? "#FF6969" : "#FFF",
                }}
              >
                {template.map((row, rowIndex) => (
                  <div key={`row-${rowIndex}`} className="bungkus">
                    <Draggable
                      key={`row-${rowIndex}`}
                      draggableId={`row-${rowIndex}`}
                      index={rowIndex}
                    >
                      {(provided: any) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          className="draggable-item-main"
                        >
                          <Droppable
                            droppableId={`${rowIndex}`}
                            type="component1"
                            direction="horizontal"
                          >
                            {(provided: any, snapshot: any) => (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                  backgroundColor: snapshot.isDraggingOver
                                    ? "#FFC6AC"
                                    : "#DFD7BF",
                                }}
                                className={`row ${
                                  row.length > 0 ? "filled-row" : "empty-row"
                                }`}
                              >
                                {row.map((el, colIndex) => (
                                  <div
                                    key={`col-${rowIndex}-${colIndex}`}
                                    className="col"
                                  >
                                    <Draggable
                                      key={el.id}
                                      draggableId={el.id}
                                      index={colIndex}
                                    >
                                      {(provided: any) => (
                                        <div
                                          {...provided.dragHandleProps}
                                          {...provided.draggableProps}
                                          ref={provided.innerRef}
                                          className="draggable-item-secondary"
                                          onMouseEnter={() =>
                                            handleMouseEnter(rowIndex, colIndex)
                                          }
                                          onMouseLeave={() =>
                                            handleMouseLeave()
                                          }
                                        >
                                          <div className="nama-form">
                                            <button
                                              // onClick={() =>
                                              //   handleOpenPanel(
                                              //     el.name as string,
                                              //     el.id
                                              //   )
                                              // }
                                              onClick={() =>
                                                handleClick(
                                                  el.name as string,
                                                  el.id,

                                                  el.data
                                                    ?.isMandatory as boolean,
                                                  el.data
                                                    ?.defaultValue as string,
                                                  el.type
                                                )
                                              }
                                              className="tombol-edit"
                                            >
                                              {el.name}
                                            </button>
                                            {showDeleteButton &&
                                              deleteButtonIndex === colIndex &&
                                              deleteButtonRow === rowIndex && (
                                                <div>
                                                  <button
                                                    onClick={() =>
                                                      handleDeleteComponent(
                                                        el.id
                                                      )
                                                    }
                                                    className="tombol-delete"
                                                  >
                                                    <i className="fas fa-trash"></i>
                                                  </button>
                                                </div>
                                              )}
                                          </div>

                                          {el.type === "TextField" && (
                                            <TextField disabled={true} />
                                          )}
                                          {el.type === "DatePicker" && (
                                            <DatePicker disabled={true} />
                                          )}
                                          {el.type === "SpinButton" && (
                                            <SpinButton disabled={true} />
                                          )}
                                        </div>
                                      )}
                                    </Draggable>
                                  </div>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </div>
                      )}
                    </Draggable>
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default CustomizeRevise;
