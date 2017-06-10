(function(angular) {
    'use strict';


    function factory(editSibblingService, authSvc, alertss, commonFactory, uibModal, SelectBindService, stateParams) {
        var model = {};
        model.scope = {};
        //start declaration block

        model.sibblingCountArr = [];
        model.BrotherArr = [];
        model.sisterArr = [];
        model.broObj = [];
        model.sisObj = [];
        model.sibCountsBindArr = commonFactory.numbersBind('', 0, 10);
        model.SibCountObj = {};
        model.BroCount = null;
        model.SisCount = null;
        model.CountryVal = '1';
        model.identityID = 0;
        var loginEmpid = authSvc.LoginEmpid();
        var AdminID = authSvc.isAdmin();
        var isSubmit = true;
        var custID = model.CustID = stateParams.CustID;
        model.broPrintArr = [];
        model.sisPrintArr = [];
        //end declaration block

        model.init = function() {
            custID = model.CustID = stateParams.CustID;
            model.sibPageload();

            model.broPrintOrder = 0;
            model.sisPrintOrder = 0;
            return model;
        };

        model.sibPageload = function() {

            editSibblingService.getSibblingeData(custID).then(function(response) {
                model.sibblingCountArr = JSON.parse(response.data[0]);
                model.BrotherArr = JSON.parse(response.data[1]);
                model.sisterArr = JSON.parse(response.data[2]);
                model.BroCount = model.sibblingCountArr[0].NoOfBrothers;
                model.SisCount = model.sibblingCountArr[0].NoOfSisters;

                model.broModifiedby = (model.BrotherArr.length > 0 && model.BrotherArr[0].EmpLastModificationDate !== undefined && model.BrotherArr[0].EmpLastModificationDate !== null) ? model.BrotherArr[0].EmpLastModificationDate : '';
                model.sisModifiedby = (model.sisterArr.length > 0 && model.sisterArr[0].EmpLastModificationDate !== undefined && model.sisterArr[0].EmpLastModificationDate !== null) ? model.sisterArr[0].EmpLastModificationDate : '';

                model.broPrintArr = model.getNumForSibOrderbind(model.BrotherArr.length);
                model.sisPrintArr = model.getNumForSibOrderbind(model.sisterArr.length);

            });
        };


        model.getNumForSibOrderbind = function(count) {
            var arr = [];
            arr.push({ "label": "--Select--", "title": "--Select--", "value": 0 });
            for (var i = 1; i <= count; i++) {
                arr.push({ "label": "p" + i, "title": "p" + i, "value": i });
            }
            return arr;
        };

        model.sibblingPopulatePopulate = function(type, item) {
            isSubmit = true;
            switch (type) {
                case 'sibCounrt':
                    model.popupdata = model.noOfSibblings;
                    model.popupHeader = 'Sibling Details';
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.noOfBorthersId = item.NoOfBrothers;
                        model.noOfelderBroId = item.NoOfElderBrothers;
                        model.noOfyoungerBroId = item.NoOfYoungerBrothers;
                        model.noOfSisterId = item.NoOfSisters;
                        model.noOfelderSisId = item.NoOfElderSisters;
                        model.noOfyoungerSisId = item.NoOfYoungerSisters;
                    }
                    commonFactory.open('commonSibblingpopup.html', model.scope, uibModal);
                    break;

                case 'brother':
                    model.popupdata = model.brother;
                    model.popupHeader = 'Brother details';

                    if (item !== undefined && model.BrotherArr.length <= parseInt(model.BroCount)) {
                        model.SibilingCustfamilyID = null;
                        model.broObj = {};
                        if (item !== undefined) {
                            model.eventType = 'edit';
                            model.SibilingCustfamilyID = item.SibilingCustfamilyID;
                            model.youngerElderBro = item.brotherYoungerORelder == 'Elder' ? 42 : (item.brotherYoungerORelder == 'Younger' ? 41 : '-1');
                            model.broName = item.SibilingName;
                            model.broEducation = item.SibilingEducationDetails;
                            model.broDesignation = item.SibilingProfessionDetails;
                            model.broComapnyName = item.SibilingCompany;
                            model.broJobLocation = item.SibilingJobPLace;

                            model.broCountryCodeId = item.SibilingMobileCode;
                            model.broMobileNumber = item.SibilingMobileNumber;

                            if (item.SibilingLandaraecode !== '' && item.SibilingLandaraecode !== null) {
                                model.broLandountryCodeId = item.SibilngLandCountryCode;
                                model.broLandAreaCodeId = item.SibilingLandaraecode;
                                model.broLandNumberId = item.SibilingLandNumber;
                            } else {
                                model.broAlternativeCountryCodeId = item.SibilngLandCountryCode;
                                model.broAlternativeNumber = item.SibilingLandNumber;
                            }

                            model.broEmail = item.SibilingEmail;
                            model.broIsMarried = item.SibilingMarried;

                            model.spouseName = item.SibilingSpouseName;
                            model.spouseEducation = item.SibilingSpouseEducationDetails;
                            model.spouseDesignation = item.SibilingSpouseProfessionDetails;
                            model.chkspousehousewife = item.SibilingSpouseProfessionDetails === 'HouseWife' ? true : false;
                            model.spouseCompany = item.spoucecompanyName;
                            model.spouseJobLocation = item.spoucejobloc;
                            model.spouseCountryCodeId = item.SibilingSpouseMobileCode;
                            model.spouseMobNumber = item.SibilingSpouceMobileNumber;
                            if (item.SibilingSpouseLandareCode !== '' && item.SibilingSpouseLandareCode !== null) {
                                model.spouseLandCountryCodeId = item.SibilingSpouseLandCode;
                                model.spouseLandAreaCodeId = item.SibilingSpouseLandareCode;
                                model.spouseLandNumberId = item.SibilngSpouseLandnumber;
                            } else {
                                model.spouseAlternativeCountryCodeId = item.SibilingSpouseLandCode;
                                model.spouseAlternativeNumber = item.SibilngSpouseLandnumber;
                            }

                            model.sfCountryCodeId = item.SpouseFatherMobileCountryID;
                            model.sfMobileNumber = item.SpouseFatherMobileNo;
                            if (item.SpouseFatherLandAreaCode !== '' && item.SpouseFatherLandAreaCode !== null) {
                                model.sfLandountryCodeId = item.SpouseFatherLandCountryID;
                                model.sfLandAreaCodeId = item.SpouseFatherLandAreaCode;
                                model.sfLandNumberId = item.SpouseFatherLandNo;
                            } else {
                                model.sfAlternativeCountryCodeId = item.SpouseFatherLandCountryID;
                                model.sfAlternativeNumber = item.SpouseFatherLandNo;
                            }
                            model.sfEmail = item.SpouseFatherEmailID;
                            model.spouseEmail = item.SpouseEmail;
                            model.spouseFatherLastName = item.SFsurname;
                            model.spouseFatherFirstName = item.SFname;
                            model.spouseFatherCaste = item.SibilingSpouseFatherCasteID;
                            model.broSpouseFatherStateId = item.BroSpouseFatherStateID;
                            model.broSpouseFatherDistrictId = item.BroSpouseFatherDistrictID;
                            model.broSpouseCityId = item.BroSpouseFatherCity;
                            model.broProfessionCatgory = item.ProfessionCategoryID;
                            model.spouseProfCatgory = item.SpouceProfessionCategoryID;
                            //  
                            commonFactory.open('commonSibblingpopup.html', model.scope, uibModal);
                        }
                    } else if (item === undefined && model.BrotherArr.length < parseInt(model.BroCount)) {
                        model.SibilingCustfamilyID = null;
                        model.broObj = {};
                        commonFactory.open('commonSibblingpopup.html', model.scope, uibModal);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Cannot add more brothers', 4500);
                    }

                    break;

                case 'sister':
                    model.popupdata = model.sister;
                    model.popupHeader = 'Sister details';
                    if (item !== undefined && model.sisterArr.length <= parseInt(model.SisCount)) {

                        model.SibilingCustfamilyID = null;
                        model.sisObj = {};

                        if (item !== undefined) {
                            model.eventType = 'edit';
                            model.SibilingCustfamilyID = item.SibilingCustfamilyID;
                            model.youngerElderSis = item.SisterElderORyounger == 'Elder' ? '322' : (item.SisterElderORyounger == 'Younger' ? '321' : '-1');
                            model.sisName = item.SibilingName;
                            model.sisEducation = item.SibilingEducationDetails;
                            model.sisDesignation = item.SibilingProfessionDetails;
                            model.chksishousewife = item.SibilingProfessionDetails === 'HouseWife' ? true : false;
                            model.sisComapnyName = item.SibilingCompany;
                            model.sisJobLocation = item.SibilingJobPLace;

                            model.sisCountryCodeId = item.SibilingMobileCode;
                            model.sisMobileNumber = item.SibilingMobileNumber;

                            if (item.SibilingLandaraecode !== '' && item.SibilingLandaraecode !== null) {
                                model.sisLandountryCodeId = item.SibilngLandCountryCode;
                                model.sisLandAreaCodeId = item.SibilingLandaraecode;
                                model.sisLandNumberId = item.SibilingLandNumber;
                            } else {
                                model.sisAlternativeCountryCodeId = item.SibilngLandCountryCode;
                                model.sisAlternativeNumber = item.SibilingLandNumber;
                            }

                            model.sisEmail = item.SibilingEmail;
                            model.sisIsMarried = item.SibilingMarried;

                            model.husbandName = item.SibilingSpouseName;
                            model.husbandEducation = item.SibilingSpouseEducationDetails;
                            model.husbandDesignation = item.SibilingSpouseProfessionDetails;
                            model.husbandCompany = item.spoucecompanyName;
                            model.husbandJobLocation = item.spoucejobloc;

                            model.husbandCountryCodeId = item.sisterspousemobilecode;
                            model.husbandMobNumber = item.SibilingSpouceMobileNumber;

                            if (item.SibilingSpouseLandareCode !== '' && item.SibilingSpouseLandareCode !== null) {
                                model.husbandLandCountryCodeId = item.SpousesisterLandCode;
                                model.husbandLandNumberId = item.SibilngSpouseLandnumber;
                                model.husbandLandAreaCodeId = item.SibilingSpouseLandareCode;
                            } else {
                                model.husbandAlternativeCountryCodeId = item.SpousesisterLandCode;
                                model.husbandAlternativeNumber = item.SibilngSpouseLandnumber;

                            }
                            model.hfCountryCodeId = item.SpouseFatherMobileCountryID;
                            model.hfMobileNumber = item.SpouseFatherMobileNo;
                            if (item.SpouseFatherLandAreaCode !== '' && item.SpouseFatherLandAreaCode !== null) {
                                model.hfLandountryCodeId = item.SpouseFatherLandCountryID;
                                model.hfLandAreaCodeId = item.SpouseFatherLandAreaCode;
                                model.hfLandNumberId = item.SpouseFatherLandNo;
                            } else {
                                model.hfAlternativeCountryCodeId = item.SpouseFatherLandCountryID;
                                model.hfAlternativeNumber = item.SpouseFatherLandNo;
                            }
                            model.hfEmail = item.SpouseFatherEmailID;

                            model.husbandEmail = item.SpouseEmail;
                            model.husbandFatherLastName = item.SpouceFatherLName;
                            model.spouseFatherFirstName = item.SpouceFatherFName;
                            model.spouseFatherCaste = item.SibilingSpouseFatherCasteId;
                            model.broSpouseFatherStateId = item.SisSpouseFatherStateID;
                            model.broSpouseFatherDistrictId = item.SisSpouseFatherDitrictID;
                            model.broSpouseCityId = item.SisSpousefatherCity;
                            model.sisProfessionCatgory = item.ProfessionCategoryID;
                            model.husbandProfCatgory = item.SpouceProfessionCategoryID;
                            commonFactory.open('commonSibblingpopup.html', model.scope, uibModal);
                        }
                    } else if (item === undefined && model.sisterArr.length < parseInt(model.SisCount)) {

                        model.SibilingCustfamilyID = null;
                        model.sisObj = {};
                        commonFactory.open('commonSibblingpopup.html', model.scope, uibModal);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Cannot add more sisters', 4500);
                        break;
                    }
            }

        };


        model.cancel = function() {
            commonFactory.closepopup();
        };
        model.checkVal = function(val) {
            return (val !== '' && val !== undefined) ? val : 0;
        };


        model.enableSubmit = function() {
            isSubmit = true;
        };

        model.deleteDisplayTxt = '';
        model.DeletePopup = function(type, id) {
            model.deleteDisplayTxt = type;
            model.identityID = id;
            commonFactory.open('templates/deletepopup.html', model.scope, uibModal, 'sm');
        };

        model.deleteSubmit = function(type) {

            SelectBindService.DeleteSection({ sectioname: 'Family', CustID: custID, identityid: model.identityID }).then(function() {
                model.sibPageload(custID);
                commonFactory.closepopup();
            });
        };

        model.updateData = function(inObj, type) {

            if (isSubmit) {
                isSubmit = false;
                switch (type) {
                    case 'Sibling Details':
                        var totalnofBrothers = parseInt(model.checkVal(model.noOfBorthersId));
                        var elderBrotherCount = parseInt(model.checkVal(model.noOfelderBroId));
                        var youngerBrotherCount = parseInt(model.checkVal(model.noOfyoungerBroId));

                        var totalnoFSister = parseInt(model.checkVal(model.noOfSisterId));
                        var elderSisterCount = parseInt(model.checkVal(model.noOfelderSisId));
                        var youngerSisterCount = parseInt(model.checkVal(model.noOfyoungerSisId));

                        if ((totalnofBrothers === 0 || totalnofBrothers === (elderBrotherCount + youngerBrotherCount)) && (totalnoFSister === 0 || totalnoFSister === (elderSisterCount + youngerSisterCount))) {

                            var objinput = {};
                            objinput = inObj.GetDetails;
                            objinput.CustID = custID;

                            model.BroCount = model.noOfBorthersId;
                            model.SisCount = model.noOfSisterId;

                            model.submitPromise = editSibblingService.submitSibCountsData(objinput).then(function(response) {
                                console.log(response);
                                commonFactory.closepopup();
                                if (response.data === 1) {
                                    model.sibPageload(custID);
                                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Sibling Details Submitted Succesfully', 4500);
                                } else {
                                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Sibling Details Updation failed', 4500);
                                }
                            });
                        } else {
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please enter Correct Sibling count', 4500);
                        }

                        break;
                    case 'Brother details':

                        inObj.GetDetails.CustID = custID;
                        inObj.GetDetails.BroSibilingCustfamilyID = model.SibilingCustfamilyID;
                        model.submitPromise = editSibblingService.submitSibBroData(inObj).then(function(response) {
                            console.log(response);
                            commonFactory.closepopup();
                            if (response.data === 1) {
                                model.sibPageload(custID);
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Brother Details Submitted Succesfully', 4500);
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Brother Details Updation failed', 4500);
                            }
                        });

                        break;
                    case 'Sister details':
                        inObj.GetDetails.CustID = custID;
                        inObj.GetDetails.SisSibilingCustfamilyID = model.SibilingCustfamilyID;
                        model.submitPromise = editSibblingService.submitSibSisData(inObj).then(function(response) {
                            console.log(response);
                            commonFactory.closepopup();
                            if (response.data === 1) {
                                model.sibPageload(custID);
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Sister Details Submitted Succesfully', 4500);
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Sister Details Updation failed', 4500);
                            }
                        });


                        break;
                }
            }
        };

        model.hideSibbroIfZero = function() {
            if (parseInt(model.noOfBorthersId) === 0) {
                model.noOfelderBroId = 0;
                model.noOfyoungerBroId = 0;
                return false;
            }
            return true;
        };
        model.hideSibsisIfZero = function() {
            if (parseInt(model.noOfSisterId) === 0) {
                model.noOfelderSisId = 0;
                model.noOfyoungerSisId = 0;
                return false;
            }
            return true;
        };

        model.showHousewifespouse = function(val) {
            return model.ismarried() ? (model.chkspousehousewife === true ? false : true) : false;
        };

        model.ismarried = function() {

            if (parseInt(model.broIsMarried) === 0) {
                model.spouseName = '';
                model.spouseEducation = '';
                model.spouseDesignation = '';
                model.chkspousehousewife = '';
                model.spouseCompany = '';
                model.spouseJobLocation = '';
                model.spouseCountryCodeId = '';
                model.spouseMobNumber = '';
                model.spouseLandCountryCodeId = '';
                model.spouseLandAreaCodeId = '';
                model.spouseLandNumberId = '';
                model.spouseAlternativeCountryCodeId = '';
                model.spouseAlternativeNumber = '';
                model.spouseEmail = '';
                model.spouseFatherLastName = '';
                model.spouseFatherFirstName = '';
                model.spouseFatherCaste = '';
                model.broSpouseFatherStateId = '';
                model.broSpouseFatherDistrictId = '';
                model.broSpouseCityId = '';
                model.spouseProfCatgory = '';
                return false;
            }
            return true;
        };
        model.isSismarried = function() {

            if (parseInt(model.sisIsMarried) === 0) {
                model.husbandName = '';
                model.husbandEducation = '';
                model.husbandProfCatgory = '';
                model.husbandDesignation = '';
                model.husbandCompany = '';
                model.husbandJobLocation = '';
                model.husbandCountryCodeId = '';
                model.husbandMobNumber = '';
                model.husbandAlternativeCountryCodeId = '';
                model.husbandAlternativeNumber = '';
                model.husbandLandCountryCodeId = '';
                model.husbandLandAreaCodeId = '';
                model.husbandLandNumberId = '';
                model.husbandEmail = '';
                model.husbandFatherLastName = '';
                model.spouseFatherFirstName = '';
                model.spouseFatherCaste = '';
                model.broSpouseFatherStateId = '';
                model.broSpouseFatherDistrictId = '';
                model.broSpouseCityId = '';

                return false;
            }
            return true;
        };



        model.showHousewifeSis = function(val) {
            return model.chksishousewife === true ? false : true;
        };

        model.noOfSibblings = [
            { lblname: 'No of Brothers', controlType: 'select', ngmodel: 'noOfBorthersId', ownArray: 'sibCountsBindArr', parameterValue: 'NoOfBrothers' },
            { lblname: 'Elder Brother', controlType: 'select', ngmodel: 'noOfelderBroId', ownArray: 'sibCountsBindArr', parameterValue: 'NoOfElderBrothers', parentDependecy: 'hideSibbroIfZero' },
            { lblname: 'Younger Brother', controlType: 'select', ngmodel: 'noOfyoungerBroId', ownArray: 'sibCountsBindArr', parameterValue: 'NoOfYoungerBrothers', parentDependecy: 'hideSibbroIfZero' },
            { lblname: 'No of sisters', controlType: 'select', ngmodel: 'noOfSisterId', ownArray: 'sibCountsBindArr', parameterValue: 'NoOfSisters' },
            { lblname: 'Elder sisters', controlType: 'select', ngmodel: 'noOfelderSisId', ownArray: 'sibCountsBindArr', parameterValue: 'NoOfElderSisters', parentDependecy: 'hideSibsisIfZero' },
            { lblname: 'Younger  sisters', controlType: 'select', ngmodel: 'noOfyoungerSisId', ownArray: 'sibCountsBindArr', parameterValue: 'NoOfYoungerSisters', parentDependecy: 'hideSibsisIfZero' },
            { lblname: '', controlType: 'break' }
        ];

        model.brother = [
            { lblname: 'printOrder', controlType: 'selectNumber', ngmodel: 'broPrintOrder', parameterValue: 'BroPrintOrderID', dataSource: model.broPrintArr },
            { lblname: 'Elder/Younger', controlType: 'radio', ngmodel: 'youngerElderBro', required: true, ownArray: 'broElderYoungerArr', parameterValue: 'BroElderYounger' },
            { lblname: 'Name', controlType: 'textbox', ngmodel: 'broName', required: true, parameterValue: 'BroName' },
            { lblname: 'Education', controlType: 'textbox', ngmodel: 'broEducation', parameterValue: 'BroEducationDetails' },
            { lblname: 'Profession Category', controlType: 'select', ngmodel: 'broProfessionCatgory', typeofdata: 'newProfessionCatgory', parameterValue: 'BroProfessionCategoryID' },
            { lblname: 'Designationt', controlType: 'textbox', ngmodel: 'broDesignation', parameterValue: 'BroProfessionDetails' },
            { lblname: 'Company Name', controlType: 'textbox', ngmodel: 'broComapnyName', parameterValue: 'BroCompanyName' },
            { lblname: 'Job Location', controlType: 'textbox', ngmodel: 'broJobLocation', parameterValue: 'BroJobLocation' },
            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'broCountryCodeId',
                strmobile: 'broMobileNumber',
                dalternative: 'broAlternativeCountryCodeId',
                stralternative: 'broAlternativeNumber',
                dland: 'broLandountryCodeId',
                strareacode: 'broLandAreaCodeId',
                strland: 'broLandNumberId',
                strmail: 'broEmail',

                mobileCodeIdParameterValue: 'BroMobileCountryCodeID',
                mobileNumberParameterValue: 'BroMobileNumber',
                landCountryCodeIdParameterValue: 'BroLandCountryCodeID',
                landAreaCodeIdParameterValue: 'BroLandAreaCode',
                landNumberParameterValue: 'BroLandNumber',
                emailParameterValue: 'BroEmail'
            },
            { lblname: 'Is Married', controlType: 'radio', ngmodel: 'broIsMarried', required: true, arrbind: 'boolType', parameterValue: 'BIsMarried', },
            { lblname: 'Spouse Name', controlType: 'textbox', ngmodel: 'spouseName', parameterValue: 'BroWifeName', parentDependecy: 'ismarried' },
            { lblname: 'Spouse Education', controlType: 'textbox', ngmodel: 'spouseEducation', parameterValue: 'BrowifeEducationDetails', parentDependecy: 'ismarried' },
            { lblname: 'Profession Category', controlType: 'select', ngmodel: 'spouseProfCatgory', typeofdata: 'newProfessionCatgory', parameterValue: 'BroSpouseProfessionCategoryID', parentDependecy: 'ismarried' },
            { lblname: 'Spouse Designation', controlType: 'housewife', ngmodelText: 'spouseDesignation', ngmodelChk: 'chkspousehousewife', parameterValueText: 'BroWifeProfessionDetails', parameterValueChk: 'MotherProfessiondetails', parentDependecy: 'ismarried' },
            { lblname: 'Company Name', controlType: 'textbox', ngmodel: 'spouseCompany', parameterValue: 'BroWifeCompanyName', parentDependecy: 'showHousewifespouse' },
            { lblname: 'Job Location', controlType: 'textbox', ngmodel: 'spouseJobLocation', parameterValue: 'BroWifeJobLocation', parentDependecy: 'showHousewifespouse' },
            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'spouseCountryCodeId',
                strmobile: 'spouseMobNumber',
                dalternative: 'spouseAlternativeCountryCodeId',
                stralternative: 'spouseAlternativeNumber',
                dland: 'spouseLandCountryCodeId',
                strareacode: 'spouseLandAreaCodeId',
                strland: 'spouseLandNumberId',
                strmail: 'spouseEmail',
                parentDependecy: 'ismarried',
                mobileCodeIdParameterValue: 'BroWifeMobileCountryCodeID',
                mobileNumberParameterValue: 'BroWifeMobileNumber',
                landCountryCodeIdParameterValue: 'BroWifeLandCountryCodeID',
                landAreaCodeIdParameterValue: 'BroWifeLandAreacode',
                landNumberParameterValue: 'BroWifeLandNumber',
                emailParameterValue: 'BrotherSpouseEmail'
            },
            { lblname: 'Spouse Father SurName', controlType: 'textbox', ngmodel: 'spouseFatherLastName', parameterValue: 'BroWifeFatherSurName', parentDependecy: 'ismarried' },
            { lblname: 'Spouse Father Name', controlType: 'textbox', ngmodel: 'spouseFatherFirstName', parameterValue: 'BroWifeFatherName', parentDependecy: 'ismarried' },
            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'sfCountryCodeId',
                strmobile: 'sfMobileNumber',
                dalternative: 'sfAlternativeCountryCodeId',
                stralternative: 'sfAlternativeNumber',
                dland: 'sfLandountryCodeId',
                strareacode: 'sfLandAreaCodeId',
                strland: 'sfLandNumberId',
                strmail: 'sfEmail',
                parentDependecy: 'ismarried',

                mobileCodeIdParameterValue: 'BroSpouseFatherMobileCountryID',
                mobileNumberParameterValue: 'BroSpouseFatherMobileNo',
                landCountryCodeIdParameterValue: 'BroSpouseFatherLandCountryID',
                landAreaCodeIdParameterValue: 'BroSpouseFatherLandAreaCode',
                landNumberParameterValue: 'BroSpouseFatherLandNo',
                emailParameterValue: 'BroSpouseFatherEmailID'
            },

            { lblname: 'Spouse Father Caste', controlType: 'select', ngmodel: 'spouseFatherCaste', typeofdata: 'caste', parameterValue: 'SibilingSpouseFatherCasteID', parentDependecy: 'ismarried' },
            {
                controlType: 'country',
                countryshow: false,
                cityshow: false,
                othercity: false,
                dstate: 'broSpouseFatherStateId',
                ddistrict: 'broSpouseFatherDistrictId',
                parentDependecy: 'ismarried',
                countryParameterValue: 'BroSpouseFatherCountryID',
                stateParameterValue: 'BroSpouseFatherStateID',
                districtParameterValue: 'BroSpouseFatherDitrictID'
            },
            { lblname: 'Native Place', controlType: 'textbox', ngmodel: 'broSpouseCityId', parameterValue: 'BroSpouseFatherNativePlace', parentDependecy: 'ismarried' }

        ];

        model.sister = [
            { lblname: 'printOrder', controlType: 'selectNumber', ngmodel: 'sisPrintOrder', parameterValue: 'SisPrintOrderID', ownArray: 'sisPrintArr' },
            { lblname: 'Elder/Younger', controlType: 'radio', ngmodel: 'youngerElderSis', required: true, ownArray: 'sisElderYoungerArr', parameterValue: 'SisElderYounger' },
            { lblname: 'Name', controlType: 'textbox', ngmodel: 'sisName', required: true, parameterValue: 'SisName' },
            { lblname: 'Education', controlType: 'textbox', ngmodel: 'sisEducation', parameterValue: 'siseducationdetails' },
            { lblname: 'Profession Category', controlType: 'select', ngmodel: 'sisProfessionCatgory', typeofdata: 'newProfessionCatgory', parameterValue: 'SisProfessionCategoryID' },
            { lblname: 'Designationt', controlType: 'housewife', ngmodelText: 'sisDesignation', ngmodelChk: 'chksishousewife', parameterValueText: 'sisprofessiondetails' },
            { lblname: 'Company Name', controlType: 'textbox', ngmodel: 'sisComapnyName', parameterValue: 'SisCompanyName', parentDependecy: 'showHousewifeSis' },
            { lblname: 'Job Location', controlType: 'textbox', ngmodel: 'sisJobLocation', parameterValue: 'SisJobLocation', parentDependecy: 'showHousewifeSis' },
            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'sisCountryCodeId',
                strmobile: 'sisMobileNumber',
                dalternative: 'sisAlternativeCountryCodeId',
                stralternative: 'sisAlternativeNumber',
                dland: 'sisLandountryCodeId',
                strareacode: 'sisLandAreaCodeId',
                strland: 'sisLandNumberId',
                strmail: 'sisEmail',

                mobileCodeIdParameterValue: 'SisMobileCountryCodeID',
                mobileNumberParameterValue: 'SisMobileNumber',
                landCountryCodeIdParameterValue: 'SisLandCountryCodeID',
                landAreaCodeIdParameterValue: 'SisLandAreaCode',
                landNumberParameterValue: 'SisLandNumber',
                emailParameterValue: 'SisEmail'
            },
            { lblname: 'Is Married', controlType: 'radio', ngmodel: 'sisIsMarried', required: true, arrbind: 'boolType', parameterValue: 'SIsMarried' },
            { lblname: 'Husband Name', controlType: 'textbox', ngmodel: 'husbandName', parameterValue: 'SisHusbandName', parentDependecy: 'isSismarried' },
            { lblname: 'Husband Education', controlType: 'textbox', ngmodel: 'husbandEducation', parameterValue: 'sisspouseeducationdetails', parentDependecy: 'isSismarried' },
            { lblname: 'Profession Category', controlType: 'select', ngmodel: 'husbandProfCatgory', typeofdata: 'newProfessionCatgory', parameterValue: 'SisSpouseProfessionCategoryID', parentDependecy: 'isSismarried' },
            { lblname: 'Husband Designation', controlType: 'textbox', ngmodel: 'husbandDesignation', parameterValue: 'sisspouseprofessiondetails', parentDependecy: 'isSismarried' },
            { lblname: 'Company Name', controlType: 'textbox', ngmodel: 'husbandCompany', parameterValue: 'SisHusCompanyName', parentDependecy: 'isSismarried' },
            { lblname: 'Job Location', controlType: 'textbox', ngmodel: 'husbandJobLocation', parameterValue: 'SisHusJobLocation', parentDependecy: 'isSismarried' },
            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'husbandCountryCodeId',
                strmobile: 'husbandMobNumber',
                dalternative: 'husbandAlternativeCountryCodeId',
                stralternative: 'husbandAlternativeNumber',
                dland: 'husbandLandCountryCodeId',
                strareacode: 'husbandLandAreaCodeId',
                strland: 'husbandLandNumberId',
                strmail: 'husbandEmail',
                parentDependecy: 'isSismarried',
                mobileCodeIdParameterValue: 'SisHusbandMobileCountryCodeID',
                mobileNumberParameterValue: 'SisHusbandMobileNumber',
                landCountryCodeIdParameterValue: 'SisHusbandLandCountryCodeID',
                landAreaCodeIdParameterValue: 'SisHusbandLandAreacode',
                landNumberParameterValue: 'SisHusbandLandNumber',
                emailParameterValue: 'SisSpouseEmail'
            },
            { lblname: 'Husband Father SurName', controlType: 'textbox', ngmodel: 'husbandFatherLastName', parameterValue: 'SisHusbandFatherSurName', parentDependecy: 'isSismarried' },
            { lblname: 'Husband Father Name', controlType: 'textbox', ngmodel: 'spouseFatherFirstName', parameterValue: 'SisHusbandFatherName', parentDependecy: 'isSismarried' },

            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'hfCountryCodeId',
                strmobile: 'hfMobileNumber',
                dalternative: 'hfAlternativeCountryCodeId',
                stralternative: 'hfAlternativeNumber',
                dland: 'hfLandountryCodeId',
                strareacode: 'hfLandAreaCodeId',
                strland: 'hfLandNumberId',
                strmail: 'hfEmail',
                parentDependecy: 'isSismarried',
                mobileCodeIdParameterValue: 'SisSpouseFatherMobileCountryID',
                mobileNumberParameterValue: 'SisSpouseFatherMobileNo',
                landCountryCodeIdParameterValue: 'SisSpouseFatherLandCountryID',
                landAreaCodeIdParameterValue: 'SisSpouseFatherLandAreaCode',
                landNumberParameterValue: 'SisSpouseFatherLandNo',
                emailParameterValue: 'SisSpouseFatherEmailID'
            },

            { lblname: 'Husband Father Caste', controlType: 'select', ngmodel: 'spouseFatherCaste', typeofdata: 'caste', parameterValue: 'SibilingSpouseFatherCasteID', parentDependecy: 'isSismarried' },
            {
                controlType: 'country',
                countryshow: false,
                cityshow: false,
                othercity: false,
                dstate: 'broSpouseFatherStateId',
                ddistrict: 'broSpouseFatherDistrictId',
                parentDependecy: 'isSismarried',
                countryParameterValue: 'SisSpouseFatherCountryID',
                stateParameterValue: 'SisSpouseFatherStateID',
                districtParameterValue: 'SisSpouseFatherDitrictID'
            },
            { lblname: 'Native Place', controlType: 'textbox', ngmodel: 'broSpouseCityId', parameterValue: 'SisSpouseFatherNativePlace', parentDependecy: 'isSismarried' }

        ];

        model.broElderYoungerArr = [
            { "label": "Elder", "title": "Elder", "value": 42 },
            { "label": "Younger", "title": "Younger", "value": 41 }
        ];
        model.sisElderYoungerArr = [
            { "label": "Elder", "title": "Elder", "value": 322 },
            { "label": "Younger", "title": "Younger", "value": 321 }
        ];

        return model.init();
    }

    angular
        .module('Kaakateeya')
        .factory('editSibblingModel', factory);

    factory.$inject = ['editSibblingService', 'authSvc', 'alert', 'commonFactory', '$uibModal', 'SelectBindService', '$stateParams'];

})(angular);