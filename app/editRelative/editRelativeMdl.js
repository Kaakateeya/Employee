(function(angular) {
    'use strict';


    function factory(editRelativeService, authSvc, alertss, commonFactory, uibModal, SelectBindService, stateParams, modelpopupopenmethod) {
        var model = {};
        model.scope = {};

        //declaration part
        model.fbObj = {};
        model.fsObj = {};
        model.mbObj = {};
        model.msObj = {};
        var isSubmit = true;
        model.deleteDisplayTxt = '';
        model.identityID = 0;
        model.ddlFSHCountryID = 1;
        var custid = model.CustID = stateParams.CustID;
        var loginEmpid = authSvc.LoginEmpid();
        var AdminID = authSvc.isAdmin();
        //end declaration block
        model.init = function() {
            custid = model.CustID = stateParams.CustID;
            model.relativePageLoad();
            return model;
        };

        model.relativePageLoad = function() {
            editRelativeService.getRelativeeData(custid).then(function(response) {
                model.FBArr = JSON.parse(response.data[0]);
                model.FSArr = JSON.parse(response.data[1]);
                model.MBrr = JSON.parse(response.data[2]);
                model.MSArr = JSON.parse(response.data[3]);

                model.FBemodifiedby = (model.FBArr.length > 0 && model.FBArr[0].EmpLastModificationDate !== undefined && model.FBArr[0].EmpLastModificationDate !== null) ? model.FBArr[0].EmpLastModificationDate : '';
                model.FSmodifiedby = (model.FSArr.length > 0 && model.FSArr[0].EmpLastModificationDate !== undefined && model.FSArr[0].EmpLastModificationDate !== null) ? model.FSArr[0].EmpLastModificationDate : '';
                model.MBmodifiedby = (model.MBrr.length > 0 && model.MBrr[0].EmpLastModificationDate !== undefined && model.MBrr[0].EmpLastModificationDate !== null) ? model.MBrr[0].EmpLastModificationDate : '';
                model.MSmodifiedby = (model.MSArr.length > 0 && model.MSArr[0].EmpLastModificationDate !== undefined && model.MSArr[0].EmpLastModificationDate !== null) ? model.MSArr[0].EmpLastModificationDate : '';

            });
        };

        model.relativePopulatePopulate = function(type, item) {
            isSubmit = true;
            model.eventType = 'add';
            switch (type) {
                case 'FB':
                    model.fatherBrother[0].dataSource = modelpopupopenmethod.getNumForPrintOrderbind(model.FBArr.length + 1);

                    model.FatherbrotherCustfamilyID = null;
                    model.popupdata = model.fatherBrother;
                    model.popupHeader = "Father's Brother Details";

                    if (item !== undefined) {
                        model.fatherBrother[0].dataSource = modelpopupopenmethod.getNumForPrintOrderbind(model.FBArr.length);
                        model.eventType = 'edit';
                        model.FatherbrotherCustfamilyID = item.FatherbrotherCustfamilyID;

                        model.fbPrintOrder = item.BornOrder;
                        model.rdlFBElderORyounger = item.FatherBrotherElderyounger == 'Elder' ? 324 : (item.FatherBrotherElderyounger == 'Younger' ? 323 : '-1');
                        model.txtFatherbrothername = item.FatherbrotherName;
                        model.txtFBEducationdetails = item.FatherBrotherEducationDetails;
                        model.txtFBProfessiondetails = item.FatherbrotherProfessionDetails;

                        model.ddlFBMobileCountryID = item.FatherbrotherMobileCode;
                        model.txtFBMobileNumber = item.FatherbrotherMobileNumber;

                        if (commonFactory.checkvals(item.FatherbrotherLandaraecode)) {
                            model.ddlFBLandLineCountry = item.FatherbrotherLandCountryCode;
                            model.txtFBAreCode = item.FatherbrotherLandaraecode;
                            model.txtFBLandNumber = item.FatherbrotherLandNumber;
                        } else {
                            model.ddlFBMobileCountryID2 = item.FatherbrotherLandCountryCode;
                            model.txtFBMobileNumber2 = item.FatherbrotherLandNumber;
                        }

                        model.txtFBEmails = item.FatherbrotherEmail;
                        model.txtCurrentLocation = item.FatherbrotherCurrentLocation;

                    }
                    commonFactory.open('ModalContent.html', model.scope, uibModal);

                    break;

                case 'FS':
                    model.fatherSister[0].dataSource = modelpopupopenmethod.getNumForPrintOrderbind(model.FSArr.length + 1);
                    model.FatherSisterCustfamilyID = null;
                    model.popupdata = model.fatherSister;
                    model.popupHeader = "Father's Sister Details";
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.fatherSister[0].dataSource = modelpopupopenmethod.getNumForPrintOrderbind(model.FSArr.length);

                        model.FatherSisterCustfamilyID = item.FatherSisterCustfamilyID;
                        model.fsPrintOrder = item.BornOrder;

                        model.rdlFSElderYounger = item.FatherSisterElderyounger == 'Elder' ? 326 : (item.FatherSisterElderyounger == 'Younger' ? 325 : '-1');
                        model.txtFathersistername = item.FatherSisterName;
                        model.txtFSHusbandfirstname = item.SpouceFName;
                        model.txtFSHusbandlastname = item.SpoucelName;
                        model.txtFSHEDucation = item.FatherSisterSpouseEducationDetails;
                        model.txtFSProfessiondetails = item.FathersisterSpouseProfessionDetails;
                        model.ddlFSHStateID = item.FatherSisterspousestateId;
                        model.ddlFSHDistrictID = item.FatherSisterspouseDistrictId;
                        model.txtFSHNativePlace = item.FathersisterSpouseNativePlace;

                        model.ddlFSMObileCountryID = item.FatherSisterMobilecodeid;
                        model.txtFSMobileNumber = item.FatherSisterspouseMobileNumber;


                        if (commonFactory.checkvals(item.FatherSisterspouseLandaraecode)) {
                            model.ddlFSHLandCountryID = item.FatherSisterlandcontrycodeid;
                            model.txtFSHAreaNumber = item.FatherSisterspouseLandaraecode;
                            model.txtFSHNUmber = item.FatherSisterspouseLandNumber;

                        } else {
                            model.ddlFSMObileCountryID2 = item.FatherSisterlandcontrycodeid;
                            model.txtFSMobileNumber2 = item.FatherSisterspouseLandNumber;
                        }

                        model.txtFSHEmails = item.FatherSisterspouseEmail;
                        model.txtFSHCurrentLocation = item.FatherSisterCurrentLocation;
                    }
                    commonFactory.open('ModalContent.html', model.scope, uibModal);

                    break;

                case 'MB':
                    model.motherBrother[0].dataSource = modelpopupopenmethod.getNumForPrintOrderbind(model.MBrr.length + 1);
                    model.MotherBrotherCustfamilyID = null;
                    model.popupdata = model.motherBrother;
                    model.popupHeader = "Mother's Brother Details";
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.motherBrother[0].dataSource = modelpopupopenmethod.getNumForPrintOrderbind(model.MBrr.length);
                        model.MotherBrotherCustfamilyID = item.MotherBrotherCustfamilyID;
                        model.mbPrintOrder = item.BornOrder;
                        model.rdlMBElderYounger = item.MotherBrotherElderyounger == 'Elder' ? 328 : (item.MotherBrotherElderyounger == 'Younger' ? 327 : '-1');
                        model.txtMBName = item.MotherBrotherName;
                        model.txtMBEducation = item.MotherBrotherEducationDetails;
                        model.txtMBProfessiondetails = item.MotherBrotherProfessionDetails;

                        model.ddlMBCountriCode = item.MotherBrotherMobileCode;
                        model.txtMBMobileNum = item.MotherBrotherMobileNumber;


                        if (commonFactory.checkvals(item.MotherBrotherLandaraecode)) {
                            model.ddlMBLandLineCountryCode = item.MotherBrotherLandCountryCode;
                            model.txtMBAreaCode = item.MotherBrotherLandaraecode;
                            model.txtMBLandLineNum = item.MotherBrotherLandNumber;

                        } else {
                            model.ddlMBCountriCode2 = item.MotherBrotherLandCountryCode;
                            model.txtMBMobileNum2 = item.MotherBrotherLandNumber;
                        }

                        model.txtMBEmails = item.MotherBrotherEmail;
                        model.txtMBCurrentLocation = item.MotherBrotherCurrentLocation;
                    }
                    commonFactory.open('ModalContent.html', model.scope, uibModal);

                    break;
                case 'MS':
                    model.motherSister[0].dataSource = modelpopupopenmethod.getNumForPrintOrderbind(model.MSArr.length + 1);
                    model.MotherSisterCustfamilyID = null;
                    model.popupdata = model.motherSister;
                    model.popupHeader = "Mother's Sister Details";
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.motherSister[0].dataSource = modelpopupopenmethod.getNumForPrintOrderbind(model.MSArr.length);
                        model.MotherSisterCustfamilyID = item.MotherSisterCustfamilyID;
                        model.msPrintOrder = item.BornOrder;
                        model.rdlMSElderYounger = item.MotherSisterElderyounger == 'Elder' ? 330 : (item.MotherSisterElderyounger == 'Younger' ? 329 : '-1');
                        model.txtMSName = item.MotherSisterName;
                        model.txtMsHusbandfirstname = item.SpouceFName;
                        model.txtMsHusbandlastname = item.SpoucelName;
                        model.ddlMSisState = item.spousestateid;
                        model.ddlMsDistrict = item.spousedistrictID;
                        model.txtMSNativePlace = item.MotherSisterSpouseNativePlace;
                        model.txtMSHEducation = item.MothersisterspouseEducationdetails;
                        model.txtMSProfessiondetails = item.MotherSisterProfessionDetails;

                        model.ddlMSCounCodeID = item.MotherSisterMobileCodeId;
                        model.txtMSMObileNum = item.MotherSisterspouseMobileNumber;

                        if (commonFactory.checkvals(item.MotherSisterspouseLandaraecode)) {
                            model.ddlMSLLCounCode = item.MotherSisterSpouselandcodeid;
                            model.txtMSArea = item.MotherSisterspouseLandaraecode;
                            model.txtLLNum = item.MotherSisterspouseLandNumber;
                        } else {
                            model.ddlMSCounCodeID2 = item.MotherSisterSpouselandcodeid;
                            model.txtMSMObileNum2 = item.MotherSisterspouseLandNumber;
                        }

                        model.txtMSEmail = item.MotherSisterspouseEmail;
                        model.txtMSCurrentLocation = item.MotherSisterCurrentLocation;
                    }
                    commonFactory.open('ModalContent.html', model.scope, uibModal);

                    break;
            }

        };
        model.updateData = function(inObj, type) {

            switch (type) {
                case "Father's Brother Details":
                    model.FBSubmit(inObj);
                    break;
                case "Father's Sister Details":
                    model.FSSubmit(inObj);
                    break;
                case "Mother's Brother Details":
                    model.MBSubmit(inObj);
                    break;
                case "Mother's Sister Details":
                    model.MSSubmit(inObj);
                    break;
            }
        };

        model.FBSubmit = function(inObj) {
            if (isSubmit) {
                isSubmit = false;
                inObj.GetDetails.CustID = custid;
                inObj.GetDetails.FatherbrotherCust_familyID = model.FatherbrotherCustfamilyID;
                model.submitPromise = editRelativeService.submitFBData(inObj).then(function(response) {
                    commonFactory.closepopup();
                    if (response.data === 1) {
                        model.relativePageLoad(custid);
                        alertss.timeoutoldalerts(model.scope, 'alert-success', "Father's Brother Details Submitted Succesfully", 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', "Father's Brother Details Updation failed", 4500);
                    }
                });
            }
        };

        model.FSSubmit = function(inObj) {

            if (isSubmit) {
                isSubmit = false;
                inObj.GetDetails.CustID = custid;
                inObj.GetDetails.FatherSisterCust_familyID = model.FatherSisterCustfamilyID;
                model.submitPromise = editRelativeService.submitFSData(inObj).then(function(response) {
                    commonFactory.closepopup();
                    if (response.data === 1) {
                        model.relativePageLoad(custid);
                        alertss.timeoutoldalerts(model.scope, 'alert-success', "Father's Sister Details Submitted Succesfully", 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', "Father's Sister Details Updation failed", 4500);
                    }
                });
            }
        };

        model.MBSubmit = function(inObj) {
            if (isSubmit) {
                isSubmit = false;
                inObj.GetDetails.CustID = custid;
                inObj.GetDetails.MBMotherBrotherCust_familyID = model.MotherBrotherCustfamilyID;
                model.submitPromise = editRelativeService.submitMBData(inObj).then(function(response) {
                    commonFactory.closepopup();
                    if (response.data === 1) {
                        model.relativePageLoad(custid);
                        alertss.timeoutoldalerts(model.scope, 'alert-success', "Mother's Brother Details Submitted Succesfully", 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', "Mother's Brother Details Updation failed", 4500);
                    }
                });
            }

        };

        model.MSSubmit = function(inObj) {

            if (isSubmit) {
                isSubmit = false;

                inObj.GetDetails.CustID = custid;
                inObj.GetDetails.MSCust_familyID = model.MotherSisterCustfamilyID;
                model.submitPromise = editRelativeService.submitMSData(inObj).then(function(response) {
                    commonFactory.closepopup();
                    if (response.data === 1) {

                        model.relativePageLoad(custid);
                        alertss.timeoutoldalerts(model.scope, 'alert-success', "Mother's Sister Details Submitted Succesfully", 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', "Mother's Sister Details Updation failed", 4500);
                    }
                });
            }

        };

        model.cancel = function() {
            commonFactory.closepopup();
        };

        model.DeletePopup = function(type, id) {
            model.deleteDisplayTxt = type;
            model.identityID = id;
            commonFactory.open('templates/deletepopup.html', model.scope, uibModal, 'sm');
        };

        model.deleteSubmit = function() {
            SelectBindService.DeleteSection({ sectioname: 'Family', CustID: custid, identityid: model.identityID }).then(function(response) {
                model.relativePageLoad();
                commonFactory.closepopup();
            });
        };
        //Father Details
        model.fatherBrother = [
            { lblname: 'PrintOrder in view profile', controlType: 'select', ngmodel: 'fbPrintOrder', parameterValue: 'BornOrder' },
            { lblname: 'Elder/Younger', controlType: 'radio', ngmodel: 'rdlFBElderORyounger', required: true, ownArray: 'FBElderYounger', parameterValue: 'FBElderYounger' },
            { lblname: "Father's brother name", controlType: 'textbox', ngmodel: 'txtFatherbrothername', required: true, parameterValue: 'Fatherbrothername' },
            { lblname: 'Education', controlType: 'textbox', ngmodel: 'txtFBEducationdetails', parameterValue: 'FatherBrotherEducationDetails' },
            { lblname: 'Profession', controlType: 'textbox', ngmodel: 'txtFBProfessiondetails', parameterValue: 'FBProfessiondetails' },
            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'ddlFBMobileCountryID',
                strmobile: 'txtFBMobileNumber',
                dalternative: 'ddlFBMobileCountryID2',
                stralternative: 'txtFBMobileNumber2',
                dland: 'ddlFBLandLineCountry',
                strareacode: 'txtFBAreCode',
                strland: 'txtFBLandNumber',
                strmail: 'txtFBEmails',
                mobileCodeIdParameterValue: 'FBMobileCountryID',
                mobileNumberParameterValue: 'FBMobileNumber',
                landCountryCodeIdParameterValue: 'FBLandLineCountryID',
                landAreaCodeIdParameterValue: 'FBLandAreaCode',
                landNumberParameterValue: 'FBLandNumber',
                emailParameterValue: 'FBEmails'

            },
            { lblname: 'Current Location', controlType: 'textbox', ngmodel: 'txtCurrentLocation', parameterValue: 'FBCurrentLocation' },
        ];

        model.fatherSister = [
            { lblname: 'PrintOrder in view profile', controlType: 'select', ngmodel: 'fsPrintOrder', parameterValue: 'BornOrder' },
            { lblname: 'Elder/Younger', controlType: 'radio', ngmodel: 'rdlFSElderYounger', required: true, ownArray: 'FSElderYounger', parameterValue: 'FSElderYounger' },
            { lblname: "Father's sister name", controlType: 'textbox', ngmodel: 'txtFathersistername', required: true, parameterValue: 'FSFathersistername' },
            { lblname: "Husband first name", controlType: 'textbox', ngmodel: 'txtFSHusbandfirstname', parameterValue: 'FSHusbandfirstname' },
            { lblname: "Husband last name", controlType: 'textbox', ngmodel: 'txtFSHusbandlastname', parameterValue: 'FSHusbandlastname' },
            { lblname: 'FSH Education', controlType: 'textbox', ngmodel: 'txtFSHEDucation', parameterValue: 'FSHEducationdetails' },
            { lblname: 'FSH Profession', controlType: 'textbox', ngmodel: 'txtFSProfessiondetails', parameterValue: 'FSHProfessiondetails' },
            {
                controlType: 'country',
                countryshow: false,
                cityshow: false,
                othercity: false,
                dcountry: 'ddlFSHCountryID',
                dstate: 'ddlFSHStateID',
                ddistrict: 'ddlFSHDistrictID',
                countryParameterValue: 'FSCountryID',
                stateParameterValue: 'FSHStateID',
                districtParameterValue: 'FSHDistrict',

            },
            { lblname: 'Native place', controlType: 'textbox', ngmodel: 'txtFSHNativePlace', parameterValue: 'FSNativeplace' },

            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'ddlFSMObileCountryID',
                strmobile: 'txtFSMobileNumber',
                dalternative: 'ddlFSMObileCountryID2',
                stralternative: 'txtFSMobileNumber2',
                dland: 'ddlFSHLandCountryID',
                strareacode: 'txtFSHAreaNumber',
                strland: 'txtFSHNUmber',
                strmail: 'txtFSHEmails',

                mobileCodeIdParameterValue: 'FSHMobileCountryID',
                mobileNumberParameterValue: 'FSHMObileNumber',
                landCountryCodeIdParameterValue: 'FSHLandCountryID',
                landAreaCodeIdParameterValue: 'FSHLandAreaCode',
                landNumberParameterValue: 'FSHLandNumber',
                emailParameterValue: 'FSHEmails'

            },
            { lblname: 'Current Location', controlType: 'textbox', ngmodel: 'txtFSHCurrentLocation', parameterValue: 'FSCurrentLocation' },
        ];

        //mother Details
        model.motherBrother = [
            { lblname: 'PrintOrder in view profile', controlType: 'select', ngmodel: 'mbPrintOrder', parameterValue: 'BornOrder' },
            { lblname: 'Elder/Younger', controlType: 'radio', ngmodel: 'rdlFBElderORyounger', required: true, ownArray: 'MBElderYounger', parameterValue: 'MBElderYounger' },
            { lblname: "Mother's brother name", controlType: 'textbox', ngmodel: 'txtMBName', required: true, parameterValue: 'Motherbrothername' },
            { lblname: 'Education', controlType: 'textbox', ngmodel: 'txtMBEducation', parameterValue: 'MBEducationdetails' },
            { lblname: 'Profession', controlType: 'textbox', ngmodel: 'txtMBProfessiondetails', parameterValue: 'MBProfessiondetails' },
            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'ddlMBCountriCode',
                strmobile: 'txtMBMobileNum',
                dalternative: 'ddlMBCountriCode2',
                stralternative: 'txtMBMobileNum2',
                dland: 'ddlMBLandLineCountryCode',
                strareacode: 'txtMBAreaCode',
                strland: 'txtMBLandLineNum',
                strmail: 'txtMBEmails',

                mobileCodeIdParameterValue: 'MBMobileCountryID',
                mobileNumberParameterValue: 'MBMObileNumber',
                landCountryCodeIdParameterValue: 'MBLandLineCountryID',
                landAreaCodeIdParameterValue: 'MBLandAreaCode',
                landNumberParameterValue: 'MBLandNumber',
                emailParameterValue: 'MBEmails'

            },
            { lblname: 'Current Location', controlType: 'textbox', ngmodel: 'txtMBCurrentLocation', parameterValue: 'MBCurrentLocation' },
        ];

        model.motherSister = [
            { lblname: 'PrintOrder in view profile', controlType: 'select', ngmodel: 'msPrintOrder', parameterValue: 'BornOrder' },
            { lblname: 'Elder/Younger', controlType: 'radio', ngmodel: 'rdlMSElderYounger', required: true, ownArray: 'MSElderYounger', parameterValue: 'MSElderYounger' },
            { lblname: "Mother's sister name", controlType: 'textbox', ngmodel: 'txtMSName', required: true, parameterValue: 'Mothersistername' },
            { lblname: "Husband first name", controlType: 'textbox', ngmodel: 'txtMsHusbandfirstname', parameterValue: 'MSHusbandfirstname' },
            { lblname: "Husband last name", controlType: 'textbox', ngmodel: 'txtMsHusbandlastname', parameterValue: 'MSHusbandlastname' },
            { lblname: 'FSH Education', controlType: 'textbox', ngmodel: 'txtMSHEducation', parameterValue: 'MSEducationdetails' },
            { lblname: 'FSH Profession', controlType: 'textbox', ngmodel: 'txtMSProfessiondetails', parameterValue: 'MSProfessiondetails' },
            {
                controlType: 'country',
                countryshow: false,
                cityshow: false,
                othercity: false,
                dcountry: 'ddlFSHCountryID',
                dstate: 'ddlMSisState',
                ddistrict: 'ddlMsDistrict',
                countryParameterValue: 'MSCountryID',
                stateParameterValue: 'MSMSHStateID',
                districtParameterValue: 'MSMSHDistrictID'
            },
            { lblname: 'Native place', controlType: 'textbox', ngmodel: 'txtMSNativePlace', parameterValue: 'MSNativeplace' },
            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'ddlMSCounCodeID',
                strmobile: 'txtMSMObileNum',
                dalternative: 'ddlMSCounCodeID2',
                stralternative: 'txtMSMObileNum2',
                dland: 'ddlMSLLCounCode',
                strareacode: 'txtMSArea',
                strland: 'txtLLNum',
                strmail: 'txtMSEmail',

                mobileCodeIdParameterValue: 'MSMSHMobileCountryID',
                mobileNumberParameterValue: 'MSMObileNumber',
                landCountryCodeIdParameterValue: 'MSHLandlineCountryID',
                landAreaCodeIdParameterValue: 'MSLandAreaCode',
                landNumberParameterValue: 'MSLandNumber',
                emailParameterValue: 'MSHEmails'

            },
            { lblname: 'Current Location', controlType: 'textbox', ngmodel: 'txtMSCurrentLocation', parameterValue: 'MSCurrentLocation' },
        ];
        model.MSElderYounger = [
            { "label": "Elder", "title": "Elder", "value": 330 },
            { "label": "Younger", "title": "Younger", "value": 329 }
        ];
        model.MBElderYounger = [
            { "label": "Elder", "title": "Elder", "value": 328 },
            { "label": "Younger", "title": "Younger", "value": 327 }
        ];
        model.FSElderYounger = [
            { "label": "Elder", "title": "Elder", "value": 326 },
            { "label": "Younger", "title": "Younger", "value": 325 }
        ];
        model.FBElderYounger = [
            { "label": "Elder", "title": "Elder", "value": 324 },
            { "label": "Younger", "title": "Younger", "value": 323 }
        ];
        return model.init();
    }

    angular
        .module('Kaakateeya')
        .factory('editRelativeModel', factory);

    factory.$inject = ['editRelativeService', 'authSvc', 'alert', 'commonFactory', '$uibModal', 'SelectBindService', '$stateParams', 'modelpopupopenmethod'];

})(angular);