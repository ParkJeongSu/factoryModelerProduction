import * as React from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface NomalTableProps  {
	columnList? : [];
  dataList? : [];
  clickRowData : (rowData : any) => void;
  importExcel : () => void ;
  };
  
const NomalTable = ({columnList, dataList,clickRowData,importExcel} : NomalTableProps)=>{
  const [selectedRow,setselectedRow] = React.useState(null);
  let cList = JSON.parse(JSON.stringify(columnList));
  let dList = JSON.parse(JSON.stringify(dataList)); 
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <MaterialTable
      title="Data List"
      columns={cList}
      data={dList}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
              // const newDataList = this.state.data.concat(newData);
              // this.setState({...this.state,data : newDataList}, ()=>resolve('한건이 정상적으로 들어갔습니다.'));
              resolve();
          }).then((resolve)=>{ alert(resolve) }).catch((reject)=>{alert(reject)}),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            // let newDataList = JSON.parse(JSON.stringify(this.state.data));
            // const index = this.state.data.indexOf(oldData);
            // newDataList[index] = newData;
            // this.setState({...this.state,data : newDataList},()=>resolve('한건이 정상적으로 수정됨'));
            resolve();
          }).then((resolve)=>{ alert(resolve); }).catch((reject)=>{alert(reject);}),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
              // const index = this.state.data.indexOf(oldData);
              // let newDataList = JSON.parse(JSON.stringify(this.state.data));
              // newDataList.splice(index,1);
              // this.setState({...this.state,data : newDataList},()=>resolve('한건이 정상적으로 삭제됨'));
              resolve();
          }).then((resolve)=>{alert(resolve);}).catch((reject)=>{ alert(reject); }),
      }}
      options={{
        actionsColumnIndex: -1,
        exportButton: true,
        filtering: true,
        rowStyle : rowData =>({
          backgroundColor: (selectedRow && selectedRow.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
        }),
        pageSize : 25,
        pageSizeOptions : [10,20,50,100,200]
      }}
      actions={[
        {
          icon: 'vertical_align_top',
          tooltip: 'Import',
          isFreeAction: true,
          onClick: (event) => {
            importExcel();
          }
        }
      ]}
      onRowClick = {
        (event,selectRow)=>{
          setselectedRow(selectRow);
          clickRowData(selectRow);
          console.log(selectRow);
        }
      }
    />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
export default NomalTable;
