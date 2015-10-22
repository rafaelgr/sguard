// informes_db_mysql
// Acceso a la base de datos para la obtención de informes.
var mysql = require("mysql"); // librería para el acceso a bases de datos MySQL
var async = require("async"); // librería para el manejo de llamadas asíncronas en JS
var moment = require("moment"); // libreria para el manejo de fechas y horas.

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

// fromDbToJsRondas
// a partir de los registros pasados en regs
// monta un objeto con el formato necesario para devolver un informe
function fromDbToJsRondas(dfecha, hfecha, regs) {
    var inf = {
        ninforme: "Rondas entre fechas",
        dFecha: moment(new Date(dfecha)).format('DD/MM/YYYY'),
        hFecha: moment(new Date(hfecha)).format('DD/MM/YYYY'),
        rondas: [],
    };
    var antRondaRealizadaId = 0
    var rr = null;
    var fecha = null;
    // leemos secuencialmente los registros pasados.
    for (var i = 0; i < regs.length; i++) {
        reg = regs[i];
        if (reg.rondaRealizadaId != antRondaRealizadaId) {
            if (antRondaRealizadaId != 0) {
                inf.rondas.push(rr);
            }
            if (reg.rfecha) {
                rfecha = moment(new Date(reg.rfecha)).format("YYYY-MM-DD");
            } else {
                rfecha = "";
            }
            rr = {
                nronda: reg.nronda,
                vigilante: reg.vigilante,
                rfecha: moment(rfecha).format("DD/MM/YYYY"),
                rhora: reg.rhora,
                rresultado: reg.rresultado,
                tnombre: reg.tnombre,
                validada: "NO",
                obsvalida: reg.obsvalida,
                puntos: []
            };
            if (reg.validada != 0) {
                rr.validada = "SI";
            }
            antRondaRealizadaId = reg.rondaRealizadaId;
        }
        if (reg.fecha) {
            fecha = moment(new Date(reg.rfecha)).format("YYYY-MM-DD");
            fecha = moment(fecha).format("DD/MM/YYYY");
        } else {
            fecha = null;
        }
        var punto = {
            ordenleido: reg.ordenleido,
            ordenronda: reg.ordenronda,
            tagleido: reg.tagleido,
            punto: reg.punto,
            fecha: fecha,
            hora: reg.hora,
            resultado: reg.resultado
        };
        rr.puntos.push(punto);
    }
    if (rr) {
        inf.rondas.push(rr);
    }
    return inf;
}

// fromDbToJsRondas
// a partir de los registros pasados en regs
// monta un objeto con el formato necesario para devolver un informe
function fromDbToJsRondasVigilante(dfecha, hfecha, regs) {
    var inf = {
        ninforme: "Rondas por vigilante",
        dFecha: moment(new Date(dfecha)).format('DD/MM/YYYY'),
        hFecha: moment(new Date(hfecha)).format('DD/MM/YYYY'),
        vigilante: "",
        rondas: [],
    };
    if (regs.length > 0) {
        inf.vigilante = regs[0].vigilante;
    }
    var antRondaRealizadaId = 0
    var rr = null;
    // leemos secuencialmente los registros pasados.
    for (var i = 0; i < regs.length; i++) {
        reg = regs[i];
        if (reg.rondaRealizadaId != antRondaRealizadaId) {
            if (antRondaRealizadaId != 0) {
                inf.rondas.push(rr);
            }
            if (reg.rfecha) {
                rfecha = moment(new Date(reg.rfecha)).format("YYYY-MM-DD");
            } else {
                rfecha = null;
            }
            rr = {
                nronda: reg.nronda,
                rfecha: moment(rfecha).format("DD/MM/YYYY"),
                rhora: reg.rhora,
                rresultado: reg.rresultado,
                tnombre: reg.tnombre,
                validada: "NO",
                obsvalida: reg.obsvalida,
                puntos: []
            };
            if (reg.validada != 0) {
                rr.validada = "SI";
            }
            antRondaRealizadaId = reg.rondaRealizadaId;
        }
        if (reg.fecha) {
            fecha = moment(new Date(reg.rfecha)).format("YYYY-MM-DD");
            fecha = moment(fecha).format("DD/MM/YYYY");
        } else {
            fecha = null;
        }
        var punto = {
            ordenleido: reg.ordenleido,
            ordenronda: reg.ordenronda,
            tagleido: reg.tagleido,
            punto: reg.punto,
            fecha: fecha,
            hora: reg.hora,
            resultado: reg.resultado
        };

        rr.puntos.push(punto);
    }
    if (rr) {
        inf.rondas.push(rr);
    }
    return inf;
}


// getRondas
// Lee las rondas realizadas entre las fechas indicadas
module.exports.getRondas = function(dfecha, hfecha, callback) {
    var connection = getConnection();
    var grupos = null;
    var sql = "SELECT rr.rondaRealizadaId, rrp.rondaRealizadaPuntoId, t.nombre AS tnombre, rr.validada, rr.obsvalida,"
    sql += " r.nombre AS nronda, v.nombre AS vigilante, rr.fecha AS rfecha, rr.hora AS rhora, rr.resultado AS rresultado,";
    sql += " rrp.ordenleido, rrp.orden AS ordenronda, rrp.tagleido, p.nombre AS punto, rrp.fecha, rrp.hora, rrp.resultado";
    sql += " FROM rondas_realizadas AS rr";
    sql += " LEFT JOIN rondas AS r ON r.rondaId = rr.rondaId";
    sql += " LEFT JOIN vigilantes AS v ON v.vigilanteId = rr.vigilanteId";
    sql += " LEFT JOIN rondas_realizadaspuntos AS rrp ON rrp.rondaRealizadaId = rr.rondaRealizadaId";
    sql += " LEFT JOIN puntos AS p ON p.puntoId = rrp.puntoId";
    sql += " LEFT JOIN terminales AS t ON t.terminalId = rr.terminalId";
    sql += " WHERE rr.fecha >= ? AND rr.fecha <= ?"
    sql += " ORDER BY rr.fecha, rr.hora, rrp.rondaRealizadaId, rrp.orden";
    sql = mysql.format(sql, [dfecha, hfecha]);
    connection.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
            return;
        }
        grupos = result;
        callback(null, fromDbToJsRondas(dfecha, hfecha, result));
    });
    closeConnectionCallback(connection, callback);
}

// getRondas
// Lee las rondas realizadas entre las fechas indicadas
module.exports.getRondasVigilante = function(vigilanteId, dfecha, hfecha, callback) {
    var connection = getConnection();
    var grupos = null;
    var sql = "SELECT rr.rondaRealizadaId, rrp.rondaRealizadaPuntoId, t.nombre AS tnombre, rr.validada, rr.obsvalida,"
    sql += " r.nombre AS nronda, v.nombre AS vigilante, rr.fecha AS rfecha, rr.hora AS rhora, rr.resultado AS rresultado,";
    sql += " rrp.ordenleido, rrp.orden AS ordenronda, rrp.tagleido, p.nombre AS punto, rrp.fecha, rrp.hora, rrp.resultado";
    sql += " FROM rondas_realizadas AS rr";
    sql += " LEFT JOIN rondas AS r ON r.rondaId = rr.rondaId";
    sql += " LEFT JOIN vigilantes AS v ON v.vigilanteId = rr.vigilanteId";
    sql += " LEFT JOIN rondas_realizadaspuntos AS rrp ON rrp.rondaRealizadaId = rr.rondaRealizadaId";
    sql += " LEFT JOIN puntos AS p ON p.puntoId = rrp.puntoId";
    sql += " LEFT JOIN terminales AS t ON t.terminalId = rr.terminalId";
    sql += " WHERE rr.vigilanteId = ? AND rr.fecha >= ? AND rr.fecha <= ?"
    sql += " ORDER BY rr.fecha, rr.hora, rrp.rondaRealizadaId, rrp.orden";
    sql = mysql.format(sql, [vigilanteId, dfecha, hfecha]);
    connection.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
            return;
        }
        grupos = result;
        callback(null, fromDbToJsRondasVigilante(dfecha, hfecha, result));
    });
    closeConnectionCallback(connection, callback);
}
