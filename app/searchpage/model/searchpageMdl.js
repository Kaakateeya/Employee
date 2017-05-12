(function(angular) {
    'use strict';

    function factory($http, searchpageServices, arrayConstants, SelectBindServiceApp, getArray, timeout,
        helpService, authSvc, alerts, Commondependency, filter, modelpopupopenmethod, config, $sce,
        expressInterestModel, configgrid) {
        var model = {};
        model = config;
        model.gridtable = configgrid;
        // model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
        // model.isAdmin = authSvc.isAdmin() !== undefined && authSvc.isAdmin() !== null && authSvc.isAdmin() !== "" ? authSvc.isAdmin() : "";
        model.CgetDetails = {};
        model.getpageloadobject = {};
        model.Relationships = [];
        model.slideshowarray = [];
        model.divcontrolls = true;
        model.Cust_ID = null;
        model.selectedIndex = 0;
        model.searchpopuptext = "General Search";
        model.Relationshipname = "";
        model.relationshippopup = null;
        model.typrofsearch = "2";
        model.sidebarnavshow = true;
        model.mySidenavdiv = false;
        model.mystylenamediv = true;
        model.headervisileble = false;
        model.dynamicFunction = '';
        model.slidephotos = [];
        model.divmismatchData = [];
        model.templateUrl = "templates/angularSlide.html";
        model.headettemp = "templates/angularHeader.html";
        model.selectedIndex = 0;
        model.tabsshowhidecontrols = true;
        model.shortlistmodel = {};
        model.opendiv = true;
        model.showsearchrows = true;
        model.showsearch = true;
        model.showpaging = true;
        model.myprofileexcel = true;
        model.normalexcel = true;
        model.gridTableshow = false;
        model.dateOptions = {
            changeMonth: true,
            changeYear: true,
            yearRange: "-40:+5",
            dateFormat: 'mm/dd/yy'
        };
        model.photogradearray = [{ value: 216, name: 'A' },
            { value: 217, name: 'B' },
            { value: 218, name: 'C' },
            { value: 219, name: 'D' }
        ];
        model.returnnullvalue = function(value) {
            var obj = helpService.checkstringvalue(value) && (value.toString()) !== "0" && (value.toString()) !== 0 ? (value.toString()) : null;
            return obj;
        };
        model.arrayToString = function(string) {
            return string !== null && string !== "" ? (string.split(',')).map(Number) : null;
        };
        model.profileidupdate = function(obj) {
            if (model.divcontrollsbind === 0) {
                model.init();
            }
            model.sidebarnavshow = false;
            searchpageServices.getPrimaryCustomerDataResponse(obj.ProfileIDpopup, model.empid).then(function(response) {
                if (response !== null && response.data !== undefined && response.data !== null && response.data !== "") {
                    var data = model.getpageloadobject = response.data;
                    model.Cust_ID = data.Cust_ID;
                    model.GenderID = data.GenderID;
                    model.AgeFromID = data.AgeMin;
                    model.AgeToID = data.AgeMax;
                    model.HeightFromID = data.MinHeight === "0" ? "9" : data.MinHeight;
                    model.HeightToID = data.MaxHeight;
                    model.MaritalstatusID = model.arrayToString(data.maritalstatusid);
                    model.ReligionID = model.arrayToString(data.religionid);
                    model.MothertongueID = model.arrayToString(data.MotherTongueID);
                    model.Caste = [];
                    model.Caste = Commondependency.casteDepedency(model.ReligionID !== null && model.ReligionID.length > 0 ? model.ReligionID.toString() : "", (model.MothertongueID !== null && model.MothertongueID.length > 0) ? (model.MothertongueID).toString() : "");
                    model.CountryID = model.arrayToString(data.CountryID);
                    model.EducationID = model.arrayToString(data.EducationCategoryID);
                    model.RegionID = model.arrayToString(data.Regions);
                    model.BranchID = model.arrayToString(data.Branches);
                    model.ComplexionID = model.arrayToString(data.complexionid);
                    model.EducationCategoryID = model.arrayToString(data.EducationCategoryID);
                    model.Educationgroup = Commondependency.educationGroupBind((model.EducationCategoryID !== undefined && model.EducationCategoryID !== null && model.EducationCategoryID !== "") ? (model.EducationCategoryID).toString() : "");
                    model.EducationGroupID = model.arrayToString(data.EducationGroupID);
                    model.EducationSpecializationID = Commondependency.educationSpeciakisationBind((model.EducationGroupID !== undefined && model.EducationGroupID !== null && model.EducationGroupID !== "") ? (model.EducationGroupID).toString() : "");
                    model.ProfessionID = model.arrayToString(data.ProfessionGroup);
                    model.jobCountryID = model.arrayToString(data.CountryID);
                    model.State = Commondependency.StateBind((data.CountryID !== undefined && data.CountryID !== null && data.CountryID !== "") ? (data.CountryID).toString() : "");
                    model.StateID = model.arrayToString(data.StateID);
                    model.DistrictBind = Commondependency.districtBind((data.StateID !== undefined && data.StateID !== null && data.StateID !== "") ? (data.StateID).toString() : "");
                    model.DistrictID = model.arrayToString(data.DistrictID);
                    model.StarLanguageID = model.arrayToString(data.StarLanguageID);
                    model.StarsID = model.arrayToString(data.PreferredStars);
                    model.KojadoshamID = data.KujaDosham;
                    model.BranchID = model.arrayToString(data.Branches);
                    model.DietID = model.arrayToString(data.Diet);
                    model.SmokeID = model.arrayToString(data.Smoke);
                    model.DrinkID = model.arrayToString(data.Drink);
                    model.bodytypeID = model.arrayToString(data.BodyTypeID);
                    model.physicalStatusID = model.arrayToString(data.physicalstatusid);
                    timeout(function() {
                        model.castID = model.arrayToString(data.casteid);
                    }, 100);
                }
                alerts.dynamicpopupclose();
            });
        };
        model.ProfileIdTemplateDUrl = function(row) {
            var paidstatusclass = row.paid === 1 ? 'paidclass' : 'unpaid';
            var paid = "<a class='" + paidstatusclass + "'>" + row.ProfileID + ' (' + row.KMPLID + ')' + "</a>";
            return paid;
        };
        model.ViewProfile = function(row) {
            window.open('/Viewfullprofile/' + row.ProfileID, '_blank');
        };
        model.AgeTemplate = function(row) {
            var paid = row.DOB + "(" + row.Age + ")";
            return paid;
        };
        model.gridtable.columns = [
            { text: 'ProfileID', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
            { text: 'FirstName', key: 'LastName', type: 'label' },
            { text: 'SurName', key: 'FirstName', type: 'label' },
            { text: 'Caste', key: 'Caste', type: 'label' },
            { text: 'MaritalStatus', key: 'maritalstatus', type: 'label' },
            { text: 'DOB(Age)', key: 'DOB', type: 'customlink', templateUrl: model.AgeTemplate },
            { text: 'Gender', key: 'Gender', type: 'label' },
            { text: 'Height', key: 'Height', type: 'label' },
            { text: 'Education', key: 'EducationGroup', type: 'label' },
            { text: 'Profession', key: 'Profession', type: 'label' },
            { text: 'Job Location', key: 'JobLocation', type: 'label' },
            { text: 'Country Livingin', key: 'countrylivingin', type: 'label' },
            { text: 'Fathernative', key: 'FFNative', type: 'label' },
            { text: 'Mothernative', key: 'MFNative', type: 'label' }
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
        model.removeSelect = function(Arr) {
            if (Arr !== undefined && Arr.length > 0 && angular.lowercase(Arr[0].title) === '--select--') {
                Arr.splice(0, 1);
            }
            return Arr;
        };
        model.init = function() {

            model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
            model.isAdmin = authSvc.isAdmin() !== undefined && authSvc.isAdmin() !== null && authSvc.isAdmin() !== "" ? authSvc.isAdmin() : "";
            model.divcontrollsbind = 1;
            _.each(model.domDataadvanced, function(parentItem) {
                _.each(parentItem.controlList, function(item) {
                    if (item.dataBind) {
                        model[item.dataSource] = model.removeSelect(arrayConstants[item.dataBind]);
                    } else if (item.dataApi) {
                        model[item.dataSource] = getArray.GArray(item.dataApi);
                    }
                });
            });
            _.each(model.domDatageneral, function(parentItem) {
                _.each(parentItem.controlList, function(item) {
                    if (item.dataBind === 'Professionsearch') {
                        model[item.dataSource] = model.removeSelect(arrayConstants[item.dataBind]);
                    }
                });
            });
            model.Showinprofile = model.arrayToString("1");
            model.ApplicationstatusID = model.arrayToString("54");
            model.MothertongueID = model.arrayToString("1");
            model.ReligionID = model.arrayToString("1");
            model.Caste = Commondependency.casteDepedency(model.ReligionID, model.MothertongueID);
        };
        model.GetPhotoandHoroscopevalues = function(strType, str) {
            if (str !== null && str !== undefined && str !== "" && str.length > 0) {
                str = str.toString();
                if (strType == "horo") {
                    str = ((str.indexOf("2") != -1) && (str.indexOf("3") != -1) ? null : (str.indexOf("2") != -1) ? "1" : (str.indexOf("3") != -1) ? "0" : null);
                } else {
                    str = ((str.indexOf("0") != -1) && (str.indexOf("1") != -1) ? null : (str.indexOf("1") != -1) ? "1" : (str.indexOf("0") != -1) ? "0" : null);
                }
            }
            return str !== undefined ? str : null;
        };
        model.submitgeneral = function(frompage, topage, typeofexcel) {
            var paramters = {};
            _.each(model.domDatageneral, function(parentItem) {
                _.each(_.filter(parentItem.controlList, function(seconditem) { return seconditem !== undefined; }), function(item) {
                    if (item.controlType !== 'datePicker') {
                        if (item.ngModel !== undefined) {
                            paramters[item.ngModel] = model.returnnullvalue(model[item.ngModel]);
                        }
                        if (item.ngModelFrom !== undefined) {
                            paramters[item.ngModelFrom] = model.returnnullvalue(model[item.ngModelFrom]);
                            paramters[item.ngModelTo] = model.returnnullvalue(model[item.ngModelTo]);
                        }

                    } else {
                        paramters[item.ngModelFrom] = helpService.checkstringvalue(model[item.ngModelFrom]) ? filter('date')(model[item.ngModelFrom], 'MM/dd/yyyy') : null;
                        paramters[item.ngModelTo] = helpService.checkstringvalue(model[item.ngModelTo]) ? filter('date')(model[item.ngModelTo], 'MM/dd/yyyy') : null;
                    }
                });
            });
            paramters.OnlyConfidential = model.OnlyConfidential === true ? 1 : 0;
            paramters.Showinprofile = model.GetPhotoandHoroscopevalues("photo", model.Showinprofile);
            paramters.HoroScopeStatus = model.GetPhotoandHoroscopevalues("horo", model.Showinprofile);
            paramters.CustID = model.Cust_ID;
            model.topage = topage;
            if (parseInt(frompage) === 1) {
                model.slides = [];
            }
            model.CgetDetails = {
                GetDetails: paramters,
                customerpersonaldetails: {
                    CustID: helpService.checkstringvalue(model.getpageloadobject.Cust_ID) ? model.getpageloadobject.Cust_ID : null,
                    EmpID: model.empid,
                    Admin: model.isAdmin,
                    startindex: frompage,
                    EndIndex: topage
                }
            };
            searchpageServices.generalsearchsubmit(model.CgetDetails).then(function(response) {
                model.isshortlistprogressbar = true;
                model.tablename = "general";
                model.slideshowarray = [];
                model.exportarray = [];
                if (model.typrofsearch === "2") {
                    _.each(response.data, function(item) {
                        model.slideshowarray.push(item);
                    });
                    model.headervisileble = true;
                    if (parseInt(frompage) === 1) {
                        model.divcontrolls = false;
                        model.setSlides(model.slideshowarray, parseInt(topage));
                        model.totalRecords = parseInt(frompage) === 1 && response !== undefined && response.data !== undefined && model.slideshowarray.length > 0 ? model.slideshowarray[0].TotalRows : 0;
                    } else {
                        model.addSlides(model.slideshowarray, model.slides, parseInt(topage));
                    }
                } else {
                    model.headervisileble = false;
                    if (typeofexcel === 'excel') {
                        _.each(response.data, function(item) {
                            model.exportarray.push(item);
                        });
                        var options = {
                            headers: true
                        };
                        alasql('SELECT ProfileID,FirstName,LastName as SurName,Caste,MaritalStatus,DOB(Age),Gender,Height,EducationGroup,Profession,joblocation,countrylivingin,Fathernative,Mothernative INTO  XLSX("john.xlsx",?) FROM ?', [options, model.exportarray]);
                    } else {
                        _.each(response.data, function(item) {
                            model.slideshowarray.push(item);
                        });
                        if (parseInt(frompage) === 1) {
                            model.gridTableshow = true;
                            model.divcontrolls = false;
                        }
                        model.gridtable.TotalRows = response.data[0].TotalRows;
                        model.gridtable.setData(model.slideshowarray);
                    }
                }

            });
        };
        model.closepopup = function() {
            if (model.divcontrollsbind === 0) {
                model.init();
            }
            model.sidebarnavshow = true;
            alerts.dynamicpopupclose();
        };
        model.submitadvancedsearch = function(frompage, topage, typeofexcel) {
            var paramters = {};
            _.each(model.domDataadvanced, function(parentItem) {
                _.each(_.filter(parentItem.controlList, function(seconditem) { return seconditem !== undefined; }), function(item) {
                    if (item.controlType !== 'datePicker') {
                        if (item.ngModel !== undefined) {
                            paramters[item.ngModel] = model.returnnullvalue(model[item.ngModel]);
                        }
                        if (item.ngModelFrom !== undefined) {
                            paramters[item.ngModelFrom] = model.returnnullvalue(model[item.ngModelFrom]);
                            paramters[item.ngModelTo] = model.returnnullvalue(model[item.ngModelTo]);
                        }
                    } else {
                        paramters[item.ngModelFrom] = helpService.checkstringvalue(model[item.ngModelFrom]) ? filter('date')(model[item.ngModelFrom], 'MM/dd/yyyy') : null;
                        paramters[item.ngModelTo] = helpService.checkstringvalue(model[item.ngModelTo]) ? filter('date')(model[item.ngModelTo], 'MM/dd/yyyy') : null;
                    }
                });
            });
            paramters.Showinprofile = model.GetPhotoandHoroscopevalues("photo", model.Showinprofile);
            paramters.HoroScopeStatus = model.GetPhotoandHoroscopevalues("horo", model.Showinprofile);
            paramters.CustID = model.Cust_ID;
            paramters.OnlyConfidential = model.OnlyConfidential === true ? 1 : 0;
            model.topage = topage;
            if (parseInt(frompage) === 1) {
                model.slides = [];
            }
            model.CgetDetails = {
                GetDetails: paramters,
                customerpersonaldetails: {
                    CustID: helpService.checkstringvalue(model.getpageloadobject.Cust_ID) ? model.getpageloadobject.Cust_ID : null,
                    EmpID: model.empid,
                    Admin: model.isAdmin,
                    startindex: frompage,
                    EndIndex: topage
                }
            };
            searchpageServices.advancedsearchsubmit(model.CgetDetails).then(function(response) {
                model.isshortlistprogressbar = true;
                model.tablename = "advanced";
                model.slideshowarray = [];
                model.exportarray = [];
                if (model.typrofsearch === "2") {
                    _.each(response.data, function(item) {
                        model.slideshowarray.push(item);
                    });
                    if (parseInt(frompage) === 1) {
                        model.divcontrolls = false;
                        model.headervisileble = true;
                        model.totalRecords = parseInt(frompage) === 1 && response !== undefined && response.data !== undefined && model.slideshowarray.length > 0 ? model.slideshowarray[0].TotalRows : 0;
                        model.setSlides(model.slideshowarray, parseInt(topage));
                    } else {
                        model.addSlides(model.slideshowarray, model.slides, parseInt(topage));
                    }
                } else {
                    model.headervisileble = false;
                    if (typeofexcel === 'excel') {
                        _.each(response.data, function(item) {
                            model.exportarray.push(item);
                        });
                        var options = {
                            headers: true
                        };
                        alasql('SELECT ProfileID,FirstName,LastName as SurName,Caste,MaritalStatus,DOB(Age),Gender,Height,EducationGroup,Profession,joblocation,countrylivingin,Fathernative,Mothernative INTO  XLSX("john.xlsx",?) FROM ?', [options, model.exportarray]);
                    } else {
                        _.each(response.data, function(item) {
                            model.slideshowarray.push(item);
                        });
                        if (parseInt(frompage) === 1) {
                            model.gridTableshow = true;
                            model.divcontrolls = false;
                        }
                        model.gridtable.TotalRows = response.data[0].TotalRows;
                        model.gridtable.setData(model.slideshowarray);
                    }
                }

            });

        };
        model.getrelationshipstypes = function(flag, profileid, about) {
            searchpageServices.getrelationships(flag, profileid, "").then(function(response) {
                _.each(response.data, function(item) {
                    model.Relationships = JSON.parse(item);
                });
            });

        };
        model.relationshipbind = function(flag, profileid, about) {
            searchpageServices.getrelationships(flag, profileid, about).then(function(response) {
                model.popupFirstName = "";
                model.popupLastName = "";
                if (response !== null && response.data !== undefined && response.data !== null && response.data !== "") {
                    var Relationships = JSON.parse(response.data);
                    model.popupFirstName = Relationships[0].FirstName;
                    model.popupLastName = Relationships[0].LastName;
                }
            });
        };
        model.showdivsidenav = function(flag) {
            switch (flag) {
                case "mySidenav":
                    model.mySidenavdiv = true;
                    model.mystylenamediv = false;
                    break;
                case "mystylename":
                    model.mySidenavdiv = false;
                    model.mystylenamediv = true;
                    break;
            }
        };

        model.closeupload = function(type) {
            modelpopupopenmethod.closepopuppoptopopup();
        };
        model.close = function(type) {
            modelpopupopenmethod.closepopuppoptopopup();
        };
        model.getClickedCustID = function(slide) {
            if (model.dynamicFunction === "getClickedCustID" || model.dynamicFunction === "mismatchProfileCheck") {
                model.close();
            }
            slide.isShortlisted = true;
            alerts.timeoutoldalerts(model.scope, 'alert-success', 'profile has been shortlisted successfully', 2000);
        };
        model.mismatchProfileCheck = function(slide) {
            if (model.dynamicFunction === "getClickedCustID" || model.dynamicFunction === "mismatchProfileCheck") {
                model.close();
            }
            if (slide.isShortlisted) {
                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'This profile already shortlisted', 2000);
            } else {
                model.divmismatchData = [];
                var strmismatch = '';
                if (parseInt(slide.Age) < parseInt(model.getpageloadobject.AgeMin) && parseInt(slide.Age) > parseInt(model.getpageloadobject.AgeMax)) {
                    strmismatch = "  Age not Matched to this profileid" + ",";
                    model.divmismatchData.push({ profileIDlocal: slide.ProfileID, mismath: strmismatch });
                }
                if (parseInt(slide.HeightInCentimeters) < parseInt(model.getpageloadobject.MinHeight) && parseInt(slide.HeightInCentimeters) > parseInt(model.getpageloadobject.MaxHeight)) {
                    strmismatch += "  Height not Matched to this profileid" + ",";
                    model.divmismatchData.push({ profileIDlocal: slide.ProfileID, mismath: strmismatch });
                }
                if (parseInt(slide.MaritalStatusID) != parseInt(model.getpageloadobject.maritalstatusid)) {
                    strmismatch += "  MaritalStatus not Matched to this profileid" + ",";
                    model.divmismatchData.push({ profileIDlocal: slide.ProfileID, mismath: strmismatch });
                }
                if (parseInt(slide.CasteID) != parseInt(model.getpageloadobject.casteid)) {
                    strmismatch += "  Caste not Matched to this profileid";
                    model.divmismatchData.push({ profileIDlocal: slide.ProfileID, mismath: strmismatch });
                }
                if (model.divmismatchData.length > 0) {
                    model.dynamicFunction = "getClickedCustID";
                    model.dynamicParams = slide;
                    modelpopupopenmethod.showPopupphotopoup('shortlistpopup.html', model.scope, '', "modalclassdashboardphotopopup");
                } else {
                    model.getClickedCustID(slide);
                }
            }
        };
        model.checkServicetoShortlist = function(slide) {
            model.slide = slide;
            if (slide.isShortlisted) {
                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'This profile already shortlisted', 2000);
            } else {
                if (slide.serviceDate !== '') {
                    model.divmismatchData = [];
                    model.divmismatchData.push({ profileIDlocal: JSON.stringify(slide.ProfileID), mismath: slide.serviceDate });
                    model.dynamicFunction = "mismatchProfileCheck";
                    model.dynamicParams = slide;
                    modelpopupopenmethod.showPopupphotopoup('shortlistpopup.html', model.scope, '', "modalclassdashboardphotopopup");
                } else {
                    model.mismatchProfileCheck(slide);

                }
            }
        };
        model.mainShortListProfile = function() {
            model.shortlistmodel.headettemp = "templates/SearchpopupHeader.html";
            model.shortlistmodel.slides = _.where(model.slides, { isShortlisted: true });
            modelpopupopenmethod.showPopupphotopoup('mainShortListProfiles.html', model.scope, 'lg', "modalclassdashboardphotopopupinner");
        };
        model.shortListPopup = function() {
            var arrayshortListPopup = [];
            arrayshortListPopup = _.where(model.shortlistmodel.slides, { isshortlistaedgain: true });
            if (arrayshortListPopup.length > 0) {
                model.shortlistmodel.slides = _.where(model.shortlistmodel.slides, { isshortlistaedgain: true });
            } else {
                model.shortlistmodel.slides = (model.shortlistmodel.slides);
            }
        };
        model.shortlistmodel.checkServicetoShortlist = function(slide) {
            model.slide = slide;
            if (slide.isshortlistaedgain) {
                alerts.timeoutoldalerts(model.scope, 'alert-danger', 'You have already Shortlisted this Profile ID', 4000);
            } else {
                slide.isshortlistaedgain = true;
                alerts.timeoutoldalerts(model.scope, 'alert-success', 'profile has been shortlisted successfully', 4000);
            }

        };
        model.slidebind = function(old, news, array) {
            if (parseInt(model.topage) - parseInt(news) === 4) {
                switch (model.tablename) {
                    case "general":
                        model.submitgeneral((model.topage) + 1, (model.topage) + 10);
                        break;
                    case "advanced":
                        model.submitadvancedsearch((model.topage) + 1, (model.topage) + 10);
                        break;
                }

            }
        };
        model.statusbind = function(status) {
            if (status === "I") {
                status = "Proceed";
            } else if (status === "NI") {
                status = "Dont Proceed";
            } else if (status === "NV") {
                status = "Not Viewed";
            } else if (status === "V") {
                status = "Viewed";
            } else {
                status = "--";
            }
            return status;
        };
        model.proceedanddontproceed = function(typeofbtn, slide, AcceptStatus, MatchFollwupStatus) {
            var MobjViewprofile = {
                ExpressInrestID: slide.Cust_ProfileInterestsLog_ID,
                CustID: model.getpageloadobject.Cust_ID,
                FromCustID: model.getpageloadobject.Cust_ID,
                ToCustID: slide.Custid,
                AcceptStatus: AcceptStatus,
                MatchFollwupStatus: MatchFollwupStatus
            };
            helpService.UpdateExpressIntrestViewfullprofile(MobjViewprofile).then(function(response) {
                switch (response.data) {
                    case 1:
                        if (typeofbtn === "btnProceed") {
                            model.modalbodyID1 = "To Move the Match for MatchFollowup";
                        } else {
                            model.modalbodyID1 = "Oops go through your search";
                        }
                        break;
                    case 2:
                    case 3:
                        model.modalbodyID1 = "You need to Upgrade online membership";
                        break;
                    default:
                        model.modalbodyID1 = "Updation failed please contact admin";
                        break;
                }
                modelpopupopenmethod.showPopupphotopoup('TabClosePopup.html', model.scope, '', "modalclassdashboardphotopopup");
            });
        };
        model.sendtoServices = function() {
            model.close();
            model.cloumsarr = [];
            model.Toprofileids = [];
            _.each(model.shortlistmodel.slides, function(item) {
                model.cloumsarr.push(item.Custid);
            });
            var custids = model.cloumsarr.length > 0 ? (model.cloumsarr).toString() : null;
            searchpageServices.getprofileidcustdetails(custids).then(function(response) {
                model.FromProfileId = model.getpageloadobject.ProfileID;
                _.each(response.data, function(item) {
                    model.Toprofileids.push(item.ProfileID);
                });
                expressInterestModel.FromProfileID(model.FromProfileId);
                timeout(function() {
                    expressInterestModel.exiObj.txtFromprofileID = model.FromProfileId;
                    expressInterestModel.disableinput = true;
                }, 500);
                _.each(model.Toprofileids, function(item) {
                    expressInterestModel.getImages(item);
                });
                modelpopupopenmethod.showPopupphotopoup('app/expressInterest/index.html', model.scope, 'lg', "");
            });
        };

        model.bookmark = function() {
            var strToCustIDs = [];
            _.each(model.shortlistmodel.slides, function(item) {
                strToCustIDs.push(item.Custid);
            });
            var custids = strToCustIDs.length > 0 ? (strToCustIDs).toString() : null;
            var obj = {
                FromCustID: model.getpageloadobject.Cust_ID,
                ToCustID: custids,
                BookmaredFlag: 1,
                StrTocustIDs: custids
            };
            searchpageServices.insertbookmark(obj).then(function(response) {
                if (response.data === 1) {
                    alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Bookmarked SuccessFully', 2000);
                } else {
                    alerts.timeoutoldalerts(model.scope, 'alert-danger', 'Bookmark failed', 2000);
                }
            });
        };
        model.viewfullprofile = function(profileid) {
            window.open("Viewfullprofile/" + profileid, "_blank");
        };
        model.ticketclass = function(status) {
            var background = "#fff";
            if (parseInt(status) === 258) {
                background = "#C8E6E6";
            }
            return background;
        };
        model.tickethistoryupdation = function(ticket) {
            modelpopupopenmethod.showPopupphotopoup('tickethistory.html', model.scope, 'md', "modalclassdashboardphotopopup");
        };

        /**
         * Array Creation for controls creation for Serches 
         */
        model.getControlList = function() {
            model.tabsselected = [
                { tabname: "General Search", arrayname: 1, formame: "generalsearch" },
                { tabname: "Advanced Search", arrayname: 2, formame: "advancedsearch" }
            ];

            model.domDataadvanced = [{
                    headerName: '',
                    controlList: [
                        { ngModel: 'GenderID', controlType: 'gender', isShow: true, validation: true },
                        { ngModel: 'FirstName', labelName: 'First Name', controlType: 'textBox', isShow: true, validation: true },
                        { ngModel: 'LastName', labelName: 'Last Name', controlType: 'textBox', isShow: true, validation: true },
                        { typeofdata: 'Ageselect', ngModelFrom: 'AgeFromID', ngModelTo: 'AgeToID', labelName: 'Age', controlType: 'dualDropdown', isShow: true, validation: true },
                        { typeofdata: 'heightregistration', ngModelFrom: 'HeightFromID', ngModelTo: 'HeightToID', labelName: 'Height', controlType: 'dualDropdown', isShow: true, validation: true },
                        { divClear: true, ngModel: 'MaritalstatusID', labelName: 'Marital status', controlType: 'dropdown', isShow: true, dataBind: 'MaritalStatus', dataSource: 'maritalstatusg', validation: true },
                        { type: 'caste', ngModel: 'ReligionID', labelName: 'Religion', controlType: 'dropdown', isShow: true, dataBind: 'Religion', dataSource: 'religiong', validation: true },
                        { type: 'caste', ngModel: 'MothertongueID', labelName: 'Mother tongue', controlType: 'dropdown', isShow: true, dataBind: 'Mothertongue', dataSource: 'Mothertongueg', validation: true },
                        { ngModel: 'castID', labelName: 'Caste', controlType: 'dropdown', isShow: true, dataSource: 'Caste', validation: true },
                        { divClear: true, ngModel: 'ComplexionID', labelName: 'Complexion', controlType: 'dropdown', isShow: true, dataBind: 'Complexion', dataSource: 'Complexion', validation: true },
                        { ngModel: 'Showinprofile', labelName: 'Show Profile', controlType: 'dropdown', isShow: true, dataBind: 'Showprofile', dataSource: 'Showprofiles', validation: true },
                        { ngModel: 'ApplicationstatusID', labelName: 'Application Status', controlType: 'dropdown', isShow: true, dataBind: 'Applicationstatus', dataSource: 'Applicationstatus', validation: true },
                        { ngModelFrom: 'PropertyValuefrom', ngModelTo: 'PropertyValueto', labelName: 'Property In Lakhs', controlType: 'textproperty', isShow: true, validation: true }
                    ]
                }, {
                    headerName: 'Education and Profession',
                    controlList: [{ divClear: true, type: 'EducationCatgory', ngModel: 'EducationCategoryID', labelName: 'Education category', controlType: 'dropdown', isShow: true, dataBind: 'educationcategorywithoutselect', dataSource: 'educationcategory', validation: true },
                        { type: 'educationGroup', ngModel: 'EducationGroupID', labelName: 'Education', controlType: 'dropdown', isShow: true, dataSource: 'Educationgroup', validation: true },
                        { ngModel: 'EducationSpecializationID', labelName: 'Specialization', controlType: 'dropdown', isShow: true, dataSource: 'educationspeciallisation', validation: true },
                        { ngModel: 'University', labelName: 'University', controlType: 'textBox', isShow: true, validation: true },
                        { divClear: true, ngModel: 'WorkingwithID', labelName: 'Working With', controlType: 'dropdown', isShow: true, dataSource: 'ProfessionCategory', dataApi: 'ProfCatgory', validation: true },
                        { ngModel: 'CompanyName', labelName: 'Company Name', controlType: 'textBox', isShow: true, validation: true },
                        { type: 'professionBind', ngModel: 'ProfessionID', labelName: 'Profession', controlType: 'dropdown', isShow: true, dataSource: 'Professiongroup', dataApi: 'ProfGroup', validation: true },
                        { ngModel: 'ProfessionAreaID', labelName: 'Profession Area', controlType: 'dropdown', isShow: true, dataSource: 'professionBind', validation: true },
                        { divClear: true, typeofdata: 'currency', ngModelFrom: 'AnnualIncomefrom', ngModel: 'AnnualincomeID', ngModelTo: 'AnnualIncometo', labelName: 'Monthly income', controlType: 'triblecontrols', isShow: true, validation: true }
                    ]
                },
                {
                    headerName: 'Job location details',
                    controlList: [{ divClear: true, type: 'state', ngModel: 'jobCountryID', labelName: 'Country Living In', controlType: 'dropdown', isShow: true, dataApi: 'Country', dataSource: 'Country', validation: true },
                        { type: 'district', ngModel: 'StateID', labelName: 'State Living In', controlType: 'dropdown', isShow: true, dataSource: 'State', validation: true },
                        { type: 'city', ngModel: 'DistrictID', labelName: 'District Living In', controlType: 'dropdown', isShow: true, dataSource: 'DistrictBind', validation: true },
                        { ngModel: 'CityID', labelName: 'City Living In', controlType: 'dropdown', isShow: true, dataSource: 'cityBind', validation: true },
                        { divClear: true, ngModel: 'VisaStatusID', labelName: 'Visa Status', controlType: 'dropdown', isShow: true, dataSource: 'visastatus', dataBind: 'visastatus', validation: true },
                        { ngModelFrom: 'Residingsincefrom', ngModelTo: 'ResidingsinceTo', labelName: 'Residing Since', controlType: 'datePicker', isShow: true, validation: true },
                        { ngModelFrom: 'Arrivaldatefrom', ngModelTo: 'Arrivaldateto', labelName: 'Arriving Date', controlType: 'datePicker', isShow: true, validation: true },
                        { divClear: true, ngModelFrom: 'Departuredatefrom', ngModelTo: 'DeparturedateTo', labelName: 'Departure Date', controlType: 'datePicker', isShow: true, validation: true }
                    ]
                },
                {
                    headerName: 'Astro Details',
                    controlList: [{ divClear: true, type: 'star', ngModel: 'StarLanguageID', labelName: 'Star Language', controlType: 'dropdown', isShow: true, dataApi: 'starLanguage', dataSource: 'starLanguage', validation: true },
                        { ngModel: 'StarsID', labelName: 'Star', controlType: 'dropdown', isShow: true, dataSource: 'stars', dataBind: 'stars', validation: true },
                        { ngModel: 'KojadoshamID', labelName: 'Manglik/Kuja Dosham', controlType: 'radiomalagik', isShow: true, validation: true }
                    ]
                },
                {
                    headerName: 'Partner Native Location',
                    controlList: [{ divClear: true, type: 'Country', ngModel: 'PreferedCountryID', labelName: 'Preferred Country', controlType: 'dropdown', isShow: true, dataApi: 'Country', dataSource: 'Country', validation: true },
                        { type: 'district', ngModel: 'PreferedStateID', labelName: 'Preferred State', controlType: 'dropdown', isShow: true, dataSource: 'State', validation: true },
                        { type: 'city', ngModel: 'preferedDistrictID', labelName: 'Preferred District', controlType: 'dropdown', isShow: true, dataSource: 'DistrictBind', validation: true },
                        { ngModel: 'preferedCityID', labelName: 'Preferred City (Nearest)', controlType: 'textBox', isShow: true, validation: true }
                    ]
                },

                {
                    headerName: 'Profile Settings',
                    controlList: [{ divClear: true, type: 'BranchName', ngModel: 'RegionID', labelName: 'Region Of Branches', controlType: 'dropdown', isShow: true, dataBind: 'Regionofbranches', dataSource: 'Regionofbranches', validation: true },
                        { ngModel: 'BranchID', labelName: 'Branch', controlType: 'dropdown', isShow: true, dataSource: 'BranchName', validation: true, dataApi: 'BranchName' },
                        { ngModelFrom: 'Dateofregfrom', ngModelTo: 'Dateofregto', labelName: 'Date Of Reg', controlType: 'datePicker', isShow: true, validation: true },
                        { divClear: true, ngModelFrom: 'LastestLoginsfrom', ngModelTo: 'LastestLoginsto', labelName: 'Lastest Logins', controlType: 'datePicker', isShow: true, validation: true },
                        { ngModel: 'ProfileID', labelName: 'Profile ID', controlType: 'profileid', isShow: true, validation: true },
                        { ngModel: 'MembershipTypeID', labelName: 'Membership type', controlType: 'dropdown', isShow: true, dataSource: 'Membershiptype', validation: true, dataBind: 'Membershiptype' }
                    ]
                },
                {
                    headerName: 'Habit Details',
                    controlList: [{ divClear: true, ngModel: 'DrinkID', labelName: 'Drink', controlType: 'dropdown', isShow: true, dataApi: 'Smoke', dataSource: 'Smoke', validation: true },
                        { ngModel: 'SmokeID', labelName: 'Smoke', controlType: 'dropdown', isShow: true, dataApi: 'Smoke', dataSource: 'Smoke', validation: true },
                        { ngModel: 'DietID', labelName: 'Diet', controlType: 'dropdown', isShow: true, dataBind: 'Diet', dataSource: 'Diet', validation: true },
                        { ngModel: 'bodytypeID', labelName: 'BodyType', controlType: 'dropdown', isShow: true, dataBind: 'bodyType', dataSource: 'bodyType', validation: true },
                        { divClear: true, ngModel: 'physicalStatusID', labelName: 'Physical Status', controlType: 'dropdown', isShow: true, dataBind: 'PhysicalStatus', dataSource: 'PhysicalStatus', validation: true }
                    ]
                },
                {
                    headerName: 'Grade Selections',
                    controlList: [{ divClear: true, ngModel: 'Status_Photo', labelName: 'Photo', controlType: 'checkBoxList', dataSource: 'photogradearray', isShow: true, validation: true },
                        { ngModel: 'Status_Education', labelName: 'Education', controlType: 'checkBoxList', dataSource: 'photogradearray', isShow: true, validation: true },
                        { ngModel: 'Status_Property', labelName: 'Property', controlType: 'checkBoxList', dataSource: 'photogradearray', isShow: true, validation: true },
                        { ngModel: 'Status_Family', labelName: 'Family', controlType: 'checkBoxList', dataSource: 'photogradearray', isShow: true, validation: true },
                        { ngModel: 'Status_Profession', labelName: 'Profession', controlType: 'checkBoxList', dataSource: 'photogradearray', isShow: true, validation: true },
                    ]
                }
            ];

            model.domDatageneral = [{
                    headerName: '',
                    collapseid: 1,
                    controlList: [
                        { ngModel: 'GenderID', controlType: 'gender', isShow: true, validation: true },
                        { typeofdata: 'Ageselect', ngModelFrom: 'AgeFromID', ngModelTo: 'AgeToID', labelName: 'Age', controlType: 'dualDropdown', isShow: true, validation: true },
                        { typeofdata: 'heightregistration', ngModelFrom: 'HeightFromID', ngModelTo: 'HeightToID', labelName: 'Height', controlType: 'dualDropdown', isShow: true, validation: true },
                        { ngModel: 'MaritalstatusID', labelName: 'Marital status', controlType: 'dropdown', isShow: true, dataBind: 'MaritalStatus', dataSource: 'maritalstatusg', validation: true },
                        { type: 'caste', ngModel: 'ReligionID', labelName: 'Religion', controlType: 'dropdown', isShow: true, dataBind: 'Religion', dataSource: 'religiong', validation: true },
                        { divClear: true, type: 'caste', ngModel: 'MothertongueID', labelName: 'Mother tongue', controlType: 'dropdown', isShow: true, dataBind: 'Mothertongue', dataSource: 'Mothertongueg', validation: true },
                        { ngModel: 'castID', labelName: 'Caste', controlType: 'dropdown', isShow: true, dataSource: 'Caste', validation: true },
                        { ngModel: 'CountryID', labelName: 'Country Living In', controlType: 'dropdown', isShow: true, dataApi: 'Country', dataSource: 'Country', validation: true },
                        { ngModel: 'EducationID', labelName: 'Education category', controlType: 'dropdown', isShow: true, dataBind: 'educationcategorywithoutselect', dataSource: 'educationcategory', validation: true },
                        { divClear: true, ngModel: 'ProfessionID', labelName: 'Profession', controlType: 'dropdown', isShow: true, dataBind: 'Professionsearch', dataSource: 'Professionsearch', validation: true },
                        { ngModel: 'Showinprofile', labelName: 'Show Profile', controlType: 'dropdown', isShow: true, dataBind: 'Showprofile', dataSource: 'Showprofiles', validation: true },
                        { ngModel: 'ApplicationstatusID', labelName: 'Application Status', controlType: 'dropdown', isShow: true, dataBind: 'Applicationstatus', dataSource: 'Applicationstatus', validation: true },
                        { type: 'BranchName', ngModel: 'RegionID', labelName: 'Region Of Branches', controlType: 'dropdown', isShow: true, dataBind: 'Regionofbranches', dataSource: 'Regionofbranches', validation: true }
                    ]
                }, {
                    headerName: 'Profile Settings',
                    collapseid: 2,
                    controlList: [
                        { divClear: true, ngModel: 'BranchID', labelName: 'Branch', controlType: 'dropdown', isShow: true, dataSource: 'BranchName', validation: true, dataApi: 'BranchName' },
                        { ngModelFrom: 'Dateofregfrom', ngModelTo: 'Dateofregto', labelName: 'Date Of Reg', controlType: 'datePicker', isShow: true, validation: true },
                        { ngModelFrom: 'LastestLoginsfrom', ngModelTo: 'LastestLoginsto', labelName: 'Lastest Logins', controlType: 'datePicker', isShow: true, validation: true },
                        { divClear: true, ngModelFrom: 'PropertyValuefrom', ngModelTo: 'PropertyValueto', labelName: 'Property In Lakhs', controlType: 'textproperty', isShow: true, validation: true },
                        { ngModel: 'ProfileID', labelName: 'Profile ID', controlType: 'profileid', isShow: true, validation: true },
                        { typeofdata: 'currency', ngModelFrom: 'AnnualIncomefrom', ngModel: 'AnnualincomeID', ngModelTo: 'AnnualIncometo', labelName: 'Monthly income', controlType: 'triblecontrols', isShow: true, validation: true },
                        { ngModel: 'OnlyConfidential', controlType: 'singlechkbox', isShow: true, validation: true }
                    ]
                }

            ];
        };
        model.getControlList();
        model.returndynamicarray = function(val) {
            var array;
            if (val === 1) {
                array = model.domDatageneral;
            } else {
                array = model.domDataadvanced;
            }
            return array;
        };
        model.backtosearchpage = function() {
            model.divcontrolls = true;
            model.headervisileble = false;
            model.gridTableshow = false;
        };
        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('searchpageModel', factory);
    factory.$inject = ['$http', 'searchpageServices', 'arrayConstants', 'SelectBindServiceApp',
        'getArraysearch', '$timeout', 'helperservice',
        'authSvc', 'alert', 'Commondependency', '$filter', 'modelpopupopenmethod', 'complex-slide-config', '$sce',
        'expressInterestModel', 'complex-grid-config'
    ];
})(angular);