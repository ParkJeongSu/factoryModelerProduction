// Modules to control application life and create native browser window
const {app, BrowserWindow,dialog } = require('electron');
const path = require('path');
const jsonfile = require('jsonfile');
const { ipcMain } = require('electron');
const oracledb = require('oracledb');
const {produce} = require('immer');
const XLSX = require('xlsx');

const dbconfigPath = path.join(__dirname, "/../config/dbconfig.json");
const toDoListPath = path.join(__dirname, "/../config/todoList.json");

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  // you can see the menubar
  //mainWindow.setMenu(null);

  // and load the index.html of the app.
  //mainWindow.loadFile('./src/index.html')
  mainWindow.loadFile( path.join(__dirname, '/index.html'))
  
  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
  
  // Redux tool add
  BrowserWindow.addDevToolsExtension(
    path.join('C://Users/ParkJeongSu/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.5.0_0')
  )
  BrowserWindow.addDevToolsExtension(
    path.join('C://Users/ParkJeongSu/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0')
  )

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow,)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.



let dbconfig = {
  user : 'SCOTT',
  password : '1234',
  host: 'localhost:1521/orcl'
};
let userID =  null;

/* Db Config */
ipcMain.on("getDbConfig", (event, arg) => {
  let dbconfig = jsonfile.readFileSync(dbconfigPath);
  event.returnValue = dbconfig.dbconfigList;
});

ipcMain.on("saveDbConfig", (event, arg) => {

  let dbconfig = jsonfile.readFileSync(dbconfigPath);

  for (let i = 0; i < dbconfig.dbconfigList.length; i++) {
    dbconfig.dbconfigList[i].id=i;
  }

  let idLength=dbconfig.dbconfigList.length;

  let newconfig = Object.assign(arg, {id: idLength});

  dbconfig.dbconfigList.push(newconfig);
  // pretty json
  jsonfile.writeFileSync(dbconfigPath, dbconfig,{ spaces: 2, EOL: '\r\n' });
  //jsonfile.writeFileSync(dbconfigPath, dbconfig);
  dbconfig = jsonfile.readFileSync(dbconfigPath);
  event.returnValue = dbconfig.dbconfigList;
});

ipcMain.on("deleteDbConfig", (event, arg) => {
  let dbconfig = jsonfile.readFileSync(dbconfigPath);

  let newDbconfigList = [];

  for (let i = 0; i < dbconfig.dbconfigList.length; i++) {
    if(arg != dbconfig.dbconfigList[i].id){
      newDbconfigList.push(dbconfig.dbconfigList[i]);
    }
  }
  for (let i = 0; i < newDbconfigList.length; i++) {
    newDbconfigList[i].id=i;
  }
  dbconfig.dbconfigList = newDbconfigList;

  jsonfile.writeFileSync(dbconfigPath, dbconfig,{ spaces: 2, EOL: '\r\n' });
  
  event.returnValue = dbconfig.dbconfigList;
});

/* Db Config */

/* To Do List */

ipcMain.on("getTodoList", (event, arg) => {
  let todoList = jsonfile.readFileSync(toDoListPath);
  event.returnValue = todoList.todoList;
});

ipcMain.on("deleteTodoList", (event, arg) => {
  let todoList = jsonfile.readFileSync(toDoListPath);

  let newTodoList = [];

  for (let i = 0; i < todoList.todoList.length; i++) {
    if(arg.id !== todoList.todoList[i].id){
      newTodoList.push(todoList.todoList[i]);
    }
  }
  for (let i = 0; i < newTodoList.length; i++) {
    newTodoList[i].id=i;
  }
  todoList.todoList = newTodoList;

  jsonfile.writeFileSync(toDoListPath, todoList,{ spaces: 2, EOL: '\r\n' });
  
  event.returnValue = newTodoList;
});

ipcMain.on("checkedTodoList", (event, arg) => {
  let todoList = jsonfile.readFileSync(toDoListPath);

  let newTodoList = [];
  
  newTodoList = produce( todoList.todoList, draft =>{
    for(let i =0; i<draft.length;i++){
      if(arg.id===draft[i].id){
        draft[i].checked = !draft[i].checked;
      }
    }
  } )
  todoList.todoList = newTodoList;

  jsonfile.writeFileSync(toDoListPath, todoList,{ spaces: 2, EOL: '\r\n' });
  
  event.returnValue = newTodoList;
});

ipcMain.on("createTodoList", (event, arg) => {

  let todoList = jsonfile.readFileSync(toDoListPath);

  for (let i = 0; i < todoList.todoList.length; i++) {
    todoList.todoList[i].id=i;
  }

  let idLength=todoList.todoList.length;

  let newToDo = {
    id : idLength,
    task : arg.todo,
    checked : false
  }

  todoList.todoList.push(newToDo);

  jsonfile.writeFileSync(toDoListPath, todoList,{ spaces: 2, EOL: '\r\n' });

  event.returnValue = todoList.todoList;
});

/* To Do List */


/**
 * Db
 *  */


async function getData(connection,FM_METADATALIST){
  let result;
  let dataList = [];
  let columnList = [];
  for(let i=0;i<FM_METADATALIST.length;i++){
    columnList.push(FM_METADATALIST[i].COLUMNNAME);
  }
  result = await connection.execute(
    `SELECT ${columnList.join(',')} FROM ${FM_METADATALIST[0].TABLENAME}`
    , {}
    ,{outFormat: oracledb.OUT_FORMAT_OBJECT}
  );

  for(let i=0;i<result.rows.length;i++){
    let data = {};
    for(let j=0;j<FM_METADATALIST.length;j++){
      if(FM_METADATALIST[j].DATATYPE == "DATE"){
        data[FM_METADATALIST[j].COLUMNNAME]=result.rows[i][FM_METADATALIST[j].COLUMNNAME].toLocaleString();
      }
      else{
        data[FM_METADATALIST[j].COLUMNNAME]=result.rows[i][FM_METADATALIST[j].COLUMNNAME];
      }
      
    }
    dataList.push(data);
  }
  return dataList;
}

async function validationCheck(connection, FM_METADATALIST,crudFlag){
  let tableName;
  let result;
  let forResult;
  let bindObj = {};

  if('CREATE'===crudFlag){
    tableName ='FM_CREATE_CONSTRAINT';
  }
  else if('UPDATE'===crudFlag){
    tableName ='FM_UPDATE_CONSTRAINT';
  }else if('DELETE'===crudFlag){
    tableName ='FM_DELETE_CONSTRAINT';
  }
  // SELECT ValidationList
  let selectQuery = `SELECT TABLENAME,VALIDATIONQUERY,MESSAGE FROM ${tableName}`;
  try {
    result = await connection.execute(
      selectQuery
      , {}
      ,{outFormat: oracledb.OUT_FORMAT_OBJECT}
    );
    for(let i=0;i<result.rows.length;i++){
      bindObj = {};
      //includes Method : 해당 문자열에 포함되어있는지 true flase 로 반환
      for(let j=0;j<FM_METADATALIST.length;j++){
        if(result.rows[i]['VALIDATIONQUERY'].includes(':'+FM_METADATALIST[j].COLUMNNAME)){
          if(FM_METADATALIST[j].DATATYPE === 'VARCHAR2'){
            bindObj[FM_METADATALIST[j].COLUMNNAME] = FM_METADATALIST[j].VALUE;
          }
          else if(FM_METADATALIST[j].DATATYPE === 'NUMBER'){
            bindObj[FM_METADATALIST[j].COLUMNNAME] = Number(FM_METADATALIST[j].VALUE);
          }
        }
      }
      forResult =  await connection.execute(
        result.rows[i]['VALIDATIONQUERY']
        , bindObj
        ,{outFormat: oracledb.OUT_FORMAT_OBJECT}
      );
      if(forResult.rows.length!==0){
        throw result.rows[i]['MESSAGE'];
      }
    }

  } catch (error) {
    return error;
  }
  return '';
}

ipcMain.on("dbConnectTest", async (event,arg)=>{
  dbconfig.user =arg.dbid;
  dbconfig.password = arg.dbpw;
  dbconfig.host = arg.host;
  let connection;
  try{
    connection = await oracledb.getConnection(dbconfig);
  }
  catch(err){
    console.error(err);
  }
  finally{
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
  if(connection!==undefined){
    event.returnValue = true;
  }
  else{
    event.returnValue = false;
  }
});

ipcMain.on("getFM_MENU", async (event,arg)=>{
  let connection;
  let result;

  try{
    connection = await oracledb.getConnection(dbconfig);

    result = await connection.execute(
      `SELECT * FROM FM_MENU WHERE ADMINFLAG = :ADMINFLAG`
      ,{ ADMINFLAG : arg }
      ,{outFormat: oracledb.OUT_FORMAT_OBJECT}
    );
  }
  catch(err){
    console.error(err);
  }
  finally{
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }

  event.returnValue = result.rows;

});


ipcMain.on("getFM_METADATASELECTLIST", async (event,FM_METADATA,FM_METADATALIST)=>{

  let connection;
  let result;
  let bindObj ={};
  let selectList = [];
  if(FM_METADATA.SELECTQUERY ===null){
    dialog.showErrorBox('FM_METADATA.SELECTQUERY is Null','FM_METADATA.SELECTQUERY is Null');
  }
  else{
    try {
      connection = await oracledb.getConnection(dbconfig);
    } catch (error) {
      // connect Fail Message
      dialog.showErrorBox('CONNECT FAIL', error);
    }
    if(connection){
  

  
      try{
        try {
          for(let i=0;i<FM_METADATALIST.length;i++){
            //includes Method : 해당 문자열에 포함되어있는지 true flase 로 반환
            if(FM_METADATA['SELECTQUERY'].includes(':'+FM_METADATALIST[i].COLUMNNAME)){
              if(FM_METADATALIST[i].DATATYPE === 'VARCHAR2'){
                bindObj[FM_METADATALIST[i].COLUMNNAME] = FM_METADATALIST[i].VALUE;
              }
              else if(FM_METADATALIST[i].DATATYPE === 'NUMBER'){
                bindObj[FM_METADATALIST[i].COLUMNNAME] = Number(FM_METADATALIST[i].VALUE);
              }
            }
          }
        } catch (error) {
          throw error
        }
        
  
        result = await connection.execute(
          FM_METADATA['SELECTQUERY']
          ,bindObj
        );
        for(let i=0;i<result.rows.length;i++){
          selectList.push({label : result.metaData[0].name , value : result.rows[i][0]});
        }
  
        for(let i=0;i<FM_METADATALIST.length;i++){
          if(FM_METADATALIST[i].COLUMNNAME === FM_METADATA.COLUMNNAME){
            FM_METADATALIST[i].SELECTLIST = selectList;
            break;
          }
        }
  
      }
      catch(err){
        console.error(err);
        dialog.showErrorBox('SELECTQUERY FAIL', err);
      }
      finally{
        if (connection) {
          try {
            await connection.close();
          } catch (err) {
            console.error(err);
          }
        }
      }
  
    }
  }
  

  event.returnValue = FM_METADATALIST;
});

ipcMain.on("getFM_METADATA", async (event,arg)=>{

  let connection;
  let result;
  try{
    connection = await oracledb.getConnection(dbconfig);

    result = await connection.execute(
      `SELECT * FROM FM_METADATA A WHERE A.TABLENAME =:TABLENAME  ORDER BY A.COLUMNORDER`
      ,{ TABLENAME : arg.FM_METADATA }
      ,{outFormat: oracledb.OUT_FORMAT_OBJECT}
    );
  }
  catch(err){
    console.error(err);
  }
  finally{
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }

  event.returnValue = result.rows;

});

ipcMain.on("getData", async (event,FM_METADATALIST)=>{

  let connection;
  let dataList=[];

  try {
    connection = await oracledb.getConnection(dbconfig);
    dataList = await getData(connection,FM_METADATALIST);
  } catch (error) {
    console.log(error);
    dataList=[];
  }
  finally{
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
  event.returnValue = dataList;
});


ipcMain.on("createData", async (event,FM_METADATALIST)=>{

  let connection;
  let result;
  let columnList = [];
  let dataList = [];
  let bindList =[];
  try {
    connection = await oracledb.getConnection(dbconfig);
  } catch (error) {
    // connect Fail Message
    dialog.showErrorBox('CONNECT FAIL', error);
  }
  if(connection){


    // validation
    let validationErrorMessage = await validationCheck(connection,FM_METADATALIST,'CREATE');
    // validation Sucess
    if(validationErrorMessage===''){
      for(let i=0;i<FM_METADATALIST.length;i++){
        columnList.push(FM_METADATALIST[i].COLUMNNAME);
        bindList.push(FM_METADATALIST[i].VALUE);
      }
      let insertSql = `INSERT INTO ${FM_METADATALIST[0].TABLENAME} ( ${columnList.join(',')} ) VALUES ( ${bindList.join(',')} )`;
      try{
        result = await connection.execute(
          insertSql
          , {}
          ,{autoCommit: true}
        );
      }
      catch(err){
        console.error(err);
        dialog.showErrorBox('INSERT FAIL', err);
      }

    }
    // validation Fail
    else if(validationErrorMessage!==''){
      // Create Error Message
      dialog.showErrorBox('INSERT FAIL', validationErrorMessage);
    }

    try {
      dataList = await getData(connection,FM_METADATALIST);
    } catch (error) {
      console.log(error);
    }
    finally{
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }

    event.returnValue = dataList;
  }
  else{
    event.returnValue = dataList;
  }
});

ipcMain.on("updateData", async (event,FM_METADATALIST)=>{

  let connection;
  let result;
  let updateColumnList = [];
  let conditionColumnList = [];
  let dataList = [];

  try {
    connection = await oracledb.getConnection(dbconfig);
  } catch (error) {
    // connect Fail Message
    dialog.showErrorBox('CONNECT FAIL', error);
  }
  if(connection){
    // validation
    let validationErrorMessage = await validationCheck(connection,FM_METADATALIST,'UPDATE');
    // validation Sucess
    if(validationErrorMessage===''){
      for(let i=0;i<FM_METADATALIST.length;i++){
        if("Y"=== FM_METADATALIST[i].ISKEY){
          conditionColumnList.push(FM_METADATALIST[i].COLUMNNAME + ' = ' + FM_METADATALIST[i].VALUE);
        }
        else{
          updateColumnList.push(FM_METADATALIST[i].COLUMNNAME + ' = ' + FM_METADATALIST[i].VALUE);
        }
      }
      let updateSql = `UPDATE ${FM_METADATALIST[0].TABLENAME} SET ${updateColumnList.join(',')} WHERE ${conditionColumnList.join(' AND ')} `;
      try{
        result = await connection.execute(
          updateSql
          , {}
          ,{autoCommit: true}
        );
    
      }
      catch(err){
        console.error(err);
      }

    }
    // validation Fail
    else if(validationErrorMessage!==''){
      // Update Error Message
      dialog.showErrorBox('UPDATE FAIL', validationErrorMessage);
    }
    
    try {
      dataList = await getData(connection,FM_METADATALIST);
    } catch (error) {
      console.log(error);
    }
    finally{
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }

    event.returnValue = dataList;
  }
  else {
    event.returnValue = dataList;
  }
});

ipcMain.on("deleteData", async (event,FM_METADATALIST)=>{

  let connection;
  let result;
  let conditionColumnList = [];
  let dataList = [];

  try {
    connection = await oracledb.getConnection(dbconfig);
  } catch (error) {
    // connect Fail Message
    dialog.showErrorBox('CONNECT FAIL', error);
  }
  if(connection)
  {
    let validationErrorMessage = await validationCheck(connection,FM_METADATALIST,'DELETE');
    if(validationErrorMessage==='')
    {    
      for(let i=0;i<FM_METADATALIST.length;i++){
        // 삭제시 키로 삭제 해야하는가? 아니면 그 데이터 조건을 삭제해야하는가?
        // if("Y"=== FM_METADATALIST[i].ISKEY){
        //   conditionColumnList.push(FM_METADATALIST[i].COLUMNNAME + ' = ' + FM_METADATALIST[i].VALUE);
        // }
        conditionColumnList.push(FM_METADATALIST[i].COLUMNNAME + ' = ' + FM_METADATALIST[i].VALUE);
      }
      let deleteSql = `DELETE FROM  ${FM_METADATALIST[0].TABLENAME} WHERE ${conditionColumnList.join(' AND ')} `;
      result = await connection.execute(
        deleteSql
        , {}
        ,{autoCommit: true}
      );
    }
    else{
        // Delete Error Message
        dialog.showErrorBox('DELETE FAIL', validationErrorMessage);
    }
    try {
      dataList = await getData(connection,FM_METADATALIST);
    } catch (error) {
      console.log(error);
    }
    finally{
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
    event.returnValue = dataList;
  }
  else
  {
    event.returnValue = dataList;
  }
});

ipcMain.on("importExcel", async (event,FM_METADATALIST,option)=>{
  let connection=null;
  let result;
  let fileResult;
  let dataList=[];
  let columnOrder = [];
  let tableName = FM_METADATALIST[0].TABLENAME;
  let rowObj;
  let insertSql='';
  let insertSqlData = '';
  let validationErrorMessage='';


  try {
    fileResult = dialog.showOpenDialogSync( {
      properties: ['openFile'],
      filters: [
        { name: 'Excel', extensions: ['csv', 'xlsx'] }
      ]
    });

    connection = await oracledb.getConnection(dbconfig);

    if(connection===null){
      throw 'DB Connect Error'
    }

    let wb = XLSX.readFile(fileResult[0]);
    rowObj = XLSX.utils.sheet_to_json( wb.Sheets[ wb.SheetNames[0] ]  );
    let range = XLSX.utils.decode_range(wb.Sheets[ wb.SheetNames[0] ]['!ref']);
    let columnHeaderList = [];

    for (let i = 0; i < range.e.c+1 ; ++i) {
      columnHeaderList[i] = wb.Sheets[wb.SheetNames[0]][`${XLSX.utils.encode_col(i)}1`].v;
    }
    if(columnHeaderList.length !== FM_METADATALIST.length){
      throw `Import Data Header Count != ${tableName} Header Count`;
    }
    for(let i=0;i<columnHeaderList.length;i++){
      if(columnHeaderList[i] !== FM_METADATALIST[i].COLUMNNAME){
        throw `Import Data columnName [${columnHeaderList[i]}] != Table ColumnName ${FM_METADATALIST[i].COLUMNNAME}`;
      }
    }

    for(let C = range.s.c ; C<=range.e.c;++C){
      for(let R =range.s.r+1 ; R<=range.e.r;++R){
        let cell_address = { c: C, r: R };
        let cell_address_excel = XLSX.utils.encode_cell(cell_address);
        let data = wb.Sheets[wb.SheetNames[0]][cell_address_excel];
        if(FM_METADATALIST[C].DATATYPE === 'VARCHAR2' && data.t !== 's' ){
          throw `import Data Type is varchar2 but DataType ${FM_METADATALIST[C].DATATYPE} of ${FM_METADATALIST[C].COLUMNNAME} `;
        }
        if(FM_METADATALIST[C].DATATYPE === 'NUMBER' && data.t !== 'n'){
          throw `import Data Type is varchar2 but DataType ${FM_METADATALIST[C].DATATYPE} of ${FM_METADATALIST[C].COLUMNNAME} `;
        }
      }
    }

    for(let j=0;j<FM_METADATALIST.length;j++){
      columnOrder.push(FM_METADATALIST[j].COLUMNNAME);
    }

    for(let i=0;i<rowObj.length;i++){
      let tempData =[];
      for(let j=0;j<FM_METADATALIST.length;j++){
        tempData.push(rowObj[i][  FM_METADATALIST[j].COLUMNNAME   ]);
        FM_METADATALIST[j].VALUE = rowObj[i][  FM_METADATALIST[j].COLUMNNAME   ];
      }
      validationErrorMessage = await validationCheck(connection,FM_METADATALIST,'CREATE');
      if(validationErrorMessage !== ''){
        throw validationErrorMessage;
      }
      insertSqlData += ` INTO ${tableName} ( ${columnOrder.join(',')} ) VALUES ( ${tempData.join(',')} ) `;
    }

    insertSql = `INSERT ALL `;
    insertSql += insertSqlData;
    insertSql+= ` SELECT * FROM DUAL `;
    

    result = await connection.execute(
      insertSql
      , {}
      ,{autoCommit: true}
    );


  } catch (error) {
    dialog.showErrorBox('File Upload Fail', error);
  }

  try {
    connection = await oracledb.getConnection(dbconfig);
    dataList = await getData(connection,FM_METADATALIST);
  } catch (error) {
    console.log(error);
    dataList=[];
  }
  finally{
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }

  event.returnValue = dataList;
});
