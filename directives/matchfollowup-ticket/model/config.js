(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('matchfollowupticketHistrymdl', factory);

    factory.$inject = ['SelectBindServiceApp', 'authSvc', 'matchfollowupTicketHistryservice', 'alert', 'modelpopupopenmethod', 'arrayConstants', '$timeout', 'helperservice'];

    function factory(bindservice, authSvc, marketsvc, alertss, commonpage, arrayConstants, timeout, helpService) {
        var model = {};
        model.MAobj = {};
        model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
        model.ticketid = '';
        model.marReplyArr = [];
        model.marInfo = [];
        model.marHistry = [];
        model.ProfileID = '';
        model.scope = {};
        model.mailInput = {};
        model.init = function() {
            model.marketReplytype();
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
                    model.genderforemail = (model.marInfo)[0].GenderID;
                    model.fromticketstatusemail = (model.marInfo)[0].FromCust_InterestStatus.trim();
                    model.toticketstatusemail = (model.marInfo)[0].ToCust_InterestStatus.trim();
                    model.ToTicketMatchmeetingStatus = (model.marInfo)[0].TicketToStatus.trim();
                    model.Tosurname = (model.marInfo)[0].ToCustIDLastName;
                    model.fromempname = (model.marInfo)[0].FromOwner;
                    model.toempname = (model.marInfo)[0].ToOwner;
                    model.Fromsurname = (model.marInfo)[0].CustomerLastName;
                    model.fromIsconfidential = (model.marInfo)[0].fromIsconfidential;
                    model.fromHighconfidential = (model.marInfo)[0].fromHighconfidential;
                    model.toIsconfidential = (model.marInfo)[0].toIsconfidential;
                    model.toHighconfidential = (model.marInfo)[0].toHighconfidential;
                    model.tocustidself = (model.marInfo)[0].TocustID;
                    model.fromcustidselef = (model.marInfo)[0].FromCustID;
                    model.ActionProfileID = (model.marInfo)[0].FromProfileID;
                    model.toprofileidinterest = (model.marInfo)[0].ToProfileID;
                    model.logidmatchfollowup = (model.marInfo)[0].Cust_ProfileInterestsLog_ID;
                    debugger;
                    model.mailInput = {
                        Notes: '',
                        EMPID: model.empid,
                        profileid: model.ActionProfileID,
                        LTicketID: model.ticketid,
                        HistoryUpdate: 2,
                        FromCustID: model.fromcustidselef,
                        TocustID: model.tocustidself,
                        TicketStatusID: null,
                        FromProfileID: model.ActionProfileID,
                        ToProfileID: model.toprofileidinterest
                    };
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
        model.Resendmail = function(fromcustID, toCustID, FormProfileid, Toprofileid) {
            var resendInputObj = {
                Notes: 'mail sent',
                EMPID: model.empid,
                LFromCustID: fromcustID,
                LToCustID: toCustID,
                FromProfileID: FormProfileid,
                ToProfileID: Toprofileid,
                TicketStatusID: model.TicketStatusID2 !== undefined && model.TicketStatusID2 !== null && model.TicketStatusID2 !== "" ? model.TicketStatusID2 : "NotViewed",
                Subject: "Kaakateeya Email For Bothsideinterest"
            };
            marketsvc.ResendMail(resendInputObj).then(function(response) {
                model.TicketStatusID2 = "";
            });
        };
        model.ActionSubmit = function(obj, str, intrstType, callmatchdiscussion) {
            var curdate = moment().format('DD-MMM-YYYY h:mm:ss');
            if (model.typeOfCtrl === '1' || model.typeOfCtrl === '0') {
                var status = model.typeOfCtrl === '1' ? 1 : 2;
                var statusint = model.fromticketstatusemail === 'I' || model.fromticketstatusemail === 'NI' ? true : false;
                var MobjViewprofile = {
                    ExpressInrestID: model.logidmatchfollowup,
                    CustID: model.fromcustidselef,
                    AcceptStatus: statusint ? (model.fromticketstatusemail === 'I' ? 1 : 2) : status,
                    MatchFollwupStatus: statusint ? (model.fromticketstatusemail === 'I' ? 1 : 2) : status,
                    intEmpId: parseInt(model.empid),
                    strFromStatus: model.fromticketstatusemail
                };

                helpService.UpdateExpressIntrestViewfullprofile(MobjViewprofile).then(function(response) {
                    if (response.data === parseInt(1)) {} else {}
                });
            }
            obj.CallDiscussion = obj.CallDiscussion;
            var alertmsg = '',
                replyTypedisplay = '';
            var inputObj = {
                CallType: obj.CallType,
                RelationID: obj.RelationID,
                RelationName: obj.RelationName,
                CallResult: obj.CallResult,
                PhoneNum: obj.PhoneNum,
                CallDiscussion: obj.CallDiscussion,
                DisplayStatus: parseInt(obj.DisplayStatus),
                TicketID: model.ticketid,
                EmpID: model.empid,
                AssignedEmpID: obj.AssignedEmpID

            };
            marketsvc.ActionSubmit(inputObj).then(function(response) {
                if (parseInt(response.data) === 1) {
                    if (str !== 'Close') {
                        model.close();
                    }
                    switch (intrstType) {
                        case 1:
                            model.mailInput.Notes = obj.CallDiscussion + (callmatchdiscussion !== "" && callmatchdiscussion !== null && callmatchdiscussion !== undefined ? ("<br><span style='text-align: justify;margin-left: 29px;padding-top: 18px;'>" + callmatchdiscussion) + "</span>" : '') + model.emailmanagers;
                            break;
                        case 0:
                            model.mailInput.Notes = obj.CallDiscussion + model.emailmanagers;
                            break;
                        default:
                            model.mailInput.Notes = obj.CallDiscussion + model.emailmanagers;
                            break;
                    }

                    if ((str === 'Incoming') || (str === 'Out going')) {
                        if ((model.MAobj.rbtnmarketDisplayIn === '0' && model.MAobj.ddlmrktReplyTypeIn === '3') || (model.MAobj.rbtndisplayOut === '0' && model.MAobj.ddlmrktreplytypeout === '3')) {} else {
                            if ((model.fromIsconfidential === 0 && model.toIsconfidential === 0 && model.fromHighconfidential === 0 && model.toHighconfidential === 0) || (model.MAobj.rbtndisplayOut === '1' || model.MAobj.rbtnmarketDisplayIn === '1')) {
                                if (model.mailInput.TicketStatusID === "NotViewed") {
                                    marketsvc.sendMail(model.mailInput).then(function(response) {
                                        if (parseInt(response.data) === 1) {}
                                    });
                                    model.Resendmail(model.tocustidself, model.fromcustidselef, model.toprofileidinterest, model.ActionProfileID);
                                } else {
                                    marketsvc.sendMail(model.mailInput).then(function(response) {
                                        if (parseInt(response.data) === 1) {}
                                    });
                                }
                            }
                        }
                    }
                    if (str === 'Incoming') {
                        alertmsg = model.textforalerts(model.incommingbtntext, 'Incoming call created ');
                        replyTypedisplay = 'INCOMING';
                    } else if (str === 'Out going') {
                        alertmsg = model.textforalerts(model.incommingbtntext, 'Out going created ');
                        replyTypedisplay = 'OUT GOING';
                    } else if (str === 'Internal Memo') {
                        alertmsg = model.textforalerts(model.incommingbtntext, 'memo created ');
                        replyTypedisplay = 'INTERNAL MEMO';
                    } else {
                        alertmsg = model.textforalerts(model.incommingbtntext, 'Ticket closed ');
                        replyTypedisplay = 'Close';
                    }
                    alertss.timeoutoldalerts(model.scope, 'alert-success', alertmsg + ' successfully', 9500);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Mail send Failed', 9500);
                }

            });

        };
        model.textforalerts = function(btntext, type) {
            var textalert = type;
            switch (btntext) {
                case 'Interested':
                    textalert = 'Interested Updated ';
                    break;
                case 'Pending':
                    textalert = 'Pending Updated ';
                    break;
                case 'Close Ticket':
                    textalert = 'Close Ticket Updated ';
                    break;
                default:
                    textalert = type;
                    break;
            }
            return textalert;
        };
        model.incallSubmit = function(obj) {
            var inputObj;
            if (model.incommingbtntext === 'Close Ticket') {
                inputObj = {
                    CallType: 563,
                    CallDiscussion: obj.txtmrktCalldiscussionin
                };
                model.ActionSubmit(inputObj, 'Incoming', parseInt(obj.rbtnshowmatchfollowup), obj.txtmatchfollowupCalldiscussion);
            } else {
                inputObj = {
                    CallType: 377,
                    RelationID: obj.ddlmrktreceivedIn,
                    RelationName: obj.txtmrktRelationnameIn,
                    CallResult: obj.ddlmrktCallresultIn,
                    PhoneNum: obj.txtmrktCalltelephonenumberIn,
                    CallDiscussion: obj.txtmrktCalldiscussionin,
                    DisplayStatus: obj.rbtnmarketDisplayIn,
                    Replaytypeid: obj.ddlmrktReplyTypeIn
                };
                model.ActionSubmit(inputObj, 'Incoming', parseInt(obj.rbtnshowmatchfollowup), obj.txtmatchfollowupCalldiscussion);
            }
            if (obj.txtmatchfollowupCalldiscussion !== "" && obj.txtmatchfollowupCalldiscussion !== undefined && obj.txtmatchfollowupCalldiscussion !== null) {
                var matchfollowupobj = {
                    CallType: 377,
                    RelationID: obj.ddlmrktreceivedIn,
                    RelationName: obj.txtmrktRelationnameIn,
                    CallResult: obj.ddlmrktCallresultIn,
                    PhoneNum: obj.txtmrktCalltelephonenumberIn,
                    CallDiscussion: obj.txtmatchfollowupCalldiscussion,
                    DisplayStatus: parseInt(obj.rbtnshowmatchfollowup),
                    TicketID: model.ticketid,
                    EmpID: model.empid,
                    AssignedEmpID: null,
                    Replaytypeid: obj.ddlmrktReplyTypeIn
                };
                marketsvc.ActionSubmit(matchfollowupobj).then(function(response) {

                });
            }

        };
        model.outcallSubmit = function(obj) {
            var inputObj;
            if (model.incommingbtntext === 'Close Ticket') {
                inputObj = {
                    CallType: 563,
                    CallDiscussion: obj.txtmrktCalldiscussionout
                };
                model.ActionSubmit(inputObj, 'Out going', parseInt(obj.rbtnshowOutmatchfollowup), obj.txtmatchfollowupCalldiscussionOut);
            } else {
                inputObj = {
                    CallType: 378,
                    RelationID: obj.ddlmrktreceivedout,
                    RelationName: obj.txtmrktRelationnameout,
                    CallResult: obj.ddlmrktcallresultout,
                    PhoneNum: obj.txtmrktCalltelephonenumberout,
                    CallDiscussion: obj.txtmrktCalldiscussionout,
                    DisplayStatus: obj.rbtndisplayOut,
                    Replaytypeid: obj.ddlmrktreplytypeout

                };
                model.ActionSubmit(inputObj, 'Out going', parseInt(obj.rbtnshowOutmatchfollowup), obj.txtmatchfollowupCalldiscussionOut);
            }
            if (obj.txtmatchfollowupCalldiscussionOut !== "" && obj.txtmatchfollowupCalldiscussionOut !== undefined && obj.txtmatchfollowupCalldiscussionOut !== null) {
                var matchfollowupobj = {
                    CallType: 378,
                    RelationID: obj.ddlmrktreceivedout,
                    RelationName: obj.txtmrktRelationnameout,
                    CallResult: obj.ddlmrktcallresultout,
                    PhoneNum: obj.txtmrktCalltelephonenumberout,
                    CallDiscussion: obj.txtmatchfollowupCalldiscussionOut,
                    DisplayStatus: parseInt(obj.rbtnshowOutmatchfollowup),
                    TicketID: model.ticketid,
                    EmpID: model.empid,
                    AssignedEmpID: obj.AssignedEmpID
                };
                marketsvc.ActionSubmit(matchfollowupobj).then(function(response) {});
            }
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
            if (model.fromIsconfidential === 1 || model.toIsconfidential === 1 || model.fromHighconfidential === 1 || model.toHighconfidential === 1) {
                model.DisplayToCustomerin = true;
            } else {
                model.DisplayToCustomerin = false;
            }
            model.TicketStatusID2 = "";
            model.txtAllcallflag = 0;
            model.rbtnnotIntrst = '';
            model.typeOFCall = type;
            model.typeOfCtrl = val;
            var genderid = model.genderforemail === 2 ? 'Ms.' : 'Mr.';
            var she = model.genderforemail === 2 ? 'She' : 'He';
            var her = model.genderforemail === 2 ? 'her' : 'his';
            var herhim = model.genderforemail === 2 ? 'her' : 'him';
            model.emailmanagers = "<br><br><div style='color:black;text-align: justify;'>For further assistance feel free to contact</div><br> <div style='color:black;text-align: justify;'>Your relationship manager " +
                model.fromempname + "</div> <br> <div style='color:black;text-align: justify;'>" + model.Tosurname + " relationship manager " + model.toempname +
                "</div><br><div style='color:black;text-align: justify;'> Team head Mr.sivaprasad 91-9841282222</div>";

            if (val === '1') {
                model.replytypetxtdiabled = true;
                model.incommingbtntext = model.outgoingcallbtntext = model.internalmemobtntext = "Interested";
                if (model.activebutton === 'bothside') {
                    model.mailInput.TicketStatusID = "bothSideinterest";
                    model.txtAllcallDiscusion = genderid + model.Fromsurname + " is also interested in your profile, Since both of you are interested you need one of our customer relationship manager assistance.";
                } else {
                    if (val === '1' && model.toticketstatusemail === 'I') {
                        model.mailInput.TicketStatusID = "bothSideinterest";
                        model.txtAllcallDiscusion = genderid + model.Fromsurname + " is also interested in your profile, Since both of you are interested you need one of our customer relationship manager assistance.";
                    } else if (val === '1' && model.toticketstatusemail === 'V') {
                        model.mailInput.TicketStatusID = "Viewed";
                        model.txtAllcallDiscusion = genderid + model.Fromsurname + " (" + model.ActionProfileID + ") profile was sent to you on " + moment(model.ServiceDate).format('DD-MM-YYYY') +
                            " and " + she + " is showing interest in your profile Please go through the profile and reply to us on the same.We are resending " + her + " profile for the ease of viewing " +
                            "and please give your opinion in the options provided in the profile.";

                    } else if (val === '1' && model.toticketstatusemail === 'NV') {
                        //resend
                        model.TicketStatusID2 = "Resend";
                        model.mailInput.TicketStatusID = "NotViewed";
                        model.txtAllcallDiscusion = genderid + model.Fromsurname + " (" + model.ActionProfileID + ") profile was sent to you on " + moment(model.ServiceDate).format('DD-MM-YYYY') +
                            " and " + she + " is showing interest in your profile Please go through the profile and reply to us on the same.We are resending " + her + " profile for the ease of viewing " +
                            "and please give your opinion in the options provided in the profile.";

                    } else {
                        model.txtAllcallDiscusion = genderid + model.Fromsurname + " (" + model.ActionProfileID + ") profile was sent to you on " + moment(model.ServiceDate).format('DD-MM-YYYY') + " and " + she + " is showing interest in your profile.Please go through the profile and reply to us on the same." +
                            "We are resending " + her + " profile for the ease of viewing and please give your opinion in the options provided in the profile";
                    }
                }
                model.MAobj.txtmrktCalldiscussionin = model.MAobj.txtmrktCalldiscussionout = model.txtAllcallDiscusion;
            } else if (val === '2') {
                model.replytypetxtdiabled = false;
                model.mailInput.TicketStatusID = "Pending";
                model.incommingbtntext = model.outgoingcallbtntext = model.internalmemobtntext = "Pending";
                model.txtAllcallDiscusion = genderid + model.Fromsurname + " viewed your full profile and is seeking Three more days to update " + her + "  opinion." +
                    "Meanwhile lets look into other options.";
                model.MAobj.txtmrktCalldiscussionin = model.MAobj.txtmrktCalldiscussionout = model.txtAllcallDiscusion;
            } else if (val === '3') {
                model.DisplayToCustomerin = true;
                model.MAobj.rbtnmarketDisplayIn = model.MAobj.rbtndisplayOut = '0';
                model.replytypetxtdiabled = false;
                model.mailInput.TicketStatusID = "Followup";
                model.incommingbtntext = model.outgoingcallbtntext = model.internalmemobtntext = "Followup Ticket";
                model.txtAllcallDiscusion = "";
                model.MAobj.txtmrktCalldiscussionin = model.MAobj.txtmrktCalldiscussionout = model.txtAllcallDiscusion;
            } else {
                model.replytypetxtdiabled = true;
                model.mailInput.TicketStatusID = "Notinterest";
                model.incommingbtntext = model.outgoingcallbtntext = model.internalmemobtntext = "Close Ticket";
                if (model.toticketstatusemail === 'I' && model.ToTicketMatchmeetingStatus === 'Open' && (model.fromticketstatusemail === 'I') && (model.FromTicketMatchmeetingStatus === 'Close')) {
                    model.txtAllcallDiscusion = genderid + model.Fromsurname + " is showing interest in your profile but you were not keen to proceed ahead. Incase if you want to rethink about this profile please contact your relationship manager.";
                } else if (model.toticketstatusemail === 'I' && model.ToTicketMatchmeetingStatus === 'Open' && (model.fromticketstatusemail === 'I') && (model.FromTicketMatchmeetingStatus === 'Open')) {
                    model.txtAllcallDiscusion = "We have informed to  " + genderid + model.Fromsurname + "  about your interest to proceed  but  " + she + " is not keen to proceed ahead. For further communication please contact your relationship manager.";
                } else if (model.toticketstatusemail === 'I' && model.ToTicketMatchmeetingStatus === 'Close' && (model.fromticketstatusemail === 'I') && (model.FromTicketMatchmeetingStatus === 'Open')) {
                    model.txtAllcallDiscusion = genderid + model.Fromsurname + " is showing interest in your profile but you were not keen to proceed ahead. Incase if you want to rethink about this profile please contact your relationship manager.";
                } else if (model.toticketstatusemail === 'I' && model.ToTicketMatchmeetingStatus === 'Close' && (model.fromticketstatusemail === 'I') && (model.FromTicketMatchmeetingStatus === 'Close')) {
                    model.txtAllcallDiscusion = genderid + model.Fromsurname + " viewed your  profile and did not respond positive." +
                        "Lets proceed further with our new search options.";
                }
                //
                else if (model.toticketstatusemail === 'I' && model.ToTicketMatchmeetingStatus === 'Close' && (model.fromticketstatusemail === 'V') && (model.FromTicketMatchmeetingStatus === 'Open')) {
                    model.txtAllcallDiscusion = genderid + model.Fromsurname + " is showing interest in your profile but you were not keen to proceed ahead. Incase if you want to rethink about this profile please contact your relationship manager.";
                } else if (model.toticketstatusemail === 'I' && model.ToTicketMatchmeetingStatus === 'Open' && (model.fromticketstatusemail === 'V') && (model.FromTicketMatchmeetingStatus === 'Open')) {
                    model.txtAllcallDiscusion = "We have informed to  " + genderid + model.Fromsurname + "  about your interest to proceed  but  " + she + " is not keen to proceed ahead. For further communication please contact your relationship manager.";
                }
                //
                else if (model.toticketstatusemail === 'NI' && model.ToTicketMatchmeetingStatus === 'Close') {
                    model.txtAllcallDiscusion = genderid + model.Fromsurname + " is showing interest in your profile but you were not keen to proceed ahead. Incase if you want to rethink about this profile please contact your relationship manager.";
                } else if (model.toticketstatusemail === 'NI' && model.ToTicketMatchmeetingStatus === 'Open') {
                    model.txtAllcallDiscusion = genderid + model.Fromsurname + " is showing interest in your profile but you were not keen to proceed ahead. Incase if you want to rethink about this profile please contact your relationship manager.";
                } else if (model.toticketstatusemail === 'V' && model.ToTicketMatchmeetingStatus === 'Close' && (model.fromticketstatusemail === 'I') && model.FromTicketMatchmeetingStatus === 'Open') {
                    model.txtAllcallDiscusion = genderid + model.Fromsurname + " is showing interest in your profile but you were not keen to proceed ahead. Incase if you want to rethink about this profile please contact your relationship manager.";
                } else if (model.toticketstatusemail === 'V' && model.ToTicketMatchmeetingStatus === 'Open' && (model.fromticketstatusemail === 'I') && model.FromTicketMatchmeetingStatus === 'Open') {
                    model.txtAllcallDiscusion = genderid + model.Fromsurname + " viewed your  profile and did not respond positive." +
                        "Lets proceed further with our new search options.";
                } else if (model.toticketstatusemail === 'V' && model.ToTicketMatchmeetingStatus === 'Open' && (model.fromticketstatusemail === 'I') && model.FromTicketMatchmeetingStatus === 'Close') {
                    model.txtAllcallDiscusion = "We have informed to  " + genderid + model.Fromsurname + "  about your interest to proceed  but  " + she + " is not keen to proceed ahead. For further communication please contact your relationship manager.";
                } else {
                    model.txtAllcallDiscusion = genderid + model.Fromsurname + " viewed your  profile and did not respond positive." +
                        "Lets proceed further with our new search options.";
                }
                model.MAobj.txtmrktCalldiscussionin = model.MAobj.txtmrktCalldiscussionout = model.txtAllcallDiscusion;
            }

        };
        model.onTabSelected = function(tabindex) {
            model.incommingbtntext = "Incoming Call";
            model.outgoingcallbtntext = "Outgoing Call";
            model.MAobj.ddlmrktCallresultIn = model.MAobj.ddlmrktcallresultout = "417";
            model.MAobj.ddlmrktreceivedIn = model.MAobj.ddlmrktreceivedout = "39";
            model.MAobj.rbtnmarketDisplayIn = model.MAobj.rbtndisplayOut = model.MAobj.rbtnshowOutmatchfollowup = model.MAobj.rbtnmarketDisplayIn = "0";
            model.MAobj.ddlmrktreplytypeout =
                model.MAobj.ddlmrktReplyMemo =
                model.MAobj.ddlmrktreplyClose =
                model.MAobj.ddlmrktReplyTypeIn = "";
            model.MAobj.ddlresendemailmatchfollowup = 5;
            model.MAobj.txtmatchfollowupCalldiscussionOut = model.MAobj.txtmatchfollowupCalldiscussion = "";
            model.DisplayToCustomerin = false;
            model.MAobj.txtmrktCalldiscussionin = model.MAobj.txtmrktCalldiscussionout = "";
            model.replytypetxtdiabled = false;
        };

        return model.init();
    }
})();