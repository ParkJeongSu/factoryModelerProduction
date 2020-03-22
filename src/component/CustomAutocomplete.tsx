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
};

const CustomAutocomplete = ( {name,value,data,onChange}  : CustomAutocompleteProps ) => {
    React.useEffect(()=>{
        return ()=>{
            console.log('CustomAutocomplete unMount 실행');
        };
    });
  return (
    <Autocomplete
    options={data}
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
          onChange={(e)=>{onChange(e.target.name,e.target.value);}}
        />
      );
    }}
  />
  );
}

export default CustomAutocomplete;

