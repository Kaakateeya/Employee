(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('matchMeetingCountReportModel', factory);

    factory.$inject = ['matchMeetingCountReportService', 'complex-grid-config', 'modelpopupopenmethod', 'single-grid-config', 'alert', 'complex-slide-config'];

    function factory(matchMeetingCountReportService, config, modelpopupopenmethod, singleconfig, alertss, configslide) {

        var model = {};
        model = config;
        model.slide = {};
        model.slide.config = {};
        model.slide.config = configslide;
        model.slide.headervisileble = true;
        model.singlegrid = singleconfig;
        model.scope = {};
        model.showpaging = false;
        model.data = [];
        model.scope = {};
        model.dateOptions = {
            changeMonth: true,
            changeYear: true,
            yearRange: "-40:+5",
            dateFormat: 'mm-dd-yy'
        };
        model.viewTemplate = function(row) {
            return '<a href="javascript:void();">View</a>';
        };
        model.slide.closemainpopup = function() {
            modelpopupopenmethod.closepopup();
        };

        model.groomTemplate = function(row) {
            return model.returnProfileIDTemplate(row.GroomProfileID, row.GroomPaidSatus);
        };
        model.brideTemplate = function(row) {
            return model.returnProfileIDTemplate(row.BrideProfileID, row.BridePaidSatus);
        };

        model.viewProfile = model.singlegrid.viewProfile = function(profileID) {
            window.open('/Viewfullprofile/' + profileID + '/0', '_blank');
        };

        model.viewmmInfo = function(row) {
            debugger;
            var inobj = {};
            if (model.rbtnSearchBy === '0') {
                inobj.Empid = row.EmployeeId;
                model.singlegrid.columns = [
                    { text: 'Employee name', key: 'EMPName', type: 'label' },
                    { text: 'Groom profileID', key: 'GroomProfileID', type: 'morelinks', templateUrl: model.groomTemplate },
                    { text: 'Bride profileID', key: 'BrideProfileID', type: 'morelinks', templateUrl: model.brideTemplate },
                    { text: 'Groom profile owner', key: 'GroomProfileOwner', type: 'label' },
                    { text: 'Groom name	', key: 'GroomProfileName', type: 'label' },
                    { text: 'Bride profile owner', key: 'BrideProfileOwner', type: 'label' },
                    { text: 'Bride name', key: 'BrideProfileName', type: 'label' },
                    { text: 'MM notes', key: 'MeetingNotes', type: 'label' },
                    { text: 'Bride status', key: 'BStatus', type: 'label' },
                    { text: 'Groom status', key: 'GStatus', type: 'label' },
                    { text: 'MM date', key: 'MeetingDate', type: 'label' }
                ];

            } else if (model.rbtnSearchBy === '1') {
                inobj.custid = row.CustomerID;

                model.singlegrid.columns = [
                    { text: 'Bride profileID', key: 'BrideProfileID', type: 'morelinks', templateUrl: model.brideTemplate },
                    { text: 'Groom profileID', key: 'GroomProfileID', type: 'morelinks', templateUrl: model.groomTemplate },
                    { text: 'MM date', key: 'MeetingDate', type: 'label' },
                    { text: 'MM arangedby Emp', key: 'MeetingArrangedByEmp_ID', type: 'label' },
                    { text: 'Bride status', key: 'BStatus', type: 'label' },
                    { text: 'Groom status', key: 'GStatus', type: 'label' },
                    { text: 'MM notes', key: 'MeetingNotes', type: 'label' },
                    { text: 'GPO', key: 'GPO', type: 'label' },
                    { text: 'BPO', key: 'BPO', type: 'label' }
                ];

            } else if (model.rbtnSearchBy === '2') {
                inobj = {
                    MMCustID: row.BrideProfile_ID,
                    MMCustID2: row.GroomProfile_ID
                };

                model.singlegrid.columns = [
                    { text: 'Bride profileID', key: 'BrideProfileID', type: 'morelinks', templateUrl: model.brideTemplate },
                    { text: 'Bride name', key: 'BrideProfileName', type: 'label' },
                    { text: 'Groom profileID', key: 'GroomProfileID', type: 'morelinks', templateUrl: model.groomTemplate },
                    { text: 'Groom name', key: 'GroomProfileName', type: 'label' },
                    { text: 'MM date', key: 'MeetingDate', type: 'label' },
                    { text: 'MM arranged by EmpID', key: 'MeetingArrangedByEmp_ID', type: 'label' },
                    { text: 'Bride status', key: 'BStatus', type: 'label' },
                    { text: 'Groom status', key: 'GStatus', type: 'label' },
                    { text: 'MM notes', key: 'MeetingNotes', type: 'label' },
                    { text: 'GPO', key: 'GPO', type: 'label' },
                    { text: 'BPO', key: 'BPO', type: 'label' }
                ];

            }

            matchMeetingCountReportService.matchMeetingCountInfo(inobj).then(function(response) {
                if (response.data && response.data[0] && response.data[0].length > 0) {
                    model.slide.totalRecords = response.data[0].length;
                    response.data[0].forEach(function(element) {
                        element.BrideProfileOwnerUrl = element.BrideProfileOwnerUrl ? 'http://d16o2fcjgzj2wp.cloudfront.net' + element.BrideProfileOwnerUrl.split('~')[1] : '';
                        element.GroomProfileOwnerUrl = element.GroomProfileOwnerUrl ? 'http://d16o2fcjgzj2wp.cloudfront.net' + element.GroomProfileOwnerUrl.split('~')[1] : '';
                        if (model.rbtnSearchBy === '0') {
                            element.arrangedby = row.Name;
                        } else {
                            element.arrangedby = element.MeetingArrangedByEmp_ID;
                        }

                    }, this);

                    configslide.setSlides(response.data[0], 10, 'normal');
                }
            });

            model.employeeName = row.Name;


            model.slide.templateUrl = "templates/matchMeetingSlide.html";
            model.slide.config.headettemp = "matchmeetingHeader.html";
            modelpopupopenmethod.showPopup('matchmeetingpopup.html', model.scope, 'lg', "matchmeting");
        };

        model.matchReport = function() {

            if (model.rbtnSearchBy === '0') {
                model.columns = [
                    { text: 'Sno', key: 'ID', type: 'label' },
                    { text: 'Employee name', key: 'Name', type: 'label' },
                    { text: 'Match meeting count', key: 'MeetingArrangedCount', type: 'label' },
                    { text: 'Branch', key: 'Branch', type: 'label' },
                    { text: 'view', key: '', type: 'customlink', templateUrl: model.viewTemplate, method: model.viewmmInfo }
                ];
            } else if (model.rbtnSearchBy === '1') {
                model.columns = [
                    { text: 'Sno', key: 'ID', type: 'label' },
                    { text: 'ProfileID', key: 'ProfileId', type: 'morelinks', templateUrl: model.customerProfileid },
                    { text: 'Name', key: 'Name', type: 'label' },
                    { text: 'Match meeting count', key: 'MeetingCount', type: 'label' },
                    { text: 'Caste', key: 'Castename', type: 'label' },
                    { text: 'view', key: '', type: 'customlink', templateUrl: model.viewTemplate, method: model.viewmmInfo }
                ];
            } else if (model.rbtnSearchBy === '2') {
                model.columns = [
                    { text: 'Sno', key: 'ID', type: 'label' },
                    { text: 'Bride profileID', key: 'BrideCust_ID', type: 'morelinks', templateUrl: model.searchBybrideProfileid },
                    { text: 'Groom profileID', key: 'GroomCust_ID', type: 'morelinks', templateUrl: model.searchBygroomProfileid },
                    { text: 'Match meeting count', key: 'MatchMeetingCount', type: 'label' },
                    { text: 'view', key: '', type: 'customlink', templateUrl: model.viewTemplate, method: model.viewmmInfo }
                ];
            }

            var inobj = {
                AppusrID: 0,
                SearchBy: model.rbtnSearchBy ? model.rbtnSearchBy : 0,
                count: 'm',
                Countfrom: null,
                CountTo: null,
                Dcount: 0,
                FromDate: model.txtFrommeetingDate ? moment(model.txtFrommeetingDate).format('YYYY-MM-DD') : null,
                toDate: model.txtTomeetingDate ? moment(model.txtTomeetingDate).format('YYYY-MM-DD') : null,
                strBranch: model.branch && model.branch.length > 0 ? model.branch.join(',') : null,
                strCaste: model.caste && model.caste.length > 0 ? model.caste.join(',') : null,
                SerialnoFrom: null,
                serialnoto: null
            };

            matchMeetingCountReportService.matchMeetingCountReport(inobj).then(function(response) {
                if (response.data && response.data[0] !== undefined && response.data[0].length > 0) {
                    model.data = response.data[0];
                    model.TotalRows = response.data[0].length;
                    model.opendiv = false;
                    model.panelbodyhide = false;
                } else {
                    model.panelbodyhide = true;
                    model.data = [];
                    model.TotalRows = 0;
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'no data found', 4500);
                }
            });
        };

        model.reset = function() {

            model.panelbodyhide = true;
            model.TotalRows = undefined;
            model.opendiv = true;
            model.caste = [402];
            model.branch = ["319", "320", "321", "322", "323", "324", "325", "326", "328", "329", "330", "331", "332", "333", "334", "335", "336", "337", "338", "339", "340", "341", "342", "343", "344"];
            model.rbtnSearchBy = '0';
            model.txtFrommeetingDate = '';
            model.txtTomeetingDate = '';
            model.data = [];
        };

        model.returnProfileIDTemplate = function(profileid, paidStatus) {
            var paidstatusclass = paidStatus === 1 ? 'paidclass' : 'unpaid';
            var paid = "<a class='" + paidstatusclass + "' href='javascript:void(0);' ng-click='model.viewProfile(" + JSON.stringify(profileid) + ");'>" + profileid + "</a>";
            return paid;
        };

        model.customerProfileid = function(row) {
            return model.returnProfileIDTemplate(row.ProfileId, row.PaidSatus);
        };
        model.searchBybrideProfileid = function(row) {
            return model.returnProfileIDTemplate(row.BrideCust_ID, row.bridePaidSatus);
        };
        model.searchBygroomProfileid = function(row) {
            return model.returnProfileIDTemplate(row.GroomCust_ID, row.groomPaidSatus);
        };

        model.slide.slidebind = function(old, news, array) {
            // if (parseInt(model.topage) - parseInt(news) === 4) {

            // }
        };

        model.slide.viewProfileRedirect = function(id) {
            window.open('/Viewfullprofile/' + id + '/0', '_blank');
        };



        return model;

    }
})();