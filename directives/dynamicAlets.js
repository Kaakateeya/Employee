app.factory('alert', ['$uibModal', '$timeout', function(uibModal, timeout) {
    var modalinstance, modalinstancealerts;
    return {
        dynamicpopup: function(url, scope, size, classs) {
            modalinstance = uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: url,
                scope: scope,
                size: size || 'lg',
                backdrop: 'static',
                // keyboard: false,
                windowClass: classs,

            });
        },
        dynamicpopupclose: function() {
            modalinstance.close();
        },
        timeoutoldalerts: function(scope, cls, msg, time) {
            scope.typecls = cls;
            scope.msgs = msg === "upgrade" ? "<label style='color:maroon;'>Please Click Here To</label><a href='/UpgradeMembership'>" + "  " + arrayConstants.Upgrade + "</a>" : "<label>" + msg + "</label>";
            modalinstancealerts = uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                template: '<div class="{{typecls}}"><div class="modal-header"><a href="javascript:void(0);" ng-click="closealerts();"><ng-md-icon icon="close" style="fill:#c73e5f" class="pull-right" size="20"></ng-md-icon></a><h4 class="modal-title"><center>Alert</center></h4></div></div><div class="modal-body" id="modalbodyID"><p ng-bind-html="msgs"></p></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="closealerts();">Close</button></div>',
                scope: scope,
                windowClass: "modalclassdashboardphotopopup"
            });
            if (msg === "upgrade") {

            } else {
                timeout(function() {
                    modalinstancealerts.close();
                }, time || 4500);
            }
            scope.closealerts = function() {
                modalinstancealerts.close();
            };
        },
        dynamicpopupopenwithtemp: function(url, scope, size, classs) {
            modalinstance = uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                template: '<div>sssssjiuuuuuu</div>',
                scope: scope,
                size: size || 'lg',
                backdrop: 'static',
                // keyboard: false,
                windowClass: classs,

            });
        }
    };
}]);