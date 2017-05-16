(function() {
    'use strict';

    function factory(http, myProfileservice, authSvc, config, modelpopupopenmethod, alertss, SelectBindServiceApp, uibModal, timeout, configslide, commonpage) {
         return function() {
        var model = {};

        model.grid = config;
        model.slide = configslide;

        model.mpObj = {};
        model.empid = model.slide.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
        model.opendiv = true;
        model.scope = {};
        model.slide.templateUrl = "templates/myprofileSlide.html";
        //  model.slide.headettemp = "myprofileheader.html";
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
            dateFormat: 'mm/dd/yy'
        };


        model.displayArrayprofile = function(arr, topage) {
            model.headervisileble = true;
            if (topage === parseInt(10)) {
                model.slides = [];
            }
            $.each(arr, function(index, item) {
                model.data = [];
                model.data.push({
                    label: 'ProfileID',
                    value: '',
                    ProfileID: item.ProfileID,
                    KMPLID: item.KMPLID,
                    paid: item.paid,
                    IsConfidential: item.IsConfidential,
                    SuperConfidentila: item.SuperConfidentila,
                    HoroscopeStatus: item.HoroscopeStatus,
                    HoroscopeImage: item.HoroScopeImage
                });
                model.data.push({ label: 'Name', value: item.LastName + ' ' + item.FirstName, style: item.NoOfBrothers == "0" && item.NoOfSisters == "0" ? "style= color:DarkViolet;" : "style= color:Black;" });
                model.data.push({ label: 'Caste', value: item.mothertongue + "-" + item.Caste });
                model.data.push({ label: 'Dor', value: item.RegistrationDate });
                model.data.push({ label: 'Profile Grade', value: item.ProfileGrade == "1" ? "A" : (item.ProfileGrade == "2" ? "B" : (item.ProfileGrade == "3" ? "C" : "--")) });
                model.slides.push({
                    itmArr: model.data,
                    custPhoto: item.Photo,
                    Custid: item.Cust_ID,
                    lastlogin: item.LastLoginDate,
                    logincount: item.LoginCount,
                    matkteingticket: item.TicketID,
                    matchmarktingcount: item.MatchMeetingCount,
                    ownername: item.EmpName,
                    branch: item.KMPLID,
                    reg: item.RegistrationDate,
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
                    Cust_NotificationID: item.Cust_NotificationID,
                    CategoryID: item.CategoryID,
                    ActionType: item.ActionType,
                    ReadStatus: item.ReadStatus,
                    Tickets: item.Tickets,
                    TicketID: item.TicketID,
                    onlinepaidcls: item.onlinepaidcls,
                    onlinepaid: item.onlinepaid,
                    offlinepaidcls: item.offlinepaidcls,
                    offlinepaid: item.offlinepaid,
                    educationspecialisation: item.educationspecialisation,
                    currency: item.currency,
                    countrylivingin: item.countrylivingin,
                    UploadedPhotoscount: item.UploadedPhotoscount,
                    TOB: item.TOB,
                    SubCaste: item.SubCaste,
                    Star: item.Star,
                    Profession: item.Profession,
                    PlaceOfBirth: item.PlaceOfBirth,
                    MFNative: item.MFNative

                });
            });
            return model.slides;
        };

        model.MyProfilePageLoad = function() {
            myProfileservice.getMyprofilebind(1, 2, '').then(function(response) {
                model.mpObj.ddlProfileOwner = model.empid;
                model.applicationStatusarray = [];
                model.Castearray = [];
                model.ProfileOwnerarray = [];
                model.Brancharray = [];
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
        };

        model.arrayToString = function(string) {
            return _.isArray(string) ? string.join(',') : null;
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
            model.mpObj.ddlApplicationStatus = [54];
            model.mpObj.ddlCaste = [402];
        };

        model.allLinksTemplateDUrl = function(row) {
            var stronlineliteclass = row.onlinepaidcls == "light" ? row.onlinepaidcls + ' Linkdisabled' : row.onlinepaidcls;
            var strofflineliteclass = row.offlinepaidcls == "light" ? row.offlinepaidcls + ' Linkdisabled' : row.offlinepaidcls;
            var photodisbled = row.PhotoshopCount == 0 ? 'Linkdisabled' : "";
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
            window.open('/Viewfullprofile/' + row.ProfileID, '_blank');
        };
        model.horoscopeimage = function(row) {
            model.image = row.HoroScopeImage;
            if ((row.HoroScopeImage).indexOf('.html') === -1)
                modelpopupopenmethod.showPopup('templates/bindImagePopup.html', model.scope, '', "");
            else
                window.open(row.HoroScopeImage, '_blank');
        };

        model.MyprofileResult = function(obj, from, to, type, flagtype) {
            model.topage = to;
            var inputobj = {
                Empid: model.empid,
                Kmpl: obj.txtKMPLID,
                Profileid: obj.txtProfileID,
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
                Assigneddatefromdate: obj.txtAssignFromdate !== '' && obj.txtAssignFromdate !== undefined ? moment(obj.txtAssignFromdate).format('DD-MM-YYYY') : '',
                Assigneddatetodate: obj.txtToAssignedDate !== '' && obj.txtToAssignedDate !== undefined ? moment(obj.txtToAssignedDate).format('DD-MM-YYYY') : '',
                DORFromdate: obj.txtRegFromDate !== '' && obj.txtRegFromDate !== undefined ? moment(obj.txtRegFromDate).format('DD-MM-YYYY') : '',
                DORTodate: obj.txtRegToDate !== '' && obj.txtRegToDate !== undefined ? moment(obj.txtRegToDate).format('DD-MM-YYYY') : '',
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
                intTableType: flagtype
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
                        alasql('SELECT ProfileID,GenderID as Gender,FirstName,LastName as SurName,Caste,RegistrationDate INTO  XLSX("john.xlsx",?) FROM ?', [options, model.grid.exportarray]);

                    } else {
                        model.slide.totalRecords = response.data[0].TotalRows;
                        if (parseInt(from) === 1) {
                            model.slide.setSlides(response.data, model.topage, "myprofile");
                            modelpopupopenmethod.showPopup('myprofileSlide.html', model.scope, 'lg', "myprofileslide");
                        } else {
                            model.slide.addSlides(response.data, model.slides, parseInt(to), "myprofile");
                        }
                    }
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'No records found', 4500);
                }
            });

        };
        model.grid.pagechange = function(val) {
            var to = val * 10;
            var from = val === 1 ? 1 : to - 9;
            model.MyprofileResult(model.mpObj, from, to, 'grid', 1);
        };
        model.grid.exportexcel = function(topage) {
            model.MyprofileResult(model.mpObj, 1, topage, 'excel', 1);
        };
        model.close = function() {
            modelpopupopenmethod.closepopup();
        };

        model.slide.slidebind = function(old, news, array) {
            if (parseInt(model.topage) - parseInt(news) === 4) {
                model.MyprofileResult(model.mpObj, (model.topage) + 1, (model.topage) + 10, 'slide', 0);
            }
        };
        // slide events
        model.slide.redirectEdit = function(custid, type) {
            window.open('/' + type + '/' + custid, '_blank');
        };
        model.slide.viewfullprofile = function(ProfileID) {
            window.open('/Viewfullprofile/' + ProfileID, '_blank');
        };
        model.slide.close = function() {
            modelpopupopenmethod.closepopuppoptopopup();
        };
        model.slide.closemainpopup = function() {
            modelpopupopenmethod.closepopup();
        };



        return model;
    };
    }
    angular
        .module('Kaakateeya')
        .factory('myProfileModel', factory);
    factory.$inject = ['$http', 'myProfileservice', 'authSvc', 'complex-grid-config', 'modelpopupopenmethod', 'alert', 'SelectBindServiceApp', '$uibModal', '$timeout', 'complex-slide-config', 'modelpopupopenmethod'];

})(angular);