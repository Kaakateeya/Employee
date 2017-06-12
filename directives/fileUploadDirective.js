(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .directive('fileModel', directive);
    directive.$inject = ['$parse'];

    function directive($parse) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    }

})();