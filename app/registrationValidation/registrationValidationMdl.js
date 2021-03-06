(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('registrationValidationModel', ['registrationValidationservice', 'authSvc', 'complex-grid-config', 'alert', 'complex-slide-config', 'modelpopupopenmethod', 'single-grid-config', function(svc, authSvc, gridConfig, alertss, slideConfig, modelpopupopenmethod, sinlegrid) {
            var model = {},
                empid = '';
            model.slide = {};
            model.slide.config = slideConfig;
            model.SingleGrid = sinlegrid;
            model.scope = {};
            model.grid = {};
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
            model.slide.config.headettemp = "templates/myprofileheader.html";
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
                model.slideshowopenedflag = 0;
                modelpopupopenmethod.closepopup();
            };
            model.tickethistorypopup = function(row) {
                model.marketingTicketid = row.Emp_Ticket_ID;
                modelpopupopenmethod.showPopupphotopoup('market.html', model.scope, 'md', "modalclassdashboardphotopopup");
            };
            model.ViewTicketmain = function(row) {
                var paid = "<a style='cursor:pointer;' href='javascript:void(0);'>" + row.TicketHistoryID + "</a>";
                return paid;
            };
            model.init = function() {
                empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                model.grid.columns = [
                    { text: 'Profile ID', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
                    { text: 'FirstName', key: 'FirstName', type: 'label' },
                    { text: 'LastName', key: 'LastName', type: 'label' },
                    { text: 'Caste', key: 'Caste', type: 'label' },
                    { text: 'DOR', key: 'DOR', type: 'label' },
                    { text: 'ProfileOwner', key: 'ProfileOwner', type: 'label' },
                    { text: 'Ticket', key: 'ProfileID', type: 'customlink', templateUrl: model.ViewTicketmain, method: model.tickethistorypopup }
                ];
                return model;
            };

            model.checkTxt = function(val) {
                return val !== '' && val !== undefined ? val : '';
            };

            model.ProfileIdTemplateDUrl = function(row) {
                var paidstatusclass = row.paid === 1 ? 'paidclass' : 'unpaid';
                var paid = row.ProfileID !== undefined ? "<a class='" + paidstatusclass + "'>" + row.ProfileID + '(' + row.BranchCode + ") </a>" : "";
                return paid;
                // var paid = "<a style='cursor:pointer;'>" + row.ProfileID + '(' + row.BranchCode + ")</a>";
                // return paid;
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

                return _.where(test, { StatusID: parseInt(row.ProfileStatusID) }).length > 0 ? _.where(test, { StatusID: parseInt(row.ProfileStatusID) })[0].classes : '';
            };
            model.grid.exportexcel = function(array, columns) {
                model.getSearchData(1, model.grid.topage, "export", model.ddlApplicationStatus, 0);
            };
            model.grid.pagechange = function(val) {
                var to = val * 100;
                var from = val === 1 ? 1 : to - 99;
                model.getSearchData(from, to, 'grid', model.ddlApplicationStatus, 0);
            };
            model.getSearchData = function(from, to, typeofbind, ApplicationStatus, flag) {
                model.frompage = from;
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
                        strCaste: angular.isArray(model.ddlCaste) && model.ddlCaste.length > 0 ? (model.ddlCaste).join(',') : '',
                        strAllPhones: model.checkTxt(model.txtAllPhones),
                        strAllEmailIds: model.checkTxt(model.txtAllEmails),
                        intAppicationStatusID: model.checkTxt(ApplicationStatus),
                        intGenderID: model.checkTxt(model.rbtGender),
                        intEmpID: empid,
                        i_Startindex: from,
                        i_EndIndex: to,
                        intflag: flag
                    };
                    svc.getRegSearchProfile(input).then(function(response) {
                        model.isDisabledsubmit = false;
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

                                model.slideApplicationStatus = ApplicationStatus;
                                model.topage = to;
                                model.slide.headervisileble = true;
                                model.slide.totalRecords = response.data[0].TotalRows;
                                if (parseInt(from) === 1) {
                                    slideConfig.setSlides(response.data, model.topage, "regvali");
                                    if (model.slideshowopenedflag !== 1) {
                                        model.slideshowopenedflag = 1;
                                        modelpopupopenmethod.showPopup('myprofileSlide.html', model.scope, 'lg', "myregvaliprofile");
                                    }
                                } else {
                                    slideConfig.addSlides(response.data, model.slides, parseInt(to), "regvali");
                                }

                            } else {
                                model.grid.topage = to;
                                model.opendiv = false;
                                _.map(response.data, function(item) {
                                    item.rowtype = model.rowStyle(item);
                                });

                                // model.activeCount = response.data[0].ActiveCount;
                                // model.deleteCount = response.data[0].DeletedCount;
                                // model.settleCount = response.data[0].SettledCount;
                                // model.inactiveCount = response.data[0].InActiveCount;
                                // model.mmserisCount = response.data[0].MMSerious;

                                svc.getRegSearchcounts(input).then(function(rescounts) {
                                    if (_.isArray(rescounts.data) && rescounts.data.length > 0) {
                                        model.activeCount = rescounts.data[0].ActiveCount;
                                        model.deleteCount = rescounts.data[0].DeletedCount;
                                        model.settleCount = rescounts.data[0].SettledCount;
                                        model.inactiveCount = rescounts.data[0].InActiveCount;
                                        model.mmserisCount = rescounts.data[0].MMSerious;
                                    }
                                });
                                model.grid.TotalRows = response.data[0].TotalRows;
                                model.grid.data = (response.data);
                            }
                        } else {
                            if (from === 1)
                                if (flag === 0) {
                                    model.grid.data = [];
                                }
                            if (model.checkTxt(model.txtAllPhones) !== '') {
                                modelpopupopenmethod.showPopupphotopoup('nodatafoundrecords.html', model.scope, 'md', "modalclassnorecordss");
                            } else {
                                // alertss.RegistrationValidationalerts(model.scope, 'alert-danger', 'No records found', 4500, 1, input.strAllPhones);
                                alertss.timeoutoldalerts(model.scope, 'alert-danger', 'No records found', 4500);
                            }
                        }
                    });

                } else {
                    model.isDisabledsubmit = false;
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please enter atleast one field', 4500);
                }
            };
            model.slide.slidebind = function(old, news, array) {
                if (parseInt(model.topage) - parseInt(news) === 4) {
                    model.getSearchData((model.topage) + 1, (model.topage) + 10, 'slide', model.slideApplicationStatus, 1);
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
                model.opendiv = false;
            };
            model.slide.tickethistorypopup = function(TicketID) {
                model.marketingTicketid = TicketID;
                modelpopupopenmethod.showPopupphotopoup('market.html', model.scope, 'md', "modalclassdashboardphotopopup");
            };
            model.destroy = function() {
                slideConfig.reset();
            };
            return model.init();
        }]);

})();