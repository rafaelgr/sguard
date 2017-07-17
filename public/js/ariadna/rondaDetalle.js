/*-------------------------------------------------------------------------- 
rondaDetalle.js
Funciones js par la página RondaDetalle.html
---------------------------------------------------------------------------*/
var responsiveHelper_dt_basic = undefined;
var responsiveHelper_datatable_fixed_column = undefined;
var responsiveHelper_datatable_col_reorder = undefined;
var responsiveHelper_datatable_tabletools = undefined;

var dataPuntos;

var breakpointDefinition = {
    tablet: 1024,
    phone: 480
};

var rondId = 0;

function initForm() {
    comprobarLogin();
    // de smart admin
    pageSetUp();
    // 
    getVersionFooter();
    vm = new admData();
    ko.applyBindings(vm);
    // asignación de eventos al clic
    $("#btnInforme").click(aceptarPDF());
    $("#btnAceptar").click(aceptar());
    $("#btnSalir").click(salir());
    $("#btnAgregar").click(agregarPunto());

    $("#btnTag").click(tag());
    $("#btnTagf").click(tagf());

    $("#frmRonda").submit(function () {
        return false;
    });
    $("#frmRondaPuntos").submit(function () {
        return false;
    });

    $("#cmbGrupos").change(cambioGrupo());
    $("#cmbEdificios").change(cambioEdificio());

    // prepara validación del form
    prepareValidateRondaPuntos();


    //
    loadPosiblesGrupos();

    // inicializar la tabla asociada.
    initTablaPuntos();

    rondId = gup('RondaId');
    if (rondId != 0) {
        var data = {
            rondaId: rondId
        }
        // hay que buscar ese elemento en concreto
        $.ajax({
            type: "GET",
            url: myconfig.apiUrl + "/api/rondas/detalle/" + rondId,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data, status) {
                // hay que mostrarlo en la zona de datos
                loadData(data);
            },
            error: errorAjax
        });
    } else {
        // se trata de un alta ponemos el id a cero para indicarlo.
        vm.rondaId(0);
        // ocultamos de momento el detalle de puntos
        $("#datosPuntos").hide();
    }
}

function admData() {
    var self = this;
    self.rondaId = ko.observable();
    self.nombre = ko.observable();
    self.puntos = ko.observableArray([]);
    self.tag = ko.observable();
    self.tagf = ko.observable();
    self.mintime = ko.observable();
    self.maxtime = ko.observable();
    self.csnmax = ko.observable();
    self.csnmargen = ko.observable();
    self.lastcontrol = ko.observable();
    // -- soporte combos
    self.posiblesPuntos = ko.observableArray();
    self.punto = ko.observable();
    self.posiblesGrupos = ko.observableArray([]);
    self.grupo = ko.observable();
    self.posiblesEdificios = ko.observableArray([]);
    self.edificio = ko.observable();

    // -- del from de punto
    self.orden = ko.observable();

    //
    self.linea1 = ko.observable();
    self.linea2 = ko.observable();
    self.linea3 = ko.observable();
    self.firmante = ko.observable();
}

function loadData(data) {
    vm.rondaId(data.rondaId);
    vm.nombre(data.nombre);
    vm.puntos(data.puntos);
    vm.tag(data.tag);
    vm.tagf(data.tagf);
    vm.mintime(data.mintime);
    vm.maxtime(data.maxtime);
    vm.csnmax(data.csnmax);
    vm.csnmargen(data.csnmargen);
    if (data.lastcontrol) vm.lastcontrol(moment(data.lastcontrol).format('DD/MM/YYYY HH:mm:ss'));
    loadTablaPuntos(data.puntos);
}

function loadPosiblesPuntos(id, edificioId) {
    if (edificioId) {
        $.ajax({
            type: "GET",
            url: myconfig.apiUrl + "/api/puntos/edificios/" + edificioId,
            dataType: "json",
            contentType: "application/json",
            success: function (data, status) {
                // hay que mostrarlo en la zona de datos
                vm.posiblesPuntos(data);
            },
            error: errorAjax
        });
    } else {
        $.ajax({
            type: "GET",
            url: myconfig.apiUrl + "/api/puntos",
            dataType: "json",
            contentType: "application/json",
            success: function (data, status) {
                // hay que mostrarlo en la zona de datos
                vm.posiblesPuntos(data);
                for (var i = 0; i < data.length; i++) {
                    if (data[i].puntoId == id) {
                        vm.punto(data[i]);
                    }
                }
            },
            error: errorAjax
        });
    }
}

function loadPosiblesGrupos(id) {
    $.ajax({
        type: "GET",
        url: myconfig.apiUrl + "/api/grupos",
        dataType: "json",
        contentType: "application/json",
        success: function (data, status) {
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
            success: function (data, status) {
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
            success: function (data, status) {
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
    var mf = function () {
        loadPosiblesEdificios(0, vm.grupo().grupoId);
    }
    return mf;
}

function cambioEdificio() {
    var mf = function () {
        loadPosiblesPuntos(0, vm.edificio().edificioId);
    }
    return mf;
}

function prepareValidateRondaPuntos() {
    var opciones = {
        rules: {
            cmbPuntos: {
                required: true
            },
            txtOrden: {
                required: true,
                min: 1,
                max: 999,
                number: true,
                digits: true
            }
        },
        // Messages for form validation
        messages: {
            cmbPuntos: {
                required: 'Elija un punto de control'
            },
            txtOrden: {
                required: 'Necesita un numero de orden',
                digits: 'Solo números, sin decimales'
            }
        },

        // Do not change code below
        errorPlacement: function (error, element) {
            error.insertAfter(element.parent());
        }
    };
    $("#frmRondaPuntos").validate(opciones);
}

function rondaPuntosOk() {
    var opciones = $("#frmRondaPuntos").validate().settings;
    if (vm.punto()) {
        opciones.rules.cmbPuntos.required = false;
    } else {
        opciones.rules.cmbPuntos.required = true;
    }
    return $("#frmRondaPuntos").valid();
}

function initTablaPuntos() {
    tablaCarro = $('#dt_rondapuntos').dataTable({
        autoWidth: true,
        preDrawCallback: function () {
            // Initialize the responsive datatables helper once.
            if (!responsiveHelper_dt_basic) {
                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#dt_rondapuntos'), breakpointDefinition);
            }
        },
        rowCallback: function (nRow) {
            responsiveHelper_dt_basic.createExpandIcon(nRow);
        },
        drawCallback: function (oSettings) {
            responsiveHelper_dt_basic.respond();
        },
        language: {
            processing: "Procesando...",
            info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
            infoFiltered: "(filtrado de un total de _MAX_ registros)",
            infoPostFix: "",
            loadingRecords: "Cargando...",
            zeroRecords: "No se encontraron resultados",
            emptyTable: "Ningún dato disponible en esta tabla",
            paginate: {
                first: "Primero",
                previous: "Anterior",
                next: "Siguiente",
                last: "Último"
            },
            aria: {
                sortAscending: ": Activar para ordenar la columna de manera ascendente",
                sortDescending: ": Activar para ordenar la columna de manera descendente"
            }
        },
        data: dataPuntos,
        columns: [{
            data: "orden"
        }, {
            data: "nombre"
        }, {
            data: "rondaPuntoId",
            render: function (data, type, row) {
                var bt1 = "<button class='btn btn-circle btn-danger btn-lg' onclick='deletePuntoRonda(";
                bt1 += data + ", " + row.rondaId + "," + row.orden + ");'";
                bt1 += " title='Eliminar registro'> <i class='fa fa-trash-o fa-fw'></i> </button>";
                var html = "<div class='pull-right'>" + bt1 + "</div>";
                return html;
            }
        }]
    });
}

function loadTablaPuntos(data) {
    var dt = $('#dt_rondapuntos').dataTable();
    if (data !== null && data.length === 0) {
        //mostrarMensajeSmart('No se han encontrado registros');
        //$("#tbAsgObjetivoPA").hide();
        dt.fnClearTable();
        dt.fnDraw();
    } else {
        dt.fnClearTable();
        dt.fnAddData(data);
        dt.fnDraw();
    }
}

function deletePuntoRonda(id, rondaId, orden) {
    // mensaje de confirmación
    var mens = "¿Realmente desea borrar este registro?";
    $.SmartMessageBox({
        title: "<i class='fa fa-info'></i> Mensaje",
        content: mens,
        buttons: '[Aceptar][Cancelar]'
    }, function (ButtonPressed) {
        if (ButtonPressed === "Aceptar") {
            var data = {
                objetivoId: id
            };
            $.ajax({
                type: "DELETE",
                url: myconfig.apiUrl + "/api/rondas/puntos/" + id + "/" + rondaId + "/" + orden,
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (data, status) {
                    // -- hay que ver como recargar la tabla
                    refrescarTablaPuntos(vm.rondaId())
                },
                error: errorAjax
            });
        }
        if (ButtonPressed === "Cancelar") {
            // no hacemos nada (no quiere borrar)
        }
    });
}


function datosOK() {
    $('#frmRonda').validate({
        rules: {
            txtNombre: {
                required: true
            },
            txtOrden: {
                required: true,
                number: true,
                digits: true
            },
            txtMinTime: {
                number: true,
                digits: true
            },
            txtMaxTime: {
                number: true,
                digits: true
            }
        },
        // Messages for form validation
        messages: {
            txtNombre: {
                required: 'Introduzca el nombre'
            },
            txtMinTime: {
                number: "Introduzca un valor numérico válido"
            },
            txtMaxTime: {
                number: "Introduzca un valor numérico válido"
            }
        },
        // Do not change code below
        errorPlacement: function (error, element) {
            error.insertAfter(element.parent());
        }
    });
    return $('#frmRonda').valid();
}

function aceptar() {
    var mf = function () {
        if (!datosOK())
            return;
        var data = {
            ronda: {
                "rondaId": vm.rondaId(),
                "nombre": vm.nombre(),
                "tag": vm.tag(),
                "tagf": vm.tagf(),
                "mintime": vm.mintime(),
                "maxtime": vm.maxtime(),
                "csnmax": vm.csnmax(),
                "csnmargen": vm.csnmargen()
            }
        };
        if (vm.mintime() == "") data.ronda.mintime = null;
        if (vm.maxtime() == "") data.ronda.maxtime = null;
        if (rondId == 0) {
            $.ajax({
                type: "POST",
                url: myconfig.apiUrl + "/api/rondas",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (data, status) {
                    // Recargamos para que pueda meter puntos
                    var url = "RondaDetalle.html?RondaId=" + data.rondaId;
                    window.open(url, '_self');
                },
                error: errorAjax
            });
        } else {
            $.ajax({
                type: "PUT",
                url: myconfig.apiUrl + "/api/rondas/" + rondId,
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (data, status) {
                    // Nos volvemos al general
                    var url = "RondaGeneral.html?RondaId=" + vm.rondaId();
                    window.open(url, '_self');
                },
                error: errorAjax
            });
        }
    };
    return mf;
}

function salir() {
    var mf = function () {
        var url = "RondaGeneral.html";
        window.open(url, '_self');
    }
    return mf;
}

function agregarPunto() {
    var mf = function () {
        if (!rondaPuntosOk()) return;
        // primero verificamos si ya hay un punto con ese orden
        $.ajax({
            type: "GET",
            url: myconfig.apiUrl + "/api/rondas/puntos/" + rondId + "/" + vm.orden(),
            dataType: "json",
            contentType: "application/json",
            success: function (data, status) {
                if (data == null) {
                    agregarPuntoRonda();
                } else {
                    var mens = "Ya existe un punto con el orden " + vm.orden() + ".";
                    mens += "<br/> ¿Quiere darlo de alta renumerando el " + vm.orden() + " y posteriores?";

                    $.SmartMessageBox({
                        title: "<i class='fa fa-info'></i> Mensaje",
                        content: mens,
                        buttons: '[Aceptar][Cancelar]'
                    }, function (ButtonPressed) {
                        if (ButtonPressed === "Aceptar") {
                            agregarPuntoRonda();
                        }
                    });
                }

            },
            error: errorAjax
        });
    }
    return mf;
}

agregarPuntoRonda = function () {
    data = {
        puntoRonda: {
            rondaId: rondId,
            orden: vm.orden(),
            puntoId: vm.punto().puntoId
        }
    };
    $.ajax({
        type: "POST",
        url: myconfig.apiUrl + "/api/rondas/puntos",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (data, status) {
            // hay que mostrarlo en la zona de datos
            // solucion brutal (hay que cambiarla)
            refrescarTablaPuntos(vm.rondaId());
            // limpiar los campos
            vm.orden(null);
        },
        error: errorAjax
    });
};

function refrescarTablaPuntos(id) {
    $.ajax({
        type: "GET",
        url: myconfig.apiUrl + "/api/rondas/detalle/" + id,
        dataType: "json",
        contentType: "application/json",
        success: function (data, status) {
            // refresca tabla
            loadTablaPuntos(data.puntos);
        },
        error: errorAjax
    });
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


function aceptarPDF() {
    var mf = function () {

        $.ajax({
            type: "GET",
            url: myconfig.apiUrl + "/api/informes/rondas/plantilla/?rondaId=" + vm.rondaId(),
            dataType: "json",
            contentType: "application/json",
            success: function (data, status) {
                // hay que mostrarlo en la zona de datos
                // vm.asignaciones(data);
                if (data.puntos.length == 0) {
                    mostrarMensajeSmart("No se puede mostrar la plantilla. Verifique que la ronda está dada de alta y tiene puntos asignados");
                } else {
                    informePDF(data);
                }

            },
            error: errorAjax
        });
    }
    return mf;
}

function informePDF(data) {
    // incluir las nuevas líneas
    data.linea1 = vm.linea1();
    data.linea2 = vm.linea2();
    data.linea3 = vm.linea3();
    data.firmante = vm.firmante();
    data.fechaInforme = moment(new Date()).format('DD/MM/YYYY HH:mm');
    var data = {
        "template": {
            "shortid": "4y8Nlq0Xl"
        },
        "data": data
    }
    f_open_post("POST", myconfig.reportUrl + "/api/report", data);
}

var f_open_post = function (verb, url, data, target) {
    var form = document.createElement("form");
    form.action = url;
    form.method = verb;
    form.target = target || "_blank";
    //if (data) {
    //    for (var key in data) {
    //        var input = document.createElement("textarea");
    //        input.name = key;
    //        input.value = typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key];
    //        form.appendChild(input);
    //    }
    //}
    var input = document.createElement("textarea");
    input.name = "template[shortid]";
    input.value = data.template.shortid;
    form.appendChild(input);

    input = document.createElement("textarea");
    input.name = "data";
    input.value = JSON.stringify(data.data);
    form.appendChild(input);

    form.style.display = 'none';
    document.body.appendChild(form);
    form.submit();
};

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