/*-------------------------------------------------------------------------- 
administradorGeneral.js
Funciones js par la página AdministradorGeneral.html

---------------------------------------------------------------------------*/
var responsiveHelper_dt_basic = undefined;
var responsiveHelper_datatable_fixed_column = undefined;
var responsiveHelper_datatable_col_reorder = undefined;
var responsiveHelper_datatable_tabletools = undefined;

var fileName = "terminal.sdf";

var breakpointDefinition = {
    tablet: 1024,
    phone: 480
};


function initForm() {
    comprobarLogin();
    // de smart admin
    pageSetUp();
    getVersionFooter();
    //
    $('#btnAceptar').click(importarCN50);
    vm = new admData();
    ko.applyBindings(vm);
    createUpload(0);
    loadPosiblesTerminales();
    $("#frmPDAImport").submit(function() {
        return false;
    });
}

function admData() {
    var self = this;
    self.posiblesTerminales = ko.observableArray();
    self.terminal = ko.observable();
}




var importarCN50 = function() {
    if (!datosOK()) return;
    var btnAceptar = $('#btnAceptar');
    btnAceptar.addClass('fa-spin');
    $.ajax({
        type: "GET",
        url: myconfig.apiUrl + "api/cn50/descargas-lineas?file=" + fileName + "&terminalId=" + vm.terminal().terminalId,
        dataType: "json",
        contentType: "application/json",
        success: function(lecturas, status) {
            var mens = "Obtenidas las lecturas. Guardándolas en la base de datos...";
            $('#txtRespuesta').html(mens);
            data = {
                nterminal: vm.terminal().numero,
                lecturas: lecturas
            };
            $.ajax({
                type: "POST",
                url: myconfig.apiUrl + "/api/descargas/leer-descargaCN50",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function(data, status) {
                    // aqui llamada a procesamiento de descargas
                    if (data) {
                        $.ajax({
                            type: "GET",
                            url: myconfig.apiUrl + "/api/descargas/procesar-descarga/" + data,
                            dataType: "json",
                            contentType: "application/json",
                            success: function(data, status) {
                                $('#txtRespuesta').html(data);
                                btnAceptar.removeClass('fa-spin');
                                var mens = "Las lecturas de este archivo se han procesado. Recuerde exportar un fichero nuevo generado al terminal, si no puede producir duplicidades en futuras importaciones.";
                                $.SmartMessageBox({
                                    title: "<i class='fa fa-info'></i> Mensaje",
                                    content: mens,
                                    buttons: '[Aceptar]'
                                }, function(ButtonPressed) {
                                    if (ButtonPressed === "Aceptar") {
                                        // aquí hay que lanzar la exportación.
                                        var url = "PDAExport.html";
                                        window.open(url, '_self');
                                    }
                                });
                            },
                            error: errorAjax
                        });
                    } else {
                        $('#txtRespuesta').html("No hay lecturas en el terminal");
                        btnAceptar.removeClass('fa-spin');
                        var mens = "No hay lecturas en el terminal. Recuerde exportar un fichero nuevo generado al terminal, si no puede producir duplicidades en futuras importaciones.";
                        $.SmartMessageBox({
                            title: "<i class='fa fa-info'></i> Mensaje",
                            content: mens,
                            buttons: '[Aceptar]'
                        }, function(ButtonPressed) {
                            if (ButtonPressed === "Aceptar") {
                                // aquí hay que lanzar la exportación.
                                var url = "PDAExport.html";
                                window.open(url, '_self');
                            }
                        });
                    }
                },
                error: errorAjax
            });
            btnAceptar.removeClass('fa-spin');
        },
        error: errorAjax
    });
};


function sucUpload(file, data) {
    $('#txtRespuesta').html('Fichero cargado correctamente.<br/> Haga clic en el botón para procesar lecturas.');
    fileName = data.FileName;
    console.log('SucUpload');
    console.log('file: ', fileName);
    console.log('data: ', data);
}

function errUpload(file, data) {
    console.log('ErrUpload');
    console.log('file: ', file);
    console.log('data: ', data);
}

function createUpload(id) {
    if (!id) id = 0;
    // montar el control de carga
    $("#uploadImage").pekeUpload({
        multi: false,
        btnText: "  Cargar archivo  ",
        url: myconfig.apiUrl + "/api/uploader",
        onFileError: errUpload,
        onFileSuccess: sucUpload,
    });
}

function loadPosiblesTerminales() {
    $.ajax({
        type: "GET",
        url: myconfig.apiUrl + "/api/terminales",
        dataType: "json",
        contentType: "application/json",
        success: function(data, status) {
            // hay que mostrarlo en la zona de datos
            vm.posiblesTerminales(data);
        },
        error: errorAjax
    });
}

function datosOK() {
    $('#frmPDAImport').validate({
        rules: {
            cmbTerminales: {
                required: true
            }
        },
        // Messages for form validation
        messages: {
            cmbTerminales: {
                required: 'Seleccione un terminal',
                date: 'Debe ser una fecha válida'
            }
        },
        // Do not change code below
        errorPlacement: function(error, element) {
            error.insertAfter(element.parent());
        }
    });
    var opciones = $("#frmPDAImport").validate().settings;
    if (vm.terminal()) {
        opciones.rules.cmbTerminales.required = false;
    } else {
        opciones.rules.cmbTerminales.required = true;
    }
    return $('#frmPDAImport').valid();
}
