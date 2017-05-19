(function(angular) {
    'use strict';

    function factory($http, communicationLogService, gridconfig) {
        return function() {
            var model = {};
            model.gridtable1 = {};
            model.gridtable2 = {};
            model.gridtable3 = {};
            model.gridtable4 = {};
            model.Profileidcommunication = "210212849";
            model.showsearchrows = true;
            model.showsearch = true;
            model.gridtable1.showpaging = false;
            model.gridtable2.showpaging = false;
            model.gridtable3.showpaging = false;
            model.gridtable4.showpaging = false;
            model.myprofileexcel = true;
            model.normalexcel = true;
            model.gridTableshow = false;
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
                    model.gridtable1.TotalRows = response.data[0].log[0].TotalRows;
                    model.gridtable1.data = model.sendarray;
                    model.gridTableshow = true;
                    model.Nameofcandidate = response.data[0].log[0].FromName;
                    //2
                    model.gridtable2.TotalRows = response.data[1].log[0].TotalRows;
                    model.gridtable2.data = model.sendarray2;
                    //
                    model.gridtable3.TotalRows = response.data[2].log[0].TotalRows;
                    model.gridtable3.data = model.sendarray3;
                    //
                    model.gridtable4.TotalRows = response.data[3].log[0].TotalRows;
                    model.gridtable4.data = model.sendarray4;
                });

            };
            model.ProfileIdTemplateDUrl = function(row) {
                var paidstatusclass = row.paid === 1 ? 'paidclass' : 'unpaid';
                var paid = "<a class='" + paidstatusclass + "'>" + row.ProfileID + "</a>";
                return paid;
            };
            model.ViewProfile = function(row) {
                window.open('/Viewfullprofile/' + row.ProfileID, '_blank');
            };
            model.servicedone = function(row) {
                var servicedone = "<p>" + row.Branch + "-->(" + row.EmpName + ")</p>";
                return servicedone;
            };
            model.Tickidwithtype = function(row) {
                var strMFPStatus = $.trim(row.MFPStatus);
                var classimg = 'imgwidth';
                var img = strMFPStatus !== null ? (strMFPStatus == 'I' ? "<img class='" + classimg + "' src='src/images/heartgrren.gif' />" : (strMFPStatus === 'NI' ? "<img src='src/images/brkhrtgreen.gif' class='" + classimg + "' />" : "")) : "";
                var ticket = row.TicketID !== null ? row.TicketID : "--";
                var ticketid = "<a>" + ticket + "</a>" + img;
                return ticketid;
            };
            model.clickticketupdate = function(row) {

            };
            model.viewdproceeddate = function(row) {

                var MFPStatusDate = row.MFPStatusDate !== null && row.MFPStatusDate !== "" && row.MFPStatusDate !== undefined ? "<p>" + row.MFPStatusDate + "</p>" : "--";
                return MFPStatusDate;
            };
            model.photocount = function(row) {

                var PhotoCount = row.PhotoCount !== null && row.PhotoCount !== "" && row.PhotoCount !== undefined ? "<p>" + row.PhotoCount + "</p>" : "--";
                return PhotoCount;
            };
            model.ResendTempurl = function(row) {
                var paid = "<a>Resend</a>";
                return paid;
            };
            model.Resendemail = function(row) {

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
                { text: 'Sno', key: 'Sno', type: 'label' },
                { text: 'ProfileID', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
                { text: 'Name', key: 'Name', type: 'label' },
                { text: 'ServiceDate', key: 'ServiceDate', type: 'label' },
                { text: 'ProfileOwner', key: 'ProfileOwner', type: 'label' },
                { text: 'Service Done', key: 'Branch', type: 'customlink', templateUrl: model.servicedone },
                { text: 'Viewed/Proceed Date', key: 'MFPStatusDate', type: 'customlink', templateUrl: model.viewdproceeddate },
                { text: 'TicketID', key: 'TicketID', type: 'customlink', templateUrl: model.Tickidwithtype, method: model.clickticketupdate },
                { text: 'Options', key: 'TicketID', type: 'customlink', templateUrl: model.ResendTempurl, method: model.Resendemail },
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
                switch (model.tablename) {
                    case "general":
                        model.submitgeneral(from, to);
                        break;
                    case "advanced":
                        model.submitadvancedsearch(from, to);
                        break;
                }
            };
            model.exportexcel = function(topage) {
                switch (model.tablename) {
                    case "general":
                        model.submitgeneral(1, model.gridtable.TotalRows, 'excel');
                        break;
                    case "advanced":
                        model.submitadvancedsearch(1, model.gridtable.TotalRows, 'excel');
                        break;
                }
            };
            return model;
        };
    }
    angular
        .module('Kaakateeya')
        .factory('communicationLogModel', factory);

    factory.$inject = ['$http', 'communicationLogService', 'complex-grid-config'];
})(angular);