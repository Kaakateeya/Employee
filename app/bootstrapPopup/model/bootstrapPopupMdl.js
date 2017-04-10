(function() {
    'use strict';




    function factory($http) {
        var model = {};
        model.title = "Pop  Up Name";
        model.closeText = "Close";
        model.submitText = "Submit";
        model.bodyUrl = "stackedModal.html";
        model.name = "ggggg";
        return model;


    }
    angular
        .module('Kaakateeya')
        .factory('bootstrapPopupModel', factory);
    factory.$inject = ['$http'];

})();