const { dialog } = require('electron').remote;

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})


const { ipcRenderer } = require('electron');

/* Db Config */
window.getDbConfig = function () {
  return ipcRenderer.sendSync('getDbConfig');
}
window.saveDbConfig = function (action) {
  return ipcRenderer.sendSync('saveDbConfig',action);
}
window.deleteDbConfig = function (action) {
  return ipcRenderer.sendSync('deleteDbConfig',action);
}
/* Db Config */

/* To Do List */
window.getTodoList = function () {
  return ipcRenderer.sendSync('getTodoList');
}
window.createTodoList = function(action){
  return ipcRenderer.sendSync('createTodoList',action);
}
window.deleteTodoList = function (action) {
  return ipcRenderer.sendSync('deleteTodoList',action);
}
window.checkedTodoList = function (action) {
  return ipcRenderer.sendSync('checkedTodoList',action);
}
/* To Do List */

/* Db */
window.dbConnectTest = function (action) {
  return ipcRenderer.sendSync('dbConnectTest',action);
}

window.getFM_MENU = function (action) {
  return ipcRenderer.sendSync('getFM_MENU',action);
}

window.getFM_METADATASELECTLIST = function (FM_METADATA,FM_METADATALIST) {
  return ipcRenderer.sendSync('getFM_METADATASELECTLIST',FM_METADATA,FM_METADATALIST);
}

window.getFM_METADATA = function (action) {
  return ipcRenderer.sendSync('getFM_METADATA',action);
}
window.getData = function (action) {
  return ipcRenderer.sendSync('getData',action);
}


window.createData = function (action) {
  return ipcRenderer.sendSync('createData',action);
}
window.updateData = function (action) {
  return ipcRenderer.sendSync('updateData',action);
}
window.deleteData = function (action) {
  return ipcRenderer.sendSync('deleteData',action);
}


window.importExcel = function (action,option) {
  return ipcRenderer.sendSync('importExcel',action,option);;
}
window.settingFM_METADATA = function (tableName,FM_METADATALIST) {
  return ipcRenderer.sendSync('settingFM_METADATA',tableName,FM_METADATALIST);
}
window.settingFM_METADATAHISTORY = function (tableName,historyTableName,FM_METADATALIST) {
  return ipcRenderer.sendSync('settingFM_METADATAHISTORY',tableName,historyTableName,FM_METADATALIST);
}
/* Db */