(function(angular) {
    'use strict';

    function factory($http, getArray, timeout, matchFollowupServices, config, authSvc, Commondependency) {
        var model = {};
        model = config;
        model.BranchName = [];
        model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
        model.templateUrl = "templates/matchFollowupSlide.html";
        model.headettemp = "templates/matchFollowupHeader.html";
        model.headervisileble = true;
        model.EmpNamesArr = [];
        model.opendiv = true;
        model.init = function() {
            model.setSlides([], 10);
            model.BranchName = getArray.GArray('BranchName');
        };

        matchFollowupServices.getMyprofilebind(1, 2, '').then(function(response) {
            _.each(response.data, function(item) {
                if (item.CountryCode === 'Profile Owner') {
                    model.EmpNamesArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                }
            });
        });

        model.matchFollowupSelect = function(flag) {
            flag = 0;
            var inputobj = {
                empid: model.empid,
                stremp: _.isArray(model.lstEmpnames) ? (model.lstEmpnames).join(',') : '',
                strBranch: _.isArray(model.lstBranchs) ? (model.lstBranchs).join(',') : '',
                pagefrom: 1,
                pageto: 10,
                Fromdate: model.txtFromProceedDate !== undefined && model.txtFromProceedDate !== '' ? model.txtFromProceedDate : '',
                Todate: model.txtToProceedDate !== undefined && model.txtToProceedDate !== '' ? model.txtToProceedDate : '',
                Spflag: flag,
                CustID: '',
                region: model.lstregions,
                oppclose: 0,
                Empwaiting: 0
            };
            matchFollowupServices.matchFollowupSelect(inputobj).then(function(response) {

            });
        };

        // model.CondtionButtonClick = function() {
        //     model.matchFollowupSelect

        // };

        model.regionChange = function(parent) {
            model.BranchName = [];
            model.BranchName = Commondependency.BranchNamebind((parent !== undefined && parent !== null && parent !== "") ? (parent).toString() : "");

        };
        model.slidebind = function(www, eee, eeett) {};
        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('matchFollowupModel', factory);
    factory.$inject = ['$http', 'getArraysearch', '$timeout', 'matchFollowupServices', 'complex-slide-config', 'authSvc', 'Commondependency'];
})(angular);