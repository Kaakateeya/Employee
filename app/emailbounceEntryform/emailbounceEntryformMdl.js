(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('emailbounceEntryformModel', ['emailbounceEntryformService', function(emailbounceEntryformService) {
            var model = {};
            model.emailpattaren = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/i;
            model.submitemailbouncesubmitform = function() {

            };

            model.resetemailbounce = function() {
                model.clearcontrols();
                model.scope.emailbounceentryform.$setPristine();
                model.scope.emailbounceentryform.$setUntouched();
            };
            model.clearcontrols = function() {
                model.txtemailbounceprofileid = "";
                model.ddlcategoryid = undefined;
                model.txtemailbounceemailid = "";
                model.txtemailbouncedate = "";
                model.txtemailbouncesentdate = "";
                model.txtemailbouncenarration = "";
            };
            return model;
        }]);
})();