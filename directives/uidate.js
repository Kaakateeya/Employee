angular.module('ui.date', [])

.constant('uiDateConfig', {})

.directive('uiDate', ['uiDateConfig', '$timeout', function(uiDateConfig, $timeout) {
    'use strict';
    var options;
    options = {};
    angular.extend(options, uiDateConfig);
    return {
        require: '?ngModel',
        link: function(scope, element, attrs, controller) {

            // scope.$watch(function() {
            //     return scope.$eval(attrs.ngModel);
            // }, function(value) {
            //     alert(value);

            // });


            var getOptions = function() {
                return angular.extend({}, uiDateConfig, scope.$eval(attrs.uiDate));
            };
            var initDateWidget = function() {
                var showing = false;
                var opts = getOptions();

                // If we have a controller (i.e. ngModelController) then wire it up
                if (controller) {

                    // Set the view value in a $apply block when users selects
                    // (calling directive user's function too if provided)
                    var _onSelect = opts.onSelect || angular.noop;
                    opts.onSelect = function(value, picker) {
                        scope.$apply(function() {
                            showing = true;
                            controller.$setViewValue(element.datepicker("getDate"));
                            _onSelect(value, picker);
                            element.blur();
                        });
                    };
                    opts.beforeShow = function() {
                        showing = true;
                    };
                    opts.onClose = function(value, picker) {
                        showing = false;
                    };
                    element.on('blur', function() {
                        if (!showing) {
                            scope.$apply(function() {
                                element.datepicker("setDate", element.datepicker("getDate"));
                                controller.$setViewValue(element.datepicker("getDate"));
                            });
                        }
                    });

                    // Update the date picker when the model changes
                    controller.$render = function() {
                        var date = controller.$viewValue;
                        if (date) {
                            var dateFormat = opts.format ? moment(date).format(opts.format) : moment(date).format("DD-MM-YYYY");
                            // if (angular.isDefined(date) && date !== null && !angular.isDate(date) && date !== "") {
                            //    throw new Error('ng-Model value must be a Date object - currently it is a ' + typeof date + ' - use ui-date-format to convert it from a string');
                            // }
                            var dateFormatss = new Date(date);

                            element.datepicker("setDate", dateFormatss);
                        }
                    };
                }
                // If we don't destroy the old one it doesn't update properly when the config changes
                element.datepicker('destroy');
                // Create the new datepicker widget
                element.datepicker(opts);
                if (controller) {
                    // Force a render to override whatever is in the input text box
                    controller.$render();
                }
            };
            // Watch for changes to the directives options
            scope.$watch(getOptions, initDateWidget, true);
        }
    };
}]);