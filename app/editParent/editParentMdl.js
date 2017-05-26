(function(angular) {
    'use strict';

    function factory(editParentService, authSvc, alertss, commonFactory, uibModal, stateParams) {
        var model = {};
        model.model = {};
        //start declarion block
        model.parent = {};
        model.AdrrObj = {};
        model.physicalObj = {};
        model.lblaboutMyfamily = null;
        model.aboutFamilyObj = {};
        model.dcountry = '1';
        model.parentArr = [];
        model.AboutFamilyReviewStatus = null;
        model.eventType = 'add';
        var isSubmit = true;
        var loginEmpid = authSvc.LoginEmpid();
        var AdminID = authSvc.isAdmin();
        //end declarion block

        // var logincustid = authSvc.getCustId();
        var custID = model.CustID = stateParams.CustID;
        //  model.CustID = logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;

        model.init = function() {
            custID = model.CustID = stateParams.CustID;
            model.parentBindData();
            model.AboutPageloadData();
            return model;
        };

        model.parentBindData = function() {
            editParentService.getParentData(custID).then(function(response) {
                if (commonFactory.checkvals(response.data)) {
                    model.parentArr = commonFactory.checkvals(response.data[0]) ? JSON.parse(response.data[0]) : [];
                    model.addressArr = commonFactory.checkvals(response.data[1]) ? JSON.parse(response.data[1]) : [];
                    model.physicalArr = commonFactory.checkvals(response.data[2]) ? JSON.parse(response.data[2]) : [];
                    model.AboutFamily = commonFactory.checkvals(response.data[3]) ? JSON.parse(response.data[3]) : [];
                    if (angular.isArray(model.parentArr)) {
                        model.parentmodifiedby = model.parentArr[0].EmpLastModificationDate;
                        model.addrmodifiedby = model.addressArr[0].EmpLastModificationDate;
                        model.physicalmodifiedby = model.physicalArr[0].EmpLastModificationDate;
                    }
                }

                if (commonFactory.checkvals(model.AboutFamily[0])) {
                    model.AboutFamilyReviewStatus = model.AboutFamily[0].reviewstatus;
                }
            });
        };

        model.AboutPageloadData = function() {
            editParentService.getAboutFamilyData(custID).then(function(response) {
                console.log(response);
                model.lblaboutMyfamily = response.data;
            });
        };

        model.populateModel = function(type, item) {
            isSubmit = true;
            model.eventType = 'add';
            switch (type) {
                case "parent":

                    model.popupdata = model.parent;
                    model.popupHeader = 'Parent details';
                    model.FatherCust_family_id = null;
                    model.MotherCust_family_id = null;

                    if (item !== undefined) {
                        model.eventType = 'edit';

                        model.cust_id = item.cust_id;
                        model.FatherCust_family_id = item.FatherCust_family_id;
                        model.MotherCust_family_id = item.MotherCust_family_id;

                        model.fatherName = item.FatherName;
                        model.fEducation = item.FatherEducationDetails;
                        model.fDesignation = item.FatherProfDetails;
                        model.fCompany = item.FathercompanyName;
                        model.fJobLocation = item.FatherJoblocation;

                        model.fMobileCodeId = item.FatherMobileCountryCodeId;
                        model.fMobileNumber = item.FathermobilenumberID;

                        if (commonFactory.checkvals(item.FatherLandAreaCodeId)) {
                            model.flandCountryCodeId = item.FatherLandCountryCodeId;
                            model.fAreaCodeid = item.FatherLandAreaCodeId;
                            model.flandNumber = item.FatherLandNumberID;
                        } else {
                            model.fAltermobileCodeId = item.FatherLandCountryCodeId;
                            model.fAlterMobileNumber = item.FatherLandNumberID;
                        }

                        model.fEmail = item.FatherEmail;
                        model.fatherFatherName = item.FatherFathername;

                        model.gfMobileCodeId = item.FatherfatherMobileCountryID;
                        model.gfMobileNumber = item.FatherFatherMobileNumber;
                        debugger;
                        if (commonFactory.checkvals(item.FatherFatherLandAreaCode)) {
                            model.gflandCountryCodeId = item.FatherfatherLandCountryCodeID;
                            model.gfAreaCodeid = item.FatherFatherLandAreaCode;
                            model.gflandNumber = item.FatherFatherLandNumber;
                        } else {
                            model.gfAltermobileCodeId = item.FatherfatherLandCountryCodeID;
                            model.gfAlterMobileNumber = item.FatherFatherLandNumber;
                        }

                        model.fStateid = item.FatherStateID;
                        model.fDistrictid = item.FatherDistrictID;
                        model.fNative = item.FatherNativeplace;
                        model.motherName = item.MotherName;
                        model.mEducation = item.MotherEducationDetails;
                        model.mDesignation = item.MotherProfedetails;
                        model.chkhousewife = item.MotherProfedetails == 'HouseWife' ? true : false;
                        model.mCompanyName = item.MothercompanyName;
                        model.mJobLocation = item.MotherJoblocation;

                        model.mMobileCodeId = item.MotherMobileCountryCodeId;
                        model.mMobileNumber = item.MotherMobilenumberID;

                        if (commonFactory.checkvals(item.MotherLandAreaCodeId)) {
                            model.mlandCountryCodeId = item.MotherLandCountryCodeId;
                            model.mAreaCodeid = item.MotherLandAreaCodeId;
                            model.mlandNumber = item.MotherLandNumberID;
                        } else {
                            model.mAltermobileCodeId = item.MotherMobileCountryCodeId;
                            model.mAlterMobileNumber = item.MotherLandNumberID;
                        }

                        model.mEmail = item.MotherEmail;
                        model.mffirstName = item.MotherFatherName;
                        model.mfLastName = item.MotherFatherLastName;

                        model.mfMobileCodeId = item.MotherfatherMobileCountryID;
                        model.mfMobileNumber = item.MotherFatherMobileNumber;

                        if (commonFactory.checkvals(item.MotherFatherLandAreaCode)) {
                            model.mflandCodeId = item.motherfatherLandCountryID;
                            model.mfAreaCodeid = item.MotherFatherLandAreaCode;
                            model.mflandNumber = item.MotherFatherLandNumber;
                        } else {
                            model.mfAltermobileCodeId = item.motherfatherLandCountryID;
                            model.mfAlterMobileNumber = item.MotherFatherLandNumber;
                        }
                        model.mStateid = item.motherStateID;
                        model.mDistrictid = item.motherDistricID;
                        model.mNativePlace = item.MotherNativeplace;
                        model.areParentInterCasteId = item.Intercaste === 'Yes' ? 1 : 0;
                        model.fCaste = item.FatherCasteID;
                        model.mCaste = item.MotherCasteID;

                        model.fProfCatgory = item.FatherProfessionCategoryID;
                        model.mProfCtagory = item.MotherProfessionCategoryID;

                    }

                    break;

                case "Address":
                    model.popupdata = model.Address;
                    model.popupHeader = 'Contact Details';
                    model.Cust_Family_ID = null;

                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.Cust_ID = item.Cust_ID;
                        model.Cust_Family_ID = item.Cust_Family_ID;
                        model.houseFlatNumber = item.FlatNumber;
                        model.apartmentName = item.ApartmentName;
                        model.streetName = item.StreetName;
                        model.areaName = item.AreaName;
                        model.landMark = item.LandMark;
                        model.countryId = item.ParentCountryId;
                        model.stateId = item.ParentStateid;
                        model.districtId = item.ParentDistrictId;
                        model.cityId = item.CityName;
                        model.zipcode = item.Zip;
                    }

                    break;

                case "physicalAttributes":

                    model.popupdata = model.physicalAttributes;
                    model.popupHeader = 'Physical Attributes & Health Details of Candidate';
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.Cust_ID = item.Cust_ID;
                        model.dietId = item.DietID;
                        model.drinkId = item.DrinkID;
                        model.smokeId = item.SmokeID;
                        model.bodyTypeId = item.BodyTypeID;
                        model.bodyWeight = item.BodyWeight;
                        model.bloodGroupId = item.BloodGroupID;
                        model.healthConditionId = item.HealthConditionID;
                        model.healthDescritionId = item.HealthConditionDescription;
                    }

                    break;

                case "AboutFamily":

                    model.popupdata = model.aboutFamily;
                    model.popupHeader = 'About My Family';
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.aboutFamilyId = item;
                    }

                    break;
            }
            commonFactory.open('commonParentpopup.html', model.scope, uibModal);
        };

        model.cancel = function() {
            commonFactory.closepopup();
        };

        model.updateData = function(inObj, type) {

            if (isSubmit) {
                isSubmit = false;

                switch (type) {
                    case 'Parent details':

                        inObj.GetDetails.FatherCustFamilyID = model.FatherCust_family_id;
                        inObj.GetDetails.MotherCustFamilyID = model.MotherCust_family_id;
                        inObj.GetDetails.CustID = custID;
                        model.submitPromise = editParentService.submitParentData(inObj).then(function(response) {
                            commonFactory.closepopup();
                            if (response.data === 1) {
                                model.parentBindData(custID);
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Parents Details submitted Succesfully', 4500);
                                if (model.datagetInStatus === 1) {
                                    sessionStorage.removeItem('missingStatus');
                                    route.go('mobileverf', {});
                                }
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Parents Details Updation failed', 4500);
                            }
                        });
                        break;
                    case 'Contact Details':
                        inObj.GetDetails.CustID = custID;
                        inObj.GetDetails.Cust_Family_ID = model.Cust_Family_ID;
                        model.submitPromise = editParentService.submitAddressData(inObj).then(function(response) {
                            console.log(response);
                            commonFactory.closepopup();
                            if (response.data === 1) {
                                model.parentBindData(custID);
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Contact Address submitted Succesfully', 4500);
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Contact Address Updation failed', 4500);
                            }
                        });
                        break;

                    case 'Physical Attributes & Health Details of Candidate':

                        inObj.GetDetails.CustID = custID;

                        model.submitPromise = editParentService.submitPhysicalData(inObj).then(function(response) {
                            console.log(response);
                            commonFactory.closepopup();
                            if (response.data === 1) {

                                model.parentBindData(custID);
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Physical Attribute & Health Details Of Candidate submitted Succesfully', 4500);
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Physical Attribute & Health Details Of Candidate Updation failed', 4500);
                            }
                        });

                        break;

                    case 'About My Family':

                        model.submitPromise = editParentService.submitAboutFamilyData({ CustID: custID, AboutYourself: inObj.GetDetails.AboutYourself === null ? '' : inObj.GetDetails.AboutYourself, flag: 1 }).then(function(response) {
                            console.log(response);
                            model.lblaboutMyfamily = inObj.GetDetails.AboutYourself;
                            commonFactory.closepopup();
                            if (parseInt(response.data) === 1) {
                                model.AboutPageloadData(custID);
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'About My Family submitted Succesfully', 4500);
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'About My Family Updation failed', 4500);
                            }
                        });

                        break;
                }
            }
        };

        model.AboutMyfamilySubmit = function(obj) {
            if (isSubmit) {
                isSubmit = false;


            }
        };

        model.housewiseChk = function(item) {
            if (item.chkbox === true) {
                item.txtMProfession = 'HouseWife';
            } else {
                item.txtMProfession = '';
            }
        };

        model.roundVal = function(val) {
            var dec = 2;
            var result = Math.round(val * Math.pow(10, dec)) / Math.pow(10, dec);
            return result;
        };
        model.converttolbs = function(item) {
            var value = model.bodyWeight;
            model.lbs = '';
            if (value.length > 0) {
                var lbs = value * 2.2;
                lbs = model.roundVal(lbs);
                model.lbs = lbs;
                if (lbs.toString() == 'NaN') {
                    alert("invalid Number");
                    model.lbs = '';
                    model.bodyWeight = '';
                }
            } else {
                model.bodyWeight = '';
                model.lbs = '';
            }
        };

        model.showHousewife = function(val) {
            return model.chkhousewife === true ? false : true;
        };

        model.ParentInterCasteId = function(val) {

            return model.areParentInterCasteId === 1 ? true : false;
        };

        model.parent = [
            { lblname: '', controlType: 'bindHtml', html: ' <h6>Father Details</h6>', classname: 'parentheader' },
            { lblname: 'Father Name', controlType: 'textbox', ngmodel: 'fatherName', required: true, parameterValue: 'FatherName' },
            { lblname: 'Education', controlType: 'textbox', ngmodel: 'fEducation', parameterValue: 'FatherEducationDetails' },
            { lblname: 'Profession Category', controlType: 'select', ngmodel: 'fProfCatgory', typeofdata: 'newProfessionCatgory', parameterValue: 'FatherProfessionCategoryID' },
            { lblname: 'Designation', controlType: 'textbox', ngmodel: 'fDesignation', parameterValue: 'Professiondetails' },
            { lblname: 'Company Name', controlType: 'textbox', ngmodel: 'fCompany', parameterValue: 'CompanyName' },
            { lblname: 'Job Location', controlType: 'textbox', ngmodel: 'fJobLocation', parameterValue: 'JobLocation' },
            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'fMobileCodeId',
                strmobile: 'fMobileNumber',
                dalternative: 'fAltermobileCodeId',
                stralternative: 'fAlterMobileNumber',
                dland: 'flandCountryCodeId',
                strareacode: 'fAreaCodeid',
                strland: 'flandNumber',
                strmail: 'fEmail',

                mobileCodeIdParameterValue: 'MobileCountry',
                mobileNumberParameterValue: 'MobileNumber',
                landCountryCodeIdParameterValue: 'LandlineCountry',
                landAreaCodeIdParameterValue: 'LandAreCode',
                landNumberParameterValue: 'landLineNumber',
                emailParameterValue: 'Email'
            },

            { lblname: 'Fathers father name', controlType: 'textbox', ngmodel: 'fatherFatherName', parameterValue: 'FatherFatherName' },
            {
                controlType: 'contact',
                emailhide: false,
                dmobile: 'gfMobileCodeId',
                strmobile: 'gfMobileNumber',
                dalternative: 'gfAltermobileCodeId',
                stralternative: 'gfAlterMobileNumber',
                dland: 'gflandCountryCodeId',
                strareacode: 'gfAreaCodeid',
                strland: 'gflandNumber',

                mobileCodeIdParameterValue: 'FatherfatherMobileCountryID',
                mobileNumberParameterValue: 'FatherFatherMobileNumber',
                landCountryCodeIdParameterValue: 'FatherFatherLandCountryID',
                landAreaCodeIdParameterValue: 'FatherFatherLandAreaCode',
                landNumberParameterValue: 'FatherFatherLandNumber',

            }, {
                controlType: 'country',
                countryshow: false,
                cityshow: false,
                othercity: false,
                dstate: 'fStateid',
                ddistrict: 'fDistrictid',
                countryParameterValue: 'FatherCountry',
                stateParameterValue: 'FatherState',
                districtParameterValue: 'FatherDistric'
            },
            { lblname: 'Native Place', controlType: 'textbox', ngmodel: 'fNative', parameterValue: 'FatherCity' },
            { lblname: '', controlType: 'bindHtml', html: ' <h6>Mother Details</h6>', classname: 'parentheader' },
            { lblname: 'Mother Name', controlType: 'textbox', ngmodel: 'motherName', required: true, parameterValue: 'MotherName' },
            { lblname: 'Education', controlType: 'textbox', ngmodel: 'mEducation', parameterValue: 'MotherEducationDetails' },
            { lblname: 'Profession Category', controlType: 'select', ngmodel: 'mProfCtagory', typeofdata: 'newProfessionCatgory', parameterValue: 'MotherProfessionCategoryID' },
            { lblname: 'Designation', controlType: 'housewife', ngmodelText: 'mDesignation', ngmodelChk: 'chkhousewife', parameterValueText: 'MotherProfessiondetails' },
            { lblname: 'Company Name', controlType: 'textbox', ngmodel: 'mCompanyName', parameterValue: 'MotherCompanyName', parentDependecy: 'showHousewife' },
            { lblname: 'Job Location', controlType: 'textbox', ngmodel: 'mJobLocation', parameterValue: 'MotherJobLocation', parentDependecy: 'showHousewife' },
            {
                controlType: 'contact',
                emailhide: true,
                dmobile: 'mMobileCodeId',
                strmobile: 'mMobileNumber',
                dalternative: 'mAltermobileCodeId',
                stralternative: 'mAlterMobileNumber',
                dland: 'mlandCountryCodeId',
                strareacode: 'mAreaCodeid',
                strland: 'mlandNumber',
                strmail: 'mEmail',

                mobileCodeIdParameterValue: 'MotherMobileCountryID',
                mobileNumberParameterValue: 'MotherMobileNumber',
                landCountryCodeIdParameterValue: 'MotherLandCountryID',
                landAreaCodeIdParameterValue: 'MotherLandAreaCode',
                landNumberParameterValue: 'MotherLandNumber',
                emailParameterValue: 'MotherEmail'

            },
            { lblname: 'Mothers Father Name', controlType: 'textbox', ngmodel: 'mffirstName', parameterValue: 'MotherFatherFistname' },
            { lblname: 'Mothers Last Name', controlType: 'textbox', ngmodel: 'mfLastName', parameterValue: 'MotherFatherLastname' },
            {
                controlType: 'contact',
                emailhide: false,
                dmobile: 'mfMobileCodeId',
                strmobile: 'mfMobileNumber',
                dalternative: 'mfAltermobileCodeId',
                stralternative: 'mfAlterMobileNumber',
                dland: 'mflandCodeId',
                strareacode: 'mfAreaCodeid',
                strland: 'mflandNumber',

                mobileCodeIdParameterValue: 'MotherfatherMobileCountryID',
                mobileNumberParameterValue: 'MotherFatherMobileNumber',
                landCountryCodeIdParameterValue: 'MotherFatherLandCountryID',
                landAreaCodeIdParameterValue: 'MotherFatherLandAreaCode',
                landNumberParameterValue: 'MotherFatherLandNumber'
            },
            {
                controlType: 'country',
                countryshow: false,
                cityshow: false,
                othercity: false,
                dstate: 'mStateid',
                ddistrict: 'mDistrictid',
                countryParameterValue: 'MotherCountry',
                stateParameterValue: 'MotherState',
                districtParameterValue: 'MotherDistric'
            },
            { lblname: 'Native Place', controlType: 'textbox', ngmodel: 'mNativePlace', parameterValue: 'MotherCity' },
            { lblname: 'Are parents interCaste ? ', controlType: 'radio', ngmodel: 'areParentInterCasteId', arrbind: 'boolType', parameterValue: 'AreParentsInterCaste' },
            { lblname: 'Father Caste', controlType: 'select', ngmodel: 'fCaste', typeofdata: 'caste', parameterValue: 'FatherCaste', parentDependecy: 'ParentInterCasteId' },
            { lblname: 'Mother Caste', controlType: 'select', ngmodel: 'mCaste', typeofdata: 'caste', parameterValue: 'MotherCaste', parentDependecy: 'ParentInterCasteId' },
            { lblname: '', controlType: 'break' }

        ];

        model.Address = [
            { lblname: 'House/Flat number', controlType: 'textbox', ngmodel: 'houseFlatNumber', required: true, parameterValue: 'HouseFlateNumber' },
            { lblname: 'Apartment name', controlType: 'textbox', ngmodel: 'apartmentName', parameterValue: 'Apartmentname' },
            { lblname: 'Street name', controlType: 'textbox', ngmodel: 'streetName', parameterValue: 'Streetname' },
            { lblname: 'Area Name', controlType: 'textbox', ngmodel: 'areaName', parameterValue: 'AreaName' },
            { lblname: 'Landmark', controlType: 'textbox', ngmodel: 'landMark', parameterValue: 'Landmark' },
            {
                controlType: 'country',
                countryshow: true,
                cityshow: false,
                othercity: false,
                dcountry: 'countryId',
                dstate: 'stateId',
                ddistrict: 'districtId',
                require: true,
                countryParameterValue: 'Country',
                stateParameterValue: 'STATE',
                districtParameterValue: 'District',

            },
            { lblname: 'City', controlType: 'textbox', ngmodel: 'cityId', required: true, parameterValue: 'city' },
            { lblname: 'Zip/Pin', controlType: 'textbox', ngmodel: 'zipcode', parameterValue: 'ZipPin' }

        ];
        model.physicalAttributes = [
            { lblname: 'Diet', controlType: 'radio', ngmodel: 'dietId', arrbind: 'Diet', parameterValue: 'DietID' },
            { lblname: 'Drink', controlType: 'radio', ngmodel: 'drinkId', arrbind: 'Drink', parameterValue: 'DrinkID' },
            { lblname: 'Smoke', controlType: 'radio', ngmodel: 'smokeId', arrbind: 'Drink', parameterValue: 'SmokeID' },
            { lblname: 'Body Type', controlType: 'select', ngmodel: 'bodyTypeId', typeofdata: 'bodyType', parameterValue: 'BodyTypeID' },
            { lblname: 'Body weight', controlType: 'textboxNumber', ngmodel: 'bodyWeight', method: 'converttolbs', parameterValue: 'BWKgs', span: true, spanText: 'kgs' },
            { lblname: 'lbs', controlType: 'textbox', ngmodel: 'lbs', parameterValue: 'BWlbs' },
            { lblname: 'Blood Group', controlType: 'select', ngmodel: 'bloodGroupId', typeofdata: 'bloodGroup', parameterValue: 'BloodGroup' },
            { lblname: 'Health Conditions', controlType: 'select', ngmodel: 'healthConditionId', typeofdata: 'healthCondition', parameterValue: 'HealthConditions' },
            { lblname: 'Health Condition Description', controlType: 'textarea', ngmodel: 'healthDescritionId', parameterValue: 'HealthConditiondesc' },
        ];
        model.aboutFamily = [
            { lblname: '', controlType: 'about', displayTxt: '(Do Not Mention Any Contact Information Phone Numbers, Email Id’s or your Profile May be Rejected.)', ngmodel: 'aboutFamilyId', parameterValue: 'AboutYourself' },
        ];

        return model.init();
    }

    angular
        .module('Kaakateeya')
        .factory('editParentModel', factory);

    factory.$inject = ['editParentService', 'authSvc', 'alert', 'commonFactory', '$uibModal', '$stateParams'];

})(angular);