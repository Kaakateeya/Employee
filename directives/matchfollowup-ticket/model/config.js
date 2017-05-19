(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('matchfollowupticketHistrymdl', factory);

    factory.$inject = ['SelectBindServiceApp', 'authSvc', 'matchfollowupTicketHistryservice', 'alert', 'modelpopupopenmethod', 'arrayConstants', '$timeout'];

    function factory(bindservice, authSvc, marketsvc, alertss, commonpage, arrayConstants, timeout) {
        var model = {};
        model.MAobj = {};
        model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
        model.ticketid = '';
        model.marReplyArr = [];
        model.marInfo = [];
        model.marHistry = [];
        model.ProfileID = '';
        model.scope = {};
        model.init = function() {
            timeout(function() {
                model.marketReplytype();
            }, 1000);
            return model;
        };
        model.close = function() {
            commonpage.closepopuppoptopopup();
        };
        model.RelationshipChange = function(RelationshipID, type) {
            marketsvc.getRaltionName(3, model.ProfileID, RelationshipID).then(function(response) {
                if (_.isArray(response.data[0]) && response.data[0].length > 0) {
                    if (type === 'In') {
                        model.MAobj.txtmrktRelationnameIn = response.data[0][0].NAME;
                    } else {
                        model.MAobj.txtmrktRelationnameout = response.data[0][0].NAME;
                    }
                } else {
                    if (type === 'In') {
                        model.MAobj.txtmrktRelationnameIn = '';
                    } else {
                        model.MAobj.txtmrktRelationnameout = '';
                    }
                }

            });
        };
        model.getMrktSlideInfo = function(ticketid) {
            model.ticketid = ticketid;
            marketsvc.getmarSlide(ticketid, 'I').then(function(respnse) {
                model.marInfo = [];
                model.marHistry = [];
                if (respnse.data !== undefined && respnse.data !== null && respnse.data.length > 0) {
                    model.marInfo = respnse.data;
                    model.ProfileID = (model.marInfo)[0].FromProfileID;
                    model.MAobj.txtmrktCalltelephonenumberIn = model.MAobj.txtmrktCalltelephonenumberout = (model.marInfo)[0].MobileNumber !== "--" ? (model.marInfo)[0].MobileNumber : null;
                    marketsvc.getmarSlide(ticketid, 'H').then(function(innrespnse) {
                        model.marHistry = innrespnse.data;
                        _.map(model.marHistry, function(item) {
                            item.ReplyDatenew = moment(item.ReplyDatenew).format('DD-MMM-YYYY h:mm:ss');
                        });
                    });
                    timeout(function() {
                        model.RelationshipChange(39, 'In');
                        model.RelationshipChange(39, 'Out');
                    }, 1000);
                }
            });
        };
        model.marketReplytype = function() {
            bindservice.bothreplytypeBind().then(function(response) {
                if (_.isArray(response.data[0]) && response.data[0].length > 0) {
                    model.marReplyArr.push({ "label": "--Select--", "title": "--Select--", "value": "", "text": "" });
                    _.each(response.data[0], function(item) {
                        model.marReplyArr.push({ "label": item.Heder, "title": item.Heder, "value": item.ID, "text": item.TEXT });
                    });

                }
            });
        };

        model.mailchange = function(val) {
            return _.where(model.marReplyArr, { value: parseInt(val) })[0].text;
        };

        model.ActionSubmit = function(obj) {
            var curdate = moment().format('DD-MMM-YYYY h:mm:ss');
            //22-Apr-2017 18:32:39'
            var inputObj = {
                CallType: obj.CallType,
                RelationID: obj.RelationID,
                RelationName: obj.RelationName,
                CallResult: obj.CallResult,
                PhoneNum: obj.PhoneNum,
                CallDiscussion: obj.CallDiscussion,
                DisplayStatus: obj.DisplayStatus,
                TicketID: model.ticketid,
                EmpID: model.empid,
                Replaytypeid: obj.Replaytypeid,
                AssignedEmpID: obj.AssignedEmpID
            };
            model.close();
            marketsvc.ActionSubmit(inputObj).then(function(response) {
                var msg;
                var msgClass = parseInt(response.data) === 1 ? 'alert-success' : 'alert-danger';
                switch (obj.CallType) {
                    case 377:
                        if (parseInt(response.data) === 1) {
                            msg = 'Incoming Call Created successfully';
                        } else {
                            msg = 'Incoming Call updation failed';
                        }
                        alertss.timeoutoldalerts(model.scope, msgClass, msg, 4500);
                        break;
                    case 378:
                        if (parseInt(response.data) === 1) {
                            msg = 'Outgoing Call Created successfully';
                        } else {
                            msg = 'Outgoing Call updation failed';
                        }
                        alertss.timeoutoldalerts(model.scope, msgClass, msg, 4500);
                        break;
                    case 379:
                        if (parseInt(response.data) === 1) {
                            msg = 'Memo Created successfully';
                        } else {
                            msg = 'Memo updation failed';
                        }
                        alertss.timeoutoldalerts(model.scope, msgClass, msg, 4500);
                        break;
                    case 563:
                        if (parseInt(response.data) === 1) {
                            msg = 'Ticket closed successfully';
                        } else {
                            msg = 'Ticket closing failed';
                        }
                        alertss.timeoutoldalerts(model.scope, msgClass, msg, 4500);
                        break;
                }

            });
        };

        model.incallSubmit = function(obj) {
            var inobj = {
                CallType: 377,
                RelationID: obj.ddlmrktreceivedIn,
                RelationName: obj.txtmrktRelationnameIn,
                CallResult: obj.ddlmrktCallresultIn,
                PhoneNum: obj.txtmrktCalltelephonenumberIn,
                CallDiscussion: obj.txtmrktCalldiscussionin,
                DisplayStatus: obj.rbtnmarketDisplayIn,
                Replaytypeid: obj.ddlmrktReplyTypeIn
            };
            model.ActionSubmit(inobj);
        };
        model.outcallSubmit = function(obj) {
            var inobj = {
                CallType: 378,
                RelationID: obj.ddlmrktreceivedout,
                RelationName: obj.txtmrktRelationnameout,
                CallResult: obj.ddlmrktcallresultout,
                PhoneNum: obj.txtmrktCalltelephonenumberout,
                CallDiscussion: obj.txtmrktCalldiscussionout,
                DisplayStatus: obj.rbtndisplayOut,
                Replaytypeid: obj.ddlmrktreplytypeout
            };
            model.ActionSubmit(inobj);
        };

        model.memoSubmit = function(obj) {
            var inputObj = {
                CallType: 379,
                //AssignedEmpID: obj.ddlmrktAssignmemo,
                AssignedEmpID: null,
                TicketID: model.ticketid,
                EmpID: model.empid,
                CallDiscussion: obj.txtmrktcalldiscussionMemo
            };
            model.ActionSubmit(inputObj, 'Internal Memo');

        };

        model.closeSubmit = function(obj) {
            //reasn, tktID, empid

            var inputObj = {
                CallType: 563,
                CallDiscussion: obj.txtmrktcloseReasn
            };
            model.ActionSubmit(inputObj, 'Close');

        };
        model.sendemailsubmit = function(obj) {
            var mobj = {
                Notes: obj.txtresendemail,
                EMPID: model.empid,
                profileid: model.marInfo[0].FromProfileID,
                LTicketID: model.ticketid,
                HistoryUpdate: 1,
                FromCustID: model.marInfo[0].FromCustID,
                TocustID: model.marInfo[0].TocustID,
                TicketStatusID: model.FromName,
                FromProfileID: model.marInfo[0].FromProfileID,
                ToProfileID: model.marInfo[0].ToProfileID
            };
        };


        return model.init();
    }
})();