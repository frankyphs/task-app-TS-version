// import { useContext, useState } from "react";
// import axios, { AxiosResponse } from "axios";
// import CustomizeRevise from "./CustomizeRevise";
// import TemplateContext from "../store/template-context";
// import { useNavigate } from "react-router-dom";
// import { ErrorMessage, FormElement } from "../interface/interface";
// import { filterArray } from "../helper/helper";
// const baseUrl = "http://localhost:3000";
// import {
//   PrimaryButton,
//   TextField,
//   Panel,
//   Toggle,
//   SpinButton,
//   DatePicker,
// } from "@fluentui/react";

// const Template: React.FC = (): JSX.Element => {
//   const { templates } = useContext(TemplateContext);
//   const navigate = useNavigate();

//   const [template, setTemplate] = useState<FormElement[][]>(templates);

//   const [error, setError] = useState<ErrorMessage>({
//     show: false,
//     message: "",
//   });

//   //disini buat kode pindahin semua callback, karna panel edit harus berada di parent
//   const [editingComponentName, setEditingComponentName] = useState<string>("");
//   useState<string | undefined>("");
//   const [editingComponentID, setEditingComponentID] = useState<string>("");
//   const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
//   const [editingDefaultValue, setEditingDefaultValue] = useState<
//     string | undefined
//   >("");
//   const [editingDefaultValueSpin, setEditingDefaultValueSpin] = useState<
//     string | undefined
//   >(undefined);
//   const [inputTypeComponent, setInputTypeComponent] = useState<string>("");
//   const [isMandatoryToggle, setIsMandatoryToggle] = useState<boolean>(false);
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

//   // code for edit component's name
//   const handleComponentNameChange = (
//     e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setEditingComponentName(e.currentTarget.value);
//   };

//   // code for edit default value
//   // text-field
//   const handleComponentDefaultChange = (
//     e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setEditingDefaultValue(e.currentTarget.value);
//   };

//   //spin-button
//   const handleSpinButtonChange = (value: string | undefined) => {
//     setEditingDefaultValueSpin(value);
//   };

//   //date-picker
//   const handleDateChange = (date: Date | null | undefined) => {
//     setSelectedDate(date || undefined);
//   };

//   // this code for options on dropdown
//   // const [option, setOption] = useState([]);
//   // const [inputTextOption, setInputTextOption] = useState("");

//   // code for open panel
//   const handleOpenPanel = (
//     // need input type and isMandatory to adjust the contents of panel
//     nameComponent: string,
//     idComponent: string,
//     isMandatory: boolean,
//     defValue: string | undefined,
//     inputType: string
//   ) => {
//     setIsPanelOpen(true);
//     setEditingComponentName(nameComponent);
//     setEditingComponentID(idComponent);
//     setIsMandatoryToggle(isMandatory);
//     setInputTypeComponent(inputType);

//     // set all default value state to be defValue so that the panel can be filled
//     setEditingDefaultValue(defValue);
//     setEditingDefaultValueSpin(defValue);
//     setSelectedDate(defValue ? new Date(defValue) : undefined);
//   };

//   const handleToggleChange = (
//     _: React.MouseEvent<HTMLElement>,
//     checked?: boolean
//   ): void => {
//     setIsMandatoryToggle(checked || false);
//   };

//   //kode buat save edit panel
//   const handlePanelSave = () => {
//     // here i just do check the component's name is not allowed to be empty, default value empty is not problem
//     if (editingComponentName.trim() === "") {
//       setError({ show: true, message: "Please enter a valid name." });
//       return;
//     }

//     let targetGroupIndex = -1;
//     let targetComponentIndex = -1;

//     // i search first index value of component that i'll be edited
//     template.forEach((group, groupIndex) => {
//       group.forEach((component, componentIndex) => {
//         if (component.id == editingComponentID) {
//           targetGroupIndex = groupIndex;
//           targetComponentIndex = componentIndex;
//         }
//       });
//     });

//     if (targetGroupIndex !== -1 && targetComponentIndex !== -1) {
//       const updatedTemplate = [...template];
//       updatedTemplate[targetGroupIndex][targetComponentIndex] = {
//         ...updatedTemplate[targetGroupIndex][targetComponentIndex],
//         name: editingComponentName,
//         data: {
//           ...updatedTemplate[targetGroupIndex][targetComponentIndex].data,
//           isMandatory: isMandatoryToggle,
//           // i updated state of  defaultValue correspond as component's type
//           defaultValue: (() => {
//             if (inputTypeComponent === "TextField") {
//               return editingDefaultValue;
//             } else if (inputTypeComponent === "SpinButton") {
//               return editingDefaultValueSpin;
//             } else {
//               return selectedDate;
//             }
//           })(),
//           // defaultValue:
//           //   inputTypeComponent === "TextField"
//           //     ? editingDefaultValue
//           //     : inputTypeComponent === "SpinButton"
//           //     ? editingDefaultValueSpin
//           //     : selectedDate,

//           // if(inputTypeComponent==="TextField"){
//           //   defaultValue:editingDefaultValue
//           // }else if(inputTypeComponent==="SpinButton"){
//           //   defaultValue:editingDefaultValueSpin
//           // }else{
//           //   defaultValue:selectedDate
//           // }
//         },
//       };
//       setTemplate(updatedTemplate);
//     }

//     setError({ show: false, message: "" });
//     setIsPanelOpen(false);
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

//   const handleSubmit = () => {
//     console.log(template, "ini template sebelum di filter");
//     // filter terlebih dahulu untuk menghilangkan array kosong
//     const arrayBaru = filterArray(template);
//     addTemplate(arrayBaru);
//     navigate("/add-task");
//   };

//   return (
//     <div>
//       <CustomizeRevise
//         // onChange will receive form template from child, and then execute stter function. New updated state template will be sent back to child
//         onChange={(formTemplate: FormElement[][]) => {
//           setTemplate(formTemplate);
//         }}
//         // onClick receive all of needed parameter for editing name and default value
//         onClick={(
//           name: string,
//           id: string,
//           isMandatory: boolean,
//           defValue: string | undefined,
//           typeInput: string
//         ) => {
//           handleOpenPanel(name, id, isMandatory, defValue, typeInput);
//         }}
//         // updated state template wii be send back to child
//         templates={template}
//       />

//       <PrimaryButton
//         style={{ margin: "20px", fontSize: "20px" }}
//         className="add-form-button"
//         onClick={handleSubmit}
//       >
//         Save Template
//       </PrimaryButton>

//       <Panel
//         isOpen={isPanelOpen}
//         onDismiss={() => setIsPanelOpen(false)}
//         headerText="Edit Component"
//       >
//         {/* display eror while component's name is empty string*/}
//         {error.show && (
//           <div style={{ fontSize: "18px", color: "red", textAlign: "center" }}>
//             {error.message}
//           </div>
//         )}

//         {/* code for editing component's name */}
//         <TextField
//           label="Component Name"
//           value={editingComponentName}
//           onChange={handleComponentNameChange}
//         />
//         <div style={{ marginTop: "20px" }}></div>

//         {/* code for editing default value */}
//         {inputTypeComponent === "TextField" && (
//           <TextField
//             label="Input default value if needed"
//             value={editingDefaultValue}
//             onChange={handleComponentDefaultChange}
//           />
//         )}

//         {inputTypeComponent === "SpinButton" && (
//           <SpinButton
//             label="Input default value if needed"
//             value={editingDefaultValueSpin}
//             onChange={(__, value) => handleSpinButtonChange(value)}
//             min={0}
//             defaultValue={undefined}
//           />
//         )}

//         {inputTypeComponent === "DatePicker" && (
//           <DatePicker
//             label="Input default value if needed"
//             value={selectedDate}
//             onSelectDate={handleDateChange}
//           />
//         )}
//         {/*
//         {inputTypeComponent === "DropDown" && (
//           <>
//             <TextField
//               label="Tambahkan opsi Dropdown"
//               value={inputTextOption}
//               onChange={(_event, newValue) => setInputTextOption(newValue)}
//             />

//             <PrimaryButton
//               text="Tambahkan"
//               onClick={() => {
//                 if (inputTextOption.trim() !== "") {
//                   setOption([...option, { key: inputTextOption, text: inputText }]);
//                   setInputTextOption("");
//                 }
//               }}
//             />
//           </>
//         )} */}

//         <div style={{ marginTop: "20px" }}></div>

//         <Toggle
//           label="Is Mandatory Field ?"
//           onText="Yes"
//           offText="No"
//           checked={isMandatoryToggle}
//           onChange={handleToggleChange}
//         />
//         <PrimaryButton text="Save" onClick={handlePanelSave} />
//       </Panel>
//     </div>
//   );
// };

// export default Template;
