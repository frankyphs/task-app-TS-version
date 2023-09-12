import { useContext, useState } from "react";
import axios, { AxiosResponse } from "axios";
import CustomizeRevise from "./CustomizeRevise";
import TemplateContext from "../store/template-context";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, FormElement } from "../interface/interface";
import { filterArray } from "../helper/helper";
const baseUrl = "http://localhost:3000";
import {
  PrimaryButton,
  TextField,
  Panel,
  Toggle,
  SpinButton,
  DatePicker,
} from "@fluentui/react";

const Template: React.FC = (): JSX.Element => {
  const { templates } = useContext(TemplateContext);
  const navigate = useNavigate();

  const [template, setTemplate] = useState<FormElement[][]>(templates);

  const [error, setError] = useState<ErrorMessage>({
    show: false,
    message: "",
  });

  //disini buat kode pindahin semua callback, karna panel edit harus berada di parent
  const [editingComponentName, setEditingComponentName] = useState<string>("");
  useState<string | undefined>("");
  const [editingComponentID, setEditingComponentID] = useState<string>("");
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const [editingDefaultValue, setEditingDefaultValue] = useState<
    string | undefined
  >("");
  const [editingDefaultValueSpin, setEditingDefaultValueSpin] = useState<
    string | undefined
  >(undefined);
  const [inputTypeComponent, setInputTypeComponent] = useState<string>("");
  const [isMandatoryToggle, setIsMandatoryToggle] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // buat handle pas edit nama komponen
  const handleComponentNameChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditingComponentName(e.currentTarget.value);
  };

  // ini untuk edit default value
  // text-field
  const handleComponentDefaultChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditingDefaultValue(e.currentTarget.value);
  };

  //spin-button
  const handleSpinButtonChange = (value: string | undefined) => {
    setEditingDefaultValueSpin(value);
  };

  //date-picker
  const handleDateChange = (date: Date | null | undefined) => {
    setSelectedDate(date || undefined);
  };

  //kode buat buka panel
  const handleOpenPanel = (
    //butuh info input type dan isMandatory untuk menyesuaikan isi panel
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
    setInputTypeComponent(inputType);

    // set semua state default value menjadi defValue agar panel bisa terisi
    setEditingDefaultValue(defValue);
    setEditingDefaultValueSpin(defValue);
    setSelectedDate(defValue ? new Date(defValue) : undefined);
  };

  const handleToggleChange = (
    _: React.MouseEvent<HTMLElement>,
    checked?: boolean
  ): void => {
    setIsMandatoryToggle(checked || false);
  };

  //kode buat save edit panel
  const handlePanelSave = () => {
    // disini kita cek hanya nama komponen tidak boleh kosong, default value kosong tidak masalah
    if (editingComponentName.trim() === "") {
      setError({ show: true, message: "Please enter a valid name." });
      return;
    }

    let targetGroupIndex = -1;
    let targetComponentIndex = -1;

    // kita cari terlebih dahulu indeks komponen yang kita edit
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
      updatedTemplate[targetGroupIndex][targetComponentIndex] = {
        ...updatedTemplate[targetGroupIndex][targetComponentIndex],
        name: editingComponentName,
        data: {
          ...updatedTemplate[targetGroupIndex][targetComponentIndex].data,
          isMandatory: isMandatoryToggle,
          // kita cek type komponen dan akan memperbaharui state default value sesuai type componentnya
          defaultValue: (() => {
            if (inputTypeComponent === "TextField") {
              return editingDefaultValue;
            } else if (inputTypeComponent === "SpinButton") {
              return editingDefaultValueSpin;
            } else {
              return selectedDate;
            }
          })(),
          // defaultValue:
          //   inputTypeComponent === "TextField"
          //     ? editingDefaultValue
          //     : inputTypeComponent === "SpinButton"
          //     ? editingDefaultValueSpin
          //     : selectedDate,

          // if(inputTypeComponent==="TextField"){
          //   defaultValue:editingDefaultValue
          // }else if(inputTypeComponent==="SpinButton"){
          //   defaultValue:editingDefaultValueSpin
          // }else{
          //   defaultValue:selectedDate
          // }
        },
      };
      setTemplate(updatedTemplate);
    }

    setError({ show: false, message: "" });
    setIsPanelOpen(false);
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
    console.log(template, "ini template sebelum di filter");
    // filter terlebih dahulu untuk menghilangkan array kosong
    const arrayBaru = filterArray(template);
    addTemplate(arrayBaru);
    navigate("/add-task");
  };

  return (
    <div>
      <CustomizeRevise
        // onChange akan menerima template form dari child, kemudian akan menjalankan fungsi setter. State template yang baru akan dikirimkan kembali ke child
        onChange={(formTemplate: FormElement[][]) => {
          setTemplate(formTemplate);
        }}
        // onClick menerima semua parameter yang dibutuhkan unruk edit nama dan default value
        onClick={(
          name: string,
          id: string,
          isMandatory: boolean,
          defValue: string | undefined,
          typeInput: string
        ) => {
          handleOpenPanel(name, id, isMandatory, defValue, typeInput);
        }}
        // state template yang diperbarui akan dikirimkan kembali ke child
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
        {/* nampilin eror ketika nama komponen berupa string kosong */}
        {error.show && (
          <div style={{ fontSize: "18px", color: "red", textAlign: "center" }}>
            {error.message}
          </div>
        )}

        {/* Ini bagian edit nama komponen */}
        <TextField
          label="Component Name"
          value={editingComponentName}
          onChange={handleComponentNameChange}
        />
        <div style={{ marginTop: "20px" }}></div>

        {/* ini bagian edit default value */}
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
            value={editingDefaultValueSpin}
            onChange={(__, value) => handleSpinButtonChange(value)}
          />
        )}

        {inputTypeComponent === "DatePicker" && (
          <DatePicker
            label="Input default value if needed"
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
