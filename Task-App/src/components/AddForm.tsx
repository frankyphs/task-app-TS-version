import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  TextField,
  PrimaryButton,
  DatePicker,
  SpinButton,
} from "@fluentui/react";

import { FormElement } from "./CustomizeForm";

import { FormValues } from "../interface/interface";
// interface FormValues {
//   [key: number | string]: string | undefined;
// }

// export interface FormElement {
//   id: string;
//   type: string;
//   name: string;
// }

interface AddFormProps {
  onSave: (formValues: FormValues) => void;
  template: FormElement[][];
  // template: object;
}

const AddFormRevision: React.FC<AddFormProps> = ({ onSave, template }) => {
  const [formValues, setFormValues] = useState<FormValues>({});
  const navigate = useNavigate();

  const handleFormChange = (id: string, value: string | undefined) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(formValues);
    console.log(formValues, "Ini form values");
    navigate("/");
  };

  return (
    <>
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
          {template &&
            template.map((row, rowIndex) => (
              <div key={rowIndex} className="div-baris">
                {row.map((el) => (
                  <div key={el.id} className="div-kolom">
                    {el.type === "TextField" && (
                      <TextField
                        placeholder="Enter text"
                        value={formValues[el.id] || ""}
                        onChange={(_, newValue) =>
                          handleFormChange(el.id, newValue)
                        }
                        label={el.name}
                      />
                    )}
                    {el.type === "SpinButton" && (
                      <SpinButton
                        value={formValues[el.id] || ""}
                        onChange={(_, value) => handleFormChange(el.id, value)}
                        label={el.name}
                        styles={{
                          arrowButtonsContainer: {
                            display: "flex",
                            height: "100%",
                            cursor: "default",
                          },
                        }}
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
                          if (date instanceof Date) {
                            handleFormChange(el.id, date.toISOString());
                          } else {
                            handleFormChange(el.id, undefined);
                          }
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
