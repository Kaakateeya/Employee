(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .directive('slidePopup', directive);

    directive.$inject = ['commonFactory', '$uibModal', 'arrayConstantsEdit', 'SelectBindService', 'popupSvc', 'authSvc', '$stateParams', '$filter'];

    function directive(commonFactory, uibModal, cons, SelectBindService, popupSvc, authSvc, stateParams, filter) {

        var directive = {
            link: link,
            restrict: 'EA',
            transclude: true,
            scope: {
                model: '=',
                eventtype: '='
            },
            templateUrl: 'directives/slidePopup/index.html'
        };
        return directive;

        function link(scope, element, attrs) {

            var CustID = stateParams.CustID;
            var loginEmpid = authSvc.LoginEmpid();
            var AdminID = authSvc.isAdmin();
            scope.getExpression = function(val) {
                return val;
            };
            scope.ddlChange = function(value, value2, text, apiPath) {
                if (apiPath) {

                    if (value2) {

                        SelectBindService[apiPath](commonFactory.listSelectedVal(value2), commonFactory.listSelectedVal(value)).then(function(res) {
                            _.map(_.where(scope.model.popupdata, { parentName: text }), function(item) {
                                var depData = [];
                                _.each(res.data, function(item) {
                                    depData.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                });
                                item.dataSource = [];
                                item.dataSource = depData;

                            });
                        });
                    } else {
                        SelectBindService[apiPath](commonFactory.listSelectedVal(value)).then(function(res) {
                            _.map(_.where(scope.model.popupdata, { parentName: text }), function(item) {
                                var depData = [];
                                _.each(res.data, function(item) {
                                    depData.push({ "label": item.Name, "title": item.Name, "value": item.ID });
                                });
                                item.dataSource = [];
                                item.dataSource = depData;
                            });
                        });
                    }
                }
            };

            _.each(scope.model.popupdata, function(item) {
                if (item.arrbind) {
                    var Arr = cons[item.arrbind];
                    if (Arr !== undefined && Arr.length > 0 && angular.lowercase(Arr[0].title) === '--select--') {
                        Arr.splice(0, 1);
                    }
                    item.dataSource = [];
                    item.dataSource = Arr;
                }
                if (item.ownArray) {
                    var Array = scope.model[item.ownArray];
                    if (Array !== undefined && Array.length > 0 && angular.lowercase(Array[0].title) === '--select--') {
                        Array.splice(0, 1);
                    }
                    item.dataSource = [];
                    item.dataSource = Array;
                }
                if (scope.eventtype === 'add') {
                    if (item.ngmodel)
                        scope.model[item.ngmodel] = undefined;
                    else if (item.controlType === 'country') {
                        scope.model[item.dcountry] = undefined;
                        scope.model[item.dstate] = undefined;
                        scope.model[item.ddistrict] = undefined;
                        scope.model[item.dcity] = undefined;
                        scope.model[item.strothercity] = undefined;
                    } else if (item.controlType === 'textboxSelect') {
                        scope.model[item.ngmodelSelect] = undefined;
                        scope.model[item.ngmodelText] = undefined;
                    } else if (item.controlType === 'contact') {
                        scope.model[item.dmobile] = undefined;
                        scope.model[item.strmobile] = undefined;
                        scope.model[item.dalternative] = undefined;
                        scope.model[item.stralternative] = undefined;
                        scope.model[item.dland] = undefined;
                        scope.model[item.strareacode] = undefined;
                        scope.model[item.strland] = undefined;
                        scope.model[item.strmail] = undefined;
                    }

                }

                if (scope.model[item.ngmodel] && item.childName) {
                    scope.ddlChange(scope.model[item.firstparent], scope.model[item.secondParent], item.childName, item.changeApi);
                }
            });

            scope.model.returnString = function(str) {
                return 'dynamicForm.' + str + '.$invalid';
            };
            scope.submit = function() {

                var parameters = {};
                _.each(scope.model.popupdata, function(item) {
                    if (item.parameterValue) {
                        parameters[item.parameterValue] = commonFactory.listSelectedVal(scope.model[item.ngmodel]);
                    } else if (item.controlType === 'country') {
                        parameters[item.countryParameterValue] = item.countryshow === false ? 1 : scope.model[item.dcountry];
                        parameters[item.stateParameterValue] = scope.model[item.dstate];
                        parameters[item.districtParameterValue] = scope.model[item.ddistrict];
                        parameters[item.cityParameterValue] = scope.model[item.dcity];
                        parameters[item.cityotherParameterValue] = scope.model[item.strothercity];
                    } else if (item.controlType === 'textboxSelect') {
                        parameters[item.parameterValueSelect] = scope.model[item.ngmodelSelect];
                        parameters[item.parameterValueText] = scope.model[item.ngmodelText];
                    } else if (item.controlType === 'contact') {
                        parameters[item.mobileCodeIdParameterValue] = scope.model[item.dmobile];
                        parameters[item.mobileNumberParameterValue] = scope.model[item.strmobile];
                        parameters[item.landCountryCodeIdParameterValue] = commonFactory.checkvals(scope.model[item.dalternative]) ? scope.model[item.dalternative] : (commonFactory.checkvals(scope.model[item.dland]) ? scope.model[item.dland] : null);
                        parameters[item.landAreaCodeIdParameterValue] = commonFactory.checkvals(scope.model[item.stralternative]) ? null : (commonFactory.checkvals(scope.model[item.strareacode]) ? scope.model[item.strareacode] : null);
                        parameters[item.landNumberParameterValue] = commonFactory.checkvals(scope.model[item.stralternative]) ? scope.model[item.stralternative] : (commonFactory.checkvals(scope.model[item.strland]) ? scope.model[item.strland] : null);
                        parameters[item.emailParameterValue] = scope.model[item.strmail];
                    } else if (item.controlType === 'doublemultiselect') {
                        parameters[item.parameterValue1] = commonFactory.listSelectedVal(scope.model[item.ngmodelSelect1]);
                        parameters[item.parameterValue2] = commonFactory.listSelectedVal(scope.model[item.ngmodelSelect2]);
                    } else if (item.controlType === 'housewife') {
                        parameters[item.parameterValueText] = commonFactory.listSelectedVal(scope.model[item.ngmodelText]);
                        parameters[item.parameterValueChk] = commonFactory.listSelectedVal(scope.model[item.ngmodelChk]);
                    } else if (item.controlType === 'astroTimeOfBirth') {
                        parameters.TimeofBirth = scope.model.ddlFromHours + ":" + scope.model.ddlFromMinutes + ":" + scope.model.ddlFromSeconds;
                    } else if (item.controlType === 'date') {
                        parameters[item.parameterValueDate] = scope.model[item.ngmodel] !== '' && scope.model[item.ngmodel] !== 'Invalid date' ? filter('date')(scope.model[item.ngmodel], 'yyyy-MM-dd') : '';
                    }
                });

                var inputDataObj = {
                    GetDetails: parameters,
                    customerpersonaldetails: {
                        intCusID: CustID,
                        EmpID: loginEmpid,
                        Admin: AdminID
                    }
                };

                scope.model.updateData(inputDataObj, scope.model.popupHeader);

            };
            scope.cancel = function() {
                commonFactory.closepopup();
            };

            scope.chkChange = function(chk) {
                return chk === true ? 'HouseWife' : '';
            };
            scope.dateOptions = {
                changeMonth: true,
                changeYear: true,
                yearRange: "-40:+5",
                dateFormat: 'dd-mm-yy'
            };

        }
    }

})();