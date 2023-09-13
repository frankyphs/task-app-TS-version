// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { NavLink } from "react-router-dom";
// import {
//   TextField,
//   PrimaryButton,
//   DatePicker,
//   SpinButton,
// } from "@fluentui/react";

// import { FormValues, FormElement, ErrorMessage } from "../interface/interface";

// interface AddFormProps {
//   onSave: (formValues: FormValues) => void;
//   template: FormElement[][];
// }

// const AddFormRevision: React.FC<AddFormProps> = ({
//   onSave,
//   template,
// }): JSX.Element => {
//   // buat variabel initialValues untuk mengecek input yg memiliki default value
//   const initialValues: FormValues = {};
//   template.forEach((row) => {
//     row.forEach((field) => {
//       if (field.data?.defaultValue !== undefined) {
//         initialValues[field.id] = field.data.defaultValue;
//       }
//     });
//   });

//   // simpan objek initialize ke dalam state formValues
//   const [formValues, setFormValues] = useState<FormValues>(initialValues);

//   const navigate = useNavigate();

//   const handleFormChange = (
//     id: string,
//     value: string | number | undefined | Date | boolean
//   ) => {
//     console.log(value, "ini value terbaru");
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       [id]: value,
//     }));
//   };

//   // eror ketika ada komponen mandatory yang tidak terisi (dipakai di useEffect dan sebelum submit form)
//   const [error, setError] = useState<ErrorMessage>({
//     show: false,
//     message: "",
//   });

//   // untuk memvalidasi apakah semua mandatory field sudah terisi, digunakan pada masing2 komponen input form
// const validateMandatoryField = (field: FormElement) => {
//   if (field.data?.isMandatory) {
//     const isEmpty = !formValues[field.id];

//     if (isEmpty) {
//       setError({
//         show: true,
//         message: `Please enter a valid ${field.name || "input"}.`,
//       });
//       console.log("ini eror kosong");
//     } else {
//       const allMandatoryFieldsFilled = template.every((row) =>
//         row.every((rowField) => {
//           if (rowField.data?.isMandatory) {
//             return formValues[rowField.id] !== "";
//           }
//           return true;
//         })
//       );

//       if (allMandatoryFieldsFilled) {
//         setError({ show: false, message: "" });
//       }
//     }
//   }
// };

//   // Buat fungsi eror message ke komponen form
//   const getErrorMessage = (value: string, isInputMandatory: boolean) => {
//     console.log(value);
//     if (isInputMandatory) {
//       return value?.trim().length > 0
//         ? ""
//         : "Mandatory input must be fullfilled";
//     }
//     return;
//   };

//   const handleSubmit = () => {
//     //cek kembali sebelum di submit, jika masih ada mandatory dan kosong, return.
//     const isAnyMandatoryFieldEmpty = template.some((row) =>
//       // disini digunakan logika some, ketika ada satu saja mandatory field yang nilainya masih undefined, maka akan mentriger eror
//       row.some((field) => field.data?.isMandatory && !formValues[field.id])
//     );

//     if (isAnyMandatoryFieldEmpty) {
//       setError({
//         show: true,
//         message: "Please enter input for all mandatory components.",
//       });
//       return;
//     }

//     onSave(formValues);
//     console.log(formValues, "ini form value");
//     navigate("/");
//   };

//   return (
//     <>
//       {JSON.stringify(template)}
//       <div className="add-form-container">
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <h3>Add Tasks Form</h3>
//           <NavLink
//             to="/customize-form"
//             style={{ fontSize: "24px", textAlign: "right" }}
//           >
//             Customize the form
//             <i className="fas fa-cog"></i>
//           </NavLink>
//         </div>
//         <div>
//           {error.show && (
//             <div
//               style={{
//                 fontSize: "18px",
//                 color: "red",
//                 textAlign: "center",
//               }}
//             >
//               {error.message}
//             </div>
//           )}
//           {template &&
//             template.map((row, rowIndex) => (
//               <div key={rowIndex} className="div-baris">
//                 {row.map((el) => (
//                   <div key={el.id} className="div-kolom">
//                     {/* {formValues[el.id] === "" && el.data?.isMandatory && (
//                       <div
//                         style={{
//                           fontSize: "18px",
//                           color: "red",
//                           textAlign: "center",
//                         }}
//                       >
//                         Please enter a valid input{el.name && ` for ${el.name}`}{" "}
//                       </div>
//                     )} */}

//                     {el.type === "TextField" && (
//                       <TextField
//                         placeholder="Enter text"
//                         value={formValues[el.id]?.toString() || ""}
//                         onChange={(_, newValue) => {
//                           handleFormChange(el.id, newValue);
//                         }}
//                         label={el.name}
//                         onGetErrorMessage={(value: string) =>
//                           getErrorMessage(
//                             value,
//                             el.data?.isMandatory as boolean
//                           )
//                         }
//                       />
//                     )}

//                     {el.type === "SpinButton" && (
//                       <SpinButton
//                         value={formValues[el.id]?.toString()}
//                         onChange={(_, newValue) => {
//                           handleFormChange(el.id, newValue);
//                         }}
//                         min={0}
//                         styles={{
//                           arrowButtonsContainer: {
//                             display: "flex",
//                             height: "100%",
//                             cursor: "default",
//                           },
//                         }}
//                         label={el.name}
//                         onValidate={(value: string): string | void => {
//                           const numberValue: number = +value;
//                           if (
//                             !isNaN(numberValue) &&
//                             numberValue >= 6 &&
//                             numberValue <= 10
//                           ) {
//                             return console.log("ini validate spin");
//                           }
//                         }}
//                       />
//                     )}

//                     {el.type === "DatePicker" && (
//                       <DatePicker
//                         value={
//                           formValues[el.id]
//                             ? new Date(formValues[el.id] as string)
//                             : undefined
//                         }
//                         onSelectDate={(date) => {
//                           handleFormChange(el.id, date?.toISOString());
//                         }}
//                         placeholder="Enter Date"
//                         label={el.name}
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ))}
//         </div>

//         <PrimaryButton
//           onClick={handleSubmit}
//           style={{ margin: "20px", fontSize: "20px" }}
//         >
//           Submit
//         </PrimaryButton>
//       </div>
//     </>
//   );
// };

// export default AddFormRevision;
