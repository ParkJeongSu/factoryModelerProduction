// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const path = require('path');
const jsonfile = require('jsonfile');
const { ipcMain } = require('electron');
const oracledb = require('oracledb');
const {produce} = require('immer');

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
app.on('ready', createWindow)

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



ipcMain.on("getData", async (event,arg)=>{

  let tableName = arg[0].TABLENAME;
  let connection;
  let result;
  let columnList = [];
  for(let i=0;i<arg.length;i++){
    columnList.push(arg[i].COLUMNNAME);
  }
  let columnOrder = columnList.join(',');
  let dataList=[];

  try{
    connection = await oracledb.getConnection(dbconfig);

    result = await connection.execute(
      `SELECT ${columnOrder} FROM ${tableName}`
      , {}
      ,{outFormat: oracledb.OUT_FORMAT_OBJECT}
    );

    for(let i=0;i<result.rows.length;i++){
      let data = {};
      for(let j=0;j<arg.length;j++){
        if(arg[j].DATATYPE == "DATE"){
          data[arg[j].COLUMNNAME]=result.rows[i][arg[j].COLUMNNAME].toLocaleString();
        }
        else{
          data[arg[j].COLUMNNAME]=result.rows[i][arg[j].COLUMNNAME];
        }
        
      }
      dataList.push(data);
    }
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

  event.returnValue = dataList;

});





ipcMain.on("createData", async (event,arg)=>{

  let connection;
  let result;
  let columnList = [];
  let dataList = [];
  for(let i=0;i<arg.length;i++){
    columnList.push(arg[i].COLUMNNAME);
    dataList.push(arg[i].VALUE);
  }
  let insertSql = `INSERT INTO ${arg[0].TABLENAME} ( ${columnList.join(',')} ) VALUES ( ${dataList.join(',')} )`;

  try{
    connection = await oracledb.getConnection(dbconfig);

    result = await connection.execute(
      insertSql
      , {}
      ,{autoCommit: true}
    );
    console.log(result);

    result = await connection.execute(
      `SELECT ${columnList.join(',')} FROM ${arg[0].TABLENAME}`
      , {}
      ,{outFormat: oracledb.OUT_FORMAT_OBJECT}
    );

    dataList = [];

    for(let i=0;i<result.rows.length;i++){
      let data = {};
      for(let j=0;j<arg.length;j++){
        if(arg[j].DATATYPE == "DATE"){
          data[arg[j].COLUMNNAME]=result.rows[i][arg[j].COLUMNNAME].toLocaleString();
        }
        else{
          data[arg[j].COLUMNNAME]=result.rows[i][arg[j].COLUMNNAME];
        }
        
      }
      dataList.push(data);
    }

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

  event.returnValue = dataList;

});

