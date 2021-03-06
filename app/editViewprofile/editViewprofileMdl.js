(function(angular) {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('editViewprofileModel', ['$http', 'editViewprofileservice', '$state', 'helperservice', 'complex-grid-config', 'alert', 'modelpopupopenmethod', 'authSvc', 'complex-slide-config', function($http, ViewAllCustomerService, state, helpService, config, alerts, modelpopupopenmethod, authSvc, configslide) {

            var model = {};
            var modelinactive = {};
            model.slide = {};
            model.slide.config = configslide;
            model.showplus = true;
            model.tablearray = [];
            model.obj = {};
            model.opendiv = true;
            model.slide.empid = model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
            model.totalrowsshow = false;
            model.showsearchrows = false;
            model.showsearch = true;
            model.showpaging = true;
            model.myprofileexcel = false;
            model.normalexcel = false;
            model.slide.templateUrl = "templates/myprofileSlide.html";
            model.slide.config.headettemp = "myprofileheader.html";
            model.gridArray = [];
            model.init = function() {
                modelinactive = {};
                return model;
            };
            model.displayArrayeidt = function(arr, topage) {
                model.slide.headervisileble = true;
                if (topage === parseInt(10)) {
                    model.slides = [];
                }
                $.each(arr, function(index, item) {
                    model.datas = [];
                    model.datas.push({
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
                    //Emp_Ticket_ID
                    model.datas.push({ label: 'Name', value: item.LastName + ' ' + item.FirstName, style: item.NoOfBrothers == "0" && item.NoOfSisters == "0" ? "style= color:DarkViolet;" : "style= color:Black;" });
                    model.datas.push({ label: 'Caste', value: item.mothertongue + "-" + item.Caste });
                    model.datas.push({ label: 'Dor', value: item.RegistrationDate });
                    model.datas.push({ label: 'Profile Grade', value: item.ProfileGrade == "1" ? "A" : (item.ProfileGrade == "2" ? "B" : (item.ProfileGrade == "3" ? "C" : "--")) });
                    model.slides.push({
                        itmArr: model.datas,
                        custPhoto: item.Photo,
                        Custid: item.Cust_ID,
                        lastlogin: item.LastLoginDate,
                        logincount: item.LoginCount,
                        matkteingticket: item.TicketID,
                        matchmarktingcount: item.MatchMeetingCount,
                        ownername: item.ProfileOwnername,
                        branch: item.KMPLID,
                        reg: item.RegistrationDate,
                        SAForm: item.SAForm,
                        primarynumber: item.Primarynumber,
                        primaryemail: item.Primaryemail,
                        CreatedDate: item.CreatedDate,
                        SRCount: item.SRCount,
                        PaidAmount: item.PaidAmount,
                        ExpiryDate: item.ExpiryDate,
                        Points: item.Points,
                        mobilestatus: item.CNumberVerStatus,
                        emailstatus: item.CEmailVerStatus,
                        UserName: item.EmpUserName,
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
                        TicketID: item.Emp_Ticket_ID,
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
            model.profileidstatus = [
                { value: 54, name: 'Active' },
                { value: 57, name: 'Settled' },
                { value: 56, name: 'Deleted' },
                { value: 55, name: 'Inactive' },
                { value: 395, name: 'MMSeries' }
            ];
            model.arrayToString = function(string) {
                return string !== null ? (string.split(',')).map(Number) : null;
            };

            model.obj.chkProfileIDsts = model.arrayToString('54');
            model.returnnullvalue = function(value) {
                var obj = helpService.checkstringvalue(value) && (value.toString()) !== "0" && (value.toString()) !== 0 ? (value.toString()) : null;
                return obj;
            };

            model.ProfileIdTemplateDUrl = function(row) {
                var paidstatusclass = row.PaidSatus === 1 ? 'paidclass' : 'unpaid';
                // class=" + paidstatusclass + "
                var paid = "<a style='cursor:pointer;' class=" + paidstatusclass + "  href='/Education/" + row.CustID + "' >" + row.ProfileID + row.Confidential + "</a>";
                return paid;
            };

            model.ProfileOwnerImg = function(row) {
                var img = row.ProfileStatusID === 57 || row.ProfileStatusID === 393 ? 'src/images/settleimage_new.png' : (row.ProfileStatusID === 56 || row.ProfileStatusID === 394 ? 'src/images/deleteimage.png' : (row.ProfileStatusID === 55 ? 'src/images/imgInActive.png' : ''));
                var dd = img !== '' ? img : '';
                var paid = row.ProfileOwner !== null && row.ProfileOwner !== '' ? "<span class='red'>" + row.ProfileOwner + "</span> " + (img !== "" ? "<img class='profileImage'  src=" + img + "></img>" : (row.ProfileStatusID === 395 ? 'M?' : '')) : "<span class='red linkdisabled'>--</span>";
                return paid;
            };

            model.profileownerMethod = function(row) {
                var type = row.ProfileStatusID === 57 || row.ProfileStatusID === 393 ? 'S' : (row.ProfileStatusID === 56 || row.ProfileStatusID === 394 ? 'D' : (row.ProfileStatusID === 55 ? 'I' : (row.ProfileStatusID === 395 ? 'M' : '')));
                model.typeOfProfile = type;
                if (type === 'M') {
                    ViewAllCustomerService.geMMseriesData(row.ProfileID, model.empid).then(function(response) {
                        model.MMsettleArr = (response.data[0]);
                    });
                } else {
                    ViewAllCustomerService.SettleDeleteInactive(row.CustID, type).then(function(response) {
                        model.settleArr = JSON.parse(response.data[0])[0];
                    });
                }
                modelpopupopenmethod.showPopup('settlePopup.html', model.scope, 'lg', 'SettleDelete');
            };
            model.closepopup = function() {
                modelpopupopenmethod.closepopup();
            };
            model.rowStyle = function(row) {
                var classes = ['settled', 'Deleted', 'inactive'];
                // alert(row.ProfileStatusID);
                var test = [
                    { StatusID: 57, classes: 'settled' },
                    { StatusID: 393, classes: 'settled' },
                    { StatusID: 56, classes: 'Deleted' },
                    { StatusID: 394, classes: 'Deleted' },
                    { StatusID: 55, classes: 'inactive' }
                ];
                return _.where(test, { StatusID: row.ProfileStatusID }).length > 0 ? _.where(test, { StatusID: row.ProfileStatusID })[0].classes : ''
            };
            model.GenderStr = function(row) {
                return row.GenderID === 1 ? 'Male' : 'Female';
            };
            model.columns = [
                { text: 'Profile ID', key: 'ProfileID', type: 'custom', templateUrl: model.ProfileIdTemplateDUrl, rowtype: "success" },
                { text: 'SurName', key: 'LastName', type: 'label' },
                { text: 'Name', key: 'FirstName', type: 'label' },
                { text: 'Caste', key: 'CasteName', type: 'label' },
                { text: 'Profile Owner', key: 'ProfileOwner', type: 'customlink', templateUrl: model.ProfileOwnerImg, method: model.profileownerMethod },
                { text: 'Height', key: 'Height', type: 'label' },
                { text: 'Login', key: 'LoginStatus', type: 'label' },
                { text: 'Education', key: 'educationgroup', type: 'label' },
                { text: 'Profession', key: 'Profession', type: 'label' },
                { text: 'Dob', key: 'Age', type: 'label', width: '150px' },
                { text: 'Gender', key: 'GenderID', type: 'custom', templateUrl: model.GenderStr },
            ];
            model.ViewAllsubmit = function(inpuobj, from, to, typeofbind) {
                model.topage = to;
                if (from === 1) {
                    if (typeofbind === "slideshow") {
                        model.slide.totalRecords = undefined;
                    } else if (!typeofbind) {
                        model.TotalRows = undefined;
                    }
                }
                model.objectedit = {
                    genderID: model.obj.rdnGender,
                    strFName: inpuobj.Name !== undefined ? inpuobj.Name : "",
                    strSurName: inpuobj.surname !== undefined ? inpuobj.surname : "",
                    strProfileID: inpuobj.ProfileIDsearch !== undefined ? inpuobj.ProfileIDsearch : "",
                    strKMMLID: inpuobj.KmlProfileID !== undefined ? inpuobj.KmlProfileID : "",
                    profileStatus: inpuobj.chkProfileIDsts !== undefined ? model.returnnullvalue(inpuobj.chkProfileIDsts) : "",
                    intStartIndex: from,
                    intEndIndex: to,
                    intEmpID: model.empid,
                    isSlide: typeofbind === "slideshow" ? 1 : 0
                };
                ViewAllCustomerService.getViewCustomerData(model.objectedit).then(function(response) {
                    model.isDisabledsubmit = false;
                    if (_.isArray(response.data) && response.data.length > 0) {
                        model.TotalRows = response.data[0].TotalRows;
                        model.showtaotalrows = false;
                        model.totalrowsshow = true;
                        _.map(response.data, function(item) {
                            item.rowtype = model.rowStyle(item);
                        });
                        // model.opendiv = false;
                        if (typeofbind === 'grid') {
                            model.pageSize = 10;
                            model.data = (response.data);
                            model.gridArray = response.data;

                        } else if (typeofbind === "slideshow") {
                            model.slide.totalRecords = response.data[0].TotalRows;
                            if (parseInt(from) === 1) {
                                configslide.setSlides((model.displayArrayeidt(response.data, to)), to, "normal");
                                if (model.slideshowopenflag !== 1) {
                                    model.slideshowopenflag = 1;
                                    modelpopupopenmethod.showPopup('slideshoweditd.html', model.scope, 'lg', "myprofileslide");
                                }
                            } else {
                                configslide.addSlides((model.displayArrayeidt(response.data, to)), response.data, parseInt(to), "normal");
                            }
                        } else {
                            model.exportarray = [];
                            model.exportarray = response.data;
                            var options = {
                                headers: true,
                            };
                            alasql('SELECT ProfileID,FirstName,LastName as SurName,CasteName as Caste,ProfileOwner,Height,LoginStatus as Loagin,educationgroup as Education,Profession,Age as DOB,GenderID as Gender INTO  XLSX("EditReports.xlsx",?) FROM ?', [options, model.exportarray]);
                        }
                    } else {
                        if (from === parseInt(1)) {
                            model.data = [];
                            if (inpuobj.chkProfileIDsts !== undefined && model.returnnullvalue(inpuobj.chkProfileIDsts) === "54") {
                                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'This profile Not in Active Status', 4500);
                            } else if (inpuobj.chkProfileIDsts !== undefined && model.returnnullvalue(inpuobj.chkProfileIDsts) === "55") {
                                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'This profile Not in Inactive Status', 4500);
                            } else if (inpuobj.chkProfileIDsts !== undefined && model.returnnullvalue(inpuobj.chkProfileIDsts) === "56") {
                                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'This profile Not in Deleted Status', 4500);
                            } else if (inpuobj.chkProfileIDsts !== undefined && model.returnnullvalue(inpuobj.chkProfileIDsts) === "57") {
                                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'This profile Not in Settled Status', 4500);
                            } else {
                                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Profileid Not Exist', 4500);
                            }
                        }
                    }
                });
                return model;
            };

            model.editLink = function(custid) {
                state.go("/", {});
            };
            model.redirectEdit = function(Custid) {

                $state.go("editview.editEducation", { CustID: Custid });
            };

            model.chkChange = function() {
                model.ViewAllsubmit(model.obj, 1, 100, 'grid');
            };

            // model.genderChange = function(val) {
            //     if (model.gridArray.length > 0 && val !== undefined && val !== '' && val !== null) {
            //         var arr = val === 3 || val === '3' ? model.gridArray : _.where(model.gridArray, { GenderID: parseInt(val) });
            //         model.data = arr;
            //     }
            // };

            model.pagechange = function(val) {
                var to = val * 100;
                var from = val === 1 ? 1 : to - 99;
                model.ViewAllsubmit(model.obj, from, to, 'grid');
            };
            model.exportexcel = function(array, columns) {
                model.ViewAllsubmit(model.obj, 1, model.TotalRows, "export");
            };

            model.slideshowedit = function() {
                model.ViewAllsubmit(model.obj, 1, 10, "slideshow");
            };

            model.slide.slidebind = function(old, news, array) {
                if (parseInt(model.topage) - parseInt(news) === 4) {
                    model.ViewAllsubmit(model.obj, (model.topage) + 1, (model.topage) + 10, "slideshow");
                }
            };

            model.slide.closemainpopup = function() {
                model.slideshowopenflag = 0;
                modelpopupopenmethod.closepopup();
            };
            model.slide.tickethistorypopup = function(TicketID) {
                model.marketingTicketid = TicketID;
                modelpopupopenmethod.showPopupphotopoup('market.html', model.scope, 'md', "modalclassdashboardphotopopup");
            };
            model.destroy = function() {
                configslide.reset();
            };

            model.ViewProfile = function(ProfileID) {
                window.open('/Viewfullprofile/' + ProfileID + '/0', '_blank');
            };


            return model.init();
        }]);

})(angular);