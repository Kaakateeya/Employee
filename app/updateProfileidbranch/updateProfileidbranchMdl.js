(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('updateProfileidbranchModel', factory);

    factory.$inject = ['updateProfileidbranchService', 'SelectBindService', 'alert'];

    function factory(updateProfileidbranchService, SelectBindService, alerts) {
        var model = {};
        model.init = function() {
            model.txtprofileid = '';
            model.submitdisabled = false;
        };
        model.updateprofileid = function() {
            if (model.txtprofileid !== '' && model.txtprofileid !== null && model.txtprofileid !== undefined) {
                SelectBindService.checkProfileID(model.txtprofileid).then(function(response) {
                    console.log(response);
                    if (response.data && parseInt(response.data) === 1) {
                        console.log('2');
                    } else {
                        model.txtprofileid = '';
                        alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Please enter  profileID', 3000);
                    }
                });
            } else {
                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Please enter  profileID', 3000);
            }
        };

        return model;

    }
})();