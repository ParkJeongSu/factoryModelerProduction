import * as React from 'react';
import MaterialTable from 'material-table';

interface NomalTableProps  {
	columnList? : [];
  dataList? : [];
  clickRowData : (rowData : any) => void;
  };
  
const NomalTable = ({columnList, dataList,clickRowData} : NomalTableProps)=>{
  const [selectedRow,setselectedRow] = React.useState(null);
  let cList = JSON.parse(JSON.stringify(columnList));
  let dList = JSON.parse(JSON.stringify(dataList)); 

  return (
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
        })
      }}
      actions={[
        {
          icon: 'vertical_align_top',
          tooltip: 'Import',
          isFreeAction: true,
          onClick: (event) => alert("You want to add a new row")
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
  )
}
export default NomalTable;
