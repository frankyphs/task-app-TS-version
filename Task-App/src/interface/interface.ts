

export interface FormValues {
    [key:number|string]: string|undefined
}

export interface TextFieldType {
    type:"TextField";
    id:string;
    name?: string;
    class?: string;
}

export interface SpinButtonType{
    type:"SpinButton";
    id:string;
    name?:string;
    class?:string
}

export interface DatePickerType{
    type:"DatePicker";
    id:string;
    name?:string;
    class?:string;
}

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
