(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .directive('editFooter', directive);

    function directive() {

        var directive = {
            link: link,
            restrict: 'EA',
            template: '<div class="col-lg-9">' +
                '<button class="button_custom  pull-right"  ng-disabled="loading"  type="submit" promise-btn="page.model.submitPromise">Submit</button>' +
                '</div>' +
                ' <div class="col-lg-3">' +
                '<input value="Cancel"  class="button_custom button_custom_reset pull-right" ng-click="page.model.cancel();" type="button">' +
                ' </div>'
        };
        return directive;

        function link(scope, element, attrs) {}
    }

})();