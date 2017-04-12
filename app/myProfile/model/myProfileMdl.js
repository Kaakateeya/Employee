(function() {
    'use strict';

    function factory(http, myProfileservice, authSvc, config, modelpopupopenmethod, alertss, SelectBindServiceApp, uibModal, timeout) {
        var model = {};
        model = config;
        model.mpObj = {};
        model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
        model.opendiv = true;
        model.scope = {};
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
        model.ProfileIdTemplateDUrl = function(row) {
            var paid = "<a>" + row.ProfileID + ' (' + row.KMPLID + ')' + "</a>";
            return paid;
        };
        model.allLinksTemplateDUrl = function(row) {
            var stronlineliteclass = row.onlinepaidcls == "light" ? row.onlinepaidcls + ' Linkdisabled' : row.onlinepaidcls;
            var strofflineliteclass = row.offlinepaidcls == "light" ? row.offlinepaidcls + ' Linkdisabled' : row.offlinepaidcls;
            var photodisbled = row.PhotoshopCount == 0 ? 'Linkdisabled' : "";
            var paid = "<a style='cursor:pointer;'>Factsheet</a>&nbsp;&nbsp;&nbsp;<a style='' >Tickets</a>&nbsp;&nbsp;&nbsp;<a style='cursor:pointer;' >Servicelog</a>" +
                "&nbsp;&nbsp;&nbsp;<a ng-click='model.showphoto(" + row.Cust_ID + ");' class='" + photodisbled + "'>" + row.UploadedPhotoscount + " / " + row.PhotoshopCount + "</a>" +
                "&nbsp;&nbsp;&nbsp;<a class='oukuCls " + stronlineliteclass + "' ng-click='model.RedirectPayment(" + row.ProfileID + ");'>" + row.onlinepaid + "</a>/<a class='oukuCls " + strofflineliteclass + "' ng-click='model.RedirectPayment(" + row.ProfileID + ");' >" + row.offlinepaid + "</a>&nbsp;&nbsp;&nbsp;" +
                "<label class='fontweight'>" + row.OwnerName + "</label>";
            return paid;
        };

        model.showphoto = function(custid) {
            modelpopupopenmethod.ShowPhotoPopup(custid, model.scope);
        };

        model.RedirectPayment = function(profileid) {
            window.open("EmployeePayments" + "?profileid=" + profileid, "_blank");
        };
        model.horoTemplate = function(row) {
            var paid = row.HoroscopeStatus === 1 ? "<img  src='src/images/ico_horoscope.jpg' class='horoImgcls' >" : "";
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
            modelpopupopenmethod.showPopup('templates/bindImagePopup.html', model.scope, '', "");
        };

        model.MyprofileResult = function(obj, from, to) {
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
                pageto: to
            };
            model.columns = [
                { text: '', key: '', type: 'customlink', templateUrl: model.horoTemplate, method: model.horoscopeimage },
                { text: 'ProfileID', key: 'ProfileID', type: 'customlink', templateUrl: model.ProfileIdTemplateDUrl, method: model.ViewProfile },
                { text: 'Gender', key: 'GenderID', type: 'label' },
                { text: 'FirstName', key: 'LastName', type: 'link', method: model.editviewRedirect },
                { text: 'SurName', key: 'FirstName', type: 'link', method: model.editviewRedirect },
                { text: 'Caste', key: 'Caste', type: 'label' },
                { text: 'RegistrationDate', key: 'RegistrationDate', type: 'label' },
                { text: 'AllLinks', key: '', type: 'morelinks', templateUrl: model.allLinksTemplateDUrl },
            ];
            myProfileservice.getMyprofileSlide(inputobj).then(function(response) {
                console.log(response);
                if (_.isArray(response.data) && response.data.length > 0) {
                    model.opendiv = false;
                    model.TotalRows = response.data[0].TotalRows;
                    model.setData(response.data);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'No records found', 4500);
                }
            });
        };
        model.pagechange = function(val) {
            var to = val * 10;
            var from = val === 1 ? 1 : to - 9;
            model.MyprofileResult(model.mpObj, from, to);
        };
        model.close = function() {
            modelpopupopenmethod.closepopup();
        };
        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('myProfileModel', factory)
    factory.$inject = ['$http', 'myProfileservice', 'authSvc', 'complex-grid-config', 'modelpopupopenmethod', 'alert', 'SelectBindServiceApp', '$uibModal', '$timeout'];
})(angular);