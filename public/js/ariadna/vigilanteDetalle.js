/*-------------------------------------------------------------------------- 
vigilanteDetalle.js
Funciones js par la página VigilanteDetalle.html
---------------------------------------------------------------------------*/
var vigilId = 0;

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
    $("#btnTagf").click(tagf());

    $("#frmVigilante").submit(function() {
        return false;
    });

    vigilId = gup('VigilanteId');
    if (vigilId != 0) {
        var data = {
                vigilanteId: vigilId
            }
            // hay que buscar ese elemento en concreto
        $.ajax({
            type: "GET",
            url: myconfig.apiUrl + "/api/vigilantes/" + vigilId,
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
        vm.vigilanteId(0);
    }
}

function admData() {
    var self = this;
    self.vigilanteId = ko.observable();
    self.nombre = ko.observable();
    self.tag = ko.observable();
    self.tagf = ko.observable();
}

function loadData(data) {
    vm.vigilanteId(data.vigilanteId);
    vm.nombre(data.nombre);
    vm.tag(data.tag);
    vm.tagf(data.tagf);
}

function datosOK() {
    $('#frmVigilante').validate({
        rules: {
            txtNombre: {
                required: true
            },
            txtTag: {
                required: true
            }
        },
        // Messages for form validation
        messages: {
            txtNombre: {
                required: 'Introduzca el nombre'
            },
            txtTag: {
                required: 'Introduzca el login'
            }
        },
        // Do not change code below
        errorPlacement: function(error, element) {
            error.insertAfter(element.parent());
        }
    });
    return $('#frmVigilante').valid();
}

function aceptar() {
    var mf = function() {
        if (!datosOK())
            return;
        var data = {
            vigilante: {
                "vigilanteId": vm.vigilanteId(),
                "nombre": vm.nombre(),
                "tag": vm.tag(),
                "tagf": vm.tagf()
            }
        };
        if (vigilId == 0) {
            $.ajax({
                type: "POST",
                url: myconfig.apiUrl + "/api/vigilantes",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function(data, status) {
                    // hay que mostrarlo en la zona de datos
                    loadData(data);
                    // Nos volvemos al general
                    var url = "VigilanteGeneral.html?VigilanteId=" + vm.vigilanteId();
                    window.open(url, '_self');
                },
                error: errorAjax
            });
        } else {
            $.ajax({
                type: "PUT",
                url: myconfig.apiUrl + "/api/vigilantes/" + vigilId,
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function(data, status) {
                    // hay que mostrarlo en la zona de datos
                    loadData(data);
                    // Nos volvemos al general
                    var url = "VigilanteGeneral.html?VigilanteId=" + vm.vigilanteId();
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
        var url = "VigilanteGeneral.html";
        window.open(url, '_self');
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

function tagf() {
    var mf = function () {
        var mens = "Para la leer la etiqueta con el terminal, páselo por él hasta que la luz parpadee, luego pulse 'ACEPTAR'.";
        mens += "<br/> IMPORTANTE: Este proceso borra los datos en el terminal, si tiene rondas pendientes descárgelas antes.";

        $.SmartMessageBox({
            title: "<i class='fa fa-info'></i> Mensaje",
            content: mens,
            buttons: '[Aceptar][Cancelar]'
        }, function (ButtonPressed) {
            if (ButtonPressed === "Aceptar") {
                $("#btnTagf").addClass('fa-spin');
                // -- leer previamente el terminal
                leerNumeroTerminalAmpliado(function (err, term) {
                    if (err) {
                        mostrarMensajeSmart(err.message);
                        $("#btnTagf").removeClass('fa-spin');
                        return;
                    }
                    if (!term) {
                        mostrarMensajeSmart("El terminal no está dado de alta en la base de datos");
                        $("#btnTagf").removeClass('fa-spin');
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
                                $("#btnTagf").removeClass('fa-spin');
                            } else {
                                var lectura = data[data.length - 1];
                                var tag = lectura.tag;
                                if (tagHexa) tag = convTagHexa(tag);
                                vm.tagf(tag);
                                $("#btnTagf").removeClass('fa-spin');
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