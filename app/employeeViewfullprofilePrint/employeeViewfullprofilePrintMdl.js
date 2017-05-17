(function(angular) {
    'use strict';

    function factory(employeeViewfullprofileservice, commonpage, stateParams) {
        return function() {
            var model = {};
            model.scope = {};
            model.viewprofilearray = [];
            model.aboutmyself = {};
            model.personalinfo = [];
            model.basicinfo = [];
            model.custid = 0;
            model.stateprofileid = stateParams.ProfileID;
            model.textboxshowhide = true;
            model.fullprofileshow = true;
            model.EmpViewfullProfile = function(stateprofileid) {
                model.viewprofilearray = [];
                model.aboutmyself = {};
                model.personalinfo = [];
                model.basicinfo = [];
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
                                    model.ViewHoroshow = (model.personalinfo[0].HoroscopeImage).indexOf(".html") !== -1 ? true : false;
                                }
                            } else {
                                if (testArr.length > 0 && testArr[0].TableName !== undefined && testArr[0].TableName === "My Basic Details") {
                                    model.basicinfo = testArr;
                                }
                                if (testArr.length > 0 && testArr[0].TableName !== undefined) {
                                    model.viewprofilearray.push({ header: testArr[0].TableName, value: testArr });
                                }
                            }
                        });

                    }
                });


                console.log(model.viewprofilearray);
            };

            model.showPhotoPopup = function() {
                commonpage.ShowPhotoPopup(model.custid, model.scope);
            };
            model.close = function() {
                commonpage.closepopup();
            };

            model.applyCls = function(header) {
                if (header == 'My Location Information') {
                    return 'personal_inform_main_in_list clearfix';
                } else if (header == 'My Basic Details') {
                    return 'personal_inform_main_in_list clearfix displayCls';
                } else {
                    return '';
                }
            };

            model.viewhoroscopeimage = function(horopath) {

                if (horopath.indexOf('.html') !== -1) {
                    window.open(horopath, '_blank');
                } else {
                    model.image = horopath;
                    commonpage.showPopup('templates/bindImagePopup.html', model.scope, 'md', '');
                }
            };


            return model;
        }
    }
    angular
        .module('Kaakateeya')
        .factory('employeeViewfullprofilePrintModel', factory);
    factory.$inject = ['employeeViewfullprofilePrintservice', 'modelpopupopenmethod', '$stateParams'];

})(angular);