/*-------------------------------------------------------------------------- 
gestionDescargaDetalle.js
Funciones js par la página GestionDescargaDetalle.html
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
    $("#btnSalir").click(salir());
    $("#btnProcesar").click(procesarDescarga());
    $("#btnCorregir").click(corregirDescarga());
    $("#frmDescarga").submit(function () {
        return false;
    });

    loadPosiblesTerminales();

    // inicializar la tabla asociada.
    initTablaPuntos();

    rondId = gup('DescargaRealizadaId');
    if (rondId != 0) {
        var data = {
            rondaId: rondId
        }
        // hay que buscar ese elemento en concreto
        $.ajax({
            type: "GET",
            url: myconfig.apiUrl + "/api/descargas/leer-descarga/" + rondId,
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
        vm.rondaRealizadaId(0);
    }
}

function admData() {
    var self = this;
    self.descargaId = ko.observable();
    self.numero = ko.observable();
    self.fecha = ko.observable();
    self.hora = ko.observable();
    self.terminal = ko.observable();
    self.procesada = ko.observable();
    // -- apoyo de combos
    self.posiblesTerminales = ko.observableArray([]);
    self.terminalCompleto = ko.observable();
}

function loadData(data) {
    vm.descargaId(data.cabecera.descargaId);
    vm.numero(data.cabecera.descargaId);
    vm.fecha(moment(data.cabecera.fecha).format('DD/MM/YYYY'));
    vm.hora(data.cabecera.hora);
    // vm.terminal(data.cabecera.nterminal);
    vm.procesada(data.cabecera.procesada);
    loadPosiblesTerminales(data.cabecera.nterminal);
    loadTablaPuntos(data.lecturas);
    // ocultamos el botón de procesamiento si ya está procesada
    if (vm.procesada() == 1) {
        $('#btnProcesar').hide();
    }
}


function initTablaPuntos() {
    tablaCarro = $('#dt_rondapuntos').dataTable({
        autoWidth: true,
        "order": [
            [0, "desc"],
            [1, "desc"]
        ],
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
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

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
            data: "tag"
        }, {
            data: "fecha",
            render: function (data, type, row) {
                if (!data) {
                    return "";
                }
                return moment(data).format('DD/MM/YYYY');
            }
        }, {
            data: "hora"
        }, {
            data: "tipo"
        }, {
            data: "nombre"
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


function salir() {
    var mf = function () {
        var url = "GestionDescarga.html";
        window.open(url, '_self');
    }
    return mf;
}


function procesarDescarga() {
    var mf = function () {
        var url = "GestionRondaNueva.html?descargaId=" + rondId;
        window.open(url, '_self');;
    };
    return mf;
}

function corregirDescarga() {
    var mf = function () {
        debugger;
        if (!vm.terminal()) {
            datosOK();
            return;
        }
        $.ajax({
            type: "GET",
            url: myconfig.apiUrl + "/api/descargas/corregir-descarga/" + vm.descargaId(),
            dataType: "json",
            contentType: "application/json",
            success: function(data, status) {
                $.ajax({
                    type: "PUT",
                    url: myconfig.apiUrl + "/api/descargas/",
                    dataType: "json",
                    data: JSON.stringify({
                        descargaId: vm.descargaId(),
                        nterminal: vm.terminal().numero
                    }),
                    contentType: "application/json",
                    success: function(data, status) {
                        // Nos volvemos al general
                        var url = "GestionDescarga.html?DescargaId=" + vm.descargaId();
                        window.open(url, '_self');
                    },
                    error: errorAjax
                });
            },
            error: errorAjax
        });
    };
    return mf;
}

function loadPosiblesTerminales(numero) {
    $.ajax({
        type: "GET",
        url: myconfig.apiUrl + "/api/terminales",
        dataType: "json",
        contentType: "application/json",
        success: function(data, status) {
            // hay que mostrarlo en la zona de datos
            vm.posiblesTerminales(data);
            if (numero) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].numero == numero) {
                        vm.terminal(data[i]);
                        // Si tiene terminal no hay que dar la posibilidad de corregir.
                        $('#btnCorregir').hide();
                    } 
                }
            }
        },

        error: errorAjax
    });
}

function datosOK() {
    $('#frmDescarga').validate({
        rules: {
            cmbTerminales: {
                required: true
            }
        },
        // Messages for form validation
        messages: {
            cmbTerminales: {
                required: 'Introduzca el terminal'
            }
        },
        // Do not change code below
        errorPlacement: function(error, element) {
            error.insertAfter(element.parent());
        }
    });
    return $('#frmDescarga').valid();
}