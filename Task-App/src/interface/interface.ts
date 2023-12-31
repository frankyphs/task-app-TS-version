

export interface FormValues {
    [key:string]: string|number|boolean|Date|undefined
    
}


export interface TextFieldType {
    type:"TextField";
    id:string;
    name?: string;
    class?: string;
    data?: {
        isMandatory?: boolean,
        defaultValue?: string|Date|number|boolean
    }
}

export interface SpinButtonType{
    type:"SpinButton";
    id:string;
    name?:string;
    class?:string;
    data?:{
        isMandatory?:boolean,
        defaultValue?:string|boolean|number|Date
    }
}

export interface DatePickerType{
    type:"DatePicker";
    id:string;
    name?:string;
    class?:string;
    data?:{
        isMandatory?:boolean;
        defaultValue?:string|boolean|number|Date
    }
}

export type FormElement = TextFieldType | SpinButtonType | DatePickerType ;


export interface Task {
    id:number;
    [key:string]:string|number|Date
}

export interface TaskState {
    tasks:object[]
}

export interface Action<T> {
type:string;
data : T
}

export interface ProviderProps {
    children: React.ReactNode;
  }


  export interface ErrorMessage {
    show:boolean;
    message:string
  }