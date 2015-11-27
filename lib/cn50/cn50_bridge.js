// administradores_db_mysql
// Manejo de la tabla administradores en la base de datos
var async = require("async"); // librería para el manejo de llamadas asíncronas en JS

// Maneja la creación y mantenimiento de los ficheros SF
// que son la base de datos para el terminal CN50

var edge = require('edge'); // permite acceso a DLL creadas con .NET
var config = require('../../config.json');

module.exports.deleteTables = function(callback) {
    var netLib = edge.func({
        assemblyFile: 'TermCN50Lib.dll',
        typeName: 'TermCN50Lib.CN50General',
        methodName: 'Invoke'
    });
    var input = {
        command: "DeleteTables",
        db: config.cn50sdf + "terminal.sdf",
        pass: '',
        value: ''
    };
    var s = JSON.stringify(input);

    netLib(s, function(err, result) {
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



module.exports.postAdministrador = function(administrador, callback) {
    var netLib = edge.func({
        assemblyFile: 'TermCN50Lib.dll',
        typeName: 'TermCN50Lib.CN50Administradores',
        methodName: 'Invoke'
    });
    var input = {
        command: "SetAdministrador",
        db: config.cn50sdf + "terminal.sdf",
        pass: '',
        value: JSON.stringify(administrador)
    };
    var s = JSON.stringify(input);

    netLib(s, function(err, result) {
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

module.exports.deleteAdministradores = function(callback) {
    var netLib = edge.func({
        assemblyFile: 'TermCN50Lib.dll',
        typeName: 'TermCN50Lib.CN50Administradores',
        methodName: 'Invoke'
    });
    var input = {
        command: "DeleteAdministradores",
        db: config.cn50sdf + "terminal.sdf",
        pass: '',
        value: ''
    };
    var s = JSON.stringify(input);

    netLib(s, function(err, result) {
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


module.exports.postEdificio = function(edificio, callback) {
    var netLib = edge.func({
        assemblyFile: 'TermCN50Lib.dll',
        typeName: 'TermCN50Lib.CN50Edificios',
        methodName: 'Invoke'
    });
    var input = {
        command: "SetEdificio",
        db: config.cn50sdf + "terminal.sdf",
        pass: '',
        value: JSON.stringify(edificio)
    };
    var s = JSON.stringify(input);

    netLib(s, function(err, result) {
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

module.exports.deleteEdificios = function(callback) {
    var netLib = edge.func({
        assemblyFile: 'TermCN50Lib.dll',
        typeName: 'TermCN50Lib.CN50Edificios',
        methodName: 'Invoke'
    });
    var input = {
        command: "DeleteEdificios",
        db: config.cn50sdf + "terminal.sdf",
        pass: '',
        value: ''
    };
    var s = JSON.stringify(input);

    netLib(s, function(err, result) {
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


module.exports.postGrupo = function(grupo, callback) {
    var netLib = edge.func({
        assemblyFile: 'TermCN50Lib.dll',
        typeName: 'TermCN50Lib.CN50Grupos',
        methodName: 'Invoke'
    });
    var input = {
        command: "SetGrupo",
        db: config.cn50sdf + "terminal.sdf",
        pass: '',
        value: JSON.stringify(grupo)
    };
    var s = JSON.stringify(input);

    netLib(s, function(err, result) {
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

module.exports.deleteGrupos = function(callback) {
    var netLib = edge.func({
        assemblyFile: 'TermCN50Lib.dll',
        typeName: 'TermCN50Lib.CN50Grupos',
        methodName: 'Invoke'
    });
    var input = {
        command: "DeleteGrupos",
        db: config.cn50sdf + "terminal.sdf",
        pass: '',
        value: ''
    };
    var s = JSON.stringify(input);

    netLib(s, function(err, result) {
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


module.exports.postIncidencia = function(incidencia, callback) {
    var netLib = edge.func({
        assemblyFile: 'TermCN50Lib.dll',
        typeName: 'TermCN50Lib.CN50Incidencias',
        methodName: 'Invoke'
    });
    var input = {
        command: "SetIncidencia",
        db: config.cn50sdf + "terminal.sdf",
        pass: '',
        value: JSON.stringify(incidencia)
    };
    var s = JSON.stringify(input);

    netLib(s, function(err, result) {
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

module.exports.deleteIncidencias = function(callback) {
    var netLib = edge.func({
        assemblyFile: 'TermCN50Lib.dll',
        typeName: 'TermCN50Lib.CN50Incidencias',
        methodName: 'Invoke'
    });
    var input = {
        command: "DeleteIncidencias",
        db: config.cn50sdf + "terminal.sdf",
        pass: '',
        value: ''
    };
    var s = JSON.stringify(input);

    netLib(s, function(err, result) {
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


module.exports.postVigilante = function(vigilante, callback) {
    var netLib = edge.func({
        assemblyFile: 'TermCN50Lib.dll',
        typeName: 'TermCN50Lib.CN50Vigilantes',
        methodName: 'Invoke'
    });
    var input = {
        command: "SetVigilante",
        db: config.cn50sdf + "terminal.sdf",
        pass: '',
        value: JSON.stringify(vigilante)
    };
    var s = JSON.stringify(input);

    netLib(s, function(err, result) {
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

module.exports.deleteVigilantes = function(callback) {
    var netLib = edge.func({
        assemblyFile: 'TermCN50Lib.dll',
        typeName: 'TermCN50Lib.CN50Vigilantes',
        methodName: 'Invoke'
    });
    var input = {
        command: "DeleteVigilantes",
        db: config.cn50sdf + "terminal.sdf",
        pass: '',
        value: ''
    };
    var s = JSON.stringify(input);

    netLib(s, function(err, result) {
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


module.exports.postTerminal = function(terminal, callback) {
    var netLib = edge.func({
        assemblyFile: 'TermCN50Lib.dll',
        typeName: 'TermCN50Lib.CN50Terminales',
        methodName: 'Invoke'
    });
    var input = {
        command: "SetTerminal",
        db: config.cn50sdf + "terminal.sdf",
        pass: '',
        value: JSON.stringify(terminal)
    };
    var s = JSON.stringify(input);

    netLib(s, function(err, result) {
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

module.exports.deleteTerminales = function(callback) {
    var netLib = edge.func({
        assemblyFile: 'TermCN50Lib.dll',
        typeName: 'TermCN50Lib.CN50Terminales',
        methodName: 'Invoke'
    });
    var input = {
        command: "DeleteTerminales",
        db: config.cn50sdf + "terminal.sdf",
        pass: '',
        value: ''
    };
    var s = JSON.stringify(input);

    netLib(s, function(err, result) {
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


module.exports.postPunto = function(punto, callback) {
    var netLib = edge.func({
        assemblyFile: 'TermCN50Lib.dll',
        typeName: 'TermCN50Lib.CN50Puntos',
        methodName: 'Invoke'
    });
    var input = {
        command: "SetPunto",
        db: config.cn50sdf + "terminal.sdf",
        pass: '',
        value: JSON.stringify(punto)
    };
    var s = JSON.stringify(input);

    netLib(s, function(err, result) {
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

module.exports.deletePuntos = function(callback) {
    var netLib = edge.func({
        assemblyFile: 'TermCN50Lib.dll',
        typeName: 'TermCN50Lib.CN50Puntos',
        methodName: 'Invoke'
    });
    var input = {
        command: "DeletePuntos",
        db: config.cn50sdf + "terminal.sdf",
        pass: '',
        value: ''
    };
    var s = JSON.stringify(input);

    netLib(s, function(err, result) {
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


module.exports.postRonda = function(ronda, callback) {
    var netLib = edge.func({
        assemblyFile: 'TermCN50Lib.dll',
        typeName: 'TermCN50Lib.CN50Rondas',
        methodName: 'Invoke'
    });
    var input = {
        command: "SetRonda",
        db: config.cn50sdf + "terminal.sdf",
        pass: '',
        value: JSON.stringify(ronda)
    };
    var s = JSON.stringify(input);

    netLib(s, function(err, result) {
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

module.exports.deleteRondas = function(callback) {
    var netLib = edge.func({
        assemblyFile: 'TermCN50Lib.dll',
        typeName: 'TermCN50Lib.CN50Rondas',
        methodName: 'Invoke'
    });
    var input = {
        command: "DeleteRondas",
        db: config.cn50sdf + "terminal.sdf",
        pass: '',
        value: ''
    };
    var s = JSON.stringify(input);

    netLib(s, function(err, result) {
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


module.exports.postRondaPunto = function(rondaPunto, callback) {
    var netLib = edge.func({
        assemblyFile: 'TermCN50Lib.dll',
        typeName: 'TermCN50Lib.CN50RondasPuntos',
        methodName: 'Invoke'
    });
    var input = {
        command: "SetRondaPunto",
        db: config.cn50sdf + "terminal.sdf",
        pass: '',
        value: JSON.stringify(rondaPunto)
    };
    var s = JSON.stringify(input);

    netLib(s, function(err, result) {
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

module.exports.deleteRondasPuntos = function(callback) {
    var netLib = edge.func({
        assemblyFile: 'TermCN50Lib.dll',
        typeName: 'TermCN50Lib.CN50RondasPuntos',
        methodName: 'Invoke'
    });
    var input = {
        command: "DeleteRondasPuntos",
        db: config.cn50sdf + "terminal.sdf",
        pass: '',
        value: ''
    };
    var s = JSON.stringify(input);

    netLib(s, function(err, result) {
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


