(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .directive('allowOnlyNumbers', directive);

    directive.$inject = ['$window'];

    function directive($window) {
        // Usage:
        //     <directive></directive>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, elm, attrs, ctrl) {
            // elm.on('keydown', function(event) {
            //     if (event.which == 64 || event.which == 16) {
            //         // to allow numbers  
            //         return false;
            //     } else if (event.which >= 48 && event.which <= 57 || (event.which === 86 && event.which === 17)) {
            //         // to allow numbers  
            //         return true;
            //     } else if (event.which >= 96 && event.which <= 105 || (event.which === 86 && event.which === 17)) {
            //         // to allow numpad number  
            //         return true;
            //     } else if ([8, 13, 27, 37, 38, 39, 40].indexOf(event.which) > -1 || (event.which === 86 && event.which === 17)) {
            //         // to allow backspace, enter, escape, arrows  
            //         return true;
            //     } else {
            //         event.preventDefault();
            //         // to stop others  
            //         return false;
            //     }
            // });
        }
    }

})();