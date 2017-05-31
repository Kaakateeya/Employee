(function() {
    'use strict';

    function factory(marketingservice, config, authSvc, helperservice, commonFactory, uibModal, alertss, modelpopupopenmethod,
        SelectBindServiceApp, timeout, marketticketHistrymdl) {
        var model = {};
        model = marketticketHistrymdl;
        model.scope = {};

        model = config;
        model.headervisileble = true;
        model.templateUrl = "templates/marketingSlide.html";
        model.headettemp = "templates/marketingSlideHeader.html";
        model.EmpNamesArr = [];
        model.ReplyArr = [];
        model.topage = 1;
        var curdate = moment().format('Do MMMM YYYY, h:mm:ss');

        var empid, AdminID, TicketId, custId, isSibbling;

        model.init = function() {
            empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
            model.loginempName = authSvc.LoginEmpName() !== undefined && authSvc.LoginEmpName() !== null && authSvc.LoginEmpName() !== "" ? authSvc.LoginEmpName() : "";
            AdminID = model.Admin = authSvc.isAdmin();
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

            return model;
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
            return val = val ? val.join(',') : null;
        };

        model.MarketingSlideShowBind = function(from, to) {
            model.topage = to;
            var inputobj = {
                strBranch: model.splitArray(model.Branchs),
                strEmpName: model.splitArray(model.ProfileOwner) === null ? empid : model.splitArray(model.ProfileOwner),
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

        model.PhotoRequest = function(profileID, ticketID) {
            helperservice.PhotoRequest(profileID, empid, ticketID).then(function(response) {
                console.log(response);
                if (response.data && parseInt(response.data) === 1) {
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

        model.close = function() {
            modelpopupopenmethod.closepopup();
        };
        model.smsMailSubmit = function(type) {
            if (type === 'sms') {
                model.smsInput.strbody = model.txtsmsmail;
                marketingservice.sendSms(model.smsInput).then(function(response) {
                    if (parseInt(response.data) === 1) {
                        model.closepopup();
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'sms sent successfully', 9500);
                    }
                });
            } else {
                model.mailInput.Notes = model.txtsmsmail;
                marketingservice.sendMail(model.mailInput).then(function(response) {
                    if (parseInt(response.data) === 1) {
                        model.closepopup();
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

        model.forgetpassword = function(ProfileID) {
            SelectBindServiceApp.forgotpasswordemail(ProfileID).then(function(response) {
                if (response.data === 1) {
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
                modelpopupopenmethod.closepopup();
            }
        };


        model.updateREGFee = function(row, txtval) {
            if (row.editval === 'Edit') {
                row.editval = 'update Fee'
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
                row.editSAval = 'update Fee'
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

        return model.init();
    }

    angular
        .module('Kaakateeya')
        .factory('marketingModel', factory)
    factory.$inject = ['marketingservice', 'complex-slide-config',
        'authSvc', 'helperservice', 'commonFactory', '$uibModal', 'alert',
        'modelpopupopenmethod', 'SelectBindServiceApp', '$timeout', 'marketticketHistrymdl'
    ];

})(angular);