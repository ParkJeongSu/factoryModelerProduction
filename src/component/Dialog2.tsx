import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';

interface Dialog1Props {
  settingOpen : boolean;
  handleClose : () => void;
  handleSetting : (tableName : string,historyTableName:string) =>void;
};

const Dialog2 = ( {settingOpen,handleClose,handleSetting}  : Dialog1Props ) => {
  const [historyTableName, sethistoryTableName] = React.useState('');
  const [tableName, setTableName] = React.useState('');

  return (
    <Dialog open={settingOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Setting FM_METADATA</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Input HistoryTableName & TableName if you want to use Table in FactoryModeler`}
          </DialogContentText>
          <Box display="flex">
            <Box width="50%">
              <TextField
                  autoFocus
                  margin="dense"
                  label="Input HistoryTableName"
                  fullWidth
                  onChange = {(e)=>{ 
                    sethistoryTableName(e.target.value);
                  }}
                />
            </Box>
            <Box width="50%">
              <TextField
                  margin="dense"
                  label="Input TableName"
                  fullWidth
                  onChange = {(e)=>{
                    setTableName(e.target.value);
                  }}
                />
            </Box>
          </Box>
          
        </DialogContent>
        <DialogActions>
          <Button
            onClick={
            (e)=>{
              handleClose();
              sethistoryTableName('');
              setTableName('');
            }} 
            color="primary">
            Cancel
          </Button>
          <Button 
            onClick={
              (e)=>{
                handleSetting(tableName,historyTableName);
                // 2개의 값을 보낸다.
                handleClose();
                sethistoryTableName('');
                setTableName('');
              }
            } 
            color="primary">
            Setting
          </Button>
        </DialogActions>
      </Dialog>
  );
}



export default Dialog2;

