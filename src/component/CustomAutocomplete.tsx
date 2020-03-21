import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface dataList  {
  id: number;
  name : string;
}

interface CustomAutocompleteProps  {
  data : dataList[];
};

const CustomAutocomplete = ( {data}  : CustomAutocompleteProps ) => {
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
          {...params}
          label="DB Connect Info"
          fullWidth
          variant="outlined"
        />
      );
    }}
  />
  );
}

export default CustomAutocomplete;

