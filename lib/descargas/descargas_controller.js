var express = require('express');
var router = express.Router();
var descargasDb = require("./descargas_db_mysql");

// GetDescarga del terminal
router.get('/leer-terminal', function(req, res) {
    descargasDb.getDescargaDelTerminal(function(err, result) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(result);
        }
    });
});

// GetDescarga del terminal
router.get('/leer-descarga/:descargaId', function(req, res) {
    descargasDb.getDescargaDetalle(req.params.descargaId, function(err, result) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(result);
        }
    });
});

// Corregir las descargas en el terminal
router.get('/corregir-descarga/:descargaId', function(req, res) {
    descargasDb.getCorregirDescarga(req.params.descargaId, function(err, result) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(result);
        }
    });
});

// Actualizar el número de terminal en la descarga
router.put('/', function(req, res) {
    var descargaId = req.body.descargaId;
    var nterminal = req.body.nterminal;
    descargasDb.putDescarga(descargaId, nterminal, function(err, result) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(result);
        }
    });
});

// GetDescarga del terminal CN50
router.post('/leer-descargaCN50', function(req, res) {
    var nterminal = req.body.nterminal;
    var lecturas = req.body.lecturas;
    if (!nterminal || !lecturas){
        res.status(400).send("Error de formato");
        return;
    }
    descargasDb.getDescargasDeCN50(nterminal, lecturas, function(err, result) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(result);
        }
    });
});



// Procesar descarga general
router.get('/procesar-descarga/:descargaId', function(req, res) {
    descargasDb.procesarDescarga(req.params.descargaId, function(err, result) {
        if (err) {
            res.status(500).send(err.message);
            return;
        } else {
            var resf = result;
            res.json(resf);
            // --> CAMBIO DEAD LOCK
            // descargasDb.actualizarUltimoControl(function(err, result){
            //     if (err){
            //         res.status(500).send(err.message);
            //         return;
            //     }
            //     res.json(resf);
            // })
        }
    });
});


router.get('/', function(req, res) {
    var numero = req.query.numero;
    if (numero) {
        descargasDb.getDescargasBuscar(numero, function(err, descargas) {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.json(descargas);
            }
        });

    } else {
        descargasDb.getDescargas(function(err, descargas) {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.json(descargas);
            }
        });
    }
});

// Exports
module.exports = router;
