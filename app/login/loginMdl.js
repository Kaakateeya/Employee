(function() {
    'use strict';
    angular
        .module('Kaakateeya')
        .factory('loginModel', ['$http', '$uibModal', 'loginservice', 'authSvc', '$state', function($http, uibModal, loginservice, authSvc, $state) {
            var model = {},
                modalpopupopen;
            model.loginsubmit = {};
            model.CurrentDate = new Date();
            model.usernameemployee = false;
            model.usernameemployeepassword = false;
            model.init = function() {
                model.empid = authSvc.LoginEmpid() !== undefined && authSvc.LoginEmpid() !== null && authSvc.LoginEmpid() !== "" ? authSvc.LoginEmpid() : "";
                // authSvc.getmacaddress();
                authSvc.getClientIp();
                return model;
            };
            model.download = function() {
                $http({
                        url: '/downloads3Image',
                        data: { keyname: 'Images/ProfilePics/KMPL_91022_Images/Img1.jpg' },
                        method: "post",
                        responseType: "arraybuffer"
                    })
                    .success(function(data) {
                        var anchor = angular.element('<a/>');
                        var blob = new Blob([data]);
                        anchor.attr({
                            href: window.URL.createObjectURL(blob),
                            target: '_blank',
                            download: 'fileName.png'
                        })[0].click();
                    });
            };
            model.zipdownload = function() {
                $http.delete('/deleteDownloads3imageFolder').then(function(mg) {

                    $http({
                            url: '/downloadAlls3Images',
                            data: { keyname: 'Images/ProfilePics/KMPL_91022_Images/Img1.jpg', filePath: 'Img1.jpg' },
                            method: "post"
                        })
                        .success(function(data) {
                            $http({
                                url: '/zipme',
                                method: "get"
                            }).success(function(responseData) {
                                var zip = new JSZip();
                                zip.file("DownloadPhotos.zip", responseData, { base64: true });
                                zip.generateAsync({ type: "blob" })
                                    .then(function(content) {
                                        saveAs(content, "kaa");
                                    });
                            });
                        });

                });

            };
            model.loginsubmit = function(form, formempvalid, formpasswordvalid, formvalid) {
                if (formempvalid.required === true) {
                    model.usernameemployee = true;
                }
                if (formpasswordvalid.required === true) {
                    model.usernameemployeepassword = true;
                }
                if (formvalid === true) {
                    loginservice.getloginpage(form).then(function(response) {
                        if (response.data !== undefined && response.data !== "" && response.data !== null) {
                            switch (response.data.m_Item5) {
                                case 1:
                                    authSvc.logout();
                                    model.loginarray = response.data.m_Item1;
                                    model.empphoto = response.data.m_Item1.EmpPhotoPath;
                                    authSvc.user(response.data.m_Item1);
                                    sessionStorage.setItem("usernameemployeeid", model.loginsubmit.usernameemployee);
                                    $state.go("base.dashboard", {});
                                    model.loginsubmit.usernameemployee = "";
                                    model.loginsubmit.passwordemployee = "";
                                    break;
                                case 0:
                                    model.errormessage = "Invalid login credentials";
                                    alert("Invalid login credentials");
                                    break;
                                case 2:
                                    model.errormessage = "Ur Account was Deleted,Contact Admin";
                                    alert("Ur Account was Deleted,Contact Admin");
                                    break;
                                case 3:
                                    model.errormessage = "Ur Account was Temp.Disabled,Contact Admin";
                                    alert("Ur Account was Temp.Disabled,Contact Admin");
                                    break;
                                case 8:
                                    model.errormessage = "Ur Cannot Login With Deactivate Branch-User Account ";
                                    alert("Ur Cannot Login With Deactivate Branch-User Account ");
                                    break;
                                case 9:
                                    model.errormessage = "Ur Account was  not Allowed To login In these Timings ";
                                    alert("Ur Account was  not Allowed To login In these Timings");
                                    break;
                                case 11:
                                    model.errormessage = "Please Enter Reason/Permission To Login With Your Userid";
                                    alert("Please Enter Reason/Permission To Login With Your Userid");
                                    break;
                                case 12:
                                    model.errormessage = "Please Enter Reason/Permission To Login With Your Userid";
                                    alert("Please Enter Reason/Permission To Login With Your Userid");
                                    break;
                                case 13:
                                    model.errormessage = "Please Contact Mr.CHIRANJEEVI sir to Login With Ur UserID";
                                    alert("Please Contact Mr.CHIRANJEEVI sir to Login With Ur UserID");
                                    break;
                                case 14:
                                    model.errormessage = "Please Contact Mr.CHIRANJEEVI sir to Login With Ur UserID";
                                    alert("Please Contact Mr.CHIRANJEEVI sir to Login With Ur UserID");
                                    break;
                            }
                        }
                    });
                }
            };
            return model;
        }]);
})();