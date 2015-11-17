var express = require('express');
var router = express.Router();
var cn50Db = require("./cn50_bridge");
var cn50Sdf = require("./cn50_sdf");



// PostAdministrador
// permite dar de alta un administrador en el CN50
router.post('/administradores', function(req, res) {
    cn50Db.postAdministrador(req.body.administrador, function(err, msg) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(msg);
        }
    });
});

// DeleteAdministradores
// Borra todos los administradores del archivo sdf
router.delete('/administradores', function(req, res) {
    cn50Db.deleteAdministradores(function(err, msg) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(msg);
        }
    });
});

// PostEdificio
// permite dar de alta un edificio en el CN50
router.post('/edificios', function(req, res) {
    cn50Db.postEdificio(req.body.edificio, function(err, msg) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(msg);
        }
    });
});

// DeleteEdificios
// Borra todos los administradores del archivo sdf
router.delete('/edificios', function(req, res) {
    cn50Db.deleteEdificios(function(err, msg) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(msg);
        }
    });
});

// PostGrupo
// permite dar de alta un grupo en el CN50
router.post('/grupos', function(req, res) {
    cn50Db.postGrupo(req.body.grupo, function(err, msg) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(msg);
        }
    });
});

// DeleteGrupos
// Borra todos los grupos del archivo sdf
router.delete('/grupos', function(req, res) {
    cn50Db.deleteGrupos(function(err, msg) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(msg);
        }
    });
});

// PostIncidencia
// permite dar de alta una incidencia en el CN50
router.post('/incidencias', function(req, res) {
    cn50Db.postIncidencia(req.body.incidencia, function(err, msg) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(msg);
        }
    });
});

// DeleteIncidencias
// Borra todos los incidencias del archivo sdf
router.delete('/incidencias', function(req, res) {
    cn50Db.deleteIncidencias(function(err, msg) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(msg);
        }
    });
});

// PostVigilante
// permite dar de alta un vigilante en el CN50
router.post('/vigilantes', function(req, res) {
    cn50Db.postVigilante(req.body.vigilante, function(err, msg) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(msg);
        }
    });
});

// DeleteVigilantes
// Borra todos los vigilantes del archivo sdf
router.delete('/vigilantes', function(req, res) {
    cn50Db.deleteVigilantes(function(err, msg) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(msg);
        }
    });
});

// PostTerminal
// permite dar de alta un terminal en el CN50
router.post('/terminales', function(req, res) {
    cn50Db.postTerminal(req.body.terminal, function(err, msg) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(msg);
        }
    });
});

// DeleteTerminales
// Borra todos los terminales del archivo sdf
router.delete('/terminales', function(req, res) {
    cn50Db.deleteTerminales(function(err, msg) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(msg);
        }
    });
});

// PostPunto
// permite dar de alta un punto en el CN50
router.post('/puntos', function(req, res) {
    cn50Db.postPunto(req.body.punto, function(err, msg) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(msg);
        }
    });
});

// DeletePuntos
// Borra todos los puntos del archivo sdf
router.delete('/puntos', function(req, res) {
    cn50Db.deletePuntos(function(err, msg) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(msg);
        }
    });
});

// PostRonda
// permite dar de alta una ronda en el CN50
router.post('/rondas', function(req, res) {
    cn50Db.postRonda(req.body.ronda, function(err, msg) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(msg);
        }
    });
});

// DeleteRondas
// Borra todos los rondas del archivo sdf
router.delete('/rondas', function(req, res) {
    cn50Db.deleteRondas(function(err, msg) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(msg);
        }
    });
});

// PostRondaPunto
// permite dar de alta una punto de ronda en el CN50
router.post('/rondaspuntos', function(req, res) {
    cn50Db.postRondaPunto(req.body.rondaPunto, function(err, msg) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(msg);
        }
    });
});

// DeleteRondasPuntos
// Borra todos los rondaspuntos del archivo sdf
router.delete('/rondaspuntos', function(req, res) {
    cn50Db.deleteRondasPuntos(function(err, msg) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(msg);
        }
    });
});


// PostCreateSDF
// permite crear fichero SDF y exportar todos los datos de la base;
router.post('/createsdf', function(req, res) {
    cn50Sdf.createSDF(function(err, msg) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(msg);
        }
    });
});

// Exports
module.exports = router;