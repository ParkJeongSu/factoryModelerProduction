import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from "@material-ui/core/Button";
interface CustomButtonProps  {
  buttonName : string;
  className : string;
  handleClick: () => void;
};

const CustomButton = ( {buttonName,className,handleClick}  : CustomButtonProps ) => {
    React.useEffect(()=>{
        return ()=>{
            console.log('CustomButton unMount 실행');
        };
    });
  return (
    <Button
    type="submit"
    fullWidth
    variant="contained"
    color="primary"
    className={className}
    onClick={e => {
      e.preventDefault();
      handleClick();
    }}
  >
    {buttonName}
  </Button>
  );
}


export default CustomButton;

