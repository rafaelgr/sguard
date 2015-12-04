﻿/*-------------------------------------------------------------------------- 
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


function initForm() {
    comprobarLogin();
    // de smart admin
    pageSetUp();
    getVersionFooter();
    //
    $('#btnAceptar').click(exportarSDF);
    $('#frmCN50Export').submit(function () {
        return false
    });
}


var exportarSDF = function(){
    var btnAceptar = $('#btnAceptar');
    btnAceptar.addClass('fa-spin');
    $.ajax({
            type: "POST",
            url: myconfig.apiUrl + "api/cn50/createsdf",
            dataType: "json",
            contentType: "application/json",
            success: function (data, status) {
                $('#txtRespuesta').val(data);
                btnAceptar.removeClass('fa-spin');
                if (data == "OK"){
                    window.open(myconfig.cn50Url, '_self');
                }
            },
            error: errorAjax
        });
};
