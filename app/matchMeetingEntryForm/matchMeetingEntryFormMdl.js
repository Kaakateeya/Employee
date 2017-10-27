(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('matchMeetingEntryFormModel', factory);
    factory.$inject = ['matchMeetingEntryFormService', 'commonFactory', 'authSvc', 'alert', '$timeout', 'modelpopupopenmethod'];

    function factory(matchMeetingEntryFormService, commonFactory, authSvc, alertss, timeout, modelpopupopenmethod) {
        var model = {};
        model.scope = {};
        model.dateOptions = {
            changeMonth: true,
            changeYear: true,
            yearRange: "-40:+5",
            dateFormat: 'dd-mm-yy'
        };

        model.init = function() {
            model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
            model.hrsbindArr = commonFactory.numberBindWithZeros('Hours', 0, 23);
            model.minbindArr = commonFactory.numberBindWithZeros('Minutes', 0, 59);
            return model;
        };

        model.matchMeetingSubmit = function() {
            model.isDisabledsubmit = true;
            var date = moment(model.txtmeetingDate).format('YYYY-MM-DD') + ' ' + model.ddlhrs + ':' + model.ddlMins + ':00';
            var inObj = {
                BrideprofileID: model.brideCustID,
                GroomprofileID: model.groomCustID,
                MeetingDate: moment(date).format('YYYY-MM-DD hh:mm:ss'),
                MeetingPlace: model.txtPlace,
                BrideRelationName: commonFactory.listSelectedVal(model.ddlbrideMembers),
                GroomRelaionName: commonFactory.listSelectedVal(model.ddlGroomMembers),
                EmpID: model.ddlArrangedByEmp,
                Notes: model.txtNotes,
                CreatedEMPID: model.empid,
                BCode: model.Bcode,
                BLand: model.BLandline,
                BMobile: model.Bnumber,
                GCode: model.gcode,
                GLand: model.gLandline,
                GMobile: model.gnumber
            };
            matchMeetingEntryFormService.MMFormSubmit(inObj).then(function(response) {
                model.isDisabledsubmit = false;
                if (response.data) {
                    model.reset();
                    model.scope.MMEntryForm.$setPristine();
                    if ((response.data.m_Item1) === 1) {
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Match meeting created successfully ', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Failed please contact admin', 4500);
                    }
                }
            });
        };

        model.reset = function() {
            model.ddlhrs = '';
            model.ddlMins = '';
            model.brideProfileID = '';
            model.txtmeetingDate = '';
            model.ddlbrideMembers = '';
            model.ddlArrangedByEmp = '';
            model.groomProfileID = '';
            model.txtPlace = '';
            model.ddlGroomMembers = '';
            model.txtNotes = '';
            model.brideEmpID = 'owner';
            model.groomEmpID = 'owner';
            model.Bcode = '';
            model.BLandline = '';
            model.Bnumber = '';
            model.gcode = '';
            model.gLandline = '';
            model.gnumber = '';
            model.casteFlag = false;
            model.expressFlag = false;
            model.matchmeeting = false;
            model.brideCustID = 0;
            model.groomCustID = 0;
            model.isDisabledsubmit = false;
            model.chkphonenumbers = false;
        };

        model.clearProfileID = function(flag) {
            if (flag === 1)
                model.brideProfileID = '';
            else
                model.groomProfileID = '';
        };

        model.getEmpDetails = function(profileID, flag, oppProfileID) {
            if (profileID) {
                matchMeetingEntryFormService.getEmpDetails(profileID, flag).then(function(response) {
                    if (response.data) {
                        if ((response.data.m_Item2).length > 0) {
                            if (flag === 1) {
                                model.brideEmpID = (response.data.m_Item2)[0][0].Name;
                                model.brideCustID = (response.data.m_Item2)[0][0].Cust_ID;

                                if ((response.data.m_Item2)[1].length > 0 && (response.data.m_Item2)[1][0].Number) {
                                    model.Bnumber = (response.data.m_Item2)[1][0].Number;
                                    model.Bcode = (response.data.m_Item2)[1][0].CountryCodeID;
                                    model.BLandline = '';

                                } else if ((response.data.m_Item2)[2].length > 0 && (response.data.m_Item2)[2][0].Number) {
                                    model.Bnumber = (response.data.m_Item2)[2][0].Number;
                                    model.Bcode = (response.data.m_Item2)[2][0].CountryCodeID;
                                    model.BLandline = (response.data.m_Item2)[2][0].AreaCode;
                                }
                            } else {
                                model.groomEmpID = (response.data.m_Item2)[0][0].Name;
                                model.groomCustID = (response.data.m_Item2)[0][0].Cust_ID;

                                if ((response.data.m_Item2)[1].length > 0 && (response.data.m_Item2)[1][0].Number) {
                                    model.gnumber = (response.data.m_Item2)[1][0].Number;
                                    model.gcode = (response.data.m_Item2)[1][0].CountryCodeID;
                                    model.gLandline = '';

                                } else if ((response.data.m_Item2)[2].length > 0 && (response.data.m_Item2)[2][0].Number) {
                                    model.gnumber = (response.data.m_Item2)[2][0].Number;
                                    model.gcode = (response.data.m_Item2)[2][0].CountryCodeID;
                                    model.gLandline = (response.data.m_Item2)[2][0].AreaCode;
                                }
                            }
                        }

                        if (response.data.m_Item1) {
                            var name = flag === 1 ? "Bride" : "Groom";
                            switch (response.data.m_Item1) {
                                case 0:
                                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Failed please contact admin', 4500);
                                    break;

                                case 2:
                                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Please Enter ' + name + ' ProfileID', 4500);
                                    model.clearProfileID(flag);
                                    break;
                                case 3:
                                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Profile Id Exists But Not Reviewed', 4500);
                                    model.clearProfileID(flag);

                                    break;
                                case 4:
                                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Profile Id does not Exists', 4500);
                                    model.clearProfileID(flag);

                                    break;
                                case 5:
                                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'This profile is deleted', 4500);
                                    model.clearProfileID(flag);

                                    break;
                                case 6:
                                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'This profile is settled', 4500);
                                    model.clearProfileID(flag);
                                    break;
                            }
                        }
                    }
                });
            }
            if (profileID && oppProfileID) {
                timeout(function() {
                    matchMeetingEntryFormService.getMatchMeetingData(model.brideCustID, model.groomCustID).then(function(res) {
                        if (res.data) {
                            switch (res.data.m_Item2) {
                                case 1:
                                    model.matchmeetingStatusArr = res.data.m_Item1[0];
                                    model.matchmeeting = true;
                                    model.casteFlag = false;
                                    model.expressFlag = false;
                                    modelpopupopenmethod.showPopup('meeetingStatus.html', model.scope, 'md', '');
                                    break;

                                case 2:
                                case 3:
                                    if (res.data.m_Item3 === 0) {
                                        model.matchmeeting = false;
                                        model.casteFlag = true;
                                        model.expressFlag = true;
                                        model.castedataArr = res.data.m_Item1[1];
                                        model.casteDiff = 'Bride caste name is ' + (res.data.m_Item1[1].length > 0 ? res.data.m_Item1[1][0].CasteName : '') + ' and Groom caste name is ' + res.data.m_Item1[2][0].CasteName + '';
                                        if (res.data.m_Item1[1].length > 0) {
                                            if (res.data.m_Item4 === 10 && res.data.m_Item5 === 10) {
                                                model.ExpressintrstText = 'Both expressed interest to eachother';
                                            } else if (res.data.m_Item4 === 10 && res.data.m_Item5 === 0) {
                                                model.ExpressintrstText = 'Bride expressed interest to groom';
                                            } else if (res.data.m_Item4 === 0 && res.data.m_Item5 === 10) {
                                                model.ExpressintrstText = 'Groom expressed interest to bride';
                                            } else {
                                                model.expressFlag = false;
                                            }
                                            modelpopupopenmethod.showPopup('meeetingStatus.html', model.scope, 'md', '');
                                        }
                                    }
                                    break;
                            }
                        }
                    });
                }, 500);

            }
        };

        model.no_method = function(type) {
            if (type === 'yes') {
                modelpopupopenmethod.closepopup();
            } else {
                model.brideProfileID = '';
                model.groomProfileID = '';
                modelpopupopenmethod.closepopup();
            }
        };
        model.sharedphonenumbers = function() {
            if (model.chkphonenumbers === true) {
                model.txtmeetingDate = new Date();
                model.ddlhrs = 0;
                model.ddlMins = 0;
                model.txtPlace = 'dummy';
                model.ddlbrideMembers = ['283'];
                model.ddlGroomMembers = ['283'];
                model.ddlArrangedByEmp = '2';
            } else {
                model.ddlhrs = '';
                model.ddlMins = '';
                model.txtPlace = '';
                model.ddlbrideMembers = '';
                model.ddlGroomMembers = '';
                model.ddlArrangedByEmp = 0;
                timeout(function() {
                    model.txtmeetingDate = '';
                }, 500);
                // model.reset();
            }
        };
        return model.init();
    }
})();