import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  TextField,
  PrimaryButton,
  DatePicker,
  SpinButton,
} from "@fluentui/react";

import { FormValues, FormElement, ErrorMessage } from "../interface/interface";

interface AddFormProps {
  onSave: (formValues: FormValues) => void;
  template: FormElement[][];
}

const AddFormRevision: React.FC<AddFormProps> = ({
  onSave,
  template,
}): JSX.Element => {
  //initialize formValue agar langsung bisa baca jika ada default value
  // const initialValues = {[key: string]: any}={}
  const initialValues: FormValues = {};
  template.forEach((row) => {
    row.forEach((field) => {
      if (field.data?.defaultValue !== undefined) {
        initialValues[field.id] = field.data.defaultValue;
      }
    });
  });

  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  // const [formValues, setFormValues] = useState<FormValues>({});
  const navigate = useNavigate();

  const handleFormChange = (
    id: string,
    value: string | number | undefined | Date | boolean
  ) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const [error, setError] = useState<ErrorMessage>({
    show: false,
    message: "",
  });

  const validateMandatoryField = (field: FormElement) => {
    if (field.data?.isMandatory) {
      const isEmpty = !formValues[field.id];

      if (isEmpty) {
        setError({
          show: true,
          message: `Please enter a valid ${field.name || "input"}.`,
        });
      } else {
        // Periksa jika semua input wajib tidak kosong
        const allMandatoryFieldsFilled = template.every((row) =>
          row.every((rowField) => {
            if (rowField.data?.isMandatory) {
              return formValues[rowField.id] !== "";
            }
            return true; // Bypass field yang bukan mandatory
          })
        );

        if (allMandatoryFieldsFilled) {
          setError({ show: false, message: "" });
        }
      }
    }
  };

  useEffect(() => {
    // console.log(formValues, "Ini form values di awal");
    const isAllMandatoryFieldsFilled = template.every((row) =>
      row.every((field) => {
        if (field.data?.isMandatory) {
          if (formValues[field.id] !== "") {
            return true;
          } else if (field.data.defaultValue !== undefined) {
            return true;
          }

          return false;
        }

        return true;
      })
    );

    if (isAllMandatoryFieldsFilled) {
      setError({ show: false, message: "" });
    } else {
      setError({
        show: true,
        message: "Please enter input for all mandatory components.",
      });
    }
  }, [formValues, template]);

  const handleSubmit = () => {
    // Periksa apakah ada input yang wajib diisi kosong
    const isAnyMandatoryFieldEmpty = template.some((row) =>
      row.some((field) => field.data?.isMandatory && !formValues[field.id])
    );

    if (isAnyMandatoryFieldEmpty) {
      setError({
        show: true,
        message: "Please enter input for all mandatory components.",
      });
      return;
    }

    // Jika semua input wajib diisi sudah terisi, lanjutkan
    onSave(formValues);
    navigate("/");
  };

  return (
    <>
      {JSON.stringify(template)}
      <div className="add-form-container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Add Tasks Form</h3>
          <NavLink
            to="/customize-form"
            style={{ fontSize: "24px", textAlign: "right" }}
          >
            Customize the form
            <i className="fas fa-cog"></i>
          </NavLink>
        </div>
        <div>
          {error.show && (
            <div
              style={{
                fontSize: "18px",
                color: "red",
                textAlign: "center",
              }}
            >
              {error.message}
            </div>
          )}
          {template &&
            template.map((row, rowIndex) => (
              <div key={rowIndex} className="div-baris">
                {row.map((el) => (
                  <div key={el.id} className="div-kolom">
                    {formValues[el.id] === "" && el.data?.isMandatory && (
                      <div
                        style={{
                          fontSize: "18px",
                          color: "red",
                          textAlign: "center",
                        }}
                      >
                        Please enter a valid input{el.name && ` for ${el.name}`}{" "}
                      </div>
                    )}
                    {/* {el.type === "TextField" && (
                      <TextField
                        placeholder="Enter text"
                        value={formValues[el.id] || ""}
                        onChange={(_, newValue) => {
                          const isMandatory = el.data?.isMandatory === true;
                          const isEmpty = newValue === "";

                          if (isMandatory && isEmpty) {
                            setError({
                              show: true,
                              message: `Please enter a valid ${
                                el.name || "input"
                              }.`,
                            });
                          } else {
                            // Periksa jika semua input wajib tidak kosong
                            const allMandatoryFieldsFilled = template.every(
                              (row) =>
                                row.every((field) => {
                                  if (field.data?.isMandatory) {
                                    return formValues[field.id] !== "";
                                  }
                                  return true; // Bypass field yang bukan mandatory
                                })
                            );

                            if (allMandatoryFieldsFilled) {
                              setError({ show: false, message: "" });
                            }
                          }

                          handleFormChange(el.id, newValue);
                        }}
                        label={el.name}
                      />
                    )} */}
                    {el.type === "TextField" && (
                      <TextField
                        placeholder="Enter text"
                        // value={formValues[el.id] || ""}
                        value={
                          formValues[el.id] !== undefined
                            ? formValues[el.id]
                            : el.data?.defaultValue || ""
                        }
                        onChange={(_, newValue) => {
                          handleFormChange(el.id, newValue);
                        }}
                        onBlur={() => {
                          validateMandatoryField(el);
                        }}
                        label={el.name}
                      />
                    )}

                    {el.type === "SpinButton" && (
                      <SpinButton
                        // value={formValues[el.id] || ""}
                        value={
                          formValues[el.id] !== undefined
                            ? formValues[el.id]
                            : el.data?.defaultValue || 0
                        }
                        onChange={(_, newValue) => {
                          handleFormChange(el.id, newValue);
                        }}
                        onBlur={() => {
                          validateMandatoryField(el);
                        }}
                        styles={{
                          arrowButtonsContainer: {
                            display: "flex",
                            height: "100%",
                            cursor: "default",
                          },
                        }}
                        label={el.name}
                      />
                    )}
                    {el.type === "DatePicker" && (
                      <DatePicker
                        value={
                          formValues[el.id]
                            ? new Date(formValues[el.id] as string)
                            : undefined
                        }
                        onSelectDate={(date) => {
                          handleFormChange(el.id, date?.toISOString());
                        }}
                        onBlur={() => {
                          validateMandatoryField(el);
                        }}
                        placeholder="Enter Date"
                        label={el.name}
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
        </div>

        <PrimaryButton
          onClick={handleSubmit}
          style={{ margin: "20px", fontSize: "20px" }}
        >
          Submit
        </PrimaryButton>
      </div>
    </>
  );
};

export default AddFormRevision;
