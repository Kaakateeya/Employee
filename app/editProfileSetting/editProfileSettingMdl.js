(function(angular) {
    'use strict';


    function factory(editProfileSettingService, authSvc, alertss, commonFactory, uibModal, stateParams,
        SelectBindServiceApp, gridConfig, timeout) {
        var model = {};
        model = gridConfig;
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
        model.EmpNamesArr = [];
        model.showsearchrows = true;
        model.showsearch = false;
        model.showpaging = false;
        model.showClientpaging = false;
        model.myprofileexcel = false;
        model.normalexcel = false;
        model.gridTableshow = false;

        model.init = function() {
            model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
            custID = stateParams.CustID;
            model.Managementid = authSvc.isManagement() !== undefined && authSvc.isManagement() !== null && authSvc.isManagement() !== "" ? authSvc.isManagement() : "";
            model.Admin = authSvc.isAdmin();
            model.pageload();
            SelectBindServiceApp.EmpwithBranch('ProfileBranch', '').then(function(response) {
                var empBranchData = response.data;
                _.each(empBranchData, function(item, index) {
                    if (index === 0) {
                        model.EmpNamesArr = [{ "label": '--Select--', "title": '--Select--', "value": 0, ParentName: '' }];
                    }
                    model.EmpNamesArr.push({ "label": item.Name, "title": item.Name, "value": item.ID, ParentName: item.BranchesName });
                });
            });
            return model;
        };
        model.pageload = function() {
            editProfileSettingService.getProfileSettingData(custID).then(function(response) {
                if (response.data.length > 0) {
                    model.profileSettingArr = response.data[0].length > 0 ? JSON.parse(response.data[0]) : [];
                    model.Profileidfordisplay = model.profileSettingArr.length > 0 ? model.profileSettingArr[0].ProfileID : '';
                    model.ConfidentialArr = response.data[1].length > 0 ? JSON.parse(response.data[1]) : [];
                    model.profileDisplayArr = response.data[2].length > 0 ? JSON.parse(response.data[2]) : [];
                    if (response.data[3] !== undefined && response.data[3].length > 0) {
                        model.gridTableshow = true;
                        model.columns = [
                            { text: 'Employee name', key: 'SeenbyEmp', type: 'label' },
                            { text: 'Date', key: 'SeenbyEmpdate', type: 'label' },
                            { text: 'reason for login', key: 'EmpNarration', type: 'label' }
                        ];

                        var arr = response.data[3] ? JSON.parse(response.data[3]) : [];
                        if (arr[0].TableName === 'ProfileGrades') {
                            model.gradeSelectionArr = response.data[3] !== undefined && response.data[3].length > 0 ? JSON.parse(response.data[3]) : [];
                            model.CustLoginArr = response.data[4] !== undefined && response.data[4].length > 0 ? JSON.parse(response.data[4]) : [];
                            model.sdata = response.data[4] !== undefined && response.data[4].length > 0 ? JSON.parse(response.data[4]) : [];
                        } else {
                            model.sdata = model.CustLoginArr = response.data[3] !== undefined && response.data[3].length > 0 ? JSON.parse(response.data[3]) : [];
                        }
                        if (model.sdata.length > 0) {
                            _.map(model.sdata, function(item) {
                                item.SeenbyEmpdate = moment(item.SeenbyEmpdate).format('DD-MM-YYYY hh:mm:ss');
                            });
                        }
                    }
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
                        model.beforerestoredprofile = item.ProfileStatusID;
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
                case 'empCustlogin':
                    model.txtReasn = '';
                    model.popupdata = model.reason;
                    model.popupHeader = 'Reason for Customer login';
                    break;
            }

            commonFactory.open('commonProfileSettingpopup.html', model.scope, uibModal);
        };
        model.cancel = function() {
            commonFactory.closepopup();
        };
        model.profileSettingAndDispalySubmit = function(IProfileDisplayName, ILoginStatusName, IBlockedreason, ITypeofReport, Icurrentprofilestatusid, Iprofilegrade, INoofDaysinactivated, IReason4InActive,
            IRequestedBy, type) {

            ///27_10_2017_Delete to Active Reason
            model.resoreobj = {
                CustID: custID,
                EmpID: parseInt(model.empid),
                RequestedBY: model.rbtnrequestedby !== null && model.rbtnrequestedby !== '' && model.rbtnrequestedby !== undefined ? parseInt(model.rbtnrequestedby) : null,
                RequestedBYEmpID: model.ddlemployeenamed !== null && model.ddlemployeenamed !== '' && model.ddlemployeenamed !== undefined ? parseInt(model.ddlemployeenamed) : null,
                RelationshipID: model.ddlrelationship !== null && model.ddlrelationship !== '' && model.ddlrelationship !== undefined ? parseInt(model.ddlrelationship) : null,
                Relationshipname: model.txtrelationshipname !== null && model.txtrelationshipname !== '' && model.txtrelationshipname !== undefined ? model.txtrelationshipname : null,
                Reasonforrestore: model.txtReasonforrestore !== null && model.txtReasonforrestore !== '' && model.txtReasonforrestore !== undefined ? model.txtReasonforrestore : null,
                PriviousProfileStatus: parseInt(model.beforerestoredprofile)
            };
            if (model.beforerestoredprofile !== 54 && model.beforerestoredprofile !== 55) {
                if (parseInt(Icurrentprofilestatusid) === 54) {
                    editProfileSettingService.restoredProfile(model.resoreobj).then(function(response) {

                    });
                }
            }
            //
            model.Mobj = {
                intCusID: custID,
                EmpID: model.empid,
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
                if (type !== 'mmseries')
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
                        commonFactory.closepopup();
                        if (response.data === 1) {
                            model.pageload();
                            alertss.timeoutoldalerts(model.scope, 'alert-success', 'Grade Selections Submitted Succesfully', 4500);
                        } else {
                            alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Grade Selections Updation failed', 4500);
                        }
                    });
                    break;
                case 'Reason for Customer login':

                    editProfileSettingService.submitCustLoginEmp(inObj.customerpersonaldetails.EmpID, model.CustLoginArr[0].ProfileID, inObj.GetDetails.txtReasn).then(function(response) {
                        if (response.data && (response.data) === 1) {
                            commonFactory.closepopup();
                            // window.open('http://localhost:3000/empLogintoCustomer/' + model.CustLoginArr[0].ProfileID, '_blank');
                            // window.open('http://183.82.0.58:8030/empLogintoCustomer/' + model.CustLoginArr[0].ProfileID, '_blank');
                            window.open('http://www.kaakateeya.com/empLogintoCustomer/' + model.CustLoginArr[0].ProfileID, '_blank');
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

        model.ShowifActive = function() {
            if (parseInt(model.rdlapplicationstatus) === 54) {
                model.txtnoofdaysinactive = '';
                model.txtreasonforinactive = '';
                model.ddlrequestedby = '';
                return true;
            }
            return false;
        };
        model.showcustempcndn = function() {
            if (parseInt(model.rbtnrequestedby) === 2) {
                model.txtnoofdaysinactive = '';
                model.txtreasonforinactive = '';
                model.ddlrequestedby = '';
                return true;
            }
            return false;
        };
        model.showcustempcndnfalse = function() {
            if (parseInt(model.rbtnrequestedby) === 1) {
                model.txtnoofdaysinactive = '';
                model.txtreasonforinactive = '';
                model.ddlrequestedby = '';
                return true;
            }
            return false;
        };
        model.profileSetting = [
            { lblname: 'Application Status', controlType: 'radio', ngmodel: 'rdlapplicationstatus', ownArray: 'AplicationStatusArr', parameterValue: 'rdlapplicationstatus' },
            { lblname: 'No of Days to be inactivated ', controlType: 'textbox', ngmodel: 'txtnoofdaysinactive', parameterValue: 'txtnoofdaysinactive', parentDependecy: 'hideifActive' },
            { lblname: 'Reason for InActive', controlType: 'textareaSide', ngmodel: 'txtreasonforinactive', parameterValue: 'txtreasonforinactive', parentDependecy: 'hideifActive' },
            { lblname: 'Requested By', controlType: 'select', ngmodel: 'ddlrequestedby', typeofdata: 'childStayingWith', parameterValue: 'ddlrequestedby', parentDependecy: 'hideifActive' },
            { lblname: 'Requested by', controlType: 'radio', ngmodel: 'rbtnrequestedby', ownArray: 'requestedbyarr', parameterValue: 'rbtnrequestedby', parentDependecy: 'ShowifActive' },
            { lblname: 'Emp name', controlType: 'select', ngmodel: 'ddlemployeenamed', ownArray: 'EmpNamesArr', parameterValue: 'ddlemployeenamed', parentDependecy: 'showcustempcndn' },
            { lblname: 'RelationShip', controlType: 'selectwithmethod', ngmodel: 'ddlrelationship', typeofdata: 'childStayingWith', parameterValue: 'ddlrelationship', parentDependecy: 'showcustempcndnfalse', modelmethod: 'bindnames' },
            { lblname: 'Relation name', controlType: 'textbox', ngmodel: 'txtrelationshipname', parameterValue: 'txtrelationshipname', parentDependecy: 'showcustempcndnfalse' },
            { lblname: 'Reason for restore', controlType: 'textareaSide', ngmodel: 'txtReasonforrestore', parameterValue: 'txtReasonforrestore', parentDependecy: 'ShowifActive' },
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


        model.reason = [
            { lblname: '', controlType: 'about', required: true, ngmodel: 'txtReasn', parameterValue: 'txtReasn' }
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
        model.requestedbyarr = [
            { "label": "Customer", "title": "Customer", "value": 1 },
            { "label": "Employee", "title": "Employee", "value": 2 },
        ];
        model.makeActive = function(item) {
            model.profileSettingAndDispalySubmit('', '', '', "ProfileSettings", 54, item.ProfileGradeID, undefined, undefined,
                undefined, 'mmseries');
        };
        model.bindnames = function() {
            if (model.ddlrelationship !== '' && model.ddlrelationship !== null && model.ddlrelationship !== undefined) {
                SelectBindServiceApp.getRelationName(3, model.Profileidfordisplay, model.ddlrelationship).then(function(response) {
                    if (_.isArray(response.data[0]) && response.data[0].length > 0) {
                        model.txtrelationshipname = response.data[0][0].NAME;
                    } else {
                        model.txtrelationshipname = '';
                    }
                });
            }
        };

        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('editProfileSettingModel', factory);

    factory.$inject = ['editProfileSettingService', 'authSvc', 'alert', 'commonFactory', '$uibModal', '$stateParams', 'SelectBindServiceApp', 'single-grid-config', '$timeout'];

})(angular);