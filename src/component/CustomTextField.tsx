import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';

interface AppProps {
  name : string;
  type? : string;
  label : string;
  value? : string;
  onChange : (name : string,value:string) => void;
};

const CustomTextField = ( {name,label,value,type,onChange}  : AppProps ) => {
    React.useEffect(()=>{
        return ()=>{
            console.log('CustomTextField unMount 실행');
        };
    });
    const handleOnChane = (name : string,value :string)=>{
      onChange(name,value);
    }
  return (
    <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name={name}
        label={label}
        value={value===null ? '': value}
        type={type}
        onChange={(e)=>{handleOnChane(e.target.name,e.target.value);}}
      >
      </TextField>
  );
}



export default CustomTextField;

