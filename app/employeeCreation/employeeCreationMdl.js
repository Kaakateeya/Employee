(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('employeeCreationModel', factory);

    factory.$inject = ['employeeCreationService', 'commonFactory', 'Commondependency', 'complex-grid-config'];

    function factory(employeeCreationService, commonFactory, Commondependency, gridConfig) {

        var model = {};
        model = gridConfig;
        model.hrsbindArr = commonFactory.numberBindWithZeros('Hours', 0, 23);
        model.minbindArr = commonFactory.numberBindWithZeros('Minutes', 0, 59);
        model.minsArray = [
            { label: 'Mins', value: 0 },
            { label: '00', value: 1 },
            { label: '30', value: 2 }
        ];

        model.dateOptions = {
            changeMonth: true,
            changeYear: true,
            yearRange: "-40:+5",
            dateFormat: 'dd-mm-yy'
        };

        model.DesignationArr = [{ value: '--select--', Id: '' }, { value: 'Match Followup', Id: 1 }, { value: 'Payment', Id: 2 }, { value: 'Review', Id: 3 }, { value: 'Other', Id: 4 }, { value: 'Marketing', Id: 5 }];
        model.WeekDaysArr = [{ value: 'Monday', Id: '1' }, { value: 'Tuesday', Id: '2' }, { value: 'Wednesday', Id: '3' }, { value: 'Thursday', Id: '4' }, { value: 'Friday', Id: '5' }, { value: 'Saturday', Id: '6' }, { value: 'Sunday', Id: '7' }];
        model.empStatusArr = [
            { value: 'All', Id: '0' },
            { value: 'IsActive', Id: '423' },
            { value: 'Delete', Id: '424' },
            { value: 'Disable', Id: '425' }
        ];

        model.empTypeArr = [
            { value: 'IsAdmin', Id: '1' },
            { value: 'Is Senior', Id: '2' },
            { value: 'Review Emp', Id: '3' },
            { value: 'Marketing Emp', Id: '4' }
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
            model.fromMins = 0;
            model.toHrs = '';
            model.toMins = 0;
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
        };

        model.actionTemplate = function(row) {
            var actionstr = "<a href='javascript:void(0);' ng-click='model.editEmp(" + JSON.stringify(row) + ");'>Edit</a><br><a href='javascript:void(0);'>Delete</a><br><a href='javascript:void(0);'>Disable</a><br><a href='javascript:void(0);'>Assign</a>";
            return actionstr;
        };
        model.empDetailsTemplate = function(row) {
            var empstr = "<b>" + row.FirstName + ' ' + row.LastName + "</b><br><span>" + row.BranchesName + "</span><br><span>" + row.OfficialEmailID + "</span><br><span>" + row.OfficialContactNumber + "</span><br><span>" + row.UserID + "</span>";
            return empstr;
        };
        model.EmpPhotoTemplateUrl = function(row) {
            var src = row.EmpPhoto ? row.EmpPhoto : 'src/images/Manage_blankphoto.png';
            return "<img class='img-circle' src=" + src + " style='width:150px;height:150px;'></img>";
        };



        model.editEmp = function(row) {

            debugger;

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

        model.CreateEmployeeSubmit = function() {
            var Imgpath;
            if (model.upImage) {
                var strCustDtryName = model.newuserID + "_EmplyeeImage";
                Imgpath = "~/Images/EmployeeImages/" + strCustDtryName + "/" + model.newuserID + "_EmplyeeImage." + ((model.upImage.name).split('.'))[1];
            }

            var inobj = {
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
                LoginLocation: model.loginLocation ? model.loginLocation.join(',') : null,
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
                EMPID: null,
                loginname: model.newuserID
            };

            employeeCreationService.employeeCreation(inobj).then(function(response) {
                if (response.data && parseInt(response.data) === 1) {
                    model.reset();
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

        return model;

    }
})();