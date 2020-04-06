import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Dialog1Props {
  settingOpen : boolean;
  handleClose : () => void;
  handleSettingFM_MEATADATA : (tableName : string) =>void;
};

const Dialog1 = ( {settingOpen,handleClose,handleSettingFM_MEATADATA}  : Dialog1Props ) => {
  const [value, setValue] = React.useState('');

  return (
    <Dialog open={settingOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Setting FM_METADATA</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Input TableName if you want to use Table in FactoryModeler
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Input FM_METADATA"
            fullWidth
            onChange = {(e)=>{ setValue(e.target.value); }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={
            (e)=>{
              handleClose();
              setValue('');
            }} 
            color="primary">
            Cancel
          </Button>
          <Button 
            onClick={
              (e)=>{
                handleSettingFM_MEATADATA(value);
                handleClose();
                setValue('');
              }
            } 
            color="primary">
            Setting
          </Button>
        </DialogActions>
      </Dialog>
  );
}



export default Dialog1;

