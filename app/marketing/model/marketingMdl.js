(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('marketingModel', factory)

    factory.$inject = ['marketingservice', 'complex-slide-config'];

    function factory(marketingservice, config) {
        var model = {};
        model = config;
        model.headervisileble = true;
        model.templateUrl = "templates/marketingSlide.html";
        model.headettemp = "templates/marketingSlideHeader.html";
        model.dateOptions = {
            changeMonth: true,
            changeYear: true,
            yearRange: "-40:+5",
            dateFormat: 'mm/dd/yy'
        };
        model.init = function() {
            model.arraydata = [{ custid: 91022, name: 'dsdfsdf' }, { custid: 12121, name: 'fgdfg' }, { custid: 34343, name: 'ffffff' }];
            model.setSlides(model.arraydata, 10, 'normal');
            return model;

        };

        model.slidebind = function(old, news, array, type) {}


        return model.init();
    }
})();