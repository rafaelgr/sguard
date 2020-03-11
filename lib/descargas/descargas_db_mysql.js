// administradores_db_mysql
// Manejo de la tabla administradores en la base de datos
var mysql = require("mysql"); // librería para el acceso a bases de datos MySQL
var async = require("async"); // librería para el manejo de llamadas asíncronas en JS
var moment = require("moment"); // librería para formateo de fechas y horas
var terminalBridge = require("../terminal/terminal-bridge.js");
// 
var vigilanteDb = require("../vigilantes/vigilantes_db_mysql");
var rondaDb = require("../rondas/rondas_db_mysql");
var puntoDb = require("../puntos/puntos_db_mysql");
var terminalesDb = require("../terminales/terminales_db_mysql");
var rondaRealizadaDb = require("../rondas_realizadas/rondas_realizadas_db_mysql")

//  leer la configurción de MySQL
var config = require("../../configMySQL.json");
var sql = "";
var ioAPI = require('../ioapi/ioapi');
//
var descarga;
var lecturas;
var vigilanteId = null;
var rondaRealizada = null;
var resultadoRonda = "CORRECTO";
var resultadoLinea = "CORRECTO";
var logMens = "";
var ordenEnRonda = 0;
var primeraVez = false;

// Para el control de tiempos entre puntos
var maxTiempoEntrePuntosDeRonda;
var minTiempoEntrePuntosDeRonda;
var ultimaLecturaPuntoDeRonda;
var hayPuntosConExcesoDeTiempos;

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
    connection.connect(function (err) {
        if (err) throw err;
    });
    return connection;
}

// closeConnection
// función auxiliar para cerrar una conexión
function closeConnection(connection) {
    connection.end(function (err) {
        if (err) {
            throw err;
        }
    });
}

function closeConnectionCallback(connection, callback) {
    connection.end(function (err) {
        if (err) callback(err);
    });
}


// getDescargasBuscar
// lee todos los registros de la tabla puntos cuyo
// nombre contiene la cadena de búsqueda. Si la cadena es '*'
// devuelve todos los registros
module.exports.getDescargasBuscar = function (numero, callback) {
    var connection = getConnection();
    var descargas = null;
    var sql = "SELECT * FROM descargas";
    if (numero != '*' && numero != '$' && numero != '0') {
        sql += " WHERE descargaId = ?";
        sql = mysql.format(sql, numero);
    }
    if (numero == '$') {
        sql += " WHERE procesada = 0";
        sql = mysql.format(sql, numero);
    }
    if (numero == '0') {
        sql += " WHERE LENGTH(nterminal) = 0";
        sql = mysql.format(sql, numero);
    }
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            return;
        }
        descargas = result;
        callback(null, descargas);
    });
    closeConnectionCallback(connection, callback);
}

module.exports.getDescargas = function (callback) {
    var connection = getConnection();
    var descargas = null;
    var sql = "SELECT * FROM descargas";
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            return;
        }
        descargas = result;
        callback(null, descargas);
    });
    closeConnectionCallback(connection, callback);
}


module.exports.getDescargaDelTerminal = function (callback) {
    // hay que obtener el númer del terminal lo primero
    terminalBridge.readTerminalNumber(function (err, result) {
        if (err) {
            callback(err, null);
            return;
        }
        var descarga = {
            cabecera: {
                descargaId: 0,
                nterminal: result,
                fecha: moment().format('YYYY-MM-DD'),
                hora: moment().format('HH:mm:ss'),
                resultado: "CARGA SIMPLE TERMINAL []"
            },
            lecturas: []
        };
        terminalBridge.getRecords(function (err, result) {
            if (err) {
                callback(err, null);
                return;
            }
            if (result.length == 0) {
                callback(null, null);
                return;
            }
            descarga.lecturas = result;
            guardaDescarga(descarga, function (err, result) {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, result);
                // lanzamos el borre de los registros procesados
                terminalBridge.deleteRecords(function (err, result) {
                    // no hacemos nada porque el callback lo hemos lanzado
                    // antes.
                });
            });
        });
    });
}

module.exports.getDescargasDeCN50 = function (nterminal, lecturas, callback) {
    if (lecturas == "[]") {
        // no hay lecturas que procesar
        callback(null, null);
        return;
    }
    var descarga = {
        cabecera: {
            descargaId: 0,
            nterminal: nterminal,
            fecha: moment().format('YYYY-MM-DD'),
            hora: moment().format('HH:mm:ss'),
            resultado: "CARGA CN50"
        },
        lecturas: JSON.parse(lecturas)
    };
    guardaDescargaCN50(descarga, function (err, result) {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });

};

var fnGetDescargaDetalle = function (descargaId, callback) {
    var connection = getConnection();
    var descarga = {
        cabecera: null,
        lecturas: []
    };
    var sql = "SELECT d.descargaId, d.nterminal, d.fecha, d.hora, d.resultado, d.procesada,";
    sql += " t.terminalId, t.tagHexa,";
    sql += " dl.descargaLineaId, dl.tag, dl.fecha AS lfecha, dl.hora AS lhora, dl.tipo, dl.tipoId, dl.nombre, dl.incidenciaId, dl.observaciones";
    sql += " FROM descargas AS d";
    sql += " LEFT JOIN descargas_lineas AS dl ON dl.descargaId = d.descargaId";
    sql += " LEFT JOIN terminales AS t ON t.numero = d.nterminal";
    sql += " WHERE d.descargaId = ?";
    sql += " ORDER BY dl.fecha, dl.hora"
    sql = mysql.format(sql, descargaId);
    connection.query(sql, function (err, result) {
        closeConnectionCallback(connection, callback);
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, fromDbToJsDescarga(descarga, result));
    });
}
module.exports.getDescargaDetalle = fnGetDescargaDetalle;


var fnProcesarDescarga = function (descargaId, callback) {
    fnGetDescargaDetalle(descargaId, function (err, res) {
        if (err) {
            callback(err);
            return;
        }
        if (!res) {
            callback(null, "** NO hay lecturas en la desarga NR:" + descargaId);
            return;
        }
        var descarga = res;
        var lecturas = descarga.lecturas;
        var vigilanteId = null;
        var rondaRealizada = null;
        var resultadoRonda = "CORRECTO";
        var resultadoLinea = "CORRECTO";
        var logMens = "-- PROCESAMIENTO DE LECTURA NUMERO:" + descargaId + " INICIO" + moment(new Date()).format('DD/MM/YYYY HH:mm:ss') + "<br>";
        var ordenEnRonda = 0;
        var numReg = 0;
        var totReg = lecturas.length;
        // procesamos una a una las lecturas y actuamos en consecuencia
        async.eachSeries(lecturas,
            function (lectura, callback2) {
                ioAPI.sendProgress('Procesando lecturas', ++numReg, totReg);
                var tipo = lectura.tipo;
                var tipoId = lectura.tipoId;
                // actuamos según el tipo
                console.log("Tipo %s ID %s TAG %s", lectura.tipo, lectura.tipoId, lectura.tag);
                if (!tipo) {
                    logMens += "DESCONOCIDO TAG:" + lectura.tag + " Fecha: " + lectura.fecha + " Hora: " + lectura.hora + "<br/>";
                    return callback2();
                }
                switch (tipo) {
                    case "VIGILANTE":
                        logMens += "VIGILANTE TAG:" + lectura.tag + " Fecha: " + lectura.fecha + " Hora: " + lectura.hora + " ID: " + tipoId + " NOMBRE:" + lectura.nombre + "<br/>";
                        // ahora el vigilante ya no es nulo, simplemente eso
                        vigilanteId = tipoId;
                        callback2();
                        break;
                    case "RONDA":
                        logMens += "RONDA TAG:" + lectura.tag + " Fecha: " + lectura.fecha + " Hora: " + lectura.hora + " ID: " + tipoId + " NOMBRE:" + lectura.nombre + "<br/>";
                        primeraVez = false; // por defecto no es la primera vez
                        // verficamos si es primera
                        rondaRealizadaDb.getPrimeraVezRondaEnDiaTag(lectura.tag, lectura.fecha, function (err, res) {
                            if (err) {
                                logMens += "ERROR: " + err.Message + "<br/>";
                                return callback2(err);
                            }
                            primeraVez = res;
                            if (rondaRealizada) {
                                // si había una ronda previa hay que actualizarla
                                var rr = rondaRealizada;
                                if (resultadoRonda == "") resultadoRonda = "CORRECTO";
                                // 
                                if (hayPuntosConExcesoDeTiempos) {
                                    resultadoRonda += ' / TIEMPOS MAX O MIN ENTRE PUNTOS NO CUMPLIDOS';
                                }
                                rr.resultado = resultadoRonda;
                                rr.terminalId = descarga.cabecera.terminalId;
                                rr.descargaId = descargaId;
                                if (resultadoRonda == "CORRECTO") {
                                    rr.validada = 1;
                                    rr.obsvalida = "VALIDACION AUTOMÁTICA";
                                }
                                rondaRealizadaDb.putRondaRealizadaCarga(rondaRealizada.rondaRealizadaId, rr, function (err, res) {
                                    if (err) {
                                        logMens += "ERROR: " + err.Message + "<br/>";
                                        callback2(err);
                                        return;
                                    }
                                    // Ahora hay que crear la nueva
                                    resultadoRonda = "CORRECTO"; // por defecto OK
                                    if (!vigilanteId) {
                                        resultadoRonda = "SIN VIGILANTE";
                                    }
                                    // no hay ronda previa (creamos una nueva)
                                    rondaRealizadaDb.postRondaRealizadaDesdeTag(lectura.tag, lectura.fecha, lectura.hora, vigilanteId, descarga.cabecera.terminalId, function (err, res, mintime, maxtime) {
                                        if (err) {
                                            logMens += "ERROR: " + err.Message + "<br/>";
                                            callback2(err);
                                            return;
                                        }
                                        rondaRealizada = res;
                                        minTiempoEntrePuntosDeRonda = mintime;
                                        maxTiempoEntrePuntosDeRonda = maxtime;
                                        hayPuntosConExcesoDeTiempos = false;
                                        ultimaLecturaPuntoDeRonda = null;
                                        logMens += "** CREADA RONDA REALIZADA ID:" + rondaRealizada.rondaRealizadaId + " NOMBRE:" + lectura.nombre + "<br/>";
                                        ordenEnRonda = 0;
                                        callback2(); // seguimos
                                    });
                                }); 
                            } else {
                                if (!vigilanteId) {
                                    resultadoRonda = "SIN VIGILANTE";
                                }
                                // no hay ronda previa (creamos una nueva)
                                // -- SG81 -- Update last control 
                                rondaRealizadaDb.postRondaRealizadaDesdeTag(lectura.tag, lectura.fecha, lectura.hora, vigilanteId, descarga.cabecera.terminalId, function (err, res2, mintime, maxtime) {
                                    if (err) {
                                        logMens += "ERROR: " + err.Message + "<br/>";
                                        callback2(err);
                                        return;
                                    }
                                    rondaRealizada = res2;
                                    maxTiempoEntrePuntosDeRonda = maxtime;
                                    minTiempoEntrePuntosDeRonda = mintime;
                                    hayPuntosConExcesoDeTiempos = false;
                                    ultimaLecturaPuntoDeRonda = null;
                                    logMens += "** CREADA RONDA REALIZADA ID:" + rondaRealizada.rondaRealizadaId + " NOMBRE:" + lectura.nombre + "<br/>";
                                    ordenEnRonda = 0;
                                    callback2(); // seguimos
                                });
                            }
                        })

                        break;
                    case "PUNTO":
                        logMens += "PUNTO TAG:" + lectura.tag + " Fecha: " + lectura.fecha + " Hora: " + lectura.hora + " ID: " + tipoId + " NOMBRE:" + lectura.nombre + "<br/>";
                        ordenEnRonda++;
                        // controlamos si no hay ronda previa
                        if (!rondaRealizada) {
                            // crearemos una ronda realizada que no pertenece a ninguna existente
                            resultadoRonda = "R. DESCONOCIDA";
                            // al compartir rondas entre puntos no podemos asegurar a cual pertenece
                            if (!vigilanteId) {
                                resultadoRonda += " / SIN VIGILANTE";
                            }
                            var rr = {
                                rondaRealizadaId: 0,
                                rondaId: null,
                                vigilanteId: vigilanteId,
                                fecha: lectura.fecha,
                                hora: lectura.hora,
                                terminalId: descarga.cabecera.terminalId,
                                descargaId: descargaId
                            };
                            // no hay ronda previa (creamos una nueva)
                            rondaRealizadaDb.postRondaRealizada(rr, function (err, res2) {
                                if (err) {
                                    logMens += "ERROR: " + err.Message + "<br/>";
                                    callback2(err);
                                    return;
                                }
                                rondaRealizada = res2;
                                logMens += "** CREADA RONDA REALIZADA DESCONOCIDA ID:" + rondaRealizada.rondaRealizadaId + " NOMBRE:" + lectura.nombre + "<br/>";
                                ordenEnRonda = 0;
                                fnProcesarPuntoLeido(lectura, rondaRealizada, ordenEnRonda, function (err) {
                                    if (err) {
                                        return callback2(err);
                                    }
                                    return callback2();
                                });
                            });
                        } else {
                            fnProcesarPuntoLeido(lectura, rondaRealizada, ordenEnRonda, function (err) {
                                if (err) {
                                    return callback2(err);
                                }
                                return callback2();
                            });
                        }
                        break;
                    default:
                        logMens += "DESCONOCIDO TAG:" + lectura.tag + " Fecha: " + lectura.fecha + " Hora: " + lectura.hora + "<br/>";
                        ordenEnRonda++;
                        // controlamos si no hay ronda previa
                        if (!rondaRealizada) {
                            // crearemos una ronda realizada que no pertenece a ninguna existente
                            resultadoRonda = "R. DESCONOCIDA";
                            // al compartir rondas entre puntos no podemos asegurar a cual pertenece
                            if (!vigilanteId) {
                                resultadoRonda += " / SIN VIGILANTE";
                            }
                            var rr = {
                                rondaRealizadaId: 0,
                                rondaId: null,
                                vigilanteId: vigilanteId,
                                fecha: lectura.fecha,
                                hora: lectura.hora,
                                descargaId: descargaId
                            };
                            // no hay ronda previa (creamos una nueva)
                            rondaRealizadaDb.postRondaRealizada(rr, function (err, res2) {
                                if (err) {
                                    logMens += "ERROR: " + err.Message + "<br/>";
                                    callback2(err);
                                    return;
                                }
                                rondaRealizada = res2;
                                logMens += "** CREADA RONDA REALIZADA DESCONOCIDA ID:" + rondaRealizada.rondaRealizadaId + " NOMBRE:" + lectura.nombre + "<br/>";
                                ordenEnRonda = 0;
                                fnProcesarPuntoLeido(lectura, rondaRealizada, ordenEnRonda, function (err) {
                                    if (err) {
                                        return callback2(err);
                                    }
                                    return callback2();
                                });
                            });
                        } else {
                            fnProcesarPuntoLeido(lectura, rondaRealizada, ordenEnRonda, function (err, res) {
                                if (err) {
                                    return callback2(err);
                                }
                                return callback2();
                            });
                        }
                        break;
                }
                // a por la siguiente lectura
                //callback2();
            },
            function (err) {
                if (err) {
                    callback(err);
                    return;
                }
                logMens += "--- PROCESO FINALIZADO SIN ERRORES (pueden haber incidencias) --" + " INICIO" + moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
                if (rondaRealizada) {
                    var rr = rondaRealizada;
                    rr.resultado = resultadoRonda;
                    rr.terminalId = descarga.cabecera.terminalId;
                    rr.descargaId = descargaId;
                    if (resultadoRonda == "CORRECTO") {
                        rr.validada = 1;
                        rr.obsvalida = "VALIDACION AUTOMÁTICA";
                    }
                    rondaRealizadaDb.putRondaRealizadaCarga(rondaRealizada.rondaRealizadaId, rr, function (err, res) {
                        if (err) {
                            logMens += "ERROR: " + err.Message + "<br/>";
                            callback(err);
                            return;
                        }
                        fnActualizarDescarga(descargaId, function (err) {
                            if (err) return callback(err);
                            callback(null, logMens);
                        });

                    });
                } else {
                    fnActualizarDescarga(descargaId, function (err) {
                        if (err) return callback(err);
                        callback(null, logMens);
                    });
                }
            });
    });

};

module.exports.procesarDescarga = fnProcesarDescarga;

var fnActualizarDescarga = function (descargaId, done) {
    var con = getConnection();
    var sql = "UPDATE descargas SET procesada = 1 WHERE descargaId = ?";
    sql = mysql.format(sql, descargaId);
    con.query(sql, function (err) {
        if (err) return done(err);
        done(null);
    })
}

var fnActualizarUltimoControl = function (callback) {
    async.series([
        function (callback2) {
            var connection = getConnection();
            var sql = "DROP TABLE tmp_lastcontrol";
            connection.query(sql, function (err, result) {
                callback2();
            })
            closeConnectionCallback(connection, callback);
        },
        function (callback2) {
            var connection = getConnection();
            var sql = "CREATE TABLE tmp_lastcontrol"
            sql += " SELECT puntoId, MAX(CONCAT(fecha, ' ', hora)) AS lc";
            sql += " FROM rondas_realizadaspuntos AS rp";
            sql += " GROUP BY puntoId;";
            connection.query(sql, function (err, result) {
                if (err) {
                    callback2(err);
                    return;
                }
                callback2();
            })
            closeConnectionCallback(connection, callback);
        },
        function (callback2) {
            var connection = getConnection();
            var sql = "UPDATE puntos AS p, tmp_lastcontrol AS tmp"
            sql += " SET p.lastcontrol = tmp.lc";
            sql += " WHERE p.puntoId = tmp.puntoId;";
            connection.query(sql, function (err, result) {
                if (err) {
                    callback2(err);
                    return;
                }
                callback2();
            })
            closeConnectionCallback(connection, callback);
        }
    ],
        function (err, results) {
            if (err) {
                callback(err);
                return;
            }
            // todo bien
            callback(null, null);
        });


};
module.exports.actualizarUltimoControl = fnActualizarUltimoControl;

var fnProcesarPuntoLeidoOld = function (lectura, rondaRealizada, ordenEnRonda, callback) {
    // lo buscamos en la base de datos
    var id = rondaRealizada.rondaRealizadaId;
    rondaRealizadaDb.getPuntoRondaRealizadaCarga(id, lectura.tipoId, function (err, res) {
        if (err) {
            logMens += "ERROR: " + err.Message + "<br/>";
            callback(err);
            return;
        }
        var puntos = res;
        if (puntos.length > 0 && !puntos[0].fecha) {
            // ha encontrado el punto
            var punto = puntos[0];
            var prr = {
                fecha: lectura.fecha,
                hora: lectura.hora,
                resultado: "CORRECTO",
                tagleido: lectura.tag,
                ordenleido: ordenEnRonda,
                nombre: lectura.nombre,
                observaciones: lectura.observaciones
            };
            if (lectura.incidenciaId && lectura.incidenciaId != 0) {
                prr.incidenciaId = lectura.incidenciaId;
            }
            if (punto.orden == ordenEnRonda) {
                prr.resultado = "CORRECTO";
                logMens += "PUNTO ID:" + lectura.tipoId + " ENCONTRADO EN SECUENCIA CORRECTA" + " NOMBRE:" + lectura.nombre + "<br/>";
            } else {
                prr.resultado = "FUERA DE SECUENCIA";
                resultadoRonda = "PUNTOS FUERA DE SECUENCIA";
                logMens += "PUNTO ID:" + lectura.tipoId + " ENCONTRADO FUERA DE SECUENCIA" + " NOMBRE:" + lectura.nombre + "<br/>";
            }
            rondaRealizadaDb.putPuntoRondaRealizadaCarga(punto.rondaRealizadaPuntoId, prr, function (err, res) {
                if (err) {
                    logMens += "ERROR: " + err.Message + "<br/>";
                    callback(err);
                    return;
                }
                callback();
                return;
            });
        } else {
            // no ha encontrado el punto
            // lo creamos en la ronda activa
            var prr = {
                rondaRealizadaPuntoId: 0,
                rondaRealizadaId: rondaRealizada.rondaRealizadaId,
                orden: null,
                puntoId: lectura.tipoId,
                fecha: lectura.fecha,
                hora: lectura.hora,
                tagleido: lectura.tag,
                ordenleido: ordenEnRonda,
                nombre: lectura.nombre,
                resultado: "NO EN ESTA RONDA",
                incidenciaId: lectura.incidenciaId,
                observaciones: lectura.observaciones
            }
            if (lectura.incidenciaId && lectura.incidenciaId != 0) {
                prr.incidenciaId = lectura.incidenciaId;
            }
            if (!lectura.tipoId) {
                prr.resultado = "TAG DESCONOCIDO";
            }
            if (puntos.length > 0 && puntos[0].fecha) {
                prr.resultado = "PUNTO REPETIDO";
            }
            rondaRealizadaDb.postPuntoRondaRealizada(prr, function (err, res) {
                if (err) {
                    logMens += "ERROR: " + err.Message + "<br/>";
                    callback(err);
                    return;
                }
                logMens += "*************** PUNTO ID:" + lectura.tipoId + " NO PERTENECE A ESTA RONDA " + " NOMBRE:" + lectura.nombre + "<br/>";
                callback();
                return;
            });
        }
    });

}


var fnProcesarPuntoLeido = function (lectura, rondaRealizada, ordenEnRonda, callback) {
    // antes de procesar el punto necesitaremos información de
    // los identificadores de la ronda y del punto
    var rondaId = rondaRealizada.rondaId;
    var rondaRealizadaId = rondaRealizada.rondaRealizadaId;
    var puntoId = lectura.tipoId;
    // To support 'ronda' and 'point' information
    var vRonda = null;
    var vPunto = null;
    var vLastControl = null;
    //  execute 4 function serially
    // (1) Obtain information about current 'ronda'
    // (2) The same about the 'punto'
    // (3) Process the point as in [fnProcesarPuntoLeido]
    // (4) Update lastcontrol in 'punto'.
    async.series({
        infRonda: function (callback2) {
            rondaDb.getRonda(rondaId, function (err, res) {
                if (err) {
                    callback2(err);
                    return;
                }
                vRonda = res;
                callback2();
            });
        },
        infPunto: function (callback2) {
            puntoDb.getPunto(puntoId, function (err, res) {
                if (err) {
                    callback2(err);
                    return;
                }
                vPunto = res;
                callback2();
            });
        },
        processPuntoLeido: function (callback2) {
            rondaRealizadaDb.getPuntoRondaRealizadaCarga(rondaRealizadaId, lectura.tipoId, function (err, res) {
                if (err) {
                    logMens += "ERROR: " + err.Message + "<br/>";
                    callback2(err);
                    return;
                }
                var puntos = res;
                if (puntos.length > 0 && !puntos[0].fecha) {
                    // ha encontrado el punto
                    var punto = puntos[0];
                    var prr = {
                        fecha: lectura.fecha,
                        hora: lectura.hora,
                        resultado: "CORRECTO",
                        tagleido: lectura.tag,
                        ordenleido: ordenEnRonda,
                        nombre: lectura.nombre,
                        observaciones: lectura.observaciones
                    };
                    var readTime = moment(lectura.fecha + ' ' + lectura.hora).format('YYYY-MM-DD HH:mm:ss');
                    if (vPunto && vPunto.lastcontrol) {
                        vLastControl = moment(vPunto.lastcontrol).format('YYYY-MM-DD HH:mm:ss');
                    } else {
                        vLastControl = readTime;
                    }
                    if (lectura.incidenciaId && lectura.incidenciaId != 0) {
                        prr.incidenciaId = lectura.incidenciaId;
                    }
                    if (punto.orden == ordenEnRonda) {
                        prr.resultado = "CORRECTO";
                        logMens += "PUNTO ID:" + lectura.tipoId + " ENCONTRADO EN SECUENCIA CORRECTA" + " NOMBRE:" + lectura.nombre + "<br/>";
                    } else {
                        prr.resultado = "FUERA DE SECUENCIA";
                        resultadoRonda = "PUNTOS FUERA DE SECUENCIA";
                        logMens += "PUNTO ID:" + lectura.tipoId + " ENCONTRADO FUERA DE SECUENCIA" + " NOMBRE:" + lectura.nombre + "<br/>";
                    }
                    if (vRonda.csnmax > 0 && !primeraVez) {
                        var maxreal = vRonda.csnmax + vRonda.csnmargen;
                        // obtain differencce in minutes
                        var elapsedMinutes = (new Date(readTime).getTime() - new Date(vLastControl).getTime()) / (1000 * 60);
                        if (elapsedMinutes > maxreal) {
                            prr.resultado = "SUPERADO TIEMPO EN PUNTOS ENTRE RONDAS";
                            resultadoRonda = "SUPERADO TIEMPO EN PUNTOS ENTRE RONDAS";
                            logMens += "PUNTO ID:" + lectura.tipoId + " SUPERADO TIEMPO MÁXIMO ENTRE RONDAS" + " NOMBRE:" + lectura.nombre + "<br/>";
                        }
                    }
                    // ahora el último control pasa a ser el de la última lectura
                    vLastControl = readTime;
                    rondaRealizadaDb.putPuntoRondaRealizadaCarga(punto.rondaRealizadaPuntoId, prr, function (err, res) {
                        if (err) {
                            logMens += "ERROR: " + err.Message + "<br/>";
                            callback2(err);
                            return;
                        }
                        callback2(null, resultadoRonda);
                        return;
                    });
                } else {
                    // no ha encontrado el punto
                    // lo creamos en la ronda activa
                    var prr = {
                        rondaRealizadaPuntoId: 0,
                        rondaRealizadaId: rondaRealizada.rondaRealizadaId,
                        orden: null,
                        puntoId: lectura.tipoId,
                        fecha: lectura.fecha,
                        hora: lectura.hora,
                        tagleido: lectura.tag,
                        ordenleido: ordenEnRonda,
                        nombre: lectura.nombre,
                        resultado: "NO EN ESTA RONDA",
                        incidenciaId: lectura.incidenciaId,
                        observaciones: lectura.observaciones
                    }
                    var readTime = moment(lectura.fecha + ' ' + lectura.hora).format('YYYY-MM-DD HH:mm:ss');
                    if (vPunto && vPunto.lastcontrol) {
                        vLastControl = moment(vPunto.lastcontrol).format('YYYY-MM-DD HH:mm:ss');
                    } else {
                        vLastControl = readTime;
                    }
                    if (lectura.incidenciaId && lectura.incidenciaId != 0) {
                        prr.incidenciaId = lectura.incidenciaId;
                    }
                    if (!lectura.tipoId) {
                        prr.resultado = "TAG DESCONOCIDO";
                        if (lectura.tag == "OBSERVACION") {
                            prr.resultado = "OBSERVACION MANUAL";
                        }
                    }
                    if (puntos.length > 0 && puntos[0].fecha) {
                        prr.resultado = "PUNTO REPETIDO";
                    }
                    // antes de grabar controlamos el respeto de los margenes CSN si hay que aplicarlo
                    if (vPunto && vPunto.csnmax > 0 && !primeraVez) {
                        var maxreal = vPunto.csnmax + vPunto.csnmargen;
                        // obtain differencce in minutes
                        var elapsedMinutes = (new Date(readTime).getTime() - new Date(vLastControl).getTime()) / (1000 * 60);
                        if (elapsedMinutes > maxreal) {
                            prr.resultado = "SUPERADO TIEMPO MÁXIMO ENTRE RONDAS";
                            resultadoRonda = "PUNTOS CON TIEMPO MÁXIMO ENTRE RONDAS SUPERADO";
                            logMens += "PUNTO ID:" + lectura.tipoId + " SUPERADO TIEMPO MÁXIMO ENTRE RONDAS" + " NOMBRE:" + lectura.nombre + "<br/>";
                        }
                    }
                    // ahora el último control pasa a ser el de la última lectura
                    vLastControl = readTime;
                    // control de tiempos máximos y mínimos entre puntos
                    if (ultimaLecturaPuntoDeRonda) {
                        // ya ha habido lecturas de puntos previas
                        var elapsedMinutes = (new Date(readTime).getTime() - new Date(ultimaLecturaPuntoDeRonda).getTime()) / (1000 * 60);
                        if (maxTiempoEntrePuntosDeRonda && (elapsedMinutes > maxTiempoEntrePuntosDeRonda)) {
                            prr.resultado += " / Máximo tiempo entre puntos excedido";
                            hayPuntosConExcesoDeTiempos = true;
                        }
                        if (minTiempoEntrePuntosDeRonda && (elapsedMinutes < minTiempoEntrePuntosDeRonda)) {
                            prr.resultado += " / Mínimo tiempo entre puntos no alcanzado";
                            hayPuntosConExcesoDeTiempos = true;
                        }
                        ultimaLecturaPuntoDeRonda = readTime;
                    } else {
                        // es el primer punto que se lee en esta ronda
                        ultimaLecturaPuntoDeRonda = readTime;
                    }
                    rondaRealizadaDb.postPuntoRondaRealizada(prr, function (err, res) {
                        if (err) {
                            logMens += "ERROR: " + err.Message + "<br/>";
                            callback(err);
                            return;
                        }
                        logMens += "*************** PUNTO ID:" + lectura.tipoId + " NO PERTENECE A ESTA RONDA " + " NOMBRE:" + lectura.nombre + "<br/>";
                        callback2();
                        return;
                    });
                }
            });
        },
        updateLastControl: function (callback2) {
            if (vPunto) {
                var sPunto = {
                    puntoId: vPunto.puntoId,
                    nombre: vPunto.nombre,
                    edificioId: vPunto.edificioId,
                    lastcontrol: vPunto.lastcontrol
                }
                if (!vPunto.lastcontrol) {
                    sPunto.lastcontrol = vLastControl;
                } else {
                    var pLastControl = moment(vPunto.lastcontrol).format('YYYY-MM-DD HH:mm:ss');
                    if (pLastControl < vLastControl) sPunto.lastcontrol = vLastControl;
                }
                puntoDb.putPunto(vPunto.puntoId, sPunto, function (err, res) {
                    if (err) {
                        callback2(err);
                        return;
                    }
                    callback2();
                });
            } else {
                callback2();
            }
        }
    },
        function (err, results) {
            if (err) {
                callback(err);
            } else {
                callback();
            }
        })

}




function fromDbToJsDescarga(descarga, registros) {
    if (registros.length == 0) {
        return null;
    }
    var registro = registros[0];
    descarga.cabecera = {
        descargaId: registro.descargaId,
        nterminal: registro.nterminal,
        terminalId: registro.terminalId,
        tagHexa: registro.tagHexa,
        fecha: registro.fecha,
        hora: registro.hora,
        procesada: registro.procesada
    };
    for (var i = 0; i < registros.length; i++) {
        var r = registros[i];
        var l = {
            tag: r.tag,
            fecha: moment(r.lfecha).format('YYYY-MM-DD'),
            hora: r.lhora,
            tipo: r.tipo,
            tipoId: r.tipoId,
            nombre: r.nombre,
            incidenciaId: r.incidenciaId,
            observaciones: r.observaciones
        }
        // if (registro.tagHexa) {
        //     // procesamos tags hexadecimales
        //     l.tag = convTagHexa(r.tag);
        // }
        descarga.lecturas.push(l);
    }
    return descarga;
}

var convTagHexa = function (tag) {
    var right8 = tag.substr(tag.length - 8);
    var tagDecimal = parseInt(right8, 16);
    var tag10Str = "0000000000" + tagDecimal;
    return tag10Str.substr(tag10Str.length - 10);
}

// Verifica TAG
// Conmprueba si el tag leido corresponde a una roda, vigilante o punto
// devuelve una cadena con el tipo y el identificador del registro en la base de datos.
// VIGIN, VIGFN (Vigilante inicio y final)
// RNDIN, RDNFN (Ronda inicio y final)
// PUNTO (Punto)
function verificaTAG(tag, callback_serie) {
    async.series([
        function (callback) {
            vigilanteDb.getVigilantesBuscarTag(tag, function (err, result) {
                if (err) {
                    callback(err, null);
                    return;
                }
                if (result.length == 0) {
                    callback(null, null);
                    return;
                }
                var vigilante = result[0];
                var tipo = "VIGILANTE";
                if (vigilante.tagf && tag == vigilante.tagf) {
                    tipo = "VIGILANTEF";
                }
                callback(null, {
                    tipo: tipo,
                    id: vigilante.vigilanteId,
                    nombre: vigilante.nombre
                });
            });
        },
        function (callback) {
            rondaDb.getRondaDetalleTag(tag, function (err, result) {
                if (err) {
                    callback(err, null);
                    return;
                }
                if (!result) {
                    callback(null, null);
                    return;
                }
                var ronda = result;
                var tipo = "RONDA";
                if (ronda.tagf && tag == ronda.tagf) {
                    tipo = "RONDAF";
                }
                callback(null, {
                    tipo: tipo,
                    id: ronda.rondaId,
                    nombre: ronda.nombre
                });
            });
        },
        function (callback) {
            puntoDb.getPuntoTag(tag, function (err, result) {
                if (err) {
                    callback(err, null);
                    return;
                }
                if (!result) {
                    callback(null, null);
                    return;
                }
                var punto = result;
                var tipo = "PUNTO";
                callback(null, {
                    tipo: tipo,
                    id: punto.puntoId,
                    nombre: punto.nombre
                });
            });
        }
    ],
        function (err, results) {
            if (err) {
                callback_serie(err, null);
            }
            var mresult = null;
            for (var i = 0; i < results.length; i++) {
                if (results[i]) {
                    mresult = results[i];
                }
            }
            callback_serie(null, mresult);
        });
}

//--- Montaje para llamada síncrona en los insert
function procesarLecturas(descargaId, tagHexa, lecturas, callback_procesar) {
    var i = 0;
    async.eachSeries(lecturas,
        function (lectura, callback) {
            // -- control TAGHEXA
            if (tagHexa) lectura.tag = convTagHexa(lectura.tag);
            verificaTAG(lectura.tag, function (err, result) {
                if (err) {
                    callback(err);
                    return;
                }
                var fecha = lectura.stamp.substr(0, 4) + "-" + lectura.stamp.substr(4, 2) + "-" + lectura.stamp.substr(6, 2);
                var hora = lectura.stamp.substr(8, 2) + ":" + lectura.stamp.substr(10, 2) + ":" + lectura.stamp.substr(12, 2);
                var descargaLinea = {
                    descargaId: descargaId,
                    tag: lectura.tag,
                    fecha: fecha,
                    hora: hora,
                    tipo: null,
                    tipoId: null,
                    nombre: null
                };
                descargaLinea.descargaId = descargaId;
                if (result) {
                    descargaLinea.tipo = result.tipo;
                    descargaLinea.tipoId = result.id;
                    descargaLinea.nombre = result.nombre;
                }
                lectura.fecha = fecha;
                lectura.hora = hora;
                lectura.tipo = descargaLinea.tipo;
                lectura.tipoId = descargaLinea.tipoId;
                lectura.nombre = descargaLinea.nombre;
                var connection = getConnection();
                var sql = "INSERT INTO descargas_lineas SET ?";
                sql = mysql.format(sql, descargaLinea);
                connection.query(sql, function (err, result) {
                    closeConnectionCallback(connection, callback);
                    if (err) {
                        callback(err);
                    } else {
                        callback();
                    }
                });
            });
        },
        function (err) {
            callback_procesar(err)
        });
}

function guardaDescarga(descarga, callback) {
    var connection = getConnection();
    sql = "INSERT INTO descargas SET ?";
    sql = mysql.format(sql, descarga.cabecera);
    connection.query(sql, function (err, result) {
        closeConnectionCallback(connection, callback);
        if (err) {
            callback(err);
            return;
        }
        descarga.cabecera.descargaId = result.insertId;
        //
        var lecturas = descarga.lecturas;
        terminalesDb.getTerminalesBuscar(descarga.cabecera.nterminal, function (err, terms) {
            if (err) return callback(err);
            if (terms.length == 0) return callback(new Error("No se ha encontrado el terminal: " + descarga.cabecera.nterminal));
            var tagHexa = terms[0].tagHexa;
            procesarLecturas(descarga.cabecera.descargaId, tagHexa, lecturas, function (err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, descarga);
            });
        });
    });
}

function guardaDescargaCN50(descarga, callback) {
    var connection = getConnection();
    sql = "INSERT INTO descargas SET ?";
    sql = mysql.format(sql, descarga.cabecera);
    connection.query(sql, function (err, result) {
        closeConnectionCallback(connection, callback);
        if (err) {
            callback(err);
            return;
        }
        descarga.cabecera.descargaId = result.insertId;
        //
        procesarLecturasCN50(descarga.cabecera.descargaId, descarga.lecturas, function (err) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, descarga.cabecera.descargaId);
        });
    });
}


//--- Montaje para llamada síncrona en los insert
function procesarLecturasCN50(descargaId, lecturas, callback_procesar) {
    var i = 0;
    async.eachSeries(lecturas,
        function (lectura, callback) {
            var fecha = moment(lectura.fechaHora).format("YYYY-MM-DD");
            var hora = moment(lectura.fechaHora).format("HH:mm:ss");
            var descargaLinea = {
                descargaId: descargaId,
                tag: lectura.tag,
                fecha: fecha,
                hora: hora,
                tipo: lectura.tipo,
                tipoId: lectura.tipoId,
                nombre: lectura.nombre,
                incidenciaId: lectura.incidenciaId,
                observaciones: lectura.observaciones
            };
            var connection = getConnection();
            var sql = "INSERT INTO descargas_lineas SET ?";
            sql = mysql.format(sql, descargaLinea);
            connection.query(sql, function (err, result) {
                closeConnectionCallback(connection, callback);
                if (err) {
                    callback(err);
                } else {
                    callback();
                }
            });
        },
        function (err) {
            callback_procesar(err)
        });
}

module.exports.getCorregirDescarga = fnGetCorregirDescarga;
var fnGetCorregirDescarga = function (descargaId, callback) {
    var connection = getConnection();
    var sql = ""
    async.waterfall(
        [
            function(cb1) {
                sql = `
                UPDATE descargas_lineas SET tag = CONCAT('0', CONV(SUBSTR(tag,3,8), 16,10)) WHERE descargaId = ${descargaId};
                `;
                connection.query(sql, function (err, result) {
                    if (err) {
                        cb1(err, null);
                        return;
                    }
                    cb1(null);
                });
            },
            function(cb2) {
                sql = `
                UPDATE descargas_lineas AS dl,
                (SELECT
                descargaLineaId, 'VIGILANTE' AS tipo, v.vigilanteId AS tipoId, v.nombre AS nombre
                FROM
                descargas_lineas AS dl
                LEFT JOIN vigilantes AS v ON v.tag = dl.tag
                WHERE dl.descargaId = ${descargaId} AND NOT v.vigilanteId IS NULL) AS vl
                SET dl.tipo = vl.tipo, dl.tipoId = vl.tipoId, dl.nombre = vl.nombre
                WHERE dl.descargaLineaId = vl.descargaLineaId;
                `;
                connection.query(sql, function (err, result) {
                    if (err) {
                        cb2(err, null);
                        return;
                    }
                    cb2(null);
                });
            },
            function(cb3) {
                sql = `
                UPDATE descargas_lineas AS dl,
                (SELECT
                descargaLineaId, 'PUNTO' AS tipo, p.puntoId AS tipoId, p.nombre AS nombre
                FROM
                descargas_lineas AS dl
                LEFT JOIN puntos AS p ON p.tag = dl.tag
                WHERE dl.descargaId = ${descargaId} AND NOT p.puntoId IS NULL) AS pl
                SET dl.tipo = pl.tipo, dl.tipoId = pl.tipoId, dl.nombre = pl.nombre
                WHERE dl.descargaLineaId = pl.descargaLineaId;                
                `;
                connection.query(sql, function (err, result) {
                    if (err) {
                        cb3(err, null);
                        return;
                    }
                    cb3(null);
                });
            },
            function(cb4) {
                sql = `
                UPDATE descargas_lineas AS dl,
                (SELECT
                descargaLineaId, 'RONDA' AS tipo, r.rondaId AS tipoId, r.nombre AS nombre
                FROM
                descargas_lineas AS dl
                LEFT JOIN rondas AS r ON r.tag = dl.tag
                WHERE dl.descargaId = ${descargaId} AND NOT r.rondaId IS NULL) AS rl
                SET dl.tipo = rl.tipo, dl.tipoId = rl.tipoId, dl.nombre = rl.nombre
                WHERE dl.descargaLineaId = rl.descargaLineaId;                
                `;
                connection.query(sql, function (err, result) {
                    if (err) {
                        cb4(err, null);
                        return;
                    }
                    cb4(null);
                });
            }
        ],
        function(err) {
            closeConnectionCallback(connection, callback);
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, 'Ok');
        }
    );
}