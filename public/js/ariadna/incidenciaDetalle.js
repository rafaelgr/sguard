/*-------------------------------------------------------------------------- 
incidenciaDetalle.js
Funciones js par la página IncidenciaDetalle.html
---------------------------------------------------------------------------*/
var adminId = 0;

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
    $("#frmIncidencia").submit(function() {
        return false;
    });

    adminId = gup('IncidenciaId');
    if (adminId != 0) {
        var data = {
                incidenciaId: adminId
            }
            // hay que buscar ese elemento en concreto
        $.ajax({
            type: "GET",
            url: myconfig.apiUrl + "/api/incidencias/" + adminId,
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
        vm.incidenciaId(0);
    }
}

function admData() {
    var self = this;
    self.incidenciaId = ko.observable();
    self.nombre = ko.observable();
}

function loadData(data) {
    vm.incidenciaId(data.incidenciaId);
    vm.nombre(data.nombre);
}

function datosOK() {
    return $('#frmIncidencia').valid();
}

function aceptar() {
    var mf = function() {
        if (!datosOK())
            return;
        var data = {
            incidencia: {
                "incidenciaId": vm.incidenciaId(),
                "nombre": vm.nombre()
            }
        };
        if (adminId == 0) {
            $.ajax({
                type: "POST",
                url: myconfig.apiUrl + "/api/incidencias",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function(data, status) {
                    // hay que mostrarlo en la zona de datos
                    loadData(data);
                    // Nos volvemos al general
                    var url = "IncidenciaGeneral.html?IncidenciaId=" + vm.incidenciaId();
                    window.open(url, '_self');
                },
                error: errorAjax
            });
        } else {
            $.ajax({
                type: "PUT",
                url: myconfig.apiUrl + "/api/incidencias/" + adminId,
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function(data, status) {
                    // hay que mostrarlo en la zona de datos
                    loadData(data);
                    // Nos volvemos al general
                    var url = "IncidenciaGeneral.html?IncidenciaId=" + vm.incidenciaId();
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
        var url = "IncidenciaGeneral.html";
        window.open(url, '_self');
    };
    return mf;
}
