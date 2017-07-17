/*-------------------------------------------------------------------------- 
puntoDetalle.js
Funciones js par la página PuntoDetalle.html
---------------------------------------------------------------------------*/
var puntId = 0;

function initForm() {
    comprobarLogin();
    // de smart admin
    pageSetUp();
    // 
    getVersionFooter();
    vm = new admData();
    ko.applyBindings(vm);
    // asignación de eventos al clic
    $("#btnAceptar").click(aceptar());
    $("#btnSalir").click(salir());
    $("#btnTag").click(tag());
    $("#frmPunto").submit(function() {
        return false;
    });

    loadPosiblesGrupos();


    $("#cmbGrupos").change(cambioGrupo());

    puntId = gup('PuntoId');
    if (puntId != 0) {
        var data = {
                puntoId: puntId
            }
            // hay que buscar ese elemento en concreto
        $.ajax({
            type: "GET",
            url: myconfig.apiUrl + "/api/puntos/" + puntId,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function(data, status) {
                // hay que mostrarlo en la zona de datos
                loadData(data);
            },
            error: errorAjax
        });
    } else {
        // se trata de un alta ponemos el id a cero para indicarlo.
        vm.puntoId(0);
    }
}

function admData() {
    var self = this;
    self.puntoId = ko.observable();
    self.nombre = ko.observable();
    self.tag = ko.observable();
    self.bloque = ko.observable();
    self.edificioId = ko.observable();
    self.cota = ko.observable();
    self.cubiculo = ko.observable();
    self.zonaFuego = ko.observable();
    self.observaciones = ko.observable();
    self.csnmax = ko.observable();
    self.csnmargen = ko.observable();
    self.lastcontrol = ko.observable();
    // -- apoyo de combos
    self.posiblesGrupos = ko.observableArray([]);
    self.grupo = ko.observable();
    self.posiblesEdificios = ko.observableArray([]);
    self.edificio = ko.observable();
}

function loadData(data) {
    vm.puntoId(data.puntoId);
    vm.edificioId(data.edificioId);
    loadPosiblesGrupos(data.grupoId)
    loadPosiblesEdificios(data.edificioId);
    vm.nombre(data.nombre);
    vm.tag(data.tag);
    vm.cota(data.cota);
    vm.csnmax(data.csnmax);
    vm.csnmargen(data.csnmargen);
    vm.cubiculo(data.cubiculo);
    vm.zonaFuego(data.zonafuego);
    vm.observaciones(data.observaciones);
    if (data.lastcontrol) vm.lastcontrol(moment(data.lastcontrol).format('DD/MM/YYYY HH:mm:ss'));

    //

}

function datosOK() {
    $('#frmPunto').validate({
        rules: {
            cmbEdificios: {
                required: true
            },
            txtNombre: {
                required: true
            },
            txtTag: {
                required: true
            },
            txtCsnMax:{
                number: true,
                digits: true
            },
            txtCsnMargen:{
                number: true,
                digits: true
            }
        },
        // Messages for form validation
        messages: {
            txtNombre: {
                required: 'Introduzca el nombre'
            },
            txtTag: {
                required: 'Introduzca el login'
            },
            txtCsnMax:{
                number: 'Intrduzca un valor numérico'
            },
            txtCsnMargen:{
                number: 'Intrduzca un valor numérico'
            }
        },
        // Do not change code below
        errorPlacement: function(error, element) {
            error.insertAfter(element.parent());
        }
    });
    var opciones = $("#frmPunto").validate().settings;
    if (vm.edificio()) {
        opciones.rules.cmbEdificios.required = false;
    } else {
        opciones.rules.cmbEdificios.required = true;
    }
    return $('#frmPunto').valid();
}

function aceptar() {
    var mf = function() {
        if (!datosOK())
            return;
        var data = {
            punto: {
                "puntoId": vm.puntoId(),
                "nombre": vm.nombre(),
                "edificioId": vm.edificio().edificioId,
                "tag": vm.tag(),
                "cota": vm.cota(),
                "cubiculo": vm.cubiculo(),
                "zonafuego": vm.zonaFuego(),
                "observaciones": vm.observaciones(),
                "csnmax": vm.csnmax(),
                "csnmargen": vm.csnmargen()
            }
        };
        if (data.punto.csnmax == "") data.punto.csnmax = null;
        if (data.punto.csnmargen == "") data.punto.csnmargen = null;
        if (puntId == 0) {
            $.ajax({
                type: "POST",
                url: myconfig.apiUrl + "/api/puntos",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function(data, status) {
                    // hay que mostrarlo en la zona de datos
                    loadData(data);
                    // Nos volvemos al general
                    var url = "PuntoControlGeneral.html?PuntoId=" + vm.puntoId();
                    window.open(url, '_self');
                },
                error: errorAjax
            });
        } else {
            $.ajax({
                type: "PUT",
                url: myconfig.apiUrl + "/api/puntos/" + puntId,
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function(data, status) {
                    // hay que mostrarlo en la zona de datos
                    loadData(data);
                    // Nos volvemos al general
                    var url = "PuntoControlGeneral.html?PuntoId=" + vm.puntoId();
                    window.open(url, '_self');
                },
                error: errorAjax
            });
        }
    };
    return mf;
}

function salir() {
    var mf = function() {
        var url = "PuntoControlGeneral.html";
        window.open(url, '_self');
    }
    return mf;
}

function loadPosiblesGrupos(id) {
    $.ajax({
        type: "GET",
        url: myconfig.apiUrl + "/api/grupos",
        dataType: "json",
        contentType: "application/json",
        success: function(data, status) {
            // hay que mostrarlo en la zona de datos
            vm.posiblesGrupos(data);
            if (id) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].grupoId == id) {
                        vm.grupo(data[i]);
                    }
                }
            }
        },

        error: errorAjax
    });
}

function loadPosiblesEdificios(id, grupoId) {
    if (grupoId) {
        $.ajax({
            type: "GET",
            url: myconfig.apiUrl + "/api/edificios/grupos/" + grupoId,
            dataType: "json",
            contentType: "application/json",
            success: function(data, status) {
                // hay que mostrarlo en la zona de datos
                vm.posiblesEdificios(data);
            },
            error: errorAjax
        });
    } else {
        $.ajax({
            type: "GET",
            url: myconfig.apiUrl + "/api/edificios",
            dataType: "json",
            contentType: "application/json",
            success: function(data, status) {
                // hay que mostrarlo en la zona de datos
                vm.posiblesEdificios(data);
                if (id) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].edificioId == id) {
                            vm.edificio(data[i]);
                        }
                    }
                }
            },
            error: errorAjax
        });
    }
}

function cambioGrupo() {
    var mf = function() {
        loadPosiblesEdificios(0, vm.grupo().grupoId);
    }
    return mf;
}

function tag_old() {
    var mf = function() {
        var mens = "Para la leer la etiqueta con el terminal, páselo por él hasta que la luz parpadee, luego pulse 'ACEPTAR'.";
        mens += "<br/> IMPORTANTE: Este proceso borra los datos en el terminal, si tiene rondas pendientes descárgelas antes.";

        $.SmartMessageBox({
            title: "<i class='fa fa-info'></i> Mensaje",
            content: mens,
            buttons: '[Aceptar][Cancelar]'
        }, function(ButtonPressed) {
            if (ButtonPressed === "Aceptar") {
                $("#btnTag").addClass('fa-spin');
                $.ajax({
                    type: "GET",
                    url: myconfig.apiUrl + "/api/terminal/records",
                    dataType: "json",
                    contentType: "application/json",
                    success: function(data, status) {
                        if (data.length == 0) {
                            mostrarMensajeSmart('No hay datos para leer');
                            $("#btnTag").removeClass('fa-spin');
                        } else {
                            var lectura = data[data.length - 1];
                            vm.tag(lectura.tag);
                            $("#btnTag").removeClass('fa-spin');
                            $.ajax({
                                type: "DELETE",
                                url: myconfig.apiUrl + "/api/terminal/records",
                                dataType: "json",
                                contentType: "application/json",
                                success: function(data, status) {},
                                error: errorAjax
                            });
                        }
                    },
                    error: errorAjax
                });
            }
        });
    }
    return mf;
}

function tag() {
    var mf = function () {
        var mens = "Para la leer la etiqueta con el terminal, páselo por él hasta que la luz parpadee, luego pulse 'ACEPTAR'.";
        mens += "<br/> IMPORTANTE: Este proceso borra los datos en el terminal, si tiene rondas pendientes descárgelas antes.";

        $.SmartMessageBox({
            title: "<i class='fa fa-info'></i> Mensaje",
            content: mens,
            buttons: '[Aceptar][Cancelar]'
        }, function (ButtonPressed) {
            if (ButtonPressed === "Aceptar") {
                $("#btnTag").addClass('fa-spin');
                // -- leer previamente el terminal
                leerNumeroTerminalAmpliado(function (err, term) {
                    if (err) {
                        mostrarMensajeSmart(err.message);
                        $("#btnTag").removeClass('fa-spin');
                        return;
                    }
                    if (!term) {
                        mostrarMensajeSmart("El terminal no está dado de alta en la base de datos");
                        $("#btnTag").removeClass('fa-spin');
                        return;
                    }
                    var tagHexa = term.tagHexa;
                    $.ajax({
                        type: "GET",
                        url: myconfig.apiUrl + "/api/terminal/records",
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data, status) {
                            if (data.length == 0) {
                                mostrarMensajeSmart('No hay datos para leer');
                                $("#btnTag").removeClass('fa-spin');
                            } else {
                                var lectura = data[data.length - 1];
                                var tag = lectura.tag;
                                if (tagHexa) tag = convTagHexa(tag);
                                vm.tag(tag);
                                $("#btnTag").removeClass('fa-spin');
                                $.ajax({
                                    type: "DELETE",
                                    url: myconfig.apiUrl + "/api/terminal/records",
                                    dataType: "json",
                                    contentType: "application/json",
                                    success: function (data, status) { },
                                    error: errorAjax
                                });
                            }
                        },
                        error: errorAjax
                    });
                });
            }
        });
    }
    return mf;
}

var leerNumeroTerminalAmpliado = function (done) {
    // (1) Leer el número de terminal implicado
    // /terminal/read-terminal-number
    $.ajax({
        type: "GET",
        url: myconfig.apiUrl + "/api/terminal/read-terminal-number",
        dataType: "json",
        contentType: "application/json",
        success: function (data, status) {
            var termNum = data;
            $.ajax({
                type: "GET",
                url: myconfig.apiUrl + "/api/terminales/?numero=" + termNum,
                dataType: "json",
                contentType: "application/json",
                success: function (data, status) {
                    if (data.length == 0) {
                        done(null, null);
                    } else {
                        done(null, data[0]);
                    }
                },
                error: function (err) {
                    done(new Error(err.responseText));
                }
            });
        },
        error: function (err) {
            done(new Error(err.responseText));
        }
    });
}

var convTagHexa = function (tag) {
    var right8 = tag.substr(tag.length - 8);
    var tagDecimal = parseInt(right8, 16);
    var tag10Str = "0000000000" + tagDecimal;
    return tag10Str.substr(tag10Str.length - 10);
}
