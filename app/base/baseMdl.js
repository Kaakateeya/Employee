(function(angular) {
    'use strict';

    function factory(baseService, authSvc, uibModal, commonFactory, stateParams, filter, $rootScope) {
        var model = {};
        var CustID = stateParams.CustID;
        model.lnkeducationandprofReview = false;
        model.scope = {};
        model.init = function() {
            model.AdminID = authSvc.isAdmin();
            model.Managementid = authSvc.isManagement() !== undefined && authSvc.isManagement() !== null && authSvc.isManagement() !== "" ? authSvc.isManagement() : "";
            model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
            CustID = stateParams.CustID;
            model.ProfileOwner = '';
            model.menuItem();
            baseService.personalDetails(CustID).then(function(response) {
                model.PersonalObj = response.data;

                if (model.PersonalObj !== null && model.PersonalObj !== undefined) {
                    $rootScope.ProfileOwner = model.ProfileOwner = model.PersonalObj.ProfileOwner;
                    $rootScope.EditProfilePaidStatus = model.PersonalObj.PaidStatus;
                    debugger;

                    model.isprofileOwner = (model.ProfileOwner ? parseInt(model.ProfileOwner) === parseInt(model.empid) : false) || (model.PersonalObj.PaidStatus !== undefined && model.PersonalObj.PaidStatus !== null ? parseInt(model.PersonalObj.PaidStatus) !== 1 : false);
                    baseService.nodatastatus(model.PersonalObj.ProfileID).then(function(res) {
                        model.rev = res.data;
                    });
                }
                model.unreviewedLinks();
            });
            return model;
        };
        model.unreviewedLinks = function() {
            switch (model.PersonalObj.ProfileStatusID) {
                case 54:
                    model.mymenucolor = '#EFEFEF';
                    break;
                case 55:
                    model.mymenucolor = '#185615';
                    break;
                case 56:
                case 394:
                    model.mymenucolor = '#BCC3BE';
                    break;
                case 57:
                case 393:
                    model.mymenucolor = '#17F067';
                    break;
                default:
                    model.mymenucolor = '#EFEFEF';
                    break;
            }
            baseService.menuReviewstatus(CustID, '0', '').then(function(response) {
                model.lnkparentsReview = model.lnksiblingsReview = model.lnkrelativesReview = model.lnkeducationandprofReview = model.lnkpartnerReview = model.lnkastroReview = model.lnkreferenceReview = model.lnkpropertyReview = '';
                model.menuReviewdata = JSON.parse(response.data);
                _.each(model.menuReviewdata, function(item) {
                    var SectionID = item.SectionID;
                    switch (SectionID) {
                        case 11:
                        case 12:
                        case 13:
                        case 15:
                            model.lnkparentsReview = 'red';
                            break;
                        case 14:
                        case 25:
                        case 26:
                            model.lnksiblingsReview = 'red';
                            break;
                        case 27:
                        case 28:
                        case 32:
                        case 33:
                            model.lnkrelativesReview = 'red';
                            break;
                        case 6:
                        case 7:
                        case 8:
                            model.lnkeducationandprofReview = 'red';
                            break;
                        case 16:
                        case 22:
                            model.lnkpartnerReview = 'red';
                            break;
                        case 23:
                            model.lnkastroReview = 'red';
                            break;
                        case 29:
                            model.lnkreferenceReview = 'red';
                            break;
                        case 34:
                            model.lnkpropertyReview = 'red';
                            break;
                    }

                });
            });

        };

        model.menuItem = function() {
            baseService.menudata(CustID).then(function(response) {
                model.branchdata = JSON.parse(response.data)[0];
                model.registrationdate = filter('date')(model.branchdata.RegistrationDate, 'dd-MM-yyyy hh:mm:ss');
                model.strCon = model.branchdata.HighConfendential == 1 && model.branchdata.IsConfidential == true ? ",SC" : (model.branchdata.HighConfendential == 1 ? ",SC" : (model.branchdata.IsConfidential == true ? ",C" : null));

            });
        };

        model.photorequestAndshow = function() {
            if (model.PersonalObj.ProfilePic.indexOf('Fnoimage.jpg') !== -1 || model.PersonalObj.ProfilePic.indexOf('Mnoimage.jpg') !== -1) {
                //photo request
                baseService.PhotoRequest(model.PersonalObj.ProfileID, '2').then(function(response) {
                    if (response.data !== undefined && response.data.length > 0) {}
                });
            } else {
                baseService.getPhotoInfn(CustID).then(function(response) {
                    if (response.data !== undefined && response.data.length > 0) {
                        model.SlideArr = [];
                        model.FPobj = JSON.parse(response.data[0]);
                        _.each(model.FPobj, function(item) {
                            model.SlideArr.push({ FullPhotoPath: app.GlobalImgPath + "Images/ProfilePics/KMPL_" + CustID + "_Images/" + (item.PhotoName.slice(0, 4)).replace("i", "I") + "_Images/" + model.PersonalObj.ProfileID + "_FullPhoto.jpg" });
                        });
                        commonFactory.open('templates/Photopopup.html', model.scope, uibModal);
                    }
                });
                //photo show popup
            }
        };
        model.cancel = function() {
            commonFactory.closepopup();
        };
        return model.init();
    }
    angular
        .module('Kaakateeya')
        .factory('baseModel', factory);
    factory.$inject = ['baseService', 'authSvc', '$uibModal', 'commonFactory', '$stateParams', '$filter', '$rootScope'];

})(angular);