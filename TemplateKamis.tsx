// import { useContext, useState } from "react";
// import axios, { AxiosResponse } from "axios";
// import CustomizeRevise from "./CustomizeForm";
// import TemplateContext from "../store/template-context";
// import { useNavigate } from "react-router-dom";
// import { ErrorMessage, FormElement } from "../interface/interface";
// import { filterArray, modifyArray } from "../helper/helper";
// const baseUrl = "http://localhost:3000";
// import { PrimaryButton, TextField, Panel } from "@fluentui/react";

// const Template: React.FC = (): JSX.Element => {
//   const { templates } = useContext(TemplateContext);
//   const navigate = useNavigate();

//   //template
//   const [template, setTemplate] = useState<FormElement[][]>([]);

//   //buat handle eror saat edit
//   const [error, setError] = useState<ErrorMessage>({
//     show: false,
//     message: "",
//   });

//   // buat handle pas edit
//   const handleComponentNameChange = (
//     e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setEditingComponentName(e.currentTarget.value);
//   };

//   //nampilin tombol delete
//   const [showDeleteButton, setShowDeleteButton] = useState<boolean>(false);
//   const [deleteButtonIndex, setDeleteButtonIndex] = useState<number | null>(
//     null
//   );
//   const [deleteButtonRow, setDeleteButtonRow] = useState<number | null>(null);

//   const handleMouseEnter = (row: number, index: number) => {
//     setDeleteButtonIndex(index);
//     setDeleteButtonRow(row);
//     setShowDeleteButton(true);
//   };

//   const handleMouseLeave = () => {
//     setShowDeleteButton(false);
//     setDeleteButtonIndex(null);
//     setDeleteButtonIndex(null);
//   };

//   //disini buat kode pindahin semua callback
//   const [editingComponentName, setEditingComponentName] = useState<string>("");
//   const [editingComponentID, setEditingComponentID] = useState<string>("");
//   const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

//   //kode buat buka panel
//   const handleOpenPanel = (nameComponent: string, idComponent: string) => {
//     setIsPanelOpen(true);
//     setEditingComponentName(nameComponent);
//     setEditingComponentID(idComponent);
//   };

//   //kode buat save edit panel
//   const handlePanelSave = () => {
//     if (editingComponentName.trim() === "") {
//       setError({ show: true, message: "Please enter valid value" });
//       return;
//     }

//     let targetGroupIndex = -1;
//     let targetRowIndex = -1;

//     template.forEach((group, groupIndex: number) => {
//       group.forEach((component, componentIndex) => {
//         if (component.id == editingComponentID) {
//           targetGroupIndex = groupIndex;
//           targetRowIndex = componentIndex;
//         }
//       });
//     });
//     if (targetGroupIndex !== 1 && targetRowIndex !== 1) {
//       const updatedTemplate = [...templates];
//       updatedTemplate[targetGroupIndex][targetRowIndex] = {
//         ...updatedTemplate[targetGroupIndex][targetRowIndex],
//         name: editingComponentName,
//       };
//       setTemplate(updatedTemplate);
//     }
//     setError({ show: false, message: "" });
//     setIsPanelOpen(false);
//   };

//   const handleDeleteComponent = (id: number | string) => {
//     let targetGroupIndex = -1;
//     let targetComponentIndex = -1;

//     template.forEach((group, groupIndex) => {
//       group.forEach((component, componentIndex) => {
//         if (component.id === id) {
//           targetGroupIndex = groupIndex;
//           targetComponentIndex = componentIndex;
//         }
//       });
//     });
//     if (targetComponentIndex !== -1 && targetComponentIndex !== -1) {
//       const updatedTemplate = [...template];
//       updatedTemplate[targetGroupIndex].splice(targetComponentIndex, 1);
//       setTemplate(modifyArray(filterArray(updatedTemplate)));
//     }
//   };

//   const addTemplate = async (payload: FormElement[][]): Promise<void> => {
//     try {
//       const opt = {
//         method: "post",
//         data: payload,
//         headers: {
//           "Content-type": "application/json; charset=UTF-8",
//         },
//       };

//       const response: AxiosResponse<FormElement[][]> = await axios(
//         `${baseUrl}/templates`,
//         opt
//       );
//       if (response.status !== 201) {
//         throw new Error("fail to save template");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <CustomizeRevise
//         onSave={(formTemplate) => {
//           addTemplate(formTemplate);
//           navigate("/add-task");
//         }}
//         // onDelete={(id)=>{
//         //   handleDeleteComponent(id);
//         // }}
//         // onClick
//         // onSave
//         // openEditPanel
//         templates={templates}
//       />
//       <Panel
//         isOpen={isPanelOpen}
//         onDismiss={() => setIsPanelOpen(false)}
//         headerText="Edit Component"
//       >
//         {error.show && (
//           <div style={{ fontSize: "18px", color: "red", textAlign: "center" }}>
//             {error.message}
//           </div>
//         )}
//         <TextField
//           label="Component Name"
//           value={editingComponentName}
//           onChange={handleComponentNameChange}
//         />

//         <PrimaryButton text="Save" onClick={handlePanelSave} />
//       </Panel>
//     </div>
//   );
// };

// export default Template;
