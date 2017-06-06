(function() {
    'use strict';

    function factory(marketingservice, config, authSvc, helperservice, commonFactory, uibModal, alertss, modelpopupopenmethod,
        SelectBindServiceApp, timeout, $filter, arrayConstants, marketsvc) {
        return function() {
            var model = {};
            model.scope = {};
            model = config;
            model.headervisileble = true;
            model.templateUrl = "templates/marketingSlide.html";
            model.headettemp = "templates/marketingSlideHeader.html";
            model.EmpNamesArr = [];
            model.ReplyArr = [];
            model.topage = 1;

            model.empNamesInOutArr = [];
            var curdate = moment().format('DD-MMM-YYYY hh:mm:ss');
            model.dateOptions = {
                changeMonth: true,
                changeYear: true,
                yearRange: "-40:+5",
                dateFormat: 'mm/dd/yy'
            };
            model.opendiv = false;
            var empid, AdminID, TicketId, custId, isSibbling;
            model.init = function() {
                empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                model.loginempName = authSvc.LoginEmpName() !== undefined && authSvc.LoginEmpName() !== null && authSvc.LoginEmpName() !== "" ? authSvc.LoginEmpName() : "";
                AdminID = model.Admin = authSvc.isAdmin();
                model.getEmpnamesinout();
                model.bindEmpnames();

                model.ProfileOwner = [parseInt(empid)];
                model.ActiveButton = 'unpaid';

                model.MarketingTicketBind(1, 2);
                model.Marketingslideticket = [];
                model.MarketingslideHistory = [];
                model.marketFlag = 0;
                model.siblingsFlag = 0;
                model.guestticketFlag = 0;
                model.onlineexprdFlag = 0;
                model.offlineexprdFlag = 0;
                model.Excelflag = 2;
                model.notinpay = null;
                model.EmpNamesArr = [];

                model.MarketingSlideShowBind(1, 10);
                timeout(function() {
                    model.marketReplytype();
                }, 500);
                model.ddlmail = "";
                return model;
            };

            model.getEmpnamesinout = function() {
                SelectBindServiceApp.EmpBinding(1, 2, '').then(function(response) {
                    model.empNamesInOutArr.push({ "label": "--Select--", "title": "--Select--", "value": "" });
                    _.each(response.data, function(item) {
                        if (item.CountryCode === 'Profile Owner') {
                            model.empNamesInOutArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                        }
                    });
                });
            };



            model.marsmsarray = [
                { id: 1, text: 'We missed to reach you on 91-XXXXX. please call back' },
                { id: 2, text: 'As per our telephonic conversation a/c details are......' },
                { id: 3, text: 'Upgrade membership for more details....' },
                { id: 4, text: 'Your Mobile number is not verfied., We recommond you to login and verify the mobile' },
                { id: 5, text: 'Your Email is not verified., We recommond you to login and verify the email' },
                { id: 6, text: 'Your Near by Branch Address---> Flat No:103,109, Vijayasri APts, Behind chermas, Ameerpet,Hyderabad.' },
                { id: 7, text: 'Your profile is viewed by 20 Members. Please login to view their details' },
                { id: 8, text: 'I am ' + model.loginempName + ' Your Relationship Manager. Please Feel Free to Contact me (9:00 AM to 6:00 PM IST)' },
                { id: 9, text: 'Please update your Complete profile for Good Responce' },
                { id: 10, text: 'Please upload your recent photo graphs on www.kaakateeya.com/WhatsApp on 91-9848535373 with your profile id or Name and Surname' },
                { id: 11, text: " Dear Member, lots of new matches are added on kaakateeya.com everyday. Don't miss, Login now and connect with them" },
                { id: 12, text: 'We are trying to contact you for verification but not responding.So your profile will be deactivated , please contact us' },
            ];

            model.slidebind = function(old, news, array, type) {
                if (parseInt(model.topage) - parseInt(news) === 4) {
                    model.MarketingSlideShowBind(parseInt(model.topage) + 1, parseInt(model.topage) + 10);
                }
            };

            model.splitArray = function(val) {
                return val = val !== '' && val !== undefined && val.length > 0 ? val.join(',') : null;
            };

            model.MarketingSlideShowBind = function(from, to) {

                model.topage = to;
                var inputobj = {
                    strBranch: model.splitArray(model.Branchs),
                    strEmpName: model.splitArray(model.ProfileOwner),
                    i_isAdmin: AdminID,
                    i_EmpID: empid,
                    i_PageFrom: from,
                    i_PageTo: to,
                    dtFromProceedDate: model.fromticketcreateddate,
                    dtToProceedDate: model.toticketcreateddate,
                    i_days: model.Expiryin,
                    i_RegionID: model.regions,
                    v_MarketremindeFlag: model.marketFlag,
                    v_siblingflag: model.siblingsFlag,
                    v_guestticketflag: model.guestticketFlag,
                    v_OnlineExprd: model.onlineexprdFlag,
                    v_OfflineExprd: model.offlineexprdFlag,
                    i_TicketId: model.TicketId,
                    i_EmailId: model.Email,
                    i_PhoneNumber: model.PhoneNumber,
                    i_ProfileId: model.ProfileID,
                    dt_FromRemainderdate: model.fromremainderdate,
                    dt_ToReminderdate: model.toremainderdate,
                    i_Excelflag: model.Excelflag,
                    V_Notpay: model.notinpay
                }

                marketingservice.getMarketingSlideShowBind(inputobj).then(function(response) {
                    if (response.data && response.data.Marketingslideticket !== null && response.data.Marketingslideticket.length > 0) {
                        console.log(response.data);
                        model.Marketingslideticket = response.data.Marketingslideticket;
                        model.MarketingslideHistory = response.data.MarketingslideHistory;
                        model.TotalRows = model.Marketingslideticket[0].TotalRows;

                        _.map(response.data.Marketingslideticket, function(item) {

                            item.editval = item.Feedetails ? 'Edit' : 'Save';
                            item.editSAval = item.SettlementValue ? 'Edit' : 'Save';
                            item.ddlmrktCallresultIn = item.ddlmrktcallresultout = "417";
                            item.ddlmrktreceivedIn = item.ddlmrktreceivedout = "39";
                            item.rbtnmarketDisplayIn = item.rbtndisplayOut = "2";
                            item.ddlmrktreplytypeout =
                                item.ddlmrktReplyMemo =
                                item.ddlmrktreplyClose =
                                item.ddlmrktReplyTypeIn = "";
                            item.txtmrktRelationnameout = item.txtmrktRelationnameIn = item.FatherName;

                            item.selectedIndex = 0;
                            item.ddlmrktAssignmemo = parseInt(empid);
                            item.txtmrktCalltelephonenumberIn = item.txtmrktCalltelephonenumberout = item.PrimaryContactNumber;

                            item.histryObj = _.where(response.data.MarketingslideHistory, { Emp_Ticket_ID: item.Emp_Ticket_ID.toString() });
                            _.map(item.histryObj, function(iiitm) {
                                iiitm.ReplyDatenew = moment(iiitm.ReplyDatenew).format('YYYY/MM/DD h:mm a')
                            });
                            item.histryObj = _.sortBy(item.histryObj, 'ReplyDatenew').reverse();

                            var nodata = item.NodataFound ? item.NodataFound.split(',') : '';
                            if (nodata) {
                                item.nodataFoundArr = [];
                                _.each(nodata, function(itm) {
                                    switch (itm.trim()) {
                                        case 'CustomerPersonal':
                                            item.nodataFoundArr.push({ displayname: 'No Education & Profession', type: 'Education' });
                                            break;

                                        case 'NoParent':
                                            item.nodataFoundArr.push({ displayname: 'No Parent Details', type: 'Parent' });

                                            break;
                                        case 'Sibling':
                                            item.nodataFoundArr.push({ displayname: 'No Sibling Details', type: 'Sibbling' });

                                            break;
                                        case 'Astro':
                                            item.nodataFoundArr.push({ displayname: 'No Astro Details', type: 'Astro' });

                                            break;
                                        case 'Property':
                                            item.nodataFoundArr.push({ displayname: 'No Property Details', type: 'Property' });

                                            break;
                                    }
                                });

                            }
                        });
                        if (from === 1) {
                            model.setSlides(response.data.Marketingslideticket, 10, 'normal');

                        } else {
                            model.addSlides(response.data.Marketingslideticket, model.slides, parseInt(model.topage), 'normal');
                        }
                    } else {
                        model.slides = [];
                        if (from === 1)
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', 'No Records Found', 4500);
                    }
                });
            };

            model.MarketingTicket = function(ActiveButton, marketFlag, siblingsFlag, guestticketFlag, onlineexprdFlag, offlineexprdFlag, Excelflag, notinpay) {
                model.ActiveButton = ActiveButton;
                model.marketFlag = marketFlag;
                model.siblingsFlag = siblingsFlag;
                model.guestticketFlag = guestticketFlag;
                model.onlineexprdFlag = onlineexprdFlag;
                model.offlineexprdFlag = offlineexprdFlag;
                model.Excelflag = Excelflag;
                model.notinpay = notinpay;
                model.MarketingSlideShowBind(1, 10);
            };

            model.MarketingTicketBind = function(flag, ID) {

                marketingservice.getMarketingTicketBind(flag, ID).then(function(response) {

                    model.applicationStatusarray = [];
                    model.Castearray = [];
                    model.ProfileOwnerarray = [];
                    model.Brancharray = [];

                    _.each(response.data, function(item) {
                        switch (item.CountryCode) {
                            // case "Profile Owner":
                            //     model.ProfileOwnerarray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                            //     break;

                            case "Branch":
                                model.Brancharray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                break;
                        }
                    });
                });
            };

            model.bindEmpnames = function() {
                SelectBindServiceApp.EmpwithBranch('ProfileBranch', '').then(function(response) {
                    var empBranchData = response.data;
                    _.each(empBranchData, function(item) {
                        model.EmpNamesArr.push({ "label": item.Name, "title": item.Name, "value": item.ID, ParentName: item.BranchesName });
                    });
                });
            };

            model.PhotoRequest = function(row) {
                helperservice.PhotoRequest(row.ProfileID, empid, row.Emp_Ticket_ID).then(function(response) {
                    console.log(response);
                    if (response.data && parseInt(response.data) === 1) {
                        row.histryObj.splice(0, 0, model.pushTicketHistry('InternalMemo',
                            '', '', 'Photo request for Upload Photo'
                        ));
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Photo Request sent successfully', 4500);
                    }
                });
            };

            model.NotIntrstToPay = function(isSibbling, ticketid, custid) {
                TicketId = ticketid;
                custId = custid;
                isSibbling = isSibbling;
                model.popupdata = [
                    { lblname: '', controlType: 'about', ngmodel: 'txtnotIntToPay', parameterValue: 'txtsibblingval' }
                ];
                model.popupHeader = 'Sibling Details';
                commonFactory.open('notInpayPopup.html', model.scope, uibModal);
            };

            model.pushTicketHistryToArray = function(ticketID, val) {
                _.map(model.Marketingslideticket, function(item) {
                    if (item.Emp_Ticket_ID === ticketID) {
                        item.histryObj.splice(0, 0, model.pushTicketHistry('InternalMemo',
                            '', '', val
                        ));
                    }
                });
            };
            model.updateData = function(inObj, type) {
                var datainobj = {
                    EmpTicketID: TicketId,
                    EmpID: empid,
                    Message: inObj.GetDetails.txtsibblingval,
                    AssignedEmpID: empid,
                    feevalue: null,
                    CustID: custId,
                    SettlementValue: null,
                    isSiblings: isSibbling
                }
                marketingservice.feeUpdate(datainobj).then(function(response) {
                    console.log(response);
                    if (response.data && parseInt(response.data) === 1) {
                        commonFactory.closepopup();
                        model.pushTicketHistryToArray(TicketId, inObj.GetDetails.txtsibblingval);
                    }
                });
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
                        Empid: empid,
                        strEmpmobileNumber: strempNumber,
                        strMobileCountryCode: mobileCountryCode,
                        Emp_TicketingCallHistoryID: ticketID
                    }

                } else {
                    model.custName = name + '(' + profileid + ')';
                    model.custemail = email;
                    model.bindreplytype();
                    model.ddlmail = 5;

                    model.mailInput = {
                        Notes: model.txtsmsmail,
                        EMPID: empid,
                        profileid: profileid,
                        LTicketID: ticketID
                    }

                    timeout(function() {
                        model.txtsmsmail = model.mailchange(model.ddlmail);
                    }, 500);

                }
                modelpopupopenmethod.showPopup('sendmarsmsMail.html', model.scope, 'md', 'mailCls');
            };

            model.smsOnchange = function(val) {
                model.txtsmsmail = _.where(model.marsmsarray, { id: parseInt(val) })[0].text;
            };

            model.closepopup = function() {
                modelpopupopenmethod.closepopup();
            };

            // model.close = function() {
            //     modelpopupopenmethod.closepopuppoptopopup();
            // };
            model.smsMailSubmit = function(type) {
                if (type === 'sms') {
                    model.smsInput.strbody = model.txtsmsmail;
                    marketingservice.sendSms(model.smsInput).then(function(response) {
                        if (parseInt(response.data) === 1) {
                            model.closepopup();
                            model.pushTicketHistryToArray(model.smsInput.Emp_TicketingCallHistoryID, model.txtsmsmail);
                            alertss.timeoutoldalerts(model.scope, 'alert-success', 'sms sent successfully', 9500);
                        }
                    });
                } else {
                    model.mailInput.Notes = model.txtsmsmail;
                    marketingservice.sendMail(model.mailInput).then(function(response) {
                        if (parseInt(response.data) === 1) {
                            model.closepopup();
                            model.pushTicketHistryToArray(model.mailInput.LTicketID, model.txtsmsmail);
                            alertss.timeoutoldalerts(model.scope, 'alert-success', 'Mail sent successfully', 9500);
                        }
                    });
                }
            };

            model.bindreplytype = function() {
                if (model.ReplyArr.length === 0) {
                    marketingservice.marketreplytypeBind().then(function(response) {
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
                return model.ReplyArr.length > 0 ? (_.where(model.ReplyArr, { value: parseInt(val) })[0].text) : '';
            };

            model.forgetpassword = function(row) {
                SelectBindServiceApp.forgotpasswordemail(ProfileID).then(function(response) {
                    if (response.data === 1) {

                        row.histryObj.splice(0, 0, model.pushTicketHistry('InternalMemo',
                            '', '', 'Email To Reset Forgot Password'
                        ));
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Mail sent to your email, To reset your password check your mail', 4000);
                    }
                });
            };
            model.getSettleDelete = function(ProfileStatusID, CustID) {
                var type = ProfileStatusID === 57 || ProfileStatusID === 393 ? 'S' : (ProfileStatusID === 56 || ProfileStatusID === 394 ? 'D' : (ProfileStatusID === 55 ? 'I' : ''));
                marketingservice.SettleDeleteInactive(CustID, type).then(function(response) {
                    model.settleArr = JSON.parse(response.data[0])[0];
                    model.typeOfProfile = type;
                });

                modelpopupopenmethod.showPopup('settlePopup.html', model.scope, 'md', 'SettleDelete');
            };

            model.showSAmethod = function(Settle) {
                model.image = Settle;
                modelpopupopenmethod.showPopup('templates/bindImagePopup.html', model.scope, 'md', '');
            };

            model.ViewProfile = function(Profileid) {
                window.open('/Viewfullprofile/' + Profileid + '/0', '_blank');
            };
            model.redirectContact = function(custid) {
                window.open('/Contact/' + custid, '_blank');
            };


            model.Resendmail = function(custID, Profileid) {

                var resendInputObj = {
                    EMPID: model.empid,
                    LFromCustID: custID,
                    LToCustID: custID,
                    FromProfileID: Profileid,
                    Notes: 'Missing fields',
                    TicketStatusID: "Accept"
                }

                marketingservice.ResendMail(resendInputObj).then(function(response) {
                    if (parseInt(response.data) === 1) {
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Mail sent successfully', 9500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Mail sending Failed', 9500);
                    }
                });
            };

            model.editRedirect = function(custid, type) {
                window.open('/' + type + '/' + custid, '_blank');
            };

            model.verifymail = function(custID) {
                SelectBindServiceApp.verifyEmail(custID).then(function(response) {
                    console.log(response);
                    if (response.data !== undefined) {
                        if (response.data === 1) {
                            alertss.timeoutoldalerts(model.scope, 'alert-success', 'Email verify mail sent Successfully', 4500);
                        }
                    }
                });
            };


            model.sendMobileCode = function(CountryID, CCode, MobileNumber, CustContactNumbersID) {
                model.popupMobilenumber = MobileNumber;
                model.ID = CustContactNumbersID;
                var inputOBj = {
                    iCountryID: CountryID,
                    iCCode: CCode,
                    MobileNumber: MobileNumber,
                    CustContactNumbersID: CustContactNumbersID
                };

                SelectBindServiceApp.sendMobileCodeBasedOnContactID(inputOBj).then(function(response) {
                    console.log(response);
                    model.mobileVerificationCode = response.data;
                    modelpopupopenmethod.showPopup('verifyMobileContentmar.html', model.scope, 'md', '');
                });
            };

            model.verifyMobCode = function(val) {
                if (val === "") {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please enter Mobile verify Code', 4500);
                } else {
                    SelectBindServiceApp.verifyMobileBasedOnContactID(val, model.ID).then(function(response) {
                        console.log(response);
                        if (response.data && parseInt(response.data) === 1) {
                            alertss.timeoutoldalerts(model.scope, 'alert-success', 'Verified Successfully', 4500);
                        } else {
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Verification failed', 4500);
                        }
                    });
                }
            };
            model.cancel = function() {
                modelpopupopenmethod.closepopup();
            };

            model.updateREGFee = function(row, txtval) {
                if (row.editval === 'Edit') {
                    row.editval = 'update Fee'
                    row.txtFeeValue = row.Feedetails;
                } else if (row.editval === 'update Fee' || row.editval === 'Save') {
                    row.editval = 'Edit'

                    var datainobj = {
                        EmpTicketID: row.Emp_Ticket_ID,
                        EmpID: empid,
                        Message: "Registration fee update------" + txtval,
                        AssignedEmpID: empid,
                        feevalue: txtval,
                        CustID: row.CustID,
                        SettlementValue: null
                    }
                    marketingservice.feeUpdate(datainobj).then(function(response) {
                        console.log(response);
                        if (response.data && parseInt(response.data) === 1) {
                            row.Feedetails = txtval;
                            var Appendobj = {
                                TicketType: 'InternalMemo',
                                ReplyDate: curdate,
                                ReplyDatenew: curdate,
                                NAME: model.loginempName,
                                CallStatus: '',
                                CallReceivedBy: '',
                                ReplyDesc: "Registration fee update------" + txtval,
                                NoOfDays: '',
                                RelationShip: ''
                            };
                            row.histryObj.push(Appendobj);

                            _.map(row.histryObj, function(item) {
                                item.ReplyDatenew = moment(item.ReplyDatenew).format('YYYY/MM/DD h:mm a')
                            });
                            row.histryObj = _.sortBy(row.histryObj, 'ReplyDatenew').reverse();

                        }
                    });
                }
            };

            model.updateSAFee = function(row, txtval) {
                if (row.editSAval === 'Edit') {
                    {
                        row.editSAval = 'update Fee'
                        row.txtSAFeeValue = row.SettlementValue;
                    }
                } else if (row.editSAval === 'update Fee' || row.editSAval === 'Save') {
                    row.editSAval = 'Edit'

                    var datainobj = {
                        EmpTicketID: row.Emp_Ticket_ID,
                        EmpID: empid,
                        Message: "Settlement Amount update------" + txtval,
                        AssignedEmpID: empid,
                        feevalue: null,
                        CustID: row.CustID,
                        SettlementValue: txtval
                    }
                    marketingservice.feeUpdate(datainobj).then(function(response) {
                        console.log(response);
                        if (response.data && parseInt(response.data) === 1) {
                            row.SettlementValue = txtval;
                            var Appendobj = {
                                TicketType: 'InternalMemo',
                                ReplyDate: curdate,
                                ReplyDatenew: moment(curdate).format('YYYY-MM-DD hh:mm:ss'),
                                NAME: model.loginempName,
                                CallStatus: '',
                                CallReceivedBy: '',
                                ReplyDesc: "Settlement Amount update------" + txtval,
                                NoOfDays: '',
                                RelationShip: ''
                            };
                            row.histryObj.push(Appendobj);

                            _.map(row.histryObj, function(item) {
                                item.ReplyDatenew = moment(item.ReplyDatenew).format('YYYY/MM/DD h:mm a')
                            });
                            row.histryObj = _.sortBy(row.histryObj, 'ReplyDatenew').reverse();
                        }
                    });
                }
            };




            model.getnumberbind = function(fromval, Toval, str, incrementval) {
                var options = [];
                options.push({ label: str, title: str, value: "" });
                for (var i = fromval; i <= Toval; i += incrementval) {
                    if (i < 10) {
                        options.push({ label: "0" + i + " " + str, title: "0" + i + " " + str, value: (parseInt(i) + 1) });
                    } else {

                        options.push({ label: i + " " + str, title: i + " " + str, value: (parseInt(i) + 1) });
                    }
                }
                return options;
            };


            model.replytype = function(type) {
                var options = [];
                options.push({ label: '--select--', title: '--select--', value: "" });
                if (type === 'calltype') {
                    var calltypeArray = [{ value: 377, text: 'INCOMING' }, { value: 378, text: 'OUT GOING' }, { value: 379, text: 'INTERNAL MEMO' }];
                    for (var i = 0; i < calltypeArray.length; i++) {
                        options.push({ label: calltypeArray[i].text, title: calltypeArray[i].text, value: calltypeArray[i].value });
                    }
                }
                return options;
            };

            model.changereminder = function(slidearray) {

                model.reminderslidearray = {};
                model.reminderslidearray = slidearray;
                model.txtprofileidreminder = slidearray.ProfileID;
                model.reminderticketid = slidearray.TicketID;
                model.txtreminderDate = $filter('date')(slidearray.ReminderCreatedDate, "dd-MM-yyyy");
                model.ddlHrs = "";
                model.ddlmins = "";
                model.ddlcontactperson = "";

                model.ddlremCaltype = "";
                modelpopupopenmethod.showPopup('Reminderticket.html', model.scope, 'md', "reminderCls");
                model.Hoursarray = model.getnumberbind(0, 23, 'Hrs', 1);
                model.miniutearray = model.getnumberbind(0, 59, 'Mins', 1);
                model.calltypearray = model.replytype('calltype');
                model.replaytypearray = arrayConstants.childStayingWith;
                model.categoryarray = arrayConstants.catgory;
                model.ddlremCatgory = 462;

                model.ticketIDRem = slidearray.Emp_Ticket_ID;
                model.RemID = slidearray.ReminderID;

                if (slidearray.ReminderID) {

                    model.txtreminderDate = slidearray.ReminderDatepopup;
                    model.ddlHrs = slidearray.ReminderID;
                    model.ddlmins = slidearray.ReminderID;
                    model.ddlremCaltype = parseInt(slidearray.TicketTypeID);
                    model.ddlcontactperson = slidearray.ReminderRelationID;
                    model.contactpersonname = slidearray.ReminderRelationName;
                    model.ddlremCatgory = parseInt(slidearray.Category);
                    model.remembertickets = slidearray.Reminderbody;
                    if (slidearray.ReminderTime) {
                        var remindertimeArr = slidearray.ReminderTime.split(':');
                        // $('#ddlHrs').multiselect('select', parseInt(remindertimeArr[0]) + 1);

                        // $('#ddlmins').multiselect('select', [parseInt(remindertimeArr[1]) + 1]);
                        model.ddlHrs = parseInt(remindertimeArr[0]) + 1;
                        model.ddlmins = parseInt(remindertimeArr[1]) + 1;
                    }
                }


            };
            model.reminderSubmit = function() {
                var Mobj = {
                    ProfileID: model.txtprofileidreminder,
                    ReminderID: model.RemID,
                    EmpID: empid,
                    TicketID: model.ticketIDRem,
                    DateOfReminder: $filter('date')(model.txtreminderDate, 'dd-MM-yyyy'),
                    ReminderType1: model.ddlremCaltype,
                    Body: model.remembertickets,
                    RelationID: model.ddlcontactperson,
                    Name: model.contactpersonname,
                    Category: model.ddlremCatgory,
                    IsFollowup: 0
                };

                modelpopupopenmethod.closepopup();
                marketingservice.upadateremainderdate(Mobj).then(function(response) {
                    if (response !== undefined && response.data === parseInt(1)) {
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Reminder date  Updated Successfully', 3000);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Reminder date Updated Failed', 3000);
                    }
                });
            };

            model.RelationshipChange = function(RelationshipID) {
                SelectBindServiceApp.getRelationName(3, model.txtprofileidreminder, RelationshipID).then(function(response) {
                    if (_.isArray(response.data[0]) && response.data[0].length > 0) {
                        model.contactpersonname = response.data[0][0].NAME;
                    }
                });
            };


            // xtra in out code--------------------------


            model.MAobj = {};
            model.empid = empid;
            model.ticketid = '';
            model.marReplyArr = [];
            model.marInfo = [];
            model.marHistry = [];
            // model.ProfileID = '';


            model.RelationshipChangebind = function(row, RelationshipID, type) {
                SelectBindServiceApp.getRelationName(3, row.ProfileID, RelationshipID).then(function(response) {
                    if (_.isArray(response.data[0]) && response.data[0].length > 0) {
                        if (type === 'In') {
                            row.txtmrktRelationnameIn = response.data[0][0].NAME;
                        } else {
                            row.txtmrktRelationnameout = response.data[0][0].NAME;
                        }
                    } else {
                        if (type === 'In') {
                            row.txtmrktRelationnameIn = '';
                        } else {
                            row.txtmrktRelationnameout = '';
                        }
                    }
                });
            };


            model.marketReplytype = function() {
                SelectBindServiceApp.marketReplytype().then(function(response) {
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

            model.pushTicketHistry = function(TicketType, CallStatus, CallReceivedBy, ReplyDesc, NoOfDays, RelationShip) {

                var relation;
                if (RelationShip) {
                    relation = (_.where(arrayConstants.childStayingWith, { value: parseInt(RelationShip) }))[0].label;
                }
                var Appendobj = {
                    TicketType: TicketType,
                    ReplyDate: curdate,
                    ReplyDatenew: moment(curdate).format('YYYY-MM-DD hh:mm:ss'),
                    NAME: model.loginempName,
                    CallStatus: CallStatus,
                    CallReceivedBy: CallReceivedBy,
                    ReplyDesc: ReplyDesc,
                    NoOfDays: NoOfDays,
                    RelationShip: relation
                };
                return Appendobj;
            };


            model.inOutSubmit = function(obj) {

                //22-Apr-2017 18:32:39'
                var inputObj = {
                    CallType: obj.CallType,
                    Calledon: curdate,
                    RelationID: obj.RelationID,
                    RelationName: obj.RelationName,
                    CallResult: obj.CallResult,
                    StaffCalled: empid,
                    PhoneNum: obj.PhoneNum,
                    CallDiscussion: obj.CallDiscussion,
                    DisplayStatus: obj.DisplayStatus,
                    ticketid: obj.Emp_Ticket_ID,
                    EmpID: empid
                };

                marketsvc.InOutSubmit(inputObj).then(function(response) {
                    var msg = parseInt(response.data) === 1 ? (obj.CallType === 1 ? 'Incoming Call Created successfully' : 'Outgoing Call Created successfully') :
                        ((obj.CallType === 1 ? 'Incoming Call updation failed' : 'Outgoing Call updation failed'));
                    var msgClass = parseInt(response.data) === 1 ? 'alert-success' : 'alert-danger';
                    alertss.timeoutoldalerts(model.scope, msgClass, msg, 9500);
                });

            };

            model.incallSubmit = function(obj, type) {
                var inobj = {
                    CallType: 1,
                    RelationID: obj.ddlmrktreceivedIn,
                    RelationName: obj.txtmrktRelationnameIn,
                    CallResult: obj.ddlmrktCallresultIn,
                    PhoneNum: obj.txtmrktCalltelephonenumberIn,
                    CallDiscussion: obj.txtmrktCalldiscussionin,
                    DisplayStatus: obj.rbtnmarketDisplayIn,
                    Emp_Ticket_ID: obj.Emp_Ticket_ID
                };
                model.inOutSubmit(inobj);
                if (type === 'assign') {
                    model.assignSubmit(obj.Emp_Ticket_ID);
                }
                obj.histryObj.splice(0, 0, model.pushTicketHistry('INCOMING',
                    obj.ddlmrktCallresultIn === '417' ? 'Successfull' : (obj.ddlmrktCallresultIn === '418' ? 'UnSuccessfull' : ''),
                    obj.txtmrktRelationnameIn, obj.txtmrktCalldiscussionin, '', obj.ddlmrktreceivedIn
                ));
            };

            model.outcallSubmit = function(obj, type) {
                var inobj = {
                    CallType: 2,
                    RelationID: obj.ddlmrktreceivedout,
                    RelationName: obj.txtmrktRelationnameout,
                    CallResult: obj.ddlmrktcallresultout,
                    PhoneNum: obj.txtmrktCalltelephonenumberout,
                    CallDiscussion: obj.txtmrktCalldiscussionout,
                    DisplayStatus: obj.rbtndisplayOut,
                    Emp_Ticket_ID: obj.Emp_Ticket_ID
                };
                model.inOutSubmit(inobj);
                if (type === 'assign') {
                    model.assignSubmit(obj.Emp_Ticket_ID);
                }
                obj.histryObj.splice(0, 0, model.pushTicketHistry('OUT GOING',
                    obj.ddlmrktcallresultout === '417' ? 'Successfull' : (obj.ddlmrktcallresultout === '418' ? 'UnSuccessfull' : ''),
                    obj.txtmrktRelationnameout, obj.txtmrktCalldiscussionout, '', obj.ddlmrktreceivedout
                ));
            };

            model.memoSubmit = function(obj, type) {

                marketsvc.memoSubmit(obj.txtmrktcalldiscussionMemo, obj.Emp_Ticket_ID, empid, obj.ddlmrktAssignmemo).then(function(response) {

                    if (parseInt(response.data) === 1) {
                        if (type === 'assign') {
                            model.assignSubmit(obj.Emp_Ticket_ID);
                        }

                        obj.histryObj.splice(0, 0, model.pushTicketHistry('InternalMemo',
                            '', '', obj.txtmrktcalldiscussionMemo, ''
                        ));

                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Memo Created successfully', 9500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Memo updation failed', 9500);
                    }
                });
            };

            model.closeSubmit = function(obj) {
                //reasn, tktID, empid
                marketsvc.closeSubmit(obj.txtmrktcloseReasn, obj.Emp_Ticket_ID, empid).then(function(response) {

                    if (parseInt(response.data) === 1) {
                        obj.histryObj.splice(0, 0, model.pushTicketHistry('Close',
                            '', '', obj.txtmrktcloseReasn, ''
                        ));
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Ticket closed successfully', 9500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Ticket closing failed', 9500);
                    }
                });
            };

            model.assignSubmit = function(Emp_Ticket_ID) {
                marketsvc.assignEmpSubmit(Emp_Ticket_ID, model.empid, model.empid).then(function(respnse) {});
            };
            model.close = function() {


            };

            return model.init();
        }
    }
    angular
        .module('Kaakateeya')
        .factory('marketingModel', factory)
    factory.$inject = ['marketingservice', 'complex-slide-config',
        'authSvc', 'helperservice', 'commonFactory', '$uibModal', 'alert',
        'modelpopupopenmethod', 'SelectBindServiceApp', '$timeout', '$filter', 'arrayConstants', 'marketingTicketHistryservice'
    ];

})(angular);