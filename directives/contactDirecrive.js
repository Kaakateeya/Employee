(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .directive('contactDirective', directive);

    directive.$inject = ['SelectBindService', 'commonFactory', '$mdDialog', 'authSvc', 'baseModel'];

    function directive(SelectBindService, commonFactory, mdDialog, authSvc, baseModel) {

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
                emailhide: '='
            },
            templateUrl: 'templates/contacttemplate.html'
        };
        return directive;

        function link(scope, element, attrs) {
            debugger;
            scope.AdminID = authSvc.isAdmin();
            scope.Managementid = authSvc.isManagement() !== undefined && authSvc.isManagement() !== null && authSvc.isManagement() !== "" ? authSvc.isManagement() : "";
            scope.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
            scope.isprofileOwner = baseModel.ProfileOwner ? parseInt(baseModel.ProfileOwner) === parseInt(scope.empid) : false;

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
        }
    }
})();