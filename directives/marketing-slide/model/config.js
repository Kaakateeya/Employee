(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('marketticketHistrymdl', factory)

    factory.$inject = ['SelectBindServiceApp', 'authSvc', 'marketingTicketHistryservice', 'alert', 'modelpopupopenmethod', 'arrayConstants', '$timeout'];

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
            }, 500);
            return model;
        };
        model.RelationshipChange = function(RelationshipID, type) {
            bindservice.getRelationName(3, model.ProfileID, RelationshipID).then(function(response) {
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
                    model.ProfileID = (model.marInfo)[0].ProfileID;
                    model.MAobj.txtmrktCalltelephonenumberIn = model.MAobj.txtmrktCalltelephonenumberout = (model.marInfo)[0].PrimaryContactNumber !== "--" ? (model.marInfo)[0].PrimaryContactNumber : null;
                    marketsvc.getmarSlide(ticketid, 'H').then(function(innrespnse) {
                        model.marHistry = innrespnse.data;
                        _.map(model.marHistry, function(item) {
                            item.ReplyDatenew = moment(item.ReplyDatenew).format('DD-MMM-YYYY h:mm:ss');
                        });
                    });
                    timeout(function() {
                        model.RelationshipChange(39, 'In');
                        model.RelationshipChange(39, 'Out');
                    }, 500);
                }
            });
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

        model.mailchange = function(val) {
            return _.where(model.marReplyArr, { value: parseInt(val) })[0].text;
        };
        model.inOutSubmit = function(obj) {
            var curdate = moment().format('DD-MMM-YYYY h:mm:ss');
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
                ticketid: model.ticketid,
                EmpID: model.empid
            };
            marketsvc.InOutSubmit(inputObj).then(function(response) {
                commonpage.closepopuppoptopopup();
                var msg = parseInt(response.data) === 1 ? (obj.CallType === 1 ? 'Incoming Call Created successfully' : 'Outgoing Call Created successfully') :
                    ((obj.CallType === 1 ? 'Incoming Call updation failed' : 'Outgoing Call updation failed'));

                var msgClass = parseInt(response.data) === 1 ? 'alert-success' : 'alert-danger';

                alertss.timeoutoldalerts(model.scope, msgClass, msg, 9500);
            });


            // var relation = '';
            // if (obj.RelationID !== undefined) {
            //     relation = (_.where(arrayConstants.childStayingWith, { value: parseInt(obj.RelationID) }))[0].label;
            // }
            // _.map(model.marHistry, function() {
            //     item.TicketType = 'INCOMING';
            //     item.ReplyDatenew = curdate;
            //     item.NAME = model.empid;
            //     item.CallStatus = obj.CallResult === 417 ? 'Successfull' : (obj.CallResult === 417 ? '418' : '');
            //     item.CallReceivedBy = obj.RelationName;
            //     item.ReplyDesc = obj.CallDiscussion;
            //     item.NoOfDays = 0;
            //     item.RelationShip = relation;

            // });





        };

        model.incallSubmit = function(obj, type) {
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
            if (type === 'assign') {
                model.assignSubmit();
            }

        };

        model.outcallSubmit = function(obj, type) {
            var inobj = {
                CallType: 2,
                RelationID: obj.ddlmrktreceivedout,
                RelationName: obj.txtmrktRelationnameout,
                CallResult: obj.ddlmrktcallresultout,
                PhoneNum: obj.txtmrktCalltelephonenumberout,
                CallDiscussion: obj.txtmrktCalldiscussionout,
                DisplayStatus: obj.rbtndisplayOut
            };
            model.inOutSubmit(inobj);
            if (type === 'assign') {
                model.assignSubmit();
            }

        };

        model.memoSubmit = function(obj, type) {
            //msg, tktID, empid, assignEmpid
            marketsvc.memoSubmit(obj.txtmrktcalldiscussionMemo, model.ticketid, model.empid, obj.ddlmrktAssignmemo).then(function(response) {
                commonpage.closepopuppoptopopup();
                if (parseInt(response.data) === 1) {
                    if (type === 'assign') {
                        model.assignSubmit();
                    }

                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Memo Created successfully', 9500);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Memo updation failed', 9500);
                }
            });
        };

        model.closeSubmit = function(obj) {
            //reasn, tktID, empid
            marketsvc.closeSubmit(obj.txtmrktcloseReasn, model.ticketid, model.empid).then(function(response) {
                commonpage.closepopuppoptopopup();
                if (parseInt(response.data) === 1) {
                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Ticket closed successfully', 9500);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Ticket closing failed', 9500);
                }
            });
        };

        model.assignSubmit = function() {
            marketsvc.assignEmpSubmit(model.ticketid, model.empid, model.empid).then(function(respnse) {});
        };

        model.close = function() {
            commonpage.closepopuppoptopopup();
        };

        return model.init();
    }
})();