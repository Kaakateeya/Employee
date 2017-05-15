(function(angular) {
    'use strict';


    function factory(editProfileSettingService, authSvc, alertss, commonFactory, uibModal, stateParams) {

        var model = {};
        model.scope = {};

        // var logincustid = authSvc.getCustId();
        var custID = stateParams.CustID;
        //  logincustid !== undefined && logincustid !== null && logincustid !== "" ? logincustid : null;

        model.profileSettingArr = [];
        model.ConfidentialArr = [];
        model.profileDisplayArr = [];
        model.gradeSelectionArr = [];

        model.psObj = {};
        model.csObj = {};
        model.psdObj = {};
        model.gradeObj = {};


        model.init = function() {
            custID = stateParams.CustID;
            model.pageload();
            return model;
        };


        model.pageload = function() {

            editProfileSettingService.getProfileSettingData(custID).then(function(response) {

                if (response.data.length > 0) {
                    model.profileSettingArr = response.data[0].length > 0 ? JSON.parse(response.data[0]) : [];
                    model.ConfidentialArr = response.data[1].length > 0 ? JSON.parse(response.data[1]) : [];
                    model.profileDisplayArr = response.data[2].length > 0 ? JSON.parse(response.data[2]) : [];
                    model.gradeSelectionArr = response.data[3] !== undefined && response.data[3].length > 0 ? JSON.parse(response.data[3]) : [];
                    console.log(model.ConfidentialArr);
                }
            });
        };


        model.populategrade = function(item) {
            return item === 'A' ? '216' : (item === 'B' ? '217' : (item === 'C' ? '218' : (item === 'D' ? '219' : 0)));
        };

        model.showprofilepopup = function(type, item) {

            switch (type) {

                case 'profileSetting':
                    model.popupdata = model.profileSetting;
                    model.popupHeader = 'Profile Settings';
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.rdlapplicationstatus = item.ProfileStatusID;
                        model.txtnoofdaysinactive = item.NoofDaysinactivated;
                        model.txtreasonforinactive = item.Reason4InActive;
                        model.ddlrequestedby = item.RequestedByGenericID;
                        model.rdlprofilegrade = item.ProfileGradeID;
                    }

                    break;

                case 'profileDisplay':
                    model.popupdata = model.profileSettingDisplay;
                    model.popupHeader = 'Profile Display Settings';
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.rdldisplayin = item.ProfileDisplayNameID;
                        model.rdlpwdblock = item.LoginStatusNameID;
                        model.txtblockedreason = item.ProfileBlockReason;
                    }

                    break;

                case 'confidential':
                    model.eventType = 'edit';
                    model.popupdata = model.confidentialSetting;
                    model.popupHeader = 'Confidential Settings';
                    model.chkisconfidential = item.ConfindentialStatusID === true ? true : false;
                    model.chkvryhighconfidential = item.HighConfidentialStatusID === 1 ? true : false;
                    break;

                case 'grading':
                    model.popupdata = model.gradeSelection;
                    model.popupHeader = 'Grade Selections';
                    if (item !== undefined) {
                        model.eventType = 'edit';
                        model.ddlfamilyGrade = model.populategrade(item.FamilyGrade);
                        model.ddlphotoGrade = model.populategrade(item.PhotoGrade);
                        model.ddlEducationgrade = model.populategrade(item.EducationGrade);
                        model.ddlProfessionGrade = model.populategrade(item.ProfileGrade);
                        model.ddlpropertyGrade = model.populategrade(item.PropertyGrade);
                    }

                    break;
            }

            commonFactory.open('commonProfileSettingpopup.html', model.scope, uibModal);
        };

        model.cancel = function() {
            commonFactory.closepopup();
        };


        model.profileSettingAndDispalySubmit = function(IProfileDisplayName, ILoginStatusName, IBlockedreason, ITypeofReport, Icurrentprofilestatusid, Iprofilegrade, INoofDaysinactivated, IReason4InActive,
            IRequestedBy) {

            model.Mobj = {
                intCusID: custID,
                EmpID: '2',
                currentprofilestatusid: Icurrentprofilestatusid,
                profilegrade: Iprofilegrade,
                NoofDaysinactivated: INoofDaysinactivated,
                Reason4InActive: IReason4InActive,
                RequestedBy: Icurrentprofilestatusid === 55 || Icurrentprofilestatusid === '55' ? IRequestedBy : null,
                TypeofReport: ITypeofReport,

                ProfileDisplayName: IProfileDisplayName,
                LoginStatusName: ILoginStatusName,
                Admin: null,
                Blockedreason: IBlockedreason
            };

            editProfileSettingService.submitProfileSettingAndDispalyData(model.Mobj).then(function(response) {
                console.log(response);

                commonFactory.closepopup();

                if (response.data === 1) {
                    model.pageload();
                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Profile Settings Submitted Succesfully', 4500);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Profile Settings Updation failed', 4500);
                }
            });

        };


        model.getChkVals = function(val) {
            return val === true ? 1 : 0;
        };



        model.updateData = function(inObj, type) {

            switch (type) {
                case 'Profile Settings':

                    model.profileSettingAndDispalySubmit('', '', '', "ProfileSettings", inObj.GetDetails.rdlapplicationstatus, inObj.GetDetails.rdlprofilegrade, inObj.GetDetails.txtnoofdaysinactive, inObj.GetDetails.txtreasonforinactive,
                        inObj.GetDetails.ddlrequestedby);

                    break;

                case 'Profile Display Settings':
                    model.profileSettingAndDispalySubmit(inObj.GetDetails.rdldisplayin, inObj.GetDetails.rdlpwdblock, inObj.GetDetails.txtblockedreason, 'DisplaySettings');
                    break;

                case 'Confidential Settings':
                    editProfileSettingService.confidentialSubmit(custID, model.getChkVals(inObj.GetDetails.chkisconfidential), model.getChkVals(inObj.GetDetails.chkvryhighconfidential), '2').then(function(response) {
                        console.log(response);
                        commonFactory.closepopup();
                        if (response.data !== undefined && response.data.length > 0) {
                            if (JSON.parse(response.data[0])[0].STATUS === 1) {
                                model.pageload();
                                alertss.timeoutoldalerts(model.scope, 'alert-success', 'Confidential Status Submitted Succesfully', 4500);
                            }
                        } else {
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Confidential Status Updation failed', 4500);
                        }
                    });
                    break;

                case 'Grade Selections':
                    model.Mobj = inObj.GetDetails;
                    model.Mobj.CustID = custID;
                    model.Mobj.EmpID = inObj.customerpersonaldetails.EmpID;

                    editProfileSettingService.submitGradeData(model.Mobj).then(function(response) {
                        console.log(response);

                        commonFactory.closepopup();
                        if (response.data === 1) {
                            model.pageload();
                            alertss.timeoutoldalerts(model.scope, 'alert-success', 'Grade Selections Submitted Succesfully', 4500);
                        } else {
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Grade Selections Updation failed', 4500);
                        }
                    });

                    break;
            }

        };
        model.hideifActive = function() {
            if (parseInt(model.rdlapplicationstatus) === 54) {
                model.txtnoofdaysinactive = '';
                model.txtreasonforinactive = '';
                model.ddlrequestedby = '';
                return false;
            }
            return true;
        };

        model.profileSetting = [
            { lblname: 'Application Status', controlType: 'radio', ngmodel: 'rdlapplicationstatus', ownArray: 'AplicationStatusArr', parameterValue: 'rdlapplicationstatus' },
            { lblname: 'No of Days to be inactivated ', controlType: 'textbox', ngmodel: 'txtnoofdaysinactive', parameterValue: 'txtnoofdaysinactive', parentDependecy: 'hideifActive' },
            { lblname: 'Reason for InActive', controlType: 'textareaSide', ngmodel: 'txtreasonforinactive', parameterValue: 'txtreasonforinactive', parentDependecy: 'hideifActive' },
            { lblname: 'Requested By', controlType: 'select', ngmodel: 'ddlrequestedby', typeofdata: 'childStayingWith', parameterValue: 'ddlrequestedby', parentDependecy: 'hideifActive' },
            { lblname: 'Profile Grade', controlType: 'radio', ngmodel: 'rdlprofilegrade', ownArray: 'profileGrade', parameterValue: 'rdlprofilegrade' },
        ];

        model.profileSettingDisplay = [
            { lblname: 'Display In', controlType: 'radio', ngmodel: 'rdldisplayin', ownArray: 'profileDisplayIn', parameterValue: 'rdldisplayin' },
            { lblname: 'Password Block/Release ', controlType: 'radio', ngmodel: 'rdlpwdblock', ownArray: 'blockReleseArr', parameterValue: 'rdlpwdblock' },
            { lblname: 'Reason', controlType: 'textarea', ngmodel: 'txtblockedreason', parameterValue: 'txtblockedreason' }
        ];

        model.confidentialSetting = [
            { lblname: 'isConfidential', controlType: 'checkbox', ngmodel: 'chkisconfidential', ownArray: 'AplicationStatusArr', parameterValue: 'chkisconfidential' },
            { lblname: 'Very High Confidential', controlType: 'checkbox', ngmodel: 'chkvryhighconfidential', parameterValue: 'chkvryhighconfidential' }
        ];

        model.gradeSelection = [
            { lblname: 'Education', controlType: 'select', ngmodel: 'ddlEducationgrade', typeofdata: 'gradeSelection', parameterValue: 'GEducation' },
            { lblname: 'Profession', controlType: 'select', ngmodel: 'ddlProfessionGrade', typeofdata: 'gradeSelection', parameterValue: 'GProfession' },
            { lblname: 'Property', controlType: 'select', ngmodel: 'ddlpropertyGrade', typeofdata: 'gradeSelection', parameterValue: 'GProperty' },
            { lblname: 'Family', controlType: 'select', ngmodel: 'ddlfamilyGrade', typeofdata: 'gradeSelection', parameterValue: 'GFamily' },
            { lblname: 'Photo', controlType: 'select', ngmodel: 'ddlphotoGrade', typeofdata: 'gradeSelection', parameterValue: 'GPhotos' },
            { lblname: '', controlType: 'break' }
        ];

        model.profileDisplayIn = [
            { "label": "Only Online", "title": "Only Online", "value": 279 },
            { "label": "Onlly Offline", "title": "Onlly Offline", "value": 280 },
            { "label": "Both", "title": "Both", "value": 434 }
        ];

        model.blockReleseArr = [
            { "label": "Allow", "title": "Allow", "value": 439 },
            { "label": "Block", "title": "Block", "value": 440 },
        ];


        model.AplicationStatusArr = [
            { "label": "Active", "title": "Active", "value": 54 },
            { "label": "Inactive", "title": "Inactive", "value": 55 }
        ];

        model.profileGrade = [
            { "label": "A", "title": "A", "value": 1 },
            { "label": "B", "title": "B", "value": 2 },
            { "label": "C", "title": "C", "value": 3 }
        ];




        return model.init();
    }

    angular
        .module('Kaakateeya')
        .factory('editProfileSettingModel', factory);

    factory.$inject = ['editProfileSettingService', 'authSvc', 'alert', 'commonFactory', '$uibModal', '$stateParams'];

})(angular);