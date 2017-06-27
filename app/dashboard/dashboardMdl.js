(function(angular) {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('dashboardModel', ['$http', 'dashboardServices', '$uibModal', 'authSvc', 'helperservice', '$window',
            'modelpopupopenmethod', '$filter', 'fileUpload', 'alert', 'complex-slide-config', 'arrayConstants',
            function($http, dashboardServices, uibModal, authSvc, helperservice, window,
                commonpage, $filter, fileUpload, alerts, config, arrayConstants) {
                var model = {};
                model.config = config;
                var flag = 0;
                model.frompage = 6;
                model.topage = 10;
                model.tablenameflag = "";
                model.proceedprofileid = "";
                model.selectedIndex = 0;
                model.tabsshowhidecontrols = true;
                model.landingItems = [];
                model.Hoursarray = [];
                model.miniutearray = [];
                model.calltypearray = [];
                model.replaytypearray = [];
                model.categoryarray = [];
                model.templateUrl = "templates/dashBoardslide.html";
                model.headettemp = "dashboardheader.html";
                model.todaydate = new Date();
                model.exportData = function(id) {
                    var options = {
                        headers: true,
                        columns: [{
                                columnid: 'Sno',
                                title: 'Sno'
                            }, {
                                columnid: 'Profileid',
                                title: 'Profileid'
                            }, {
                                columnid: 'Name',
                                title: 'Name'
                            },
                            {
                                columnid: 'Date',
                                title: 'Date'
                            }
                        ]
                    };
                    alasql('SELECT Sno,Profileid,Name,Date INTO  XLSX("Reports.xlsx",?) FROM ?', [options, model.exportDataarray]);
                };
                model.dateOptions = {
                    changeMonth: true,
                    changeYear: true,
                    yearRange: "-40:+5",
                    dateFormat: 'dd-mm-yy'
                };
                model.tabledata = function(empid, branchcode, frompage, topage, tablename, type, array, slideflag) {
                    dashboardServices.getlandingdata(empid, branchcode, frompage, topage, tablename, slideflag).then(function(response) {
                        if (response !== undefined && response !== null && response !== "" && response.data !== undefined && response.data !== null && response.data !== "" && response.data.length > 0) {
                            if (type === 'pageload') {

                                model.landingItems = response.data;
                                if (frompage === 1) {
                                    model.norecordstable = model.landingItems.length === 0 ? true : false;
                                }
                            } else if (type === 'load') {
                                _.each(response.data[0], function(inneritem) {
                                    array.push(inneritem);
                                });
                            } else if (type === 'export') {
                                model.exportDataarray = [];
                                model.exportDataarray = response.data[0];
                                model.exportData('exportableproceeding');
                            } else {
                                if (frompage === 1) {
                                    model.slidearray = response.data[0];
                                } else {
                                    _.each(response.data, function(inneritem) {
                                        model.slidearray.push(inneritem);
                                    });
                                }
                            }
                        } else {
                            if (type === 'pageload') {
                                if (frompage === 1) {
                                    model.norecordstable = model.landingItems.length === 0 ? true : false;
                                }
                            }
                        }
                    });
                };
                model.loadmore = function(empid, branchcode, frompage, topage, tablename, type, array, slideflag) {
                    switch (type) {
                        case "export":
                            model.tabledata(empid, branchcode, frompage, topage, tablename, type, array, slideflag);
                            break;
                        case "load":
                            if (model.tablenameflag !== tablename) {
                                model.tablenameflag = tablename;
                                model.frompage = 6;
                                model.topage = 10;
                            } else {
                                model.frompage = topage + 1;
                                model.topage = topage + 5;
                            }
                            model.tabledata(empid, branchcode, model.frompage, model.topage, tablename, type, array, slideflag);
                            break;
                    }
                };

                model.slideshowfunction = function(flag, empid, branchcode, frompage, topage, tablename, type, array, slideflag) {
                    model.slideshowtrue = flag;
                    if (flag === true) {
                        model.tabledata(empid, branchcode, frompage, topage, tablename, type, array, slideflag);
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
                model.init = function() {
                    model.proceedprofileid = null;
                    model.entryid = null;
                    model.emailbounce = null;
                    model.uploadfromsubmit = false;
                    model.Custidbounce = null;
                    model.landingItems = [];
                    model.norecordstable = false;
                    model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                    model.empBranchID = authSvc.empBranchID() !== undefined && authSvc.empBranchID() !== null && authSvc.empBranchID() !== "" ? authSvc.empBranchID() : "";
                    if (model.empid !== null && model.empid !== "" && model.empBranchID !== null && model.empBranchID !== "") {
                        model.tabledata(model.empid, model.empBranchID, 1, 5, '', 'pageload', undefined, 0);
                    }
                    return model;
                };
                model.viewfullprofile = function(profileid) {
                    window.open("Viewfullprofile/" + profileid + "/0", "_blank");
                };
                model.closeupload = function() {
                    commonpage.closepopuppoptopopup();
                };
                model.upload = function(obj) {
                    var extension = (obj.myFile.name !== '' && obj.myFile.name !== undefined && obj.myFile.name !== null) ? (obj.myFile.name.split('.'))[1] : null;
                    extension = angular.lowercase(extension);
                    var gifFormat = "gif,jpeg,jpg";
                    if (typeof(obj.myFile.name) != "undefined") {
                        var size = obj.myFile.size;
                        if (extension !== null && gifFormat.indexOf(angular.lowercase(extension)) === -1) {
                            alert('Your uploaded image contains an unapproved file formats.');
                        } else if (size > 4194304) {
                            alert('Sorry,Upload Photo Size Must Be Less than 4 mb');
                        } else {
                            var keyname = app.prefixPath + model.proceedprofileid + '_settlementImages' + '/' + model.proceedprofileid + '_settlementImages.' + extension;
                            fileUpload.uploadFileToUrl(obj.myFile, '/settlementformupload', keyname).then(function(res) {
                                if (res.status == 200) {
                                    model.closeupload();
                                    var today = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm:ss a');
                                    var object = {
                                        CreatedByEmpID: model.empid,
                                        CreatedDate: today,
                                        ModifiedByEmpID: model.empid,
                                        ModifiedEmpDate: today,
                                        SettlementAgreedAmount: 0,
                                        Notes: "",
                                        isActive: 0,
                                        Settlementfrompath: '~/Images/SettlementImages/' + model.proceedprofileid + '_settlementImages/' + model.proceedprofileid + '_settlementImages.' + extension,
                                        isassigned: 0,
                                        ReferenceID: 0,
                                        Profileidnew: model.proceedprofileid
                                    };
                                    dashboardServices.uploadsettlementform(object).then(function(response) {
                                        if (response !== undefined && response.data === 1) {
                                            alerts.timeoutoldalerts(model.scope, 'alert-success', 'SA Form Uploaded successfully', 2000);
                                        } else {
                                            alerts.timeoutoldalerts(model.scope, 'alert-danger', 'SA Form Uploaded Failed', 2000);
                                        }
                                    });
                                }
                            });
                        }
                    } else {
                        alert("This browser does not support HTML5.");
                    }
                };
                model.notificationread = function(notificationid, index, parentid, custid, CategoryID) {
                    var obj = {
                        EmpID: model.empid,
                        idisplay: 2,
                        NotificationID: notificationid,
                        CategoryID: CategoryID,
                        CustID: custid
                    };
                    dashboardServices.readNotifications(obj).then(function(response) {
                        if (response.data !== undefined) {
                            alerts.timeoutoldalerts(model.scope, 'alert-success', 'Notification Readed successfully', 2000);
                        } else {
                            alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Notification Read Failed', 2000);
                        }
                    });
                };

                model.bouncedemail = function(obj) {
                    var object = {
                        CustID: model.Custidbounce,
                        EmailBounceEntryId: model.entryid,
                        BounceMailid: obj.newemail
                    };
                    dashboardServices.getUpdateEmailBounce(object).then(function(response) {
                        if (response !== undefined && response.data === 1) {
                            alerts.timeoutoldalerts(model.scope, 'alert-success', 'Email Updated successfully', 2000);
                        } else {
                            alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Email Updated Failed', 2000);
                        }
                    });
                };
                model.tickethistorypopup = function(TicketID) {
                    model.marketingTicketid = TicketID;
                    commonpage.showPopupphotopoup('market.html', model.scope, 'md', "modalclassdashboardphotopopup");
                };
                model.nodataarray = function(nodatastr, custid) {
                    var array = [];
                    var arraylist = [];
                    if (nodatastr !== undefined && nodatastr !== "" && nodatastr !== null) {

                        array = nodatastr.split(",");
                    }
                    _.each(array, function(item) {
                        switch (item.trim()) {
                            case "CustomerPersonal":
                                arraylist.push({ linkname: item, href: "Education/" + custid });
                                break;
                            case "NoParent":
                                arraylist.push({ linkname: item, href: "Parent/" + custid });
                                break;
                            case "Sibling":
                                arraylist.push({ linkname: item, href: "Sibbling/" + custid });
                                break;
                            case "Astro":
                                arraylist.push({ linkname: item, href: "Astro/" + custid });
                                break;
                            case "Property":
                                arraylist.push({ linkname: item, href: "Property/" + custid });
                                break;
                        }
                    });
                    return arraylist;
                };

                model.displayArrayprofile = function(arr, topage) {
                    model.headervisileble = true;
                    var array = [];
                    _.each(arr, function(item) {
                        var data = [];
                        data.push({
                            label: 'ProfileID',
                            value: '',
                            ProfileID: item.ProfileID,
                            KMPLID: item.KMPLID,
                            paid: item.paid,
                            IsConfidential: item.IsConfidential,
                            SuperConfidentila: item.SuperConfidentila,
                            HoroscopeStatus: item.HoroscopeStatus,
                            HoroscopeImage: item.HoroscopeImage
                        });
                        data.push({ label: 'Name', value: item.LastName + ' ' + item.FirstName, style: item.NoOfBrothers == "0" && item.NoOfSisters == "0" ? "style= color:DarkViolet;" : "style= color:Black;" });
                        data.push({ label: 'Caste', value: item.MotherTongue + "-" + item.Caste });
                        data.push({ label: 'Dor', value: item.DOR });
                        data.push({ label: 'Profile Grade', value: item.ProfileGrade == "1" ? "A" : (item.ProfileGrade == "2" ? "B" : (item.ProfileGrade == "3" ? "C" : "--")) });
                        array.push({
                            itmArr: data,
                            custPhoto: item.ApplicationPhotoPath,
                            Custid: item.Cust_ID,
                            lastlogin: item.LastLoginDate,
                            logincount: item.LoginCount,
                            matkteingticket: item.TicketID,
                            matchmarktingcount: item.MatchMeetingCount,
                            ownername: item.EmpName,
                            branch: item.KMPLID,
                            reg: item.DOR,
                            SAForm: item.SAForm,
                            primarynumber: item.ContactNumber,
                            primaryemail: item.Email,
                            CreatedDate: item.CreatedDate,
                            SRCount: item.SRCount,
                            PaidAmount: item.PaidAmount,
                            ExpiryDate: item.ExpiryDate,
                            Points: item.Points,
                            mobilestatus: item.CNumberVerStatus,
                            emailstatus: item.CEmailVerStatus,
                            UserName: item.UserName,
                            Reason4InActive: item.Reason4InActive,
                            ProfileID: item.ProfileID,
                            CountryCodeID: item.CountryCodeID,
                            Cust_Family_ID: item.Cust_Family_ID,
                            PhotoCount: item.PhotoCount,
                            Age: item.Age,
                            HeightInCentimeters: item.HeightInCentimeters,
                            MaritalStatusID: item.MaritalStatusID,
                            CasteID: item.CasteID,
                            serviceDate: item.serviceDate,
                            bouncedEmailID: item.EmailID,
                            bouncedemailentryid: item.Cust_EmailBounceEntryId,
                            Cust_NotificationID: item.Cust_NotificationID,
                            CategoryID: item.CategoryID,
                            ActionType: item.ActionType,
                            ReadStatus: item.ReadStatus,
                            Tickets: item.Tickets,
                            TicketID: item.Emp_Ticket_Id || item.Emp_Ticket_ID,
                            NoDataFound: model.nodataarray(item.NoDataFound, item.Cust_ID),
                            LastModifiedDate: item.LastModifiedDate,
                            To_Profile_ID: item.To_Profile_ID,
                            TicketOwner: item.TicketOwner,
                            Ticketuserid: item.Ticketuserid,
                            CountryCode: item.CountryCode,
                            PrimaryContact: item.PrimaryContact,
                            PriWithoutCode: item.PriWithoutCode,
                            EmpReminderID: item.EmpReminderID,
                            // ReminderCreatedDate: item.ReminderCreatedDate,
                            //ReminderCreatedDatepopup: $filter('date')(item.ReminderCreatedDate, 'dd-MM-yyyy')
                            ReminderCreatedDate: model.todaydate,
                            ReminderCreatedDatepopup: $filter('date')(model.todaydate, 'dd-MM-yyyy')
                        });
                    });
                    return array;
                };

                model.slideshowfunction = function(flag, empid, branchcode, frompage, topage, tablename, type, array, slideflag) {
                    model.topage = topage;
                    dashboardServices.getlandingdata(empid, branchcode, frompage, topage, tablename, slideflag).then(function(response) {
                        if (response !== undefined && response !== null && response !== "" && response.data !== undefined && response.data !== null && response.data !== "" && response.data.length > 0 && response.data[0].length > 0) {
                            model.slidearray = response.data[0];
                            model.totalRecords = model.slidearray[0].TotalRows;
                            model.headerhtml = tablename;
                            switch (tablename) {
                                case "No-Service From Last 1 Month":
                                    model.typeofslidedate = "Service Date";
                                    break;
                                case "Near by offline Expiry":
                                case "Offline Expired Customers":
                                case "Un-Paid Customers":
                                    model.typeofslidedate = "Expired Date";
                                    break;
                                case "Inactive Customers":
                                    model.typeofslidedate = "Inactive Date";
                                    break;
                                case "Today Remainders":
                                    model.typeofslidedate = "Reminder Date";
                                    break;
                                case "Yesterday Proceeding Profiles":
                                    model.typeofslidedate = "proceeding Date";
                                    break;
                                case "Tickets Assigned from Last 10 Days":
                                case 'Assigned Profiles from Last 10 Days':
                                    model.typeofslidedate = "Assigned Date";
                                    break;
                                case "Email Bounce Info":
                                    model.typeofslidedate = "Bounced On";
                                    break;
                                case "SA Form status for Paid Users":
                                    model.typeofslidedate = "Upload Date";
                                    break;
                                case "Present In India":
                                    model.typeofslidedate = "ArrivalDate at";
                                    break;
                                case "Marketing Ticket Expiry With in Two days":
                                    model.typeofslidedate = "Ticket Last Updated";
                                    break;
                                case "Customer Notification Status":
                                    model.typeofslidedate = "Notification Date";
                                    break;
                                case "NoData Service Profiles":
                                    model.typeofslidedate = "Registered Date";
                                    break;
                            }
                            if (topage === parseInt(10)) {
                                commonpage.showPopup('dashboardslide.html', model.scope, 'lg', "modalclassdashboard");
                                config.setSlides(model.displayArrayprofile(model.slidearray, 10), 10, 'normal');
                            } else {
                                config.addSlides(model.displayArrayprofile(model.slidearray, 11), model.slidearray, 11, 'normal');
                            }
                        }
                    });
                };
                config.slidebind = function(old, news, array) {
                    if (parseInt(model.topage) - parseInt(news) === 4) {
                        model.slideshowfunction(true, model.empid, model.empBranchID, (model.topage) + 1, (model.topage) + 10, model.headerhtml, 'slideshow', model.slidearray, 1);
                    }
                };
                model.closesashboard = function() {
                    commonpage.closepopup();
                };
                model.close = function() {
                    commonpage.closepopuppoptopopup();
                };

                model.changeProfileidstatus = function(profielid) {
                    dashboardServices.changeProfileidstatus(profielid).then(function(response) {
                        if (response !== undefined && response.data === parseInt(1)) {
                            alerts.timeoutoldalerts(model.scope, 'alert-success', 'Profile Status Updated Successfully', 2000);
                        } else {
                            alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Profile Status Updated Failed', 2000);
                        }
                    });
                };
                model.changereminder = function(slidearray) {
                    model.reminderslidearray = {};
                    model.reminderslidearray = slidearray;
                    model.txtprofileidreminder = slidearray.ProfileID;
                    model.reminderticketid = slidearray.matkteingticket;
                    model.txtreminderDate = $filter('date')(slidearray.ReminderCreatedDate, "dd-MM-yyyy");
                    model.ddlHrs = "";
                    model.ddlmins = "";
                    model.ddlcontactperson = "";
                    model.ddlremCatgory = 0;
                    model.ddlremCaltype = "";
                    commonpage.showPopupphotopoup('Reminderticket.html', model.scope, 'md', "modalclassdashboardremainder");
                    model.Hoursarray = model.getnumberbind(0, 23, 'Hrs', 1);
                    model.miniutearray = model.getnumberbind(0, 59, 'Mins', 1);
                    model.calltypearray = model.replytype('calltype');
                    model.replaytypearray = arrayConstants.childStayingWith;
                    model.categoryarray = arrayConstants.catgory;
                };
                model.reminderSubmit = function(obj) {
                    var Mobj = {
                        ProfileID: obj.txtprofileidreminder,
                        ReminderID: model.reminderslidearray.EmpReminderID,
                        EmpID: model.empid,
                        TicketID: model.reminderslidearray.TicketID,
                        DateOfReminder: $filter('date')(obj.txtreminderDate, 'yyyy-MM-dd'),
                        ReminderType1: obj.ddlremCaltype,
                        Body: obj.remembertickets,
                        RelationID: obj.ddlcontactperson,
                        Name: obj.contactpersonname,
                        Category: obj.ddlremCatgory,
                        IsFollowup: 0
                    };
                    commonpage.closepopuppoptopopup();
                    dashboardServices.upadateremainderdate(Mobj).then(function(response) {
                        if (response !== undefined && response.data === parseInt(1)) {
                            alerts.timeoutoldalerts(model.scope, 'alert-success', 'Reminder date  Updated Successfully', 3000);
                        } else {
                            alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Reminder date Updated Failed', 3000);
                        }
                    });
                };
                model.destroy = function() {
                    config.reset();
                };
                return model.init();
            }
        ]);
})(angular);