(function(angular) {
    'use strict';


    function factory(editReferenceService, authSvc, alertss, commonFactory, uibModal, SelectBindService, stateParams, baseModel) {
        var model = {};
        model.scope = {};

        //declaration part

        model.ReferenceArr = [];
        model.refObj = {};
        var loginEmpid = authSvc.LoginEmpid();
        var AdminID = authSvc.isAdmin();
        model.deleteDisplayTxt = 'reference';
        var isSubmit = true;
        model.identityID = 0;

        var custID = model.CustID = stateParams.CustID;


        model.AdminID = authSvc.isAdmin();
        model.Managementid = authSvc.isManagement() !== undefined && authSvc.isManagement() !== null && authSvc.isManagement() !== "" ? authSvc.isManagement() : "";
        model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
        model.isprofileOwner = baseModel.ProfileOwner ? parseInt(baseModel.ProfileOwner) === parseInt(model.empid) : false;

        //end declaration block
        model.init = function() {
            custID = model.CustID = stateParams.CustID;
            model.pageload();
            return model;
        };


        model.referencePopulate = function(item) {
            isSubmit = true;
            model.eventType = 'add';
            model.RefrenceCust_Reference_ID = null;
            model.popupdata = model.Refrence;
            model.popupHeader = 'Refrence';
            if (item !== undefined) {
                model.eventType = 'edit';
                model.intCusID = custID;
                model.RefrenceCust_Reference_ID = item.RefrenceCust_Reference_ID;
                model.ddlRelationshiptype = 318;
                model.txtFname = item.ReferenceFirstName;
                model.txtLname = item.ReferenceLastName;
                model.txtProfessiondetails = item.RefrenceProfessionDetails;
                model.ddlCountry = commonFactory.checkvals(item.RefrenceCountry) ? parseInt(item.RefrenceCountry) : null;
                model.ddlState = commonFactory.checkvals(item.RefrenceStateID) ? parseInt(item.RefrenceStateID) : null;
                model.ddlDistrict = commonFactory.checkvals(item.RefrenceDistrictID) ? parseInt(item.RefrenceDistrictID) : null;
                model.txtNativePlace = item.RefrenceNativePlaceID;
                model.txtPresentlocation = item.RefenceCurrentLocation;

                model.ddlMobileCountryID = commonFactory.checkvals(item.RefrenceMobileCountryID) ? parseInt(item.RefrenceMobileCountryID) : null;

                model.txtMobileNumber = item.RefrenceMobileNumberID;

                if (commonFactory.checkvals(item.RefrenceAreaCode)) {
                    model.ddlLandLineCountryID = commonFactory.checkvals(item.RefrenceLandCountryId) ? parseInt(item.RefrenceLandCountryId) : null;
                    model.txtAreCode = item.RefrenceAreaCode;
                    model.txtLandNumber = item.RefrenceLandNumber;

                } else {
                    model.ddlMobileCountryID2 = commonFactory.checkvals(item.RefrenceLandCountryId) ? parseInt(item.RefrenceLandCountryId) : null;
                    model.txtMobileNumber2 = item.RefrenceLandNumber;
                }

                model.txtEmails = item.RefrenceEmail;
                model.txtNarrations = item.RefrenceNarration;
            }
            commonFactory.open('referenceContent.html', model.scope, uibModal);

        };

        model.pageload = function() {
            editReferenceService.getReferenceData(custID).then(function(response) {
                model.ReferenceArr = response.data;
                model.referencemodifiedby = (model.ReferenceArr !== undefined && model.ReferenceArr.length > 0 && model.ReferenceArr[0].EmpLastModificationDate !== undefined && model.ReferenceArr[0].EmpLastModificationDate !== null) ? model.ReferenceArr[0].EmpLastModificationDate : '';
            });
        };

        model.updateData = function(inObj, type) {
            if (isSubmit) {
                isSubmit = false;
                inObj.GetDetails.CustID = custID;
                inObj.GetDetails.Cust_Reference_ID = model.RefrenceCust_Reference_ID;
                model.submitPromise = editReferenceService.submitReferenceData(inObj).then(function(response) {
                    commonFactory.closepopup();
                    if (response.data === 1) {
                        model.pageload();
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Reference Details Submitted Succesfully', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Reference Details Updation failed', 4500);
                    }
                });

            }
        };

        model.cancel = function() {
            commonFactory.closepopup();
        };


        model.DeletePopup = function(id) {
            model.identityID = id;
            commonFactory.open('templates/deletepopup.html', model.scope, uibModal, 'sm');
        };

        model.deleteSubmit = function(type) {
            SelectBindService.DeleteSection({ sectioname: 'Reference', CustID: custID, identityid: model.identityID }).then(function(response) {
                commonFactory.closepopup();
                model.pageload();
            });
        };

        //performance code
        model.Refrence = [
            { lblname: 'Relationship type', controlType: 'select', ngmodel: 'ddlRelationshiptype', required: true, typeofdata: 'RelationshipType', parameterValue: 'RelationshiptypeID' },
            { lblname: 'First name', controlType: 'textbox', ngmodel: 'txtFname', required: true, parameterValue: 'Firstname' },
            { lblname: 'Last name', controlType: 'textbox', ngmodel: 'txtLname', required: true, parameterValue: 'Lastname' },
            { lblname: 'Profession', controlType: 'textbox', ngmodel: 'txtProfessiondetails', parameterValue: 'Professiondetails' },
            {
                lblname: 'country',
                controlType: 'country',
                countryshow: true,
                cityshow: false,
                othercity: false,
                dcountry: 'ddlCountry',
                dstate: 'ddlState',
                ddistrict: 'ddlDistrict',
                countryParameterValue: 'CountryID',
                stateParameterValue: 'StateID',
                districtParameterValue: 'DistrictID',

            },
            { lblname: 'Native Place', controlType: 'textbox', ngmodel: 'txtNativePlace', parameterValue: 'Nativeplace' },
            { lblname: 'Present location', controlType: 'textbox', ngmodel: 'txtPresentlocation', parameterValue: 'Presentlocation' },
            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'ddlMobileCountryID',
                strmobile: 'txtMobileNumber',
                dalternative: 'ddlMobileCountryID2',
                stralternative: 'txtMobileNumber2',
                dland: 'ddlLandLineCountryID',
                strareacode: 'txtAreCode',
                strland: 'txtLandNumber',
                strmail: 'txtEmails',

                mobileCodeIdParameterValue: 'MobileCountryID',
                mobileNumberParameterValue: 'MobileNumber',
                landCountryCodeIdParameterValue: 'LandLineCountryID',
                landAreaCodeIdParameterValue: 'LandLineAreaCode',
                landNumberParameterValue: 'LandLineNumber',
                emailParameterValue: 'Emails'

            },
            {
                lblname: 'Narration',
                controlType: 'textarea',
                ngmodel: 'txtNarrations',
                parameterValue: 'Narration'
            }

        ];

        return model.init();
    }

    angular
        .module('Kaakateeya')
        .factory('editReferenceModel', factory);

    factory.$inject = ['editReferenceService', 'authSvc', 'alert', 'commonFactory', '$uibModal', 'SelectBindService', '$stateParams', 'baseModel'];

})(angular);