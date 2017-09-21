(function(angular) {
    'use strict';


    function factory(editContactService, authSvc, alertss, commonFactory, uibModal, stateParams, SelectBindServicereg, timeout) {
        var model = {};
        model.scope = {};

        // var logincustid = authSvc.getCustId();
        var custID = model.CustID = stateParams.CustID;
        //logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;
        model.candidateContactArr = [];
        model.candidateAddrArr = [];
        model.parentContactArr = [];
        model.SiiblingContactArr = [];
        model.relativeContactArr = [];
        model.referenceContactArr = [];

        model.candidateobj = {};
        model.sibobj = {};
        model.parentobj = {};
        model.relativeobj = {};
        model.referenceobj = {};
        model.canAddrobj = {};
        model.sibFlag = '';
        model.setrelObj = {};
        model.popupMobilenumber = '';
        model.mobileVerificationCode = "";
        model.ID = 0;
        var loginEmpid;
        model.init = function() {
            loginEmpid = authSvc.LoginEmpid();
            custID = model.CustID = stateParams.CustID;
            model.pageload();
            return model;
        };
        model.pageload = function() {
            editContactService.getContactData(custID).then(function(response) {
                if (response.data.length > 0) {
                    model.candidateContactArr = response.data[0].length > 0 ? JSON.parse(response.data[0]) : [];
                    model.candidateAddrArr = response.data[1].length > 0 ? JSON.parse(response.data[1]) : [];
                    model.parentContactArr = response.data[2].length > 0 ? JSON.parse(response.data[2]) : [];
                    model.SiiblingContactArr = response.data[3].length > 0 ? JSON.parse(response.data[3]) : [];
                    model.relativeContactArr = response.data[4].length > 0 ? JSON.parse(response.data[4]) : [];
                    model.referenceContactArr = response.data[5].length > 0 ? JSON.parse(response.data[5]) : [];
                }
            });
            model.primaryRelationSubmit(0, 0, '0');
        };
        model.commonContactSubmit = function(Icustfamiliyid, IName, IMoblieCountryCode, IMobileNumber, IMoblieCountryCode2, IMobileNumber2, ILandCountryCode,
            ILandAreaCode, ILandNumber, IEmail, ISibblingFlag,
            FFcountryCode, FFNumber, FFcountryCode2, FFnumber2, FFLandCode, FFareaCode, FFLandNumber, FFflag) {
            if (model.validateForm(IEmail)) {

                model.Mobj = {
                    familyID: Icustfamiliyid,
                    Name: IName,
                    MoblieCountryCode: IMoblieCountryCode,
                    MobileNumber: IMobileNumber,
                    LandCountryCode: commonFactory.checkvals(IMoblieCountryCode2) ? IMoblieCountryCode2 : commonFactory.checkvals(ILandCountryCode) ? ILandCountryCode : null,
                    LandAreaCode: commonFactory.checkvals(IMobileNumber2) ? null : (commonFactory.checkvals(ILandAreaCode) ? ILandAreaCode : null),
                    LandNumber: commonFactory.checkvals(IMobileNumber2) ? IMobileNumber2 : commonFactory.checkvals(ILandNumber) ? ILandNumber : null,
                    Email: IEmail,
                    intCusID: custID,
                    EmpID: loginEmpid,
                    Admin: authSvc.isAdmin(),
                    SibblingFlag: ISibblingFlag,
                    FFMobileCountryID: FFcountryCode,
                    FFMobileNumber: FFNumber,
                    FFLandLineCountryCodeID: commonFactory.checkvals(FFcountryCode2) ? FFcountryCode2 : commonFactory.checkvals(FFLandCode) ? FFLandCode : null,
                    FFLandAreaCode: commonFactory.checkvals(FFnumber2) ? null : (commonFactory.checkvals(FFareaCode) ? FFareaCode : null),
                    FFLandNumber: commonFactory.checkvals(FFnumber2) ? FFnumber2 : commonFactory.checkvals(FFLandNumber) ? FFLandNumber : null,
                    iflagFF: FFflag
                };
                editContactService.submitContactData(model.Mobj).then(function(response) {
                    commonFactory.closepopup();
                    if (response.data === 1) {
                        model.pageload();
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Contact Details  submitted Succesfully', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Contact Details  Updation failed', 4500);
                    }
                });
            }


        };
        model.CandidateAddressSubmit = function(obj) {
            model.Mobj = {
                CandidateAddressID: model.canAddrobj.Custfamilyid,
                HouseFlatNum: obj.txtCandidateHouse_flat,
                Apartmentname: obj.txtCandidateApartmentName,
                Streetname: obj.txtCandidateStreetName,
                AreaName: obj.txtCandidateAreaName,
                Landmark: obj.txtCandidateLandmark,
                Country: obj.ddlCandidateCountryContact,
                State: obj.ddlCandidateStateContact,
                District: obj.ddlCandidateDistricContact,
                City: obj.txtCandidateCity,
                ZipPin: obj.txtCandidateZip_no,
                addresstype: model.canAddrobj.Addresstype,
                intCusID: custID,
                EmpID: '2',
                Admin: null
            };
            editContactService.submitContactData(model.Mobj).then(function(response) {
                commonFactory.closepopup();
                if (response.data === 1) {
                    model.pageload();
                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Contact Details submitted Succesfully', 4500);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Contact Details Updation failed', 4500);
                }
            });
        };
        model.showContactPopup = function(type, item, sibFlag) {
            switch (type) {
                case 'Candidate':
                    model.candidateobj = {};
                    if (item !== undefined) {
                        model.candidateobj.emaILcust_family_id = item.emaILcust_family_id;
                        model.candidateobj.ddlcandidateMobileCountryID = commonFactory.checkvals(item.Candidatemobilecountrycode) ? parseInt(item.Candidatemobilecountrycode) : 0;
                        model.candidateobj.txtcandidatemobilenumber = item.CandidateMobileNumber;
                        if (commonFactory.checkvals(item.Candidatelandareacode)) {
                            model.candidateobj.ddlcandidateLandLineCountry = commonFactory.checkvals(item.CandidateLandlinecountrycode) ? parseInt(item.CandidateLandlinecountrycode) : 0;
                            model.candidateobj.txtcandidateAreCode = item.Candidatelandareacode;
                            model.candidateobj.txttxtcandidateAreCodeLandNumber = item.CandidateLandlinenumber;
                        } else {
                            model.candidateobj.ddlcandidateMobileCountryID2 = commonFactory.checkvals(item.CandidateLandlinecountrycode) ? parseInt(item.CandidateLandlinecountrycode) : 0;
                            model.candidateobj.txtFBMobileNumber2 = item.CandidateLandlinenumber;
                        }
                        model.candidateobj.txtcandidateEmails = item.CandidateEmail;
                        model.oldCandidateMail = '';
                        if (item.CandidateEmail) {
                            model.oldCandidateMail = item.CandidateEmail;
                        }

                    }
                    commonFactory.open('candidateContactContent.html', model.scope, uibModal);
                    break;
                case 'sibbling':
                    model.sibFlag = sibFlag;
                    model.sibobj = {};
                    model.sibobj.SiblingemaILcust_family_id = item.SiblingemaILcust_family_id;
                    if (sibFlag === 'SelfFlag') {
                        model.sibobj.ddlSiblingmob = commonFactory.checkvals(item.Siblingmobilecountrycode) ? parseInt(item.Siblingmobilecountrycode) : 0;
                        model.sibobj.txtSiblingmob = item.Siblingmobilenumber;
                        if (commonFactory.checkvals(item.Siblinglandareacode)) {
                            model.sibobj.ddlsiblinglandcode = commonFactory.checkvals(item.SiblingLandlinecountrycode) ? parseInt(item.SiblingLandlinecountrycode) : 0;
                            model.sibobj.txtsiblinglandarea = item.Siblinglandareacode;
                            model.sibobj.txtsiblinglandnumber = item.SiblingLandlinenumber;
                        } else {
                            model.sibobj.ddlsiblingmob2 = commonFactory.checkvals(item.SiblingLandlinecountrycode) ? parseInt(item.SiblingLandlinecountrycode) : 0;
                            model.sibobj.txtsiblingmob2 = item.SiblingLandlinenumber;
                        }
                        model.sibobj.txtsiblinglemail = item.SiblingEmail;
                        model.sibobj.txtsiblingname = item.SiblingName;
                    } else {
                        model.sibobj.ddlSiblingmob = commonFactory.checkvals(item.SiblingSPousemobilecode) ? parseInt(item.SiblingSPousemobilecode) : 0;
                        model.sibobj.txtSiblingmob = item.SiblingSpousemobilenumber;
                        if (commonFactory.checkvals(item.SiblingSPouseLAndareaCode)) {
                            model.sibobj.ddlsiblinglandcode = commonFactory.checkvals(item.SiblingSPouseLandcountryCode) ? parseInt(item.SiblingSPouseLandcountryCode) : 0;
                            model.sibobj.txtsiblinglandarea = item.SiblingSPouseLAndareaCode;
                            model.sibobj.txtsiblinglandnumber = item.SiblingSPouseLandnumber;
                        } else {
                            model.sibobj.ddlsiblingmob2 = commonFactory.checkvals(item.SiblingSPouseLandcountryCode) ? parseInt(item.SiblingSPouseLandcountryCode) : 0;
                            model.sibobj.txtsiblingmob2 = item.SiblingSPouseLandnumber;
                        }
                        model.sibobj.txtsiblinglemail = item.SiblingSpouseEmail;
                        model.sibobj.txtsiblingname = item.SiblingSpouseNAme;
                    }
                    commonFactory.open('SibContactContent.html', model.scope, uibModal);
                    break;
                case 'parent':
                    model.parentobj = {};
                    model.parentIdentityID = '';
                    model.parentobj.MotheremaILcust_family_id = item.MotheremaILcust_family_id;
                    model.parentobj.ddlcandidatefathermobcode = commonFactory.checkvals(item.mobilecountrycode) ? parseInt(item.mobilecountrycode) : 0;
                    model.parentobj.txtcandidatefathermob = item.mobilenumber;
                    if (commonFactory.checkvals(item.landareacode)) {
                        model.parentobj.ddlcandidatefathelandcode = commonFactory.checkvals(item.Landlinecountrycode) ? parseInt(item.Landlinecountrycode) : 0;
                        model.parentobj.txtcandidatefathelandareacode = item.landareacode;
                        model.parentobj.txtcandidatefathelandnumber = item.Landlinenumber;
                    } else {
                        model.parentobj.ddlcandidatefathermob2code = commonFactory.checkvals(item.Landlinecountrycode) ? parseInt(item.Landlinecountrycode) : 0;
                        model.parentobj.txtcandidatefathermob2 = item.Landlinenumber;
                    }
                    model.parentobj.txtcandidatefatheremail = item.Email;
                    model.parentobj.txtFathername = item.NAME;
                    model.parentobj.ddlFFmobcode = commonFactory.checkvals(item.FatherMobileCountryID) ? parseInt(item.FatherMobileCountryID) : 0;
                    model.parentobj.txtFFrmob = item.FatherMobileNumber;
                    if (commonFactory.checkvals(item.FatherLandAreaCode)) {
                        model.parentobj.ddlFFlandcode = commonFactory.checkvals(item.FarherLandLineCountryCodeID) ? parseInt(item.FarherLandLineCountryCodeID) : 0;
                        model.parentobj.txtFFlandareacode = item.FatherLandAreaCode;
                        model.parentobj.txtFFlandnumber = item.FatherLandNumber;
                    } else {
                        model.parentobj.ddlFFmob2code = commonFactory.checkvals(item.FarherLandLineCountryCodeID) ? parseInt(item.FarherLandLineCountryCodeID) : 0;
                        model.parentobj.txtFFmob2 = item.FatherLandNumber;
                    }
                    model.parentIdentityID = item.Motheremailreletionship;
                    model.parentobj.ffname = item.MotherFatherFirstName;
                    commonFactory.open('parentContactContent.html', model.scope, uibModal);
                    break;
                case 'relative':
                    model.relativeobj = {};
                    model.relativeobj.emaILcust_family_id = item.emaILcust_family_id;
                    model.relativeobj.ddlRelativemob = commonFactory.checkvals(item.mobilecountrycode) ? parseInt(item.mobilecountrycode) : 0;
                    model.relativeobj.txtRelativemob = item.mobilenumber;
                    if (commonFactory.checkvals(item.landareacode)) {
                        model.relativeobj.ddllandRelativecode = commonFactory.checkvals(item.Landlinecountrycode) ? parseInt(item.Landlinecountrycode) : 0;
                        model.relativeobj.txtRelativeareacode = item.landareacode;
                        model.relativeobj.txtlandnumberRelative = item.Landlinenumber;
                    } else {
                        model.relativeobj.ddlRelativemob2 = commonFactory.checkvals(item.Landlinecountrycode) ? parseInt(item.Landlinecountrycode) : 0;
                        model.relativeobj.txtRelativemob2 = item.Landlinenumber;
                    }
                    model.relativeobj.txtRelativeemail = item.Email;
                    model.relativeobj.txtrelativename = item.NAME;
                    commonFactory.open('relativeContactContent.html', model.scope, uibModal);
                    break;
                case 'reference':
                    model.referenceobj = {};
                    model.referenceobj.emaILcust_family_id = item.emaILcust_family_id;
                    model.referenceobj.ddlreferencemobile = commonFactory.checkvals(item.Candidatemobilecountrycode) ? parseInt(item.Candidatemobilecountrycode) : 0;
                    model.referenceobj.txtreferencemobile = item.CandidateMobileNumber;
                    if (commonFactory.checkvals(item.Candidatelandareacode)) {
                        model.referenceobj.ddlreferencelandnumber = commonFactory.checkvals(item.CandidateLandlinecountrycode) ? parseInt(item.CandidateLandlinecountrycode) : 0;
                        model.referenceobj.txtreferenceAreCode = item.Candidatelandareacode;
                        model.referenceobj.txtreferencelandnumber = item.CandidateLandlinenumber;
                    } else {
                        model.referenceobj.ddlreferencemobile2 = commonFactory.checkvals(item.CandidateLandlinecountrycode) ? parseInt(item.CandidateLandlinecountrycode) : 0;
                        model.referenceobj.txtreferencemobile2 = item.CandidateLandlinenumber;
                    }
                    model.referenceobj.txtreferenceemail = item.CandidateEmail;
                    model.referenceobj.txtreferencename = item.CandidateName;
                    commonFactory.open('referenceContactContent.html', model.scope, uibModal);
                    break;
                case 'candidateAddr':
                    model.canAddrobj = {};
                    model.canAddrobj.Custfamilyid = item.Custfamilyid;
                    model.canAddrobj.Addresstype = item.Addresstype;
                    model.canAddrobj.txtCandidateHouse_flat = item.Flatno;
                    model.canAddrobj.txtCandidateApartmentName = item.Apartmentno;
                    model.canAddrobj.txtCandidateStreetName = item.Streetname;
                    model.canAddrobj.txtCandidateAreaName = item.Areaname;
                    model.canAddrobj.txtCandidateLandmark = item.Landmark;
                    model.canAddrobj.ddlCandidateCountryContact = item.Country;
                    model.canAddrobj.ddlCandidateStateContact = item.STATE;
                    model.canAddrobj.ddlCandidateDistricContact = item.District;
                    model.canAddrobj.txtCandidateCity = item.CityName;
                    model.canAddrobj.txtCandidateZip_no = item.ZipCode;
                    commonFactory.open('candidateAddrContent.html', model.scope, uibModal);
                    break;
            }
        };
        model.cancel = function() {
            commonFactory.closepopup();
        };
        model.submitContactReference = function(obj) {
            if (model.validateForm(obj.txtreferenceemail)) {

                model.Mobj = {
                    Cust_Reference_ID: model.referenceobj.emaILcust_family_id,
                    Cust_ID: custID,
                    FirstName: obj.txtreferencename,
                    MobileCode: obj.ddlreferencemobile,
                    Number: obj.txtreferencemobile,
                    CountryCode: commonFactory.checkvals(obj.ddlreferencemobile2) ? obj.ddlreferencemobile2 : commonFactory.checkvals(obj.ddlreferencelandnumber) ? obj.ddlreferencelandnumber : null,
                    AreaCode: commonFactory.checkvals(obj.txtreferencemobile2) ? null : (commonFactory.checkvals(obj.txtreferenceAreCode) ? obj.txtreferenceAreCode : null),
                    Landlinenumber: commonFactory.checkvals(obj.txtreferencemobile2) ? obj.txtreferencemobile2 : commonFactory.checkvals(obj.txtreferencelandnumber) ? obj.txtreferencelandnumber : null,
                    Email: obj.txtreferenceemail
                };
                editContactService.submitContactReferenceData(model.Mobj).then(function(response) {
                    commonFactory.closepopup();
                    if (response.data === 1) {
                        model.pageload();
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Contact Details submitted Succesfully', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Contact Details  Updation failed', 4500);
                    }
                });

            }
        };
        model.setprimaryrelationPopup = function() {
            commonFactory.open('primaryRelationContent.html', model.scope, uibModal);
        };
        model.primaryRelationSubmit = function(mob, email, flag) {
            var inObj = {
                CustID: custID,
                PrimaryMobileRel: mob,
                PrimaryEmailRel: email,
                iflage: flag
            };
            editContactService.submitPrimaryRelationData(inObj).then(function(response) {
                if (flag === '1') {
                    commonFactory.closepopup();
                    model.pageload();
                } else {
                    model.primaryRel = JSON.parse(response.data[0])[0];
                    model.setrelObj.ddlPrimaryMobileRel = model.primaryRel.PrimaryMobileRel;
                    model.setrelObj.ddlPrimaryEmailRel = model.primaryRel.PrimaryEmailRel;
                }
            });
        };
        model.sendMobileCode = function(CountryID, CCode, MobileNumber, familyID) {
            model.popupMobilenumber = MobileNumber;
            model.ID = familyID;
            var inputOBj = {
                iCountryID: CountryID,
                iCCode: CCode,
                MobileNumber: MobileNumber,
                CustFamilyID: familyID
            };
            editContactService.sendMobileCode(inputOBj).then(function(response) {
                model.mobileVerificationCode = response.data;
                commonFactory.open('verifyMobileContent.html', model.scope, uibModal);
            });
        };
        model.verifymail = function() {
            editContactService.verifyEmail(custID).then(function(response) {
                if (response.data !== undefined) {
                    if (response.data === 1) {
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Email verify mail send Successfully', 4500);
                    }
                }
            });
        };
        model.verifyMobCode = function(val) {
            if (val === "") {
                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please enter Mobile verify Code', 4500);
            } else if (model.mobileVerificationCode === val) {
                editContactService.verifyMobile(model.mobileVerificationCode, model.ID).then(function(response) {
                    commonFactory.closepopup();
                });
            } else {
                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please Enter Valid Verification code', 4500);
            }
        };


        model.EmailValidation = function(val) {
            if (val) {
                if (val !== model.oldCandidateMail) {
                    SelectBindServicereg.emailExists({ iflagEmailmobile: 0, EmailMobile: model.candidateobj.txtcandidateEmails }).then(function(response) {
                        if (response.data === 1) {
                            model.candidateobj.txtcandidateEmails = '';
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Email Already Exists', 9500);
                            return false;
                        } else {
                            model.candidateSubmitmethod();
                        }

                    });
                } else {
                    model.candidateSubmitmethod();
                }
            } else {
                model.candidateSubmitmethod();
            }
        };


        model.candidateSubmitmethod = function() {

            model.commonContactSubmit(model.candidateobj.emaILcust_family_id, '',
                model.candidateobj.ddlcandidateMobileCountryID,
                model.candidateobj.txtcandidatemobilenumber, model.candidateobj.ddlcandidateMobileCountryID2,
                model.candidateobj.txtFBMobileNumber2, model.candidateobj.ddlcandidateLandLineCountry, model.candidateobj.txtcandidateAreCode,
                model.candidateobj.txttxtcandidateAreCodeLandNumber,
                model.candidateobj.txtcandidateEmails, 'Candidate');
        };

        model.validateForm = function(val) {
            if (val !== undefined && val !== null && val !== '') {
                var x = val;
                var atpos = x.indexOf("@");
                var dotpos = x.lastIndexOf(".");
                if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please enter valid email address', 4500);
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        };


        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('editContactModel', factory);

    factory.$inject = ['editContactService', 'authSvc', 'alert', 'commonFactory', '$uibModal', '$stateParams', 'SelectBindServicereg', '$timeout'];
})(angular);