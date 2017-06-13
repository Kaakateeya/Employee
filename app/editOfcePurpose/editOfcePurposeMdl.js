(function(angular) {
    'use strict';


    function factory(editOfcePurposeService, authSvc, alertss, commonFactory, uibModal, stateParams) {
        var model = {};
        model.scope = {};
        // var logincustid = authSvc.getCustId();
        var custID = stateParams.CustID;
        //  logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;
        model.dataval = '';
        model.init = function() {
            custID = stateParams.CustID;
            model.pageload();
            return model;
        };
        model.pageload = function() {
            editOfcePurposeService.getofficeData('1', custID, '').then(function(response) {
                if (response.data.length > 0) {
                    model.dataval = response.data[0].length > 0 ? (JSON.parse(response.data[0]))[0].AboutProfile : '';
                }
            });
        };
        model.cancel = function() {
            commonFactory.closepopup();
        };
        model.showPopup = function(val) {
            model.popupHeader = 'About Your Profile';
            model.txtAboutprofile = '';
            if (val !== undefined) {
                model.eventType = 'edit';
                model.txtAboutprofile = val;
            }
            commonFactory.open('AboutModalContent.html', model.scope, uibModal);
        };
        model.updateData = function(inObj, type) {
            editOfcePurposeService.getofficeData('2', custID, inObj.GetDetails.txtAboutprofile).then(function(response) {
                commonFactory.closepopup();
                model.dataval = inObj.GetDetails.txtAboutprofile;
                alertss.timeoutoldalerts(model.scope, 'alert-success', 'About Profile Details submitted Succesfully', 4500);
                // if (response.data === 1) {

                // } else {
                //     alertss.timeoutoldalerts(model.scope, 'alert-danger', 'About Profile Details Updation failed', 4500);
                // }
            });
        };
        model.popupdata = [
            { lblname: '', controlType: 'about', required: true, maxlength: '1000', displayTxt: '(You can write anything about this profile)*', ngmodel: 'txtAboutprofile', parameterValue: 'txtAboutprofile' }
        ];
        return model.init();
    }
    angular
        .module('Kaakateeya')
        .factory('editOfcePurposeModel', factory);

    factory.$inject = ['editOfcePurposeService', 'authSvc', 'alert', 'commonFactory', '$uibModal', '$stateParams'];

})(angular);