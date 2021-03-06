(function(angular) {
    'use strict';

    function factory(employeeViewfullprofileservice, commonpage, stateParams, authSvc) {
        var model = {};
        model.scope = {};
        model.viewprofilearray = [];
        model.aboutmyself = {};
        model.personalinfo = {};
        model.basicinfo = [];
        model.custid = 0;
        model.stateprofileid = stateParams.ProfileID;
        model.textboxshowhide = true;
        model.fullprofileshow = true;
        model.EmpViewfullProfile = function(stateprofileid) {
            model.viewprofilearray = [];
            model.aboutmyself = {};
            model.personalinfo = {};
            model.basicinfo = [];
            model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
            employeeViewfullprofileservice.getEmpViewfullProfile(stateprofileid, model.empid).then(function(response) {
                model.fullprofileshow = false;
                if (response.data !== undefined && response.data !== "" && response.data !== null && response.data.length > 0) {
                    _.each(response.data, function(item) {
                        var testArr = JSON.parse(item);
                        if (testArr.length > 0 && testArr[0].TableName !== undefined && testArr[0].TableName === "About") {
                            model.aboutmyself = testArr;

                        } else if (testArr.length > 0 && testArr[0].TableName !== undefined && testArr[0].TableName === "Primary") {
                            model.personalinfo = testArr;
                            model.custid = model.personalinfo[0].Cust_ID;
                            var photocount = model.personalinfo[0].PhotoName_Cust;
                            model.horoscopeimage = model.personalinfo[0].HoroscopeImage === "" ||
                                model.personalinfo[0].HoroscopeImage === null ||
                                model.personalinfo[0].HoroscopeImage === "Not given" ? false : true;
                            if (model.personalinfo[0].HoroscopeImage !== undefined && model.personalinfo[0].HoroscopeImage !== null) {
                                model.horoimagesrc = (model.personalinfo[0].HoroscopeImage).indexOf(".html") !== -1 ? 'src/images/view_horoscope_image.jpg' : model.personalinfo[0].HoroscopeImage;
                            }
                        } else if (testArr.length > 0 && testArr[0].TableName !== undefined && testArr[0].TableName === "My Basic Details") {
                            model.basicinfo = testArr;
                        } else {
                            if (testArr.length > 0 && testArr[0].TableName !== undefined) {
                                model.viewprofilearray.push({ header: testArr[0].TableName, value: testArr });
                            }
                        }
                    });

                }
            });
        };
        model.showPhotoPopup = function() {
            if (model.photopopupopenflag !== 1) {
                model.photopopupopenflag = 1;
                commonpage.ShowPhotoPopup(model.custid, model.scope);
            }
        };
        model.close = function() {
            model.photopopupopenflag = 0;
            commonpage.closepopup();
        };
        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('employeeViewfullprofileModel', factory);
    factory.$inject = ['employeeViewfullprofileservice', 'modelpopupopenmethod', '$stateParams', 'authSvc'];

})(angular);