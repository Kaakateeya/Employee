(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .directive('countryDirective', directive);

    directive.$inject = ['SelectBindService', 'commonFactory'];

    function directive(SelectBindService, commonFactory) {

        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
                countryshow: '=',
                cityshow: '=',
                dcountry: '=',
                dstate: '=',
                ddistrict: '=',
                dcity: '=',
                othercity: '=',
                strothercity: '=',
                require: '='
            },
            templateUrl: 'templates/countryTemplate.html'
        };
        return directive;

        function link(scope, element, attrs) {

            if (scope.countryshow === true) {
                if (scope.dcountry !== undefined) {
                    scope.stateArr = commonFactory.StateBind(scope.dcountry);
                }
            } else {
                scope.dcountry = '1';
                SelectBindService.stateSelect('1').then(function(response) {
                    scope.stateArr = [];
                    scope.stateArr.push({ "label": "--select--", "title": "--select--", "value": "" });
                    _.each(response.data, function(item) {
                        scope.stateArr.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                    });
                });
            }
            if ((scope.dcountry === '1' || scope.dcountry === 1) && scope.dstate !== undefined) {
                scope.districtArr = commonFactory.districtBind(scope.dstate);
            } else {
                if (scope.dstate !== undefined) {
                    scope.cityeArr = commonFactory.districtBind(scope.dstate);
                }
            }

            if (scope.cityshow === true && scope.cityeArr === undefined) {
                if (scope.ddistrict !== undefined) {
                    scope.cityeArr = commonFactory.cityBind(scope.ddistrict);
                }
            }

            scope.changeBind = function(type, parentval, countryVal) {

                switch (type) {
                    case 'Country':
                        scope.stateArr = commonFactory.StateBind(parentval);
                        break;

                    case 'State':
                        if (countryVal === '1' || countryVal === 1) {
                            scope.districtArr = commonFactory.districtBind(parentval);
                        } else {
                            scope.districtArr = [];
                            scope.cityeArr = commonFactory.districtBind(parentval);
                        }
                        break;

                    case 'District':
                        if (scope.cityshow === true) {
                            scope.cityeArr = commonFactory.cityBind(parentval);
                        }
                        break;
                }

            };
            scope.ShowCity = function() {
                scope.cityinput = true;
                scope.dcity = '';
            };



        }
    }

})();