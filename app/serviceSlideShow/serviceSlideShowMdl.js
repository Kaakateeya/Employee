(function() {
    'use strict';



    function factory($http, serviceSlideShowService, slideconfig) {
        var model = {};
        model = slideconfig;
        model.serviceslideshowsubmit = function(profileid, frompage, topage) {
            var obj = {
                v_profileid: profileid,
                i_empid: model.empid,
                c_intersttype: '',
                c_oppintersttype: '',
                pagefrom: frompage,
                pageto: topage
            };
            serviceSlideShowService.getServiceSlideshowdata(obj).then(function(response) {
                console.log(response.data);
            });
        };
        model.slidebind = function(old, news, array) {};
        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('serviceSlideShowModel', factory);

    factory.$inject = ['$http', 'serviceSlideShowService', 'complex-slide-config'];
})();