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
                    if (response.data && parseInt(response.data) === 1) {
                        updateProfileidbranchService.updateprofilebranchid(model.txtprofileid).then(function(res) {
                            if (res.data && parseInt(res.data) === 1) {
                                alerts.timeoutoldalerts(model.scope, 'alert-success', 'Branch Updated Successfully', 3000);
                            } else {
                                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Branch Updated Failed', 3000);
                            }
                        });
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