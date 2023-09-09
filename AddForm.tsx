// import React, { useState, useEffect } from "react";
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
//   const [formValues, setFormValues] = useState<FormValues>({});
//   const navigate = useNavigate();

//   const handleFormChange = (id: string, value: string | undefined) => {
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       [id]: value,
//     }));
//   };

//   useEffect(() => {
//     template.forEach((row) => {
//       row.forEach((el) => {
//         if (el.data?.isMandatory) {
//           setError({
//             show: true,
//             message: "Please enter input for all mandatory component",
//           });
//         }
//       });
//     });
//   }, [template]);

//   const [error, setError] = useState<ErrorMessage>({
//     show: false,
//     message: "",
//   });
//   // const handleSubmit = () => {
//   //   console.log(error, "Ini eror ");
//   //   if (error.show === true) {
//   //     return;
//   //   }
//   //   onSave(formValues);
//   //   console.log(formValues, "Ini form values");
//   //   navigate("/");
//   // };

//   // const handleSubmit = () => {
//   //   let hasError = false;

//   //   template.forEach((row) => {
//   //     row.forEach((el) => {
//   //       if (el.data?.isMandatory && formValues[el.id] === "") {
//   //         hasError = true;
//   //       }
//   //     });
//   //   });
//   //   if (error.show) {
//   //     console.log("Frankyyyyyyyy");
//   //     return;
//   //   }
//   //   console.log(error, "INI ERORRRRRR");
//   //   if (hasError) {
//   //     console.log("Frankyyyyyyyy");
//   //     return;
//   //   }

//   //   onSave(formValues);
//   //   navigate("/");
//   // };

//   const handleSubmit = () => {
//     let hasError = false;

//     template.forEach((row) => {
//       row.forEach((el) => {
//         if (el.data?.isMandatory && formValues[el.id] === "") {
//           hasError = true;
//           return; // Menghentikan iterasi jika ditemukan satu kesalahan
//         }
//       });

//       if (hasError) {
//         return; // Menghentikan iterasi jika ditemukan satu kesalahan
//       }
//     });

//     if (hasError) {
//       // Ada setidaknya satu kesalahan, tidak melakukan apa pun
//       return;
//     }

//     // Tidak ada kesalahan, melanjutkan dengan onSave
//     onSave(formValues);
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
//                     {formValues[el.id] === "" && el.data?.isMandatory && (
//                       <div
//                         style={{
//                           fontSize: "18px",
//                           color: "red",
//                           textAlign: "center",
//                         }}
//                       >
//                         Please enter a valid input{el.name && ` for ${el.name}`}{" "}
//                       </div>
//                     )}
//                     {el.type === "TextField" && (
//                       <TextField
//                         placeholder="Enter text"
//                         value={formValues[el.id] || ""}
//                         onChange={(_, newValue) => {
//                           const isMandatory = el.data?.isMandatory === true;

//                           if (isMandatory && newValue === "") {
//                             // console.log("ini onChange yg belum diisi");
//                             setError({
//                               show: true,
//                               message: "Please enter a valid name.",
//                             });
//                           } else {
//                             // console.log("ini on change yang udah diisi");
//                             setError({ show: false, message: "" });
//                             handleFormChange(el.id, newValue);
//                           }
//                           // console.log(
//                           //   error.show,
//                           //   "Ini eror show true atau false"
//                           // );
//                         }}
//                         label={el.name}
//                       />
//                     )}
//                     {el.type === "SpinButton" && (
//                       <SpinButton
//                         value={formValues[el.id] || ""}
//                         onChange={(_, newValue) => {
//                           handleFormChange(el.id, newValue);
//                         }}
//                         styles={{
//                           arrowButtonsContainer: {
//                             display: "flex",
//                             height: "100%",
//                             cursor: "default",
//                           },
//                         }}
//                         label={el.name}
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
//                           if (date instanceof Date) {
//                             handleFormChange(el.id, date.toISOString());
//                           } else {
//                             handleFormChange(el.id, undefined);
//                           }
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
