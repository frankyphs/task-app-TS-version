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
  // use useEffect and new varibale, initialValues to fullfilled the form directly when its has defaultValue
  useEffect(() => {
    const initialValues: FormValues = {};
    template.forEach((row) => {
      console.log("here");
      row.forEach((field) => {
        if (field.data?.defaultValue !== undefined) {
          initialValues[field.id] = field.data.defaultValue;
        }
      });
    });
    // set initialValue as formVlues
    setFormValues(initialValues);
  }, [template]);

  const [formValues, setFormValues] = useState<FormValues>({});
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

  // test validate the spin button
  const handleValidate = (inputValue: string): string | void => {
    const numberValue = parseInt(inputValue, 10);
    if (numberValue % 2 === 0) {
      return inputValue;
    } else {
      return void 0;
    }
  };

  // error occured while mandatory form is not fullfilled before submit
  const [error, setError] = useState<ErrorMessage>({
    show: false,
    message: "",
  });

  // error function only for TextField getErrorMessage
  const getErrorMessage = (value: string, isInputMandatory: boolean) => {
    if (isInputMandatory) {
      return value?.trim().length > 0
        ? ""
        : "Mandatory input must be fullfilled";
    }
    return;
  };

  const handleSubmit = () => {
    // do check again before submitting, if there any empty mandatory field,
    const isAnyMandatoryFieldEmpty = template.some((row) =>
      // here i use "some" logic, which is if any just one is true (empty), isAnyMandatoryFieldEmpty automatically be true
      row.some((field) => field.data?.isMandatory && !formValues[field.id])
    );

    // show error while isAnyMandatoryField true
    if (isAnyMandatoryFieldEmpty) {
      setError({
        show: true,
        message: "Please enter input for all mandatory components.",
      });
      return;
    }

    onSave(formValues);
    navigate("/");
  };

  return (
    <React.Fragment>
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
                    {formValues[el.id] === "" &&
                      el.data?.isMandatory &&
                      el.type === "SpinButton" && (
                        <div
                          style={{
                            fontSize: "18px",
                            color: "red",
                            textAlign: "center",
                          }}
                        >
                          Please enter a valid input
                          {el.name && ` for ${el.name}`}{" "}
                        </div>
                      )}

                    {el.type === "TextField" && (
                      <TextField
                        placeholder="Enter text"
                        value={formValues[el.id]?.toString() || ""}
                        onChange={(_, newValue) => {
                          handleFormChange(el.id, newValue);
                        }}
                        label={el.name}
                        onGetErrorMessage={(value: string) =>
                          getErrorMessage(
                            value,
                            el.data?.isMandatory as boolean
                          )
                        }
                      />
                    )}

                    {el.type === "SpinButton" && (
                      <SpinButton
                        value={formValues[el.id]?.toString()}
                        onChange={(_, newValue) => {
                          handleFormChange(el.id, newValue);
                        }}
                        min={0}
                        styles={{
                          arrowButtonsContainer: {
                            display: "flex",
                            height: "100%",
                            cursor: "default",
                          },
                        }}
                        label={el.name}
                        onValidate={(value) => handleValidate(value)}
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
                        placeholder="Enter Date"
                        label={el.name}
                        isRequired={el.data?.isMandatory}
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
    </React.Fragment>
  );
};

export default AddFormRevision;
