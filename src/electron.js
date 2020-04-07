// Modules to control application life and create native browser window
const {app, BrowserWindow,dialog } = require('electron');
const path = require('path');
const jsonfile = require('jsonfile');
const { ipcMain } = require('electron');
const oracledb = require('oracledb');
const {produce} = require('immer');
const XLSX = require('xlsx');
const logger = require("./logger");

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
    path.join('C://Users/ParkJeongSu/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.6.0_0')
  )
  BrowserWindow.addDevToolsExtension(
    path.join('C://Users/ParkJeongSu/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0')
  );


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
let userID =  'JSPARK91';

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
  logger.info("1111");
  logger.trace("Entering cheese testing");
  logger.debug("Got cheese.");
  logger.info("Cheese is Gouda.");
  logger.log("Something funny about cheese.");
  logger.warn("Cheese is quite smelly.");
  // these end up only in cheese.log
  logger.error("Cheese %s is too ripe!", "gouda");
  logger.fatal("Cheese was breeding ground for listeria.");
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
  let selectQuery = `SELECT TABLENAME,VALIDATIONQUERY,MESSAGE FROM ${tableName} WHERE TABLENAME = :TABLENAME`;
  try {
    result = await connection.execute(
      selectQuery
      , {TABLENAME : FM_METADATALIST[0].TABLENAME}
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
    logger.error(error.message);
    return error.message;
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
        if(null === FM_METADATALIST[i].VALUE){
          bindList.push('null');
        }
        else if('VARCHAR2'===FM_METADATALIST[i].DATATYPE){
          bindList.push(`'${FM_METADATALIST[i].VALUE}'`);
        }
        else{
          bindList.push(FM_METADATALIST[i].VALUE);
        }
        
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
    addHistory(FM_METADATALIST,'CREATE');
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

  let values = {};

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
          conditionColumnList.push(` ${FM_METADATALIST[i].COLUMNNAME} = :${FM_METADATALIST[i].COLUMNNAME}`);
        }
        else{
          updateColumnList.push(` ${FM_METADATALIST[i].COLUMNNAME} = :${FM_METADATALIST[i].COLUMNNAME}`);
        }
        values[FM_METADATALIST[i].COLUMNNAME] = FM_METADATALIST[i].VALUE;
      }
      let updateSql = `UPDATE ${FM_METADATALIST[0].TABLENAME} SET ${updateColumnList.join(',')} WHERE ${conditionColumnList.join(' AND ')} `;
      try{
        result = await connection.execute(
          updateSql
          , values
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
    addHistory(FM_METADATALIST,'UPDATE');
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
  let values = {};

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
        conditionColumnList.push(` ${FM_METADATALIST[i].COLUMNNAME} = :${FM_METADATALIST[i].COLUMNNAME}`);
        values[FM_METADATALIST[i].COLUMNNAME] = FM_METADATALIST[i].VALUE;
      }
      let deleteSql = `DELETE FROM  ${FM_METADATALIST[0].TABLENAME} WHERE ${conditionColumnList.join(' AND ')} `;
      result = await connection.execute(
        deleteSql
        , values
        ,{autoCommit: true}
      );
    }
    else{
        // Delete Error Message
        dialog.showErrorBox('DELETE FAIL', validationErrorMessage);
    }
    addHistory(FM_METADATALIST,'DELETE');
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

ipcMain.on("settingFM_METADATA", async (event,tableName,FM_METADATALIST)=>{

  let connection;
  let result;
  let dataList = [];
  let columnOrder = ['TABLENAME','COLUMNNAME','COLUMNORDER','ISKEY','DATATYPE'];
  let insertSqlData = '';
  let insertSql='';
  try {
    connection = await oracledb.getConnection(dbconfig);
  } catch (error) {
    // connect Fail Message
    dialog.showErrorBox('CONNECT FAIL', error);
  }
  if(connection)
  {

    try {

      // 1. FM_MEATADATA 에서 tableName rows remove
      let deleteSql = `DELETE FROM FM_METADATA WHERE TABLENAME = :TABLENAME`;
      result = await connection.execute(
        deleteSql
        , {TABLENAME : tableName}
        ,{autoCommit: true}
      );

      // 2. tableName에 해당하는 columnList 가져와서 FM_MEATADATA Insert
      let selectSql =
      `WITH PRI AS(
        SELECT A.TABLE_NAME
            , A.CONSTRAINT_NAME
            , B.COLUMN_NAME     
            , B.POSITION
          FROM ALL_CONSTRAINTS  A
            , ALL_CONS_COLUMNS B
        WHERE A.TABLE_NAME      = :TABLENAME
          AND A.CONSTRAINT_TYPE = 'P' 
        
          AND A.OWNER           = B.OWNER
          AND A.CONSTRAINT_NAME = B.CONSTRAINT_NAME
        )
        SELECT
        A.TABLE_NAME TABLENAME,
        A.COLUMN_NAME COLUMNNAME,
        A.DATA_TYPE DATATYPE,
        A.COLUMN_ID COLUMNORDER,
        B.POSITION,
        DECODE(B.POSITION,NULL,'N','Y') AS ISKEY
        FROM COLS A LEFT OUTER JOIN PRI B ON A.COLUMN_NAME = B.COLUMN_NAME AND A.TABLE_NAME = B.TABLE_NAME
        WHERE A.TABLE_NAME =:TABLENAME
        ORDER BY COLUMN_ID
        `;
      result = await connection.execute(
        selectSql
        , {TABLENAME : tableName}
        ,{outFormat: oracledb.OUT_FORMAT_OBJECT}
      );
      if(result.rows.length===0){
        dialog.showErrorBox('Not Found Exception', 'Not Exist TableName');
      }
      for(let i=0;i<result.rows.length;i++){
        let tempData =[];
        for(let j=0;j<columnOrder.length;j++){
          if('COLUMNORDER'=== columnOrder[j]){
            tempData.push(result.rows[i][columnOrder[j]] );
          }
          else{
            tempData.push(`'${result.rows[i][columnOrder[j]]}'`);
          }
          
        }
        insertSqlData += ` INTO FM_METADATA ( ${columnOrder.join(',')} ) VALUES ( ${tempData.join(',')} ) `;
      }
      if(result.rows.length > 0){
        insertSql = `INSERT ALL `;
        insertSql += insertSqlData;
        insertSql+= ` SELECT * FROM DUAL `;
  
        result = await connection.execute(
          insertSql
          , {}
          ,{autoCommit: true}
        );
      }


    // 3. FM_METADATA LIST 조회
      if(FM_METADATALIST.length > 0){
        dataList = await getData(connection,FM_METADATALIST);
      }
      
    } catch (error) {
      console.log(error);
      dialog.showErrorBox('Setting FM_METADATA Fail', error);
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

ipcMain.on("settingFM_METADATAHISTORY", async (event,tableName,historyTableName,FM_METADATALIST)=>{

  let connection;
  let result;
  let dataList = [];
  let columnOrder = ['HISTORYTABLENAME','HISTORYCOLUMNNAME','TABLENAME'];
  let insertSqlData = '';
  let insertSql='';
  try {
    connection = await oracledb.getConnection(dbconfig);
  } catch (error) {
    // connect Fail Message
    dialog.showErrorBox('CONNECT FAIL', error);
  }
  if(connection)
  {

    try {

      // 1. FM_MEATADATA 에서 tableName rows remove
      let deleteSql = `DELETE FROM FM_MEATADATAHISTORY WHERE HISTORYTABLENAME = :TABLENAME`;
      result = await connection.execute(
        deleteSql
        , {TABLENAME : historyTableName}
        ,{autoCommit: true}
      );

      // 2. historyTableName 해당하는 columnList 가져와서 FM_MEATADATAHISTORY Insert
      let selectSql =
      `SELECT
      A.TABLE_NAME TABLENAME,
      A.COLUMN_NAME COLUMNNAME,
      A.DATA_TYPE DATATYPE,
      A.COLUMN_ID COLUMNORDER
      FROM COLS A
      WHERE A.TABLE_NAME =:TABLENAME
      ORDER BY COLUMN_ID`;
      result = await connection.execute(
        selectSql
        , {TABLENAME : historyTableName}
        ,{outFormat: oracledb.OUT_FORMAT_OBJECT}
      );
      if(result.rows.length===0){
        dialog.showErrorBox('Not Found Exception', 'Not Exist historyTableName');
      }

      for(let i=0;i<result.rows.length;i++){
        let tempData =[];
        tempData.push(`'${historyTableName}'` );
        tempData.push(`'${result.rows[i].COLUMNNAME}'` );
        tempData.push(`'${tableName}'` );
        insertSqlData += ` INTO FM_MEATADATAHISTORY ( ${columnOrder.join(',')} ) VALUES ( ${tempData.join(',')} ) `;
      }
      if(result.rows.length > 0){
        insertSql = `INSERT ALL `;
        insertSql += insertSqlData;
        insertSql+= ` SELECT * FROM DUAL `;
  
        result = await connection.execute(
          insertSql
          , {}
          ,{autoCommit: true}
        );
      }


    // 3. FM_METADATA LIST 조회
      if(FM_METADATALIST.length > 0){
        dataList = await getData(connection,FM_METADATALIST);
      }
      
    } catch (error) {
      console.log(error);
      dialog.showErrorBox('Setting FM_METADATAHISTORY Fail', error);
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


async function addHistory( FM_METADATALIST, crudFlag){
  let connection;
  let result;
  let selectSql='';
  let insertSql='';
  let columns = [];
  let bindvar = [];
  let values = {};
  let now = new Date();
  try {
    connection = await oracledb.getConnection(dbconfig);
  } catch (error) {
    // connect Fail Message
    dialog.showErrorBox('CONNECT FAIL', error);
  }
  if(connection)
  {
    try {
      // 1. Select FM_METAHISTORY
    selectSql = `SELECT * FROM FM_MEATADATAHISTORY A WHERE A.TABLENAME=:TABLENAME `;
    result = await connection.execute(
      selectSql
      , {TABLENAME : FM_METADATALIST[0].TABLENAME}
      ,{outFormat: oracledb.OUT_FORMAT_OBJECT}
    );
    
    if(result.rows.length>0){
      // 2. make insertSQL 
      for(let i=0;i<result.rows.length;i++){
        columns.push(result.rows[i]['HISTORYCOLUMNNAME']);
        bindvar.push(`:${result.rows[i]['HISTORYCOLUMNNAME']}`);
        if('USERNAME'=== result.rows[i]['OPTIONS']){
          values[result.rows[i]['HISTORYCOLUMNNAME']] = userID;
        }
        else if('TIMEKEY' === result.rows[i]['OPTIONS']){
          let year = now.getFullYear().toString();
          let month = now.getMonth()+1;
          let date = now.getDate();
          let hours = now.getHours();
          let minutes = now.getMinutes();
          let seconds = now.getSeconds();
          if(month.toString().length === 1){
            month = '0'+month;
          }
          if(date.toString().length === 1){
            date = '0'+date;
          }
          if(hours.toString().length===1){
            hours='0'+hours;
          }
          if(minutes.toString().length===1){
            minutes ='0'+minutes;
          }
          if(seconds.toString().length===1){
            seconds = '0'+seconds;
          }
          let timekey = year+month+date+hours+minutes+seconds;
          values[result.rows[i]['HISTORYCOLUMNNAME']] = timekey;
        }
        else if('TIME' === result.rows[i]['OPTIONS']){
          values[result.rows[i]['HISTORYCOLUMNNAME']] = now;
        }
        else if('EVENTNAME' === result.rows[i]['OPTIONS']){
          if('CREATE'=== crudFlag){
            values[result.rows[i]['HISTORYCOLUMNNAME']] = 'CREATE';
          }
          else if('UPDATE'===crudFlag){
            values[result.rows[i]['HISTORYCOLUMNNAME']] = 'UPDATE';
          }
          else if('DELETE'===crudFlag){
            values[result.rows[i]['HISTORYCOLUMNNAME']] = 'DELETE';
          }
        }
        else{
          for(let j=0;j<FM_METADATALIST.length;j++){
            if(result.rows[i]['TABLECOLUMNNAME'] === FM_METADATALIST[j].COLUMNNAME){
              if('NUMBER'===FM_METADATALIST[j].DATATYPE){
                values[result.rows[i]['HISTORYCOLUMNNAME']] = Number(FM_METADATALIST[j].VALUE);
              }
              else{
                values[result.rows[i]['HISTORYCOLUMNNAME']] = FM_METADATALIST[j].VALUE;
              }
              break;
            }
          }
        }
      }

      insertSql = `INSERT INTO ${result.rows[0]['HISTORYTABLENAME']} (${columns.join(',')}) VALUES (${bindvar.join(',')})`;
      // 3. insert History
      
      result = await connection.execute(
        insertSql
        , values
        ,{autoCommit: true}
      );
    }
    }
    catch (error) {
      console.log(error);
      logger.error(error);
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