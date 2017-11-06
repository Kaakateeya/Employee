(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('masterPageModel', factory);

    factory.$inject = ['masterPageService', 'complex-grid-config'];

    function factory(masterPageService, complexgrid) {
        var model = {};
        model.grid1 = {};
        model.grid2 = {};
        model.grid3 = {};
        model.grid4 = {};
        model.grid5 = {};
        model.grid6 = {};
        // model.grid1.showsearchrows = true;
        // model.grid1.showsearch = true;
        // model.grid1.showpaging = true;
        // model.grid1.myprofileexcel = true;
        // model.grid1.normalexcel = true;
        model.showsearchrows = true;
        model.showsearch = true;
        model.showpaging = false;
        model.showClientpaging = true;
        model.myprofileexcel = false;
        model.normalexcel = false;
        model.gridTableshow = false;
        model.init = function() {
            model.selectedIndex = 0;
            model.loadmasterdata('EducationCategory', null);
            model.tabsselected = [
                { tabname: 'Education Master', arrayname: 1, formame: "educationform" },
                { tabname: 'Profession Master', arrayname: 2, formame: "professionform" }
            ];
            return model;
        };
        // model.returnstringvalue = function(value) {
        //     var valuetext = "<a>Edit</a> &nbsp;&nbsp;&nbsp;<a>Select</a>";
        //     return valuetext;
        // };
        // // model.changevalue = function(row) {
        // //     var valuetext = "<a>Active</a> &nbsp;&nbsp;&nbsp;<a>InActive</a>";
        // //     return valuetext;
        // // };
        // model.Educationtemp = function(row) {
        //     var EducationGroup = model.returnstringvalue(row.EducationCategoryID);
        //     return EducationGroup;
        // };
        model.returndynamicarray = function(val) {
            var array;
            if (val === 1) {
                array = model.domEducation;
            } else {
                array = model.domProfession;
            }
            return array;
        };
        model.showcontrolonselect = function(DIVid) {
            var array = model.selectedIndex === 1 ? model.domProfession : model.domEducation;
            _.map(_.where(array, { collapseid: DIVid }), function(item) {
                switch (item.collapseid) {
                    case 1:
                        item.controlList = [{ bindPlusCtrlFlagin: 'joblocation', divClear: true, type: 'state', ngModel: 'jobCountryID', labelName: 'Country Living In', controlType: 'dropdown', isShow: true, dataApi: 'Country', dataSource: 'Country', validation: true }, { bindPlusCtrlFlagin: 'joblocation', type: 'district', ngModel: 'StateID', labelName: 'State Living In', controlType: 'dropdown', isShow: true, dataSource: 'State', validation: true }, { bindPlusCtrlFlagin: 'joblocation', type: 'city', ngModel: 'DistrictID', labelName: 'District Living In', controlType: 'dropdown', isShow: true, dataSource: 'DistrictBind', validation: true }, { bindPlusCtrlFlagin: 'joblocation', ngModel: 'CityID', labelName: 'City Living In', controlType: 'dropdown', isShow: true, dataSource: 'cityBind', validation: true }, { bindPlusCtrlFlagin: 'joblocation', divClear: true, ngModel: 'VisaStatusID', labelName: 'Visa Status', controlType: 'dropdown', isShow: true, dataSource: 'visastatus', dataBind: 'visastatus', validation: true }, { bindPlusCtrlFlagin: 'joblocation', ngModelFrom: 'Residingsincefrom', ngModelTo: 'ResidingsinceTo', labelName: 'Residing Since', controlType: 'datePicker', isShow: true, validation: true }, { bindPlusCtrlFlagin: 'joblocation', ngModelFrom: 'Arrivaldatefrom', ngModelTo: 'Arrivaldateto', labelName: 'Arriving Date', controlType: 'datePicker', isShow: true, validation: true }, { bindPlusCtrlFlagin: 'joblocation', divClear: true, ngModelFrom: 'Departuredatefrom', ngModelTo: 'DeparturedateTo', labelName: 'Departure Date', controlType: 'datePicker', isShow: true, validation: true }];
                        break;
                    case 2:
                        item.controlList = [{ bindPlusCtrlFlagin: 'AstroDetails', divClear: true, type: 'star', ngModel: 'StarLanguageID', labelName: 'Star Language', controlType: 'dropdown', isShow: true, dataApi: 'starLanguage', dataSource: 'starLanguage', validation: true }, { bindPlusCtrlFlagin: 'AstroDetails', ngModel: 'StarsID', labelName: 'Star', controlType: 'dropdown', isShow: true, dataSource: 'stars', dataBind: 'stars', validation: true }, { bindPlusCtrlFlagin: 'AstroDetails', ngModel: 'KojadoshamID', labelName: 'Manglik/Kuja Dosham', controlType: 'radiomalagik', isShow: true, validation: true }];
                        break;
                    case 3:
                        item.controlList = [{ bindPlusCtrlFlagin: 'AstroDetails', divClear: true, type: 'star', ngModel: 'StarLanguageID', labelName: 'Star Language', controlType: 'dropdown', isShow: true, dataApi: 'starLanguage', dataSource: 'starLanguage', validation: true }, { bindPlusCtrlFlagin: 'AstroDetails', ngModel: 'StarsID', labelName: 'Star', controlType: 'dropdown', isShow: true, dataSource: 'stars', dataBind: 'stars', validation: true }, { bindPlusCtrlFlagin: 'AstroDetails', ngModel: 'KojadoshamID', labelName: 'Manglik/Kuja Dosham', controlType: 'radiomalagik', isShow: true, validation: true }];
                        break;
                    case 4:
                        item.controlList = [{ bindPlusCtrlFlagin: 'AstroDetails', divClear: true, type: 'star', ngModel: 'StarLanguageID', labelName: 'Star Language', controlType: 'dropdown', isShow: true, dataApi: 'starLanguage', dataSource: 'starLanguage', validation: true }, { bindPlusCtrlFlagin: 'AstroDetails', ngModel: 'StarsID', labelName: 'Star', controlType: 'dropdown', isShow: true, dataSource: 'stars', dataBind: 'stars', validation: true }, { bindPlusCtrlFlagin: 'AstroDetails', ngModel: 'KojadoshamID', labelName: 'Manglik/Kuja Dosham', controlType: 'radiomalagik', isShow: true, validation: true }];
                        break;
                    case 5:
                        item.controlList = [{ bindPlusCtrlFlagin: 'AstroDetails', divClear: true, type: 'star', ngModel: 'StarLanguageID', labelName: 'Star Language', controlType: 'dropdown', isShow: true, dataApi: 'starLanguage', dataSource: 'starLanguage', validation: true }, { bindPlusCtrlFlagin: 'AstroDetails', ngModel: 'StarsID', labelName: 'Star', controlType: 'dropdown', isShow: true, dataSource: 'stars', dataBind: 'stars', validation: true }, { bindPlusCtrlFlagin: 'AstroDetails', ngModel: 'KojadoshamID', labelName: 'Manglik/Kuja Dosham', controlType: 'radiomalagik', isShow: true, validation: true }];
                        break;
                    case 6:
                        item.controlList = [{ bindPlusCtrlFlagin: 'AstroDetails', divClear: true, type: 'star', ngModel: 'StarLanguageID', labelName: 'Star Language', controlType: 'dropdown', isShow: true, dataApi: 'starLanguage', dataSource: 'starLanguage', validation: true }, { bindPlusCtrlFlagin: 'AstroDetails', ngModel: 'StarsID', labelName: 'Star', controlType: 'dropdown', isShow: true, dataSource: 'stars', dataBind: 'stars', validation: true }, { bindPlusCtrlFlagin: 'AstroDetails', ngModel: 'KojadoshamID', labelName: 'Manglik/Kuja Dosham', controlType: 'radiomalagik', isShow: true, validation: true }];
                        break;
                }

            });
            return false;
        };
        model.dommasterpage = function() {
            if (parseInt(model.selectedIndex) === 0) {
                model.domEducation = [{
                    collapseid: 1,
                    controlList: [
                        { ngModel: 'educationcategory', labelName: 'Education category', controlType: 'textBox', isShow: true, validation: true },
                        { ngModel: 'iscateshowinactive', labelName: '', controlType: 'checkbox', isShow: true, validation: true },
                        { id: 'id1', controlType: 'table', isShow: true, columns: model.grid1.columns, config: model.grid1, model: model.grid1 },
                    ]
                }, {
                    collapseid: 2,
                    controlList: [{ ngModel: 'educationgroup', labelName: 'Education Group', controlType: 'textBox', isShow: true, validation: true },
                        { ngModel: 'isgroupshowinactive', labelName: '', controlType: 'checkbox', isShow: true, validation: true }
                    ]
                }, {
                    collapseid: 3,
                    controlList: [
                        { ngModel: 'educationspeciali', labelName: 'Education Specialization', controlType: 'textBox', isShow: true, validation: true },
                        { ngModel: 'isSpecializashowinactive', labelName: '', controlType: 'checkbox', isShow: true, validation: true }
                    ]
                }];
                model.domProfession = [];
            } else {
                model.domEducation = [{
                        controlList: [
                            { ngModel: 'GenderID', controlType: 'gender', isShow: true, validation: true },
                            { ngModelFrom: 'DOBfrom', ngModelTo: 'DOBTo', labelName: 'Date Of Birth', controlType: 'dobirth', isShow: true, validation: true },
                            { typeofdata: 'Ageselect', ngModelFrom: 'AgeFromID', ngModelTo: 'AgeToID', labelName: 'Age', controlType: 'dualDropdownage', isShow: true, validation: true },
                            { ngModelFrom: 'HeightFromID', ngModelTo: 'HeightToID', labelName: 'Height', controlType: 'dualDropdown', isShow: true, dataBind: 'heightreSearch', dataSource: 'heightregistrationarray', validation: true },
                            { ngModel: 'MaritalstatusID', labelName: 'Marital status', controlType: 'dropdown', isShow: true, dataBind: 'MaritalStatus', dataSource: 'maritalstatusg', validation: true },
                            { type: 'caste', ngModel: 'ReligionID', labelName: 'Religion', controlType: 'dropdown', isShow: true, dataBind: 'Religion', dataSource: 'religiong', validation: true },
                        ]
                    }, {
                        controlList: [
                            { divClear: true, ngModel: 'BranchID', labelName: 'Branch', controlType: 'dropdown', isShow: true, dataSource: 'BranchName', validation: true, dataApi: 'BranchName' },
                            { ngModelFrom: 'Dateofregfrom', ngModelTo: 'Dateofregto', labelName: 'Date Of Reg', controlType: 'datePicker', isShow: true, validation: true },
                            { ngModelFrom: 'LastestLoginsfrom', ngModelTo: 'LastestLoginsto', labelName: 'Lastest Logins', controlType: 'datePicker', isShow: true, validation: true },
                            { divClear: true, ngModelFrom: 'PropertyValuefrom', ngModelTo: 'PropertyValueto', labelName: 'Property In Lakhs', controlType: 'textproperty', isShow: true, validation: true },
                            { ngModel: 'ProfileID', labelName: 'Profile ID', controlType: 'profileid', isShow: true, validation: true },
                        ]
                    }, {
                        controlList: [
                            { divClear: true, ngModel: 'BranchID', labelName: 'Branch', controlType: 'dropdown', isShow: true, dataSource: 'BranchName', validation: true, dataApi: 'BranchName' },
                            { ngModelFrom: 'Dateofregfrom', ngModelTo: 'Dateofregto', labelName: 'Date Of Reg', controlType: 'datePicker', isShow: true, validation: true },
                            { ngModelFrom: 'LastestLoginsfrom', ngModelTo: 'LastestLoginsto', labelName: 'Lastest Logins', controlType: 'datePicker', isShow: true, validation: true },
                            { divClear: true, ngModelFrom: 'PropertyValuefrom', ngModelTo: 'PropertyValueto', labelName: 'Property In Lakhs', controlType: 'textproperty', isShow: true, validation: true },
                            { ngModel: 'ProfileID', labelName: 'Profile ID', controlType: 'profileid', isShow: true, validation: true },
                        ]
                    }

                ];
                model.domProfession = [];
            }

        };
        model.loadmasterdata = function(MasterType, DependentId) {
            model.grid1.columns = [
                { text: 'Education Category', key: 'EducationCategory', type: 'label' },
                { text: 'Status', key: 'StatusCode', type: 'label' },
                // { text: 'Action', key: 'EducationCategoryID', type: 'morelinks', templateUrl: model.Educationtemp },
                // { text: 'Change Status', key: 'EducationCategoryID', type: 'morelinks', templateUrl: model.changevalue }
            ];
            var obj = {
                AppuserID: 1,
                MasterType: MasterType,
                MasterTypeID: null,
                DependentId: DependentId,
                StatusCode: 1
            };
            masterPageService.MasterDataselect(obj).then(function(response) {
                if (_.isArray(response.data) && response.data.length > 0) {
                    model.grid1.data = response.data[0];
                }
            });
        };


        return model;

    }
})();