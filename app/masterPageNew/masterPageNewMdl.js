(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('masterPageNewModel', factory);
    factory.$inject = ['masterPageNewService', 'complex-grid-config'];

    function factory(masterPageNewService, complexgrid) {
        var model = {};
        model.grid1 = {};
        model.grid2 = {};
        model.grid3 = {};
        model.showsearchrows = true;
        model.showsearch = true;
        model.showpaging = true;
        model.showClientpaging = false;
        model.myprofileexcel = false;
        model.normalexcel = false;
        model.gridTableshow = false;
        model.showplus = false;
        model.init = function() {
            model.selectedIndex = 0;
            model.grid1.data = [];
            model.labelName = 'Education Category';
            model.labelgroupName = 'Education Group';
            model.labelSpecialName = 'EduSpecialization name';
            model.grid1.columns = [
                { text: 'Education Category', key: 'EducationCategory', type: 'label' },
                { text: 'Status', key: 'StatusCode', type: 'label' },
                { text: 'Action', key: 'EducationCategoryID', type: 'morelinks', templateUrl: model.Educationtemp },
                { text: 'Change Status', key: 'EducationCategoryID', type: 'morelinks', templateUrl: model.changevaluestring }
            ];
            model.typeindex = 'Education Master';
            model.loadmasterdata('EducationCategory', null, 1);
            model.tabsselected = [
                { tabname: 'Education Master', arrayname: 1, formame: "educationform" },
                { tabname: 'Profession Master', arrayname: 2, formame: "professionform" }
            ];
        };
        model.masterpageid = function(id, type) {
            model.typeindex = type;
            model.grid1.columns = [];
            model.grid1.data = [];
            model.grid2.data = [];
            model.grid3.data = [];
            if (type === 'Education Master') {
                model.grid1.columns = [
                    { text: 'Education Category', key: 'EducationCategory', type: 'label' },
                    { text: 'Status', key: 'StatusCode', type: 'label' },
                    { text: 'Action', key: 'EducationCategoryID', type: 'morelinks', templateUrl: model.Educationtemp },
                    { text: 'Change Status', key: 'EducationCategoryID', type: 'morelinks', templateUrl: model.changevaluestring }
                ];
                model.loadmasterdata('EducationCategory', null, 1);
                model.labelName = 'Education Category';
                model.labelgroupName = 'Education Group';
                model.labelSpecialName = 'EduSpecialization name';
            } else {
                model.grid1.columns = [
                    { text: 'Profession Category', key: 'ProfessionCategory', type: 'label' },
                    { text: 'Status', key: 'StatusCode', type: 'label' },
                    { text: 'Action', key: 'ProfessionCategoryID', type: 'morelinks', templateUrl: model.professioncategorytemptemp },
                    { text: 'Change Status', key: 'ProfessionCategoryID', type: 'morelinks', templateUrl: model.changevaluestringprofession }
                ];
                model.labelName = 'Profession Category';
                model.labelgroupName = 'Profession Group';
                model.labelSpecialName = 'Profession name';
                model.loadmasterdata('ProfessionCategory', null, 1);
                model.loadmasterdata('ProfessionGroup', null, 2);
            }
        };
        //
        model.returnstringvalue = function(type, dependencyid, grid) {
            var valuetext = "<a href='javascript:void(0)'>Edit</a> &nbsp;&nbsp;&nbsp;<a href='javascript:void(0);' ng-click='model.loadmasterdata(" + JSON.stringify(type) + "," + dependencyid + "," + grid + ")'>Select</a>";
            return valuetext;
        };
        model.changevalue = function(value) {
            var valuetext = "<a  href='javascript:void(0)'>Active</a> &nbsp;&nbsp;&nbsp;<a  href='javascript:void(0)'>InActive</a>";
            return valuetext;
        };

        model.professioncategorytemptemp = function(row) {
            var valuetext = "<a href='javascript:void(0)'>Edit</a> &nbsp;&nbsp;&nbsp;";
            return valuetext;
        };
        model.professiongrouptemptemp = function(row) {
            var valuetext = "<a href='javascript:void(0)'>Edit</a> &nbsp;&nbsp;&nbsp;<a href='javascript:void(0);' ng-click='model.loadmasterdata(" + JSON.stringify('Profession') + "," + row.ProfessionGroupID + "," + 3 + ")'>Select</a>";
            return valuetext;
        };
        //
        model.Educationtemp = function(row) {
            var Educationcat = model.returnstringvalue('EducationGroup', row.EducationCategoryID, 2);
            return Educationcat;
        };
        model.changevaluestring = function(row) {
            var EducationGroup = model.changevalue(row.EducationCategoryID);
            return EducationGroup;
        };
        model.changevaluestringprofession = function(row) {
            var EducationGroup = model.changevalue(row.ProfessionCategoryID);
            return EducationGroup;
        };
        model.changevaluestringprofessionspl = function(row) {
            var EducationGroup = model.changevalue(row.ProfessionID);
            return EducationGroup;
        };
        model.Educationgrouptemp = function(row) {
            var Educationcat = model.returnstringvalue('EduSpecialization', row.EducationGroupID, 3);
            return Educationcat;
        };

        model.changevaluestringedugroup = function(row) {
            var EducationGroup = model.changevalue(row.EducationGroupID);
            return EducationGroup;
        };
        model.Educationspecializationtemp = function(row) {
            var valuetext = "<a href='javascript:void(0)'>Edit</a> &nbsp;&nbsp;&nbsp;";
            return valuetext;
        };
        model.changevaluestringeduspl = function(row) {
            var EducationGroup = model.changevalue(row.EducationGroupID);
            return EducationGroup;
        };

        model.professiongrouptemptspl = function(row) {
            var valuetext = "<a href='javascript:void(0)'>Edit</a> &nbsp;&nbsp;&nbsp;";
            return valuetext;
        };



        model.returndynamicarray = function(val) {
            var array;
            if (val === 1) {
                array = model.domEducation;
            } else {
                array = model.domProfession;
            }
            return array;
        };
        model.grid3.loadmasterdata = model.grid1.loadmasterdata = model.grid2.loadmasterdata = model.loadmasterdata = function(MasterType, DependentId, grid) {
            var obj = {
                AppuserID: 1,
                MasterType: MasterType,
                MasterTypeID: null,
                DependentId: DependentId,
                StatusCode: 1
            };
            masterPageNewService.MasterDataselect(obj).then(function(response) {
                console.log(response);
                if (_.isArray(response.data) && response.data.length > 0) {
                    switch (grid) {
                        case 1:
                            if (model.typeindex === 'Education Master') {
                                model.grid1.data = response.data[0];
                            } else {
                                model.grid1.data = response.data[0];
                            }
                            break;
                        case 2:
                            if (model.typeindex === 'Education Master') {
                                model.grid2.columns = [
                                    { text: 'Education Category', key: 'EducationCategory', type: 'label' },
                                    { text: 'Education Group Name', key: 'EducationGroupName', type: 'label' },
                                    { text: 'Status', key: 'StatusCode', type: 'label' },
                                    { text: 'Action', key: 'EducationGroupID', type: 'morelinks', templateUrl: model.Educationgrouptemp },
                                    { text: 'Change Status', key: 'EducationGroupID', type: 'morelinks', templateUrl: model.changevaluestringedugroup }
                                ];
                                model.grid2.data = response.data[0];
                            } else {
                                model.grid2.columns = [
                                    { text: 'Profession Group Name', key: 'ProfessionGroupName', type: 'label' },
                                    { text: 'Status', key: 'StatusCode', type: 'label' },
                                    { text: 'Action', key: 'ProfessionGroupID', type: 'morelinks', templateUrl: model.professiongrouptemptemp },
                                    { text: 'Change Status', key: 'ProfessionGroupID', type: 'morelinks', templateUrl: model.changevaluestringprofession }
                                ];
                                model.grid2.data = response.data[0];
                                model.grid3.data = [];
                            }
                            break;
                        case 3:
                            if (model.typeindex === 'Education Master') {
                                model.grid3.columns = [
                                    { text: 'Education Group Name', key: 'EducationGroupName', type: 'label' },
                                    { text: 'EduSpecialization Name', key: 'EduSpecializationName', type: 'label' },
                                    { text: 'Status', key: 'StatusCode', type: 'label' },
                                    { text: 'Action', key: 'EduSpecializationID', type: 'morelinks', templateUrl: model.Educationspecializationtemp },
                                    { text: 'Change Status', key: 'EduSpecializationID', type: 'morelinks', templateUrl: model.changevaluestringeduspl }
                                ];
                            } else {
                                model.grid3.columns = [
                                    { text: 'Profession group name', key: 'ProfessionGroupName', type: 'label' },
                                    { text: 'Profession name', key: 'ProfessionName', type: 'label' },
                                    { text: 'Status', key: 'StatusCode', type: 'label' },
                                    { text: 'Action', key: 'ProfessionID', type: 'morelinks', templateUrl: model.professiongrouptemptspl },
                                    { text: 'Change Status', key: 'ProfessionID', type: 'morelinks', templateUrl: model.changevaluestringprofessionspl }
                                ];
                            }
                            model.grid3.data = response.data[0];
                            break;
                    }
                }
            });
        };
        return model;
    }
})();