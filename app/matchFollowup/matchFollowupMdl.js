(function(angular) {
    'use strict';

    function factory($http, getArray, timeout, matchFollowupServices, config,
        authSvc, Commondependency, modelpopupopenmethod, alertss, arrayConstants, SelectBindServiceApp) {
        return function() {

            var model = {};
            model = config;
            model.proceed = {};

            model.BranchName = [];

            model.templateUrl = "templates/matchFollowupSlide.html";
            model.headettemp = "templates/matchFollowupHeader.html";
            model.proceed.typeofPage = 'popup';
            model.typeofPage = 'page';
            model.headervisileble = true;
            model.EmpNamesArr = [];
            model.opendiv = true;
            model.activebutton = '';
            model.spflag = 0;
            model.closeflag = false;
            model.Empwaitingflag = false;
            model.frompage = 1;
            model.topage = 10;
            model.proceed.frompage = 1;
            model.proceed.topage = 10;
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
                model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                model.loginempName = authSvc.LoginEmpName() !== undefined && authSvc.LoginEmpName() !== null && authSvc.LoginEmpName() !== "" ? authSvc.LoginEmpName() : "";
                model.Managementid = authSvc.isManagement() !== undefined && authSvc.isManagement() !== null && authSvc.isManagement() !== "" ? authSvc.isManagement() : "";

                if ((model.Managementid) === 'true') {
                    model.bindEmpnames();
                    model.BranchName = getArray.GArray('BranchName');
                    model.RegionArr = getArray.GArray('Regionofbranches');
                    model.lstregions = '';
                } else {
                    model.BranchName = [];
                    model.RegionArr = [];
                    model.EmpNamesArr = [];
                }
                model.lstEmpnames = [parseInt(model.empid)];
                model.activebutton = 'bothside';
                model.matchFollowupSelect(model.empid);
            };
            model.bindEmpnames = function() {
                SelectBindServiceApp.EmpwithBranch('ProfileBranch', '').then(function(response) {
                    var empBranchData = response.data;
                    var branchids = '1';
                    _.each(empBranchData, function(item) {
                        model.EmpNamesArr.push({ "label": item.Name, "title": item.Name, "value": item.ID, ParentName: item.BranchesName });
                    });
                });

            };
            model.smsarray = [
                { id: 1, text: 'We missed to reach you on 91-XXXXX. please call back' },
                { id: 2, text: 'Bride is interested in your profile.' },
                { id: 3, text: 'Groom is interested in your profile' },
                { id: 4, text: 'Contact details of the Groom/bride is given below.' }
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
                }
                if (typeofpopup === 'proceedpopup') {
                    inputobj.pagefrom = model.proceed.frompage;
                    inputobj.pageto = model.proceed.topage;
                } else {
                    inputobj.pagefrom = model.frompage;
                    inputobj.pageto = model.topage;
                }
                matchFollowupServices.matchFollowupSelect(inputobj).then(function(response) {


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

                            if (parseInt(model.proceed.frompage) === 1) {
                                model.proceed.slides = [];
                                model.proceed.slides = response.data;
                                model.proceed.totalRecords = response.data[0].TotalRows;
                            } else {
                                model.proceed.slides = $.merge(model.proceed.slides, response.data);
                            }
                        } else {

                            if (parseInt(model.frompage) === 1) {
                                model.totalRecords = response.data[0].TotalRows;
                                model.slides = [];
                                model.setSlides(response.data, 10, 'normal');
                            } else {
                                model.addSlides(response.data, model.slides, parseInt(model.topage), 'normal');
                            }
                        }
                    } else {

                        if (parseInt(model.frompage) === 1) {
                            model.totalRecords = 0;
                            model.slides = [];
                        }
                    }
                });
            };

            model.slidebind = function(old, news, array, type) {
                if (type === 'popup') {
                    model.proceed.frompopoverIsOpen = false;
                    model.proceed.topopoverIsOpen = false;
                    if (parseInt(model.proceed.topage) - parseInt(news) === 4) {
                        model.proceed.frompage = parseInt(model.proceed.topage) + 1;
                        model.proceed.topage = parseInt(model.proceed.topage) + 10;
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
                model.slides = [];
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
                model.BranchName = Commondependency.BranchNamebind((parent !== undefined && parent !== null && parent !== "") ? (parent).toString() : "");
            };

            model.proceed.proceedImage = model.proceedImage = function(status) {

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
                model.custid = custid;
                model.proceed.templateUrl = "templates/matchFollowupSlide.html";
                model.proceed.headettemp = "templates/matchFollowupHeader.html";
                model.proceed.frompage = 1;
                model.proceed.topage = 10;
                model.matchFollowupSelect(undefined, custid, 'proceedpopup');
                modelpopupopenmethod.showPopupphotopoup('Proceedslide.html', model.scope, 'lg', "proceedcls");
            };

            model.proceed.closepopup = function() {
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
                    }
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
                    }
                    timeout(function() {
                        model.txtsmsmail = model.mailchange(model.ddlmail);
                    }, 500);

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

                        if (parseInt(response.data) === 1) {
                            model.proceed.closepopup();
                            alertss.timeoutoldalerts(model.scope, 'alert-success', 'sms sent successfully', 9500);
                        }
                    });
                } else {
                    model.mailInput.Notes = model.txtsmsmail;
                    matchFollowupServices.sendMail(model.mailInput).then(function(response) {

                        if (parseInt(response.data) === 1) {
                            model.proceed.closepopup();
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
                }

                matchFollowupServices.ResendMail(resendInputObj).then(function(response) {
                    if (parseInt(response.data) === 1) {

                        if (offlineExpiry === 'Unpaidcust' && onlineExpiry === 'Unpaidcust') {
                            alertss.timeoutoldalerts(model.scope, 'alert-success', 'Mail sent succesfully</br> They Can not open View Profile because of there is No Points', 9500);
                        } else {
                            alertss.timeoutoldalerts(model.scope, 'alert-success', 'Mail sent successfully', 9500);
                        }
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Mail sending Failed', 9500);
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
            model.openActionPopup = function(ticketID, profileID, number) {
                model.bindreplytype();
                model.actobj.ddlInreceivedfrom = 39;
                model.actobj.ddlOutreceivedby = 39;
                model.actobj.ddlInCallresult = model.actobj.ddlOutcallresultout = 417;
                model.ActionProfileID = profileID;
                model.RelationshipChange(39, 'In');
                model.RelationshipChange(39, 'Out');

                model.actobj.txtInCalldiscussion = model.actobj.txtOutCalldiscussion = '';
                model.actobj.ddlInReplyType =
                    model.actobj.ddlOutreplytype =
                    model.actobj.ddlMemReplyType =
                    model.actobj.ddlcloseReplyType = '';

                model.ActionTicket = ticketID;

                //model.actobj.ddlMemAssign = parseInt(model.empid);
                model.actobj.rbtnOutDisplay = model.actobj.rbtnInDisplay = '0';
                model.actobj.txtInCalltelephonenumber = model.actobj.txtOutCalltelephonenumber = number;

                matchFollowupServices.ticketHistry(ticketID, 'I').then(function(response) {

                    if (_.isArray(response.data) && response.data.length > 0) {
                        model.infnArr = {};
                        model.infnArr = (response.data)[0];

                    }
                });
                modelpopupopenmethod.showPopup('Actions.html', model.scope, 'lg', 'Actioncls');
            };


            model.ActionSubmit = function(obj, str) {
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
                    Replaytypeid: obj.Replaytypeid,
                    AssignedEmpID: obj.AssignedEmpID
                };

                matchFollowupServices.ActionSubmit(inputObj).then(function(response) {
                    if (parseInt(response.data) === 1) {
                        model.closeAction();

                        var curdate = moment().format('Do MMMM YYYY, h:mm:ss');
                        if (str === 'Incoming') {
                            alertmsg = 'Incoming call created ';
                            replyTypedisplay = 'INCOMING';
                        } else if (str === 'Out going') {
                            alertmsg = 'Out going created ';
                            replyTypedisplay = 'OUT GOING';
                        } else if (str === 'Internal Memo') {
                            alertmsg = 'memo created ';
                            replyTypedisplay = 'INTERNAL MEMO';
                        } else {
                            alertmsg = 'Ticket closed';
                            replyTypedisplay = 'Close';
                        }
                        var relation = '';
                        if (obj.RelationID !== undefined) {
                            relation = (_.where(arrayConstants.childStayingWith, { value: parseInt(obj.RelationID) }))[0].label;
                        }

                        _.each(model.slides, function(item) {

                            if (model.ActionTicket === item.FromTicket && replyTypedisplay !== 'Close') {
                                item.FromTicketHisoryType = replyTypedisplay;
                                item.FromTicketInfo = replyTypedisplay + ' done on ' + curdate + '(0 days ago)';
                                item.FromTicketHisoryNAME = model.loginempName;
                                item.FromTicketHisoryCallStatus = obj.CallResult === 417 ? 'Successfull' : (obj.CallResult === 417 ? '418' : '');
                                item.FromTicketHisoryCallReceivedBy = obj.RelationName;
                                item.FromTicketHisoryReplyDesc = obj.CallDiscussion;
                                item.FromTicketHisoryRelationShip = relation;

                            } else if (model.ActionTicket === item.ToTicket && replyTypedisplay !== 'Close') {
                                item.ToTicketHisoryType = replyTypedisplay;
                                item.ToTicketInfo = replyTypedisplay + ' done on ' + curdate + '(0 days ago)';
                                item.ToTicketHisoryNAME = model.loginempName;
                                item.ToTicketHisoryCallStatus = obj.CallResult === 417 ? 'Successfull' : (obj.CallResult === 417 ? '418' : '');
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

                var inputObj = {
                    CallType: 377,
                    RelationID: obj.ddlInreceivedfrom,
                    RelationName: obj.txtInRelationname,
                    CallResult: obj.ddlInCallresult,
                    PhoneNum: obj.txtInCalltelephonenumber,
                    CallDiscussion: obj.txtInCalldiscussion,
                    DisplayStatus: obj.rbtnInDisplay,
                    Replaytypeid: obj.ddlInReplyType
                };
                model.ActionSubmit(inputObj, 'Incoming');
            };
            model.outCallsSubmit = function(obj) {
                var inputObj = {
                    CallType: 378,
                    RelationID: obj.ddlOutreceivedby,
                    RelationName: obj.txtOutRelationname,
                    CallResult: obj.ddlOutcallresultout,
                    PhoneNum: obj.txtOutCalltelephonenumber,
                    CallDiscussion: obj.txtOutCalldiscussion,
                    DisplayStatus: obj.rbtnOutDisplay,
                    Replaytypeid: obj.ddlOutreplytype
                };
                model.ActionSubmit(inputObj, 'Out going');
            };

            model.memoSubmit = function(obj) {
                var inputObj = {
                    CallType: 379,
                    CallDiscussion: obj.txtMemmemocalldiscussion,
                    // AssignedEmpID: obj.ddlMemAssign
                    AssignedEmpID: null
                };
                model.ActionSubmit(inputObj, 'Internal Memo');
            };

            model.closeSubmit = function(obj) {
                var inputObj = {
                    CallType: 563,
                    CallDiscussion: obj.txtcloseReason
                };
                model.ActionSubmit(inputObj, 'Close');
            };

            model.viewProfileRedirect = function(profileid) {
                window.open('Viewfullprofile/' + profileid, '_blank');
            };

            model.sendNumbers = function(fromcustid, toCustID) {
                matchFollowupServices.sendNumbers(fromcustid, toCustID, model.empid, '').then(function(response) {
                    if (parseInt(response.data) === 1) {
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'contact numbers Mail sent successfully', 9500);
                    }
                });
            };

            return model;
        }
    }
    angular
        .module('Kaakateeya')
        .factory('matchFollowupModel', factory);
    factory.$inject = ['$http', 'getArraysearch', '$timeout', 'matchFollowupServices',
        'complex-slide-config', 'authSvc', 'Commondependency', 'modelpopupopenmethod', 'alert', 'arrayConstants', 'SelectBindServiceApp'
    ];
})(angular);