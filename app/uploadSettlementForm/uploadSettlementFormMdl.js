(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('uploadSettlementFormModel', factory);

    factory.$inject = ['uploadSettlementFormService', 'authSvc', 'alert', 'fileUpload'];

    function factory(svc, authSvc, alertss, fileUpload) {
        return function() {
            var model = {};
            model.scope = {};
            model.relationArr = [
                { label: '--Select--', title: '--Select--', value: '' },
                { label: 'Directors relation/friend', title: 'Directors relation/friend', value: 455 },
                { label: 'kaakateeya emp ref', title: 'kaakateeya emp ref', value: 456 },
                { label: 'email', title: 'email', value: 457 },
                { label: 'sms', title: 'sms', value: 458 },
                { label: 'oral agreed', title: 'oral agreed', value: 459 }
            ];
            model.submitUpload = function(obj) {
                if (obj) {
                    var extension = model.upFile ? (obj.name.split('.'))[1] : null;
                    extension = angular.lowercase(extension);
                    var empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                    var curdate = moment().format('MM/DD/YYYY');
                    var strCustDtryName = model.txtProfileID + "_settlementImages";
                    var keyname = "Images/SettlementImages/" + strCustDtryName + "/" + model.txtProfileID + "_settlementImages." + extension;
                    var Imgpath = "~\\Images\\SettlementImages\\" + strCustDtryName + "/" + model.txtProfileID + "_settlementImages." + extension;
                    var inObj = {
                        CreatedByEmpID: empid,
                        CreatedDate: curdate,
                        ModifiedByEmpID: empid,
                        ModifiedEmpDate: curdate,
                        Notes: model.txtDesc,
                        isActive: 0,
                        Settlementfrompath: Imgpath,
                        isassigned: model.rdnSignIn,
                        ReferenceID: model.typeOfReference,
                        ProfileID: model.txtProfileID,
                        Profileidnew: model.txtProfileID
                    };
                    fileUpload.uploadFileToUrl(obj, '/photoUplad', keyname).then(function(res) {
                        if (res.status == 200) {
                            svc.submitUpload(inObj).then(function(response) {
                                if (response.data && parseInt(response.data) === 1) {
                                    model.reset();

                                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'uploaded successfully', 4500);
                                } else {
                                    model.reset();
                                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'uploading Failed', 4500);
                                }
                            });
                        }
                    });
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please upload file', 4500);
                }
            };
            model.checkProfileID = function(profileID) {
                if (profileID) {
                    svc.checkProfileID(profileID).then(function(response) {
                        if (response && response.data) {
                            if (parseInt(response.data.m_Item1) !== 1) {
                                model.txtProfileID = '';
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please enter Correct ProfileID', 4500);
                            } else {
                                if (parseInt(response.data.m_Item2) === 1) {
                                    model.txtProfileID = '';
                                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'ProfileID  Already exists Enter New ProfileID', 4500);
                                }
                            }
                        }
                    });
                }
            };

            model.reset = function() {
                model.typeOfReference = '';
                model.rdnSignIn = '';
                model.txtProfileID = '';
                model.scope.uploadSettleForm.$setPristine();
            };
            return model;
        };
    }
})();