(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('mailViewFullProfileModel', factory)

    factory.$inject = ['mailViewFullProfileservice', 'alert',
        'authSvc', '$injector', '$uibModal', '$timeout', '$mdDialog', '$stateParams',
        '$location', '$window', '$state'
    ];

    function factory(mailViewFullProfileservice, alerts, authSvc, $injector, uibModal, timeout,
        $mdDialog, $stateParams, $location, $window, $state) {
        var model = {};
        model.scope = {};
        model.headerpopup = "Slide show";
        model.popupmodalbody = false;
        model.PageDiv = true;
        model.searchObjectquery = $location.search();
        var meKey = Object.getOwnPropertyNames(model.searchObjectquery)[0];
        var meValue = model.searchObjectquery[meKey];
        model.MyProfileQSAccept = "?" + (meKey).toString() + "=" + (meValue).toString();
        model.partnerinformation = function(response) {
            model.arr = [];
            model.personalinfo = {};
            model.aboutmyself = {};
            _.each(response, function(item) {
                var testArr = JSON.parse(item);
                if (testArr.length > 0 && testArr[0].TableName !== undefined && testArr[0].TableName === "About") {
                    model.aboutmyself = testArr;
                } else if (testArr.length > 0 && testArr[0].TableName !== undefined && testArr[0].TableName === "Primary") {
                    model.personalinfo = testArr;
                    var photocount = model.personalinfo[0].PhotoName_Cust;
                    model.horoscopeimage = model.personalinfo[0].HoroscopeImage === "" ||
                        model.personalinfo[0].HoroscopeImage === null ||
                        model.personalinfo[0].HoroscopeImage === "Not given" ? false : true;
                    model.horoimagesrc = (model.personalinfo[0].HoroscopeImage).indexOf(".html") !== -1 ? 'src/images/view_horoscope_image.jpg' : model.personalinfo[0].HoroscopeImage;
                } else {
                    if (testArr.length > 0 && testArr[0].TableName !== undefined) {
                        model.arr.push({ header: testArr[0].TableName, value: testArr });
                    }
                }
            });
        };
        model.bookmarkexpreessdata = function() {
            mailViewFullProfileservice.getExpressinterst_bookmark_ignore_data(model.fromcustid, model.tocustid).then(function(responsebook) {
                _.each(responsebook.data, function(item) {
                    var testArr = JSON.parse(item);
                    if (testArr[0] !== undefined) {
                        switch (testArr[0].TableName) {
                            case "Bookmark":
                                model.Bookmark = testArr;
                                break;
                            case "Viewed":
                                model.Viewed = testArr;
                                break;
                            case "Express":
                                model.Express = testArr;
                                if (testArr[0].SeenStatus === "Accept" && model.hdnAccRejFlag !== "MailReject") {
                                    if (model.flagopen !== 1) {
                                        model.modalbodyID1 = "You have proceeded this profile";
                                        alerts.dynamicpopup("TabClosePopup.html", model.scope, uibModal);
                                    }
                                } else if (testArr[0].SeenStatus === "Reject" && model.hdnAccRejFlag !== "MailAccept") {
                                    if (model.flagopen !== 1) {
                                        model.modalbodyID1 = "You have Skipped this profile";
                                        alerts.dynamicpopup("TabClosePopup.html", model.scope, uibModal);
                                    }
                                }
                                if (testArr[0].MatchFollowUpStatus === 1) {
                                    if (testArr[0].SeenStatus === "Accept" || testArr[0].SeenStatus === "Reject") {
                                        model.divacceptreject = true;
                                        model.btnticket = testArr[0].ViewTicket;
                                        model.liproceed = false;
                                        model.liticket = true;
                                    } else {
                                        model.divacceptreject = true;
                                        model.liproceed = true;
                                    }
                                } else if (testArr[0].Acceptflag === 1) {
                                    model.divacceptreject = true;
                                    model.liproceed = true;
                                } else if (testArr[0].ExpressFlag === 1) {
                                    model.divacceptreject = true;
                                    model.liaccept = true;
                                } else {
                                    model.divacceptreject = false;
                                    model.liaccept = false;
                                }
                                if (testArr[0].ExpressInterstId !== null) {
                                    model.hdnexpressinterstfiled = testArr[0].ExpressInterstId;
                                }
                                break;
                            case "Paidstatus":
                                model.lblpaid = testArr[0].Paidstatus;
                                break;
                            case "Ignore":
                                model.Ignore = testArr;
                                break;
                        }
                    }
                });

            });
        };
        model.pagerefersh = function(ToProfileID) {
            mailViewFullProfileservice.getExpressIntrstfullprofile(ToProfileID, "").then(function(responsedata) {
                model.partnerinformation(responsedata.data);
            });
            model.bookmarkexpreessdata();
            mailViewFullProfileservice.getphotoslideimages(model.tocustid).then(function(response) {
                model.slides = [];
                _.each(response.data, function(item) {
                    model.slides.push(item);
                });
            });
        };
        model.Searchfunctionality = function(type, object) {
            switch (type) {
                case "DontProceed":
                    mailViewFullProfileservice.UpdateExpressIntrestViewfullprofile(object).then(function(response) {
                        if (response.data == 1) {
                            model.divmodalbodytoClose = "This profile was Skipped successfully";
                            alerts.dynamicpopup("PopupDivToclose.html", model.scope, uibModal);
                        } else if (response.data == 2 || response.data == 3) {
                            model.divmodalbodytoClose = "Please upgrade your membership";
                            alerts.dynamicpopup("PopupDivToclose.html", model.scope, uibModal);
                        }
                    });
                    break;
            }
        };
        model.Reject_paeload = function() {
            model.pagerefersh(model.ToProfileID);
            model.PageDiv = false;
            var MobjViewprofile = {
                ExpressInrestID: model.hdnexpressinterstfiled,
                CustID: model.fromcustid,
                AcceptStatus: 2,
                MatchFollwupStatus: 2
            };
            model.Searchfunctionality("DontProceed", MobjViewprofile);
        };
        model.statusalert = function(status) {
            switch (status) {
                case 0:
                case 3:
                    model.divmodalbodytoClose = "Unfortunately,we are not able to get data,sorry for the inconvenience";
                    alerts.dynamicpopup("PopupDivToclose.html", model.scope, uibModal, 'sm');
                    break;
                case 4:
                    model.divmodalbodytoClose = "Please upgrade your membership";
                    alerts.dynamicpopup("PopupDivToclose.html", model.scope, uibModal, 'sm');
                    break;
                case 5:
                    model.divmodalbodytoClose = "Please upgrade your membership(No points)";
                    alerts.dynamicpopup("PopupDivToclose.html", model.scope, uibModal, 'sm');

                    break;
                case 6:
                    model.divmodalbodytoClose = "You have already Skipped this profile";
                    alerts.dynamicpopup("PopupDivToclose.html", model.scope, uibModal);
                    break;
                case 7:
                    model.modalbodyID1 = "You cannot Skip Accepted Profile";
                    alerts.dynamicpopup("TabClosePopup.html", model.scope, uibModal);
                    model.pagerefersh(model.ToProfileID);
                    model.flagopen = 1;
                    break;
                case 8:
                    model.Reject_paeload();
                    break;
                case 9:
                    model.pagerefersh(model.ToProfileID);
                    break;
                case 10:
                    model.modalbodydivContent = "You already " + " " + model.AccRejFlag + " " + "this Profile ,do you want to continue with these action " + " accept";
                    alerts.dynamicpopup("PageloadAcceptRejectpopup.html", model.scope, uibModal);
                    model.pagerefersh(model.ToProfileID);
                    model.flagopen = 1;
                    break;
                case 11:
                    model.divmodalbodytoClose = "This ProfileID not in active";
                    alerts.dynamicpopup("PopupDivToclose.html", model.scope, uibModal, 'sm');
                    break;
                case 12:
                    model.divmodalbodytoClose = "This ProfileID not in active";
                    alerts.dynamicpopup("PopupDivToclose.html", model.scope, uibModal, 'sm');
                    break;
                case 13:
                    model.PopupDivToclosedialog = true;
                    model.divmodalbodytoClose = "Please verify your primary email id (" + model.PrimaryEmail + ") Inorder to view the complete profile sent ...check for verification email sent to your mail box";
                    alerts.dynamicpopup("PopupDivToclose.html", model.scope, uibModal, 'sm');
                    break;
                case 14:
                    model.divmodalbodytoClose = "Unfortunately,we are not able to get data,sorry for the inconvenience";
                    alerts.dynamicpopup("PopupDivToclose.html", model.scope, uibModal, 'sm');
                    break;
                case 15:
                    model.modalbodyID1 = "Unfortunately,we are not able to get data,sorry for the inconvenience";
                    alerts.dynamicpopup("TabClosePopup.html", model.scope, uibModal);
                    break;
            }
        };

        model.pageload = function() {
            mailViewFullProfileservice.getViewFullProfileMail(model.MyProfileQSAccept).then(function(response) {
                model.fromcustid = response.data.FromCustID;
                model.tocustid = response.data.ToCustID;
                model.ToProfileID = response.data.ToProfileID;
                model.FromProfileID = response.data.FromProfileID;
                model.PrimaryEmail = response.data.PrimaryEmail;
                model.AccRejFlag = response.data.AccRejFlag;
                model.statusalert(response.data.status);
            });
        };
        model.acceptlinkexp = function(type, custid) {
            var locallogid = sessionStorage.getItem("locallogid");
            mailViewFullProfileservice.acceptrejectexpressinterest(model.custid, custid, locallogid, type, null).then(function(response) {

                if (response.data === 1) {
                    model.$broadcast("showAlertPopupccc", 'alert-success', "Proceed successfully", 2500);
                } else {
                    model.$broadcast("showAlertPopupccc", 'alert-danger', "sorry Proceed Fail", 2500);
                }
                alerts.dynamicpopupclose();
            });
        };

        model.photoalbum = function() {
            model.headerpopup = "Slide show";
            model.popupmodalbody = false;
            alerts.dynamicpopup("photopopup.html", model.scope, uibModal);
        };
        model.modalpopupclose1 = function() {
            alerts.dynamicpopupclose();
        };
        model.modalpopupclose = function() {
            alerts.dynamicpopupclose();
        };
        model.modalpopupclosetab = function() {
            window.close();
        };
        model.viewhoroscopeimage = function() {
            model.headerpopup = "Horoscope";
            model.popupmodalbody = true;
            if ((model.personalinfo[0].HoroscopeImage).indexOf(".html") !== -1) {
                model.personalinfo[0].HoroscopeImage = "http://d16o2fcjgzj2wp.cloudfront.net/Images/HoroscopeImages/" + model.tocustid + "_HaroscopeImage/" + model.tocustid + "_HaroscopeImage.html";
                window.open(model.personalinfo[0].HoroscopeImage, '_blank');
            } else {
                alerts.dynamicpopup("photopopup.html", model.scope, uibModal);
            }
        };
        model.btnoksubmit = function() {
            switch (model.AccRejFlag) {
                case "MailAccept":
                    model.Reject_paeload();
                    break;
                case "MailReject":
                    alerts.dynamicpopup("PageloadAcceptRejectpopup.html", model.scope, uibModal);
                    model.pagerefersh(model.ToProfileID);
                    model.liticket = false;
                    model.liproceed = true;
                    btnDontProceed.Visible = false;
                    btnProceed.Visible = true;
                    break;
            }
        };
        model.btnProceed_Click = function(typeofbtn) {
            switch (typeofbtn) {
                case "btnProceed":
                    var MobjViewprofile = {
                        ExpressInrestID: model.hdnexpressinterstfiled,
                        CustID: model.fromcustid,
                        FromCustID: model.fromcustid,
                        ToCustID: model.tocustid,
                        AcceptStatus: 1,
                        MatchFollwupStatus: 1
                    };
                    mailViewFullProfileservice.UpdateExpressIntrestViewfullprofile(MobjViewprofile).then(function(response) {
                        switch (response.data) {
                            case 1:
                                model.modalbodyID1 = "To Move the Match for MatchFollowup";
                                break;
                            case 2:
                            case 3:
                                model.modalbodyID1 = "You need to Upgrade online membership";
                                break;
                            default:
                                model.modalbodyID1 = "Updation failed please contact admin";
                                break;
                        }
                    });
                    break;
                case "btnDontProceed":
                    var MobjViewprofiledont = {
                        ExpressInrestID: model.hdnexpressinterstfiled,
                        CustID: model.fromcustid,
                        FromCustID: model.fromcustid,
                        ToCustID: model.tocustid,
                        AcceptStatus: 2,
                        MatchFollwupStatus: 2
                    };
                    mailViewFullProfileservice.UpdateExpressIntrestViewfullprofile(MobjViewprofiledont).then(function(response) {
                        switch (response.data) {
                            case 1:
                                model.modalbodyID1 = "Oops go through your search";
                                break;
                            case 2:
                            case 3:
                                model.modalbodyID1 = "You need to Upgrade online membership";
                                break;
                            default:
                                model.modalbodyID1 = "Updation failed please contact admin";
                                break;
                        }
                    });
                    break;
            }
            model.divacceptreject = true;
            alerts.dynamicpopup("TabClosePopup.html", model.scope, uibModal);
            model.pagerefersh(model.ToProfileID);
        };
        model.acceptreject = function(typeofaction) {
            if (model.tocustid !== null && model.tocustid !== null) {
                var MobjViewprofile = {
                    FromCustID: model.fromcustid,
                    ToCustID: model.tocustid
                };
                switch (typeofaction) {
                    case "btnaccept":
                        authSvc.paymentstaus(model.fromcustid, scope).then(function(responsepaid) {
                            if (responsepaid === true) {
                                //ScriptManager.RegisterStartupScript(Page, Page.GetType(), "divAcceptReject", "$('#divAcceptReject').modal({ backdrop: 'static', keyboard: false});", true);
                            } else {
                                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Please Upgrade Your Membership in order To continue', 3000);
                            }
                        });
                        break;
                    case "btnreject":
                        if (model.lblpaid == "UnPaid") {
                            alerts.timeoutoldalerts(model.scope, 'alert-danger', 'upgrade');
                        } else {
                            var MobjViewprofilerej = {
                                ExpressInrestID: model.hdnexpressinterstfiled,
                                CustID: model.fromcustid,
                                AcceptStatus: 2,
                                MatchFollwupStatus: 2
                            };
                            model.Searchfunctionality("DontProceed", MobjViewprofilerej);
                            alerts.timeoutoldalerts(scope, 'alert-danger', 'Your action send sucessfully', 3000);
                        }
                        break;
                }
            } else {
                alerts.timeoutoldalerts(scope, 'alert-danger', 'ExpressInterest failed please contact Admin', 3000);
            }
            //ScriptManager.RegisterStartupScript(Page, Page.GetType(), "divAcceptReject", "$('#divAcceptReject').modal('hide');", true);
        };





        return model;
    }
})();