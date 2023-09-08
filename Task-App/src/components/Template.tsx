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

  // buat handle pas edit
  const handleComponentNameChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditingComponentName(e.currentTarget.value);
  };

  //disini buat kode pindahin semua callback
  const [editingComponentName, setEditingComponentName] = useState<string>("");
  const [editingComponentID, setEditingComponentID] = useState<string>("");
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

  //kode buat buka panel
  const handleOpenPanel = (
    nameComponent: string,
    idComponent: string,
    isMandatory: boolean
  ) => {
    setIsPanelOpen(true);
    setEditingComponentName(nameComponent);
    setEditingComponentID(idComponent);
    setIsMandatoryToggle(isMandatory);
  };

  //kode buat handle is Mandatory
  // const [isMandatory, setIsMandatory] = useState<string>("yes");
  // const handleChangeMandatory = (ev: any, option: any) => {
  //   setIsMandatory(option.key);
  // };
  const [isMandatoryToggle, setIsMandatoryToggle] = useState<boolean>(false);
  const handleToggleChange = (
    _: React.MouseEvent<HTMLElement>,
    checked?: boolean
  ): void => {
    console.log(checked, "ini checked");
    setIsMandatoryToggle(checked || false);
  };

  // const options = [
  //   { key: "yes", text: "Yes" },
  //   { key: "no", text: "No" },
  // ];

  //kode buat save edit panel
  const handlePanelSave = () => {
    if (editingComponentName.trim() === "") {
      setError({ show: true, message: "Please enter a valid name." });
      return;
    }
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
      updatedTemplate[targetGroupIndex][targetComponentIndex] = {
        ...updatedTemplate[targetGroupIndex][targetComponentIndex],
        name: editingComponentName,
        data: {
          ...updatedTemplate[targetGroupIndex][targetComponentIndex].data,
          isMandatory: isMandatoryToggle,
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
        onClick={(name, id, isMandatory) => {
          handleOpenPanel(name, id, isMandatory);
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
