(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('viewUploadSettledProfilesModel', factory);

    factory.$inject = ['viewUploadSettledProfilesService', 'authSvc', 'alert', 'fileUpload', 'modelpopupopenmethod', '$http'];

    function factory(viewUploadSettledProfilesService, authSvc, alertss, fileUpload, modelpopupopenmethod, $http) {

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
                    isActive: 1,
                    Settlementfrompath: Imgpath,
                    isassigned: model.rdnSignIn,
                    ReferenceID: model.typeOfReference,
                    ProfileID: model.txtProfileID,
                    Profileidnew: model.txtProfileID
                };
                fileUpload.uploadFileToUrl(obj, '/photoUplad', keyname).then(function(res) {
                    if (res.status == 200) {
                        viewUploadSettledProfilesService.submitUpload(inObj).then(function(response) {
                            if (response.data && parseInt(response.data) === 1) {
                                model.reset();
                                model.showHidediv = false;
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
                viewUploadSettledProfilesService.checkProfileID(profileID).then(function(response) {
                    if (response && response.data) {
                        if (parseInt(response.data.m_Item1) !== 1) {
                            model.txtProfileID = '';
                            model.showHidediv = false;
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please enter Correct ProfileID', 4500);
                        } else {
                            model.showHidediv = true;
                            if (parseInt(response.data.m_Item2) === 1) {
                                // model.txtProfileID = '';
                                model.showHidediv = false;
                                model.viewprofilesubmit(profileID);
                                // alertss.timeoutoldalerts(model.scope, 'alert-danger', 'ProfileID  Already exists Enter New ProfileID', 4500);
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

        model.viewprofilesubmit = function(profileid) {
            model.settlementimageID = '';
            if (profileid !== undefined && profileid !== "" && profileid !== null) {
                viewUploadSettledProfilesService.getCheckprofileIDstatus(profileid).then(function(response) {
                    if (parseInt(response.data) === 1) {
                        viewUploadSettledProfilesService.getViewSettlementform(profileid).then(function(response) {
                            var imgArr = response.data.m_Item1.split(';');

                            model.settlementimage = imgArr[0];
                            model.settlementimageID = imgArr[1];

                            model.status = response.data.m_Item2;
                            if (parseInt(model.status) == 1) {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Inactive settlement form', 3000);
                            } else if (parseInt(model.status) == 3) {

                                model.txtProfileID = profileid;
                                // alertss.timeoutoldalerts(model.scope, 'alert-danger', 'No settlement form', 3000);
                            } else if (parseInt(model.status) == 2) {
                                if (model.settlementimage !== "" && model.settlementimage !== undefined && model.settlementimage !== null) {
                                    modelpopupopenmethod.showPopupphotopoup('viewsettlementform.html', model.scope, '', "");
                                }
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'No settlement form', 3000);
                            }
                        });
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'ProfileID does not exists', 3000);
                    }
                });
            } else {
                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please enter  ProfileID', 3000);
            }
        };
        model.close = function() {
            modelpopupopenmethod.closepopuppoptopopup();
        };

        model.checkmethod = function() {
            if (model.showHidediv === true) {
                model.checkProfileID(model.txtProfileID);
            }
        };

        model.deleteSettleemnt = function() {

            if (model.Managementid === 'true' || model.Admin === '1') {
                viewUploadSettledProfilesService.deleteSettleForm(model.settlementimageID).then(function(response) {
                    if (response.data && parseInt(response.data) === 1) {
                        model.close();
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'settleform deleted successfully', 3000);
                        var strCustDtryName = model.txtProfileID + "_settlementImages";
                        var keynameq = "Images/SettlementImages/" + strCustDtryName + "/" + model.txtProfileID + "_settlementImages.jpg";
                        $http.post('/photoDelete', JSON.stringify({ keyname: keynameq })).then(function(data) {

                        });
                    }
                });
            } else {
                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please contact Admin to delete Settlement Form', 4500);
            }
        };
        return model;

    }
})();