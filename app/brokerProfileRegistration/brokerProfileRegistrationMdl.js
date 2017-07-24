(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('brokerProfileRegistrationModel', factory);

    factory.$inject = ['brokerProfileRegistrationService', 'SelectBindServicereg', 'authSvc', '$timeout', 'getArray'];

    function factory(brokerProfileRegistrationService, SelectBindServicereg, authSvc, timeout, getArray) {

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

        return model.pageload();

    }
})();