(function(angular) {
    'use strict';

    function factory($http, communicationLogService, gridconfig, modelpopupopenmethod, alerts) {
        return function() {
            var model = {};
            model.gridtable1 = {};
            model.gridtable2 = {};
            model.gridtable3 = {};
            model.gridtable4 = {};
            model.Profileidcommunication = "210212849";
            // model.Profileidcommunication = "210910352";
            model.showsearchrows = true;
            model.showsearch = true;
            model.showpaging = false;
            model.showpagingclientside = true;
            model.myprofileexcel = false;
            model.normalexcel = false;
            model.gridTableshow = false;
            model.receivedprofiles = 1;
            model.sentprofile = 1;
            model.Nameofcandidate = "";


            model.rowStyle = function(row) {
                var test = [
                    { StatusID: 57, classes: 'settled' },
                    { StatusID: 393, classes: 'settled' },
                    { StatusID: 56, classes: 'Deleted' },
                    { StatusID: 394, classes: 'Deleted' },
                    { StatusID: 258, classes: 'closed' }
                ];

                return _.where(test, { StatusID: parseInt(row.ProfileStatusID) }).length > 0 ? _.where(test, { StatusID: parseInt(row.ProfileStatusID) })[0].classes : '';
            };


            model.addingserialnumber = function(array) {
                var SNum = 1;
                _.map(array, function(item) {
                    if (item.MFPStatus !== null) {
                        var strMFPStatus = $.trim(item.MFPStatus);
                    }
                });
                _.map(array, function(item) {
                    item.Sno = SNum;
                    SNum++;
                });

                _.map(array, function(item) {
                    item.rowtype = model.rowStyle(item);
                });

                return array;
            };

            model.communicationlogsubmit = function(profileid) {
                communicationLogService.Submitcommunicationlog(profileid, model.empid).then(function(response) {
                    console.log(response);
                    model.sendarray = [];
                    model.sendarray2 = [];
                    model.sendarray3 = [];
                    model.sendarray4 = [];
                    _.each(response.data[0].log, function(item) {
                        model.sendarray.push(item);
                    });
                    _.each(response.data[1].log, function(item) {
                        model.sendarray2.push(item);
                    });
                    _.each(response.data[2].log, function(item) {
                        model.sendarray3.push(item);
                    });
                    _.each(response.data[3].log, function(item) {
                        model.sendarray4.push(item);
                    });
                    model.gridtable1.TotalRows = model.sendarray.length > 0 ? model.sendarray[0].TotalRows : 0;


                    model.gridtable1.data = model.addingserialnumber(model.sendarray);
                    model.gridTableshow = true;
                    model.Nameofcandidate = model.sendarray.length > 0 ? model.sendarray[0].FromName : "";
                    //2
                    model.gridtable2.TotalRows = model.sendarray2.length > 0 ? model.sendarray2[0].TotalRows : 0;
                    model.gridtable2.data = model.addingserialnumber(model.sendarray2);
                    //3
                    model.gridtable3.TotalRows = model.sendarray3.length > 0 ? model.sendarray3[0].TotalRows : 0;
                    model.gridtable3.data = model.addingserialnumber(model.sendarray3);
                    //4
                    model.gridtable4.TotalRows = model.sendarray4.length > 0 ? model.sendarray4[0].TotalRows : 0;
                    model.gridtable4.data = model.addingserialnumber(model.sendarray4);
                    // model.gridtable1.pageSize = 10000;
                    // model.gridtable2.pageSize = 10000;
                    // model.gridtable3.pageSize = 10000;
                    // model.gridtable4.pageSize = 10000;
                });

            };

            model.ProfileIdTemplateDUrl = function(row) {
                var paidstatusclass = row.paid === 1 ? 'paidclass' : 'unpaid';
                var paid = row.ProfileID !== undefined ? "<a class='" + paidstatusclass + "'>" + row.ProfileID + "</a>" : "";
                return paid;
            };
            model.ViewProfile = function(row) {
                window.open('/Viewfullprofile/' + row.ProfileID, '_blank');
            };
            model.servicedone = function(row) {
                var servicedone = row.Branch !== undefined ? "<p>" + row.Branch + "-->(" + row.EmpName + ")</p>" : "";
                return servicedone;
            };
            model.Tickidwithtype = function(row) {
                var ticketid = "";
                var strMFPStatus = $.trim(row.MFPStatus);
                var classimg = 'imgwidth';
                var img = strMFPStatus !== null ? (strMFPStatus == 'I' ? "<img class='" + classimg + "' src='src/images/heartgrren.gif' />" : (strMFPStatus === 'NI' ? "<img src='src/images/brkhrtgreen.gif' class='" + classimg + "' />" : "")) : "";
                var ticket = row.TicketID !== null && row.TicketID !== undefined ? row.TicketID : "--";
                ticketid = ticket !== "--" ? "<a>" + ticket + "</a>" + img : "";
                return ticketid;
            };
            model.clickticketupdate = function(row) {
                model.marketingTicket = row.Emp_FollowupTicket_ID;
                model.TicketStatusID = row.TicketStatusID;
                modelpopupopenmethod.showPopupphotopoup('matchfollowup.html', model.scope, 'md', "modalclassdashboardphotopopup");
            };
            model.viewdproceeddate = function(row) {
                var MFPStatusDate = row.MFPStatusDate !== null && row.MFPStatusDate !== "" && row.MFPStatusDate !== undefined ? "<p>" + row.MFPStatusDate + "</p>" : "--";
                return MFPStatusDate;
            };
            model.photocount = function(row) {
                var PhotoCount = "";
                PhotoCount = row.PhotoCount !== null && row.PhotoCount !== "" && row.PhotoCount !== undefined ? "<p>" + row.PhotoCount + "</p>" : "--";
                return PhotoCount;
            };
            model.gridtable2.Resendemail = function(type, fromcustid, tocustid, toprofileid, expressintid, logid) {
                var obj = {
                    FromcustID: fromcustid,
                    TocustID: tocustid,
                    strFromProfileID: model.Profileidcommunication,
                    strToProfileID: toprofileid,
                    ExpressInterestId: expressintid,
                    LogID: logid,
                    isRvrflag: type === 1 ? "RVR" : "RS",
                    empid: model.empid
                };
                communicationLogService.EmployeeCommunicationLogRvrAndResend(obj).then(function(response) {
                    console.log(response);
                    if (response.data !== undefined && response.data) {
                        if (response.data.m_Item1 === 1) {
                            if (type === 2) {
                                model.sendarray3 = [];
                                _.each(response.data.m_Item2, function(item) {
                                    model.sendarray3.push(item);
                                });
                                model.gridtable3.TotalRows = model.sendarray3.length > 0 ? model.sendarray3[0].TotalRows : 0;
                                model.gridtable3.data = model.sendarray3;
                                alerts.timeoutoldalerts(model.scope, 'alert-success', 'Resend successfully', 3000);
                            } else {
                                model.communicationlogsubmit(model.Profileidcommunication);
                                alerts.timeoutoldalerts(model.scope, 'alert-success', 'Reversend successfully', 3000);
                            }
                        } else {
                            if (type === 2) {
                                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Resend fail', 3000);
                            } else {
                                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Reversend fail', 3000);
                            }
                        }
                    }
                });
            };
            model.ResendTempurl = function(row) {
                var dd = "";
                if (row.ProfileStatusID === 54) {
                    var lnkRvr = row.ISRvrSend == 1 ? "" : "<br/><a href='javascript:void(0)' ng-click='model.Resendemail(1," + row.iFromCustID + "," + row.iToCustID + "," + row.ProfileID + "," + row.ExpressInterestID + "," + row.LogID + ")'>Rvrsend</a>";
                    dd = "<a href='javascript:void(0)' ng-click='model.Resendemail(2," + row.iFromCustID + "," + row.iToCustID + "," + row.ProfileID + "," + row.ExpressInterestID + "," + row.LogID + ")'>Resend</a>" + lnkRvr;
                }
                return dd;
            };
            model.gridtable2.photossent = function(custid, emailid) {
                communicationLogService.Sentphotosemail(emailid, custid).then(function(resonse) {
                    console.log(resonse);
                    if (parseInt(resonse.data) === 1) {
                        alerts.timeoutoldalerts(model.scope, 'alert-success', 'email sent successfully', 3000);
                    } else {
                        alerts.timeoutoldalerts(model.scope, 'alert-danger', 'email sent failed', 3000);
                    }
                });
            };
            model.sendphotosurl = function(row) {
                var dd = "";
                if (row.ProfileStatusID === 54 && row.PhotoCount !== 0 && row.PhotoCount !== undefined && row.PhotoCount !== null) {
                    dd = "<a href='javascript:void(0)' ng-click='model.photossent(" + (row.iFromCustID) + "," + JSON.stringify(row.FromEmail) + ");'>Photos</a>";
                }
                return row.Sno + "</br>" + dd;
            };
            model.gridtable1.columns = [
                { text: 'Sno', key: 'Sno', type: 'label' },
                { text: 'ProfileID', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
                { text: 'Name', key: 'Name', type: 'label' },
                { text: 'ServiceDate', key: 'ServiceDate', type: 'label' },
                { text: 'ProfileOwner', key: 'ProfileOwner', type: 'label' },
                { text: 'Service Done', key: 'Branch', type: 'customlink', templateUrl: model.servicedone },
                { text: 'Viewed/Proceed Date', key: 'MFPStatusDate', type: 'customlink', templateUrl: model.viewdproceeddate },
                { text: 'TicketID', key: 'TicketID', type: 'customlink', templateUrl: model.Tickidwithtype, method: model.clickticketupdate },
                { text: 'PhotoCount', key: 'PhotoCount', type: 'customlink', templateUrl: model.photocount }
            ];
            model.gridtable2.columns = [
                { text: 'Sno', key: 'Sno', type: 'morelinks', templateUrl: model.sendphotosurl },
                { text: 'ProfileID', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
                { text: 'Name', key: 'Name', type: 'label' },
                { text: 'ServiceDate', key: 'ServiceDate', type: 'label' },
                { text: 'ProfileOwner', key: 'ProfileOwner', type: 'label' },
                { text: 'Service Done', key: 'Branch', type: 'customlink', templateUrl: model.servicedone },
                { text: 'Viewed/Proceed Date', key: 'MFPStatusDate', type: 'customlink', templateUrl: model.viewdproceeddate },
                { text: 'TicketID', key: 'TicketID', type: 'customlink', templateUrl: model.Tickidwithtype, method: model.clickticketupdate },
                { text: 'Options', key: '', type: 'morelinks', templateUrl: model.ResendTempurl },
                { text: 'PhotoCount', key: 'PhotoCount', type: 'customlink', templateUrl: model.photocount }
            ];
            model.gridtable3.columns = [
                { text: 'Sno', key: 'Sno', type: 'label' },
                { text: 'ProfileID', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
                { text: 'Name', key: 'Name', type: 'label' },
                { text: 'ServiceDate', key: 'ServiceDate', type: 'label' },
                { text: 'Service Done', key: 'Branch', type: 'customlink', templateUrl: model.servicedone },
                { text: 'ResendDate', key: 'ResendDate', type: 'label' },
                { text: 'PhotoCount', key: 'PhotoCount', type: 'customlink', templateUrl: model.photocount }

            ];
            model.gridtable4.columns = [
                { text: 'Sno', key: 'Sno', type: 'label' },
                { text: 'ProfileID', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
                { text: 'Name', key: 'Name', type: 'label' },
                { text: 'LastName', key: 'LastName', type: 'label' },
                { text: 'ProfileOwner', key: 'ProfileOwner', type: 'label' },
                { text: 'MeetingDate', key: 'MeetingDate', type: 'label' }

            ];
            model.pagechange = function(val) {
                var to = val * 10;
                var from = val === 1 ? 1 : to - 9;

            };
            model.receivedarraybind = function(type) {
                switch (type) {
                    case "V":
                    case "NV":
                    case "I":
                    case "NI":
                        var test = [];
                        test = _.where(model.sendarray, { MFPStatus: type });
                        if (test.length > 0) {
                            model.gridtable1.data = test;
                        } else {
                            test.push("1");
                            model.gridtable1.data = test;
                        }
                        break;
                    default:
                        model.gridtable1.data = model.sendarray;
                        break;
                }
            };
            model.sentarraybind = function(type) {
                switch (type) {
                    case "V":
                    case "NV":
                    case "I":
                    case "NI":
                        var test = [];
                        test = _.where(model.sendarray2, { MFPStatus: $.trim(type) });
                        if (test.length > 0) {
                            model.gridtable2.data = test;
                        } else {
                            test.push("1");
                            model.gridtable2.data = test;
                        }
                        break;
                    default:
                        model.gridtable2.data = model.sendarray2;
                        break;
                }
            };
            return model;
        };
    }
    angular
        .module('Kaakateeya')
        .factory('communicationLogModel', factory);

    factory.$inject = ['$http', 'communicationLogService', 'complex-grid-config', 'modelpopupopenmethod', 'alert'];
})(angular);