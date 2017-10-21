(function(angular) {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('dashboardModel', ['$http', 'dashboardServices', '$uibModal', 'authSvc', 'helperservice', '$window',
            'modelpopupopenmethod', '$filter', 'fileUpload', 'alert', 'complex-slide-config', 'arrayConstants', 'SelectBindServiceApp',
            function($http, dashboardServices, uibModal, authSvc, helperservice, window,
                commonpage, $filter, fileUpload, alerts, config, arrayConstants, SelectBindServiceApp) {
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
                model.templateUrl = "templates/dashBoardslidenew.html";
                // model.templateUrl = "templates/dashBoardslide.html";
                model.config.headettemp = "dashboardheader.html";
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

                                // array = array.concat(response.data[0]);
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
                    //model.empid = 8;
                    model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                    model.empBranchID = authSvc.empBranchID() !== undefined && authSvc.empBranchID() !== null && authSvc.empBranchID() !== "" ? authSvc.empBranchID() : "";
                    model.loadDashboard = authSvc.loadDashboard() !== undefined && authSvc.loadDashboard() !== null && authSvc.loadDashboard() !== "" ? authSvc.loadDashboard() : "";
                    debugger;
                    if (model.empid !== null && model.empid !== "" && model.empBranchID !== null && model.empBranchID !== "") {
                        debugger;
                        if (parseInt(model.loadDashboard) === 1) {
                            model.tabledata(model.empid, model.empBranchID, 1, 5, '', 'pageload', undefined, 0);
                        } else {
                            model.norecordstable = true;
                            model.landingItems = [];
                        }
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
                // model.displayArrayprofile = function(arr, topage) {
                //     model.headervisileble = true;
                //     var array = [];
                //     _.each(arr, function(item) {
                //         var data = [];
                //         data.push({
                //             label: 'ProfileID',
                //             value: '',
                //             ProfileID: item.ProfileID,
                //             KMPLID: item.KMPLID,
                //             paid: item.paid === true || item.paid === 1 ? 1 : 0,
                //             IsConfidential: item.IsConfidential,
                //             SuperConfidentila: item.SuperConfidentila,
                //             HoroscopeStatus: item.HoroscopeStatus,
                //             HoroscopeImage: item.HoroscopeImage
                //         });
                //         data.push({ label: 'Name', value: item.LastName + ' ' + item.FirstName });
                //         // data.push({ label: 'DOB-Height', value: item.DOB + ' -- ' + item.Height, });
                //         data.push({ label: 'Caste', value: item.MotherTongue + "-" + item.Caste });
                //         data.push({ label: 'Dor', value: item.DOR });
                //         data.push({ label: 'Profile Grade', value: item.ProfileGrade == "1" ? "A" : (item.ProfileGrade == "2" ? "B" : (item.ProfileGrade == "3" ? "C" : "--")) });
                //         array.push({
                //             itmArr: data,
                //             custPhoto: item.ApplicationPhotoPath,
                //             Custid: item.Cust_ID,
                //             lastlogin: item.LastLoginDate,
                //             logincount: item.LoginCount,
                //             matkteingticket: item.TicketID,
                //             matchmarktingcount: item.MatchMeetingCount,
                //             ownername: item.EmpName,
                //             branch: item.KMPLID,
                //             reg: item.DOR,
                //             SAForm: item.SAForm,
                //             primarynumber: item.ContactNumber,
                //             primaryemail: item.Email,
                //             CreatedDate: item.CreatedDate,
                //             SRCount: item.SRCount,
                //             PaidAmount: item.PaidAmount,
                //             ExpiryDate: item.ExpiryDate,
                //             Points: item.Points,
                //             mobilestatus: item.CNumberVerStatus,
                //             emailstatus: item.CEmailVerStatus,
                //             UserName: item.UserName,
                //             Reason4InActive: item.Reason4InActive,
                //             ProfileID: item.ProfileID,
                //             CountryCodeID: item.CountryCodeID,
                //             Cust_Family_ID: item.Cust_Family_ID,
                //             PhotoCount: item.PhotoCount,
                //             Age: item.Age,
                //             HeightInCentimeters: item.HeightInCentimeters,
                //             MaritalStatusID: item.MaritalStatusID,
                //             CasteID: item.CasteID,
                //             serviceDate: item.serviceDate,
                //             bouncedEmailID: item.EmailID,
                //             bouncedemailentryid: item.Cust_EmailBounceEntryId,
                //             Cust_NotificationID: item.Cust_NotificationID || item.NotificationID,
                //             CategoryID: item.CategoryID,
                //             ActionType: item.ActionType,
                //             ReadStatus: item.ReadStatus,
                //             Tickets: item.Tickets,
                //             TicketID: item.Emp_Ticket_Id || item.Emp_Ticket_ID,
                //             NoDataFound: model.nodataarray(item.NoDataFound, item.Cust_ID),
                //             LastModifiedDate: item.LastModifiedDate,
                //             TicketHisUpdatedDate: item.TicketHisUpdatedDate,
                //             To_Profile_ID: item.To_Profile_ID,
                //             TicketOwner: item.TicketOwner,
                //             Ticketuserid: item.Ticketuserid,
                //             CountryCode: item.CountryCode,
                //             PrimaryContact: item.PrimaryContact,
                //             PriWithoutCode: item.PriWithoutCode,
                //             EmpReminderID: item.EmpReminderID,
                //             RemCallType: item.RemCallType,
                //             RemReminderRefID: item.RemReminderRefID,
                //             RemRelationName: item.RemRelationName,
                //             Category: item.Category,
                //             RemainderBody: item.RemainderBody,
                //             ReminderCreatedDate: model.todaydate,
                //             ReminderCreatedDatepopup: $filter('date')(model.todaydate, 'dd-MM-yyyy'),
                //             EmpAssignedDate: moment(item.EmpAssignedDate).format('DD-MMM-YYYY'),
                //             TicketAssignedDate: moment(item.TicketAssignedDate).format('DD-MMM-YYYY'),
                //             NotificationDate: moment(item.NotificationDate).format('DD-MMM-YYYY'),
                //             inActiveDate: moment(item.InActiveToDate).format('DD-MMM-YYYY'),
                //             paidclass: item.paid === true || item.paid === 1 ? 1 : 0,
                //             Date: moment(item.Date).format('DD-MMM-YYYY')
                //         });
                //     });

                //     return array;
                // };
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
                            paid: item.paid === true || item.paid === 1 ? 1 : 0,
                            IsConfidential: item.IsConfidential,
                            SuperConfidentila: item.SuperConfidentila,
                            HoroscopeStatus: item.HoroscopeStatus,
                            HoroscopeImage: item.HoroscopeImage
                        });
                        data.push({ label: 'Name', value: item.LastName + ' ' + item.FirstName });
                        //
                        data.push({ label: 'DOB(age)', value: item.DOB + '(' + item.Age + ')' });
                        data.push({ label: 'Height', value: item.Height });
                        data.push({ label: 'TOB(Star)', value: item.TOB + (item.Star !== null && item.Star !== "" ? " (" + item.Star + ")" : '') });
                        data.push({ label: 'Place of Birth', value: item.PlaceOfBirth });
                        data.push({ label: 'Gothram', value: item.Gothram });
                        //
                        data.push({ label: 'Caste', value: item.MotherTongue + "-" + item.Caste });
                        //
                        data.push({ label: 'Marital Status', value: item.MaritalStatus || item.MaritalStatusID });
                        data.push({ label: 'Qualification', value: item.qualification });
                        data.push({ label: 'Profession', value: item.Profession });
                        data.push({ label: 'Job Location', value: item.JobLocation });
                        data.push({ label: 'Income(P.M)', value: item.Income !== null && item.Income !== "" ? item.currency + " " + item.Income : "--" });
                        data.push({ label: 'Father/Mother Native', value: item.FFNative + " / " + item.MFNative });
                        data.push({ label: 'Property(Lakhs)', value: item.Property });
                        //
                        // data.push({ label: 'Dor', value: item.DOR });
                        //data.push({ label: 'Profile Grade', value: item.ProfileGrade == "1" ? "A" : (item.ProfileGrade == "2" ? "B" : (item.ProfileGrade == "3" ? "C" : "--")) });
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
                            Cust_NotificationID: item.Cust_NotificationID || item.NotificationID,
                            CategoryID: item.CategoryID,
                            ActionType: item.ActionType,
                            ReadStatus: item.ReadStatus,
                            Tickets: item.Tickets,
                            TicketID: item.Emp_Ticket_Id || item.Emp_Ticket_ID,
                            NoDataFound: model.nodataarray(item.NoDataFound, item.Cust_ID),
                            LastModifiedDate: item.LastModifiedDate,
                            TicketHisUpdatedDate: item.TicketHisUpdatedDate,
                            To_Profile_ID: item.To_Profile_ID,
                            TicketOwner: item.TicketOwner,
                            Ticketuserid: item.Ticketuserid,
                            CountryCode: item.CountryCode,
                            PrimaryContact: item.PrimaryContact,
                            PriWithoutCode: item.PriWithoutCode,
                            EmpReminderID: item.EmpReminderID,
                            RemCallType: item.RemCallType,
                            RemReminderRefID: item.RemReminderRefID,
                            RemRelationName: item.RemRelationName,
                            Category: item.Category,
                            RemainderBody: item.RemainderBody,
                            ReminderCreatedDate: model.todaydate,
                            ReminderCreatedDatepopup: $filter('date')(model.todaydate, 'dd-MM-yyyy'),
                            EmpAssignedDate: moment(item.EmpAssignedDate).format('DD-MMM-YYYY'),
                            TicketAssignedDate: moment(item.TicketAssignedDate).format('DD-MMM-YYYY'),
                            NotificationDate: moment(item.NotificationDate).format('DD-MMM-YYYY'),
                            inActiveDate: moment(item.InActiveToDate).format('DD-MMM-YYYY'),
                            paidclass: item.paid === true || item.paid === 1 ? 1 : 0,
                            Date: moment(item.Date).format('DD-MMM-YYYY'),

                            //05_10_2017_dashboard
                            educationspecialisation: item.educationspecialisation,
                            currency: item.currency,
                            countrylivingin: item.countrylivingin,
                            TOB: item.TOB,
                            SubCaste: item.SubCaste,
                            Star: item.Star,
                            Profession: item.Profession,
                            PlaceOfBirth: item.PlaceOfBirth,
                            MFNative: item.MFNative,
                            DOR: item.DOR
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
                            model.typeOfAssign = '';
                            model.typeofslidedate = '';
                            switch (tablename) {
                                case "No-Service List Since a Month":
                                    model.typeOfAssign = 'noserviceDate';
                                    model.typeofslidedate = "Service Date";
                                    break;
                                case "Latest Expressed Interest Profiles":
                                    model.typeOfAssign = 'proceeding';
                                    model.typeofslidedate = "proceeding Date";
                                    break;

                                    // case "Near by offline Expiry":
                                case "Near by expiry profiles":
                                    model.typeofslidedate = "Expired Date";
                                    break;
                                case "Un-Paid Customers":
                                    model.typeofslidedate = "Ticket Last Updated";
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
                                    // case "Tickets Assigned from Last 10 Days":
                                case 'Marketing Tickets Assigned Since 10 Days':
                                    model.typeOfAssign = 'Tickets';
                                    model.typeofslidedate = "Assigned Date";
                                    break;

                                case 'Profiles Assigned Since 10 Days':
                                    model.typeOfAssign = 'Profiles';
                                    model.typeofslidedate = "Assigned Date";
                                    break;
                                case "Email Bounce Info":
                                    model.typeofslidedate = "Bounced On";
                                    break;
                                case "No Sa Form For Paid Profiles":
                                    model.typeofslidedate = "Last Service Date";
                                    break;
                                case "Presently In India":
                                    model.typeofslidedate = "ArrivalDate at";
                                    break;
                                case "Marketing Ticket Expiry With in Two days":
                                    model.typeofslidedate = "Ticket Last Updated";
                                    break;
                                case "Customer Notification Status":
                                    model.typeOfAssign = 'notification';
                                    model.typeofslidedate = "Notification Date";
                                    break;
                                case "No Data Profiles":
                                    model.typeofslidedate = "Registered Date";
                                    break;
                                    //26_08_2017
                                case "No Photos Customers":
                                    model.typeOfAssign = 'nodatacustomer';
                                    model.typeofslidedate = "Registration Date";
                                    break;
                                case "No Horoscope Image Customers":
                                    model.typeOfAssign = 'nodatacustomer';
                                    model.typeofslidedate = "Registration Date";
                                    break;
                                case "Not Yet Verified Contact Details":
                                    model.typeOfAssign = 'nodatacustomer';
                                    model.typeofslidedate = "Registration Date";
                                    break;
                            }
                            if (topage === parseInt(10)) {
                                if (model.slideshowopenflag !== 1) {
                                    model.slideshowopenflag = 1;
                                    commonpage.showPopup('dashboardslide.html', model.scope, 'lg', "modalclassdashboard");
                                }
                                config.setSlides(model.displayArrayprofile(model.slidearray, 10), 10, 'normal');
                            } else {
                                config.addSlides(model.displayArrayprofile(model.slidearray, 11), model.slidearray, 11, 'normal');
                            }
                        }
                    });
                };
                model.slidebind = function(old, news, array) {
                    if (parseInt(model.topage) - parseInt(news) === 4) {
                        model.slideshowfunction(true, model.empid, model.empBranchID, (model.topage) + 1, (model.topage) + 10, model.headerhtml, 'slideshow', model.slidearray, 1);
                    }
                };
                model.closesashboard = function() {
                    model.slideshowopenflag = 0;
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
                model.changereminders = function(slidearray) {

                    model.reminderslidearray = {};
                    model.reminderslidearray = slidearray;
                    model.txtprofileidreminder = slidearray.ProfileID;
                    model.reminderticketid = slidearray.matkteingticket;
                    model.txtreminderDate = $filter('date')(slidearray.ReminderCreatedDate, "dd-MM-yyyy");
                    model.ddlHrs = "";
                    model.ddlmins = "";
                    model.ddlcontactperson = "";
                    model.ddlremCaltype = "";
                    commonpage.showPopupphotopoup('Remindertickets.html', model.scope, 'md', "modalclassdashboardremainder");
                    model.Hoursarray = model.getnumberbind(0, 23, 'Hrs', 1);
                    model.miniutearray = model.getnumberbind(0, 59, 'Mins', 1);
                    model.calltypearray = model.replytype('calltype');
                    model.replaytypearray = arrayConstants.childStayingWith;
                    model.categoryarray = arrayConstants.catgory;
                    model.ddlremCatgory = 462;

                    // slidearray.ReminderCreatedDate = moment(slidearray.ReminderCreatedDate).format('MM-DD-YYYY hh:mm:ss');
                    if (slidearray.EmpReminderID) {
                        model.ddlremCaltype = parseInt(slidearray.RemCallType);
                        model.ddlcontactperson = slidearray.RemReminderRefID;
                        model.contactpersonname = slidearray.RemRelationName;
                        model.ddlremCatgory = parseInt(slidearray.Category);
                        model.remembertickets = slidearray.RemainderBody;

                        if (slidearray.ReminderCreatedDate) {
                            var remindertime = moment(slidearray.ReminderCreatedDate).format('HH:mm');
                            var remindertimeArr = remindertime.split(':');
                            model.ddlHrs = parseInt(remindertimeArr[0]) + 1;
                            model.ddlmins = parseInt(remindertimeArr[1]) + 1;
                        }
                    }

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

                model.communicationlogredirect = function(profileid) {
                    window.open("communicationLogs?Profileid=" + profileid, "_blank");
                };
                model.RelationshipChangerem = function(RelationshipID) {
                    SelectBindServiceApp.getRelationName(3, model.reminderslidearray.ProfileID, RelationshipID).then(function(response) {
                        if (_.isArray(response.data[0]) && response.data[0].length > 0) {
                            model.contactpersonname = response.data[0][0].NAME;
                        }
                    });
                };
                model.paymenteditpointsdate = function(obj) {
                    model.insertopenflag = 0;
                    model.paymentchangedobj = obj;
                    if (obj.SAForm !== null && obj.SAForm !== '--' && $.trim(obj.SAForm) !== '') {
                        commonpage.showPopupphotopoup('editpopuppayment.html', model.scope, 'md', "modalclassofedit");
                    } else {
                        alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Please Get SA Form', 3000);
                    }
                };
                model.nomatcheslink = function(obj) {
                    model.nomatchesobj = {};
                    model.nomatchesobj = obj;
                    model.txtreasonnomatches = "";
                    commonpage.showPopupphotopoup('nomatchespopup.html', model.scope, 'md', "modalclassdashboardremainder");
                };
                model.nomatchessubmit = function() {
                    commonpage.closepopuppoptopopup();
                    var Mobj = {
                        intCust_ID: model.nomatchesobj.Custid,
                        strProfileID: model.nomatchesobj.ProfileID,
                        intTicketOwnerID: model.empid,
                        strReason: model.txtreasonnomatches !== null && model.txtreasonnomatches !== "" && model.txtreasonnomatches !== undefined ? model.txtreasonnomatches : null,
                        intEnteredBy: model.empid
                    };
                    dashboardServices.Nomatchesreasoninsert(Mobj).then(function(response) {
                        if (response !== undefined && parseInt(response.data) === 1) {
                            alerts.timeoutoldalerts(model.scope, 'alert-success', 'Reason Updated Successfully', 2000);
                        } else {
                            alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Reason Updated Failed', 2000);
                        }
                    });
                };
                return model.init();
            }
        ]);
})(angular);