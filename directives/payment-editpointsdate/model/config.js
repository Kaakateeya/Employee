(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('paymenteditpointsmdl', factory);

    factory.$inject = ['SelectBindServiceApp', 'authSvc', 'paymenteditpointsservice', 'alert', 'modelpopupopenmethod', 'arrayConstants', '$timeout'];

    function factory(bindservice, authSvc, paymenteditpointsservice, alertss, commonpage, arrayConstants, timeout) {
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
        model.editpaymentpoints = function(mobj) {
            var obj = {
                intEmpId: authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "",
                intCust_Id: mobj.Allvalues.Custid !== null && mobj.Allvalues.Custid !== '' && mobj.Allvalues.Custid !== undefined ? mobj.Allvalues.Custid : null,
                strProfileId: mobj.Allvalues.ProfileID !== null && mobj.Allvalues.ProfileID !== '' && mobj.Allvalues.ProfileID !== undefined ? mobj.Allvalues.ProfileID : null,
                Allowed_Points: mobj.rbtnchangedpoints !== null && mobj.rbtnchangedpoints !== '' && mobj.rbtnchangedpoints !== undefined ? mobj.rbtnchangedpoints : null,
                Allowed_Days: mobj.rbtndaysallowed !== null && mobj.rbtndaysallowed !== '' && mobj.rbtndaysallowed !== undefined ? mobj.rbtndaysallowed : null,
                Old_ExpiryDate: mobj.Allvalues.ExpiryDate !== "" && mobj.Allvalues.ExpiryDate !== null && mobj.Allvalues.ExpiryDate !== undefined ? mobj.Allvalues.ExpiryDate : null
            };
            if (model.insertopenflag !== 1) {
                model.insertopenflag = 1;
                paymenteditpointsservice.paymenteditsubmit(obj).then(function(response) {
                    console.log(response);
                    if (parseInt(response.data) === 1) {
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Payment Modified succesfully', 4000);
                        model.close();
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Payment Modified Failed', 4000);
                    }
                });
            }
        };

        return model;
    }
})();