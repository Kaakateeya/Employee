(function() {
    'use strict';


    angular
        .module('Kaakateeya')
        .factory('topheadermodel', ['$http', 'authSvc', 'modelpopupopenmethod', '$state', 'alert', 'helperservice', 'Notification', '$compile', 'complex-slide-config', '$filter',

            function(http, authSvc,
                modelpopupopenmethod, $state, alerts, helperservice, Notification, compile, configheader, $filter) {
                var model = {};
                model.scope = {};
                model.configheader = configheader;
                model.lock = false;
                model.CurrentDate = new Date();
                model.logincounts = [];
                model.usernameemployeepop = false;
                model.usernameemployeepasswordpop = false;
                model.lockscreendiv = true;
                model.init = function() {
                    model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                    model.empBranchID = authSvc.empBranchID() !== undefined && authSvc.empBranchID() !== null && authSvc.empBranchID() !== "" ? authSvc.empBranchID() : "";
                    //pageload Callings
                    model.name = authSvc.LoginEmpName();
                    model.empphoto = authSvc.empphoto();
                    model.getemployeenotification(0, null, null, 0);
                    model.usernameemployeeid = sessionStorage.getItem("usernameemployeeid");
                    return model;
                };
                model.logout = function() {
                    model.name = "";
                    authSvc.logout();
                    helperservice.empLogout(model.empid);
                    $state.go("login", {});
                };
                model.lockscreen = function() {
                    model.lock = true;
                    model.passwordemployee = "";
                    modelpopupopenmethod.showPopupphotopoup('loginContent.html', model.scope, 'md', "modalclassdashboardphotopopuplogin");
                };
                model.close = function(type) {
                    modelpopupopenmethod.closepopuppoptopopup();
                };
                model.loginsubmit = function(form) {
                    modelpopupopenmethod.getloginpage(form).then(function(response) {
                        if (response.data !== undefined && response.data !== "" && response.data !== null) {
                            switch (response.data.m_Item5) {
                                case 1:
                                    model.loginarray = response.data.m_Item1;
                                    model.empphoto = response.data.m_Item1.EmpPhotoPath;
                                    authSvc.user(response.data.m_Item1);
                                    //sessionStorage.setItem("usernameemployeeid", model.loginsubmit.usernameemployee);
                                    modelpopupopenmethod.closepopuppoptopopup();
                                    break;
                                case 0:
                                    model.errormessage = "Invalid login credentials";
                                    alert("Invalid login credentials");
                                    break;
                                case 2:
                                    model.errormessage = "Ur Account was Deleted,Contact Admin";
                                    alert("Ur Account was Deleted,Contact Admin");
                                    break;
                                case 3:
                                    model.errormessage = "Ur Account was Temp.Disabled,Contact Admin";
                                    alert("Ur Account was Temp.Disabled,Contact Admin");
                                    break;
                                case 8:
                                    model.errormessage = "Ur Cannot Login With Deactivate Branch-User Account ";
                                    alert("Ur Cannot Login With Deactivate Branch-User Account ");
                                    break;
                                case 9:
                                    model.errormessage = "Ur Account was  not Allowed To login In these Timings ";
                                    alert("Ur Account was  not Allowed To login In these Timings");
                                    break;
                                case 11:
                                    model.errormessage = "Please Enter Reason/Permission To Login With Your Userid";
                                    alert("Please Enter Reason/Permission To Login With Your Userid");
                                    break;
                                case 12:
                                    model.errormessage = "Please Enter Reason/Permission To Login With Your Userid";
                                    alert("Please Enter Reason/Permission To Login With Your Userid");
                                    break;
                                case 13:
                                    model.errormessage = "Please Contact Mr.CHIRANJEEVI sir to Login With Ur UserID";
                                    alert("Please Contact Mr.CHIRANJEEVI sir to Login With Ur UserID");
                                    break;
                                case 14:
                                    model.errormessage = "Please Contact Mr.CHIRANJEEVI sir to Login With Ur UserID";
                                    alert("Please Contact Mr.CHIRANJEEVI sir to Login With Ur UserID");
                                    break;
                            }
                        }
                    });
                };
                model.searchredirect = function(id, Profileid) {
                    $state.go("base.searchpage", { id: id, Profileid: Profileid }, { reload: true });
                };
                model.changepassword = function(form) {
                    modelpopupopenmethod.getChangeEmployeePassword(model.empid, form.model.currentpassword, form.model.confirmpassword).then(function(response) {
                        if (parseInt(response.data) === 1) {
                            alerts.timeoutoldalerts(model.scope, 'alert-success', 'Password Changed Successfully', 3000);
                            modelpopupopenmethod.closepopuppoptopopup();
                            model.currentpassword = "";
                            model.newpassword = "";
                            model.confirmpassword = "";
                            model.logout();
                        } else {
                            alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Password Changed Fail', 3000);
                        }
                    });
                };
                model.chkpassword = function(password) {
                    if (password !== "" && password !== null && password !== undefined) {
                        modelpopupopenmethod.getCheckemployeePassord(model.empid, password).then(function(response) {
                            if (parseInt(response.data) === 1) {} else {
                                model.currentpassword = "";
                                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'please Enter valid Password', 3000);
                            }
                        });
                    }
                };
                model.changepasswordpopup = function() {
                    modelpopupopenmethod.showPopupphotopoup('changepassword.html', model.scope, 'md', "modalclassdashboardphotopopuplogin");
                };
                model.hideshowunpaid = function() {
                    model.unpaidmember = !model.unpaidmember;
                    if (model.unpaidmember)
                        model.getpresentunpaidmembers();
                };
                model.showNotifications = function() {
                    model.templateUrl = "templates/dashBoardslide.html";
                    model.configheader.headettemp = "topdashboardheader.html";
                    model.slideshowheader(1, 10);
                };
                model.slidebind = function(old, news, array) {
                    if (parseInt(model.topageheder) - parseInt(news) === 4) {
                        model.slideshowheader((model.topageheder) + 1, (model.topageheder) + 10);
                    }
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
                            paid: item.paid === true || item.paid === 1 ? 1 : 0,
                            IsConfidential: item.IsConfidential,
                            SuperConfidentila: item.SuperConfidentila,
                            HoroscopeStatus: item.HoroscopeStatus,
                            HoroscopeImage: item.HoroscopeImage
                        });
                        data.push({ label: 'Name', value: item.LastName + ' ' + item.FirstName });
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
                            ProfileID: item.ProfileID,
                            CountryCodeID: item.CountryCodeID,
                            Cust_Family_ID: item.Cust_Family_ID,
                            PhotoCount: item.PhotoCount,
                            Age: item.Age,
                            Cust_NotificationID: item.Cust_NotificationID || item.NotificationID,
                            CategoryID: item.CategoryID,
                            ActionType: item.ActionType,
                            ReadStatus: item.ReadStatus,
                            Tickets: item.Tickets,
                            TicketID: item.Emp_Ticket_Id || item.Emp_Ticket_ID,
                            TicketOwner: item.TicketOwner,
                            Ticketuserid: item.Ticketuserid,
                            CountryCode: item.CountryCode,
                            PrimaryContact: item.PrimaryContact,
                            PriWithoutCode: item.PriWithoutCode,
                            Category: item.Category,
                            NotificationDate: moment(item.NotificationDate).format('DD-MMM-YYYY'),
                            inActiveDate: moment(item.InActiveToDate).format('DD-MMM-YYYY'),
                            paidclass: item.paid === true || item.paid === 1 ? 1 : 0,
                            Date: moment(item.Date).format('DD-MMM-YYYY')
                        });
                    });
                    return array;
                };
                model.slideshowheader = function(frompage, topage) {
                    model.notificationarray = [];
                    Notification.clearAll();
                    modelpopupopenmethod.getlandingdataheader(model.empid, model.empBranchID, frompage, topage, 'Customer Notification Status', 1).then(function(response) {
                        if (response !== undefined && response !== null && response !== "" && response.data !== undefined && response.data !== null && response.data !== "" && response.data.length > 0 && response.data[0].length > 0) {
                            model.slidearrayaa = response.data[0];
                            model.totalRecords = model.slidearrayaa[0].TotalRows;
                            model.headerhtml = 'Customer Notification Status';
                            model.typeOfAssign = '';
                            model.typeofslidedate = '';
                            model.typeOfAssign = 'notification';
                            model.typeofslidedate = "Notification Date";
                            model.topageheder = topage;
                            if (topage === parseInt(10)) {
                                configheader.setSlides(model.displayArrayprofile(model.slidearrayaa, 10), 10, 'normal');
                                modelpopupopenmethod.showPopup('headerdslide.html', model.scope, 'lg', "modalclassdashboard");
                            } else {
                                configheader.addSlides(model.displayArrayprofile(model.slidearrayaa, 11), model.slidearrayaa, 11, 'normal');
                            }
                        }
                    });
                };
                model.closesashboard = function() {
                    model.slideshowheaderopenflag = 0;
                    modelpopupopenmethod.closepopup();
                };
                model.getemployeenotification = function(intType, NotificationID, Categoryid, ProfileID) {
                    var obj = {};
                    switch (intType) {
                        case 0:
                            obj.CategoryID = null;
                            obj.i_display = 0;
                            obj.iEmpID = 2;
                            obj.iNotificationID = null;
                            obj.strProfileID = null;
                            break;
                        case 1:
                            obj.CategoryID = null;
                            obj.i_display = 1;
                            obj.iEmpID = 2;
                            obj.iNotificationID = null;
                            obj.strProfileID = null;
                            break;
                        case 2:
                            obj.CategoryID = Categoryid;
                            obj.i_display = 2;
                            obj.iEmpID = 2;
                            obj.iNotificationID = NotificationID;
                            obj.strProfileID = ProfileID;
                            break;
                    }

                    modelpopupopenmethod.getemployeenotification(obj).then(function(response) {
                        if (intType === 0) {
                            if (response.data !== undefined && response.data !== "" && response.data !== null && response.data !== undefined && response.data.length > 0) {
                                model.notificationarray = [];
                                model.notificationarray = response.data;
                            } else {
                                model.notificationarray = [];
                                model.notificationarray.push("No data Found");
                            }
                            Notification.clearAll();
                            Notification.warning(({ message: '', templateUrl: 'custom_template.html', delay: 10000, scope: model.scope, closeOnClick: false }));
                        }
                    });
                };

                model.getpresentunpaidmembers = function() {
                    modelpopupopenmethod.getpresentunpaidmembers(model.empid).then(function(response) {
                        if (response.data !== undefined && response.data !== "" && response.data !== null && response.data[0] !== undefined && response.data[0].length > 0) {
                            model.presentunpaidmembersarray = [];
                            model.presentunpaidmembersarray = response.data[0];
                        } else {
                            model.presentunpaidmembersarray = [];
                            model.presentunpaidmembersarray.push("No data Found");
                        }
                    });
                };
                model.closealert = function(index) {
                    model.presentunpaidmembersarray.splice(index, 1);

                };
                model.ticketpopupunpaid = function(ticketid) {
                    model.unpaidticket = ticketid;
                    modelpopupopenmethod.showPopupphotopoup('unpaidmarket.html', model.scope, 'md', "modalclassdashboardphotopopup");
                };
                model.clickNotification = function(item, index) {
                    model.getemployeenotification(2, item.iNotificationID, item.CategoryID, item.ICustID);
                    model.notificationarray.splice(index, 1);
                    if (model.notificationarray.length === 0) {
                        Notification.clearAll();
                    }
                };
                model.notifyclickhide = function(index) {
                    model.notificationarray.splice(index, 1);
                    if (model.notificationarray.length === 0) {
                        Notification.clearAll();
                    }
                };
                return model.init();
            }
        ]);

})(angular);