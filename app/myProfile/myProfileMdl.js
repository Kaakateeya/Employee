(function() {
    'use strict';


    angular
        .module('Kaakateeya')
        .factory('myProfileModel', ['$http', 'myProfileservice', 'authSvc', 'complex-grid-config', 'modelpopupopenmethod', 'alert', 'SelectBindServiceApp',
            '$uibModal', '$timeout', 'complex-slide-config', 'modelpopupopenmethod', '$filter', 'arrayConstants', '$linq',
            function(http, myProfileservice, authSvc, config, modelpopupopenmethod, alertss,
                SelectBindServiceApp, uibModal, timeout, configslide, commonpage, filter, arrayConstants, $linq) {
                var model = {};
                // model.grid = config;
                model.slide = {};
                model.grid = {};
                model.slide.config = configslide;
                model.slide.dobshow = true;
                model.mpObj = {};
                model.empid = model.slide.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                model.opendiv = true;
                model.scope = {};
                model.grid.showsearchrows = true;
                model.grid.showsearch = true;
                model.grid.showpaging = true;
                model.grid.myprofileexcel = true;
                model.grid.normalexcel = true;
                model.dateOptions = {
                    changeMonth: true,
                    changeYear: true,
                    yearRange: "-40:+5",
                    dateFormat: 'dd/mm/yy',
                    minDate: null,
                    maxDate: null
                };
                model.showplus = false;

                model.MyProfilePageLoad = function() {
                    myProfileservice.getMyprofilebind(1, 2, '').then(function(response) {
                        model.mpObj.ddlProfileOwner = model.empid;
                        model.applicationStatusarray = [];
                        model.Castearray = [];
                        model.ProfileOwnerarray = [];
                        model.Brancharray = [];
                        model.maritalstatusarray = [];
                        model.maritalstatusarray = arrayConstants.MaritalStatusreg;
                        model.mpObj.ddlProfileOwner = [parseInt(model.empid)];
                        _.each(response.data, function(item) {
                            switch (item.CountryCode) {
                                case "Application Status":
                                    model.applicationStatusarray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                    break;
                                case "Caste":
                                    model.Castearray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                    break;
                                case "Profile Owner":
                                    model.ProfileOwnerarray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                    break;
                                case "Branch":
                                    model.Brancharray.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                    break;
                            }
                        });
                    });
                    return model;
                };

                model.arrayToString = function(string) {
                    return _.isArray(string) && string.length > 0 ? string.join(',') : null;
                };
                model.grid.paidstatusclass = function(paid) {
                    var paidstatusclass = paid === true ? 'paidclass' : 'unpaid Linkdisabled';
                    return paidstatusclass;
                };
                model.ProfileIdTemplateDUrl = function(row) {
                    var paidstatusclass = row.paid === true ? 'paidclass' : 'unpaid';
                    var paid = "<a class='" + paidstatusclass + "'>" + row.ProfileID + ' (' + row.KMPLID + ')' + "</a>";
                    return paid;
                };
                model.reset = function() {
                    model.mpObj = {};
                    model.mpObj.rdnprofileType = '';
                    model.mpObj.rdnGender = '';
                    model.mpObj.rdnWebsiteLogin = '';
                    model.mpObj.rdncontactsVerified = '';
                    model.mpObj.rdnWebsiteBlocked = '';
                    model.mpObj.txtRegFromDate = undefined;
                    model.mpObj.txtRegToDate = '';
                    model.mpObj.txtAssignFromdate = '';
                    model.mpObj.txtToAssignedDate = '';
                    model.mpObj.ddlApplicationStatus = [54];
                    model.mpObj.ddlCaste = [402];
                    model.mpObj.ddlProfileOwner = [parseInt(model.empid)];
                    model.dateOptions = {
                        changeMonth: true,
                        changeYear: true,
                        yearRange: "-40:+5",
                        dateFormat: 'dd/mm/yy',
                        minDate: null,
                        maxDate: null
                    };
                };

                model.allLinksTemplateDUrl = function(row) {
                    var stronlineliteclass = row.onlinepaidcls == "light" ? row.onlinepaidcls + ' Linkdisabled' : row.onlinepaidcls;
                    var strofflineliteclass = row.offlinepaidcls == "light" ? row.offlinepaidcls + ' Linkdisabled' : row.offlinepaidcls;
                    var photodisbled = row.PhotoshopCount === 0 ? 'Linkdisabled' : "";
                    var paidstatus = row.paid === true ? "Paid" : "UnPaid";
                    var paid = "<a style='cursor:pointer;' ng-click='model.factSheetRedirect();'>Factsheet</a>&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);'  ng-click='model.tickethistorypopup(" + row.Emp_Ticket_ID + ");'>Tickets</a>&nbsp;&nbsp;&nbsp;<a style='cursor:pointer;' ng-click='model.communicationlogredirect(" + JSON.stringify(row.ProfileID) + ");'>Servicelog</a>" +
                        "&nbsp;&nbsp;&nbsp;<a ng-click='model.showphoto(" + row.Cust_ID + ");' class='" + photodisbled + "'>" + row.UploadedPhotoscount + " / " + row.PhotoshopCount + "</a>" +
                        "&nbsp;&nbsp;&nbsp;<a ng-class='model.paidstatusclass(" + row.paid + ")' ng-click='model.RedirectPayment(" + JSON.stringify(row.ProfileID) + ");'>" + paidstatus + "</a>&nbsp;&nbsp;&nbsp;" +
                        "<label class='fontweight'>" + row.OwnerName + "</label>";
                    return paid;
                };

                model.grid.tickethistorypopup = function(TicketID) {
                    if (TicketID) {
                        model.marketingTicketid = TicketID;
                        commonpage.showPopupphotopoup('market.html', model.scope, 'md', "modalclassdashboardphotopopup");
                    }
                };

                model.grid.communicationlogredirect = function(Profileid) {
                    window.open('/communicationLogs?Profileid=' + Profileid, '_blank');
                };

                model.grid.factSheetRedirect = function() {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'comming Soon page', 4500);
                };

                model.grid.showphoto = function(custid) {
                    modelpopupopenmethod.ShowPhotoPopup(custid, model.scope);
                };

                model.grid.RedirectPayment = function(profileid) {
                    if (profileid) {
                        model.profileid = profileid;
                        commonpage.thirdshowPopup('paymentDetailspopup.html', model.scope, 'lg', "modelpayment");
                    }
                };

                model.horoTemplate = function(row) {
                    // var rowww = model.frompage === 1 ? 0 : model.frompage;
                    //  model.frompage = rowww + 1;
                    var paid = row.HoroscopeStatus === 1 ? row.SNo + "<img  src='src/images/ico_horoscope.jpg' class='horoImgcls'>" : row.SNo + "";
                    return paid;
                };
                model.editviewRedirect = function(row) {
                    window.open('/Education/' + row.Cust_ID, '_blank');
                };
                model.ViewProfile = function(row) {
                    window.open('/Viewfullprofile/' + row.ProfileID + '/0', '_blank');
                };
                model.horoscopeimage = function(row) {
                    model.image = row.HoroScopeImage;
                    if ((row.HoroScopeImage).indexOf('.html') === -1)
                        modelpopupopenmethod.showPopup('templates/bindImagePopup.html', model.scope, '', "");
                    else
                        window.open(row.HoroScopeImage, '_blank');
                };
                model.chkVal = function(val) {
                    return val !== undefined && val !== '' ? val : null;
                };

                model.addingserialnumber = function(array) {
                    _.map(array, function(item) {
                        item.SNo = model.SNum;
                        model.SNum++;
                    });
                    return array;
                };


                model.MyprofileResult = function(obj, from, to, type, flagtype) {

                    if (from === 1) {
                        model.SNum = 1;
                    }
                    model.topage = to;
                    var inputobj = {
                        Empid: model.empid,
                        Kmpl: obj.txtKMPLID,
                        Profileid: obj.txtProfileID,
                        HighConfidential: obj.chkHighConfidential,
                        Confidential: obj.chkIsConfidential,
                        Renewal: obj.chkRenewal,
                        GenderID: obj.rdnGender,
                        Surname: obj.txtSurName,
                        Chksurname: obj.chkSurName,
                        FirstName: obj.txtFirstname,
                        chkfirstname: obj.chkFirstname,
                        TypeofprofileID: obj.rdnprofileType,
                        ApplicationstatusID: model.arrayToString(obj.ddlApplicationStatus),
                        MarketingownerID: model.arrayToString(obj.ddlMarketingOwner),
                        BranchID: model.arrayToString(obj.ddlBranch),
                        CasteID: model.arrayToString(obj.ddlCaste),
                        OwneroftheprofileID: model.arrayToString(obj.ddlProfileOwner),
                        HavingprofilesID: model.arrayToString(obj.ddlHavingProfiles),
                        Assigneddatefromdate: obj.txtAssignFromdate !== '' && obj.txtAssignFromdate !== undefined ? filter('date')(obj.txtAssignFromdate, 'yyyy/MM/dd') : '',
                        Assigneddatetodate: obj.txtToAssignedDate !== '' && obj.txtToAssignedDate !== undefined ? filter('date')(obj.txtToAssignedDate, 'yyyy/MM/dd') : '',
                        DORFromdate: obj.txtRegFromDate !== '' && obj.txtRegFromDate !== undefined ? filter('date')(obj.txtRegFromDate, 'yyyy/MM/dd') : '',
                        DORTodate: obj.txtRegToDate !== '' && obj.txtRegToDate !== undefined ? filter('date')(obj.txtRegToDate, 'yyyy/MM/dd') : '',
                        FatherName: obj.txtFatherName,
                        MotherName: obj.txtMotherName,
                        LogoutId: obj.rdnWebsiteLogin,
                        chkKmplexperiry: obj.chkkmplExpiry,
                        verfiedcontacts: obj.rdncontactsVerified,
                        WebsiteBlocked: obj.rdnWebsiteBlocked,
                        pagefrom: from,
                        pageto: to,
                        intTableType: flagtype,
                        v_MaritalStatus: model.arrayToString(obj.ddlMaritalstatus),
                        i_Domacile: obj.rdndocmacile !== undefined && obj.rdndocmacile !== "" && obj.rdndocmacile !== null ? obj.rdndocmacile : null
                    };
                    model.grid.columns = [
                        { text: 'Horo', key: 'HoroScopeImage', type: 'customlink', templateUrl: model.horoTemplate, method: model.horoscopeimage },
                        { text: 'ProfileID', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
                        { text: 'Gender', key: 'GenderID', type: 'label' },
                        { text: 'FirstName', key: 'LastName', type: 'link', method: model.editviewRedirect },
                        { text: 'SurName', key: 'FirstName', type: 'link', method: model.editviewRedirect },
                        { text: 'Caste', key: 'Caste', type: 'label' },
                        { text: 'RegistrationDate', key: 'RegistrationDate', type: 'label' },
                        { text: 'AllLinks', key: 'AllLinks', type: 'morelinks', templateUrl: model.allLinksTemplateDUrl },
                    ];
                    myProfileservice.getMyprofileSlide(inputobj).then(function(response) {
                        model.isDisabledsubmit = false;
                        if (_.isArray(response.data) && response.data.length > 0) {
                            if (type === 'grid') {
                                model.opendiv = false;
                                model.grid.pageSize = 10;
                                model.grid.TotalRows = response.data[0].TotalRows;
                                model.grid.data = model.addingserialnumber(response.data);
                                model.gridArray = response.data;
                                if (from === 1)
                                    model.slidedata = model.grid.data;

                            } else if (type === 'excel') {
                                model.grid.exportarray = [];
                                model.grid.exportarray = response.data;
                                var options = {
                                    headers: true,
                                    columns: [{
                                            columnid: 'ProfileID',
                                            title: 'ProfileID'
                                        }, {
                                            columnid: 'Gender',
                                            title: 'Gender'
                                        }, {
                                            columnid: 'FirstName',
                                            title: 'FirstName'
                                        },
                                        {
                                            columnid: 'SurName',
                                            title: 'SurName'
                                        },
                                        {
                                            columnid: 'Caste',
                                            title: 'Caste'
                                        },
                                        {
                                            columnid: 'RegistrationDate',
                                            title: 'RegistrationDate'
                                        }
                                    ]
                                };
                                alasql('SELECT ProfileID,GenderID as Gender,FirstName,LastName as SurName,Caste,RegistrationDate INTO  XLSX("Reports.xlsx",?) FROM ?', [options, model.grid.exportarray]);
                            } else {
                                model.slide.totalRecords = response.data[0].TotalRows;
                                model.slide.headervisileble = true;
                                if (parseInt(from) === 1) {
                                    configslide.setSlides(response.data, model.topage, "myprofile");
                                    if (model.myprofileslideshowopenflag !== 1) {
                                        model.myprofileslideshowopenflag = 1;
                                        modelpopupopenmethod.showPopup('myprofileSlide.html', model.scope, 'lg', "myprofileslide");
                                    }
                                } else {
                                    configslide.addSlides(response.data, configslide.slides, parseInt(to), "myprofile");
                                }
                            }
                        } else {
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', 'No records found', 4500);
                        }
                    });

                };
                model.grid.pagechange = function(val) {
                    var to = val * 100;
                    var from = model.SNum = val === 1 ? 1 : to - 99;
                    model.MyprofileResult(model.mpObj, from, to, 'grid', 1);
                };
                model.grid.exportexcel = function(topage) {
                    model.MyprofileResult(model.mpObj, 1, topage, 'excel', 1);
                };
                model.close = function() {
                    modelpopupopenmethod.closepopup();
                };

                model.slide.slidebind = function(old, news, array) {
                    if (model.slidedata.length > 0 && model.slide10data.length < model.slidedata.length) {
                        if (parseInt(sliTo) - parseInt(news) === 4) {
                            slidFrom = sliTo;
                            sliTo = sliTo + 10;
                            model.slide10data = model.slide10data.concat(angular.copy(model.slidedata.slice(slidFrom, sliTo)));
                            configslide.addSlides(angular.copy(model.slidedata.slice(slidFrom, sliTo)), configslide.slides, sliTo, "myprofile");
                        }
                    } else {
                        if (parseInt(model.topage) - parseInt(news) === 4) {
                            model.MyprofileResult(model.mpObj, (model.topage) + 1, (model.topage) + 100, 'slide', 0);
                        }
                    }
                };
                // slide events
                model.slide.redirectEdit = function(custid, type) {
                    window.open('/' + type + '/' + custid, '_blank');
                };
                model.slide.viewfullprofile = function(ProfileID) {
                    window.open('/Viewfullprofile/' + ProfileID + '/0', '_blank');
                };
                model.slide.close = function() {
                    modelpopupopenmethod.closepopuppoptopopup();
                };
                model.slide.closemainpopup = function() {
                    model.myprofileslideshowopenflag = 0;
                    modelpopupopenmethod.closepopup();
                };
                model.destroy = function() {
                    configslide.reset();
                };
                model.slide.tickethistorypopup = function(TicketID) {
                    model.marketingTicketid = TicketID;
                    commonpage.showPopupphotopoup('market.html', model.scope, 'md', "modalclassdashboardphotopopup");
                };
                var slidFrom = 0,
                    sliTo = 10;
                model.bindSlide = function() {
                    slidFrom = 0;
                    sliTo = 10;
                    if (model.slidedata.length > 0) {
                        model.slide.totalRecords = model.slidedata[0].TotalRows;
                        model.slide.headervisileble = true;

                        model.slide10data = model.slidedata.slice(slidFrom, sliTo);
                        configslide.setSlides(model.slide10data, 10, "myprofile");
                        if (model.myprofileslideshowopenflag !== 1) {
                            model.myprofileslideshowopenflag = 1;
                            modelpopupopenmethod.showPopup('myprofileSlide.html', model.scope, 'lg', "myprofileslide");
                        }
                    } else {
                        model.MyprofileResult(model.mpObj, 1, 100, 'slide', 0);
                    }
                };

                return model.MyProfilePageLoad();
            }
        ]);

})(angular);