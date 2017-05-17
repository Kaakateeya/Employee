(function(angular) {
    'use strict';

    function factory($http, communicationLogService, gridconfig) {
        return function() {
            var model = {};
            //model = gridconfig;
            model.gridtable1 = gridconfig;
            model.gridtable2 = gridconfig;
            model.gridtable3 = gridconfig;
            model.gridtable4 = gridconfig;
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
                    model.slideshowarray = [];
                    _.each(response.data[0].log, function(item) {
                        model.slideshowarray.push(item);
                    });
                    model.gridtable1.TotalRows = response.data[0].log[0].TotalRows;
                    model.gridtable1.setData(model.slideshowarray);
                    model.gridTableshow = true;
                    model.Nameofcandidate = response.data[0].log[0].FromName;
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
            // model.gridtable2.columns = [
            //     { text: 'Sno', key: 'Sno', type: 'label' },
            //     { text: 'ProfileID', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
            //     { text: 'Name', key: 'LastName', type: 'label' },
            //     { text: 'ServiceDate', key: 'FirstName', type: 'label' },
            //     { text: 'ProfileOwner', key: 'Caste', type: 'label' },
            //     { text: 'Service Done', key: 'maritalstatus', type: 'label' },
            //     { text: 'Viewed/Proceed Date', key: 'DOB', type: 'customlink', templateUrl: model.AgeTemplate },
            //     { text: 'Options', key: 'Gender', type: 'label' },
            //     { text: 'TicketID', key: 'Gender', type: 'label' },
            //     { text: 'PhotoCount', key: 'Height', type: 'label' }
            // ];
            // model.gridtable3.columns = [
            //     { text: 'Sno', key: 'Sno', type: 'label' },
            //     { text: 'ProfileID', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
            //     { text: 'Name', key: 'LastName', type: 'label' },
            //     { text: 'ServiceDate', key: 'FirstName', type: 'label' },
            //     { text: 'Service Done', key: 'Caste', type: 'label' },
            //     { text: 'ResendDate', key: 'maritalstatus', type: 'label' },
            //     { text: 'PhotoCount', key: 'DOB', type: 'customlink', templateUrl: model.AgeTemplate }

            // ];
            // model.gridtable4.columns = [
            //     { text: 'Sno', key: 'Sno', type: 'label' },
            //     { text: 'ProfileID', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
            //     { text: 'Name', key: 'LastName', type: 'label' },
            //     { text: 'LastName', key: 'FirstName', type: 'label' },
            //     { text: 'ProfileOwner', key: 'Caste', type: 'label' },
            //     { text: 'MeetingDate', key: 'maritalstatus', type: 'label' }

            // ];
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