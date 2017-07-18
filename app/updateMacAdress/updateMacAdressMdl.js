(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('updateMacAdressModel', factory)

    factory.$inject = ['updateMacAdressService', 'complex-grid-config'];

    function factory(updateMacAdressService, gridConfig) {
        return function() {
            var model = {};
            model = gridConfig;
            model.columns = [
                { text: 'SNO', key: 'SNO', type: 'label' },
                { text: 'IP Address', key: 'IPAdress', type: 'morelinks', templateUrl: model.ProfileIdTemplateDUrl },
                { text: 'Profile owner', key: 'ProfileOwner', type: 'morelinks' }
            ];


            model.init = function() {


            };

            return model.init();
        };
    }
})();