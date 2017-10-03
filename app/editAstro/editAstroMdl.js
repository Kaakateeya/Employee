(function(angular) {
    'use strict';

    function factory(editAstroService, authSvc, alertss, commonFactory, uibModal, fileUpload, http, stateParams, SelectBindServiceApp, timeout) {
        var model = {};
        model.scope = {};
        // declaration part
        model.atroObj = [];
        model.generateData = [];
        model.ImageUrl = '';
        model.iframeShow = false;
        var s3obj = {};
        var loginEmpid = authSvc.LoginEmpid();
        var AdminID = authSvc.isAdmin();
        var custID = model.CustID = stateParams.CustID;
        model.eventType = 'add';
        var isSubmit = true;
        var encryptCustid;
        model.loginpaidstatus = authSvc.getpaidstatus();
        // end declaration part
        model.init = function() {
            custID = model.CustID = stateParams.CustID;
            model.astropageload();
            model.ddlFromHours = '';
            model.ddlFromMinutes = '';
            model.ddlFromSeconds = '';
            encryptCustid = '';
            return model;
        };

        model.createhoroHtml = function(xmldata) {
            http.get(xmldata).success(function(data) {
                    var parser, xmlDoc;
                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString(data, "text/xml");

                    var htmlData = xmlDoc.getElementsByTagName("HORO")[0].childNodes[0].nodeValue;
                    var raasiNameData = xmlDoc.getElementsByTagName("RASI_FNAME")[0].childNodes[0].nodeValue;
                    var navamsaNameData = xmlDoc.getElementsByTagName("NAVA_FNAME")[0].childNodes[0].nodeValue;
                    var rasiSrcData = xmlDoc.getElementsByTagName("RASI")[0].childNodes[0].nodeValue;
                    var navamsaSrcData = xmlDoc.getElementsByTagName("NAVAMSA")[0].childNodes[0].nodeValue;

                    model.decodedString = atob(htmlData);
                    var raasiImgName = atob(raasiNameData);
                    var navamsaImgName = atob(navamsaNameData);

                    model.decodedString = model.decodedString.replace('http://emp.kaakateeya.com/access/Images/HoroscopeImages/91022_HaroscopeImage/' + raasiImgName, 'data:image/png;base64,' + rasiSrcData);
                    model.decodedString = model.decodedString.replace('http://emp.kaakateeya.com/access/Images/HoroscopeImages/91022_HaroscopeImage/' + navamsaImgName, 'data:image/png;base64,' + navamsaSrcData);

                    http.post('/createAstroHtml', JSON.stringify({ custid: custID, htmldata: model.decodedString })).then(function(response) {
                        if (response.status === 200) {
                            timeout(function() {
                                model.generatedhoroS3Upload();

                            }, 1000);
                        }
                    });


                })
                .error(function(error) {
                    alert(error);
                });
        };


        model.astropageload = function() {
            editAstroService.getAstroData(stateParams.CustID).then(function(response) {
                if (response.data !== undefined && response.data !== null && response.data !== "" && response.data.length > 0) {
                    if (commonFactory.checkvals(response.data[0])) {
                        model.AstroArr = JSON.parse(response.data[0]);
                        model.generateData = JSON.parse(response.data[1]);
                        if (commonFactory.checkvals(model.AstroArr[0] && commonFactory.checkvals(model.AstroArr[0].Horoscopeimage))) {
                            if (commonFactory.checkvals(model.AstroArr[0].Horoscopeimage) && (model.AstroArr[0].Horoscopeimage).indexOf('Horo_no') === -1) {
                                var extension = "jpg";
                                if ((model.AstroArr[0].Horoscopeimage).indexOf('.html') !== -1) {
                                    extension = "html";
                                } else {
                                    model.iframeShow = false;
                                    extension = "jpg";
                                }
                                model.ImageUrl = app.GlobalImgPath + "Images/HoroscopeImages/" + custID + "_HaroscopeImage/" + custID + "_HaroscopeImage." + extension;
                                if (extension === "html") {
                                    model.iframeShow = true;
                                    $('#iframe').attr('src', model.ImageUrl);
                                    // $('#iframe').attr('src', app.GlobalImgPath + 'Images/HoroscopeImages/91022_HaroscopeImage/91022_HaroscopeImage.html');
                                }
                            }
                        } else if (commonFactory.checkvals(model.generateData[0].Horoscopeimage) && (model.generateData[0].Horoscopeimage).indexOf('Horo_no') === -1) {
                            if (commonFactory.checkvals(model.generateData[0].Horoscopeimage) && (model.generateData[0].Horoscopeimage).indexOf('Horo_no') === -1) {
                                var extensn = "jpg";
                                if ((model.generateData[0].Horoscopeimage).indexOf('.html') !== -1) {
                                    extensn = "html";
                                } else {
                                    model.iframeShow = false;
                                    extensn = "jpg";
                                }
                                model.ImageUrl = app.GlobalImgPath + "Images/HoroscopeImages/" + custID + "_HaroscopeImage/" + custID + "_HaroscopeImage." + extensn;
                                if (extensn === "html") {
                                    model.iframeShow = true;
                                    $('#iframe').attr('src', model.ImageUrl);
                                }
                            }
                        }
                    }
                }
            });
        };
        model.populateAstro = function(item) {
            model.hrsbindArr = commonFactory.numberBindWithZeros('Hours', 0, 23);
            model.minbindArr = commonFactory.numberBindWithZeros('Minutes', 0, 59);
            model.secbindArr = commonFactory.numberBindWithZeros('Seconds', 0, 59);
            isSubmit = true;
            model.popupdata = model.astro;
            model.popupHeader = "Astro details";
            model.eventType = 'add';
            if (item !== undefined) {
                model.eventType = 'edit';
                if (item.TimeOfBirth !== undefined) {
                    model.strdot = ((item.TimeOfBirth).split(' '))[0].split(':');
                    model.ddlFromHours = parseInt(model.strdot[0]);
                    model.ddlFromMinutes = parseInt(model.strdot[1]);
                    model.ddlFromSeconds = parseInt(model.strdot[2]);
                }
                model.ddlCountryOfBirthID = item.CountryOfBirthID;
                model.ddlStateOfBirthID = item.StateOfBirthID;
                model.ddlDistrictOfBirthID = item.DistrictOfBirthID;
                model.ddlcity = item.CityOfBirthID;
                model.ddlstarlanguage = item.StarLanguageID;
                model.ddlstar = item.StarID;
                model.ddlpaadam = item.PaadamID;
                model.ddlLagnam = item.LagnamID;
                model.ddlRaasiMoonsign = item.RaasiID;
                model.txtGothramGotra = item.Gothram;
                model.txtMaternalgothram = item.MeternalGothramID;
                model.rdlkujaDosham = item.manglikID;
            }
            commonFactory.open('astroContent.html', model.scope, uibModal);
        };
        model.changeBind = function(type, parentval) {
            switch (type) {
                case 'star':
                    model.starArr = commonFactory.starBind(parentval);
                    break;
            }
        };
        model.updateData = function(inObj, type) {
            if (isSubmit) {
                isSubmit = false;
                $('#ssss').prop('disabled', true);
                inObj.GetDetails.CustID = custID;
                model.submitPromise = editAstroService.submitAstroData(inObj).then(function(response) {
                    commonFactory.closepopup();
                    if (response.data === 1) {
                        if (model.datagetInStatus === 1) {
                            sessionStorage.removeItem('missingStatus');
                            route.go('mobileverf', {});
                        }
                        model.astropageload(custID);
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Astro Details submitted Succesfully', 4500);

                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Astro Details Updation failed', 4500);
                    }
                });
            }
        };

        model.cancel = function() {
            commonFactory.closepopup();
        };

        model.uploadGenerateHoro = function(val) {

            if (val === '0') {
                commonFactory.open('AddHoroPopup.html', model.scope, uibModal, 'sm');
            } else {
                if (model.AstroArr.length > 0) {
                    model.generateHoro();
                } else {
                    model.populateAstro();
                }
            }
        };

        model.upload = function(obj) {
            var extension = (obj.myFile.name !== '' && obj.myFile.name !== undefined && obj.myFile.name !== null) ? (obj.myFile.name.split('.'))[1] : null;
            var gifFormat = "gif, jpeg, png,jpg";
            if (typeof(obj.myFile.name) != "undefined") {
                var size = parseFloat(obj.myFile.size / 1024).toFixed(2);
                if (extension !== null && gifFormat.indexOf(angular.lowercase(extension)) === -1) {
                    alert('Your uploaded image contains an unapproved file formats.');
                } else if (size > 4 * 1024) {
                    alert('Sorry,Upload Photo Size Must Be Less than 1 mb');
                } else {
                    // var extension = ((obj.myFile.name).split('.'))[1];
                    var keyname = "Images/Horoscopeimages/" + custID + "_HaroscopeImage/" + custID + "_HaroscopeImage." + extension;
                    fileUpload.uploadFileToUrl(obj.myFile, '/photoUplad', keyname).then(function(res) {
                        if (res.status == 200) {
                            commonFactory.closepopup();
                            model.uploadData = {
                                Cust_ID: custID,
                                Horopath: '../../' + keyname,
                                ModifiedByEmpID: '',
                                VisibleToID: keyname.indexOf('html') !== -1 ? 1 : '',
                                Empid: '',
                                IsActive: keyname.indexOf('html') !== -1 ? 1 : 0,
                                i_flag: 1
                            };
                            editAstroService.uploadDeleteAstroData(model.uploadData).then(function(response) {
                                commonFactory.closepopup();
                                model.astropageload(custID);
                                model.ImageUrl = app.GlobalImgPathforimage + "Images/HoroscopeImages/" + custID + "_HaroscopeImage/" + custID + "_HaroscopeImage." + extension;
                            });
                        }
                    });
                }
            } else {
                alert("This browser does not support HTML5.");
            }
        };
        model.generateHoro = function(astrocity) {
            var check = moment((model.generateData)[0].DateOfBirth, 'YYYY/MM/DD');
            var month = check.format('M');
            var day = check.format('D');
            var year = check.format('YYYY');
            var inputobj = { customerid: custID, EmpIDQueryString: "2", intDay: day, intMonth: month, intYear: year, CityID: commonFactory.checkvals(astrocity) ? astrocity : "" };
            editAstroService.generateHoroscope(inputobj).then(function(response) {
                if (commonFactory.checkvals(response.data.AstroGeneration)) {
                    s3obj = { Path: response.data.Path, KeyName: response.data.KeyName };
                    model.createhoroHtml(response.data.AstroGeneration);
                    commonFactory.closepopup();
                } else {
                    model.AstrocityArr = commonFactory.AstroCity(model.AstroArr[0].CountryOfBirth, model.AstroArr[0].StateOfBirth);
                    commonFactory.open('AstroCityPopup.html', model.scope, uibModal);
                }
            });
        };


        model.deleteHoroImage = function() {
            var extension = "jpg";
            // if ((model.AstroArr[0].Horoscopeimage).indexOf('.html')) {
            //     extension = "html";
            // } else {
            //     extension = "jpg";
            // }
            var keynameq = "Images/Horoscopeimages/" + custID + "_HaroscopeImage/" + custID + "_HaroscopeImage." + extension;
            http.post('/photoDelete', JSON.stringify({ keyname: keynameq })).then(function(data) {});
            model.uploadData = {
                Cust_ID: custID,
                i_flag: 0
            };
            editAstroService.uploadDeleteAstroData(model.uploadData).then(function(response) {
                if (response.data === 1 || response.data === '1') {
                    model.astropageload(custID);
                    commonFactory.closepopup();
                    model.ImageUrl = '';
                    model.atroObj.rdlUploadGenerate = '';
                }
            });
        };
        model.shoedeletePopup = function() {
            commonFactory.open('deletehoroPopup.html', model.scope, uibModal, 'sm');
        };
        model.AstroCityChange = function(val) {
            model.generateHoro(val);
        };
        model.vewHoro = function() {
            if (model.ImageUrl !== null && model.ImageUrl !== '' && model.ImageUrl !== undefined) {
                if (model.ImageUrl.indexOf('.html') !== -1) {
                    window.open('' + model.ImageUrl + '', '_blank');
                } else {
                    commonFactory.open('AstroimagePopup.html', model.scope, uibModal);
                }
            }
        };

        model.generatedhoroS3Upload = function() {
            editAstroService.GenerateHoroS3(s3obj).then(function(response) {
                SelectBindServiceApp.getencrypt(custID).then(function(response) {
                    encryptCustid = response.data;
                    window.open('/showHoro/' + encryptCustid, '_blank');
                });
            });

            // var paths = '//Images//HoroscopeImages//' + custID + '_HaroscopeImage//' + custID + '_HaroscopeImage.html';

            // http.post('/photoUpladhoro', { keyname: s3obj.KeyName, path: paths }).then(function(res) {
            //     SelectBindServiceApp.getencrypt(custID).then(function(response) {
            //         encryptCustid = response.data;
            //         window.open('/showHoro/' + encryptCustid, '_blank');
            //     });
            // });

            model.astropageload(custID);
            // commonFactory.closepopup();
        };
        model.astro = [{
                lblname: 'Time of Birth',
                controlType: 'astroTimeOfBirth',
                required: true,
            },
            {
                controlType: 'country',
                countryshow: true,
                cityshow: true,
                othercity: false,
                dcountry: 'ddlCountryOfBirthID',
                dstate: 'ddlStateOfBirthID',
                ddistrict: 'ddlDistrictOfBirthID',
                dcity: 'ddlcity',
                countryParameterValue: 'CountryOfBirthID',
                stateParameterValue: 'StateOfBirthID',
                districtParameterValue: 'DistrictOfBirthID',
                cityParameterValue: 'CityOfBirthID',
                require: true
            },
            { lblname: 'Star language', controlType: 'select', ngmodel: 'ddlstarlanguage', typeofdata: 'starLanguage', childName: 'star', changeApi: 'stars', parameterValue: 'Starlanguage' },
            { lblname: 'Star', controlType: 'Changeselect', ngmodel: 'ddlstar', parentName: 'star', parameterValue: 'Star' },
            { lblname: 'Paadam', controlType: 'select', ngmodel: 'ddlpaadam', typeofdata: 'paadam', parameterValue: 'Paadam' },
            { lblname: 'Lagnam', controlType: 'select', ngmodel: 'ddlLagnam', typeofdata: 'lagnam', parameterValue: 'Lagnam' },
            { lblname: 'Raasi/Moon sign', controlType: 'select', ngmodel: 'ddlRaasiMoonsign', typeofdata: 'ZodaicSign', parameterValue: 'RasiMoonsign' },
            { lblname: 'Gothram/Gotra', controlType: 'textbox', ngmodel: 'txtGothramGotra', parameterValue: 'GothramGotra' },
            { lblname: 'Maternal gothram', controlType: 'textbox', ngmodel: 'txtMaternalgothram', parameterValue: 'Maternalgothram' },
            { lblname: 'Manglik/Kuja dosham', controlType: 'radio', ngmodel: 'rdlkujaDosham', ownArray: 'Manglik', parameterValue: 'ManglikKujadosham' },

        ];
        model.Manglik = [
            { "label": "Yes", "title": "Yes", "value": 0 },
            { "label": "No", "title": "No", "value": 1 },
            { "label": "Dont't Know", "title": "Dont't Know", "value": 2 }
        ];
        return model;
    }
    angular
        .module('Kaakateeya')
        .factory('editAstroModel', factory);

    factory.$inject = ['editAstroService', 'authSvc', 'alert', 'commonFactory', '$uibModal', 'fileUpload', '$http', '$stateParams', 'SelectBindServiceApp', '$timeout'];

})(angular);