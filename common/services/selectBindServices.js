(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('SelectBindServicereg', factory)

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            countrySelect: function() {
                return http.get(app.apiroot + 'Dependency/getCountryDependency', { params: { dependencyName: "", dependencyValue: "" } });
            },
            stateSelect: function(dependencyVal) {
                return http.get(app.apiroot + 'Dependency/getCountryDependency', { params: { dependencyName: "state", dependencyValue: dependencyVal } });
            },
            districtSelect: function(dependencyVal1) {
                return http.get(app.apiroot + 'Dependency/getCountryDependency', { params: { dependencyName: "distric", dependencyValue: dependencyVal1 } });
            },
            citySelect: function(dependencyVal2) {

                return http.get(app.apiroot + 'Dependency/getCountryDependency', { params: { dependencyName: "city", dependencyValue: dependencyVal2 } });
            },
            EducationCatgory: function() {
                return http.get(app.apiroot + 'Dependency/getEducationDependency', { params: { dependencyName: "", dependencyValue: "" } });
            },
            EducationGroup: function(dependencyVal2) {
                return http.get(app.apiroot + 'Dependency/getEducationDependency', { params: { dependencyName: "educationGroup", dependencyValue: dependencyVal2 } });
            },
            EducationSpecialisation: function(dependencyVal2) {

                return http.get(app.apiroot + 'Dependency/getEducationDependency', { params: { dependencyName: "educationSpeacialisation", dependencyValue: dependencyVal2 } });
            },
            ProfessionCatgory: function() {
                return http.get(app.apiroot + 'Dependency/getProfessionDependency', { params: { dependencyName: "ProfessionCategory", dependencyValue: "" } });
            },
            ProfessionGroup: function() {
                return http.get(app.apiroot + 'Dependency/getProfessionDependency', { params: { dependencyName: "", dependencyValue: "" } });
            },
            ProfessionSpecialisation: function(dependencyVal2) {

                return http.get(app.apiroot + 'Dependency/getProfessionDependency', { params: { dependencyName: "ProfessionSpecialisation", dependencyValue: dependencyVal2 } });
            },
            profspecialization: function(dependencyVal2) {
                return http.get(app.apiroot + 'Dependency/getProfessionDependency', { params: { dependencyName: "ProfessionSpecialisation", dependencyValue: dependencyVal2 } });
            },
            casteselect: function() {

                return http.get(app.apiroot + 'Dependency/getDropdown_filling_values', { params: { strDropdownname: "CasteName" } });
            },
            countryCodeselect: function() {

                return http.get(app.apiroot + 'Dependency/getDropdown_filling_values', { params: { strDropdownname: "CountryCode" } });
            },
            currency: function() {

                return http.get(app.apiroot + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'Currency', dependencyValue: '', dependencyflagID: '' } });
            },
            stars: function(obj) {
                return http.get(app.apiroot + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'StarType', dependencyValue: obj, dependencyflagID: '' } });
            },
            castedependency: function(obj1, obj2) {

                return http.get(app.apiroot + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'Caste', dependencyValue: obj1, dependencyflagID: obj2 } });
            },
            subCasteBind: function(obj1) {
               
                return http.get(app.apiroot + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'SubCaste', dependencyValue: obj1, dependencyflagID: '' } });
            },
            branch: function(obj1) {

                return http.get(app.apiroot + 'Dependency/getDropdownValues_dependency_injection', { params: { dependencyName: 'Region', dependencyValue: obj1, dependencyflagID: '' } });
            },
            CountryWithCode: function() {
                return http.get(app.apiroot + 'Dependency/getCountryDependencyCountryCode', { params: { dependencyName: "", dependencyValue: "" } });
            }

        };
    }
})();