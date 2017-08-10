(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('employeeCreationModel', factory);

    factory.$inject = ['employeeCreationService', 'commonFactory', 'Commondependency', 'complex-grid-config', 'alert', 'modelpopupopenmethod', 'fileUpload'];

    function factory(employeeCreationService, commonFactory, Commondependency, gridConfig, alertss, modelpopupopenmethod, fileUpload) {

        var model = {};
        model = gridConfig;
        model.scope = {};
        model.actionFlag = 'create';
        model.hrsbindArr = commonFactory.numberBindWithZeros('Hours', 0, 23);
        model.minbindArr = commonFactory.numberBindWithZeros('Minutes', 0, 59);
        model.minsArray = [
            { label: 'Mins', value: '' },
            { label: '00', value: 1 },
            { label: '30', value: 2 }
        ];

        model.dateOptions = {
            changeMonth: true,
            changeYear: true,
            yearRange: "-40:+5",
            dateFormat: 'mm-dd-yy'
        };

        model.DesignationArr = [{ value: '--select--', Id: '' }, { value: 'Match Followup', Id: 1 }, { value: 'Payment', Id: 2 }, { value: 'Review', Id: 3 }, { value: 'Other', Id: 4 }, { value: 'Marketing', Id: 5 }];
        model.WeekDaysArr = [{ value: '--select--', Id: '' }, { value: 'Monday', Id: '1' }, { value: 'Tuesday', Id: '2' }, { value: 'Wednesday', Id: '3' }, { value: 'Thursday', Id: '4' }, { value: 'Friday', Id: '5' }, { value: 'Saturday', Id: '6' }, { value: 'Sunday', Id: '7' }];
        model.empStatusArr = [
            { "label": "All", "title": "All", "value": '' },
            { "label": "IsActive", "title": "IsActive", "value": '423' },
            { "label": "Delete", "title": "Delete", "value": '424' },
            { "label": "Disable", "title": "Disable", "value": '425' },
        ];

        model.empTypeArr = [
            { "label": "IsAdmin", "title": "IsAdmin", "value": '1' },
            { "label": "Is Senior", "title": "Is Senior", "value": '2' },
            { "label": "Review Emp", "title": "Review Emp", "value": '3' },
            { "label": "Marketing Emp", "title": "Marketing Emp", "value": '4' },
        ];

        model.dependencyChange = function(parentval, type) {

            switch (type) {
                case 'state':
                    model.stateArr = Commondependency.StateBind(parentval);
                    break;
                case 'district':
                    model.districtArr = Commondependency.districtBind(parentval);
                    break;
                case 'city':
                    model.cityArr = Commondependency.cityBind(parentval);
                    break;
                case 'edugroup':
                    model.edugroupArr = Commondependency.educationGroupBind(parentval);
                    break;
                case 'eduSpecialisation':
                    model.eduSpecialisationArr = Commondependency.educationSpeciakisationBind(parentval);
                    break;
            }
        };

        model.reset = function() {
            model.fName = '';
            model.lName = '';
            model.officeEmail = '';
            model.workingBranch = '';
            model.landline = '';
            model.officePhone = '';
            model.designation = '';
            model.loginLocation = '';
            model.weakOff = '';
            model.dateOfJoining = '';
            model.fromHrs = '';
            model.fromMins = '';
            model.toHrs = '';
            model.toMins = '';
            model.country = '';
            model.state = '';
            model.district = '';
            model.city = '';
            model.address = '';
            model.personalEmail = '';
            model.personalPhone = '';
            model.eduCatgory = '';
            model.eduGroup = '';
            model.eduSpecialisation = '';
            model.emptype = '';
            model.chkloginaAnyWhere = '';
            model.newuserID = '';
            model.actionFlag = 'create';
            model.empStatus = '423';
        };

        model.actionTemplate = function(row) {
            var DeleteActiveStatus = row.IsActiveStatus == 'IsActive' ? 'Delete' : 'Active';
            var actionstr = "<a href='javascript:void(0);' ng-click='model.editEmp(" + JSON.stringify(row) + ");'>Edit</a><br><a href='javascript:void(0);' ng-click='model.deleteEmp(" + JSON.stringify(row) + "," + JSON.stringify(DeleteActiveStatus) + ");'>" + DeleteActiveStatus + "</a><br><a href='javascript:void(0);' ng-click='model.disableEmp(" + JSON.stringify(row) + ");'>Disable</a><br><a href='javascript:void(0);' ng-click='model.assignEmpWork(" + JSON.stringify(row) + ");'>Assign</a>";
            return actionstr;
        };
        model.empDetailsTemplate = function(row) {
            var empstr = "<b>" + row.FirstName + ' ' + row.LastName + "</b><br><span>" + row.BranchesName + "</span><br><span>" + row.OfficialEmailID + "</span><br><span>" + row.OfficialContactNumber + "</span><br><span>" + row.UserID + "</span>";
            return empstr;
        };
        model.EmpPhotoTemplateUrl = function(row) {
            var src = row.EmpPhoto ? row.EmpPhoto : 'src/images/Manage_blankphoto.png';
            var style = row.EmpPhoto !== null ? 'cursor:pointer;width:150px;height:150px;' : 'width:150px;height:150px;';
            return "<img class='img-circle' style='" + style + "'  ng-click='model.EmpPhotopopup(" + JSON.stringify(row.EmpPhoto) + "," + JSON.stringify(row.UserID) + ")' src=" + src + "></img>";
        };

        model.EmpPhotopopup = function(src, userid) {
            model.empPhoto = '';
            if (src) {
                model.empPhoto = app.GlobalImgPath + "Images/EmployeeImages/" + userid + "_EmplyeeImage/" + userid + "_EmplyeeImage.jpg";
            }
            modelpopupopenmethod.showPopupphotopoup('empPhotoPopup.html', model.scope, 'md', "");
        };

        model.editEmp = function(row) {
            model.inobjemp = {};
            model.actionFlag = 'edit';
            model.populatemodel(row);
            model.selectedIndex = 1;
            model.editEmpid = row.EmpID;
        };

        model.deleteEmp = function(row, type) {
            model.inobjemp = {};
            model.actionFlag = type;
            model.populatemodel(row);
            model.CreateEmployeeSubmit(row.EmpID);
        };

        model.disableEmp = function(row) {
            model.inobjemp = {};
            model.actionFlag = 'disable';
            model.populatemodel(row);
            model.CreateEmployeeSubmit(row.EmpID);
        };

        model.assignEmpWork = function(row) {
            model.serviceCount = model.matchCount = model.marketCount = model.horoCount = model.photoCount = 0;
            model.AssignEmpname = row.FirstName + ' ' + row.LastName;
            model.AssignEmpID = row.EmpID;

            employeeCreationService.getEmpCounts(row.EmpID).then(function(response) {
                debugger;
                if (response.data) {
                    model.serviceCount = response.data.servicegivencount ? response.data.servicegivencount : 0;
                    model.matchCount = response.data.matchfollowupcount ? response.data.matchfollowupcount : 0;
                    model.marketCount = response.data.marketingticketscount ? response.data.marketingticketscount : 0;
                    model.horoCount = response.data.HoroCount ? response.data.HoroCount : 0;
                    model.photoCount = response.data.PhotoCount ? response.data.PhotoCount : 0;
                }
            });

            modelpopupopenmethod.showPopupphotopoup('assignWork.html', model.scope, 'md', "");
        };

        model.populatemodel = function(row) {
            model.dependencyChange(row.CountryID, 'state');
            model.dependencyChange(row.StateID, 'district');
            model.dependencyChange(row.DistrictID, 'city');
            model.dependencyChange(row.EducationCategoryID, 'edugroup');
            model.dependencyChange(row.EducationGroupID, 'eduSpecialisation');
            model.fName = row.FirstName;
            model.lName = row.LastName;
            model.officeEmail = row.OfficialEmailID;
            model.workingBranch = row.BranchID;
            model.landline = row.WorkPhone;
            model.officePhone = row.OfficialContactNumber;
            model.designation = row.DesignationID;
            model.loginLocation = row.LoginLocation;
            model.weakOff = row.DayOff;

            model.dateOfJoining = row.Created_Date ? moment(row.Created_Date).format('MM-DD-YYYY') : '';

            if (row.WorkingStartTIme) {
                var FromHrsArr = (row.WorkingStartTIme).split(' ');
                model.fromHrs = parseInt((FromHrsArr[1]).split(':')[0]);
                model.fromMins = parseInt((FromHrsArr[1]).split(':')[1]);
            }
            if (row.WorkingEndTIme) {
                var ToHrsArr = (row.WorkingEndTIme).split(' ');
                model.toHrs = parseInt((ToHrsArr[1]).split(':')[0]);
                model.toMins = parseInt((ToHrsArr[1]).split(':')[1]);
            }

            model.country = row.CountryID;
            model.state = row.StateID;
            model.district = row.DistrictID;
            model.city = row.CityID;
            model.address = row.Address;
            model.personalEmail = row.Email;
            model.personalPhone = row.HomePhone;
            model.eduCatgory = row.EducationCategoryID;
            model.eduGroup = row.EducationGroupID;
            model.eduSpecialisation = row.EducationSpecializaionID;
            model.chkloginaAnyWhere = row.isLoginanywhere;
            model.newuserID = row.UserID;
        };

        model.getEmpList = function() {
            model.columns = [
                { text: 'Action', key: '', type: 'morelinks', templateUrl: model.actionTemplate },
                { text: 'EmpPhoto', key: 'EmpPhoto', type: 'morelinks', templateUrl: model.EmpPhotoTemplateUrl },
                { text: 'Emp_Details', key: '', type: 'morelinks', templateUrl: model.empDetailsTemplate },
                { text: 'Created_Date', key: 'CreatedDate', type: 'label' },
                { text: 'isLoginanywhere', key: 'isLoginanywhere', type: 'label' }
            ];
            var inObj = {
                Empid: null,
                // model.empid,
                BranchIDs: model.searchbranch ? model.searchbranch.join(',') : null,
                EmpStatus: model.empStatus,
                EmpTypeIDs: model.empType,
                isLoginanywhere: model.isLoginAnywhere
            };
            employeeCreationService.getEmpList(inObj).then(function(response) {
                if (response.data && response.data.length > 0) {
                    model.data = response.data;
                }
            });
        };

        model.setAssignCounts = function() {
            var inobjEmpCounts = {
                EMployeeID: model.AssignEmpID,
                servicegivencount: model.serviceCount,
                matchfollowupcount: model.matchCount,
                marketingticketscount: model.marketCount,
                PhotoCount: model.photoCount,
                HoroCount: model.horoCount,
                EMpname: model.AssignEmpname
            };
            employeeCreationService.setEmpCounts(inobjEmpCounts).then(function(response) {
                model.close();
                if (parseInt(response.data) === 1) {
                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Work assigned Successfully', 4500);
                } else if (parseInt(response.data) === 2) {
                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Updated Successfully', 4500);
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Work assigning failed', 4500);
                }
            });
        };

        model.CreateEmployeeSubmit = function(empid) {
            var Imgpath;
            if (model.upImage) {
                var strCustDtryName = model.newuserID + "_EmplyeeImage";
                Imgpath = "~/Images/EmployeeImages/" + strCustDtryName + "/" + model.newuserID + "_EmplyeeImage." + ((model.upImage.name).split('.'))[1];
            }

            model.inobjemp = {
                FirstName: model.fName,
                LastName: model.lName,
                OfficialEmailID: model.officeEmail,
                HomeBranchID: model.workingBranch,
                WorkPhone: model.landline,
                OfficialCellPhone: model.officePhone,
                HomePhone: model.personalPhone,
                PersonalEmailID: model.personalEmail,
                LoginName: model.newuserID,
                Password: model.password,
                Designation: model.designation,
                LoginLocation: angular.isArray(model.loginLocation) ? model.loginLocation.join(',') : (model.loginLocation ? model.loginLocation : null),
                OfficeFromHrs: model.fromHrs + ':' + model.fromMins + ':00',
                OfficeToHrs: model.toHrs + ':' + model.toMins + ':00',
                DayOff: model.weakOff,
                DateofJoining: model.dateOfJoining ? moment(model.dateOfJoining).format('MM-DD-YYYY') : null,
                DateofReleaving: null,
                ReportingMngrID: null,
                AnnualIncome: null,
                Country: model.country,
                State: model.state,
                District: model.district,
                City: model.city,
                CityOther: null,
                Address: model.address,
                EducationCategory: model.eduCatgory,
                EducationGroup: model.eduGroup,
                EducationSpecialization: model.eduSpecialisation,
                EmployeeImgPath: Imgpath,
                TypeOfEmployee: model.emptype,
                EmployeeStatus: null,
                isLoginAnywhere: model.chkloginaAnyWhere === true ? true : false,
                CreatedEMPID: model.empid,
                loginname: model.newuserID
            };

            switch (model.actionFlag) {
                case 'create':
                    model.inobjemp.EMPID = null;
                    break;
                case 'edit':
                    model.inobjemp.EMPID = model.editEmpid;
                    model.inobjemp.EmployeeStatus = 423;
                    break;
                case 'Delete':
                    model.inobjemp.EMPID = empid;
                    model.inobjemp.EmployeeStatus = 424;
                    break;
                case 'Active':
                    model.inobjemp.EMPID = empid;
                    model.inobjemp.EmployeeStatus = 423;
                    break;
                case 'disable':
                    model.inobjemp.EMPID = empid;
                    model.inobjemp.EmployeeStatus = 425;
                    break;
            }
            debugger;
            employeeCreationService.employeeCreation(model.inobjemp).then(function(response) {
                if (response.data && parseInt(response.data) === 1) {

                    switch (model.actionFlag) {
                        case 'create':
                            if (model.upImage) {
                                var keyname = 'Images/EmployeeImages/' + model.newuserID + '_EmplyeeImage/' + model.newuserID + '_EmplyeeImage.jpg';
                                fileUpload.uploadFileToUrl(model.upImage, '/employeeImgupload', keyname).then(function(res) {

                                });
                            }
                            alertss.timeoutoldalerts(model.scope, 'alert-success', 'Employee creation done successfully', 4500);
                            break;
                        case 'edit':
                            alertss.timeoutoldalerts(model.scope, 'alert-success', 'Employee Updation done successfully', 4500);
                            break;
                        case 'Delete':
                            alertss.timeoutoldalerts(model.scope, 'alert-success', 'Employee deletion done successfully', 4500);
                            break;
                        case 'Active':
                            alertss.timeoutoldalerts(model.scope, 'alert-success', 'Employee activation done successfully', 4500);
                            break;
                        case 'disable':
                            alertss.timeoutoldalerts(model.scope, 'alert-success', 'Employee disabled', 4500);
                            break;
                    }
                    model.reset();
                } else {
                    alertss.timeoutoldalerts(model.scope, 'alert-danger', 'This transaction failed', 4500);

                }
            });
        };

        model.getUserID = function(branchID) {
            if (branchID) {
                employeeCreationService.getUserID(branchID).then(function(response) {
                    if (response.data && response.data.length > 0) {
                        model.newuserID = response.data;
                    }
                });
            }
        };
        model.close = function() {
            modelpopupopenmethod.closepopuppoptopopup();
        };

        return model;

    }
})();