var log4js = require('log4js');
log4js.configure(__dirname + '\\..\\config\\logger_config.json', { reloadSecs: 30 });
var logger = log4js.getLogger("test");



module.exports = logger;
