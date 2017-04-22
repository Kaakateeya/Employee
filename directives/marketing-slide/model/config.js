(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('marketticketHistrymdl', factory)

    factory.$inject = ['SelectBindServiceApp', 'authSvc', 'marketingTicketHistryservice'];

    function factory(bindservice, authSvc, marketsvc) {
        var model = {};
        model.MAobj = {};
        model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
        model.ticketID = '';
        model.marReplyArr = [];
        model.init = function() {
            model.marketReplytype();
            return model;
        };

        model.marketReplytype = function() {
            bindservice.marketReplytype().then(function(response) {
                if (_.isArray(response.data[0]) && response.data[0].length > 0) {
                    model.marReplyArr.push({ "label": "--Select--", "title": "--Select--", "value": "", "text": "" });
                    _.each(response.data[0], function(item) {
                        model.marReplyArr.push({ "label": item.Heder, "title": item.Heder, "value": item.ID, "text": item.TEXT });
                    });
                }
            });
        };

        model.inOutSubmit = function(obj) {
            var curdate = moment.format('DD-MMM-YYYY h:mm:ss');
            //22-Apr-2017 18:32:39'
            var inputObj = {
                CallType: obj.CallType,
                Calledon: curdate,
                RelationID: obj.RelationID,
                RelationName: obj.RelationName,
                CallResult: obj.CallResult,
                StaffCalled: model.empid,
                PhoneNum: obj.PhoneNum,
                CallDiscussion: obj.CallDiscussion,
                DisplayStatus: obj.DisplayStatus,
                TicketID: model.ticketID,
                EmpID: model.empid
            };
            marketsvc.InOutSubmit(inputObj).then(function(respnse) {
                console.log(respnse);
            });
        };

        model.incallSubmit = function(obj) {
            var inobj = {
                CallType: 1,
                RelationID: obj.ddlmrktreceivedIn,
                RelationName: obj.txtmrktRelationnameIn,
                CallResult: obj.ddlmrktCallresultIn,
                PhoneNum: obj.txtmrktCalltelephonenumberIn,
                CallDiscussion: obj.txtmrktCalldiscussionin,
                DisplayStatus: obj.rbtnmarketDisplayIn
            };
            model.inOutSubmit(inobj);
        };

        model.outcallSubmit = function(obj) {
            var inobj = {
                CallType: 1,
                RelationID: obj.ddlmrktreceivedout,
                RelationName: obj.txtmrktRelationnameout,
                CallResult: obj.ddlmrktcallresultout,
                PhoneNum: obj.txtmrktCalltelephonenumberout,
                CallDiscussion: obj.txtmrktCalldiscussionout,
                DisplayStatus: obj.rbtndisplayOut
            };
            model.inOutSubmit(inobj);
        };

        model.memoSubmit = function(obj) {
            //msg, tktID, empid, assignEmpid
            marketsvc.memoSubmit(obj.txtmrktcalldiscussionMemo, model.ticketID, model.empid, obj.ddlmrktAssignmemo).then(function(respnse) {
                console.log(respnse);
            });
        };

        model.closeSubmit = function(obj) {
            //reasn, tktID, empid
            marketsvc.closeSubmit(obj.txtmrktcloseReasn, model.ticketID, model.empid).then(function(respnse) {
                console.log(respnse);
            });
        };

        return model.init();
    }
})();