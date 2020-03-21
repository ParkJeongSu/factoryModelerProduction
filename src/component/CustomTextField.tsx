import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';

interface AppProps {
  name : string;
  type? : string;
  label : string;
  value : string;
};

const CustomTextField = ( {name,label,value,type}  : AppProps ) => {
    React.useEffect(()=>{
        return ()=>{
            console.log('CustomTextField unMount 실행');
        };
    });
  return (
    <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name={name}
        label={label}
        value={value}
        type={type}
      >
      </TextField>
  );
}



export default CustomTextField;

