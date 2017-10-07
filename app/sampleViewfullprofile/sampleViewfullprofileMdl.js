(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('sampleViewfullprofileModel', factory);

    factory.$inject = ['sampleViewfullprofileService'];

    function factory(sampleViewfullprofileService) {

        var model = {};
        model.partnerinformation = function(response) {
            model.arr = [];
            model.personalinfo = {};
            model.aboutmyself = {};
            _.each(response, function(item) {
                var testArr = (item);
                if (testArr.length > 0 && testArr[0].TableName !== undefined && testArr[0].TableName === "About") {
                    model.aboutmyself = testArr;
                } else if (testArr.length > 0 && testArr[0].TableName !== undefined && testArr[0].TableName === "Primary") {
                    model.personalinfo = testArr;
                    var genderid = model.Fromgender === 1 ? 'Mr.' : 'Ms.';
                    var oppositegender = model.Fromgender === 1 ? 'Ms.' : 'Mr.';
                    var oppositeshe = model.Fromgender === 2 ? 'He' : 'She';
                    var oppositeher = model.Fromgender === 2 ? 'his' : 'her';
                    //
                    //
                    var photocount = model.personalinfo[0].PhotoName_Cust;
                    model.horoscopeimage = model.personalinfo[0].HoroscopeImage === "" ||
                        model.personalinfo[0].HoroscopeImage === null ||
                        model.personalinfo[0].HoroscopeImage === "Not given" ? false : true;
                    if (model.personalinfo[0].HoroscopeImage !== undefined && model.personalinfo[0].HoroscopeImage !== null) {
                        model.horoimagesrc = (model.personalinfo[0].HoroscopeImage).indexOf(".html") !== -1 ? 'src/images/view_horoscope_image.jpg' : model.personalinfo[0].HoroscopeImage;
                    }
                } else {
                    if (testArr.length > 0 && testArr[0].TableName !== undefined) {
                        scope.arr.push({ header: testArr[0].TableName, value: testArr });
                    }
                }
            });
        };
        return model;

    }
})();