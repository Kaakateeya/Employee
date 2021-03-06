(function(angular) {
    'use strict';

    function factory(basicRegistrationService, getArray, commondependency, filter, authSvc, timeout, $state, svcSelectBindServicereg, dynamicalert, modelpopupopenmethod) {
        var model = {};
        model.scope = {};
        model.init = function() {
            model.pageload();
            return model;
        };
        // start declaretion
        model.reg = {};
        model.monthArr = [];
        model.reg.Chkprivacy = true;
        model.emailrequired = true;
        model.mobilenumberrequired = true;
        model.mobilecountrycoderequired = true;
        model.emailmeessages = false;
        model.mobilemessages = false;
        var monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        model.emailpattaren = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/i;
        //end declaration
        model.monthBind = function() {
            var option = [];
            _.each(monthArr, function(item) {
                option.push({ "label": item, "title": item, "value": item });
            });
            return option;
        };
        model.date = function(str, from, to) {
            var Arr = [];
            for (var i = from; i <= to; i++) {
                var strValue = null;
                if (i <= 9) {
                    strValue = "0" + i;
                } else {
                    strValue = i;
                }
                Arr.push({ "label": strValue, "title": strValue, "value": strValue });
            }
            return Arr;
        };
        model.year = function(str, from, to) {
            var Arr = [];
            for (var i = to; i >= from; i--) {
                Arr.push({ "label": i, "title": i, "value": i });
            }
            return Arr;
        };
        model.pageload = function() {
            model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
            model.monthArr = model.monthBind();
            model.dateArr = model.date('', 1, 31);
            model.yearArr = model.year('', 1936, 1998);
            timeout(function() {
                model.postedby = getArray.GArray('childStayingWith');
                model.religion = getArray.GArray('Religion');
                model.Mothertongue = getArray.GArray('Mothertongue');
                model.Caste = getArray.GArray('Caste');
            }, 1000);
            timeout(function() {
                var Country = [],
                    CountryCode = [];
                svcSelectBindServicereg.CountryWithCode().then(function(response) {
                    _.each(response.data, function(item) {
                        Country.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        CountryCode.push({ "label": item.CountryCode, "title": item.CountryCode, "value": item.ID });
                    });
                    model.Country = Country;
                    model.Countrybind = Country;
                    model.countryCode = CountryCode;
                });

            }, 100);
        };
        model.dayChange = function(obj, type) {
            var months31 = 'Jan,Mar,May,Jul,Aug,Oct,Dec';
            var minth30 = 'Apr,Jun,Sep,Nov';
            var month28 = 'Feb';
            if ((obj.ddlDD <= 30 && minth30.indexOf(obj.ddlMM) !== -1) || (obj.ddlDD <= 31 && months31.indexOf(obj.ddlMM) !== -1) || ((obj.ddlDD <= 28 && month28.indexOf(obj.ddlMM) !== -1))) {} else {
                if (type === 'day') {
                    obj.ddlMM = '';
                } else {
                    model.dateArr = [];
                    model.dateArr = model.date('DD', 1, 31);
                    obj.ddlDD = '';
                }
            }
        };
        model.changeBind = function(parentval, parentval2) {
            model.casteArr = [];
            if (parentval !== undefined && parentval2 !== undefined && parentval2 !== "" && parentval2 !== null && parentval !== "" && parentval !== null) {
                model.casteArr = commondependency.casteDepedency(commondependency.listSelectedVal(parentval), commondependency.listSelectedVal(parentval2));
            }
        };
        model.subcastechange = function(paerntval) {
            model.subCastearr = [];
            if (paerntval !== null && paerntval !== undefined && paerntval !== "") {
                model.subCastearr = commondependency.subCaste(paerntval);
            }
        };
        model.mobilemailvalidation = function() {
            if (model.reg.Chkfree_reg === true) {
                if ((model.reg.txtEmail !== "" && model.reg.txtEmail !== undefined && model.reg.txtEmail !== null)) {
                    model.mobilenumberrequired = false;
                    model.mobilecountrycoderequired = false;
                    model.mobilemessages = false;
                } else if ((model.reg.txtMobileNo !== "" && model.reg.txtMobileNo !== undefined && model.reg.txtMobileNo !== null)) {
                    model.emailrequired = false;
                    model.emailmeessages = false;
                } else {
                    model.mobilenumberrequired = true;
                    model.mobilecountrycoderequired = true;
                    model.emailrequired = true;
                }
            } else {
                model.emailrequired = true;
                model.mobilenumberrequired = true;
                model.mobilecountrycoderequired = true;
            }
        };
        model.regSubmit = function(obj) {
            model.isdisabledtrue = true;
            var valmm = _.indexOf(monthArr, obj.ddlMM);
            valmm = (valmm != -1 ? parseInt(valmm) + 1 : 0);
            valmm = valmm >= 10 ? valmm : '0' + valmm;
            var date = obj.ddlDD + '-' + valmm + '-' + obj.ddlYear;
            var inputObj = {
                strFirstName: obj.txtfirstname,
                strLastName: obj.txtlastname,
                //use moment
                dtDOB: date !== '' ? filter('date')(date, 'yyyy-MM-dd') : null,
                intGenderID: obj.rbtngender,
                intReligionID: obj.ddlreligion,
                intMotherTongueID: obj.ddlmothertongue,
                intCasteID: obj.ddlcaste,
                intCountryLivingID: obj.ddlcountry,
                intMobileCode: obj.ddlmobilecountry,
                intLandCode: obj.ddllandcountry,
                IsCustomer: 0,
                strMobileNo: (obj.txtMobileNo !== '') && (obj.txtMobileNo !== null) && (obj.txtMobileNo !== undefined) ? (obj.txtMobileNo) : "0000000000",
                ID: 1,
                strAreaCode: (obj.txtArea !== '') && (obj.txtArea !== null) && (obj.txtArea !== undefined) ? obj.txtArea : null,
                strLandNo: (obj.txtlandNum !== '') && (obj.txtlandNum !== null) && (obj.txtlandNum !== undefined) ? obj.txtlandNum : null,
                strEmail: (obj.txtEmail !== '') && ((obj.txtEmail) !== null) && ((obj.txtEmail) !== undefined) ? obj.txtEmail : "kmpl@gmail.com",
                strPassword: (obj.txtpassword !== '') && (obj.txtpassword !== null) && (obj.txtpassword !== undefined) ? obj.txtpassword : "Admin@123",
                intProfileRegisteredBy: null,
                intEmpID: model.empid === "" ? "2" : model.empid,
                intCustPostedBY: obj.ddlpostedby,
                intSubCasteID: obj.ddlsubcaste !== undefined && obj.ddlsubcaste !== null && obj.ddlsubcaste !== "" && obj.ddlsubcaste !== "undefined" ? obj.ddlsubcaste : null
            };

            basicRegistrationService.submitBasicRegistration(inputObj).then(function(res) {
                model.genderID = 0;
                model.isdisabledtrue = false;
                if (res !== undefined && res !== null && res !== "" && res.data !== undefined && res.data !== null && res.data !== "" && res.data.length > 0) {
                    authSvc.login(res.data[0].ProfileID, "Admin@123").then(function(response) {
                        model.genderID = response.response[0].GenderID;
                        $state.go('base.secondaryRegistration', { CustID: response.response[0].CustID, ProfileID: response.response[0].ProfileID, fn: obj.txtfirstname, ln: obj.txtlastname, countryID: obj.ddlcountry, genderID: response.response[0].GenderID });
                        return false;
                    });
                }
            });
        };
        model.valueExists = function(type, flag, val) {
            model.mobilemailvalidation();
            if (val !== undefined) {
                basicRegistrationService.emailExists({ iflagEmailmobile: flag, EmailMobile: val }).then(function(response) {
                    if (response.data === 1) {
                        if (type === 'email') {
                            model.reg.txtEmail = '';
                            dynamicalert.timeoutoldalerts(model.scope, 'alert-danger', 'Email Already Exists', 9500);
                        } else {
                            model.reg.txtMobileNo = '';
                            dynamicalert.timeoutoldalerts(model.scope, 'alert-danger', 'Mobile number Already Exists', 9500);
                        }
                    } else {
                        if (model.reg.Chkfree_reg === true) {
                            if (type === 'email') {
                                model.emailrequired = true;
                                model.mobilenumberrequired = false;
                                model.mobilecountrycoderequired = false;
                            } else {
                                model.emailrequired = false;
                                model.mobilenumberrequired = true;
                                model.mobilecountrycoderequired = true;
                            }
                        }
                    }
                });
            }
        };
        model.redirectprivacy = function(type) {
            window.open('registration/privacyPolicy', '_blank');
        };
        model.residingChange = function(val) {
            model.reg.ddllandcountry = model.reg.ddlmobilecountry = val;
        };
        model.emailvalidation = function(condition) {
            if (condition === true) {
                model.emailmeessages = true;
            } else {
                model.emailmeessages = false;
            }
        };
        model.mobilecondition = function(condition) {
            if (condition === true) {
                model.mobilemessages = true;
            } else {
                model.mobilemessages = false;
            }
        };
        model.AvoidSpace = function(event) {
            if (event.keyCode == 32) {
                event.returnValue = false;
                return false;
            }
        };
        model.chknamesurame = function(firstname, lastname, date, type) {
            var valmm = model.reg.ddlMM !== undefined ? _.indexOf(monthArr, model.reg.ddlMM) : -1;
            valmm = (valmm != -1 ? parseInt(valmm) + 1 : 0);
            valmm = valmm >= 10 ? valmm : '0' + valmm;
            var year = model.reg.ddlYear !== undefined ? model.reg.ddlYear : "";
            var dates = year !== "" ? model.reg.ddlDD + '-' + valmm + '-' + year : "";
            switch (type) {
                case "Name":
                case "SurName":
                    if (firstname !== null && firstname !== "" && firstname !== undefined && lastname !== null && lastname !== "" && lastname !== undefined) {
                        model.checknamesurname(firstname, lastname, dates !== "" ? dates : "", type);
                    }
                    break;
                case "dob":
                    if (model.reg.ddlMM !== null && model.reg.ddlMM !== "" && model.reg.ddlMM !== undefined && model.reg.ddlDD !== null && model.reg.ddlDD !== "" && model.reg.ddlDD !== undefined && model.reg.ddlYear !== null && model.reg.ddlYear !== undefined && model.reg.ddlYear !== "") {
                        model.checknamesurname(firstname, lastname, dates, type);
                    }
                    break;
            }
        };
        model.checknamesurname = function(firstname, lastname, date, type) {
            basicRegistrationService.CheckSurNameNamedob(lastname, firstname, date).then(function(response) {
                if (response.data !== null && response.data !== undefined && response.data.length > 0 && response.data[0] !== undefined && response.data[0] !== null && parseInt(response.data[0].Status) === 1) {
                    switch (type) {
                        case "Name":
                        case "SurName":
                            modelpopupopenmethod.showPopupphotopoup('namesurnamealert.html', model.scope, 'md', "");
                            model.Alertnamesurname = 'Name and Surname Already exist   <br>Profile ID:' + response.data[0].Profileid + ',Name:' + response.data[0].Name + ',Surname:' + response.data[0].Surname + '';
                            // dynamicalert.timeoutoldalerts(model.scope, 'alert-danger', 'Name and Surname Already exist    <br><br>Profile ID:' + response.data[0].Profileid + ',Name:' + response.data[0].Name + ',Surname:' + response.data[0].Surname + '', 5000);
                            break;
                        case "dob":
                            modelpopupopenmethod.showPopupphotopoup('namesurnamealert.html', model.scope, 'md', "");
                            model.Alertnamesurname = 'Name,Surname and DOB Already exist   <br>Profile ID:' + response.data[0].Profileid + ',Name:' + response.data[0].Name + ',Surname:' + response.data[0].Surname + '';
                            // dynamicalert.timeoutoldalerts(model.scope, 'alert-danger', 'Name,Surname and DOB Already exist    <br><br>Profile ID:' + response.data[0].Profileid + ',Name:' + response.data[0].Name + ',Surname:' + response.data[0].Surname + '', 5000);
                            model.reg.txtfirstname = "";
                            model.reg.txtlastname = "";
                            model.reg.ddlYear = "";
                            model.reg.ddlDD = "";
                            model.reg.ddlMM = "";
                            break;
                    }
                }
            });
        };
        model.close = function() {
            modelpopupopenmethod.closepopuppoptopopup();
        };
        return model.init();
    }
    angular
        .module('Kaakateeya')
        .factory('basicRegistrationModel', factory);

    factory.$inject = ['basicRegistrationService', 'getArray', 'Commondependency',
        '$filter', 'authSvc', '$timeout', '$state', 'SelectBindServicereg', 'alert', 'modelpopupopenmethod'
    ];
})(angular);