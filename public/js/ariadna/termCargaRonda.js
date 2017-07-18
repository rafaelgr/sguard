/*-------------------------------------------------------------------------- 
administradorGeneral.js
Funciones js par la página AdministradorGeneral.html

---------------------------------------------------------------------------*/
var responsiveHelper_dt_basic = undefined;
var responsiveHelper_datatable_fixed_column = undefined;
var responsiveHelper_datatable_col_reorder = undefined;
var responsiveHelper_datatable_tabletools = undefined;

var breakpointDefinition = {
    tablet: 1024,
    phone: 480
};

var descargaId = null;

function initForm() {
    comprobarLogin();
    // de smart admin
    pageSetUp();
    getVersionFooter();
    //
    $('#btnAceptar').click(leerDatos);
    $('#frmLeerDatos').submit(function () {
        return false
    });
    descargaId = gup('descargaId');
    if (descargaId) {
        procesarDescarga(descargaId);
    }
}


var leerDatos = function () {
    // test -- Eliminar en producción
    // procesarDescarga(4332);
    // return;
    var btnAceptar = $('#btnAceptar');
    btnAceptar.addClass('fa-spin');
    $.ajax({
        type: "GET",
        url: myconfig.apiUrl + "/api/descargas/leer-terminal",
        dataType: "json",
        contentType: "application/json",
        success: function (data, status) {
            //$('#txtRespuesta').val(JSON.stringify(data, null,2));
            if (data) {
                $.ajax({
                    type: "GET",
                    url: myconfig.apiUrl + "/api/descargas/procesar-descarga/" + data.cabecera.descargaId,
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data, status) {
                        $('#txtRespuesta').html(data);
                        btnAceptar.removeClass('fa-spin');
                    },
                    error: errorAjax
                });
            } else {
                $('#txtRespuesta').html("No hay lecturas en el terminal");
                btnAceptar.removeClass('fa-spin');
            }

        },
        error: errorAjax
    });
};

var procesarDescarga = function (descargaId) {
    var btnAceptar = $('#btnAceptar');
    btnAceptar.addClass('fa-spin');
    $('#txtCabecera').text('Procesando la descarga ' + descargaId + ' espere por favor...');
    $.ajax({
        type: "DELETE",
        url: myconfig.apiUrl + "/api/rondas-realizadas/descargas/" + descargaId,
        dataType: "json",
        contentType: "application/json",
        success: function (data, status) {
            $.ajax({
                type: "GET",
                url: myconfig.apiUrl + "/api/descargas/procesar-descarga/" + descargaId,
                dataType: "json",
                contentType: "application/json",
                success: function (data, status) {
                    $('#txtRespuesta').html(data);
                    btnAceptar.removeClass('fa-spin');
                    $('#txtCabecera').text('Descarga  ' + descargaId + ' reprocesada. Consulte rondas realizadas para comprobaciones.');
                },
                error: errorAjax
            });
        },
        error: errorAjax
    });
}