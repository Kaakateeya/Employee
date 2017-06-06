(function() {
    'use strict';

    function factory($http, viewsettlementservice, modelpopupopenmethod, dynamicalert) {
        var model = {};
        model.viewprofilesubmit = function(profileid) {
            if (profileid !== undefined && profileid !== "" && profileid !== null) {
                viewsettlementservice.getCheckprofileIDstatus(profileid).then(function(response) {
                    if (parseInt(response.data) === 1) {
                        viewsettlementservice.getViewSettlementform(profileid).then(function(response) {
                            console.log(response.data);
                            model.settlementimage = response.data.m_Item1;
                            model.status = response.data.m_Item2;
                            if (parseInt(model.status) == 1) {
                                dynamicalert.timeoutoldalerts(model.scope, 'alert-danger', 'Inactive settlement form', 3000);
                            } else if (parseInt(model.status) == 3) {
                                dynamicalert.timeoutoldalerts(model.scope, 'alert-danger', 'No settlement form', 3000);
                            } else if (parseInt(model.status) == 2) {
                                if (model.settlementimage !== "" && model.settlementimage !== undefined && model.settlementimage !== null) {
                                    modelpopupopenmethod.showPopupphotopoup('viewsettlementform.html', model.scope, '', "modalclassdashboardphotopopup");
                                }
                            } else {
                                dynamicalert.timeoutoldalerts(model.scope, 'alert-danger', 'No settlement form', 3000);
                            }
                        });
                    } else {
                        dynamicalert.timeoutoldalerts(model.scope, 'alert-danger', 'No settlement form', 3000);
                    }
                });
            } else {
                dynamicalert.timeoutoldalerts(model.scope, 'alert-danger', 'Please enter  ProfileID', 3000);
            }
        };
        model.close = function() {
            modelpopupopenmethod.closepopuppoptopopup();
        };
        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('viewSettlementformModel', factory);

    factory.$inject = ['$http', 'viewSettlementformService', 'modelpopupopenmethod', 'alert'];

})();