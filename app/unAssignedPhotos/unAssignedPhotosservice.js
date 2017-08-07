(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('unAssignedPhotosService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            getUnassignPhotoSelect: function(obj) {
                return http.post(app.apiroot + 'smallPages/unassignPhotoSelect', obj);
            },
            AssignPhoto: function(empid, strPhotoIds) {
                return http.get(app.apiroot + 'smallPages/GetassignPhotos', { params: { Empid: empid, PhotoIDs: strPhotoIds } });
            }
        };
    }
})();