(function(angular) {
    'use strict';

    function factory(employeeViewfullprofileservice) {
        var model = {};
        model.scope = {};
        model.viewprofilearray = [];
        model.aboutmyself = {};
        model.personalinfo = {};

        model.EmpViewfullProfile = function() {
            debugger;
            //010007988
            employeeViewfullprofileservice.getEmpViewfullProfile('010007988', '1').then(function(response) {
                console.log(response);
                if (response.data !== undefined && response.data !== "" && response.data !== null) {
                    _.each(response.data, function(item) {
                        var testArr = JSON.parse(item);
                        if (testArr.length > 0 && testArr[0].TableName !== undefined && testArr[0].TableName === "About") {
                            model.aboutmyself = testArr;
                        } else if (testArr.length > 0 && testArr[0].TableName !== undefined && testArr[0].TableName === "Primary") {
                            model.personalinfo = testArr;
                            console.log(JSON.stringify(model.personalinfo));
                            var photocount = model.personalinfo[0].PhotoName_Cust;
                            model.horoscopeimage = model.personalinfo[0].HoroscopeImage === "" ||
                                model.personalinfo[0].HoroscopeImage === null ||
                                model.personalinfo[0].HoroscopeImage === "Not given" ? false : true;
                            if (model.personalinfo[0].HoroscopeImage !== undefined && model.personalinfo[0].HoroscopeImage !== null) {
                                model.horoimagesrc = (model.personalinfo[0].HoroscopeImage).indexOf(".html") !== -1 ? 'src/images/view_horoscope_image.jpg' : model.personalinfo[0].HoroscopeImage;
                            }
                        } else {
                            console.log(testArr);
                            if (testArr.length > 0 && testArr[0].TableName !== undefined) {
                                model.viewprofilearray.push({ header: testArr[0].TableName, value: testArr });
                            }
                        }
                    });

                }
            });
        };
        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('employeeViewfullprofileModel', factory);
    factory.$inject = ['employeeViewfullprofileservice'];

})(angular);