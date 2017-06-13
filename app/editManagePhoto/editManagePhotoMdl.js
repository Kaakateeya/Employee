(function(angular) {
    'use strict';


    function factory(editManagePhotoService, authSvc, alertss, commonFactory, uibModal, http, fileUpload, stateParams, baseService) {
        var model = {};
        model.scope = {};
        //start declaration block
        var CustID = stateParams.CustID;
        model.loginpaidstatus = authSvc.getpaidstatus();
        var genderID = 1;
        var loginEmpid = authSvc.LoginEmpid();
        var AdminID = authSvc.isAdmin();
        model.photorowID = 0;
        model.manageArr = [];
        //end declaration block
        model.up = {};
        model.init = function() {
            model.loginEmpid = authSvc.LoginEmpid();
            model.Admin = model.Admin = authSvc.isAdmin();
            model.Managementid = authSvc.isManagement() !== undefined && authSvc.isManagement() !== null && authSvc.isManagement() !== "" ? authSvc.isManagement() : "";
            CustID = stateParams.CustID;
            model.getData();
            return model;
        };
        model.getData = function() {
            editManagePhotoService.getPhotoData(CustID).then(function(response) {
                var StrCustID = CustID;
                model.manageArr = response.data;
                model.refreshPageLoad(model.manageArr);
            });
        };
        model.refreshPageLoad = function(Arr) {
            _.each(Arr, function(item) {
                genderID = item.GenderID;
                model.rbtProtectPassword = item.PhotoPassword === 'Admin@123' ? '1' : '0';
                var imagepath = app.accesspathdotsImg;
                if (item.IsActive === 0 && item.PhotoName !== null) {
                    var strCustDirName1 = "KMPL_" + CustID + "_Images";
                    var path1 = imagepath + strCustDirName1 + "/" + item.PhotoName;
                    item.ImageUrl = path1 + '?decache=' + Math.random();
                    //item.ImageUrl = path1;
                    item.addButtonvisible = false;
                    item.keyname = strCustDirName1 + "/" + item.PhotoName;
                } else if (item.IsActive === 1 && item.IsThumbNailCreated === 1) {
                    var strCustDirName = "KMPL_" + CustID + "_Images";
                    item.addButtonvisible = false;
                    switch (item.DisplayOrder) {
                        case 1:
                            var photoshoppath = "Img1_Images/" + item.ProfileID + "_ApplicationPhoto.jpg";
                            var path11 = imagepath + strCustDirName + "/" + photoshoppath;
                            item.ImageUrl = path11;
                            item.keyname = strCustDirName + "/" + photoshoppath;
                            break;
                        case 2:
                            var photoshoppathnew = "Img2_Images/" + item.ProfileID + "_ApplicationPhoto.jpg";
                            var pathnew = imagepath + strCustDirName + "/" + photoshoppathnew;
                            item.ImageUrl = pathnew;
                            item.keyname = strCustDirName + "/" + photoshoppathnew;
                            break;
                        case 3:
                            var photoshoppathneew3 = "Img3_Images/" + item.ProfileID + "_ApplicationPhoto.jpg";
                            var pathneww = imagepath + strCustDirName + "/" + photoshoppathneew3;
                            item.ImageUrl = pathneww;
                            item.keyname = strCustDirName + "/" + photoshoppathneew3;
                            break;
                    }
                } else if (item.IsActive === 0 && item.PhotoName === null) {
                    item.addButtonvisible = true;

                    item.ImageUrl = genderID === '1' || genderID === 1 ? app.Mnoimage : app.Fnoimage;
                }
            });
            return Arr;
        };
        model.cancel = function() {
            commonFactory.closepopup();
        };
        model.AddImage = function(index, Cust_Photos_ID, DisplayOrder, IsActive) {
            model.photorowID = index;
            model.Cust_Photos_ID = Cust_Photos_ID;
            model.DisplayOrder = DisplayOrder;
            model.IsActive = IsActive;
            commonFactory.open('AddimagePopup.html', model.scope, uibModal, 'sm');
        };
        model.upload = function(obj) {
            var extension = (obj.myFile.name !== '' && obj.myFile.name !== undefined && obj.myFile.name !== null) ? (obj.myFile.name.split('.'))[1] : null;
            extension = angular.lowercase(extension);
            var gifFormat = "gif, jpeg, png,jpg";
            if (typeof(obj.myFile.name) != "undefined") {
                var size = parseFloat(obj.myFile.size / 1024).toFixed(2);
                if (extension !== null && gifFormat.indexOf(angular.lowercase(extension)) === -1) {
                    alert('Your uploaded image contains an unapproved file formats.');
                } else if (size > 4 * 1024) {
                    alert('Sorry,Upload Photo Size Must Be Less than  4 mb');
                } else {
                    // var extension = ((obj.myFile.name).split('.'))[1];
                    var keyname = app.prefixPathImg + 'KMPL_' + CustID + '_Images/Img' + model.photorowID + '.' + extension;
                    fileUpload.uploadFileToUrl(obj.myFile, '/photoUplad', keyname).then(function(res) {
                        if (res.status == 200) {
                            commonFactory.closepopup();
                            model.uploadData = {
                                GetDetails: {
                                    ID: model.Cust_Photos_ID,
                                    url: 'Img' + model.photorowID + '.' + extension,
                                    order: model.DisplayOrder,
                                    IsProfilePic: 0,
                                    DisplayStatus: model.DisplayOrder,
                                    Password: 0,
                                    IsReviewed: 0,
                                    TempImageUrl: app.GlobalImgPath + keyname,
                                    IsTempActive: commonFactory.checkvals(model.IsActive) ? model.IsActive : '0',
                                    DeletedImageurl: null,
                                    IsImageDeleted: 0,
                                    PhotoStatus: null,
                                    PhotoID: model.DisplayOrder,
                                    PhotoPassword: null
                                },
                                customerpersonaldetails: {
                                    intCusID: CustID,
                                    EmpID: loginEmpid,
                                    Admin: AdminID
                                }
                            };
                            editManagePhotoService.submituploadData(model.uploadData).then(function(response) {
                                if (response.status === 200) {
                                    model.manageArr = response.data;
                                    model.refreshPageLoad(model.manageArr);
                                    alert('Uploaded Succesfully');
                                    //alertss.timeoutoldalerts(model.scope, 'alert-success', 'Uploaded Succesfully', 4500);
                                } else {
                                    alert('Uploaded failed');
                                    // alertss.timeoutoldalerts(model.scope, 'alert-success', 'Uploaded failed', 4500);
                                }
                            });
                        }
                    });
                }
            } else {
                alert("This browser does not support HTML5.");
            }
        };

        model.DeleteImage = function(key, Cust_Photoid) {
            model.deleteKey = key;
            model.DCust_Photos_ID = Cust_Photoid;
            commonFactory.open('deleteimagePopup.html', model.scope, uibModal, 'sm');
        };
        model.Delete = function() {
            var keynameq = app.prefixPathImg + model.deleteKey;
            http.post('/photoDelete', JSON.stringify({ keyname: keynameq })).then(function(data) {

            });

            editManagePhotoService.linqSubmits(model.DCust_Photos_ID, 3).then(function(response) {
                if (response.data === 1) {
                    commonFactory.closepopup();
                    model.getData();
                }
            });
        };
        model.setAsProfilePic = function(cust_photoID) {
            editManagePhotoService.linqSubmits(cust_photoID, 2).then(function(response) {
                if (response.data === 1) {
                    model.getData();
                }
            });
        };
        model.setPhotoPassword = function(obj) {
            editManagePhotoService.linqSubmits(CustID, obj).then(function(response) {
                if (response.data === 1) {
                    if (obj === '1') {
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Protect with Password  Uploaded Successfully', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Protect with Password Removed Successfully', 4500);
                    }
                }
            });
        };
        model.redirectPage = function(type) {
            switch (type) {
                case 'PhotoGuideLines':
                    window.open('registration/photoGuideLines', '_blank');
                    break;
                case 'Faqs':
                    window.open('registration/faqs', '_blank');
                    break;
                case 'uploadTips':
                    window.open('registration/uploadTips', '_blank');
                    break;
            }
        };
        return model.init();
    }
    angular
        .module('Kaakateeya')
        .factory('editManagePhotoModel', factory);

    factory.$inject = ['editManagePhotoService', 'authSvc', 'alert', 'commonFactory', '$uibModal', '$http', 'fileUpload', '$stateParams', 'baseService'];

})(angular);