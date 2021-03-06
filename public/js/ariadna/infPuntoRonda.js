﻿// de blank_ (pruebas)
var chart = null;

function initForm() {
    comprobarLogin();
    // de smart admin
    pageSetUp();
    getVersionFooter();
    $("#frmInforme").submit(function () {
        return false;
    });

    $.validator.addMethod("greaterThan",
        function (value, element, params) {
            var fv = moment(value, "DD/MM/YYYY").format("YYYY-MM-DD");
            var fp = moment($(params).val(), "DD/MM/YYYY").format("YYYY-MM-DD");
            if (!/Invalid|NaN/.test(new Date(fv))) {
                return new Date(fv) >= new Date(fp);
            } else {
                // esto es debido a que permitimos que la segunda fecha nula
                return true;
            }
        }, 'La fecha final debe ser mayor que la inicial.');


    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '&#x3C;Ant',
        nextText: 'Sig&#x3E;',
        currentText: 'Hoy',
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };

    $.datepicker.setDefaults($.datepicker.regional['es']);
    $.validator.addMethod("time24", function (value, element) {
        if (value == "") return true;
        return /^([01]?[0-9]|2[0-3])(:[0-5][0-9]){2}$/.test(value);
    }, "Hora errónea.");


    vm = new admData();
    ko.applyBindings(vm);

    loadPosiblesPuntos();

    $("#cmbPuntos").select2({
        allowClear: true,
        language: {
            errorLoading: function () {
                return "La carga falló";
            },
            inputTooLong: function (e) {
                var t = e.input.length - e.maximum,
                    n = "Por favor, elimine " + t + " car";
                return t == 1 ? n += "ácter" : n += "acteres", n;
            },
            inputTooShort: function (e) {
                var t = e.minimum - e.input.length,
                    n = "Por favor, introduzca " + t + " car";
                return t == 1 ? n += "ácter" : n += "acteres", n;
            },
            loadingMore: function () {
                return "Cargando más resultados…";
            },
            maximumSelected: function (e) {
                var t = "Sólo puede seleccionar " + e.maximum + " elemento";
                return e.maximum != 1 && (t += "s"), t;
            },
            noResults: function () {
                return "No se encontraron resultados";
            },
            searching: function () {
                return "Buscando…";
            }
        }
    });

    // asignación de eventos al clic
    $("#btnAceptar").click(aceptar());

}


function admData() {
    var self = this;
    self.posiblesPuntos = ko.observableArray();
    self.elegidosPuntos = ko.observableArray();
    self.sPuntoId = ko.observable();
    self.punto = ko.observable();
    self.fechaInicio = ko.observable();
    self.fechaFinal = ko.observable();
    self.dHora = ko.observable();
    self.hHora = ko.observable();
    //
    self.linea1 = ko.observable();
    self.linea2 = ko.observable();
    self.linea3 = ko.observable();
    self.firmante = ko.observable();
}


function datosOK() {
    $('#frmInforme').validate({
        rules: {
            cmbPuntos: {
                required: true
            },
            txtFechaInicio: {
                required: true,
                date: true
            },
            txtFechaFinal: {
                required: true,
                date: true,
                greaterThan: "#txtFechaInicio"
            },
            txtHoraInicio: {
                time24: "#txtHoraInicio"
            },
            txtHoraFinal: {
                time24: "#txtHoraFinal"
            }
        },
        // Messages for form validation
        messages: {
            cmbPuntos: {
                required: "Seleccione un punto"
            },
            txtFechaInicio: {
                required: 'Introduzca una fecha inical',
                date: 'Debe ser una fecha válida'
            },
            txtFechaFinal: {
                required: 'Introduzca una fecha final',
                date: 'Debe ser una fecha válida'
            }
        },
        // Do not change code below
        errorPlacement: function (error, element) {
            error.insertAfter(element.parent());
        }
    });
    $.validator.methods.date = function (value, element) {
        return this.optional(element) || moment(value, "DD/MM/YYYY").isValid();
    }
    var opciones = $("#frmInforme").validate().settings;
    if (vm.punto()) {
        opciones.rules.cmbPuntos.required = false;
    } else {
        opciones.rules.cmbPuntos.required = true;
    }
    return $('#frmInforme').valid();
}

function aceptar() {
    var mf = function () {
        if (!datosOK())
            return;
        // control de fechas 
        var fecha1, fecha2;
        if (moment(vm.fechaInicio(), "DD/MM/YYYY").isValid())
            fecha1 = moment(vm.fechaInicio(), "DD/MM/YYYY").format("YYYY-MM-DD");
        if (moment(vm.fechaFinal(), "DD/MM/YYYY").isValid())
            fecha2 = moment(vm.fechaFinal(), "DD/MM/YYYY").format("YYYY-MM-DD");
        var dHora = "*";
        var hHora = "*";
        if (vm.dHora()) {
            dHora = vm.dHora();
        }
        if (vm.hHora()) {
            hHora = vm.hHora();
        }
        // var url =  myconfig.apiUrl + "/api/informes/rondas/punto/?puntoId=" + vm.punto().puntoId + "&dfecha=" + fecha1 + "&hfecha=" + fecha2 + "&dhora=" + dHora + "&hhora=" + hHora;
        // if ($('#chkNoCorrectas').prop('checked')){
        //     url = myconfig.apiUrl + "/api/informes/rondas/punto2/?puntoId=" + vm.punto().puntoId + "&dfecha=" + fecha1 + "&hfecha=" + fecha2 + "&dhora=" + dHora + "&hhora=" + hHora;         
        // }        
        var url = myconfig.apiUrl + "/api/informes/rondas/punto3/?puntos=" + vm.elegidosPuntos() + "&dfecha=" + fecha1 + "&hfecha=" + fecha2 + "&dhora=" + dHora + "&hhora=" + hHora;
        if ($('#chkNoCorrectas').prop('checked')) {
            url = myconfig.apiUrl + "/api/informes/rondas/punto4/?puntos=" + vm.elegidosPuntos() + "&dfecha=" + fecha1 + "&hfecha=" + fecha2 + "&dhora=" + dHora + "&hhora=" + hHora;
        }
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            contentType: "application/json",
            success: function (data, status) {
                // hay que mostrarlo en la zona de datos
                // vm.asignaciones(data);
                if (data.puntos.length == 0) {
                    mostrarMensajeSmart("No hay rondas con estos criterios");
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
    var shortid = "E16tAiKk-";
    if ($('#chkObservaciones').prop('checked')) {
        shortid = "NyJ4YRbbl";
    }
    // incluir las nuevas líneas
    data.linea1 = vm.linea1();
    data.linea2 = vm.linea2();
    data.linea3 = vm.linea3();
    data.firmante = vm.firmante();
    data.fechaInforme = moment(new Date()).format('DD/MM/YYYY');
    var data = {
        "template": {
            "shortid": shortid
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

function salir() {
    var mf = function () {
        var url = "InfTerminalRonda.html";
        window.open(url, '_self');
    }
    return mf;
}

function loadPosiblesPuntos() {
    $.ajax({
        type: "GET",
        url: myconfig.apiUrl + "/api/puntos",
        dataType: "json",
        contentType: "application/json",
        success: function (data, status) {
            // hay que mostrarlo en la zona de datos
            vm.posiblesPuntos(data);
        },

        error: errorAjax
    });
}
