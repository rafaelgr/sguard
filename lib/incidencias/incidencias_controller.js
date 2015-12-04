var express = require('express');
var router = express.Router();
var incidenciasDb = require("./incidencias_db_mysql");

// GetIncidencias
// Devuelve una lista de objetos con todos los incidencias de la 
// base de datos.
// Si en la url se le pasa un nombre devuelve aquellos incidencias
// que lo contengan.
router.get('/', function (req, res) {
    var nombre = req.query.nombre;
    if (nombre) {
        incidenciasDb.getIncidenciasBuscar(nombre, function (err, incidencias) {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.json(incidencias);
            }
        });

    } else {
        incidenciasDb.getIncidencias(function (err, incidencias) {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.json(incidencias);
            }
        });
    }
});

// GetIncidencia
// devuelve el incidencia con el id pasado
router.get('/:incidenciaId', function (req, res) {
    incidenciasDb.getIncidencia(req.params.incidenciaId, function (err, incidencia) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            if (incidencia == null) {
                res.status(404).send("Incidencia no encontrado");
            } else {
                res.json(incidencia);
            }
        }
    });
});

// GetIncidenciaBuscarGrupo
// devuelve los incidencias del grupo pasado
router.get('/grupos/:grupoId', function (req, res) {
    incidenciasDb.getIncidenciasBuscarGrupo(req.params.grupoId, function (err, incidencia) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            if (incidencia == null) {
                res.status(404).send("Incidencia no encontrado");
            } else {
                res.json(incidencia);
            }
        }
    });
});


// PostIncidencia
// permite dar de alta un incidencia
router.post('/', function (req, res) {
    incidenciasDb.postIncidencia(req.body.incidencia, function (err, incidencia) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(incidencia);
        }
    });
});



// PutIncidencia
// modifica el incidencia con el id pasado
router.put('/:incidenciaId', function (req, res) {
    // antes de modificar comprobamos que el objeto existe
    incidenciasDb.getIncidencia(req.params.incidenciaId, function (err, incidencia) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            if (incidencia == null) {
                res.status(404).send("Incidencia no encontrado");
            } else {
                // ya sabemos que existe y lo intentamos modificar.
                incidenciasDb.putIncidencia(req.params.incidenciaId, req.body.incidencia, function (err, incidencia) {
                    if (err) {
                        res.status(500).send(err.message);
                    } else {
                        res.json(incidencia);
                    }
                });
            }
        }
    });
});

// DeleteIncidencia
// elimina un incidencia de la base de datos
router.delete('/:incidenciaId', function (req, res) {
    var incidencia = req.body.incidencia;
    incidenciasDb.deleteIncidencia(req.params.incidenciaId, incidencia, function (err, incidencia) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(null);
        }
    });
});

// Exports
module.exports = router;