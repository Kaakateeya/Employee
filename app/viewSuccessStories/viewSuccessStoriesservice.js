(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('viewSuccessStoriesService', factory);

    factory.$inject = ['$http'];

    function factory(http) {
        return {
            viewSuccessStories: function(obj) {
                return http.post(app.apiroot + 'smallPages/ViewSuccessStories', obj);
            },
            getBrideGroomDatanew: function(profileid, flag) {
                return http.get(app.apiroot + 'smallPages/GetbrideGroomDataNew', { params: { profileID: profileid, iFlag: flag } });
            },
            getBrideGroomData: function(profileid, flag) {
                return http.get(app.apiroot + 'smallPages/GetbrideGroomData', { params: { profileID: profileid, iFlag: flag } });
            },
            createSuccessStory: function(obj) {
                return http.post(app.apiroot + 'smallPages/createSuccessStories', obj);
            },
            deleteSucessStory: function(photoID, brideProfileid, groomProfileid) {
                return http.get(app.apiroot + 'smallPages/deleteSucessStories', { params: { sucessStoryID: photoID, brideProfileID: brideProfileid, groomProfileID: groomProfileid } });
            }
        };
    }
})();