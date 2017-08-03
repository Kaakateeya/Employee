(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .directive('contactDirective', directive);

    directive.$inject = ['SelectBindService', 'commonFactory', '$mdDialog', 'authSvc', 'baseModel', 'SelectBindServicereg', 'alert'];

    function directive(SelectBindService, commonFactory, mdDialog, authSvc, baseModel, SelectBindServicereg, alertss) {

        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
                dmobile: '=',
                strmobile: '=',
                dalternative: '=',
                stralternative: '=',
                dland: '=',
                strareacode: '=',
                strland: '=',
                strmail: '=',
                emailhide: '=',
                emailvalidation: '='
            },
            templateUrl: 'templates/contacttemplate.html'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.AdminID = authSvc.isAdmin();
            scope.Managementid = authSvc.isManagement() !== undefined && authSvc.isManagement() !== null && authSvc.isManagement() !== "" ? authSvc.isManagement() : "";
            scope.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
            scope.isprofileOwner = baseModel.isprofileOwner;

            scope.amob = (scope.stralternative !== null && scope.stralternative !== '' && scope.stralternative !== undefined) ? true : false;
            scope.land = (scope.strareacode !== null && scope.strareacode !== '' && scope.strareacode !== undefined) ? true : false;
            scope.mail = (scope.strmail !== null && scope.strmail !== '' && scope.strmail !== undefined && scope.emailhide === true) ? true : false;
            scope.pmob = (scope.strmobile !== null && scope.strmobile !== '' && scope.strmobile !== undefined) ? true : false;
            scope.showhidemob = function(ev, type) {
                scope.confirm = null;
                switch (type) {
                    case 'mob':
                        if (scope.pmob === false) {
                            scope.pmob = true;
                        } else {
                            var lNaumber = scope.strland;
                            scope.checkMobile(ev, lNaumber, 'land', 'landline');
                        }
                        break;
                    case 'land':
                        var lNaumber1 = scope.stralternative;
                        scope.checkMobile(ev, lNaumber1, 'mob', 'alternative');
                        break;
                    case 'mail':
                        scope.mail = true;
                        break;
                }
            };
            scope.checkMobile = function(ev, strval, type, strdisplay) {
                if (strval !== "" && strval !== undefined && strval !== null) {
                    scope.confirm = commonFactory.showConfirm(ev, mdDialog, 'Are You Sure To Delete ' + strdisplay + ' Number', 'delete', 'cancel');
                    scope.test(type);
                } else {
                    scope.clear(type);
                }
            };
            scope.clear = function(type) {
                if (type === 'mob') {
                    scope.amob = false;
                    scope.land = true;
                    scope.dalternative = "";
                    scope.stralternative = "";
                } else {
                    scope.amob = true;
                    scope.land = false;
                    scope.dland = "";
                    scope.strareacode = "";
                    scope.strland = "";
                }
            };
            scope.test = function(type) {
                mdDialog.show(scope.confirm).then(function() {
                    scope.clear(type);
                }, function() {});
            };

            scope.EmailValidation = function() {
                // if (scope.emailvalidation === true) {
                //     SelectBindServicereg.emailExists({ iflagEmailmobile: 0, EmailMobile: scope.strmail }).then(function(response) {
                //         if (response.data === 1) {
                //             scope.strmail = '';
                //             alertss.timeoutoldalerts(scope, 'alert-danger', 'Email Already Exists', 9500);
                //         }
                //     });
                // }
            };
        }
    }
})();


angular.module('Kaakateeya').directive('ngModelOnblur', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        priority: 1, // needed for angular 1.2.x
        link: function(scope, elm, attr, ngModelCtrl) {
            if (attr.type === 'radio' || attr.type === 'checkbox') return;

            elm.unbind('input').unbind('keydown').unbind('change');
            elm.bind('blur', function() {
                scope.$apply(function() {
                    ngModelCtrl.$setViewValue(elm.val());
                });
            });
        }
    };
});