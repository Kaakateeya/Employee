(function() {
    'use strict';

    function factory(http, expressInterestService, modelpopupopenmethod, authSvc, timeout, alertss) {
        //  return function() {
        var model = {};
        model.scope = {};
        var strimages = '';
        model.exiObj = {};
        model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
        model.fromcustid = '';
        model.SelectProfilelst = [];
        model.NAME = '';
        model.OfflineMembershipExpiryDate = '';
        model.Max_Offline_Allowed = '';
        model.Offline_Used_Count = '';
        model.FromProfileID = function(ID) {
            if (ID !== '' && ID !== null && ID !== undefined) {
                expressInterestService.getEIprofileID(6, ID, '').then(function(response) {
                    if (response.data.length > 0) {
                        if (response.data[0].length > 0) {
                            model.ProfileStatusID = response.data[0][0].ProfileStatusID;
                        }
                        if (_.isArray(response.data[1]) && response.data[1].length > 0) {
                            model.fromcustid = response.data[1][0].Cust_ID;
                            model.FromAgeMax = response.data[1][0].AgeMax;
                            model.FromAgeMin = response.data[1][0].AgeMin;
                            model.FromMaxHeight = response.data[1][0].MaxHeight;
                            model.FromMinHeight = response.data[1][0].MinHeight;
                            model.Frommaritalstatusid = response.data[1][0].maritalstatusid;
                            model.FromGenderID = response.data[1][0].GenderID;
                            model.Fromcasteid = response.data[1][0].casteid;
                            model.Fromsurname = response.data[1][0].CSName;
                        }
                    }
                    if (model.ProfileStatusID == 54) {
                        expressInterestService.getEIprofileID(1, ID, '').then(function(response) {
                            model.relationarray = [];
                            model.Modeservicearray = [];
                            model.Emailsarray = [];
                            // model.SelectProfilelst = [];
                            model.showHide = 1;
                            if (response.data.length > 0) {
                                if (response.data[0].length > 0) {
                                    model.relationarray.push({ "label": "--Select--", "title": "--Select--", "value": 0 });
                                    _.each(response.data[0], function(item) {
                                        model.relationarray.push({ "label": item.NAME, "title": item.NAME, "value": item.ID });
                                    });
                                    model.exiObj.Relationship = 0;
                                }
                                if (_.isArray(response.data) && response.data[1].length > 0) {
                                    model.NAME = response.data[1][0].NAME;
                                    model.Max_Offline_Allowed = response.data[1][0].Max_Offline_Allowed;
                                    model.OfflineMembershipExpiryDate = response.data[1][0].OfflineMembershipExpiryDate;
                                    model.Offline_Used_Count = response.data[1][0].Offline_Used_Count;
                                }

                                if (_.isArray(response.data) && response.data.length > 2) {
                                    model.Modeservicearray.push({ "label": "--Select--", "title": "--Select--", "value": '' });
                                    _.each(response.data[2], function(item) {
                                        model.Modeservicearray.push({ "label": item.NAME, "title": item.NAME, "value": item.ID });
                                    });
                                    model.exiObj.ModeofService = '';
                                }

                                if (_.isArray(response.data) && response.data.length > 3) {
                                    model.Emailsarray = response.data[3];
                                    model.emailselectedArr = [];
                                    model.exiObj.chkmails = [];
                                    if (model.Emailsarray.length > 0) {
                                        _.each(model.Emailsarray, function(item) {

                                            var email = item.Email.substring(0, item.Email.length > 2 ? 3 : (item.Email.length > 1 ? 2 : 1));
                                            email += "*****@gmail.com";
                                            model.emailselectedArr.push({ Email: email, emailid: item.Email });
                                        });
                                        _.map(model.emailselectedArr, function(item) {
                                            model.exiObj.chkmails.push(item.emailid);
                                        });
                                    }
                                }
                            }
                        });
                    } else {
                        model.OfflineMembershipExpiryDate = '';
                        model.NAME = '';
                        model.Max_Offline_Allowed = '';
                        model.Offline_Used_Count = '';
                        model.exiObj.Relationship = 0;
                        model.exiObj.ModeofService = '';
                        model.exiObj.txtRelationName = '';
                        model.Emailsarray = null;
                        // model.SelectProfilelst = null;
                        model.showHide = 0;
                        model.exiObj.txtFromprofileID = '';
                        // alert("ProfileId not Valid");
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'ProfileId not Valid', 9500);
                    }
                });
            }
        };
        model.RelationshipChange = function(ID, RelationshipID) {
            expressInterestService.getEIprofileID(3, ID, RelationshipID).then(function(response) {
                model.exiObj.txtRelationName = response.data[0][0].NAME;
            });
        };
        model.ToprofileIDChange = function(ID) {
            if (ID !== '' && ID !== null && ID !== undefined) {
                var chkProfileID = _.where(model.SelectProfilelst, { label: model.exiObj.txtToprofileID });
                if (chkProfileID.length > 0) {
                    model.exiObj.txtToprofileID = '';
                    // alert('ProfileID has been already added to the list');
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'ProfileID has been already added to the list', 9500);
                } else {
                    if (ID !== 0) {
                        if (model.exiObj.txtFromprofileID !== null && model.exiObj.txtFromprofileID.length != 0) {
                            model.mismatch = [];
                            expressInterestService.getEIprofileID(6, ID, '').then(function(response) {
                                if (_.isArray(response.data) && response.data.length > 0) {

                                    if (_.isArray(response.data[0]) && response.data[0].length > 0) {
                                        model.ToProfileStatusID = response.data[0][0].ProfileStatusID;
                                    }
                                    if (_.isArray(response.data[1]) && response.data[1].length > 0) {
                                        model.toCustID = response.data[1][0].Cust_ID;
                                        model.ToAgeMax = response.data[1][0].AgeMax;
                                        model.ToAgeMin = response.data[1][0].AgeMin;
                                        model.ToMaxHeight = response.data[1][0].MaxHeight;
                                        model.ToMinHeight = response.data[1][0].MinHeight;
                                        model.Tomaritalstatusid = response.data[1][0].maritalstatusid;
                                        model.ToGenderID = response.data[1][0].GenderID;
                                        model.Tocasteid = response.data[1][0].casteid;
                                        model.Tosurname = response.data[1][0].CSName;
                                        if ((model.FromAgeMax) < (model.FromAgeMin) && model.ToAgeMax > (model.ToAgeMin)) {
                                            model.mismatch.push(" Age not Matched to this profileid");
                                        }
                                        if (model.ToMinHeight < (model.FromMinHeight) && model.ToMaxHeight > (model.FromMaxHeight)) {
                                            model.mismatch.push("  Height not Matched to this profileid");
                                        }
                                        if (model.Tomaritalstatusid != model.Frommaritalstatusid) {
                                            model.mismatch.push("  MaritalStatus not Matched to this profileid");
                                        }
                                        if (model.ToGenderID == model.FromGenderID) {
                                            model.mismatch.push(" Gender not Matched to this profileid");
                                        }
                                        if (model.Tocasteid != model.Fromcasteid) {
                                            model.mismatch.push("  Caste not Matched to this profileid");
                                        }
                                        if (angular.lowercase(model.Fromsurname) === angular.lowercase(model.Tosurname)) {
                                            model.mismatch.push(" Surname is Matched to this profileid");
                                        }
                                    }

                                    if (model.ToProfileStatusID === 54) {
                                        if (model.mismatch.length > 0) {
                                            modelpopupopenmethod.showPopup('Conflict.html', model.scope, 'md', 'mismatch');

                                        } else {
                                            model.pushToProfileIDs();
                                        }

                                    } else if ((model.ToProfileStatusID === 57) || (model.ToProfileStatusID === 393)) {
                                        // alert("Settled or WaitingforSettled Authorization Profile");
                                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Settled or WaitingforSettled Authorization Profile', 9500);
                                        model.exiObj.txtToprofileID = '';
                                        return false;
                                    } else if ((model.ToProfileStatusID === 56) || (model.ToProfileStatusID === 394)) {
                                        // alert("Deleted or WaitingforDeltd authorization Profile");
                                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Deleted or WaitingforDeltd authorization Profile', 9500);
                                        model.exiObj.txtToprofileID = '';
                                        return false;
                                    } else {
                                        // alert('Not Active Profile');
                                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Not Active Profile', 9500);
                                        model.exiObj.txtToprofileID = '';
                                        return false;
                                    }
                                }
                            });

                        } else {
                            model.exiObj.txtToprofileID = '';
                            // alert("Please Enter The FromProfileID");
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please Enter The FromProfileID', 9500);
                        }
                    }
                }
            }
        };

        model.closepopup = function() {
            model.exiObj.txtToprofileID = '';
            modelpopupopenmethod.closepopup();
        };
        model.pushToProfileIDs = function(type) {
            if (type === 'conflict')
                modelpopupopenmethod.closepopup();
            model.getImages(model.exiObj.txtToprofileID);
            model.exiObj.txtToprofileID = '';
        };
        model.Submit = function(obj) {
            var ExpressArray = [];
            var inputObj = {};
            var strMails = '';
            if (_.isArray(model.Emailsarray) && model.Emailsarray.length > 0) {
                _.each(model.Emailsarray, function(item) {
                    strMails += strMails === '' ? item.Email : ';' + item.Email;
                });
            }
            var fromobj = {
                FromCustID: model.fromcustid,
                EmpID: model.empid,
                emailaddress: _.isArray(obj.chkmails) ? (obj.chkmails).join(',') : ''
            };
            _.each(model.SelectProfilelst, function(item) {
                var toobj = {
                    FromProfileID: obj.txtFromprofileID,
                    ToProfileID: item.label,
                    EmpID: model.empid,
                    ModeofService: obj.ModeofService,
                    RelationShipID: obj.Relationship,
                    Name: obj.txtRelationName,
                    TypeOfService: obj.rbtnTypeofService,
                    ProfileType: obj.rbtnBasic,
                    NotesofCustomer: obj.txtNotecustomer,
                    Sendsms: obj.rbtnSendSms === "1" ? 1 : 0,
                    IsRvrSend: obj.chkrvrsend === true ? 1 : 0,
                    SelectedImages: item.value !== '' && item.value !== undefined && item.value !== undefined ? ((item.value).split(';'))[0] : '',
                    Acceptlink: '',
                    Rejectlink: '',
                    EmailAddress: _.isArray(obj.chkmails) ? (obj.chkmails).join(',') : '',
                    RVRAcceptlink: '',
                    RVRRejectlink: ''
                };
                ExpressArray.push(toobj);
            });
            inputObj = {
                customerpersonaldetails: fromobj,
                GetDetails: ExpressArray
            };
            expressInterestService.submitExpressintrst(inputObj).then(function(response) {
                var status = 0;
                if (_.isArray(response.data.m_Item1))
                    status = response.data.m_Item1[0].Status;
                if (parseInt(status) === 1) {
                    if (model.disableinput === true) {
                        model.close();
                    }
                    model.clearform();
                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Expressinterest done successfully', 2000);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Expressinterest failed', 2000);
                }
            });
        };
        model.clearform = function() {
            model.exiObj = {};
            model.Emailsarray = [];
            model.SelectProfilelst = [];
            model.scope.ExpressintrstForm.$setPristine();
            model.scope.ExpressintrstForm.$setUntouched();
            model.exiObj.rbtnSendSms = 1;
            model.exiObj.rbtnBasic = 358;
            model.exiObj.rbtnTypeofService = 366;
            // model.disableinput = false;

            model.exiObj.txtFromprofileID = '';
            model.exiObj.chkrvrsend = true;
            model.showHide = 0;
            model.NAME = '';
            model.OfflineMembershipExpiryDate = '';
            model.Max_Offline_Allowed = '';
            model.Offline_Used_Count = '';

        };
        model.getImages = function(profileid) {
            var imgArr = [],
                strimgs = '',
                strimages = '';
            expressInterestService.getEIprofileID(4, profileid, '').then(function(response) {
                if (_.isArray(response.data) && response.data.length > 0 && response.data[0].length > 0) {
                    imgArr = response.data[0];
                    _.each(imgArr, function(item) {
                        strimgs += strimgs === '' ? item.PhotoName : ',' + item.PhotoName;
                    });
                    strimages = strimgs + ';' + profileid;
                }

                timeout(function() {
                    model.SelectProfilelst.push({ "label": profileid, "title": profileid, "value": strimages });
                }, 500);
            });

        };
        model.bindImages = function(val) {
            model.displayToimages = [];
            if (val !== '') {
                var strimgArr = val[0].split(';');
                var profileid = strimgArr[1];
                var imgs = strimgArr[0].split(',');

                expressInterestService.getprofileidcustdetails(profileid).then(function(response) {
                    if (_.isArray(response.data)) {
                        _.each(imgs, function(item) {
                            var imgwithnoJpg = (item.split('.'))[0];
                            model.displayToimages.push({ src: app.S3PhotoPath + "KMPL_" + response.data[0].CustID + "_Images/" + (imgwithnoJpg.replace("i", "I")) + "_Images/" + profileid + "_FullPhoto.jpg", name: imgwithnoJpg.replace("i", "I"), boolval: true, profileID: profileid });
                        });
                    }
                });
            }
            modelpopupopenmethod.showPopup('TophotosPoup.html', model.scope, 'lg', 'modalclassdashboardphotopopup');
        };
        model.applyImages = function() {
            model.selectedimages = [];
            var seletedimages = _.where(model.displayToimages, { boolval: true });
            _.each(seletedimages, function(item) {
                model.selectedimages.push(item.name);
            });
            model.selectedimages = model.selectedimages.join(',');
            if (seletedimages.length > 0) {
                model.selectedimages = model.selectedimages + ';' + seletedimages[0].profileID;
                _.map(model.SelectProfilelst, function(item) {
                    if (item.label === seletedimages[0].profileID) {
                        item.value = model.selectedimages;
                    }
                });
            }
            modelpopupopenmethod.closepopup();
        };
        model.close = function() {
            modelpopupopenmethod.closepopuppoptopopup();
        };
        return model;
    }
    //  }
    angular
        .module('Kaakateeya')
        .factory('expressInterestModel', factory);
    factory.$inject = ['$http', 'expressInterestService', 'modelpopupopenmethod', 'authSvc', '$timeout', 'alert'];
})(angular);