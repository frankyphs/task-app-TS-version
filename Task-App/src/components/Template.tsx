import { useContext, useState } from "react";
import axios, { AxiosResponse } from "axios";
import CustomizeRevise from "./CustomizeForm";
import TemplateContext from "../store/template-context";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, FormElement } from "../interface/interface";
import { filterArray } from "../helper/helper";
const baseUrl = "http://localhost:3000";
import {
  PrimaryButton,
  TextField,
  Panel,
  // ChoiceGroup,
  Toggle,
  SpinButton,
  DatePicker,
} from "@fluentui/react";

const Template: React.FC = (): JSX.Element => {
  const { templates } = useContext(TemplateContext);
  const navigate = useNavigate();

  //template
  const [template, setTemplate] = useState<FormElement[][]>(templates);

  const [error, setError] = useState<ErrorMessage>({
    show: false,
    message: "",
  });

  const [errorDefaultValueSpin, setErrorDefaultValueSpin] =
    useState<ErrorMessage>({
      show: false,
      message: "",
    });

  // buat handle pas edit
  const handleComponentNameChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditingComponentName(e.currentTarget.value);
  };
  // const handleComponentSpin = (id: number, value: any) => {
  //   setEditingDefaultValue((prev) => {
  //     return {
  //       ...prev, // Menyalin semua nilai dari objek sebelumnya
  //       [id]: value, // Menambah atau mengganti nilai pada indeks/id yang sesuai
  //     };
  //   });
  // };

  const handleSpinButtonChange = (value: string | undefined) => {
    // const numericValue = parseFloat(value);
    // if (!isNaN(numericValue)) {
    //   setEditingDefaultValueSpin(numericValue);
    // }
    setEditingDefaultValueSpin(value);
  };

  const handleComponentDefaultChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditingDefaultValue(e.currentTarget.value);
  };

  //disini buat kode pindahin semua callback
  const [editingComponentName, setEditingComponentName] = useState<string>("");
  // const [editingDefaultValueDeclared, setEditingDefaultValueDeclared] =
  useState<string | undefined>("");
  const [editingComponentID, setEditingComponentID] = useState<string>("");
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const [editingDefaultValue, setEditingDefaultValue] = useState<
    string | undefined
  >("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleDateChange = (date: Date | null | undefined) => {
    setSelectedDate(date || undefined); // Mengatur tanggal yang dipilih ke dalam state
  };

  const [editingDefaultValueSpin, setEditingDefaultValueSpin] = useState<
    string | undefined
  >(undefined);
  const [inputTypeComponent, setInputTypeComponent] = useState<string>("");

  //kode buat buka panel
  const handleOpenPanel = (
    nameComponent: string,
    idComponent: string,
    isMandatory: boolean,
    defValue: string | undefined,
    inputType: string
  ) => {
    setIsPanelOpen(true);
    setEditingComponentName(nameComponent);
    setEditingComponentID(idComponent);
    setIsMandatoryToggle(isMandatory);
    setEditingDefaultValue(defValue);
    // setEditingDefaultValueDeclared(defValue);
    setInputTypeComponent(inputType);
    setEditingDefaultValueSpin(defValue);
    // setSelectedDate(defValue);
    setSelectedDate(defValue ? new Date(defValue) : undefined);
  };

  const [isMandatoryToggle, setIsMandatoryToggle] = useState<boolean>(false);
  const handleToggleChange = (
    _: React.MouseEvent<HTMLElement>,
    checked?: boolean
  ): void => {
    console.log(checked, "ini checked");
    setIsMandatoryToggle(checked || false);
  };

  //kode buat save edit panel
  const handlePanelSave = () => {
    if (editingComponentName.trim() === "") {
      setError({ show: true, message: "Please enter a valid name." });
      return;
    }

    // console.log(editingDefaultValueSpin, "Ini default value spin");
    // console.log(inputTypeComponent, "Ini input type component");
    // console.log(!isNaN(editingDefaultValue), "ini harusnya true");

    console.log(editingDefaultValueSpin, "Ini default value spin");
    // if (inputTypeComponent === "SpinButton" && isNaN(editingDefaultValueSpin)) {
    //   setErrorDefaultValueSpin({
    //     show: true,
    //     message: "Please enter number for spin button input",
    //   });
    //   return;
    // }

    let targetGroupIndex = -1;
    let targetComponentIndex = -1;

    template.forEach((group, groupIndex) => {
      group.forEach((component, componentIndex) => {
        if (component.id == editingComponentID) {
          targetGroupIndex = groupIndex;
          targetComponentIndex = componentIndex;
        }
      });
    });

    if (targetGroupIndex !== -1 && targetComponentIndex !== -1) {
      const updatedTemplate = [...template];
      // updatedTemplate[targetGroupIndex][targetComponentIndex] = {
      //   ...updatedTemplate[targetGroupIndex][targetComponentIndex],
      //   name: editingComponentName,
      // };
      // updatedTemplate[targetGroupIndex][targetComponentIndex] = {
      //   ...updatedTemplate[targetGroupIndex][targetComponentIndex],
      //   name: editingComponentName,
      //   data: {
      //     ...updatedTemplate[targetGroupIndex][targetComponentIndex].data,
      //     isMandatory: isMandatoryToggle,
      //     defaultValue: editingDefaultValue || editingDefaultValueSpin,
      //     // defaultValue: editingDefaultValueSpin,
      //   },
      // };
      updatedTemplate[targetGroupIndex][targetComponentIndex] = {
        ...updatedTemplate[targetGroupIndex][targetComponentIndex],
        name: editingComponentName,
        data: {
          ...updatedTemplate[targetGroupIndex][targetComponentIndex].data,
          isMandatory: isMandatoryToggle,

          defaultValue:
            inputTypeComponent === "TextField"
              ? editingDefaultValue
              : inputTypeComponent === "SpinButton"
              ? editingDefaultValueSpin
              : selectedDate,
        },
      };
      setTemplate(updatedTemplate);
    }

    setError({ show: false, message: "" });
    setIsPanelOpen(false);
    setErrorDefaultValueSpin({ show: false, message: "" });
  };

  const addTemplate = async (payload: FormElement[][]): Promise<void> => {
    try {
      const opt = {
        method: "post",
        data: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };

      const response: AxiosResponse<FormElement[][]> = await axios(
        `${baseUrl}/templates`,
        opt
      );
      if (response.status !== 201) {
        throw new Error("fail to save template");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    const arrayBaru = filterArray(template);
    addTemplate(arrayBaru);

    navigate("/add-task");
  };

  return (
    <div>
      <CustomizeRevise
        onChange={(formTemplate: FormElement[][]) => {
          setTemplate(formTemplate);
        }}
        onClick={(
          name: string,
          id: string,
          isMandatory: boolean,
          defValue: string | undefined,
          typeInput: string
        ) => {
          handleOpenPanel(name, id, isMandatory, defValue, typeInput);
        }}
        templates={template}
      />
      <PrimaryButton
        style={{ margin: "20px", fontSize: "20px" }}
        className="add-form-button"
        onClick={handleSubmit}
      >
        Save Template
      </PrimaryButton>

      <Panel
        isOpen={isPanelOpen}
        onDismiss={() => setIsPanelOpen(false)}
        headerText="Edit Component"
      >
        {error.show && (
          <div style={{ fontSize: "18px", color: "red", textAlign: "center" }}>
            {error.message}
          </div>
        )}
        <TextField
          label="Component Name"
          value={editingComponentName}
          onChange={handleComponentNameChange}
        />
        <div style={{ marginTop: "20px" }}></div>

        {errorDefaultValueSpin.show && (
          <div style={{ fontSize: "18px", color: "red", textAlign: "center" }}>
            {errorDefaultValueSpin.message}
          </div>
        )}

        {inputTypeComponent === "TextField" && (
          <TextField
            label="Input default value if needed"
            value={editingDefaultValue}
            onChange={handleComponentDefaultChange}
          />
        )}

        {inputTypeComponent === "SpinButton" && (
          <SpinButton
            label="Input default value if needed"
            // value={editingDefaultValue}
            value={editingDefaultValueSpin}
            onChange={(__, value) => handleSpinButtonChange(value)}
          />
        )}

        {inputTypeComponent === "DatePicker" && (
          <DatePicker
            label="Input default value if needed"
            // value={editingDefaultValue}
            value={selectedDate}
            onSelectDate={handleDateChange}
          />
        )}

        <div style={{ marginTop: "20px" }}></div>

        <Toggle
          label="Is Mandatory Field ?"
          onText="Yes"
          offText="No"
          checked={isMandatoryToggle}
          onChange={handleToggleChange}
        />
        <PrimaryButton text="Save" onClick={handlePanelSave} />
      </Panel>
    </div>
  );
};

export default Template;
