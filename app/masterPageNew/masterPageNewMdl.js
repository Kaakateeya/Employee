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
            model.statuscode = 1;
            model.grid1.data = [];
            model.grid1.columns = [];
            model.grid2.columns = [];
            model.grid3.columns = [];
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
            model.loadmasterdata('EducationCategory', null, 1, 1);
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
            model.dynamictextbox = '';
            model.dynamicgrouptextbox = '';
            model.dynamicspltextbox = '';
            model.editflag = null;
            if (type === 'Education Master') {
                model.grid1.columns = [
                    { text: 'Education Category', key: 'EducationCategory', type: 'label' },
                    { text: 'Status', key: 'StatusCode', type: 'label' },
                    { text: 'Action', key: 'EducationCategoryID', type: 'morelinks', templateUrl: model.Educationtemp },
                    { text: 'Change Status', key: 'EducationCategoryID', type: 'morelinks', templateUrl: model.changevaluestring }
                ];
                model.loadmasterdata('EducationCategory', null, 1, 1);
                model.labelName = 'Education Category';
                model.labelgroupName = 'Education Group';
                model.labelSpecialName = 'EduSpecialization name';
                model.grid2.columnsshow = false;
                model.grid3.columnsshow = false;

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
                model.loadmasterdata('ProfessionCategory', null, 1, 1);
                model.loadmasterdata('ProfessionGroup', null, 2, 1);
                model.grid2.columnsshow = true;
                model.grid3.columnsshow = false;
            }
        };
        model.submitupdate = function(lblname) {
            var terst, object;
            if (model.editflag === 0) {
                switch (model.typeofcategory) {
                    case 'EducationCategory':
                    case 'ProfessionCategory':
                        terst = model.dynamictextbox;
                        model.dynamicdependency = null;
                        break;
                    case 'EducationGroup':
                    case 'ProfessionGroup':
                        terst = model.dynamicgrouptextbox;
                        debugger;
                        model.dynamicdependency = model.typeofcategory === 'EducationGroup' ? model.EducationGroup : null;
                        break;
                    case 'EduSpecialization':
                    case 'Profession':
                        terst = model.dynamicspltextbox;
                        model.dynamicdependency = model.typeofcategory === 'EduSpecialization' ? model.EducationGroupspecialization : model.Professionid;
                        break;
                }
                object = {
                    AppUserId: 1,
                    Name: terst,
                    CountryCode: null,
                    CountryCurrency: null,
                    MobileLength: null,
                    landlineLength: null,
                    StatusCode: 1,
                    MasterType: model.typeofcategory,
                    DependentId: model.dynamicdependency,
                    DependentDistrictIDId: null,
                    SubDependentId: null,
                    MinWords: null,
                    MaxWords: null,
                    CostPOBox: null,
                    LanguageID: null,
                    Comments: null,
                    ExtraWordPrice: null,
                    TamilStarName: null,
                    KannadaStarName: null,
                    MasterTypeID: model.dependencyid
                };

            } else {
                switch (model.typeofcategory) {
                    case 'Education Category':
                        model.typeofcategory = 'EducationCategory';
                        terst = model.dynamictextbox;
                        break;
                    case 'Education Group':
                        model.typeofcategory = 'EducationGroup';
                        terst = model.dynamicgrouptextbox;
                        break;
                    case 'EduSpecialization name':
                        model.typeofcategory = 'EduSpecialization';
                        terst = model.dynamicspltextbox;
                        break;
                    case 'Profession Category':
                        model.typeofcategory = 'ProfessionCategory';
                        terst = model.dynamictextbox;
                        break;
                    case 'Profession Group':
                        model.typeofcategory = 'ProfessionGroup';
                        terst = model.dynamicgrouptextbox;
                        break;
                    case 'Profession name':
                        model.typeofcategory = 'Profession';
                        terst = model.dynamicspltextbox;
                        break;
                }
                object = {
                    AppUserId: 1,
                    Name: terst,
                    CountryCode: null,
                    CountryCurrency: null,
                    MobileLength: null,
                    landlineLength: null,
                    StatusCode: 1,
                    MasterType: model.typeofcategory,
                    DependentId: null,
                    DependentDistrictIDId: null,
                    SubDependentId: null,
                    MinWords: null,
                    MaxWords: null,
                    CostPOBox: null,
                    LanguageID: null,
                    Comments: null,
                    ExtraWordPrice: null,
                    TamilStarName: null,
                    KannadaStarName: null,
                    MasterTypeID: null
                };
            }
            model.submitforallleditupdate(object);
        };

        model.submitforallleditupdate = function(object) {
            masterPageNewService.MasterdataInsertUpdate(object).then(function(response) {
                model.editflag = null;
                switch (model.typeofcategory) {
                    case 'EducationCategory':
                        model.loadmasterdata('EducationCategory', null, 1, 1);
                        break;
                    case 'EducationGroup':
                        model.loadmasterdata('EducationGroup', model.dependencyid, 2, 1);
                        break;
                    case 'EduSpecialization':
                        model.loadmasterdata('EduSpecialization', model.dependencyid, 3, 1);
                        break;
                    case 'ProfessionCategory':
                        model.loadmasterdata('ProfessionCategory', null, 1, 1);
                        break;
                    case 'ProfessionGroup':
                        model.loadmasterdata('ProfessionGroup', null, 2, 1);
                        break;
                    case 'Profession':
                        model.loadmasterdata('Profession', model.Professionid, 3, 1);
                        break;
                }
            });
        };
        model.editvalues = model.grid3.editvalues = model.grid2.editvalues = model.grid1.editvalues = function(dependencyid, dependencyvalue, statuscode, editflag, type) {
            model.editflag = editflag;
            model.dependencyid = dependencyid;
            switch (type) {
                case 'educate':
                    model.typeofcategory = 'EducationCategory';
                    model.dynamictextbox = dependencyvalue;
                    model.dynamicgrouptextbox = '';
                    model.dynamicspltextbox = '';
                    break;
                case 'edugroup':
                    model.typeofcategory = 'EducationGroup';
                    model.dynamicgrouptextbox = dependencyvalue;
                    model.dynamictextbox = '';
                    model.dynamicspltextbox = '';
                    break;
                case 'eduspl':
                    model.typeofcategory = 'EduSpecialization';
                    model.dynamicspltextbox = dependencyvalue;
                    model.dynamictextbox = '';
                    model.dynamicgrouptextbox = '';
                    break;
                case 'profcate':
                    model.typeofcategory = 'ProfessionCategory';
                    model.dynamictextbox = dependencyvalue;
                    model.dynamicgrouptextbox = '';
                    model.dynamicspltextbox = '';
                    break;
                case 'profgroup':
                    model.typeofcategory = 'ProfessionGroup';
                    model.dynamicgrouptextbox = dependencyvalue;
                    model.dynamictextbox = '';
                    model.dynamicspltextbox = '';
                    break;
                case 'profspl':
                    model.typeofcategory = 'Profession';
                    model.dynamicspltextbox = dependencyvalue;
                    model.dynamictextbox = '';
                    model.dynamicgrouptextbox = '';
                    break;
            }
        };
        //
        //
        model.returnstringvalue = function(type, dependencyid, grid, editvalue, statuscode, editflag, typeofedit) {
            var valuetext = "<a href='javascript:void(0)' ng-click='model.editvalues(" + dependencyid + "," + JSON.stringify(editvalue) + ", " + JSON.stringify(statuscode) + ", " + editflag + "," + JSON.stringify(typeofedit) + ")' >Edit</a> &nbsp;&nbsp;&nbsp;<a href='javascript:void(0);' ng-click='model.educationprofessionload(" + JSON.stringify(type) + "," + dependencyid + "," + grid + ",1)'>Select</a>";
            return valuetext;
        };
        model.changevalue = function(id, name, category, dependencyid) {
            var valuetext = "<a  href='javascript:void(0)' ng-click='model.activeinactive(" + id + "," + name + "," + category + ",1," + dependencyid + ")'>Active</a> &nbsp;&nbsp;&nbsp;<a  href='javascript:void(0)' ng-click='model.activeinactive(" + id + "," + name + "," + category + ",0," + dependencyid + ")'>InActive</a>";
            return valuetext;
        };
        //

        model.grid3.activeinactive = model.grid2.activeinactive = model.grid1.activeinactive = model.activeinactive = function(id, name, category, status, dependencyid) {
            model.typeofcategory = category;
            model.dependencyid = dependencyid;
            var object = {
                AppUserId: 1,
                Name: name,
                CountryCode: null,
                CountryCurrency: null,
                MobileLength: null,
                landlineLength: null,
                StatusCode: status,
                MasterType: category,
                DependentId: dependencyid,
                DependentDistrictIDId: null,
                SubDependentId: null,
                MinWords: null,
                MaxWords: null,
                CostPOBox: null,
                LanguageID: null,
                Comments: null,
                ExtraWordPrice: null,
                TamilStarName: null,
                KannadaStarName: null,
                MasterTypeID: id
            };
            model.submitforallleditupdate(object);
        };

        model.grid3.educationprofessionload = model.grid1.educationprofessionload = model.grid2.educationprofessionload = model.educationprofessionload = function(MasterType, DependentId, grid, statuscode) {
            if (MasterType === 'EducationGroup') {
                model.EducationGroup = DependentId;
                model.loadmasterdata(MasterType, DependentId, grid, statuscode);
            } else if (MasterType === 'Profession') {
                model.Professionid = DependentId;
                model.loadmasterdata(MasterType, DependentId, grid, statuscode);
            } else {
                model.EducationGroupspecialization = DependentId;
                model.loadmasterdata(MasterType, DependentId, grid, statuscode);
            }
        };
        model.professioncategorytemptemp = function(row) {
            var valuetext = "<a href='javascript:void(0)' ng-click='model.editvalues(" + row.ProfessionCategoryID + "," + JSON.stringify(row.ProfessionCategory) + ", " + JSON.stringify(row.StatusCode) + ", " + 0 + "," + JSON.stringify('profcate') + ")'>Edit</a> &nbsp;&nbsp;&nbsp;";
            return valuetext;
        };
        model.professiongrouptemptemp = function(row) {
            var valuetext = "<a href='javascript:void(0)'  ng-click='model.editvalues(" + row.ProfessionGroupID + "," + JSON.stringify(row.ProfessionGroupName) + ", " + JSON.stringify(row.StatusCode) + ", " + 0 + "," + JSON.stringify('profgroup') + ")'>Edit</a> &nbsp;&nbsp;&nbsp;<a href='javascript:void(0);' ng-click='model.educationprofessionload(" + JSON.stringify('Profession') + "," + row.ProfessionGroupID + "," + 3 + ",1)'>Select</a>";
            return valuetext;
        };
        model.Educationtemp = function(row) {
            var Educationcat = model.returnstringvalue('EducationGroup', row.EducationCategoryID, 2, row.EducationCategory, row.StatusCode, 0, 'educate');
            return Educationcat;
        };
        model.Educationgrouptemp = function(row) {
            var Educationcat = model.returnstringvalue('EduSpecialization', row.EducationGroupID, 3, row.EducationGroupName, row.StatusCode, 0, 'edugroup');
            return Educationcat;
        };
        model.Educationspecializationtemp = function(row) {
            var valuetext = "<a href='javascript:void(0)' ng-click='model.editvalues(" + model.EducationGroupspecialization + ", " + JSON.stringify(row.EduSpecializationName) + ", 1, 0, " + JSON.stringify('eduspl') + ")'>Edit</a> &nbsp;&nbsp;&nbsp;";
            return valuetext;
        };
        model.professiongrouptemptspl = function(row) {
            var valuetext = "<a href='javascript:void(0)'  ng-click='model.editvalues(" + row.ProfessionID + "," + JSON.stringify(row.ProfessionName) + ", " + JSON.stringify(row.StatusCode) + ", " + 0 + "," + JSON.stringify('profspl') + ")'>Edit</a> &nbsp;&nbsp;&nbsp;";
            return valuetext;
        };
        model.changevaluestring = function(row) {
            var EducationGroup = model.changevalue(row.EducationCategoryID, JSON.stringify(row.EducationCategory), JSON.stringify('EducationCategory'), null);
            return EducationGroup;
        };
        model.changevaluestringedugroup = function(row) {
            var EducationGroup = model.changevalue(row.EducationGroupID, JSON.stringify(row.EducationGroupName), JSON.stringify('EducationGroup'), model.EducationGroup);
            return EducationGroup;
        };
        model.changevaluestringeduspl = function(row) {
            var EducationGroup = model.changevalue(row.EduSpecializationID, JSON.stringify(row.EduSpecializationName), JSON.stringify('EduSpecialization'), model.EducationGroupspecialization);
            return EducationGroup;
        };
        model.changevaluestringprofession = function(row) {
            var EducationGroup = model.changevalue(row.ProfessionCategoryID, JSON.stringify(row.ProfessionCategory), JSON.stringify('ProfessionCategory'), null);
            return EducationGroup;
        };
        model.changevaluestringprofessiongroup = function(row) {
            var EducationGroup = model.changevalue(row.ProfessionGroupID, JSON.stringify(row.ProfessionGroupName), JSON.stringify('ProfessionGroup'), null);
            return EducationGroup;
        };
        model.changevaluestringprofessionspl = function(row) {
            var EducationGroup = model.changevalue(row.ProfessionID, JSON.stringify(row.ProfessionName), JSON.stringify('Profession'), model.Professionid);
            return EducationGroup;
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
        model.grid3.loadmasterdata = model.grid1.loadmasterdata = model.grid2.loadmasterdata = model.loadmasterdata = function(MasterType, DependentId, grid, statuscode) {
            var obj = {
                AppuserID: 1,
                MasterType: MasterType,
                MasterTypeID: null,
                DependentId: DependentId,
                StatusCode: statuscode
            };
            switch (grid) {
                case 1:
                    model.grid1.columnsshow = true;
                    break;
                case 2:
                    model.grid2.columnsshow = true;
                    break;
                case 3:
                    model.grid3.columnsshow = true;
                    break;
            }
            masterPageNewService.MasterDataselect(obj).then(function(response) {
                if (_.isArray(response.data) && response.data.length > 0) {
                    switch (grid) {
                        case 1:
                            if (model.typeindex === 'Education Master') {
                                model.grid1.data = response.data[0];
                                model.grid2.data = [];
                                model.grid3.data = [];
                            } else {
                                model.grid1.data = response.data[0];
                                model.grid2.data = [];
                                model.grid3.data = [];
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
                                model.grid3.data = [];
                            } else {
                                model.grid2.columns = [
                                    { text: 'Profession Group Name', key: 'ProfessionGroupName', type: 'label' },
                                    { text: 'Status', key: 'StatusCode', type: 'label' },
                                    { text: 'Action', key: 'ProfessionGroupID', type: 'morelinks', templateUrl: model.professiongrouptemptemp },
                                    { text: 'Change Status', key: 'ProfessionGroupID', type: 'morelinks', templateUrl: model.changevaluestringprofessiongroup }
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

        model.filteractiveinactive = function(con, labelname) {
            if (con === true) {
                model.statuscode = 0;
            } else {
                model.statuscode = 1;
            }
            switch (labelname) {
                case 'Education Category':
                    model.loadmasterdata('EducationCategory', null, 1, model.statuscode);
                    break;
                case 'Education Group':
                    model.loadmasterdata('EducationGroup', model.EducationGroup, 2, model.statuscode);
                    break;
                case 'EduSpecialization name':
                    model.loadmasterdata('EduSpecialization', model.EducationGroupspecialization, 3, model.statuscode);
                    break;
                case 'Profession Category':
                    model.loadmasterdata('ProfessionCategory', null, 1, model.statuscode);
                    break;
                case 'Profession Group':
                    model.loadmasterdata('ProfessionGroup', null, 2, model.statuscode);
                    break;
                case 'Profession name':
                    model.loadmasterdata('Profession', model.Professionid, 3, model.statuscode);
                    break;
            }
        };
        return model;
    }
})();