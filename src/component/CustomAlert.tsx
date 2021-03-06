﻿import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Alert from '@material-ui/lab/Alert';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

interface CustomAlertProps  {
  result? : boolean;
};


const returnAlert = (result : boolean) :  React.ReactElement =>
{
  if( null === result ){
    return;
  }
  else if(true=== result){
    return <Alert severity="success">DB Connection success</Alert>;
  }
  else{
    return <Alert severity="error">DB Connection fail</Alert>;
  }
}

const CustomAlert = ( {result}  : CustomAlertProps ) => {
  const classes = useStyles();
    React.useEffect(()=>{
        return ()=>{
            console.log('CustomAlert unMount 실행');
        };
    });
  return (
    <div className={classes.root}>
      {/* {result ==="success" ? <Alert severity="success">DB Connection success</Alert> :<Alert severity="error">DB Connection fail</Alert>} */}
      {returnAlert(result)}
    </div>
  );
}



export default CustomAlert;

