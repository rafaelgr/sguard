// administradores_db_mysql
// Manejo de la tabla administradores en la base de datos
var async = require("async"); // librería para el manejo de llamadas asíncronas en JS
var cn50Bridge = require('./cn50_bridge.js');
var administradoresDb = require('../administradores/administradores_db_mysql');
var edificiosDb = require('../edificios/edificios_db_mysql');
var gruposDb = require('../grupos/grupos_db_mysql');
var incidenciasDb = require('../incidencias/incidencias_db_mysql');
var puntosDb = require('../puntos/puntos_db_mysql');
var rondasDb = require('../rondas/rondas_db_mysql');
var terminalesDb = require('../terminales/terminales_db_mysql');
var vigilantesDb = require('../vigilantes/vigilantes_db_mysql');


module.exports.createSDF = function(callback) {
    async.series({
        administradores: function(c2) {
        	fnCargarAdministradores(c2);
        },
        edificios: function(c2){
        	fnCargarEdificios(c2);
        },
        grupos: function(c2){
            fnCargarGrupos(c2);
        },
        incidencias: function(c2){
            fnCargarIncidencias(c2);
        },
        puntos: function(c2){
            fnCargarPuntos(c2);
        },
        rondas: function(c2){
            fnCargarRondas(c2);
        },
        rondaspuntos: function(c2){
            fnCargarRondasPuntos(c2);
        },
        terminales: function(c2){
            fnCargarTerminales(c2);
        },
        vigilantes: function(c2){
            fnCargarVigilantes(c2);
        }

    }, function(err, result) {
    	if (err){
    		callback(err);
    		return;
    	}
    	callback(null, "OK");
    })

}

var fnCargarAdministradores = function(callback) {
    // procesar los administradoresDb
    administradoresDb.getAdministradores(function(err, administradores) {
        if (err) {
            callback(err);
            return;
        }
        async.eachSeries(administradores,
            function(adm, callback2) {
                // procesar un administrador
                cn50Bridge.postAdministrador(adm, function(err, result) {
                    if (err) {
                        callback2(err);
                        return;
                    } else {
                        callback2();
                    }
                });
            },
            function(err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback();
            });
    })
};

var fnCargarEdificios = function(callback) {
    // procesar los edificios
    edificiosDb.getEdificios(function(err, edificios) {
        if (err) {
            callback(err);
            return;
        }
        async.eachSeries(edificios,
            function(edif, callback2) {
                // procesar un administrador
                cn50Bridge.postEdificio(edif, function(err, result) {
                    if (err) {
                        callback2(err);
                        return;
                    } else {
                        callback2();
                    }
                });
            },
            function(err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback();
            });
    })
};

var fnCargarGrupos = function(callback) {
    // procesar los edificios
    gruposDb.getGrupos(function(err, grupos) {
        if (err) {
            callback(err);
            return;
        }
        async.eachSeries(grupos,
            function(grp, callback2) {
                // procesar un administrador
                cn50Bridge.postGrupo(grp, function(err, result) {
                    if (err) {
                        callback2(err);
                        return;
                    } else {
                        callback2();
                    }
                });
            },
            function(err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback();
            });
    })
};

var fnCargarIncidencias = function(callback) {
    // procesar las incidencias
    incidenciasDb.getIncidencias(function(err, incidencias) {
        if (err) {
            callback(err);
            return;
        }
        async.eachSeries(incidencias,
            function(inci, callback2) {
                // procesar un administrador
                cn50Bridge.postIncidencia(inci, function(err, result) {
                    if (err) {
                        callback2(err);
                        return;
                    } else {
                        callback2();
                    }
                });
            },
            function(err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback();
            });
    })
};

var fnCargarPuntos = function(callback) {
    // procesar los puntos
    puntosDb.getPuntos(function(err, puntos) {
        if (err) {
            callback(err);
            return;
        }
        async.eachSeries(puntos,
            function(p, callback2) {
                // procesar un administrador
                cn50Bridge.postPunto(p, function(err, result) {
                    if (err) {
                        callback2(err);
                        return;
                    } else {
                        callback2();
                    }
                });
            },
            function(err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback();
            });
    })
};

var fnCargarRondas = function(callback) {
    // procesar las rondas
    rondasDb.getRondas(function(err, rondas) {
        if (err) {
            callback(err);
            return;
        }
        async.eachSeries(rondas,
            function(r, callback2) {
                // procesar una ronda
                cn50Bridge.postRonda(r, function(err, result) {
                    if (err) {
                        callback2(err);
                        return;
                    } else {
                        callback2();
                    }
                });
            },
            function(err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback();
            });
    })
};

var fnCargarRondasPuntos = function(callback) {
    // procesar las rondas
    rondasDb.getRondasPuntos(function(err, rondaspuntos) {
        if (err) {
            callback(err);
            return;
        }
        async.eachSeries(rondaspuntos,
            function(rp, callback2) {
                // procesar una ronda
                cn50Bridge.postRondaPunto(rp, function(err, result) {
                    if (err) {
                        callback2(err);
                        return;
                    } else {
                        callback2();
                    }
                });
            },
            function(err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback();
            });
    })
};

var fnCargarTerminales = function(callback) {
    // procesar los terminales
    terminalesDb.getTerminales(function(err, terminales) {
        if (err) {
            callback(err);
            return;
        }
        async.eachSeries(terminales,
            function(t, callback2) {
                // procesar una ronda
                cn50Bridge.postTerminal(t, function(err, result) {
                    if (err) {
                        callback2(err);
                        return;
                    } else {
                        callback2();
                    }
                });
            },
            function(err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback();
            });
    })
};

var fnCargarVigilantes = function(callback) {
    // procesar los vigilantes
    vigilantesDb.getVigilantes(function(err, vigilantes) {
        if (err) {
            callback(err);
            return;
        }
        async.eachSeries(vigilantes,
            function(v, callback2) {
                // procesar un vigilante
                cn50Bridge.postVigilante(v, function(err, result) {
                    if (err) {
                        callback2(err);
                        return;
                    } else {
                        callback2();
                    }
                });
            },
            function(err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback();
            });
    })
};