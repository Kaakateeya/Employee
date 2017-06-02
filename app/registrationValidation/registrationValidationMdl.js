(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('registrationValidationModel', factory)

    factory.$inject = ['registrationValidationservice', 'authSvc', 'complex-grid-config', 'alert', 'complex-slide-config', 'modelpopupopenmethod', 'single-grid-config'];

    function factory(svc, authSvc, gridConfig, alertss, slideConfig, modelpopupopenmethod, sinlegrid) {
        return function() {
            var model = {},
                empid = '';
            model.grid = gridConfig;
            model.slide = slideConfig;
            model.SingleGrid = sinlegrid;
            model.scope = {};

            //grid
            model.opendiv = true;
            model.grid.gridTableshow = true;
            model.grid.showsearchrows = true;
            model.grid.showsearch = true;
            model.grid.showpaging = true;
            model.grid.myprofileexcel = true;
            model.grid.normalexcel = true;
            model.grid.showplus = true;

            //slide

            model.slide.templateUrl = "templates/myprofileSlide.html";
            model.slide.headettemp = "templates/myprofileheader.html";

            model.applicationstatusArr = [
                { "label": "-- Select All --", "title": "-- Select All --", "value": '' },
                { "label": "Active", "title": "Active", "value": 54 },
                { "label": "InActive", "title": "InActive", "value": 55 },
                { "label": "Deleted/WaitingforDeltdAuth", "title": "Deleted/WaitingforDeltdAuth", "value": 56 },
                { "label": "Settled/WaitingforSetldAuth", "title": "Settled/WaitingforSetldAuth", "value": 57 },
                { "label": "MMSerious", "title": "MMSerious", "value": 395 }
            ];

            model.close = function() {
                modelpopupopenmethod.closepopuppoptopopup();
            };

            model.slide.close = function() {
                modelpopupopenmethod.closepopuppoptopopup();
            };
            model.slide.closemainpopup = function() {
                modelpopupopenmethod.closepopup();
            };
            model.init = function() {

                empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                model.grid.columns = [
                    { text: 'Profile ID', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
                    // { text: '', key: '', type: 'play', method: model.playFunction },
                    { text: 'FirstName', key: 'FirstName', type: 'label' },
                    { text: 'LastName', key: 'LastName', type: 'label' },
                    { text: 'Caste', key: 'Caste', type: 'label' },
                    { text: 'DOR', key: 'DOR', type: 'label' },
                    { text: 'ProfileOwner', key: 'ProfileOwner', type: 'label' },
                    { text: 'Ticket', key: 'TicketHistoryID', type: 'link' }
                ];
                return model;
            };

            model.checkTxt = function(val) {
                return val !== '' && val !== undefined ? val : '';
            };

            model.ProfileIdTemplateDUrl = function(row) {
                var paid = "<a style='cursor:pointer;'>" + row.ProfileID + '(' + row.BranchCode + ")</a>";
                return paid;
            };
            model.ViewProfile = function(row) {
                window.open('/Viewfullprofile/' + row.ProfileID + '/0', '_blank');
            };

            model.rowStyle = function(row) {
                var test = [
                    { StatusID: 57, classes: 'settled' },
                    { StatusID: 393, classes: 'settled' },
                    { StatusID: 56, classes: 'Deleted' },
                    { StatusID: 394, classes: 'Deleted' },
                    { StatusID: 258, classes: 'closed' }
                ];

                return _.where(test, { StatusID: parseInt(row.ProfileStatusID) }).length > 0 ? _.where(test, { StatusID: parseInt(row.ProfileStatusID) })[0].classes : ''
            };
            model.grid.exportexcel = function(array, columns) {
                model.getSearchData(1, model.grid.topage, "export", model.ddlApplicationStatus);
            };
            model.grid.pagechange = function(val) {
                var to = val * 10;
                var from = val === 1 ? 1 : to - 9;
                model.getSearchData(from, to, 'grid', model.ddlApplicationStatus);
            };
            model.getSearchData = function(from, to, typeofbind, ApplicationStatus) {

                if (model.checkTxt(model.txtFFMFNATIVE) !== '' || model.checkTxt(model.txtFatherName) !== '' || model.checkTxt(model.txtMotherName) !== '' || model.checkTxt(model.txtFFName) !== '' || model.checkTxt(model.txtMFName) !== '' ||
                    model.checkTxt(model.txtMFSurName) !== '' || model.checkTxt(model.txtCFFFSurName) !== '' || model.checkTxt(model.txtCName) !== '' || model.checkTxt(model.ddlCaste) !== '' ||
                    model.checkTxt(model.txtAllPhones) !== '' || model.checkTxt(model.txtAllEmails) !== '' || model.checkTxt(model.ddlApplicationStatus) || model.checkTxt(model.rbtGender) !== '') {

                    var input = {
                        strMFFNativePlace: model.checkTxt(model.txtFFMFNATIVE),
                        strFatherName: model.checkTxt(model.txtFatherName),
                        strMotherName: model.checkTxt(model.txtMotherName),
                        strFFName: model.checkTxt(model.txtFFName),
                        strMFName: model.checkTxt(model.txtMFName),
                        strMFSurName: model.checkTxt(model.txtMFSurName),
                        strCustSurName: model.checkTxt(model.txtCFFFSurName),
                        strCustName: model.checkTxt(model.txtCName),
                        strCaste: model.checkTxt(model.ddlCaste),
                        strAllPhones: model.checkTxt(model.txtAllPhones),
                        strAllEmailIds: model.checkTxt(model.txtAllEmails),
                        intAppicationStatusID: model.checkTxt(ApplicationStatus),
                        intGenderID: model.checkTxt(model.rbtGender),
                        intEmpID: empid,
                        i_Startindex: from,
                        i_EndIndex: to
                    };
                    svc.getRegSearchProfile(input).then(function(response) {
                        console.log(response);
                        if (_.isArray(response.data) && response.data.length > 0) {

                            if (typeofbind === "export") {
                                model.grid.exportarray = [];
                                model.grid.exportarray = response.data;
                                var options = {
                                    headers: true,
                                    columns: [{
                                            columnid: 'ProfileID',
                                            title: 'ProfileID'
                                        }, {
                                            columnid: 'FirstName',
                                            title: 'FirstName'
                                        }, {
                                            columnid: 'LastName',
                                            title: 'LastName'
                                        },
                                        {
                                            columnid: 'Caste',
                                            title: 'Caste'
                                        },
                                        {
                                            columnid: 'DOR',
                                            title: 'DOR'
                                        },
                                        {
                                            columnid: 'ProfileOwner',
                                            title: 'ProfileOwner'
                                        },
                                        {
                                            columnid: 'Ticket',
                                            title: 'Ticket'
                                        }
                                    ]
                                };

                                alasql('SELECT ProfileID as ProfileID,FirstName,LastName,Caste,DOR,ProfileOwner,TicketHistoryID as Ticket  INTO  XLSX("EditReports.xlsx",?) FROM ?', [options, model.grid.exportarray]);

                            } else if (typeofbind === 'slide') {
                                model.topage = to;
                                model.slide.totalRecords = response.data[0].TotalRows;
                                if (parseInt(from) === 1) {
                                    model.slide.setSlides(response.data, model.topage, "regvali");
                                    modelpopupopenmethod.showPopup('myprofileSlide.html', model.scope, 'lg', "myregvaliprofile");
                                } else {
                                    model.slide.addSlides(response.data, model.slides, parseInt(to), "regvali");
                                }

                            } else {
                                model.grid.topage = to;
                                model.opendiv = false;
                                _.map(response.data, function(item) {
                                    item.rowtype = model.rowStyle(item);
                                });

                                model.activeCount = response.data[0].ActiveCount;
                                model.deleteCount = response.data[0].DeletedCount;
                                model.settleCount = response.data[0].SettledCount;
                                model.inactiveCount = response.data[0].InActiveCount;
                                model.mmserisCount = response.data[0].MMSerious;
                                model.grid.TotalRows = response.data[0].TotalRows;
                                model.grid.setData(response.data);
                            }
                        } else {
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', 'No records found', 4500);
                        }
                    });

                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please enter atleast one field', 4500);
                }
            };

            model.slide.slidebind = function(old, news, array) {
                if (parseInt(model.topage) - parseInt(news) === 4) {
                    model.getSearchData((model.topage) + 1, (model.topage) + 10, 'slide', model.ddlApplicationStatus);
                }
            };

            model.reset = function() {
                model.txtFFMFNATIVE =
                    model.txtFatherName =
                    model.txtMotherName =
                    model.txtFFName =
                    model.txtMFName =
                    model.txtMFSurName =
                    model.txtCFFFSurName =
                    model.txtCName =
                    model.ddlCaste =
                    model.txtAllPhones =
                    model.txtAllEmails =
                    model.ddlApplicationStatus =
                    model.rbtGender = '';
            };
            model.backtosearch = function() {
                model.grid.data = [];
                model.grid.TotalRows = '';
                model.opendiv = false;;
            };
            return model.init();
        }
    }
})();