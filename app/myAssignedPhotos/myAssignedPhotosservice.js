(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('myAssignedPhotosService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            getMyassignedProfiles: function(obj) {
                return http.post(app.apiroot + 'smallPages/myAssignedPhotos', obj);
            },
            submitPhotos: function(obj) {
                return http.post(app.apiroot + 'smallPages/myAssignedPhotosSubmit', obj);
            },
            downloadPhotos: function(obj) {
                return http.post(app.apiroot + 'smallPages/downloadImages', obj);
            }
        };
    }
})();