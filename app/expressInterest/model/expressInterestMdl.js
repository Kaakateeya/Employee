(function() {
    'use strict';

    function factory(http, expressInterestService, modelpopupopenmethod, authSvc, timeout) {

        var model = {};
        model.scope = {};
        model.strimages = '';
        model.exiObj = {};
        model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
        model.fromcustid = '';
        model.FromProfileID = function(ID) {

            if (ID !== '' && ID !== null && ID !== undefined) {
                expressInterestService.getEIprofileID(6, ID, '').then(function(response) {

                    if (response.data.length > 0) {
                        if (response.data[0].length > 0) {
                            model.ProfileStatusID = response.data[0][0].ProfileStatusID;
                        }

                        if (_.isArray(response.data[1]) && response.data[1].length > 0) {

                            console.log(response.data[1]);
                            model.fromcustid = response.data[1][0].Cust_ID;
                            model.FromAgeMax = response.data[1][0].AgeMax;
                            model.FromAgeMin = response.data[1][0].AgeMin;
                            model.FromMaxHeight = response.data[1][0].MaxHeight;
                            model.FromMinHeight = response.data[1][0].MinHeight;
                            model.Frommaritalstatusid = response.data[1][0].maritalstatusid;
                            model.FromGenderID = response.data[1][0].GenderID;
                            model.Fromcasteid = response.data[1][0].casteid;
                        }
                    }

                    if (model.ProfileStatusID == 54) {

                        expressInterestService.getEIprofileID(1, ID, '').then(function(response) {

                            model.relationarray = [];
                            model.Modeservicearray = [];
                            model.Emailsarray = [];
                            model.SelectProfilelst = [];
                            model.showHide = 1;
                            if (response.data.length > 0) {

                                if (response.data[0].length > 0) {
                                    model.relationarray.push({ "label": "--Select--", "title": "--Select--", "value": 0 });
                                    _.each(response.data[0], function(item) {
                                        model.relationarray.push({ "label": item.NAME, "title": item.NAME, "value": item.ID });
                                    });
                                    model.exiObj.Relationship = 0;
                                }
                                if (response.data.length > 1) {
                                    model.NAME = response.data[1][0].NAME;
                                    model.Max_Offline_Allowed = response.data[1][0].Max_Offline_Allowed;
                                    model.OfflineMembershipExpiryDate = response.data[1][0].OfflineMembershipExpiryDate;
                                    model.Offline_Used_Count = response.data[1][0].Offline_Used_Count;
                                }

                                if (response.data.length > 2) {
                                    model.Modeservicearray.push({ "label": "--Select--", "title": "--Select--", "value": '' });
                                    _.each(response.data[2], function(item) {
                                        model.Modeservicearray.push({ "label": item.NAME, "title": item.NAME, "value": item.ID });
                                    });
                                    model.exiObj.ModeofService = '';
                                }

                                if (response.data.length > 3) {
                                    model.Emailsarray = response.data[3];

                                    model.emailselectedArr = [];
                                    if (model.Emailsarray.length > 0) {
                                        _.each(model.Emailsarray, function(item) {
                                            model.emailselectedArr.push(item.Email);
                                        });
                                        model.exiObj.chkmails = model.emailselectedArr;
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
                        model.SelectProfilelst = null;
                        model.showHide = 0;
                        // model.exiObj.txtFromprofileID = '';
                        alert("ProfileId not Valid");
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
                    alert('ProfileID has been already added to the list');
                } else {
                    if (ID != 0) {
                        if (model.exiObj.txtFromprofileID != null && model.exiObj.txtFromprofileID.length != 0) {
                            model.mismatch = [];
                            expressInterestService.getEIprofileID(6, ID, '').then(function(response) {
                                if (_.isArray(response.data) && response.data.length > 0) {
                                    if (_.isArray(response.data[0]) && response.data[0].length > 0) {
                                        model.ToProfileStatusID = response.data[0][0].ProfileStatusID;
                                    }
                                    if (_.isArray(response.data[1]) && response.data[1].length > 0) {
                                        model.ToAgeMax = response.data[1][0].AgeMax;
                                        model.ToAgeMin = response.data[1][0].AgeMin;
                                        model.ToMaxHeight = response.data[1][0].MaxHeight;
                                        model.ToMinHeight = response.data[1][0].MinHeight;
                                        model.Tomaritalstatusid = response.data[1][0].maritalstatusid;
                                        model.ToGenderID = response.data[1][0].GenderID;
                                        model.Tocasteid = response.data[1][0].casteid;
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
                                    }

                                    if (model.ToProfileStatusID == 54) {
                                        if (model.mismatch.length > 0) {
                                            modelpopupopenmethod.showPopup('Conflict.html', model.scope, 'md', 'mismatch');
                                            console.log('event....');
                                        } else {
                                            model.pushToProfileIDs();
                                        }

                                    } else if ((ProfileStatusID == 57) || (ProfileStatusID == 393)) {

                                        alert("Settled or WaitingforSettled Authorization Profile");
                                        model.exiObj.txtToprofileID = '';
                                        return false;
                                    } else if ((ProfileStatusID == 56) || (ProfileStatusID == 394)) {

                                        alert("Deleted or WaitingforDeltd authorization Profile");
                                        model.exiObj.txtToprofileID = '';
                                        return false;
                                    } else {
                                        alert('Not Active Profile');
                                        model.exiObj.txtToprofileID = '';
                                        return false;
                                    }
                                }
                            });

                        } else {
                            model.exiObj.txtToprofileID = '';
                            alert("Please Enter The FromProfileID");
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
            timeout(function() {
                model.SelectProfilelst.push({ "label": model.exiObj.txtToprofileID, "title": model.exiObj.txtToprofileID, "value": model.strimages });
                model.exiObj.txtToprofileID = '';
            }, 500);
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
                    Sendsms: obj.rbtnSendSms,
                    IsRvrSend: obj.chkrvrsend === true ? 1 : 0,
                    SelectedImages: item.value,
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

            console.log(JSON.stringify(inputObj));
            expressInterestService.submitExpressintrst(inputObj).then(function(response) {
                console.log(response);
            });

        };

        model.getImages = function(profileid) {

            var imgArr = [];
            var strimgs = '';
            model.strimages = '';
            expressInterestService.getEIprofileID(4, profileid, '').then(function(response) {

                if (_.isArray(response.data) && response.data.length > 0 && response.data[0].length > 0) {
                    imgArr = response.data[0];
                    _.each(imgArr, function(item) {
                        strimgs += strimgs === '' ? item.PhotoName : ',' + item.PhotoName;
                    });
                    model.strimages = strimgs + ';' + profileid;
                }
            });
        };
        model.bindImages = function(val) {

            model.displayToimages = [];
            if (val !== '') {
                var strimgArr = val[0].split(';');
                var profileid = strimgArr[1];
                var imgs = strimgArr[0].split(',');
                _.each(imgs, function(item) {
                    var imgwithnoJpg = (item.split('.'))[0];
                    model.displayToimages.push({ src: app.S3PhotoPath + "KMPL_91035_Images/" + (imgwithnoJpg.replace("i", "I")) + "_Images/" + profileid + "_FullPhoto.jpg", name: imgwithnoJpg.replace("i", "I"), boolval: true, profileID: profileid });
                });
            }
            modelpopupopenmethod.showPopup('TophotosPoup.html', model.scope, 'lg', '');
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
    angular
        .module('Kaakateeya')
        .factory('expressInterestModel', factory)
    factory.$inject = ['$http', 'expressInterestService', 'modelpopupopenmethod', 'authSvc', '$timeout'];
})(angular);