(function() {
    'use strict';

    angular
        .module('Kaakateeya')
        .factory('myAssignedPhotosModel', factory);

    factory.$inject = ['myAssignedPhotosService', 'authSvc', 'complex-grid-config', '$http', 'modelpopupopenmethod', 'fileUpload'];

    function factory(myAssignedPhotosService, authSvc, gridConfig, $http, modelpopupopenmethod, fileUpload) {

        var model = {};
        model = gridConfig;
        model.scope = {};
        model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";

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

            var link = "<a style='cursor:pointer;' ng-click='model.downloadImg();'>Download</a>";
            return link;
        };

        model.downloadImg = function() {
            var strCustDirName1 = "KMPL_91022_Images";
            model.deleteKey = strCustDirName1 + "/img1.jpg";
            var keynameq = app.prefixPathImg + model.deleteKey;
            debugger;
            $http.post('/photoDownload', JSON.stringify({ keyname: 'Images/ProfilePics/KMPL_116843_Images/Img1.jpg' })).then(function(data) {
                debugger;
                console.log('local  ...');
                console.log(data);

            });
            // var s3 = new AWS.S3();


            $http.get('https://kaakateeyaprod.s3.ap-south-1.amazonaws.com/Images/ProfilePics/KMPL_116843_Images/Img1.jpg', {
                    responseType: "arraybuffer"
                })
                .success(function(data) {
                    alert(1);
                    var anchor = angular.element('<a/>');
                    var blob = new Blob([data]);
                    anchor.attr({
                        href: window.URL.createObjectURL(blob),
                        target: '_blank',
                        download: 'fileName.png'
                    })[0].click();
                })

            .error(function(err) {
                debugger;
                alert(err.err);
            });


        };

        model.uploadTemplateurl = function(row) {
            var link = "<a href='javascript:void(0);' ng-click='model.showUpload(" + JSON.stringify(row) + ");'>Upload</a>";
            return link;
        };
        model.photoNametemplate = function(row) {
            var link = '<span>' + row.ProfileID + '_' + row.PhotoName + '</span>';
            return link;
        };
        model.getMyassignedProfiles = function() {
            model.columns = [
                { text: 'ProfileID', key: 'ProfileID', type: 'morelinks', templateUrl: model.ProfileIdTemplateDUrl, rowtype: "success" },
                { text: 'FirstName', key: 'FirstName', type: 'label' },
                { text: 'LastName', key: 'LastName', type: 'label' },
                { text: 'PhotoName', key: 'PhotoName', type: 'custom', templateUrl: model.photoNametemplate },
                { text: 'Download', key: '', type: 'morelinks', templateUrl: model.downloadTemplateurl },
                { text: 'Upload', key: '', type: 'morelinks', templateUrl: model.uploadTemplateurl },
                { text: 'UploadedDate', key: 'UploadedDate', type: 'label' },
                { text: 'Uploaded_by', key: 'Uploaded_by', type: 'label' },
                { text: 'Uploaded_branch', key: 'Uploaded_branch', type: 'label' }
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
                }
            });

        };

        model.showUpload = function(row) {
            model.imgName = row.PhotoName;
            model.Cust_ID = row.Cust_ID;
            model.profileid = row.ProfileID;
            model.photoID = row.Cust_Photos_ID;
            model.displayImg = 'http://d16o2fcjgzj2wp.cloudfront.net/Images/ProfilePics/KMPL_' + row.Cust_ID + '_Images/Img1.jpg';


            modelpopupopenmethod.showPopup('threeuploadpopup.html', model.scope, 'md', '');
        };
        model.close = function() {
            modelpopupopenmethod.closepopup();
        };

        model.submitPhotos = function() {
            model.CheckUploads();
            alert(11111111111111);
            var inobj = {
                EmpID: model.empid,
                StrThumbNail: "~\\Images\\ProfilePics\\KMPL_" + model.Cust_ID + "_Images\\" + (model.imgName.replace("i", "I")) + "_Images\\" + model.profileid + "_ThumbNail.jpg",
                StrFullPhoto: "~\\Images\\ProfilePics\\KMPL_" + model.Cust_ID + "_Images\\" + (model.imgName.replace("i", "I")) + "_Images\\" + model.profileid + "_FullPhoto.jpg",
                StrApplicationPhoto: "~\\Images\\ProfilePics\\KMPL_" + model.Cust_ID + "_Images\\" + (model.imgName.replace("i", "I")) + "_Images\\" + model.profileid + "_ApplicationPhoto.jpg",
                PhotoID: model.photoID
            };


            var keyname = app.prefixPathImg + 'KMPL_' + CustID + '_Images/Img' + model.photorowID + '.' + extension;
            fileUpload.uploadFileToUrl(obj.myFile, '/photoUplad', keyname).then(function(res) {

            });

            // myAssignedPhotosService.submitPhotos(inobj).then(function(response) {
            //     if (response.data && response.data.length > 0) {

            //     }
            // });

        };


        model.CheckUploads = function() {

            var Thumb = model.thumbPhoto;
            var FullPhoto = model.fullPhoto;
            var AppPhoto = model.AppPhoto;
            if (Thumb || FullPhoto || AppPhoto)

            {
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
            }
        };

        model.fileSelected = function(files, events, val) {

            debugger;
            alert(11);
            if (files.length) {
                b.uploadMode = true;
                alert(true);
            } else {
                b.uploadMode = false;
                alert(true);
            }

        };



        return model;

    }
})();