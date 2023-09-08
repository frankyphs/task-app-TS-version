import {FormElement} from "../interface/interface"

export const filterArray = (array: FormElement[][]): FormElement[][] => {
    const simpanArray = array.filter((el) => el.length !== 0);
    return simpanArray;
  };

export const modifyArray = (array: FormElement[][]): FormElement[][] => {
    const  result: FormElement[][] = [];

    result.push([]);

    for (let i = 0; i < array.length; i++) {
      result.push(array[i]);

      if (i < array.length - 1) {
        result.push([]);
      }
    }

    result.push([]);

    return result;
  };

  export const formattedDate = (date:Date)=>{
    if(!date){
      return
    }
    const tanggal = new Date(date)
    return tanggal.toISOString().substring(0,10)
  }