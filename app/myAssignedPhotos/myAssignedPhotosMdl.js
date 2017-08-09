(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('myAssignedPhotosModel', factory);

    factory.$inject = ['myAssignedPhotosService', 'authSvc', 'complex-grid-config', '$http', 'modelpopupopenmethod', 'fileUpload', 'alert', '$timeout'];

    function factory(myAssignedPhotosService, authSvc, gridConfig, $http, modelpopupopenmethod, fileUpload, alertss, timeout) {

        var model = {};
        model = gridConfig;
        model.scope = {};

        model.downloadimagesArr = [];
        model.dateOptions = {
            changeMonth: true,
            changeYear: true,
            yearRange: "-40:+5",
            dateFormat: 'dd-mm-yy'
        };

        model.ProfileIdTemplateDUrl = function(row) {
            var paidstatusclass = row.paid === 372 ? 'paidclass' : 'unpaid';
            var paid = "<a style='cursor:pointer;'  class=" + paidstatusclass + " href='javascript:void(0);'  ng-click='model.viewprofile(" + JSON.stringify(row.ProfileID) + ")' >" + row.ProfileID + "</a>";
            return paid;
        };

        model.viewprofile = function(ToProfileID) {
            window.open('/Viewfullprofile/' + ToProfileID + '/0', '_blank');
        };
        model.reset = function() {
            model.profileID = '';
            model.assignFromData = '';
            model.assignToData = '';
        };

        model.downloadTemplateurl = function(row) {
            var link = "<a style='cursor:pointer;' id='down" + row.index + "' ng-click='model.downloadImg(" + JSON.stringify(row.Cust_ID) + "," + JSON.stringify(row.ProfileID) + "," + JSON.stringify(row.PhotoName) + "," + row.index + ");'>Download</a>";
            return link;
        };


        model.downloadImg = function(custid, profileid, photoname, index) {

            if (custid !== undefined && photoname !== undefined) {
                var strCustDirName1 = "KMPL_" + custid + "_Images";
                var path = strCustDirName1 + "/" + photoname;
                var keynameq = app.prefixPathImg + path;
                var imgnane = photoname.split('.');
                var imgnum = imgnane[0].substr(imgnane[0].length - 1);
                var imagename = profileid + '_' + imgnum + '.jpg';

                $('#down' + index).attr('style', 'color:red;cursor:pointer;');
                photoname = photoname.replace('i', 'I');
                $http({
                        url: '/downloads3Image',
                        data: { keyname: keynameq },
                        method: "post",
                        responseType: "arraybuffer"
                    })
                    .success(function(data) {
                        var anchor = angular.element('<a/>');
                        var blob = new Blob([data]);
                        anchor.attr({
                            href: window.URL.createObjectURL(blob),
                            target: '_blank',
                            download: imagename
                        })[0].click();
                    });
            } else {
                if (model.downloadimagesArr.length > 0) {
                    $http.delete('/deleteDownloads3imageFolder').then(function(mg) {
                        _.each(model.downloadimagesArr, function(item, index) {
                            $http({
                                    url: '/downloadAlls3Images',
                                    data: { keyname: item.keyname, filePath: item.filePathnew },
                                    method: "delete"
                                })
                                .success(function(data) {

                                    if (model.downloadimagesArr.length === parseInt(index) + 1) {
                                        timeout(function() {
                                            $http({
                                                url: '/zipme',
                                                method: "get"
                                            }).success(function(responseData) {
                                                var zip = new JSZip();
                                                zip.file("DownloadPhotos.zip", responseData, { base64: true });
                                                zip.generateAsync({ type: "blob" })
                                                    .then(function(content) {
                                                        saveAs(content, "KaakateeyaPhotos");
                                                    });
                                            });
                                        }, 1500);
                                    }

                                });
                        });
                    });
                }
            }
        };

        model.uploadTemplateurl = function(row) {
            var link = "<a href='javascript:void(0);' id='up" + row.index + "'  ng-click='model.showUpload(" + JSON.stringify(row) + ",this);'>Upload</a>";
            return link;
        };

        model.photoNametemplate = function(row) {
            var link = '<span>' + row.ProfileID + '_' + row.PhotoName + '</span>';
            return link;
        };
        model.deleterow = {};
        model.deletePhotoTemplateUrl = function(row) {
            var strdel = "<a href='javascript:void(0)' ng-click='model.DeleteImage(" + JSON.stringify(row) + ");'>Delete</a>";
            return strdel;
        };
        model.deletePhoto = function() {
            var row = model.deleterow;
            var strCustDirName1 = "KMPL_" + row.Cust_ID + "_Images";
            var path = strCustDirName1 + "/" + row.PhotoName;
            var keynameq = app.prefixPathImg + path;
            $http.post('/photoDelete', JSON.stringify({ keyname: keynameq })).then(function(data) {

            });
            myAssignedPhotosService.linqSubmits(row.Cust_Photos_ID, 3).then(function(response) {
                if (response.data === 1) {
                    model.close();
                    alertss.timeoutoldalerts(model.scope, 'alert-success', 'Photo deleted successfully', 4500);
                }
            });
        };

        model.DeleteImage = function(row) {
            model.deleterow = {};
            model.deleterow = row;
            modelpopupopenmethod.showPopup('deleteimagePopup.html', model.scope, 'sm', '');
        };

        model.getMyassignedProfiles = function() {

            model.downloadimagesArr = [];
            model.columns = [
                { text: 'ProfileID', key: 'ProfileID', type: 'morelinks', templateUrl: model.ProfileIdTemplateDUrl, rowtype: "success" },
                { text: 'FirstName', key: 'FirstName', type: 'label' },
                { text: 'LastName', key: 'LastName', type: 'label' },
                { text: 'PhotoName', key: 'PhotoName', type: 'custom', templateUrl: model.photoNametemplate },
                { text: 'Download', key: '', type: 'morelinks', templateUrl: model.downloadTemplateurl },
                { text: 'Upload', key: '', type: 'morelinks', templateUrl: model.uploadTemplateurl },
                { text: 'UploadedDate', key: 'UploadedDate', type: 'label' },
                { text: 'Uploaded_by', key: 'Uploaded_by', type: 'label' },
                { text: 'Uploaded_branch', key: 'Uploaded_branch', type: 'label' },
                { text: '', key: '', type: 'morelinks', templateUrl: model.deletePhotoTemplateUrl }

            ];

            var inobj = {
                I_EmpID: model.empid,
                StrProfileID: model.profileID ? model.profileID : null,
                StartDate: model.assignFromData ? moment(model.assignFromData).format('YYYY-MM-DD hh:mm:ss') : null,
                EnDate: model.assignToData ? moment(model.assignToData).format('YYYY-MM-DD hh:mm:ss') : null,
                PageFrom: 1,
                PageTo: 1000
            };
            myAssignedPhotosService.getMyassignedProfiles(inobj).then(function(response) {
                if (response.data && response.data.length > 0) {
                    model.totalRecords = response.data[0].TotalRows;
                    model.data = response.data;
                    _.map(model.data, function(item, index) {
                        item.index = index;
                        var strCustDirName1 = "KMPL_" + item.Cust_ID + "_Images";
                        var path = strCustDirName1 + "/" + item.PhotoName;
                        var keynameq = app.prefixPathImg + path;

                        var imgnane = item.PhotoName.split('.');
                        var imgnum = imgnane[0].substr(imgnane[0].length - 1);
                        var imagename = item.ProfileID + '_' + imgnum + '.jpg';
                        model.downloadimagesArr.push({ keyname: keynameq, filePathnew: imagename });
                    });
                } else {
                    model.data = [];
                }
            });

        };

        model.showUpload = function(row, e) {

            $('#up' + row.index).attr('style', 'color:red;cursor:pointer;');
            model.imgName = row.PhotoName ? row.PhotoName.split('.')[0] : '';
            model.Cust_ID = row.Cust_ID;
            model.profileid = row.ProfileID;
            model.photoID = row.Cust_Photos_ID;
            model.displayImg = 'http://d16o2fcjgzj2wp.cloudfront.net/Images/ProfilePics/KMPL_' + row.Cust_ID + '_Images/' + row.PhotoName;
            modelpopupopenmethod.showPopup('threeuploadpopup.html', model.scope, 'md', '');
        };

        model.close = function() {
            modelpopupopenmethod.closepopup();
        };

        model.submitPhotos = function() {

            if (model.CheckUploads()) {

                var uploadArray = [{ photoobj: model.AppPhoto, type: 'app' },
                    { photoobj: model.thumbPhoto, type: 'thumb' },
                    { photoobj: model.fullPhoto, type: 'full' }
                ];

                _.each(uploadArray, function(item) {
                    var strextType = '';
                    if (item.type === 'app') {
                        strextType = '_ApplicationPhoto.jpg';
                    } else if (item.type === 'thumb') {
                        strextType = '_ThumbNail.jpg';
                    } else if (item.type === 'full') {
                        strextType = '_FullPhoto.jpg';
                    }

                    var keyname = app.prefixPathImg + 'KMPL_' + model.Cust_ID + '_Images/' + (model.imgName.replace("i", "I")) + "_Images/" + model.profileid + strextType;
                    fileUpload.uploadFileToUrl(item.photoobj, '/photoUplad', keyname).then(function(res) {

                    });
                });

                var inobj = {
                    EmpID: model.empid,
                    StrThumbNail: "~\\Images\\ProfilePics\\KMPL_" + model.Cust_ID + "_Images\\" + (model.imgName.replace("i", "I")) + "_Images\\" + model.profileid + "_ThumbNail.jpg",
                    StrFullPhoto: "~\\Images\\ProfilePics\\KMPL_" + model.Cust_ID + "_Images\\" + (model.imgName.replace("i", "I")) + "_Images\\" + model.profileid + "_FullPhoto.jpg",
                    StrApplicationPhoto: "~\\Images\\ProfilePics\\KMPL_" + model.Cust_ID + "_Images\\" + (model.imgName.replace("i", "I")) + "_Images\\" + model.profileid + "_ApplicationPhoto.jpg",
                    PhotoID: model.photoID
                };
                myAssignedPhotosService.submitPhotos(inobj).then(function(response) {
                    model.close();
                    if (response.data && parseInt(response.data) === 1) {
                        alertss.timeoutoldalerts(model.scope, 'alert-success', 'Uploaded successfully', 4500);
                    } else {
                        alertss.timeoutoldalerts(model.scope, 'alert-danger', 'Uploading failed', 4500);
                    }
                });
            }
        };

        model.CheckUploads = function() {

            if (model.thumbPhoto && model.fullPhoto && model.AppPhoto) {

                var Thumb = (model.thumbPhoto).name;
                var FullPhoto = (model.fullPhoto).name;
                var AppPhoto = (model.AppPhoto).name;

                var imgnane = model.imgName.split('.');
                var imgnum = imgnane[0].substr(imgnane[0].length - 1);

                var ThumbName = model.profileid + '_th' + imgnum;
                var FullPhotoName = model.profileid + '_fp' + imgnum;
                var AppPhotoName = model.profileid + '_ap' + imgnum;

                var Thumbfile = Thumb ? Thumb.split('.')[0] : '';
                var FullPhotofile = FullPhoto ? FullPhoto.split('.')[0] : '';
                var AppPhotofile = AppPhoto ? AppPhoto.split('.')[0] : '';
                var extension = new Array();
                extension[0] = ".png";
                extension[1] = ".gif";
                extension[2] = ".jpg";
                extension[3] = ".jpeg";
                if (Number(AppPhoto) === 0) {

                    alert('Please upload application photo');
                    return false;
                }
                if (AppPhoto !== "") {
                    var VarAppPhoto = 0;
                    var thisext2 = AppPhoto.substr(AppPhoto.lastIndexOf('.'));
                    for (var i = 0; i < extension.length; i++) {
                        if (thisext2.toLowerCase() == extension[i]) {
                            VarAppPhoto = 1;
                        }
                    }
                    if (VarAppPhoto === 0) {

                        alert('Your uploaded application photo image contains an unapproved file formats.');
                        return false;
                    }
                }

                if (AppPhotofile.toString().indexOf(AppPhotoName.toString()) == -1) {
                    alert('Uploaded application photo image name should as profileID extension with ProfileID_apImagenumber.');
                    return false;
                }
                if (Number(Thumb) === 0) {

                    alert('Please upload thumb nail photo');
                    return false;
                }
                if (Thumb !== "") {
                    var VarThumb = 0;
                    var thisext = Thumb.substr(Thumb.lastIndexOf('.'));
                    for (var j = 0; j < extension.length; j++) {
                        if (thisext.toLowerCase() == extension[j]) {
                            VarThumb = 1;
                        }
                    }
                    if (VarThumb === 0) {

                        alert('Your uploaded thumbnail image contains an unapproved file formats.');
                        return false;
                    }
                }

                if (Thumbfile.toString().indexOf(ThumbName.toString()) == -1) {
                    alert('Uploaded thumbnail image name should as profileID extension with ProfileID_thImagenumber.');
                    return false;
                }
                if (Number(FullPhoto) === 0) {

                    alert('Please upload full photo');
                    return false;
                }
                if (FullPhoto !== "") {
                    var VarFullPhoto = 0;
                    var thisext1 = FullPhoto.substr(FullPhoto.lastIndexOf('.'));
                    for (var i = 0; i < extension.length; i++) {
                        if (thisext1.toLowerCase() == extension[i]) {
                            VarFullPhoto = 1;
                        }
                    }
                    if (VarFullPhoto === 0) {

                        alert('Your uploaded full photo image contains an unapproved file formats.');
                        return false;
                    }
                }

                if (FullPhotofile.toString().indexOf(FullPhotoName.toString()) == -1) {
                    alert('Uploaded fullphoto image name should as profileID extension with ProfileID_fpImagenumber.');
                    return false;
                }
            } else {
                alert('Please enter three photos');
                return false;
            }
            return true;
        };





        return model;

    }
})();