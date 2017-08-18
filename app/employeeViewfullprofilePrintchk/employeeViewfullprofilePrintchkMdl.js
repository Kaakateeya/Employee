(function(angular) {
    'use strict';

    function factory(employeeViewfullprofileservice, commonpage, stateParams) {

        var model = {};
        model.scope = {};
        model.viewprofilearray = [];
        model.aboutmyself = {};
        model.personalinfo = [];
        model.basicinfo = [];
        model.custid = 0;
        model.stateprofileid = stateParams.ProfileID;
        model.statecontacts = stateParams.contacts;
        model.textboxshowhide = true;
        model.fullprofileshow = true;
        model.chekprint = function(obj) {
            _.map(obj.value, function(item) {
                if (obj.printvaluemain) {
                    item.printvalue = true;
                } else {
                    item.printvalue = false;
                }

            });
        };
        model.printsinglechk = function(obj) {
            if (obj.value.length === (_.where(obj.value, { printvalue: true })).length) {
                obj.printvaluemain = true;
            } else {
                obj.printvaluemain = false;
            }
        };

        model.chkcontcts = function(obj) {
            if (obj.printvaluemain) {
                obj.printvaluemobile = true;
                obj.printvalueemail = true;
            } else {
                obj.printvaluemobile = false;
                obj.printvalueemail = false;
            }
        };
        model.printsinglecontacts = function(obj) {
            if (obj.printvaluemobile === true && obj.printvalueemail === true) {
                obj.printvaluemain = true;
            } else {
                obj.printvaluemain = false;
            }
        };

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
                            _.map(model.aboutmyself, function(item) {
                                item.printvaluemain = true;
                                item.printvaluemobile = true;
                                item.printvalueemail = true;
                            });
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
                            // if (testArr.length > 0 && testArr[0].TableName !== undefined && testArr[0].TableName === "My Basic Details") {
                            //     model.basicinfo = testArr;
                            //     _.map(model.basicinfo, function(item) {
                            //         item.printvaluemain = true;
                            //     });
                            // }
                            if (testArr.length > 0 && testArr[0].TableName !== undefined) {
                                model.viewprofilearray.push({ header: testArr[0].TableName, value: testArr });
                                _.map(model.viewprofilearray, function(item) {
                                    item.printvaluemain = true;
                                    model.chekprint(item);
                                });

                            }
                        }
                    });
                    model.basicinfo = model.viewprofilearray.length > 0 ? model.viewprofilearray[1].value : [];
                }
            });
        };

        model.showPhotoPopup = function() {
            commonpage.ShowPhotoPopup(model.custid, model.scope);
        };
        model.close = function() {
            commonpage.closepopup();
        };

        model.applyCls = function(header) {
            if (header === 'My Location Information') {
                return 'personal_inform_main_in_list clearfix';
            } else if (header === 'My Basic Details') {

                return 'personal_inform_main_in_list clearfix displayCls';
            }
            return '';
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
    angular
        .module('Kaakateeya')
        .factory('employeeViewfullprofilePrintchkModel', factory);
    factory.$inject = ['employeeViewfullprofilePrintchkservice', 'modelpopupopenmethod', '$stateParams'];

})(angular);