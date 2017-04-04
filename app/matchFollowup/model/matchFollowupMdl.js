(function(angular) {
    'use strict';

    function factory($http, getArray, timeout, matchFollowupServices) {
        var model = {};
        model.BranchName = [];
        model.init = function() {
            debugger;
            model.BranchName = getArray.GArray('BranchName');
        };
        return model;

    }
    angular
        .module('Kaakateeya')
        .factory('matchFollowupModel', factory);
    factory.$inject = ['$http', 'getArraysearch', '$timeout', 'matchFollowupServices'];

})(angular);