// terminal-bridge JS
// using EDGE module (https://github.com/tjanczuk/edge)
// and a separate developed DLL (WM500V5Lib.dll)
// which in turn uses a manufacturer DLL (WmWebUsb.dll)
// allows to access via USB terminal WM500V5 information

var edge = require('edge');
//  leer la configurción de MySQL
var config = require("../../config.json");

var assemblyFile = 'WM500V5Lib.dll';
var typeName =  'WM500V5Lib.UsbCom';
if (config.dllVersion && config.dllVersion == "64"){
    console.log('DLL -> 64');
    assemblyFile = 'WM500V5-64Lib.dll';
    typeName =  'WM500V5-64Lib.UsbCom64';
}


module.exports.readTerminalNumber = function(callback) {
    var netLib = edge.func({
        assemblyFile: assemblyFile,
        typeName: typeName,
        methodName: 'Invoke'
    });
    var input = {
        command: "ReadTerminalNumber",
        value: null
    };

    netLib(input, function(err, result) {
        // general error
        if (err) {
            callback(err, null);
            return;
        }
        console.log("RES: " + result);
        // specific error
        if (result.indexOf('ERROR') > -1) {
            var error = new Error(result);
            callback(error, null);
            return;
        }
        callback(null, result);
    });
};


module.exports.getRecords = function(callback) {
    var netLib = edge.func({
        assemblyFile: assemblyFile,
        typeName: typeName,
        methodName: 'Invoke'
    });
    var input = {
        command: "GetRecords",
        value: null
    };

    netLib(input, function(err, result) {
    	var records = [];
        // general error
        if (err) {
            callback(err, null);
            return;
        }
        console.log("RES: " + result);
        // specific error
        if (result.indexOf('ERROR') > -1) {
            var error = new Error(result);
            callback(error, null);
            return;
        }
        var vRecords = result.split('\r\n');
        for (var i = 0; i < vRecords.length; i++){
        	var vRecord = vRecords[i];
        	if (vRecord != ""){
        		var fields = vRecord.split(',');
        		var record = {
        			tag: fields[0],
        			stamp: fields[1]
        		};
        		records.push(record);
        	}
        }
        callback(null, records);
    });
};

module.exports.deleteRecords = function(callback) {
    var netLib = edge.func({
        assemblyFile: assemblyFile,
        typeName: typeName,
        methodName: 'Invoke'
    });
    var input = {
        command: "DeleteRecords",
        value: null
    };

    netLib(input, function(err, result) {
        // general error
        if (err) {
            callback(err, null);
            return;
        }
        console.log("RES: " + result);
        // specific error
        if (result.indexOf('ERROR') > -1) {
            var error = new Error(result);
            callback(error, null);
            return;
        }
        callback(null, result);
    });
};

module.exports.setDateTime = function(callback) {
    var netLib = edge.func({
        assemblyFile: assemblyFile,
        typeName: typeName,
        methodName: 'Invoke'
    });
    var input = {
        command: "SetDateTime",
        value: null
    };

    netLib(input, function(err, result) {
        // general error
        if (err) {
            callback(err, null);
            return;
        }
        console.log("RES: " + result);
        // specific error
        if (result.indexOf('ERROR') > -1) {
            var error = new Error(result);
            callback(error, null);
            return;
        }
        callback(null, result);
    });
};


