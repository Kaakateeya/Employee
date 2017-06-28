(function() {
    'use strict';


    angular
        .module('Kaakateeya')
        .factory('myProfileModel', ['$http', 'myProfileservice', 'authSvc', 'complex-grid-config', 'modelpopupopenmethod', 'alert', 'SelectBindServiceApp',
            '$uibModal', '$timeout', 'complex-slide-config', 'modelpopupopenmethod', '$filter', 'arrayConstantsreg',
            function(http, myProfileservice, authSvc, config, modelpopupopenmethod, alertss,
                SelectBindServiceApp, uibModal, timeout, configslide, commonpage, filter, arrayConstants) {
                var model = {};
                model.grid = config;
                model.slide = {};
                model.slide.config = configslide;
                model.mpObj = {};
                model.empid = model.slide.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                model.opendiv = true;
                model.scope = {};
                model.slide.templateUrl = "templates/myprofileSlide.html";
                model.slide.headettemp = "templates/myprofileheader.html";
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
                        model.maritalstatusarray = arrayConstants.MaritalStatus;
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
                    var paidstatusclass = paid === true ? 'paidclass' : 'unpaid';
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
                    // var paid = "<a style='cursor:pointer;'>Factsheet</a>&nbsp;&nbsp;&nbsp;<a style='' >Tickets</a>&nbsp;&nbsp;&nbsp;<a style='cursor:pointer;' >Servicelog</a>" +
                    //     "&nbsp;&nbsp;&nbsp;<a ng-click='model.showphoto(" + row.Cust_ID + ");' class='" + photodisbled + "'>" + row.UploadedPhotoscount + " / " + row.PhotoshopCount + "</a>" +
                    //     "&nbsp;&nbsp;&nbsp;<a class='oukuCls " + stronlineliteclass + "' ng-click='model.RedirectPayment(" + row.ProfileID + ");'>" + row.onlinepaid + "</a>/<a class='oukuCls " + strofflineliteclass + "' ng-click='model.RedirectPayment(" + row.ProfileID + ");' >" + row.offlinepaid + "</a>&nbsp;&nbsp;&nbsp;" +
                    //     "<label class='fontweight'>" + row.OwnerName + "</label>";
                    var paidstatus = row.paid === true ? "Paid" : "UnPaid";
                    var paid = "<a style='cursor:pointer;'>Factsheet</a>&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);'  ng-click='model.tickethistorypopup(" + row.Emp_Ticket_ID + ");'>Tickets</a>&nbsp;&nbsp;&nbsp;<a style='cursor:pointer;' >Servicelog</a>" +
                        "&nbsp;&nbsp;&nbsp;<a ng-click='model.showphoto(" + row.Cust_ID + ");' class='" + photodisbled + "'>" + row.UploadedPhotoscount + " / " + row.PhotoshopCount + "</a>" +
                        "&nbsp;&nbsp;&nbsp;<a ng-class='model.paidstatusclass(" + row.paid + ")' ng-click='model.RedirectPayment(" + row.ProfileID + ");'>" + paidstatus + "</a>&nbsp;&nbsp;&nbsp;" +
                        "<label class='fontweight'>" + row.OwnerName + "</label>";
                    return paid;
                };
                model.grid.tickethistorypopup = function(TicketID) {
                    if (TicketID) {
                        model.marketingTicketid = TicketID;
                        commonpage.showPopupphotopoup('marketpopup.html', model.scope, 'md', "modalclassdashboardphotopopup");
                    }
                };
                model.showphoto = function(custid) {
                    modelpopupopenmethod.ShowPhotoPopup(custid, model.scope);
                };
                model.grid.RedirectPayment = function(profileid) {
                    window.open("EmployeePayments" + "?profileid=" + profileid, "_blank");
                };
                model.horoTemplate = function(row) {
                    var paid = row.HoroscopeStatus === 1 ? "<img  src='src/images/ico_horoscope.jpg' class='horoImgcls'>" : "";
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
                model.MyprofileResult = function(obj, from, to, type, flagtype) {
                    model.topage = to;
                    var inputobj = {
                        Empid: model.empid,
                        Kmpl: obj.txtKMPLID,
                        Profileid: obj.txtProfileID,
                        //  model.chkVal(obj.txtProfileID),
                        HighConfidential: obj.chkHighConfidential,
                        Confidential: obj.chkIsConfidential,
                        Renewal: obj.chkRenewal,
                        GenderID: obj.rdnGender,
                        // Gender: gettextradiobuttons(),
                        Surname: obj.txtSurName,
                        Chksurname: obj.chkSurName,
                        FirstName: obj.txtFirstname,
                        chkfirstname: obj.chkFirstname,
                        TypeofprofileID: obj.rdnprofileType,
                        // TypeofProfile: getTexttypeofprofile(),
                        ApplicationstatusID: model.arrayToString(obj.ddlApplicationStatus),
                        // Applicationstatus: getvaluestext('#lstapplicationstatus'),
                        MarketingownerID: model.arrayToString(obj.ddlMarketingOwner),
                        // Marketingowner: getvaluestext('#ddlMarketingowner'),
                        BranchID: model.arrayToString(obj.ddlBranch),
                        // Branch: getvaluestext('#lstbranch'),
                        CasteID: model.arrayToString(obj.ddlCaste),
                        // Caste: getvaluestext('#ddlcaste'),
                        OwneroftheprofileID: model.arrayToString(obj.ddlProfileOwner),
                        // Owneroftheprofile: getvaluestext('#OwneroftheProfile'),
                        HavingprofilesID: model.arrayToString(obj.ddlHavingProfiles),
                        // Havingprofiles: gethavingprofiletext('#lsthavingprofiles'),
                        Assigneddatefromdate: obj.txtAssignFromdate !== '' && obj.txtAssignFromdate !== undefined ? filter('date')(obj.txtAssignFromdate, 'yyyy/MM/dd') : '',

                        Assigneddatetodate: obj.txtToAssignedDate !== '' && obj.txtToAssignedDate !== undefined ? filter('date')(obj.txtToAssignedDate, 'yyyy/MM/dd') : '',
                        DORFromdate: obj.txtRegFromDate !== '' && obj.txtRegFromDate !== undefined ? filter('date')(obj.txtRegFromDate, 'yyyy/MM/dd') : '',
                        // helpService.checkstringvalue(model[item.ngModelFrom]) ? filter('date')(model[item.ngModelFrom], 'MM/dd/yyyy') : null;
                        DORTodate: obj.txtRegToDate !== '' && obj.txtRegToDate !== undefined ? filter('date')(obj.txtRegToDate, 'yyyy/MM/dd') : '',
                        FatherName: obj.txtFatherName,
                        MotherName: obj.txtMotherName,
                        LogoutId: obj.rdnWebsiteLogin,
                        // Logout: gettextweblogin(),
                        chkKmplexperiry: obj.chkkmplExpiry,
                        // previousownerID: getvalues('#lstpreviousowner'),
                        // previousowner: getvaluestext('#lstpreviousowner'),
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
                        { text: 'AllLinks', key: '', type: 'morelinks', templateUrl: model.allLinksTemplateDUrl },
                    ];
                    myProfileservice.getMyprofileSlide(inputobj).then(function(response) {
                        if (_.isArray(response.data) && response.data.length > 0) {
                            if (type === 'grid') {
                                model.opendiv = false;
                                model.grid.TotalRows = response.data[0].TotalRows;
                                model.grid.setData(response.data);
                                model.gridArray = response.data;
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
                                    modelpopupopenmethod.showPopup('myprofileSlide.html', model.scope, 'lg', "myprofileslide");
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
                    var from = val === 1 ? 1 : to - 99;
                    model.MyprofileResult(model.mpObj, from, to, 'grid', 1);
                };
                model.grid.exportexcel = function(topage) {
                    model.MyprofileResult(model.mpObj, 1, topage, 'excel', 1);
                };
                model.close = function() {
                    modelpopupopenmethod.closepopup();
                };

                configslide.slidebind = function(old, news, array) {
                    if (parseInt(model.topage) - parseInt(news) === 4) {
                        model.MyprofileResult(model.mpObj, (model.topage) + 1, (model.topage) + 10, 'slide', 0);
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
                    modelpopupopenmethod.closepopup();
                };
                model.destroy = function() {
                    configslide.reset();
                };
                model.slide.tickethistorypopup = function(TicketID) {
                    model.marketingTicketid = TicketID;
                    commonpage.showPopupphotopoup('market.html', model.scope, 'md', "modalclassdashboardphotopopup");
                };
                return model.MyProfilePageLoad();
            }
        ]);

})(angular);