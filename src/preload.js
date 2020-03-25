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


/* Db */