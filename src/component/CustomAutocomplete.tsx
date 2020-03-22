import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface dataList  {
  id: number;
  name : string;
}

interface CustomAutocompleteProps  {
  name : string
  value? : string;
  data : dataList[];
  onChange : (name : string,value:string) => void;
  onSelected : (id : number) => void;
};

const CustomAutocomplete = ( {name,value,data,onChange,onSelected}  : CustomAutocompleteProps ) => {
    React.useEffect(()=>{
        return ()=>{
            console.log('CustomAutocomplete unMount 실행');
        };
    });
  return (
    <Autocomplete
    options={data}
    onChange = {
      (e :any,value : any) : void=>{
        if(null === value){
          onSelected(null);
        }
        else{
          try {
            onSelected(value.id);  
          } catch (error) {
           console.log('error : ' ,error); 
          }
        }

      }}

    onInputChange = {
      (e : any,value : any,reason : any) :void => {
        if("clear"==reason){
          onSelected(null);
        }
        else{
          onChange(name,e.target.value);
        }
    }}
    freeSolo
    getOptionLabel={option => option.name}
    renderInput={params => {
      return (
        <TextField
          name={name} 
          {...params}
          label="DB Connect Info"
          fullWidth
          variant="outlined"
          value={value===null?'':value}
        />
      );
    }}
  />
  );
}

export default CustomAutocomplete;

