(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('uploadSettlementFormModel', factory)

    factory.$inject = ['uploadSettlementFormService', 'authSvc', 'alert'];

    function factory(svc, authSvc, alertss) {

        var model = {};

        model.relationArr = [
            { label: '--Select--', title: '--Select--', value: '' },
            { label: 'Directors relation/friend', title: 'Directors relation/friend', value: 455 },
            { label: 'kaakateeya emp ref', title: 'kaakateeya emp ref', value: 456 },
            { label: 'email', title: 'email', value: 457 },
            { label: 'sms', title: 'sms', value: 458 },
            { label: 'oral agreed', title: 'oral agreed', value: 459 }
        ];

        model.submitUpload = function() {
            if (typeof(obj.myFile.name) != "undefined") {
                var extension = model.upFile ? (obj.myFile.name.split('.'))[1] : null;
                extension = angular.lowercase(extension);
                var empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                var curdate = moment().format('DD-MM-YYYY');
                var inObj = {
                    CreatedByEmpID: empid,
                    CreatedDate: curdate,
                    ModifiedByEmpID: empid,
                    ModifiedEmpDate: curdate,
                    Notes: model.txtDesc,
                    isActive: 0,
                    Settlementfrompath: model.upFile,
                    isassigned: model.rdnSignIn,
                    ReferenceID: model.typeOfReference,
                    ProfileID: model.txtProfileID,
                    Profileidnew: model.txtProfileID
                };

                var strCustDtryName = model.txtProfileID + "_settlementImages";

                var keyname = "Images/SettlementImages/" + strCustDtryName + "/" + model.txtProfileID + "_settlementImages" + extension;

                fileUpload.uploadFileToUrl(obj.myFile, '/photoUplad', keyname).then(function(res) {
                    if (res.status == 200) {

                        // svc.submitUpload(inObj).then(function(response) {
                        //     console.log(response);
                        // });

                    }
                });
            } else {
                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Uploaded failed', 4500);
            }
        };


        model.checkProfileID = function(profileID) {
            if (profileID) {
                svc.checkProfileID(profileID).then(function(response) {
                    console.log(response);
                });
            }

        };

        return model;
    };
})();