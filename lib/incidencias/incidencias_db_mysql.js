// incidencias_db_mysql
// Manejo de la tabla incidencias en la base de datos
var mysql = require("mysql"); // librería para el acceso a bases de datos MySQL
var async = require("async"); // librería para el manejo de llamadas asíncronas en JS

//  leer la configurción de MySQL
var config = require("../../configMySQL.json");
var sql = "";

// getConnection 
// función auxiliar para obtener una conexión al servidor
// de base de datos.
function getConnection() {
    var connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        port: config.port
    });
    connection.connect(function(err) {
        if (err) throw err;
    });
    return connection;
}

// closeConnection
// función auxiliar para cerrar una conexión
function closeConnection(connection) {
    connection.end(function(err) {
        if (err) {
            throw err;
        }
    });
}

function closeConnectionCallback(connection, callback) {
    connection.end(function(err) {
        if (err) callback(err);
    });
}

// comprobarIncidencia
// comprueba que tiene la estructura de objeto mínima
// necesaria para guardarlo en la base de datos
// Por ejemplo, que es del tipo correcto y tiene los atributos 
// adecuados.
function comprobarIncidencia(incidencia) {
    // debe ser objeto del tipo que toca
    var comprobado = "object" === typeof incidencia;
    // en estas propiedades no se admiten valores nulos
    comprobado = (comprobado && incidencia.hasOwnProperty("incidenciaId"));
    comprobado = (comprobado && incidencia.hasOwnProperty("nombre"));
    comprobado = (comprobado && incidencia.hasOwnProperty("grupoId"));
    return comprobado;
}


// getIncidencias
// lee todos los registros de la tabla incidencias y
// los devuelve como una lista de objetos
module.exports.getIncidencias = function(callback) {
    var connection = getConnection();
    var incidencias = null;
    sql = "SELECT * FROM incidencias";
    connection.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
            return;
        }
        incidencias = result;
        callback(null, incidencias);
    });
    closeConnectionCallback(connection, callback);
}


// getIncidenciasBuscar
// lee todos los registros de la tabla incidencias cuyo
// nombre contiene la cadena de búsqueda. Si la cadena es '*'
// devuelve todos los registros
module.exports.getIncidenciasBuscar = function(nombre, callback) {
    var connection = getConnection();
    var incidencias = null;
    var sql = "SELECT e.*, g.nombre as gnombre FROM incidencias as e";
    sql += " LEFT JOIN grupos as g on g.grupoId = e.grupoId"
    if (nombre !== "*") {
        sql += " WHERE e.nombre LIKE ?";
        sql = mysql.format(sql, '%' + nombre + '%');
    }
    connection.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
            return;
        }
        incidencias = result;
        callback(null, incidencias);
    });
    closeConnectionCallback(connection, callback);
}

// getIncidenciasBuscarGrupo
// lee todos los registros de la tabla incidencias cuyo
// nombre contiene la cadena de búsqueda. Si la cadena es '*'
// devuelve todos los registros
module.exports.getIncidenciasBuscarGrupo = function(id, callback) {
    var connection = getConnection();
    var incidencias = null;
    var sql = "SELECT e.*, g.nombre as gnombre FROM incidencias as e";
    sql += " LEFT JOIN grupos as g on g.grupoId = e.grupoId"
    sql += " WHERE g.grupoId = ?";
    sql = mysql.format(sql, id);

    connection.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
            return;
        }
        incidencias = result;
        callback(null, incidencias);
    });
    closeConnectionCallback(connection, callback);
}


// getIncidencia
// busca  el incidencia con id pasado
module.exports.getIncidencia = function(id, callback) {
    var connection = getConnection();
    var incidencias = null;
    var sql = "SELECT e.*, g.nombre as gnombre FROM incidencias as e";
    sql += " LEFT JOIN grupos as g on g.grupoId = e.grupoId"
    sql += " WHERE e.incidenciaId = ?";
    sql = mysql.format(sql, id);
    connection.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
            return;
        }
        if (result.length == 0) {
            callback(null, null);
            return;
        }
        callback(null, result[0]);
    });
    closeConnectionCallback(connection, callback);
}


// postIncidencia
// crear en la base de datos el incidencia pasado
module.exports.postIncidencia = function(incidencia, callback) {
    if (!comprobarIncidencia(incidencia)) {
        var err = new Error("El incidencia pasado es incorrecto, no es un objeto de este tipo o le falta algún atributo olbligatorio");
        callback(err);
        return;
    }
    var connection = getConnection();
    incidencia.incidenciaId = 0; // fuerza el uso de autoincremento
    sql = "INSERT INTO incidencias SET ?";
    sql = mysql.format(sql, incidencia);
    connection.query(sql, function(err, result) {
        if (err) {
            callback(err);
        }
        incidencia.incidenciaId = result.insertId;
        callback(null, incidencia);
    });
    closeConnectionCallback(connection, callback);
}

// putIncidencia
// Modifica el incidencia según los datos del objeto pasao
module.exports.putIncidencia = function(id, incidencia, callback) {
    if (!comprobarIncidencia(incidencia)) {
        var err = new Error("El incidencia pasado es incorrecto, no es un objeto de este tipo o le falta algún atributo olbligatorio");
        callback(err);
        return;
    }
    if (id != incidencia.incidenciaId) {
        var err = new Error("El ID del objeto y de la url no coinciden");
        callback(err);
        return;
    }
    var connection = getConnection();
    sql = "UPDATE incidencias SET ? WHERE incidenciaId = ?";
    sql = mysql.format(sql, [incidencia, incidencia.incidenciaId]);
    connection.query(sql, function(err, result) {
        if (err) {
            callback(err);
        }
        callback(null, incidencia);
    });
    closeConnectionCallback(connection, callback);
}

// deleteIncidencia
// Elimina el incidencia con el id pasado
module.exports.deleteIncidencia = function(id, incidencia, callback) {
    var connection = getConnection();
    sql = "DELETE from incidencias WHERE incidenciaId = ?";
    sql = mysql.format(sql, id);
    connection.query(sql, function(err, result) {
        if (err) {
            callback(err);
            return;
        }
        callback(null);
        closeConnectionCallback(connection, callback);
    });
}
