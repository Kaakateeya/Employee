(function(angular) {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('matchFollowupModel', ['$http', 'getArraysearch', '$timeout', 'matchFollowupServices',
            'complex-slide-config', 'authSvc', 'Commondependency', 'modelpopupopenmethod', 'alert', 'arrayConstants', 'SelectBindServiceApp', 'helperservice',
            function($http, getArray, timeout, matchFollowupServices, config,
                authSvc, Commondependency, modelpopupopenmethod, alertss, arrayConstants, SelectBindServiceApp, helpService) {
                var model = {};
                model.config = config;
                model.config.proceed = {};
                model.BranchName = [];
                model.templateUrl = "templates/matchFollowupSlide.html";
                model.config.headettemp = "templates/matchFollowupHeader.html";
                model.config.proceed.typeofPage = 'popup';
                model.config.typeofPage = 'page';
                model.headervisileble = true;
                model.EmpNamesArr = [];
                model.opendiv = true;
                model.activebutton = '';
                model.spflag = 0;
                model.closeflag = false;
                model.Empwaitingflag = false;
                model.dynamicPopover = {};
                model.ReplyArr = [];
                model.typeofmailSms = '';
                model.actobj = {};
                model.HistryObj = [];
                model.isopenFlag = false;
                model.curSlide = 0;
                model.dateOptions = {
                    changeMonth: true,
                    changeYear: true,
                    yearRange: "-40:+5",
                    dateFormat: 'mm/dd/yy'
                };
                model.init = function() {
                    model.isopenFlag = false;
                    model.spflag = 0;
                    model.frompage = 1;
                    model.topage = 10;
                    model.config.proceed.frompage = 1;
                    model.config.proceed.topage = 10;
                    model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                    model.loginempName = authSvc.LoginEmpName() !== undefined && authSvc.LoginEmpName() !== null && authSvc.LoginEmpName() !== "" ? authSvc.LoginEmpName() : "";
                    model.Managementid = authSvc.isManagement() !== undefined && authSvc.isManagement() !== null && authSvc.isManagement() !== "" ? authSvc.isManagement() : "";
                    model.lstEmpnames = [parseInt(model.empid)];
                    model.activebutton = 'bothside';
                    model.txtFromProceedDate = model.txtToProceedDate = '';
                    model.matchFollowupSelect(model.empid);
                    return model;
                };
                model.bindEmpnames = function() {
                    if ((model.Managementid) === 'true' && model.EmpNamesArr.length === 0) {
                        SelectBindServiceApp.EmpwithBranch('ProfileBranch', '').then(function(response) {
                            var empBranchData = response.data;
                            _.each(empBranchData, function(item) {
                                model.EmpNamesArr.push({ "label": item.Name, "title": item.Name, "value": item.ID, ParentName: item.BranchesName });
                            });
                        });
                        model.BranchName = getArray.GArray('BranchName');
                        model.RegionArr = getArray.GArray('Regionofbranches');
                        model.lstregions = '';
                    } else {
                        model.BranchName = [];
                        model.RegionArr = [];
                        model.EmpNamesArr = [];
                    }
                };
                model.smsarray = [
                    { id: 1, text: 'We missed to reach you on 91-XXXXX. please call back' },
                    { id: 2, text: 'Bride is interested in your profile.' },
                    { id: 3, text: 'Groom is interested in your profile' },
                    { id: 4, text: 'Contact details of the Groom/bride is given below.' }
                ];

                model.notInrstarray = [
                    { id: 1, text: 'The horoscope is not matching' },
                    { id: 2, text: 'Is not in the age criteria.' },
                    { id: 3, text: 'Is not satisfied with the height' },
                    { id: 4, text: 'Is not satisfied with the educational criteria.' },
                    { id: 5, text: 'Is not satisfied with the professional criteria.' },
                    { id: 6, text: 'There is financial incompatibility' },
                    { id: 7, text: 'Is not satisfied with the photos provided' }
                ];
                model.matchFollowupSelect = function(empid, custID, typeofpopup) {
                    var inputobj = {
                        empid: model.empid,
                        strProfileOwner: empid !== undefined ? empid : ((model.Managementid) === 'true' ? (_.isArray(model.lstEmpnames) ? (model.lstEmpnames).join(',') : '') : model.empid),
                        strProfileOwnerBranch: _.isArray(model.lstBranchs) ? (model.lstBranchs).join(',') : '',
                        Fromdate: model.txtFromProceedDate !== undefined && model.txtFromProceedDate !== '' ? model.txtFromProceedDate : '',
                        Todate: model.txtToProceedDate !== undefined && model.txtToProceedDate !== '' ? model.txtToProceedDate : '',
                        Spflag: model.spflag,
                        CustID: custID,
                        strregion: model.lstregions !== undefined ? model.lstregions : '',
                        oppclose: model.closeflag,
                        Empwaiting: model.Empwaitingflag
                    };
                    if (typeofpopup === 'proceedpopup') {
                        inputobj.pagefrom = model.config.proceed.frompage;
                        inputobj.pageto = model.config.proceed.topage;
                    } else {
                        inputobj.pagefrom = model.frompage;
                        inputobj.pageto = model.topage;
                    }
                    matchFollowupServices.matchFollowupSelect(inputobj).then(function(response) {
                        model.isDisabledsubmit = false;
                        if (_.isArray(response.data) && response.data.length > 0) {
                            var currentdate = new Date();
                            currentdate = moment(currentdate).format("YYYY-MM-DD");
                            _.each(response.data, function(item) {
                                item.FromOfflineExpiryDate = moment(currentdate).isAfter(moment(item.FromOfflineExpiryDate).format("YYYY-MM-DD")) || item.FromofflineDetails == "Offline : Unpaid" ? "Unpaidcust" : "";
                                item.FromOnlineMembershipExpiryDate = moment(currentdate).isAfter(moment(item.FromOnlineMembershipExpiryDate).format("YYYY-MM-DD")) || item.FromonlineDetails == "Online : Unpaid" ? "Unpaidcust" : "";
                                item.ToOfflineExpiryDate = moment(currentdate).isAfter(moment(item.ToOfflineExpiryDate).format("YYYY-MM-DD")) || item.TofflineDetails == "Offline : Unpaid" ? "Unpaidcust" : "";
                                item.ToonlineExpiryDate = moment(currentdate).isAfter(moment(item.ToonlineExpiryDate).format("YYYY-MM-DD")) || item.ToonlineDetails == "Online : Unpaid" ? "Unpaidcust" : "";
                            });
                            if (typeofpopup === 'proceedpopup') {
                                if (parseInt(model.config.proceed.frompage) === 1) {
                                    model.config.proceed.slides = [];
                                    model.config.proceed.slides = response.data;
                                    model.config.proceed.totalRecords = response.data[0].TotalRows;
                                } else {
                                    model.config.proceed.slides = $.merge(model.config.proceed.slides, response.data);
                                }
                            } else {
                                if (parseInt(model.frompage) === 1) {
                                    model.config.totalRecords = response.data[0].TotalRows;
                                    model.config.slides = [];
                                    model.config.slides = response.data;
                                } else {
                                    model.config.addSlides(response.data, config.slides, parseInt(model.topage), 'normal');
                                }
                            }
                        } else {
                            if (parseInt(model.frompage) === 1) {
                                model.config.totalRecords = 0;
                                config.slides = [];
                            }
                        }
                    });
                };


                model.slidebind = function(old, news, array, type) {
                    if (type === 'popup') {
                        model.frompopoverIsOpen = false;
                        model.topopoverIsOpen = false;
                        if (parseInt(model.config.proceed.topage) - parseInt(news) === 4) {
                            model.config.proceed.frompage = parseInt(model.config.proceed.topage) + 1;
                            model.config.proceed.topage = parseInt(model.config.proceed.topage) + 10;
                            model.matchFollowupSelect(undefined, model.custid, 'proceedpopup');
                        }
                    } else {
                        model.frompopoverIsOpen = false;
                        model.topopoverIsOpen = false;
                        if (parseInt(model.topage) - parseInt(news) === 4) {
                            model.frompage = parseInt(model.topage) + 1;
                            model.topage = parseInt(model.topage) + 10;
                            model.matchFollowupSelect();
                        }
                    }
                };

                model.CondtionButtonClick = function(activeType, flag, flagClose, flagEmpwaiting) {
                    config.slides = [];
                    model.activebutton = activeType;
                    model.spflag = flag;
                    model.closeflag = flagClose;
                    model.Empwaitingflag = flagEmpwaiting;
                    model.frompage = 1;
                    model.topage = 10;
                    model.matchFollowupSelect();
                    model.activeslide = 0;
                };
                model.regionChange = function(parent) {
                    model.BranchName = [];
                    model.BranchName = Commondependency.BranchNamebindval((parent !== undefined && parent !== null && parent !== "") ? (parent).toString() : "");
                };

                model.proceedImage = function(status) {
                    var src = '';
                    if (status.trim() === "I") {
                        src = 'src/images/heartgrren.gif';
                    } else if (status.trim() === "NI") {
                        src = 'src/images/brkhrtgreen.gif';
                    }
                    return src;
                };

                model.ProceededProfiles = function(serviceCount, empname) {
                    var splitEmpName = '';
                    if (empname !== undefined) {
                        splitEmpName = empname.split('-');
                    }
                    var loginName = model.loginempName.indexOf(' ') !== -1 ? (model.loginempName).split(' ')[0] : model.loginempName;
                    return (parseInt(serviceCount) > 1 && loginName.trim() === splitEmpName[0].trim()) ? true : false;
                };
                model.serviceCountProfiles = function(custid) {
                    model.headervisileble = true;
                    model.custid = custid;
                    model.templateUrl = "templates/matchFollowupSlide.html";
                    model.config.proceed.headettemp = "templates/matchFollowupHeader.html";
                    model.config.proceed.frompage = 1;
                    model.config.proceed.topage = 10;
                    model.matchFollowupSelect(undefined, custid, 'proceedpopup');
                    modelpopupopenmethod.showPopupphotopoup('Proceedslide.html', model.scope, 'lg', "proceedcls");
                };

                model.closepopup = function() {
                    modelpopupopenmethod.closepopup();
                };
                model.close = function() {
                    modelpopupopenmethod.closepopuppoptopopup();
                };
                model.dynamicPopover = {
                    templateUrl: 'myPopoverTemplate.html',
                    title: 'Ticket history',
                    isOpen: false
                };
                model.dynamicPopover.fromisOpen = false;
                model.dynamicPopover.toisOpen = false;
                model.histryPopover = function(ticketID, type, fromtoType) {
                    matchFollowupServices.ticketHistry(ticketID, type).then(function(response) {
                        if (_.isArray(response.data) && response.data.length > 0) {
                            if (fromtoType === 'from') {
                                model.ticketHistryArr = [];
                                model.ticketHistryArr = response.data;

                            } else {
                                model.ToticketHistryArr = [];
                                model.ToticketHistryArr = response.data;
                            }
                        }
                    });
                };
                model.checkStatusID = function(val) {
                    return (val === "NI") ? "NotViewed" : (val === "I" ? "Accept" : (val === "NI" ? "Reject" : "NotViewed"));
                };
                model.bindreplytype = function() {
                    if (model.ReplyArr.length === 0) {
                        matchFollowupServices.bothreplytypeBind().then(function(response) {
                            var data = response.data[0];

                            if (_.isArray(response.data[0]) && response.data[0].length > 0 && model.ReplyArr.length === 0) {
                                model.ReplyArr.push({ "label": "--Select--", "title": "--Select--", "value": "", "text": "" });
                                _.each(response.data[0], function(item) {
                                    model.ReplyArr.push({ "label": item.Heder, "title": item.Heder, "value": item.ID, "text": item.TEXT });
                                });
                            }
                        });
                    }
                };
                model.mailchange = function(val) {
                    return _.where(model.ReplyArr, { value: parseInt(val) })[0].text;
                };
                model.openSmsMail = function(type, name, profileid, email, mobilenumber, mobileCountryCode, ticketID, EmpmobileNumber, fromcustid, tocustid, ticketStatusId, ToProfileID) {
                    model.typeofmailSms = type;
                    model.txtsmsmail = '';
                    model.ddlmail = '';
                    model.rbtnsms = '';
                    if (type === 'sms') {
                        model.smsInput = [];
                        var strempNumber = '';
                        if (EmpmobileNumber !== undefined)
                            strempNumber = (EmpmobileNumber.split('-'))[1];
                        model.smsInput = {
                            strbody: model.txtsmsmail,
                            strMobileNumber: mobilenumber,
                            strName: name,
                            strEmpname: model.loginempName,
                            strEmpid: model.empid,
                            strEmpmobileNumber: strempNumber,
                            strMobileCountryCode: mobileCountryCode,
                            i_TicketID: ticketID,
                            marketbothflag: 'Bothone'
                        };
                    } else {
                        model.custName = name + '(' + profileid + ')';
                        model.custemail = email;
                        model.bindreplytype();
                        model.ddlmail = 5;
                        model.mailInput = {
                            Notes: model.txtsmsmail,
                            EMPID: model.empid,
                            profileid: profileid,
                            LTicketID: ticketID,
                            HistoryUpdate: 1,
                            FromCustID: fromcustid,
                            TocustID: tocustid,
                            TicketStatusID: model.checkStatusID(ticketStatusId),
                            FromProfileID: profileid,
                            ToProfileID: ToProfileID
                        };
                    }
                    modelpopupopenmethod.showPopup('sendsmsMail.html', model.scope, 'md', 'mailCls');
                };
                model.smsOnchange = function(val) {
                    model.txtsmsmail = _.where(model.smsarray, { id: parseInt(val) })[0].text;
                };
                model.smsMailSubmit = function(type) {
                    if (type === 'sms') {
                        model.smsInput.strbody = model.txtsmsmail;
                        matchFollowupServices.sendSms(model.smsInput).then(function(response) {
                            model.isDisabledsubmit = false;
                            if (parseInt(response.data) === 1) {
                                model.closepopup();
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'sms sent successfully', 9500);
                            }
                        });
                    } else {
                        model.mailInput.Notes = model.txtsmsmail;
                        matchFollowupServices.sendMail(model.mailInput).then(function(response) {
                            model.isDisabledsubmit = false;
                            if (parseInt(response.data) === 1) {
                                model.closepopup();
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Mail sent successfully', 9500);
                            }
                        });
                    }
                };
                model.Settlementfom = function(val) {
                    model.image = val;
                    modelpopupopenmethod.showPopupphotopoup('templates/bindImagePopup.html', model.scope, 'md', 'settlecls');
                };
                model.closeAction = function() {
                    modelpopupopenmethod.closepopup();
                };
                model.closeprocced = function() {
                    modelpopupopenmethod.closepopuppoptopopup();
                };
                model.redirectContactPage = function(custid) {
                    window.open('/Contact/' + custid, '_blank');
                };
                model.Resendmail = function(fromcustID, toCustID, FormProfileid, Toprofileid, offlineExpiry, onlineExpiry) {
                    var resendInputObj = {
                        Notes: 'mail sent',
                        EMPID: model.empid,
                        LFromCustID: fromcustID,
                        LToCustID: toCustID,
                        FromProfileID: FormProfileid,
                        ToProfileID: Toprofileid,
                        TicketStatusID: "NotViewed",
                        Subject: "Kaakateeya Email For Bothsideinterest"
                    };
                    matchFollowupServices.ResendMail(resendInputObj).then(function(response) {
                        model.isDisabledsubmit = false;
                        if (model.emailresendflag !== 1) {
                            if (parseInt(response.data) === 1) {
                                if (offlineExpiry === 'Unpaidcust' && onlineExpiry === 'Unpaidcust') {
                                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Mail sent succesfully</br> They Can not open View Profile because of there is No Points', 9500);
                                } else {
                                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Mail sent successfully', 9500);
                                }
                            } else {
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Mail sending Failed', 9500);
                            }
                        }
                    });
                };
                model.RelationshipChange = function(RelationshipID, type) {
                    matchFollowupServices.getRaltionName(3, model.ActionProfileID, RelationshipID).then(function(response) {
                        if (_.isArray(response.data[0]) && response.data[0].length > 0) {
                            if (type === 'In') {
                                model.actobj.txtInRelationname = response.data[0][0].NAME;
                            } else {
                                model.actobj.txtOutRelationname = response.data[0][0].NAME;
                            }
                        } else {
                            if (type === 'In') {
                                model.actobj.txtInRelationname = '';
                            } else {
                                model.actobj.txtOutRelationname = '';
                            }
                        }

                    });
                };
                model.openActionPopup = function(ticketID, profileID, number, fromcustid, tocustid, ticketStatusId, ToProfileID, Name,
                    gender, selfname, selfemail, slideobj, flagtype) {
                    model.bindreplytype();
                    model.emailresendflag = 0;
                    model.flagtype = flagtype;
                    if (flagtype === 'from') {
                        model.fromempname = slideobj.fromempname;
                        model.toempname = slideobj.toempname;
                        model.toticketstatusemail = slideobj.ToticketStatusIDb.trim();
                        model.fromticketstatusemail = slideobj.FromticketStatusIDb.trim();
                        model.FromOfflineExpiryDate = slideobj.FromOfflineExpiryDate;
                        model.FromOnlineMembershipExpiryDate = slideobj.FromOnlineMembershipExpiryDate;
                        model.fromcustidselef = fromcustid;
                        model.tocustidself = tocustid;
                    } else {
                        model.toempname = slideobj.fromempname;
                        model.fromempname = slideobj.toempname;
                        model.toticketstatusemail = slideobj.FromticketStatusIDb.trim();
                        model.fromticketstatusemail = slideobj.ToticketStatusIDb.trim();
                        model.FromOfflineExpiryDate = slideobj.ToOfflineExpiryDate;
                        model.FromOnlineMembershipExpiryDate = slideobj.ToonlineExpiryDate;
                        model.fromcustidselef = fromcustid;
                        model.tocustidself = tocustid;
                    }
                    model.ServiceDate = slideobj.ServiceDate;
                    model.selfname = selfname;
                    model.selfemail = selfemail;
                    model.ticketstatusforemail = ticketStatusId.trim();
                    model.genderforemail = gender;
                    model.tointerestname = Name;
                    model.toprofileidinterest = ToProfileID;
                    model.actobj.ddlInreceivedfrom = 39;
                    model.actobj.ddlOutreceivedby = 39;
                    model.actobj.ddlInCallresult = model.actobj.ddlOutcallresultout = 417;
                    model.ActionProfileID = profileID;
                    model.RelationshipChange(39, 'In');
                    model.RelationshipChange(39, 'Out');
                    model.actobj.txtInCalldiscussion = model.actobj.txtOutCalldiscussion = '';
                    model.actobj.ddlInReplyType =
                        model.actobj.rbtnReplyTypeout =
                        model.actobj.rbtnReplyType =
                        model.actobj.ddlcloseReplyType = '';
                    model.ActionTicket = ticketID;
                    model.actobj.rbtnReplyTypememo = model.actobj.rbtnReplyTypeClose = '';
                    model.actobj.txtcloseReason = model.actobj.txtMemmemocalldiscussion = '';
                    //model.actobj.ddlMemAssign = parseInt(model.empid);
                    model.actobj.rbtnOutDisplay = model.actobj.rbtnInDisplay = '1';
                    model.incommingbtntext = "Incoming Call";
                    model.outgoingcallbtntext = "Outgoing Call";
                    model.internalmemobtntext = "Internal Memo";
                    model.actobj.txtInCalltelephonenumber = model.actobj.txtOutCalltelephonenumber = number;
                    matchFollowupServices.ticketHistry(ticketID, 'I').then(function(response) {
                        if (_.isArray(response.data) && response.data.length > 0) {
                            model.infnArr = {};
                            model.infnArr = (response.data)[0];
                        }
                    });
                    model.mailInput = {};
                    model.mailInput = {
                        // Notes: obj.CallDiscussion,
                        EMPID: model.empid,
                        profileid: profileID,
                        LTicketID: ticketID,
                        HistoryUpdate: 2,
                        FromCustID: fromcustid,
                        TocustID: tocustid,
                        TicketStatusID: model.checkStatusID(ticketStatusId),
                        FromProfileID: profileID,
                        ToProfileID: ToProfileID
                    };
                    modelpopupopenmethod.showPopup('Actions.html', model.scope, 'lg', 'Actioncls');
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
                model.ActionSubmit = function(obj, str, intrstType) {
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
                        DisplayStatus: obj.DisplayStatus,
                        TicketID: model.ActionTicket,
                        EmpID: model.empid,
                        // Replaytypeid: obj.Replaytypeid,
                        AssignedEmpID: obj.AssignedEmpID
                    };
                    matchFollowupServices.ActionSubmit(inputObj).then(function(response) {
                        model.isDisabledsubmit = false;
                        if (parseInt(response.data) === 1) {
                            if (str !== 'Close') {
                                model.closeAction();
                            }
                            model.mailInput.Notes = model.txtAllcallflag === 1 ? model.txtAllcallDiscusionemail : obj.CallDiscussion + model.emailmanagers;
                            if (str === 'Incoming' || str === 'Out going') {
                                matchFollowupServices.sendMail(model.mailInput).then(function(response) {
                                    if (parseInt(response.data) === 1) {}
                                });
                            }
                            var curdate = moment().format('Do MMMM YYYY, h:mm:ss');
                            if (str === 'Incoming') {
                                // alertmsg = 'Incoming call created ';
                                alertmsg = model.textforalerts(model.incommingbtntext, 'Incoming call created ');
                                replyTypedisplay = 'INCOMING';
                            } else if (str === 'Out going') {
                                // alertmsg = 'Out going created ';
                                alertmsg = model.textforalerts(model.incommingbtntext, 'Out going created ');
                                replyTypedisplay = 'OUT GOING';
                            } else if (str === 'Internal Memo') {
                                // alertmsg = 'memo created ';
                                alertmsg = model.textforalerts(model.incommingbtntext, 'memo created ');
                                replyTypedisplay = 'INTERNAL MEMO';
                            } else {
                                // alertmsg = 'Ticket closed';
                                alertmsg = model.textforalerts(model.incommingbtntext, 'Ticket closed ');
                                replyTypedisplay = 'Close';
                            }
                            var relation = '';
                            if (obj.RelationID !== undefined) {
                                relation = (_.where(arrayConstants.childStayingWith, { value: parseInt(obj.RelationID) }))[0].label;
                            }
                            _.each(config.slides, function(item) {
                                if (model.ActionTicket === item.FromTicket && replyTypedisplay !== 'Close') {
                                    item.FromTicketHisoryType = replyTypedisplay;
                                    item.FromTicketInfo = replyTypedisplay + ' done on ' + curdate + '(0 days ago)';
                                    item.FromTicketHisoryNAME = model.loginempName;
                                    item.FromTicketHisoryCallStatus = obj.CallResult === 417 ? 'Successfull' : (obj.CallResult === 418 ? 'UnSuccessfull' : '');
                                    item.FromTicketHisoryCallReceivedBy = obj.RelationName;
                                    item.FromTicketHisoryReplyDesc = obj.CallDiscussion;
                                    item.FromTicketHisoryRelationShip = relation;
                                } else if (model.ActionTicket === item.ToTicket && replyTypedisplay !== 'Close') {
                                    item.ToTicketHisoryType = replyTypedisplay;
                                    item.ToTicketInfo = replyTypedisplay + ' done on ' + curdate + '(0 days ago)';
                                    item.ToTicketHisoryNAME = model.loginempName;
                                    item.ToTicketHisoryCallStatus = obj.CallResult === 417 ? 'Successfull' : (obj.CallResult === 418 ? 'UnSuccessfull' : '');
                                    item.ToTicketHisoryCallReceivedBy = obj.RelationName;
                                    item.ToTicketHisoryReplyDesc = obj.CallDiscussion;
                                    item.ToTicketHisoryRelationShip = relation;
                                }
                            });
                            alertss.timeoutoldalerts(model.scope, 'alert-success', alertmsg + ' successfully', 9500);
                        } else {
                            alertss.timeoutoldalerts(model.scope, 'alert-success', 'Mail send Failed', 9500);
                        }
                    });
                };
                model.inCallsSubmit = function(obj) {
                    model.isDisabledsubmit = true;
                    var inputObj;
                    if (model.incommingbtntext === 'Close Ticket') {
                        inputObj = {
                            CallType: 563,
                            CallDiscussion: model.txtAllcallDiscusion
                        };
                        model.ActionSubmit(inputObj, 'Close');
                    } else {
                        inputObj = {
                            CallType: 377,
                            RelationID: obj.ddlInreceivedfrom,
                            RelationName: obj.txtInRelationname,
                            CallResult: obj.ddlInCallresult,
                            PhoneNum: obj.txtInCalltelephonenumber,
                            CallDiscussion: obj.txtInCalldiscussion,
                            // DisplayStatus: obj.rbtnInDisplay,
                            DisplayStatus: 1
                        };
                        // if (model.activebutton === 'bothside') {
                        //     inputObj.CallDiscussion = model.txtAllcallDiscusionemail;
                        // }
                        model.ActionSubmit(inputObj, 'Incoming', obj.rbtnReplyType);
                    }
                };
                model.outCallsSubmit = function(obj) {
                    model.isDisabledsubmit = true;
                    var inputObj;
                    if (model.incommingbtntext === 'Close Ticket') {
                        inputObj = {
                            CallType: 563,
                            CallDiscussion: model.txtAllcallDiscusion
                        };
                        model.ActionSubmit(inputObj, 'Close');
                    } else {
                        inputObj = {
                            CallType: 378,
                            RelationID: obj.ddlOutreceivedby,
                            RelationName: obj.txtOutRelationname,
                            CallResult: obj.ddlOutcallresultout,
                            PhoneNum: obj.txtOutCalltelephonenumber,
                            CallDiscussion: obj.txtOutCalldiscussion,
                            // DisplayStatus: obj.rbtnOutDisplay,
                            DisplayStatus: 1
                        };
                        model.ActionSubmit(inputObj, 'Out going', obj.rbtnReplyTypeout);
                    }
                };
                model.memoSubmit = function(obj) {
                    model.isDisabledsubmit = true;
                    var inputObj;
                    if (model.incommingbtntext === 'Close Ticket') {
                        inputObj = {
                            CallType: 563,
                            CallDiscussion: model.txtAllcallDiscusion
                        };
                        model.ActionSubmit(inputObj, 'Close');
                    } else {
                        inputObj = {
                            CallType: 379,
                            CallDiscussion: obj.txtMemmemocalldiscussion,
                            AssignedEmpID: null
                        };
                        model.ActionSubmit(inputObj, 'Internal Memo', obj.rbtnReplyTypememo);
                    }
                };
                model.closeSubmit = function(obj) {
                    model.isDisabledsubmit = true;
                    var inputObj = {
                        CallType: 563,
                        CallDiscussion: obj.txtcloseReason
                    };
                    model.ActionSubmit(inputObj, 'Close');
                };

                model.viewProfileRedirect = function(profileid) {
                    window.open('Viewfullprofile/' + profileid + '/0', '_blank');
                };

                model.sendNumbers = function(fromcustid, toCustID) {
                    matchFollowupServices.sendNumbers(fromcustid, toCustID, model.empid, '').then(function(response) {
                        if (parseInt(response.data) === 1) {
                            alertss.timeoutoldalerts(model.scope, 'alert-success', 'contact numbers Mail sent successfully', 9500);
                        }
                    });
                };
                model.NotIntrstChnge = function(val, type) {
                    model.emailresendflag = 0;
                    model.txtAllcallflag = 0;
                    model.rbtnnotIntrst = '';
                    model.typeOFCall = type;
                    model.typeOfCtrl = val;
                    var genderid = model.genderforemail === 1 ? 'Mr.' : 'Ms.';
                    var she = model.genderforemail === 1 ? 'He' : 'She';
                    var her = model.genderforemail === 1 ? 'his' : 'her';
                    model.emailmanagers = "<br><br><div style='color:black;'>For further assistance feel free to contact</div><br> <div style='color:black;'>Your relationship manager " +
                        model.fromempname + "</div> <br> <div style='color:black;'>" + model.tointerestname + " relationship manager " + model.toempname +
                        "</div><br><div style='color:black;'> Team head Mr.sivaprasad 91-9841282222</div>";
                    if (val === '1') {
                        model.incommingbtntext = model.outgoingcallbtntext = model.internalmemobtntext = "Interested";
                        if (model.activebutton === 'bothside') {
                            model.txtAllcallflag = 1;
                            model.txtAllcallDiscusionemail = "<div style='margin-left:30px;color:black;'>" + genderid + model.tointerestname + " is also interested in your profile, Since both of you are interested you need one of our customer relationship manager assistance.</div><br>" +
                                "<div style='color:black;'>For further assistance feel free to contact</div><br> <div style='color:black;'>Your relationship manager " +
                                model.fromempname + "</div> <br> <div style='color:black;'>" + model.tointerestname + " relationship manager " + model.toempname +
                                "</div><br><div style='color:black;'> Team head Mr.sivaprasad 91-9841282222</div>";
                            model.txtAllcallDiscusion = genderid + model.tointerestname + " is also interested in your profile, Since both of you are interested you need one of our customer relationship manager assistance.";

                        } else {
                            if (model.fromticketstatusemail === 'I' && model.toticketstatusemail === 'V') {
                                model.txtAllcallDiscusion = genderid + model.tointerestname + " (" + model.toprofileidinterest + ") profile was sent to you on " + moment(model.ServiceDate).format('DD-MM-YYYY') +
                                    " We have noticed that " + she + " had viewed your profile but yet to give " + her + " opinion." +
                                    her + " relationship manager will contact  " + her + " and get back to you with " + her + " opinion at the earliest.";
                            } else if (model.fromticketstatusemail === 'I' && model.toticketstatusemail === 'NV') {
                                //resend
                                model.emailresendflag = 1;
                                model.Resendmail(model.tocustidself, model.fromcustidselef, model.toprofileidinterest, model.ActionProfileID, model.FromOfflineExpiryDate, model.FromOnlineMembershipExpiryDate);
                                model.txtAllcallDiscusion = genderid + model.tointerestname + " (" + model.toprofileidinterest + ") profile was sent to you on " + moment(model.ServiceDate).format('DD-MM-YYYY') +
                                    " We have noticed that " + she + " is yet to view your profile and we have resent your profile to " + her + " now and " +
                                    "have also sent a mobile message and we will also try to reach  " + her + " over phone to inform the same";
                            } else if (model.fromticketstatusemail === 'V' && model.toticketstatusemail === 'I') {
                                model.txtAllcallDiscusion = genderid + model.tointerestname + " (" + model.toprofileidinterest + ") profile was sent to you on " + moment(model.ServiceDate).format('DD-MM-YYYY') +
                                    " and " + she + " is showing interest in your profile Please go through the profile and reply to us on the same.We are resending " + her + " profile for the ease of viewing " +
                                    "and please give your opinion in the options provided in the profile.";
                            } else if (model.fromticketstatusemail === 'I' && model.toticketstatusemail === 'I') {
                                model.txtAllcallflag = 1;
                                model.txtAllcallDiscusionemail = "<div style='margin-left:30px;color:black;'>" + genderid + model.tointerestname + " is also interested in your profile, Since both of you are interested you need one of our customer relationship manager assistance.</div><br>" +
                                    "<div style='color:black;'>For further assistance feel free to contact</div><br> <div style=color:black'>Your relationship manager " +
                                    model.fromempname + "</div> <br> <div style='color:black;'>" + model.tointerestname + " relationship manager " + model.toempname +
                                    "</div><br><div style='color:black;'> Team head Mr.sivaprasad 91-9841282222</div>";
                                model.txtAllcallDiscusion = genderid + model.tointerestname + " is also interested in your profile, Since both of you are interested you need one of our customer relationship manager assistance.";
                            } else {
                                model.txtAllcallDiscusion = genderid + model.tointerestname + " (" + model.toprofileidinterest + ") profile was sent to you on " + moment(model.ServiceDate).format('DD-MM-YYYY') + " and " + she + " is showing interest in your profile.Please go through the profile and reply to us on the same." +
                                    "We are resending " + her + " profile for the ease of viewing and please give your opinion in the options provided in the profile";
                            }
                        }
                        model.actobj.txtcloseReason = model.actobj.txtInCalldiscussion = model.actobj.txtOutCalldiscussion = model.actobj.txtMemmemocalldiscussion = model.txtsmsmail = model.txtMemmemocalldiscussion = model.txtAllcallDiscusion;
                    } else if (val === '2') {
                        model.incommingbtntext = model.outgoingcallbtntext = model.internalmemobtntext = "Pending";
                        model.txtAllcallDiscusion = genderid + model.tointerestname + " viewed your full profile and is seeking Three more days to update " + her + "  opinion." +
                            "Meanwhile lets look into other options.";
                        model.actobj.txtcloseReason = model.actobj.txtInCalldiscussion = model.actobj.txtOutCalldiscussion = model.actobj.txtMemmemocalldiscussion = model.txtsmsmail = model.txtMemmemocalldiscussion = model.txtAllcallDiscusion;
                    } else {
                        model.incommingbtntext = model.outgoingcallbtntext = model.internalmemobtntext = "Close Ticket";
                        model.txtAllcallDiscusion = genderid + model.tointerestname + " viewed your  profile and did not respond positive." +
                            "Lets proceed further with our new search options.";
                        // model.actobj.txtcloseReason = model.actobj.txtInCalldiscussion = model.actobj.txtOutCalldiscussion = model.actobj.txtMemmemocalldiscussion = model.txtsmsmail = model.txtMemmemocalldiscussion = '';
                        model.actobj.txtcloseReason = model.actobj.txtInCalldiscussion = model.actobj.txtOutCalldiscussion = model.actobj.txtMemmemocalldiscussion = model.txtsmsmail = model.txtMemmemocalldiscussion = model.txtAllcallDiscusion;
                    }
                    //modelpopupopenmethod.showPopupphotopoup('notIntrstPopup.html', model.scope, 'md', 'notintrstCls');
                };
                model.notIntrstchangeBind = function(val) {
                    if (model.typeOfCtrl === '0') {
                        var txt = val.length > 0 ? val.join(' , ') : val;
                        if (model.typeOFCall === 'In') {
                            model.actobj.txtInCalldiscussion = txt;
                        } else if (model.typeOFCall === 'Out') {
                            model.actobj.txtOutCalldiscussion = txt;
                        } else if (model.typeOFCall === 'mail') {
                            model.txtsmsmail = txt;
                        } else if (model.typeOFCall === 'close') {
                            model.actobj.txtcloseReason = txt;
                        } else {
                            model.actobj.txtMemmemocalldiscussion = txt;
                        }
                    } else {
                        if (model.typeOFCall === 'In') {
                            model.actobj.txtInCalldiscussion = val;
                        } else if (model.typeOFCall === 'Out') {
                            model.actobj.txtOutCalldiscussion = val;
                        } else if (model.typeOFCall === 'mail') {
                            model.txtsmsmail = val;
                        } else if (model.typeOFCall === 'close') {
                            model.actobj.txtcloseReason = val;
                        } else {
                            model.actobj.txtMemmemocalldiscussion = val;
                        }

                    }
                };
                model.destroy = function() {
                    config.reset();
                };
                model.clearalltext = function() {
                    model.incommingbtntext = "Incoming Call";
                    model.outgoingcallbtntext = "Outgoing Call";
                    model.internalmemobtntext = "Internal Memo";
                    model.actobj.txtcloseReason = model.actobj.txtInCalldiscussion = model.actobj.txtOutCalldiscussion = model.actobj.txtMemmemocalldiscussion = model.txtsmsmail = model.txtMemmemocalldiscussion = model.txtAllcallDiscusion = "";
                    model.actobj.rbtnReplyTypeout =
                        model.actobj.rbtnReplyType = "";
                    model.actobj.rbtnReplyTypememo = "";
                    model.actobj.rbtnReplyTypeClose = "";
                };
                model.skipthisprofile = function(slide, fromcust_id, tocustid, logid, status, flag) {
                    if (flag === 'From' && slide.isSkippedfrom) {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'You have already skipped this profile', 3000);
                    } else if (flag === 'To' && slide.isSkippedto) {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'You have already skipped this profile', 3000);
                    } else {
                        if (status === "NI") {
                            helpService.acceptrejectexpressinterest(fromcust_id, tocustid, logid, status, parseInt(model.empid)).then(function(response) {
                                if (response.data === parseInt(1)) {
                                    if (flag === 'From') {
                                        slide.isSkippedfrom = true;
                                    } else {
                                        slide.isSkippedto = true;
                                    }
                                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Skipped successfully', 4000);
                                } else {
                                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Skipped fail', 4000);
                                }
                            });
                        }
                    }
                };
                return model;
            }
        ]);

})(angular);