(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('norecoredsfoundmdl', factory);

    factory.$inject = ['SelectBindServiceApp', 'authSvc', 'norecordsfoundservice', 'alert', 'modelpopupopenmethod', 'arrayConstants', '$timeout'];

    function factory(bindservice, authSvc, norecordsfoundservice, alertss, commonpage, arrayConstants, timeout) {
        var model = {};
        model.MAobj = {};
        model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
        model.ticketid = '';
        model.marReplyArr = [];
        model.marInfo = [];
        model.marHistry = [];
        model.ProfileID = '';
        model.scope = {};

        model.close = function() {
            commonpage.closepopuppoptopopup();
        };
        model.nodatafoundrecords = function() {
            var obj = {
                profile: null,
                AssignedEmpID: authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "",
                BranchID: 0,
                Name: model.Customername,
                Email: "phoneno@gmail.com",
                subject: "Marketing",
                Category: 462,
                Message: model.customernarration,
                Priority: 70,
                Image: null,
                CountryCode: null,
                AreaCode: null,
                PhoneNum: model.Allvalues.txtAllPhones !== "" && model.Allvalues.txtAllPhones !== null && model.Allvalues.txtAllPhones !== undefined ? model.Allvalues.txtAllPhones : "",
                EmpID: authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : ""
            };
            norecordsfoundservice.RegistrationValidation(obj).then(function(response) {
                console.log(response);
                commonpage.closepopuppoptopopup();
            });
        };
        return model;
    }
})();