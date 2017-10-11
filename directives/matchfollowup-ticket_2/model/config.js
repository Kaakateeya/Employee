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
            // timeout(function() {
            model.marketReplytype();
            //     model.MAobj.txtresendemail = model.mailchange(model.MAobj.ddlresendemailmatchfollowup);
            // }, 1000);
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
                    //
                    model.genderforemail = (model.marInfo)[0].genderforemail = 1;
                    model.Fromticketstatus = (model.marInfo)[0].Fromticketstatus = "I";
                    model.Toticketstatus = (model.marInfo)[0].Toticketstatus = "NI";
                    //
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
        model.sendemailsubmit = function(ticketid, obj, matchobj, ticketstatusid) {
            var mobj = {
                Notes: obj.txtresendemail,
                EMPID: model.empid,
                profileid: matchobj.FromProfileID,
                LTicketID: ticketid,
                HistoryUpdate: 1,
                FromCustID: matchobj.FromCustID,
                TocustID: matchobj.TocustID,
                TicketStatusID: ticketstatusid,
                FromProfileID: matchobj.FromProfileID,
                ToProfileID: matchobj.ToProfileID
            };
            marketsvc.submitemails(mobj).then(function(response) {
                if (parseInt(response.data) === 1) {
                    alertss.timeoutoldalerts(model.scope, "alert-success", "Mail sent succesfully", 4500);
                } else {
                    alertss.timeoutoldalerts(model.scope, "alert-danger", "Mail sending failed", 4500);
                }
                commonpage.closepopuppoptopopup();
            });
        };
        model.converttodatetime = function(date) {
            var dd = moment(date).fromNow();
            return dd;
        };

        model.NotIntrstChnge = function(val, type) {
            model.TicketStatusID2 = "";
            model.emailresendflag = 0;
            model.txtAllcallflag = 0;
            model.rbtnnotIntrst = '';
            model.typeOFCall = type;
            model.typeOfCtrl = val;
            var genderid = model.genderforemail === 1 ? 'Ms.' : 'Mr.';
            var she = model.genderforemail === 1 ? 'She' : 'He';
            var her = model.genderforemail === 1 ? 'her' : 'his';
            var herhim = model.genderforemail === 1 ? 'her' : 'him';
            model.emailmanagers = "<br><br><div style='color:black;text-align: justify;'>For further assistance feel free to contact</div><br> <div style='color:black;text-align: justify;'>Your relationship manager " +
                model.fromempname + "</div> <br> <div style='color:black;text-align: justify;'>" + model.Tosurname + " relationship manager " + model.toempname +
                "</div><br><div style='color:black;text-align: justify;'> Team head Mr.sivaprasad 91-9841282222</div>";

            if (val === '1') {
                model.replytypetxtdiabled = true;
                model.incommingbtntext = model.outgoingcallbtntext = "Interested";
                if (val === '1' && model.Toticketstatus === 'I') {
                    model.txtAllcallflag = 1;
                    model.TicketStatusID = "bothSideinterest";
                    model.txtAllcallDiscusionemail = "<div style='margin-left:30px;color:black;text-align: justify;'>" + genderid + model.Fromsurname + " is also interested in your profile, Since both of you are interested you need one of our customer relationship manager assistance.</div><br>" +
                        "<div style='color:black;text-align: justify;'>For further assistance feel free to contact</div><br> <div style=color:black;text-align: justify;'>Your relationship manager " +
                        model.fromempname + "</div> <br> <div style='color:black;text-align: justify;'>" + model.Fromsurname + " relationship manager " + model.toempname +
                        "</div><br><div style='color:black;text-align: justify;'> Team head Mr.sivaprasad 91-9841282222</div>";
                    model.txtAllcallDiscusion = genderid + model.Fromsurname + " is also interested in your profile, Since both of you are interested you need one of our customer relationship manager assistance.";
                } else if (val === '1' && model.Toticketstatus === 'V') {
                    model.TicketStatusID = "Viewed";
                    model.txtAllcallDiscusion = genderid + model.Fromsurname + " (" + model.ActionProfileID + ") profile was sent to you on " + moment(model.ServiceDate).format('DD-MM-YYYY') +
                        " and " + she + " is showing interest in your profile Please go through the profile and reply to us on the same.We are resending " + her + " profile for the ease of viewing " +
                        "and please give your opinion in the options provided in the profile.";

                } else if (val === '1' && model.Toticketstatus === 'NV') {
                    //resend
                    model.emailresendflag = 1;
                    model.TicketStatusID2 = "Resend";
                    model.TicketStatusID = "NotViewed";
                    model.txtAllcallDiscusion = genderid + model.Fromsurname + " (" + model.ActionProfileID + ") profile was sent to you on " + moment(model.ServiceDate).format('DD-MM-YYYY') +
                        " and " + she + " is showing interest in your profile Please go through the profile and reply to us on the same.We are resending " + her + " profile for the ease of viewing " +
                        "and please give your opinion in the options provided in the profile.";

                } else if (val === '1' && model.Toticketstatus === 'I') {
                    model.TicketStatusID = "onsideinterest";
                    model.txtAllcallDiscusion = genderid + model.Fromsurname + " (" + model.ActionProfileID + ") profile was sent to you on " + moment(model.ServiceDate).format('DD-MM-YYYY') +
                        " and " + she + " is showing interest in your profile Please go through the profile and reply to us on the same.We are resending " + her + " profile for the ease of viewing " +
                        "and please give your opinion in the options provided in the profile.";
                } else {
                    model.txtAllcallDiscusion = genderid + model.Fromsurname + " (" + model.ActionProfileID + ") profile was sent to you on " + moment(model.ServiceDate).format('DD-MM-YYYY') + " and " + she + " is showing interest in your profile.Please go through the profile and reply to us on the same." +
                        "We are resending " + her + " profile for the ease of viewing and please give your opinion in the options provided in the profile";
                }

                model.MAobj.txtmrktCalldiscussionin = model.MAobj.txtmrktCalldiscussionout = model.txtAllcallDiscusion;
            } else if (val === '2') {
                model.replytypetxtdiabled = false;
                model.TicketStatusID = "Pending";
                model.incommingbtntext = model.outgoingcallbtntext = model.internalmemobtntext = "Pending";
                model.txtAllcallDiscusion = genderid + model.Fromsurname + " viewed your full profile and is seeking Three more days to update " + her + "  opinion." +
                    "Meanwhile lets look into other options.";
                model.MAobj.txtmrktCalldiscussionin = model.MAobj.txtmrktCalldiscussionout = model.txtAllcallDiscusion;
            } else if (val === '3') {
                model.replytypetxtdiabled = false;
                model.TicketStatusID = "Followup";
                model.incommingbtntext = model.outgoingcallbtntext = model.internalmemobtntext = "Followup Ticket";
                model.txtAllcallDiscusion = "";
                model.MAobj.txtmrktCalldiscussionin = model.MAobj.txtmrktCalldiscussionout = model.txtAllcallDiscusion;
            } else {
                model.replytypetxtdiabled = true;
                model.TicketStatusID = "Notinterest";
                model.incommingbtntext = model.outgoingcallbtntext = model.internalmemobtntext = "Close Ticket";
                model.txtAllcallDiscusion = genderid + model.Fromsurname + " viewed your  profile and did not respond positive." +
                    "Lets proceed further with our new search options.";
                model.MAobj.txtmrktCalldiscussionin = model.MAobj.txtmrktCalldiscussionout = model.txtAllcallDiscusion;
            }

        };
        model.onTabSelected = function(tabindex) {
            model.MAobj.ddlmrktCallresultIn = model.MAobj.ddlmrktcallresultout = "417";
            model.MAobj.ddlmrktreceivedIn = model.MAobj.ddlmrktreceivedout = "39";
            model.MAobj.rbtnmarketDisplayIn = model.MAobj.rbtndisplayOut = "2";
            model.MAobj.ddlmrktreplytypeout =
                model.MAobj.ddlmrktReplyMemo =
                model.MAobj.ddlmrktreplyClose =
                model.MAobj.ddlmrktReplyTypeIn = "";
            model.MAobj.ddlresendemailmatchfollowup = 5;
        };

        return model.init();
    }
})();