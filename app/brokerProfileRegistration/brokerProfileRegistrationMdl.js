(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('brokerProfileRegistrationModel', factory);

    factory.$inject = ['brokerProfileRegistrationService', 'SelectBindServicereg', 'authSvc', '$timeout', 'getArray', 'Commondependency', '$filter'];

    function factory(brokerProfileRegistrationService, SelectBindServicereg, authSvc, timeout, getArray, commondependency, filter) {

        var model = {};
        var monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
                SelectBindServicereg.CountryWithCode().then(function(response) {
                    _.each(response.data, function(item) {
                        Country.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        CountryCode.push({ "label": item.CountryCode, "title": item.CountryCode, "value": item.ID });
                    });
                    model.Country = Country;
                    model.Countrybind = Country;
                    model.countryCode = CountryCode;
                });

            }, 100);
            return model;
        };

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
        model.regSubmit = function(obj) {
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

            brokerProfileRegistrationService.submitBasicRegistrationBroker(inputObj).then(function(res) {
                model.genderID = 0;
                if (res !== undefined && res !== null && res !== "" && res.data !== undefined && res.data !== null && res.data !== "" && res.data.length > 0) {
                    authSvc.login(res.data[0].ProfileID, "Admin@123").then(function(response) {
                        model.genderID = response.response[0].GenderID;
                        // $state.go('base.secondaryRegistration', { CustID: response.response[0].CustID, ProfileID: response.response[0].ProfileID, fn: obj.txtfirstname, ln: obj.txtlastname, countryID: obj.ddlcountry, genderID: response.response[0].GenderID });
                        return false;
                    });
                }
            });
        };

        model.changeBind = function(parentval, parentval2) {
            model.casteArr = [];
            if (parentval !== undefined && parentval2 !== undefined && parentval2 !== "" && parentval2 !== null && parentval !== "" && parentval !== null) {
                model.casteArr = commondependency.casteDepedency(commondependency.listSelectedVal(parentval), commondependency.listSelectedVal(parentval2));
            }
        };

        return model.pageload();

    }
})();